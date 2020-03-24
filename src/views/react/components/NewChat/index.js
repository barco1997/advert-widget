import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import ls from "local-storage";
import ReactPlayer from "react-player";
import { MessageArea } from "./messageArea";
import { media } from "../../../../utils/media";
import { setLiveArray, getRndInteger, load } from "../../constants";
import StreamChat from "./streamchat";
import LeaveEmail from "../LeaveEmail";
//import MicRecorder from "mic-recorder-to-mp3";
import UnmountTracker from "../UnmountTracker";
import StandaloneTimer from "../StandaloneTimer";
import Disclaimer from "../Disclaimer";
import EntryInfo from "../EntryInfo";
//import { ReactMic } from "react-mic";
import MicrophoneInput, { pulse } from "../MicrophoneInput";
//import { withFirebase } from "../Firebase";
//import firebase from "firebase";
import StatusButton from "../StatusButton";
//import { compose } from "recompose";
import AudioRecorder from "audio-recorder-polyfill";
import mpegEncoder from "audio-recorder-polyfill/mpeg-encoder";
import Game from "../Game";

const uuidv1 = require("uuid/v1");
let currentUrl = window.location.href;
let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
let isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
let SESSION_STATUS;
let STREAM_STATUS;
let PRELOADER_URL;
let ROOM_EVENT;

AudioRecorder.encoder = mpegEncoder;
AudioRecorder.prototype.mimeType = "audio/mpeg";
window.MediaRecorder = AudioRecorder;

const rndUser = getRndInteger(1, 8);
const rndAdmin = getRndInteger(1, 2);
load("https://witheyezon.com/eyezonsite/static/flashphoner.js")
  .then(function() {
    console.log("Loaded!");
    SESSION_STATUS = Flashphoner.constants.SESSION_STATUS;
    STREAM_STATUS = Flashphoner.constants.STREAM_STATUS;
    PRELOADER_URL = "https://witheyezon.com/eyezonsite/static/preloader.mp4";
    ROOM_EVENT = Flashphoner.roomApi.events;
  })
  .catch(function(err) {
    console.error("Something went wrong!", err);
  });

const io = require("socket.io-client");

const storedId = ls.get("userId");

const VideoWrapper = styled.div`
  &&& {
    width: 496px !important;
    height: 664px !important;
    margin-left: 50px !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    position: relative !important;
    & > video {
      width: 100% !important;
      height: 100% !important;
    }
    display: ${props =>
      props.visible ? "block !important" : "none !important"};
    ${media.desktop`
  top: 0% !important;
  width: 100vw !important;
  height: 100vh !important;
  position: fixed !important;
  border-radius: 0px !important;
  margin-left: 0px !important;
  background: black !important;
  & > video {
    width: 100% !important;
  height: 100% !important;
  border-radius: 0px !important;
  }
  `};
  }
`;

const DisclaimerWrapper = styled.div`
  &&& {
    width: calc(100% - 25px) !important;
    margin-top: 10px !important;
    margin-left: 25px !important;
    ${media.desktop`
      display: none !important;
    `};
  }
`;

const DisclaimerWrapperMobile = styled.div`
  &&& {
    position: absolute !important;
    /*right: calc(50% - 110px) !important;*/
    top: 21px !important;
    left: 21px !important;
    display: none !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 3px 10px !important;
    background: rgba(0, 0, 0, 0.2) !important;

    border-radius: 12px !important;
    ${media.desktop`
      display: flex !important;
    `};
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
    display: ${props =>
      props.visible ? "flex !important" : "none !important"};
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

const StreamWrapper = styled.div`
  &&& {
    display: ${props =>
      props.visible ? "flex !important" : "none !important"};
    width: 496px !important;
    height: 664px !important;
    flex-direction: column !important;
    ${media.desktop`
      top: ${props => (props.top ? props.top : "0")} !important;
      background: white !important;
      position: fixed !important;
      width: 100vw !important;
      height: ${props =>
        props.height ? `${props.height}px` : "auto"} !important;
    `};
  }
`;

const PhotoWrapper = styled.div`
  &&& {
    width: 496px !important;
    height: 664px !important;
    margin-left: 50px !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    display: ${props =>
      props.visible ? "block !important" : "none !important"};
    ${media.desktop`
  top: 0% !important;
  width: 100vw !important;
  height: 100vh !important;
  position: fixed !important;
  border-radius: 0px !important;
  margin-left: 0px !important;
  & > div {
    width: 100% !important;
  height: 100% !important;
  border-radius: 0px !important;
  }
  `};
  }
`;
const WindowWrapper = styled.div`
  &&& {
    display: flex !important;
    z-index: 10003 !important;
    /*flex-direction: column !important;*/
    justify-content: center !important;

    height: 664px !important;
    max-width: 85% !important;

    ${media.desktop`
      position: absolute !important;
      top: 0% !important;
      left: 0% !important;
      max-width: 100% !important;
      justify-content: flex-start !important;
      height: auto !important;
  `};
    ${media.tablet`
      
      max-width: 100% !important;
      
  `};
  }
`;

const AudioTimer = styled.div`
  &&& {
    width: 62px !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    position: absolute !important;
    top: calc(50% - 10px) !important;
    left: 15px !important;
    ${media.desktop`
    top:13px !important;
  `};
  }
`;

const TimerCircle = styled.div`
  &&& {
    width: 12px !important;
    height: 12px !important;
    background: #fa194f !important;
    border-radius: 50% !important;
  }
