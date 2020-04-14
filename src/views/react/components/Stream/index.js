import React from "react";
import styled from "styled-components";
import ls from "local-storage";
//import axios from "axios";
import { media } from "../../../../utils/media";
import { staticUrl } from "../../constants";
import { fromRenderProps } from "recompose";
//import { setDisplayName } from "recompose";
let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const VideoElement = styled.div`
  &&& {
    width: 100% !important;
    height: 100% !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    position: relative !important;
    & > video {
      width: 100% !important;
      height: 100% !important;
      border-radius: 10px !important;
    }
    ${media.desktop`
      height: calc(100vw / (3 / 4)) !important;
      border-radius: 0px !important;
      & > video {
      border-radius: 0px !important;
    }
    `}
  }
`;

const Wrapper = styled.div`
  &&& {
    width: 100% !important;
    position: relative !important;
    height: 100% !important;
    border-radius: 10px !important;
    background: #333333 !important;
    ${media.desktop`
    border-radius: 0px !important;
    `}
  }
`;

const Gradient = styled.div`
  &&& {
    display: none !important;
    ${media.desktop`
      display: flex !important;
      background: linear-gradient(179.33deg, rgba(51, 51, 51, 0) 2.38%, #333333 89.44%) !important;
      height: 70px !important;
      position: absolute !important;
      left: 0 !important;
      bottom: 0px !important;
      width: 100% !important;
    `}
  }
`;

const LocalDisplay = styled.div`
  &&& {
    position: absolute !important;
    left: -9999px !important;
  }
`;
export class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      connection: null,
      recording: false,
      clientStream: null,
      room: null,
      initialRoom: null,
    };

    this.playParticipantStream = this.playParticipantStream.bind(this);

    this.startConference = this.startConference.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.publishLocalMedia = this.publishLocalMedia.bind(this);
  }

  startConference() {
    let self = this;
    self.setState({
      connection: Flashphoner.roomApi
        .connect({
          urlServer: "wss://server.witheyezon.com:8443",
          username: ls.get("userId"),
        })
        .on(this.props.SESSION_STATUS.FAILED, function (session) {
          //setStatus('#status', session.status());
          //onLeft();
        })
        .on(this.props.SESSION_STATUS.DISCONNECTED, function (session) {
          //setStatus('#status', session.status());
          //onLeft();
        })
        .on(this.props.SESSION_STATUS.ESTABLISHED, function (session) {
          //setStatus('#status', session.status());
          self.joinRoom();
        }),
    });
  }

  joinRoom() {
    let self = this;
    this.state.connection
      .join({ name: self.props.dialogId })
      .on(this.props.ROOM_EVENT.STATE, function (room) {
        var participants = room.getParticipants();

        if (participants.length > 0) {
          self.playParticipantStream(participants[0]);
        } else {
          //addMessage("chat", " room is empty");
        }
        /*if (self.props.audioStreamStatus) {*/
        if (
          isSafari ||
          self.props.iOS ||
          Flashphoner.getMediaProviders()[0] === "MSE"
        ) {
          Flashphoner.playFirstVideo(
            self.localDisplay,
            true,
            self.props.PRELOADER_URL
          ).then(function () {
            self.publishLocalMedia(room);
          });
        } else {
          self.publishLocalMedia(room);
        }
        //} //here is the place
        self.setState({ initialRoom: room });
        //onJoined(room);
      })
      .on(this.props.ROOM_EVENT.JOINED, function (participant) {
        self.playParticipantStream(participant);
        //addMessage(participant.name(), "joined");
      })
      .on(this.props.ROOM_EVENT.LEFT, function (participant) {
        //remove participant
        //removeParticipant(participant);
        //addMessage(participant.name(), "left");
      })
      .on(this.props.ROOM_EVENT.PUBLISHED, function (participant) {
        self.playParticipantStream(participant);
      })
      .on(this.props.ROOM_EVENT.FAILED, function (room, info) {
        //connection.disconnect();
        //$("#failedInfo").text(info);

        self.state.connection.disconnect();
      })
      .on(this.props.ROOM_EVENT.MESSAGE, function (message) {
        //addMessage(message.from.name(), message.text);
      });
  }

  playParticipantStream(participant) {
    let self = this;
    if (participant.streams) {
      participant
        .getStreams()[0]
        .play(this.player)
        .on(this.props.STREAM_STATUS.PLAYING, function (stream) {
          if (self.props.mountFunction) {
            //console.log("Trying to mount");
            self.props.mountFunction();
          }
          if (self.props.iOS) {
            document
              .getElementById(stream.id())
              .setAttribute("playsinline", true);
          }
          self.setState({
            stream,
          });
        });
    }
  }

  publishLocalMedia(room) {
    //console.log("ROOM", room);
    let self = this;
    var constraints = {
      audio: true,
      video: false,
    };
    this.setState(
      {
        recording: true,
      },
      () => {
        //console.log("ROOM", room);
        room
          .publish({
            display: this.localDisplay,
            constraints: constraints,
            record: false,
            receiveVideo: false,
            receiveAudio: false,
          })
          .on(this.props.STREAM_STATUS.FAILED, function (stream) {
            console.log("FAILED");
            //Flashphoner.releaseLocalMedia(this.localDisplay);
            //self.state.connection.disconnect();
            if (self.state.clientStream) {
              navigator.getUserMedia(
                { audio: true },
                () => {
                  Flashphoner.releaseLocalMedia(this.localDisplay);
                  self.state.connection.disconnect();
                  self.props.handleReadyStreamUnmount();
                },
                () => {}
              );
            }

            //self.props.handleReadyStreamUnmount();
          })
          .on(this.props.STREAM_STATUS.PUBLISHING, function (stream) {
            //setStatus("#localStatus", stream.status());
            //onMediaPublished(stream);\
            console.log("SUCCESS", stream);
            if (stream.isAudioMuted()) {
              stream.unmuteAudio();
            }

            if (self.props.audioStreamStatus) {
              stream.setMicrophoneGain(100);
            } else {
              stream.setMicrophoneGain(0);
            }
            self.setState({
              clientStream: stream,
              room,
            });
          })
          .on(this.props.STREAM_STATUS.UNPUBLISHED, function (stream) {
            //setStatus("#localStatus", stream.status());
            //onMediaStopped(room);
            console.log("UNP");
            Flashphoner.releaseLocalMedia(this.localDisplay);
            self.state.connection.disconnect();
            self.props.handleReadyStreamUnmount();
          });
      }
    );
  }
  componentDidUpdate(prevProps) {
    let self = this;
    if (
      this.props.audioStreamStatus &&
      this.props.audioStreamStatus !== prevProps.audioStreamStatus
    ) {
      if (this.state.clientStream) {
        if (self.props.iOS) {
          //self.state.clientStream.unmuteAudio();
          self.state.clientStream.setMicrophoneGain(100);
        } else {
          //self.state.clientStream.unmuteAudio();
          self.state.clientStream.setMicrophoneGain(100);
        }
      }
    }
    if (
      !this.props.audioStreamStatus &&
      this.props.audioStreamStatus !== prevProps.audioStreamStatus
    ) {
      if (this.state.clientStream) {
        //self.state.clientStream.muteAudio();
        self.state.clientStream.setMicrophoneGain(0);
      }
    }
    if (!this.props.visible && prevProps.visible) {
      if (this.props.unmountFunction) {
        this.props.unmountFunction();
      }
      self.setState({ recording: false });

      if (self.state.stream) {
        //console.log("mute video");
        self.state.stream.stop();
      }
      if (self.state.clientStream) {
        //console.log("mute audio");
        self.state.clientStream.muteAudio();
      } else {
        self.state.connection.disconnect();
        self.props.handleReadyStreamUnmount();
      }
      if (self.state.room) {
        //console.log("leave room");
        self.state.room.leave();
      }
      //}
    }
  }

  componentDidMount() {
    let self = this;
    try {
      Flashphoner.init({
        flashMediaProviderSwfLocation: `${staticUrl}/static/media-provider.swf`,
      });
    } catch (e) {
      console.log(
        "Your browser doesn't support Flash or WebRTC technology needed for this example"
      );
      return;
    }
    if (
      isSafari ||
      this.props.iOS ||
      Flashphoner.getMediaProviders()[0] === "MSE"
    ) {
      //console.log("IOS or IOS mobile");
      Flashphoner.playFirstVideo(
        self.player,
        false,
        self.props.PRELOADER_URL
      ).then(function () {
        //self.start();
        self.startConference();
      });
    } else {
      //self.start();
      self.startConference();
    }
  }

  render() {
    return (
      <Wrapper>
        <LocalDisplay
          ref={(element) => {
            this.localDisplay = element;
          }}
        />
        <VideoElement
          ref={(element) => {
            this.player = element;
          }}
        >
          <Gradient />
        </VideoElement>
      </Wrapper>
    );
  }
}

export default Stream;
