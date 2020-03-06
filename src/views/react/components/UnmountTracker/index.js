import React from "react";
import styled from "styled-components";
import ls from "local-storage";
import axios from "axios";
let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const VideoElement = styled.div`
  &&& {
    width: 100% !important;
    height: 100% !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    & > video {
      width: 100% !important;
      height: 100% !important;
      border-radius: 10px !important;
    }
  }
`;

const Wrapper = styled.div`
  &&& {
    width: 100% !important;
    height: 100% !important;
    border-radius: 10px !important;
    position: relative !important;
  }
`;

const LocalDisplay = styled.div`
  &&& {
    position: absolute !important;
    left: -9999px !important;
  }
`;
export class UnmountTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      connection: null,
      recording: false,
      clientStream: null,
      room: null
    };

    this.playStream = this.playStream.bind(this);
    this.playParticipantStream = this.playParticipantStream.bind(this);
    this.start = this.start.bind(this);
    this.startConference = this.startConference.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.publishLocalMedia = this.publishLocalMedia.bind(this);
    //this.played = this.played.bind(this);
    //this.paused = this.paused.bind(this);
  }
  /*componentDidMount() {
    console.log("DOING");
    if (this.props.mountFunction) {
      console.log("DOING");
      this.props.mountFunction();
    }
  }*/

  componentWillUnmount() {
    console.log("UNDOING");
    if (this.props.unmountFunction) {
      this.props.unmountFunction();
    }
  }

  playStream(session, streamName) {
    let self = this;
    session
      .createStream({
        name: streamName,
        display: this.player
      })
      .on(this.props.STREAM_STATUS.PLAYING, function(stream) {
        /*document
          .getElementById(stream.id())
          .addEventListener("resize", function(event) {
            resizeVideo(event.target);
          });*/
        //setStatus(stream.status());
        //onStarted(stream);
        if (self.props.iOS) {
          document
            .getElementById(stream.id())
            .setAttribute("playsinline", true);
        }
        self.setState({
          stream
        });
      })
      .on(this.props.STREAM_STATUS.STOPPED, function() {
        //setStatus(STREAM_STATUS.STOPPED);
        //onStopped();
      })
      .on(this.props.STREAM_STATUS.FAILED, function() {
        //setStatus(STREAM_STATUS.FAILED);
        //onStopped();
      })
      .play();
  }

  start() {
    let self = this;
    console.log("Create new session with url");
    Flashphoner.createSession({
      urlServer: "wss://server.witheyezon.com:8443"
    })
      .on(this.props.SESSION_STATUS.ESTABLISHED, function(session) {
        //setStatus(session.status());
        //session connected, start playback
        if (self.props.mountFunction) {
          console.log("Trying to mount");
          self.props.mountFunction();
        }
        self.playStream(session, self.props.dialogId);
      })
      .on(this.props.SESSION_STATUS.DISCONNECTED, function() {
        //setStatus(SESSION_STATUS.DISCONNECTED);
        //onStopped();
      })
      .on(this.props.SESSION_STATUS.FAILED, function() {
        //setStatus(SESSION_STATUS.FAILED);
        //onStopped();
      });
  }

  startConference() {
    let self = this;
    self.setState({
      connection: Flashphoner.roomApi
        .connect({
          urlServer: "wss://server.witheyezon.com:8443",
          username: ls.get("userId")
        })
        .on(this.props.SESSION_STATUS.FAILED, function(session) {
          //setStatus('#status', session.status());
          //onLeft();
        })
        .on(this.props.SESSION_STATUS.DISCONNECTED, function(session) {
          //setStatus('#status', session.status());
          //onLeft();
        })
        .on(this.props.SESSION_STATUS.ESTABLISHED, function(session) {
          //setStatus('#status', session.status());
          self.joinRoom();
        })
    });
  }

  joinRoom() {
    let self = this;
    this.state.connection
      .join({ name: self.props.dialogId })
      .on(this.props.ROOM_EVENT.STATE, function(room) {
        var participants = room.getParticipants();
        console.log("Current participants in the room: ", participants);
        /*if (participants.length >= _participants) {
          console.warn("Current room is full");
          $("#failedInfo").text("Current room is full.");
          room.leave().then(onLeft, onLeft);
          return false;
        }
        setInviteAddress(room.name());*/
        if (participants.length > 0) {
          /*var chatState = "participants: ";
          for (var i = 0; i < participants.length; i++) {*/
          self.playParticipantStream(participants[0]);
          /*chatState += participants[i].name();
            if (i != participants.length - 1) {
              chatState += ",";
            }
          }
          addMessage("chat", chatState);*/
        } else {
          //addMessage("chat", " room is empty");
        }
        if (
          isSafari ||
          self.props.iOS ||
          Flashphoner.getMediaProviders()[0] === "MSE"
        ) {
          Flashphoner.playFirstVideo(
            self.localDisplay,
            true,
            self.props.PRELOADER_URL
          ).then(function() {
            self.publishLocalMedia(room);
          });
        } else {
          self.publishLocalMedia(room);
        }

        //onJoined(room);
      })
      .on(this.props.ROOM_EVENT.JOINED, function(participant) {
        self.playParticipantStream(participant);
        //addMessage(participant.name(), "joined");
      })
      .on(this.props.ROOM_EVENT.LEFT, function(participant) {
        //remove participant
        //removeParticipant(participant);
        //addMessage(participant.name(), "left");
      })
      .on(this.props.ROOM_EVENT.PUBLISHED, function(participant) {
        self.playParticipantStream(participant);
      })
      .on(this.props.ROOM_EVENT.FAILED, function(room, info) {
        //connection.disconnect();
        //$("#failedInfo").text(info);

        self.state.connection.disconnect();
      })
      .on(this.props.ROOM_EVENT.MESSAGE, function(message) {
        //addMessage(message.from.name(), message.text);
      });
  }

  playParticipantStream(participant) {
    let self = this;
    if (participant.streams) {
      participant
        .getStreams()[0]
        .play(this.player)
        .on(this.props.STREAM_STATUS.PLAYING, function(stream) {
          /*document
          .getElementById(stream.id())
          .addEventListener("resize", function(event) {
            resizeVideo(event.target);
          });*/
          //setStatus(stream.status());
          //onStarted(stream);
          if (self.props.mountFunction) {
            console.log("Trying to mount");
            self.props.mountFunction();
          }
          if (self.props.iOS) {
            document
              .getElementById(stream.id())
              .setAttribute("playsinline", true);
          }
          self.setState({
            stream
          });
        });
    }
  }

  publishLocalMedia(room) {
    console.log("ROOM", room);
    let self = this;
    var constraints = {
      audio: true,
      video: false
    };
    this.setState(
      {
        recording: true
      },
      () => {
        console.log("ROOM", room);
        this.setState({
          publish: room
            .publish({
              display: this.localDisplay,
              constraints: constraints,
              record: false,
              receiveVideo: false,
              receiveAudio: false
            })
            .on(this.props.STREAM_STATUS.FAILED, function(stream) {
              //console.warn("Local stream failed!");
              //setStatus("#localStatus", stream.status());
              //onMediaStopped(room);

              console.log("FAILED");
            })
            .on(this.props.STREAM_STATUS.PUBLISHING, function(stream) {
              //setStatus("#localStatus", stream.status());
              //onMediaPublished(stream);\
              console.log("SUCCESS", stream);
              stream.unmuteAudio();
              self.setState({
                clientStream: stream
              });
            })
            .on(this.props.STREAM_STATUS.UNPUBLISHED, function(stream) {
              //setStatus("#localStatus", stream.status());
              //onMediaStopped(room);
              console.log("UNP");
            })
        });
      }
    );
  }
  componentDidUpdate(prevProps) {
    let self = this;
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      console.log("IOS", this.props.iOS);
      if (
        isSafari ||
        this.props.iOS ||
        Flashphoner.getMediaProviders()[0] === "MSE"
      ) {
        console.log("IOS or IOS mobile");
        Flashphoner.playFirstVideo(
          self.player,
          false,
          self.props.PRELOADER_URL
        ).then(function() {
          //self.start();
          self.startConference();
        });
      } else {
        //self.start();
        self.startConference();
      }
    } else if (this.props.visible !== prevProps.visible) {
      if (this.props.unmountFunction) {
        this.props.unmountFunction();
      }

      if (this.state.clientStream) {
        console.log("mute audio", this.state.clientStream);
        axios
          .post("https://server.witheyezon.com:8444/rest-api/stream/find", {
            name: this.state.clientStream.name()
          })
          .then(response => {
            console.log("FOUND", response);
            axios
              .post(
                "https://server.witheyezon.com:8444/rest-api/stream/stopRecording",
                {
                  mediaSessionId: response.data[0].mediaSessionId
                }
              )
              .then(response => {
                //self.state.clientStream.muteAudio();
                if (this.state.stream /*&& !this.props.iOS*/) {
                  console.log("mute video");

                  this.state.stream.stop();
                }
                if (this.state.connection) {
                  console.log("close connect");
                  self.state.connection.disconnect();
                }
              });
          });

        //this.state.clientStream.stop();
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <LocalDisplay
          ref={element => {
            this.localDisplay = element;
          }}
        />
        <VideoElement
          ref={element => {
            this.player = element;
          }}
        />
      </Wrapper>
    );
  }
}

/*<iframe
            id="fp_embed_player"
            src={`https://server.witheyezon.com:8444/embed_player?urlServer=wss://server.witheyezon.com:8443&streamName=${this.props.dialogId}&mediaProviders=WebRTC,Flash,MSE,WSPlayer`}
            marginWidth="0"
            marginHeight="0"
            frameBorder="0"
            scrolling="no"
            allowFullScreen="allowfullscreen"
          />*/

export default UnmountTracker;