`;

const Timer = styled.div`
  &&& {
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 18px !important;
    display: flex !important;
    align-items: center !important;

    /* Черный текст */

    color: #333333 !important;
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
    ${media.desktop`
    
      
      
  `};
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

const StatusWrapper = styled.div`
  &&& {
    position: absolute !important;
    left: 18px !important;
    top: 14px !important;
  }
`;

const CloseWrapperA = styled.div`
  &&& {
    /*top: 0px !important;
    right: 0px !important;*/
    width: 100% !important;
    height: 64px !important;
    background: ${props => `${props.color} !important`};
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;

    ${media.desktop`
      top: 0px !important;
      right: 0px !important;
  `};
  }
`;

const ChatWrapper = styled.div`
  &&& {
    color: black !important;
    width: 100vw !important;
    height: 100vh !important;
    position: fixed !important;
    left: 0 !important;
    top: ${props => (props.top ? props.top : "0")} !important;
    z-index: 10000 !important;
    display: ${props =>
      props.displayFlag ? "flex !important" : "none !important"};
    justify-content: center !important;
    align-items: center !important;
    font-family: "Montserrat" !important;
    ${media.tablet`
    justify-content: flex-start !important;
  `};
  }
`;

const InputFieldA = styled.textarea`
  &&& {
    height: ${props => (props.height ? props.height : "63px")} !important;
    color: ${props => (props.stream ? "#ffffff" : "black")} !important;
    flex: 1 !important;

    opacity: ${props => (props.blocked ? "0.7" : "1")} !important;
    max-width: 100% !important;
    background: ${props =>
      props.stream ? "rgba(255, 255, 255, 0.32)" : "#ffffff"} !important;
    border: 0px solid #eaeaea !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
    border-radius: ${props => (props.stream ? "4px" : "0px")} !important;
    padding: ${props => (props.stream ? "13px 24px" : "24px 24px")} !important;
    padding-right: ${props => (props.stream ? "24px" : "70px")} !important;
    font-family: "Montserrat" !important;
    font-weight: normal !important;
    font-size: 16px !important;
    line-height: 20px !important;
    outline: 0 !important;
    resize: none !important;
    border-top: ${props =>
      props.stream ? "none" : "1px solid #eaeaea"} !important;
    margin: 0px !important;
    width: ${props => (props.stream ? "calc(100% - 89px)" : "100%")} !important;
    margin-left: ${props => (props.stream ? "24px" : "0px")} !important;
    margin-right: ${props => (props.stream ? "15px" : "0px")} !important;
    word-break: break-all !important;
    vertical-align: middle !important;
    &::placeholder {
      color: ${props =>
        props.stream ? "rgba(255, 255, 255, 0.6)" : "#cacaca"} !important;
      font-weight: normal !important;
    }
    ${media.desktop`
      font-size: 16px !important;
      height: ${props => (props.height ? props.height : "63px")} !important;
      
  `};
  }
`;

const ImageCart = styled.div`
  &&& {
    background: url(${props => props.src}) !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    margin-top: 4px;
    width: 18px !important;
    height: 18px !important;
    position: relative !important;
    cursor: pointer !important;
  }
`;

const EyezonImage = styled.div`
  &&& {
    background: url(${props => props.src}) !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    width: 67px !important;
    height: 16px !important;
    cursor: pointer !important;
    margin: 0px 6px !important;
    margin-bottom: 1px !important;
  }
`;

const MicWrap = styled.div`
  &&& {
    position: absolute !important;
    width: 36px !important;
    height: 36px !important;
    top: calc(50% - 21px) !important;
    right: 18px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: ${props =>
      props.isActive ? `${props.color} !important` : "#f2f2f2 !important"};
    border-radius: 50% !important;
    cursor: pointer !important;

    ${props =>
      props.isActive &&
      css`
        animation: ${pulse} 1s infinite !important;
      `}
  }
`;

const SendIconWrap = styled.div`
  &&& {
    position: absolute !important;
    width: 36px !important;
    height: 36px !important;
    top: calc(50% - 21px) !important;
    right: 18px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: ${props => `${props.color} !important`};
    border-radius: 50% !important;
    cursor: pointer !important;
  }
`;

const EntryWrap = styled.div`
  &&& {
    position: absolute !important;
    top: -22px !important;
    left: 22px !important;
  }
`;

const ImageMic = styled.div`
  &&& {
    background: url(${props => props.src}) !important;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    width: 10px !important;
    height: 16px !important;
    position: relative !important;
    cursor: pointer !important;

    ${media.desktop`
    
  `};
  }
`;

const ImageSend = styled.div`
  &&& {
    background: url(${props => props.src}) !important;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    width: 18px !important;
    margin-left: 3px !important;
    height: 16px !important;
    position: relative !important;
    cursor: pointer !important;
    ${media.desktop`
    
  `};
  }
`;

const MicLogicHidden = styled.div`
  &&& {
    opacity: 0 !important;
    visibility: hidden !important;
    position: absolute !important;
  }
`;

const CartWrapper = styled.div`
  &&& {
    border-radius: 50% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 38px !important;
    height: 35px !important;
    background: #f5f5f5 !important;
    margin-left: 15px !important;
    cursor: pointer !important;
    ${media.tablet`
    width: 44px !important;
    height: 44px !important;
  `};
  }
`;

const Image = styled.div`
  &&& {
    background: url(${props => props.src}) !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    width: 496px !important;
    height: 664px !important;
    position: relative !important;
    border-radius: 10px !important;
    ${media.desktop`
      border-radius: 0px !important;
  `};
  }
`;

const CustomForm = styled.form`
  &&& {
    width: 100% !important;
    height: 63px !important;
    ${media.desktop`
    height: auto !important;
  `};
  }
`;

const SendRow = styled.div`
  &&& {
    width: 100% !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: flex-end !important;
  }
`;

const FontDisclaimer = styled.div`
  &&& {
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 13px !important;

    color: #9f9f9f !important;
    display: flex !important;
    align-items: flex-end !important;
    ${media.desktop`
      display: none !important; 
  `};
  }
`;

const JsChatWindow = styled.div`
  &&& {
   display: flex !important;
     /*display: ${props =>
       props.visible ? "flex !important" : "none !important"};
       width: 542px !important;*/
    justify-content: flex-start !important;
    align-items: center !important;
    flex-direction: column !important;
    background: #fff !important;
      /**** Feature ****/
    overflow: hidden !important;
    width: ${props => (props.visible ? "496px" : "0")} !important;
      /**** End     ****/
    
    height: 664px !important;
    position: relative !important;
    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25) !important;
    border-radius: 6px !important;
    ${media.desktop`
  height: ${props => (props.height ? `${props.height}px` : "100%")} !important;
  width: 100vw !important;
  border-radius: 0px !important;
  & > :first-child {
    
    /*margin-top: 40px !important;*/
  }
  `};
  }
`;
const JsChatOverlay = styled.div`
  &&& {
    z-index: 10002 !important;
    position: fixed !important;
    top: 0px !important;
    bottom: 0px !important;
    left: 0px !important;
    right: 0px !important;
    opacity: 0.4 !important;
    background-color: #000 !important;
    ${media.desktop`
      display: none !important;
  `};
  }
`;
const JsChatMessageContainer = styled.div`
  &&& {
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;

    /*padding: 20px 0px !important;*/
    margin-bottom: 20px !important;
    height: 100% !important;
    /*margin: 0px 24px !important;*/
    max-height: ${props =>
      props.tHeight
        ? `calc(100% - ${props.tHeight} - 82px)`
        : "calc(100% - 145px)"} !important;
    flex: 1 !important;
    position: relative !important;
    ${media.desktop`
  width: 100% !important;
  padding: 0px 0px !important;
  /*padding-bottom: 20px !important;
  margin: 0px 15px !important;*/
  margin-bottom: 20px !important;
  
  `};
    ${media.android`
  
  `};
  }
`;
const JsChatMessagePlaceholder = styled.div`
  &&& {
    width: 100% !important;
    font-size: 13px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    color: rgba(0, 0, 0, 0.5) !important;
    flex: 1 !important;
    & > :first-child {
      margin-top: -20px !important;
    }
  }
`;
const JsChatEmpty = styled.img`
  &&& {
    margin-top: 60px !important;
    width: 176px !important;
    height: 72px !important;
  }
`;

const PlaceholderMessage = styled.div`
  &&& {
    white-space: pre-line !important;
    display: block !important;
    text-align: center !important;
    line-height: 1.3 !important;
    font-size: 14px !important;
  }
`;

const TextFieldExtra = styled.div`
  &&& {
    margin-top: 20px !important;
    ${media.android`
    margin-top: 10px !important;
    `};
  }
`;

const TextFieldExtraS = styled.div`
  &&& {
    position: absolute !important;
    bottom: 0px !important;
    height: ${props =>
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
const InputLineStream = styled.div`
  &&& {
    margin-top: 20px !important;
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
  }
`;

const CartTextFieldExtra = styled.div`
  &&& {
    display: flex !important;
    width: 100% !important;
    align-items: center !important;
  }
`;

const CartTextFieldRelative = styled.div`
  &&& {
    position: relative !important;
    width: 100% !important;
  }
`;

const ControlShader = styled.div`
  &&& {
    position: absolute !important;
    pointer-events: none !important;
    background: rgba(0, 0, 0, 0.5) !important;
    height: 35px !important;
    width: 100% !important;
    bottom: 0px !important;
    left: 0 !important;
  }
`;

const InfoBlock = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    background: ${props => `${props.color} !important`};
    height: 300px !important;
    width: 100% !important;
  }
`;

const ChatWindowExpansion = styled.div`
  &&& {
    flex-direction: column !important;
    align-items: center !important;
    height: 692px !important;
    /**** Feature ****/
    display: ${props => (props.visible ? "flex" : "none")} !important;
    width: ${props => (props.visible ? "496px" : "0")} !important;
    /**** End     ****/
    ${media.desktop`
      height: ${props =>
        props.height ? `${props.height}px` : "100vh"} !important;
    `}
  }
`;

const InfoBlockHeader = styled.div`
  &&& {
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 24px !important;
    line-height: 140% !important;
    /* identical to box height, or 34px */

    display: flex !important;
    align-items: flex-end !important;
    letter-spacing: 0.02em !important;

    /* Primary / white - background */
    margin: 0px 24px !important;
    color: #ffffff !important;
  }
`;

const InfoBlockText = styled.div`
  &&& {
    font-family: "Montserrat" !important;

    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    line-height: 170% !important;
    /* or 24px */

    /* Primary / white - background */

    color: #ffffff !important;
    margin: 16px 24px !important;
  }
`;

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      messages: [],
      messagesStream: [],
      incomingMessage: false,
      awaitingConnection: false,
      startedFlag: false,
      displayFlag: this.props.displayChat,
      firstTimeFlag: true,
      streamFlag: false,
      streamLink: "",
      photoSrc: null,
      videoSrc: null,
      streamToVideo: null,
      notificationMessageToggle: false,
      videoManipulateId: null,
      ifPauseIcon: false,
      existingChats: [],
      streamId: null,
      lastValue: "",
      flvPlayer: null,
      transactionLimit: 50,
      sentHistory: null,
      valueStream: "",
      androidOffset: 0,
      ifTimer: false,
      audioDuration: 0,
      shouldTimerStop: false,
      textAreaHeight: "68px",
      streamTextAreaHeight: "46px",
      isRecording: false,
      blobURL: "",
      isBlocked: false,
      micChecked: false,
      isFirst: false,
      recorder: null,
      gameStarted: false,
      audioStreamStatus: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitS = this.handleSubmitS.bind(this);
    this.loadInitialMessages = this.loadInitialMessages.bind(this);
    this.handleStreamClick = this.handleStreamClick.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handleStreamToVideo = this.handleStreamToVideo.bind(this);

    this.notifyMe = this.notifyMe.bind(this);
    this.notificationPermission = this.notificationPermission.bind(this);
    this.handleChangeInStream = this.handleChangeInStream.bind(this);
    this.handleChangeOrientation = this.handleChangeOrientation.bind(this);
    this.orientationChanged = this.orientationChanged.bind(this);
    this.handleChangeOrientationWrapper = this.handleChangeOrientationWrapper.bind(
      this
    );
    this.handleAndroidKeyboard = this.handleAndroidKeyboard.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleCart = this.handleCart.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.setAudioDuration = this.setAudioDuration.bind(this);
    this.onData = this.onData.bind(this);
    this.onStop = this.onStop.bind(this);
    this.handleUnload = this.handleUnload.bind(this);
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    this.textAreaAdjust = this.textAreaAdjust.bind(this);
    this.startMp3 = this.startMp3.bind(this);
    this.stopMp3 = this.stopMp3.bind(this);
    this.checkMedia = this.checkMedia.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
  }

  startGame() {
    this.setState({ gameStarted: true });
  }

  stopGame() {
    this.setState({ gameStarted: false });
  }

  handleBeforeUnload(e) {
    if (this.state.streamFlag) {
      e.preventDefault();
      return (e.returnValue =
        "Вы уверены, что хотите закрыть вкладку во время прямой трансляции?");
    }
  }

  handleUnload(e) {
    if (this.state.streamFlag) {
      this.socket.emit("leaveStream", ls.get("dialogId"));
      ls.set("tabClosed", true);
    }
  }

  setAudioDuration(val) {
    this.setState({
      audioDuration: val
    });
  }

  orientationChanged() {
    const timeout = 120;
    return new window.Promise(function(resolve) {
      const go = (i, height0) => {
        window.innerHeight != height0 || i >= timeout
          ? resolve()
          : window.requestAnimationFrame(() => go(i + 1, height0));
      };
      go(0, window.innerHeight);
    });
  }

  handleResize() {
    if (isAndroid) {
      this.setState({
        androidOffset: `-${this.props.innerHeight - window.innerHeight}px`
      });
    }
  }

  handleCart() {
    /*********************************************************************************** */
    let self = this;
    const value =
      document.getElementsByTagName("h1").length > 0
        ? document.getElementsByTagName("h1")[0].textContent
        : document.getElementsByClassName("p-product__char-txt").length > 0
        ? document.getElementsByClassName("p-product__char-txt")[0].textContent
        : "empty";
    const rndUserLocal = ls.get("userIcon") ? ls.get("userIcon") : rndUser;
    if (this.state.startedFlag && !this.state.awaitingConnection) {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: value,
            time: new Date(),
            id: uuidv1(),
            photo: `https://witheyezon.com/eyezonsite/static/images/user${rndUserLocal}.png`
          }
        ],
        value: ""
      });
      if (ls.get("streamInProgress")) {
        let obj = {
          messageText: value,
          dialogId: ls.get("dialogId"),
          userId: ls.get("userId"),
          type: "DIALOG"
        };

        self.socket.emit("message", JSON.stringify(obj));
      } else {
        let obj = {
          messageText: value,
          dialogId: ls.get("dialogId"),
          userId: ls.get("userId"),
          type: "DIALOG"
        };

        self.socket.emit("message", JSON.stringify(obj));
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    window.removeEventListener("unload", this.handleUnload);
    ls.set("streamInProgress", false);
    if (this.socket) this.socket.close();
  }

  notifyMe(message, href, buttonId) {
    // Проверка поддержки браузером уведомлений
    let options = {
      icon: "https://witheyezon.com/eyezonsite/static/images/favicon.png",
      data: href
    };
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    // Проверка разрешения на отправку уведомлений
    else if (Notification.permission === "granted") {
      // Если разрешено, то создаем уведомление
      var notification = new Notification(message, options);
      notification.onclick = function(event) {
        var new_window = window.open("", "_blank"); //open empty window(tab)
        if (event.target.data.includes("?open=true")) {
          let str = event.target.data;
          str = str.substring(0, str.indexOf("?open"));

          new_window.location.href = str.concat(
            "?open=true&buttonId=",
            buttonId
          );
        } else {
          new_window.location.href = event.target.data.concat(
            "?open=true&buttonId=",
            buttonId
          );
        } //set url of newly created window(tab) and focus
        notification.close();
      };
    }
    // В противном случае, запрашиваем разрешение
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function(permission) {
        // Если пользователь разрешил, то создаем уведомление
        if (permission === "granted") {
          var notification = new Notification(message, options);
          notification.onclick = function(event) {
            var new_window = window.open("", "_blank"); //open empty window(tab)
            if (event.target.data.includes("?open=true")) {
              new_window.location.href = event.target.data;
            } else {
              new_window.location.href = event.target.data.concat(
                "?open=true&buttonId=",
                buttonId
              );
            }
            //set url of newly created window(tab) and focus
            notification.close();
          };
        }
      });
    }
  }

  notificationPermission() {
    let self = this;
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "default") {
      self.setState({
        notificationMessageToggle: true
      });
      Notification.requestPermission(function(permission) {
        if (permission === "granted") {
          ls.set("notificationPermission", true);
        }
        self.setState({
          notificationMessageToggle: false
        });
      });
    }
  }

  componentWillMount() {
    let self = this;

    if (ls.get("userId")) {
      //this.socket = this.props.socket;
      this.socket = io("https://eyezon.herokuapp.com", {
        transports: ["websocket"],
        upgrade: false
      });
      this.socket.on("connect", () => {
        self.socket.emit("enterSocket", ls.get("userId"));
        if (ls.get("dialogId")) {
          self.socket.emit("enterDialog", ls.get("dialogId"));
        }
      });
      this.socket.on("disconnect", () => {
        self.socket.open();
      });
      /*this.socket = io("https://eyezon.herokuapp.com/", {
        transports: ["websocket"],
        upgrade: false
      });*/
      /*this.socket.on("connect", () => {
        self.socket.emit("enterSocket", ls.get("userId"));
        if (ls.get("dialogId")) {
          self.socket.emit("enterDialog", ls.get("dialogId"));
        }
      });
      this.socket.on("disconnect", () => {
        //this.socket.open();
      });*/
      this.socket.on("dialogCreated", id => {
        ls.set("dialogId", id);
        self.socket.emit("enterDialog", id);
        self.props.joinDialogue();
        ls.set("adminIcon", rndAdmin);
        ls.set("userIcon", rndUser);
        const url = `https://eyezon.herokuapp.com/api/button/${this.props.buttonId}/event`;
        axios
          .post(url, {
            eventType: "SENDED_REQUESTS"
          })
          .then(function(response) {})
          .catch(function(error) {
            console.log(error);
          });
      });
      this.socket.on("streamToVideo", data => {
        this.setState({
          streamToVideo: data.messageId,
          streamFlag: false,
          messagesStream: []
        });
        /*this.live.pause();
        flvPlayer.destroy();*/
        ls.set("streamInProgress", false);
      });
      this.socket.on("received", data => {
        self.socket.emit("readMessage", ls.get("dialogId"));
        if (self.state.gameStarted) {
          self.stopGame();
        }
        if (data.userId !== storedId) {
          if (!ls.get("dialogId")) {
            ls.set("dialogId", data._id);
          }

          let type;
          let source;
          let thumbnail;
          if (data.attachment && data.attachment.type === "AUDIO") {
            type = "audio";
            source = data.attachment.src;
          }

          if (data.attachment && data.attachment.type === "VIDEO") {
            type = "video";
            source = data.attachment.src;
            thumbnail = data.attachment.thumbnail;
          }

          if (data.attachment && data.attachment.type === "PHOTO") {
            type = "photo";
            source = data.attachment.src;
          }

          if (data.attachment && data.attachment.type === "STREAM") {
            type = "stream";
            ls.set("streamDamnId", data._id);
            setLiveArray(self.props.buttonId, data._id);
            source = data.attachment.src;
            thumbnail = data.attachment.thumbnail;
          }

          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: data.messageText,
                time: new Date(),
                photo:
                  data.user === ls.get("userId")
                    ? `https://witheyezon.com/eyezonsite/static/images/user${ls.get(
                        "userIcon"
                      )}.png`
                    : `https://witheyezon.com/eyezonsite/static/images/admin${ls.get(
                        "adminIcon"
                      )}.png`,
                user: data.user === ls.get("userId") ? "Вы" : "Админ",
                type: type,
                flv: type === "stream" ? data.attachment.src : null,
                streamId: type === "stream" ? data.attachment.src : null,

                src: source,
                thumb: thumbnail,
                id: data._id
              }
            ],
            awaitingConnection: false,
            startedFlag: true
          });
        }
      });

      this.socket.on("streamEvent", data => {
        if (data.type === "MESSAGE") {
          this.setState({
            messagesStream: [
              ...this.state.messagesStream,
              {
                text: data.content,
                time: new Date(),
                photo:
                  "https://witheyezon.com/eyezonsite/static/images/logo.png",
                user: "Streamer",
                id: uuidv1()
              }
            ]
          });
        }
      });
    }
  }

  componentWillUpdate(nextProps) {
    let self = this;
    if (
      nextProps.displayChat &&
      nextProps.displayChat !== this.props.displayChat
    ) {
      if (ls.get("dialogId")) {
        if (this.state.firstTimeFlag) {
          axios
            .post(
              `https://eyezon.herokuapp.com/api/dialog/${ls.get(
                "dialogId"
              )}/messages`,
              {}
            )
            .then(function(response) {
              const messages = response.data.data;

              const editedMessages = messages
                .filter(msg => !(msg.type && msg.type === "STREAM"))
                .map(message => ({
                  text: message.messageText,
                  time: message.createdAt,

                  photo:
                    message.user === ls.get("userId")
                      ? `https://witheyezon.com/eyezonsite/static/images/user${ls.get(
                          "userIcon"
                        )}.png`
                      : `https://witheyezon.com/eyezonsite/static/images/admin${ls.get(
                          "adminIcon"
                        )}.png`,
                  user: message.user === ls.get("userId") ? "Вы" : "Админ",
                  type: message.attachment
                    ? message.attachment.type.toLowerCase()
                    : "message",
                  src: message.attachment ? message.attachment.src : null,
                  thumb:
                    message.attachment &&
                    (message.attachment.type === "VIDEO" ||
                      message.attachment.type === "STREAM")
                      ? message.attachment.thumbnail
                      : null,
                  flv:
                    message.attachment && message.attachment.type === "STREAM"
                      ? message.attachment.src
                      : "",
                  id: message._id
                }));

              self.loadInitialMessages(editedMessages);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      }
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleChangeInStream(event) {
    this.setState({ valueStream: event.target.value });
  }

  handleStreamClick(id) {
    if (this.loadedVideo.getInternalPlayer()) {
      this.loadedVideo.getInternalPlayer().pause();
    }
    //this.socket.emit("enterStream", ls.get("userId"));
    this.setState({
      streamLink: id,
      streamFlag: true,
      photoSrc: null
    });
    const url = `https://eyezon.herokuapp.com/api/button/${this.props.buttonId}/event`;
    axios
      .post(url, {
        eventType: "STREAMS_COUNT"
      })
      .then(function(response) {})
      .catch(function(error) {
        console.log(error);
      });
  }

  handlePhoto(src) {
    if (this.loadedVideo.getInternalPlayer()) {
      this.loadedVideo.getInternalPlayer().pause();
    }
    if (this.live) {
      /*this.live.pause();*/
    }

    this.setState({
      photoSrc: src,
      streamFlag: false,
      videoSrc: null
    });
  }

  handleVideo(src, videoManipulateId) {
    if (this.live) {
      /*this.live.pause();*/
    }
    let ifPsI = this.state.ifPauseIcon;
    this.setState({
      videoSrc: src,
      photoSrc: null,
      streamFlag: false,
      videoManipulateId: videoManipulateId,
      ifPauseIcon: !ifPsI
    });
  }

  handleStreamToVideo() {
    this.setState({
      streamToVideo: null
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      displayFlag: nextProps.displayChat
    });
  }

  loadInitialMessages(msgs) {
    msgs.sort((a, b) => {
      if (a.time > b.time) {
        return 1;
      }
      if (a.time < b.time) {
        return -1;
      }
      return 0;
    });

    const flag = msgs.length > 0;
    const flagOne = flag && msgs.length < 2;
    this.setState({
      messages: msgs,
      firstTimeFlag: false,
      startedFlag: flag ? true : false,
      existingChats: [],
      awaitingConnection: flagOne ? true : false
    });
  }
  handleSubmitS() {
    let self = this;
    const value = this.state.valueStream;
    if (value.length > 0) {
      if (!this.state.awaitingConnection) {
        this.setState(
          {
            messagesStream: [
              ...this.state.messagesStream,
              { text: value, time: new Date(), id: uuidv1() }
            ],
            valueStream: ""
          },
          () => this.textAreaAdjust(true)
        );

        let obj = {
          messageText: value,
          dialogId: ls.get("dialogId"),
          userId: ls.get("userId"),
          type: "STREAM"
        };

        self.socket.emit("messageOnStream", JSON.stringify(obj));
      }
    }
  }

  handleSubmit(event) {
    let self = this;
    const value = this.state.value;
    const rndUserLocal = ls.get("userIcon") ? ls.get("userIcon") : rndUser;

    if (value.length > 0) {
      if (!this.state.startedFlag && !this.state.awaitingConnection) {
        this.setState(
          {
            messages: [
              ...this.state.messages,
              {
                text: value,
                time: new Date(),
                id: uuidv1(),
                photo: `https://witheyezon.com/eyezonsite/static/images/user${rndUserLocal}.png`
              }
            ],
            value: "",
            awaitingConnection: true,
            lastValue: value
          },
          () => this.textAreaAdjust(false)
        );
        const newObj = /*JSON.stringify(*/ {
          client: ls.get("userId"),
          title: this.props.currentTitle
            ? this.props.currentTitle
            : document.getElementsByTagName("h1").length > 0
            ? document.getElementsByTagName("h1")[0].textContent
            : value,
          websiteUrl: currentUrl,
          button: self.props.buttonId,
          description: value
        }; /*)*/
        ls.remove("awaitTmp");
        self.socket.emit("createDialog", newObj);
      } else if (!this.state.awaitingConnection) {
        this.setState(
          {
            messages: [
              ...this.state.messages,
              {
                text: value,
                time: new Date(),
                id: uuidv1(),
                photo: `https://witheyezon.com/eyezonsite/static/images/user${ls.get(
                  "userIcon"
                )}.png`
              }
            ],
            value: ""
          },
          () => this.textAreaAdjust(false)
        );
        if (ls.get("streamInProgress")) {
          let obj = {
            messageText: value,
            dialogId: ls.get("dialogId"),
            userId: ls.get("userId"),
            type: "DIALOG"
          };

          self.socket.emit("message", JSON.stringify(obj));
        } else {
          let obj = {
            messageText: value,
            dialogId: ls.get("dialogId"),
            userId: ls.get("userId"),
            type: "DIALOG"
          };

          self.socket.emit("message", JSON.stringify(obj));
        }
      }
    }
    event.preventDefault();
  }
  handleChangeOrientation() {
    let self = this;
    this.orientationChanged().then(function() {
      /*self.setState({
        innerHeight: window.innerHeight
      });*/
      self.forceUpdate();
    });
  }
  handleChangeOrientationWrapper() {
    let self = this; // Store `this` component outside the callback
    if ("onorientationchange" in window) {
      window.addEventListener(
        "orientationchange",
        self.handleChangeOrientation,
        false
      );
    }
  }
  handleAndroidKeyboard(value) {
    this.setState({
      androidOffset: value ? `-${200}px` : `${0}px`
    });
  }
  componentDidMount() {
    //this.handleChangeOrientationWrapper();

    window.addEventListener("beforeunload", this.handleBeforeUnload);
    window.addEventListener("unload", this.handleUnload);
    window.addEventListener("resize", this.handleResize);
    try {
      Flashphoner.init({
        flashMediaProviderSwfLocation:
          "https://witheyezon.com/eyezonsite/static/media-provider.swf"
      });
    } catch (e) {
      console.log("Your browser doesn't support webrtc or flash");
      return;
    }
  }

  handleUp() {
    if (this.state.ifTimer) {
      this.stopMp3();
    }
    this.setState({
      ifTimer: false
    });
  }

  handleDown() {
    if (this.state.startedFlag && !this.state.awaitingConnection) {
      if (ls.get("micChecked")) {
        this.setState({ ifTimer: true });
        this.startMp3();
      } else {
        this.checkMedia();
      }
    }
  }

  checkMedia() {
    let self = this;
    if (
      this.state.startedFlag &&
      !this.state.awaitingConnection &&
      !ls.get("micChecked")
    ) {
      navigator.getUserMedia(
        { audio: true },
        () => {
          console.log("Permission Granted");
          self.setState({ isBlocked: false, isFirst: true });
          ls.set("micChecked", true);
        },
        () => {
          console.log("Permission Denied");
          self.setState({ isBlocked: true });
        }
      );
    }
  }

  startMp3() {
    let self = this;
    /*if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          self.setState({ isRecording: true });
        })
        .catch(e => console.error(e));
    }*/
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      self.setState({ recorder: new MediaRecorder(stream) });
      // Set record to <audio> when recording will be finished
      self.state.recorder.addEventListener("dataavailable", e => {
        const blobURL = URL.createObjectURL(e.data);
        self.setState({ blobURL, isRecording: false });
        ls.set("blobUrl", blobURL);
        self.onStop(e.data);
      });
      // Start recording
      self.state.recorder.start();
    });
  }

  stopMp3() {
    /*if (!this.state.isFirst) {
      let self = this;
      Mp3Recorder.stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const blobURL = URL.createObjectURL(blob);
          self.setState({ blobURL, isRecording: false });
          ls.set("blobUrl", blobURL);
          self.onStop(blob);
        })
        .catch(e => console.log(e));
    } else {
      this.setState({
        isFirst: false
      });
    }*/
    this.state.recorder.stop();
    // Remove “recording” icon from browser tab
    this.state.recorder.stream.getTracks().forEach(i => i.stop());
  }

  onData(recordedBlob) {
    //console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop(recordedBlob) {
    let self = this;

    const d = new Date();
    let formData = new FormData();
    const url = `https://eyezon.herokuapp.com/api/user/${ls.get(
      "userId"
    )}/voice`;

    formData.append("voice", recordedBlob);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios.post(url, formData, config).then(response => {
      self.setState({
        messages: [
          ...self.state.messages,
          {
            time: new Date(),
            id: uuidv1(),
            photo: `https://witheyezon.com/eyezonsite/static/images/user${ls.get(
              "userIcon"
            )}.png`,
            type: "audio",
            src: response.data
          }
        ]
      });

      let obj = {
        dialogId: ls.get("dialogId"),
        userId: ls.get("userId"),
        attachmentType: "AUDIO",
        attachmentUrl: response.data
      };

      self.socket.emit("message", JSON.stringify(obj));
    });
  }

  textAreaAdjust(streamFlag) {
    if (!streamFlag) {
      this.setState(
        {
          textAreaHeight: "auto"
        },
        () => {
          this.setState({
            textAreaHeight: this.mainInput.scrollHeight + "px"
          });
        }
      );
    } else {
      this.setState(
        {
          streamTextAreaHeight: "auto"
        },
        () => {
          this.setState({
            streamTextAreaHeight: this.streamInput.scrollHeight + "px"
          });
        }
      );
    }

    /*o.style.height = "1px";
    o.style.height = 25 + o.scrollHeight + "px";*/
  }

  render() {
    //console.log("PROPS", this.props.firebase.putVoice);
    return (
      <ChatWrapper
        displayFlag={this.state.displayFlag}
        top={this.state.androidOffset}
      >
        <JsChatOverlay
          onClick={() => {
            this.setState({
              streamFlag: false
            });
            if (!this.props.displayMainRequest && !this.props.emailSentFlag) {
              this.props.showMainRequest();
            } else {
              //this.props.closeMainRequest();
              this.props.destroy();
            }
            /*this.live.pause();*/
            if (this.loadedVideo.getInternalPlayer()) {
              this.loadedVideo.getInternalPlayer().pause();
            }
          }}
        />

        <WindowWrapper>
          <ChatWindowExpansion
            height={this.props.innerHeight}
            visible={!this.state.streamFlag}
          >
            <JsChatWindow
              visible={!this.state.streamFlag}
              height={this.props.innerHeight}
            >
              {this.state.gameStarted ? (
                <Game
                  height={this.props.innerHeight}
                  width={496}
                  stopGame={this.stopGame}
                />
              ) : (
                <Fragment>
                  <CloseWrapperA color={this.props.color}>
                    <DisclaimerWrapperMobile>
                      <Disclaimer />
                    </DisclaimerWrapperMobile>
                    <CloseButton
                      onClick={() => {
                        this.setState({
                          streamFlag: false
                        });
                        //this.socket.emit("leaveStream", ls.get("userId"));
                        if (
                          !this.props.displayMainRequest &&
                          !this.props.emailSentFlag
                        ) {
                          this.props.showMainRequest();
                        } else {
                          //this.props.closeMainRequest();
                          this.props.destroy();
                        }
                        /*this.live.pause();*/
                        if (this.loadedVideo.getInternalPlayer()) {
                          this.loadedVideo.getInternalPlayer().pause();
                        }
                      }}
                    />
                  </CloseWrapperA>
                  {/*this.props.displayMainRequest*/ true ? (
                    <LeaveEmail
                      sendEmailDetails={this.props.sendEmailDetails}
                      destroy={this.props.destroy}
                    ></LeaveEmail>
                  ) : (
                    <Fragment>
                      {/*<JsChatMessagePlaceholder>
                        <PlaceholderMessage>
                          {this.props.greetingTitle}
                          {`\n`}
                          {this.props.greetingText}
                        </PlaceholderMessage>

                        <JsChatEmpty src="https://witheyezon.com/eyezonsite/static/images/empty.png" />
                      </JsChatMessagePlaceholder>*/}
                      <JsChatMessageContainer
                        tHeight={this.state.textAreaHeight}
                      >
                        <Fragment>
                          {!this.state.messages ||
                          this.state.messages.length == 0 ? (
                            <InfoBlock color={this.props.color}>
                              <InfoBlockHeader>
                                {this.props.greetingTitle}
                              </InfoBlockHeader>
                              <InfoBlockText>
                                {this.props.greetingText}
                              </InfoBlockText>
                            </InfoBlock>
                          ) : (
                            <MessageArea
                              messages={this.state.messages}
                              awaitingConnection={this.state.awaitingConnection}
                              setFlv={this.handleStreamClick}
                              handlePhoto={this.handlePhoto}
                              handleVideo={this.handleVideo}
                              handleStreamToVideo={this.handleStreamToVideo}
                              strVideo={this.state.streamToVideo}
                              manipulateVideoId={this.state.videoManipulateId}
                              ifPauseIcon={this.state.ifPauseIcon}
                              existingChats={this.state.existingChats}
                              transactionLimit={this.state.transactionLimit}
                              sentHistory={this.state.sentHistory}
                              waitingText={this.props.waitingText}
                              waitingTitle={this.props.waitingTitle}
                              startGame={this.startGame}
                              color={this.props.color}
                              miniGame={this.props.miniGame}
                              timerFlag={this.props.timerFlag}
                            />
                          )}
                        </Fragment>
                      </JsChatMessageContainer>
                      <CustomForm>
                        <div style={{ flexDirection: "column  !important" }}>
                          <CartTextFieldExtra>
                            <CartTextFieldRelative>
                              <InputFieldA
                                rows="1"
                                ref={item => {
                                  this.mainInput = item;
                                }}
                                onFocus={() => {
                                  //this.handleAndroidKeyboard(true);
                                }}
                                onBlur={() => {
                                  //this.handleAndroidKeyboard(false);
                                }}
                                height={this.state.textAreaHeight}
                                onKeyDown={() => this.textAreaAdjust(false)}
                                type="text"
                                value={this.state.value}
                                onChange={this.handleChange}
                                blocked={this.state.awaitingConnection}
                                disabled={this.state.awaitingConnection}
                                placeholder={
                                  this.state.ifTimer
                                    ? ""
                                    : this.state.awaitingConnection
                                    ? "Для продолжения диалога дождитесь ответа"
                                    : "Спросите что-нибудь ;)"
                                }
                                onKeyPress={event => {
                                  if (event.key === "Enter") {
                                    this.handleSubmit(event);
                                  }
                                }}
                              />
                              {this.state.ifTimer && (
                                <AudioTimer>
                                  <TimerCircle />
                                  <Timer>
                                    <StandaloneTimer
                                      setDuration={this.setAudioDuration}
                                    />
                                  </Timer>
                                </AudioTimer>
                              )}
                              {this.state.value.length < 1 &&
                                this.state.messages &&
                                this.state.messages.length > 1 && (
                                  <MicWrap
                                    onMouseDown={this.handleDown}
                                    onTouchStart={this.handleDown}
                                    onMouseUp={this.handleUp}
                                    onTouchEnd={this.handleUp}
                                    tabIndex="0"
                                    isActive={this.state.ifTimer}
                                    color={this.props.color}
                                  >
                                    <ImageMic
                                      src={
                                        "https://witheyezon.com/eyezonsite/static/images/mic.png"
                                      }
                                    />
                                  </MicWrap>
                                )}
                              {!this.state.messages ||
                                (this.state.messages.length == 0 && (
                                  <EntryWrap>
                                    <EntryInfo />
                                  </EntryWrap>
                                ))}
                              {this.state.value.length > 0 && (
                                <SendIconWrap
                                  onClick={event => this.handleSubmit(event)}
                                  color={this.props.color}
                                >
                                  <ImageSend
                                    src={
                                      "https://witheyezon.com/eyezonsite/static/images/Subtract.png"
                                    }
                                  />
                                </SendIconWrap>
                              )}
                              {/*<MicLogicHidden>
                            <ReactMic
                              record={this.state.ifTimer}
                              className="sound-wave"
                              onStop={this.onStop}
                              onData={this.onData}
                              strokeColor="#000000"
                              backgroundColor="#FF4081"
                            />
                          </MicLogicHidden>*/}
                            </CartTextFieldRelative>
                            {/*<CartWrapper onClick={this.handleCart}>
                          <ImageCart
                            src={
                              "https://witheyezon.com/eyezonsite/static/images/cart.png"
                            }
                          />
                          </CartWrapper>*/}
                          </CartTextFieldExtra>
                          {/*<SendRow>
                      <SendRequest onClick={this.handleSubmit}>
                        Отправить
                      </SendRequest>
                      <FontDisclaimer>
                        мы используем
                        <EyezonImage src="https://www.witheyezon.com/eyezonsite/static/images/logonew2.png" />
                      </FontDisclaimer>
                    </SendRow>*/}
                        </div>
                      </CustomForm>
                    </Fragment>
                  )}
                </Fragment>
              )}
            </JsChatWindow>
            <DisclaimerWrapper>
              <Disclaimer />
            </DisclaimerWrapper>
          </ChatWindowExpansion>
          <StreamWrapper
            height={this.props.innerHeight}
            visible={this.state.streamFlag /*true*/}
            top={this.state.androidOffset}
          >
            <VideoWrapperS visible={this.state.streamFlag /*true*/}>
              <UnmountTracker
                mountFunction={() => {
                  this.socket.emit("enterStream", ls.get("dialogId"));
                  console.log("enter stream");
                }}
                unmountFunction={() => {
                  this.socket.emit("leaveStream", ls.get("dialogId"));
                  console.log("left stream");
                }}
                dialogId={ls.get("dialogId")}
                visible={this.state.streamFlag /*true*/}
                SESSION_STATUS={SESSION_STATUS}
                STREAM_STATUS={STREAM_STATUS}
                PRELOADER_URL={PRELOADER_URL}
                ROOM_EVENT={ROOM_EVENT}
                iOS={iOS}
                audioStreamStatus={this.state.audioStreamStatus}
              />

              <CloseWrapper>
                <CloseButton
                  onClick={() => {
                    this.setState({
                      streamFlag: false
                    });
                    //this.socket.emit("leaveStream", ls.get("userId"));
                    /*this.live.pause();
                    flvPlayer.destroy();*/
                    ls.set("streamInProgress", false);
                  }}
                />
              </CloseWrapper>
              <StatusWrapper>
                <StatusButton status="LIVE" color={this.props.color} />
              </StatusWrapper>

              {/*<ControlShader />*/}
              <TextFieldExtraS chatHeight={this.state.streamTextAreaHeight}>
                <StreamChat
                  messages={this.state.messagesStream}
                  isSafari={isSafari}
                />
                <InputLineStream>
                  <MicrophoneInput
                    rows="1"
                    stream
                    /*ref={item => {
                      this.streamInput = item;
                    }}*/
                    setStreamInput={item => {
                      this.streamInput = item;
                    }}
                    type="text"
                    value={this.state.valueStream}
                    onChange={this.handleChangeInStream}
                    placeholder="Сообщение..."
                    onKeyPress={event => {
                      if (event.key === "Enter") {
                        this.handleSubmitS();
                      }
                    }}
                    height={this.state.streamTextAreaHeight}
                    onKeyDown={() => this.textAreaAdjust(true)}
                    handleSubmitS={this.handleSubmitS}
                    audioToggle={() =>
                      this.setState({
                        audioStreamStatus: !this.state.audioStreamStatus
                      })
                    }
                  />
                  {/*{this.state.valueStream.length > 0 && (
                    <SendIconWrapS color={this.props.color} onClick={() => this.handleSubmitS()} stream>
                      <ImageSend
                        src={
                          "https://witheyezon.com/eyezonsite/static/images/Subtract.png"
                        }
                      />
                    </SendIconWrapS>
                  )}
                  {this.state.valueStream.length < 1 && (
                    <MicWrap
                      tabIndex="0"
                      isActive={false}
                      onClick={() => this.setState({ audioStreamStatus: true })}
                    >
                      <ImageMic
                        src={
                          "https://witheyezon.com/eyezonsite/static/images/mic.png"
                        }
                      />
                    </MicWrap>
                      )}*/}
                </InputLineStream>
              </TextFieldExtraS>
            </VideoWrapperS>
          </StreamWrapper>
          <VideoWrapper visible={this.state.videoSrc && !this.state.streamFlag}>
            <ReactPlayer
              url={this.state.videoSrc}
              playing={this.state.ifPauseIcon}
              width="100%"
              height="100%"
              controls
              ref={video => {
                this.loadedVideo = video;
              }}
              onPause={() => {
                this.setState({
                  ifPauseIcon: false
                });
              }}
              onPlay={() => {
                this.setState({
                  ifPauseIcon: true
                });
                /*this.live.pause();*/
              }}
            />
            <CloseWrapper>
              <CloseButton
                onClick={() => {
                  this.setState({
                    videoSrc: null,
                    ifPauseIcon: false
                  });
                  if (this.loadedVideo.getInternalPlayer()) {
                    this.loadedVideo.getInternalPlayer().pause();
                  }
                }}
              />
            </CloseWrapper>
          </VideoWrapper>
          <PhotoWrapper visible={this.state.photoSrc}>
            <Image src={this.state.photoSrc}>
              <CloseWrapper>
                <CloseButton
                  onClick={() => {
                    this.setState({
                      photoSrc: null
                    });
                  }}
                />
              </CloseWrapper>
            </Image>
          </PhotoWrapper>
        </WindowWrapper>
      </ChatWrapper>
    );
  }
}

export default Chat;
