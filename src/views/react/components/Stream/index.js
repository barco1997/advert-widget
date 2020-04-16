import React from "react";
import styled from "styled-components";
import ls from "local-storage";
//import axios from "axios";
import { media } from "../../../../utils/media";
import { staticUrl } from "../../constants";
import { fromRenderProps } from "recompose";
import StatusButton from "../StatusButton";
import StreamChat from "./streamchat";
import MicrophoneInput from "../MicrophoneInput";
const InputLineStream = styled.div`
  &&& {
    margin-top: 20px !important;
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
  }
`;
const TextFieldExtraS = styled.div`
  &&& {
    position: absolute !important;
    bottom: 0px !important;
    height: ${(props) =>
      props.chatHeight
        ? `calc(348px + ${props.chatHeight})`
        : "388px"} !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    /*${media.android`
    margin-top: 10px !important;
    `};*/
  }
`;
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

const VideoWrapperS = styled.div`
  &&& {
    position: relative !important;
    width: 496px !important;
    height: 664px !important;
    flex-direction: column !important;
    border-radius: 10px !important;
    /*overflow: hidden !important;*/
    background: black !important;
    & > iframe {
      margin-left: -4px !important;
      width: 496px !important;
      height: 664px !important;
    }
    display: ${(props) =>
      props.visible ? "flex !important" : "none !important"};

    ${(props) =>
      props.windowHeight < props.height &&
      `
      width: 100vw !important;
  height: 100% !important;
  `}
    ${media.desktop`
  
  width: 100vw !important;
  height: 100% !important;
  
  
  
  border-radius: 0px !important;
  margin-left: 0px !important;
  background: black !important;
  & > iframe {
    width: 100vw !important;
  height: 100vh !important;
  border-radius: 0px !important;
  }
  `};
  }
`;

const LocalDisplay = styled.div`
  &&& {
    position: absolute !important;
    left: -9999px !important;
  }
`;

const CloseWrapper = styled.div`
  &&& {
    position: absolute !important;
    right: 7px !important;
    top: 14px !important;

    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
  }
`;

const CloseButton = styled.span`
  &&& {
    position: relative !important;
    display: block !important;
    height: 30px !important;
    width: 30px !important;
    background: rgba(255, 255, 255, 0.16) !important;
    border-radius: 50% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    opacity: 1 !important;
    margin-right: 15px !important;
    &:hover {
      background: rgba(255, 255, 255, 0.26) !important;
    }
    &:before,
    &:after {
      position: absolute !important;

      content: " " !important;
      height: 12px !important;
      width: 2px !important;
      border-radius: 1px !important;
      background-color: #ffffff !important;
    }
    &:before {
      transform: rotate(45deg) !important;
    }
    &:after {
      transform: rotate(-45deg) !important;
    }
  }
`;
const StatusWrapper = styled.div`
  &&& {
    position: absolute !important;
    left: 18px !important;
    top: 14px !important;
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
    this.audioToggle = this.audioToggle.bind(this);
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
    room
      .publish({
        display: this.localDisplay,
        constraints: constraints,
        record: false,
        receiveVideo: false,
        receiveAudio: false,
      })
      .on(this.props.STREAM_STATUS.FAILED, function (stream) {
        //console.log("FAILED");
        //Flashphoner.releaseLocalMedia(this.localDisplay);
        //self.state.connection.disconnect();
        if (self.state.clientStream) {
          navigator.mediaDevices.getUserMedia(
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
        //console.log("SUCCESS", stream);
        /*if (stream.isAudioMuted()) {
              stream.unmuteAudio();
            }*/

        if (stream.isAudioMuted()) {
          //stream.setMicrophoneGain(0);
          stream.unmuteAudio();
          //console.log("IOS, UNMUTING AUDIO");
        }
        self.setState({
          clientStream: stream,
          room,
        });
      })
      .on(this.props.STREAM_STATUS.UNPUBLISHED, function (stream) {
        //console.log("UNP");
        Flashphoner.releaseLocalMedia(this.localDisplay);
        self.state.connection.disconnect();
        self.props.handleReadyStreamUnmount();
      });
  }
  componentDidUpdate(prevProps) {
    let self = this;
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

  audioToggle() {
    let self = this;
    //console.log("IOS, TRYING TO TOGGLE AUDIO");
    if (!this.state.clientStream && this.state.initialRoom) {
      if (
        isSafari ||
        self.props.iOS ||
        Flashphoner.getMediaProviders()[0] === "MSE"
      ) {
        //console.log("IOS, STARTING TO PUBLISH");
        Flashphoner.playFirstVideo(
          self.localDisplay,
          true,
          self.props.PRELOADER_URL
        ).then(function () {
          //console.log("IOS, SUCCESSFULLY PRELOADED");
          self.publishLocalMedia(self.state.initialRoom);
        });
      } else {
        self.publishLocalMedia(self.state.initialRoom);
      }
    } else {
      if (this.state.clientStream) {
        if (this.state.clientStream.isAudioMuted()) {
          this.state.clientStream.unmuteAudio();
          //console.log("IOS, AUDIO ON");
        } else {
          this.state.clientStream.muteAudio();
          //console.log("IOS, AUDIO OFF");
        }
      }
    }
    this.props.audioToggle();
  }

  componentDidMount() {
    let self = this;

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
      <VideoWrapperS
        visible={this.props.visible}
        height={this.props.height}
        windowHeight={this.props.windowHeight}
      >
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
        <CloseWrapper>
          <CloseButton onClick={this.props.onClose} />
        </CloseWrapper>
        <StatusWrapper>
          <StatusButton status="LIVE" color={this.props.color} />
        </StatusWrapper>
        <TextFieldExtraS chatHeight={this.props.chatHeight}>
          <StreamChat
            messages={this.props.messages}
            isSafari={this.props.isSafari}
          />
          <InputLineStream>
            <MicrophoneInput
              rows="1"
              stream
              setStreamInput={this.props.setStreamInput}
              type="text"
              value={this.props.valueStream}
              onChange={this.props.onChange}
              placeholder="Сообщение..."
              onKeyPress={this.props.onKeyPress}
              height={this.props.chatHeight}
              onKeyDown={this.props.onKeyDown}
              handleSubmitS={this.props.handleSubmitS}
              iOS={this.props.iOS}
              audioStreamStatus={this.props.audioStreamStatus}
              audioToggle={this.audioToggle}
              isHint={true}
              enabled={this.state.stream ? true : false}
            />
          </InputLineStream>
        </TextFieldExtraS>
      </VideoWrapperS>
    );
  }
}

export default Stream;
