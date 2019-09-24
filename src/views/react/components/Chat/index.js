import React from "react";

import styled from "styled-components";
//import empty from "./empty.png";

import axios from "axios";
import ls from "local-storage";

import ReactPlayer from "react-player";
//import Div100vh from "react-div-100vh";
//import favicon from "./favicon.png";
//import arrow from "./arrow2.svg";
import DeviceOrientation, { Orientation } from "react-screen-orientation";
import { MessageArea } from "./messageArea";
import { media } from "../../../../utils/media";
import {
  setConversationArray,
  setConversationIdValue,
  getLiveIdValue,
  setLiveArray,
  getSentHistory,
  setSentHistory,
  getRndInteger
} from "../../constants";
import StreamChat from "./streamchat";
//require("./flv.min.js");
//let flvPlayer;
const uuidv1 = require("uuid/v1");
let currentUrl = window.location.href;
let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
function load(url) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
let context;
if (!iOS) {
  context = new AudioContext();
}

load(
  "https://witheyezon.com/eyezonsite/static/flashphoner.js" /*"https://gitcdn.xyz/cdn/esterTion/live_html5_lib/c3c77fa197621a0560a9a9d16cbe8bf8d4d39bbb/flv.min.js"*/
)
  .then(function() {
    console.log("Loaded!");
  })
  .catch(function(err) {
    console.error("Something went wrong!", err);
  });
const io = require("socket.io-client");
//const storedToken = ls.get("token");
const storedId = ls.get("userId");
//const conversationId = ls.get("conversationId");

const VideoWrapper = styled.div`
  &&& {
    width: 319px !important;
    height: 553px !important;
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
  /*position: realive;*/
  
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

const VideoWrapperS = styled.div`
  &&& {
    position: relative !important;
    width: 309px !important;
    height: 553px !important;
    flex-direction: column !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    background: black !important;
    & > iframe {
      margin-left: -4px !important;
      width: 319px !important;
      height: 553px !important;
    }
    display: ${props =>
      props.visible ? "flex !important" : "none !important"};
    ${media.desktop`
  /*top: 0% !important;
  position: absolute;*/
  width: 100vw !important;
  height: calc(100% - 146px) !important;
  
  
  /*position: fixed !important;*/
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
    width: 309px !important;
    height: 649px !important;
    flex-direction: column !important;
    ${media.desktop`
      top: 0% !important;
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
    width: 319px !important;
    height: 553px !important;
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
    /*
    top: 50% !important;
    margin-top: -276px !important;
    bottom: 15% !important;
    */
    height: 553px !important;
    max-width: 85% !important;

    ${media.desktop`
      position: absolute !important;
      top: 0% !important;
      left: 0% !important;
      max-width: 100% !important;
      /*margin-top: 0px !important;*/
      height: auto !important;
  `};
    ${media.tablet`
      
      max-width: 100% !important;
      
  `};
  }
`;

const CloseButton = styled.span`
  &&& {
    position: relative !important;
    display: block !important;
    left: 2px !important;
    top: 3.5px !important;
    width: 14px !important;
    height: 14px !important;
    opacity: 0.6 !important;
    &:hover {
      opacity: 1 !important;
    }
    &:before,
    &:after {
      position: absolute !important;
      left: 7px !important;
      content: " " !important;
      height: 14px !important;
      width: 3px !important;
      background-color: #333 !important;
    }
    &:before {
      transform: rotate(45deg) !important;
    }
    &:after {
      transform: rotate(-45deg) !important;
    }
    ${media.desktop`
    left: 2px !important;
      
      
  `};
  }
`;
const CloseWrapper = styled.div`
  &&& {
    position: absolute !important;
    right: 14px !important;
    top: 14px !important;
    background: rgba(255, 255, 255, 0.4) !important;
    width: 21px !important;
    height: 21px !important;
    border-radius: 50% !important;
  }
`;

const CloseWrapperA = styled.div`
  &&& {
    position: absolute !important;
    right: -21px !important;

    top: 14px !important;
    ${media.desktop`
      top: -14px !important;
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
    top: 0 !important;
    z-index: 10000 !important;
    display: ${props =>
      props.displayFlag ? "flex !important" : "none !important"};
    justify-content: center !important;
    align-items: center !important;
    font-family: "Mont" !important;
    ${media.tablet`
    justify-content: flex-start !important;
  `};
  }
`;

const InputFieldA = styled.input`
  &&& {
    height: 30px !important;
    color: black !important;
    width: 100% !important;
    max-width: 100% !important;
    background: #f5f5f5 !important;
    border: 0.5px solid #e5e5e5 !important;
    box-sizing: border-box !important;
    border-radius: 4px !important;
    padding: 0px 10px !important;
    font-family: "Mont" !important;
    font-weight: normal !important;
    font-size: 12px !important;
    outline: 0 !important;
    &::placeholder {
      color: rgba(0, 0, 0, 0.2) !important;
      font-weight: 600 !important;
    }
    ${media.desktop`
    font-size: 16px !important;
      height: 44px !important;
      width: ${props =>
        props.stream ? "calc(100% - 20px)" : "100%"} !important;
        margin-left: ${props => (props.stream ? "10px" : "0px")} !important;
      
  `};
  }
`;

const Image = styled.div`
  &&& {
    background: url(${props => props.src}) !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    width: 319px !important;
    height: 553px !important;

    border-radius: 10px !important;
    ${media.desktop`
      border-radius: 0px !important;
  `};
  }
`;

/*const NotificationMessageWrapper = styled.div`
  &&& {
    position: fixed !important;
    left: 0px !important;
    top: 135px !important;
    z-index: 20000 !important;
    display: ${props => (props.toggle ? "flex !important" : "none !important")};
    flex-direction: column !important;
  }
`;
const NotificationMessageArrow = styled.img`
  &&& {
    margin-left: 150px !important;
    width: 220px !important;
    height: 270px !important;
  }
`;
const NotificationMessageText = styled.span`
  &&& {
    font-family: "Caveat" !important;
    font-weight: bold !important;
    font-size: 35px !important;
    margin-left: 75px !important;
    width: 360px !important;
    margin-top: 25px !important;
    color: white !important;
  }
`;*/

const SendRequest = styled.button`
  &&& {
    width: 181px !important;
    height: 28px !important;
    background: #ff2d55 !important;
    border-radius: 100px !important;
    margin-top: 10px !important;
    text-decoration: none !important;
    border-width: 0px !important;
    box-shadow: none !important;
    -webkit-font-smoothing: antialiased !important;
    -webkit-touch-callout: none !important;
    user-select: none !important;
    cursor: pointer !important;
    outline: 0 !important;
    color: white !important;
    font-size: 11px !important;
    padding-top: 3px !important;
    font-weight: normal !important;
    font-family: "Mont" !important;
    ${media.desktop`
      width: ${props =>
        props.stream ? "calc(100% - 26px)" : "calc(100% - 10px)"}!important;
      height: 48px !important;
      font-size: 16px !important;
      margin-right: ${props => (props.stream ? "0px" : "5px")}!important;
      margin-left: ${props => (props.stream ? "8px" : "0px")}!important;
      margin-top: 16px !important;
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
    flex-direction: column !important;
    background: #fff !important;
      /**** Feature ****/
    overflow: hidden !important;
    width: ${props => (props.visible ? "542px" : "0")} !important;
      /**** End     ****/
    
    height: 553px !important;

    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25) !important;
    border-radius: 6px !important;
    ${media.desktop`
  height: ${props => (props.height ? `${props.height}px` : "100%")} !important;
  width: 100vw !important;
  border-radius: 0px !important;
  & > :first-child {
    
    margin-top: 40px !important;
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
    width: 462px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    padding: 40px 0px !important;
    height: 100% !important;
    margin: 0px 40px !important;

    flex: 1 !important;
    position: relative !important;
    ${media.desktop`
  width: auto !important;
  padding: 0px !important;
  margin: 0px 15px !important;
  margin-bottom: 20px !important;
  `};
    ${media.android`
  max-width: 300px !important;
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

/*function VideoShow(props) {
  const url = props.url;
  console.log(url);
  if (url !== "") {
    return (
      <VideoWrapper>
        <ReactPlayer url={url} playing width="318px" height="553px" />
      </VideoWrapper>
    );
  }
  return null;
}*/

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
      valueStream: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitS = this.handleSubmitS.bind(this);
    this.loadInitialMessages = this.loadInitialMessages.bind(this);
    this.handleStreamClick = this.handleStreamClick.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handleStreamToVideo = this.handleStreamToVideo.bind(this);
    //this.handlePropositionClick = this.handlePropositionClick.bind(this);

    this.notifyMe = this.notifyMe.bind(this);
    this.notificationPermission = this.notificationPermission.bind(this);
    this.handleChangeInStream = this.handleChangeInStream.bind(this);
    this.handleChangeOrientation = this.handleChangeOrientation.bind(this);
    this.orientationChanged = this.orientationChanged.bind(this);
    this.handleChangeOrientationWrapper = this.handleChangeOrientationWrapper.bind(
      this
    );
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

  componentWillUnmount() {
    window.removeEventListener("onorientationchange", this.handleResize);
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
          console.log("string: ", str);
          new_window.location.href = str.concat(
            "?open=true&buttonId=",
            buttonId
          );
        } else {
          console.log("target");
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
      this.socket = io("https://eyezon.herokuapp.com/", {
        /*query: "token=" + ls.get("token"),*/
        transports: ["websocket"],
        upgrade: false
      });
      this.socket.on("connect", () => {
        console.log("socket got connected");
        /*let obj = {
          _id: ls.get("dialogId")
        };*/
        //console.log(obj);
        if (ls.get("dialogId")) {
          self.socket.emit("enterDialog", ls.get("dialogId"));
        }
      });
      this.socket.on("disconnect", () => {
        console.log("socket got disconnected");
        //this.socket.open();
      });
      this.socket.on("streamToVideo", data => {
        console.log("message got updated", data);
        this.setState({ streamToVideo: data.messageId, streamFlag: false });
        /*this.live.pause();
        flvPlayer.destroy();*/
        ls.set("streamInProgress", false);
      });
      this.socket.on("received", data => {
        console.log("message got received", data);
        self.socket.emit("readMessage", ls.get("dialogId"));
        if (data.userId !== storedId) {
          if (!ls.get("dialogId")) {
            ls.set("dialogId", data._id);
            //setConversationArray(self.props.businessId, data.requestId);
          }
          console.log("u got a reply again", data);

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
          //setSentHistory(self.props.businessId, "", false);
          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: data.messageText,
                time: new Date(),
                awaitingConnection: false,
                photo:
                  data.user === ls.get("userId")
                    ? `https://witheyezon.com/eyezonsite/static/images/user${ls.get(
                        "userIcon"
                      )}.png`
                    : `https://witheyezon.com/eyezonsite/static/images/admin${ls.get(
                        "adminIcon"
                      )}.png`,
                user:
                  data.user === ls.get("userId")
                    ? "Вы"
                    : "Админ" /*.firstName.concat(" ", data.user.lastName)*/,
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
            /*sentHistory: { message: "", status: false }*/
          });
        }
      });
      /*this.socket.on("portOnline", data => {
        console.log("port on data:", data);
        if (!iOS) {
          this.notifyMe(
            "Stream started at Eyezon button",
            currentUrl,
            self.props.buttonId
          );
        }
        
      });
      this.socket.on("portOffline", data => {
        console.log("port off data:", data);
        if (!iOS) {
          this.notifyMe(
            "Stream ended at Eyezon button",
            currentUrl,
            self.props.buttonId
          );
        }
        ls.set("streamInProgress", false);
        let objlv = {
          event: "leaveRoom",
          room:  getLiveIdValue(self.props.businessId)
        };
        this.socket.emit("port", JSON.stringify(objlv));
      });*/

      this.socket.on("streamEvent", data => {
        console.log("what data:", data);
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
      this.socket.open();
    }
    /*axios
      .get(`https://api.eyezon.app/market/transactions`)
      .then(function(response) {
        console.log(response.data.transactions.totalAmount);
        self.setState({
          transactionLimit: response.data.transactions.totalAmount
        });
      })
      .catch(function(error) {
        console.log(error);
      });*/
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
              //const users = response.data.users;
              const messages = response.data.data;
              //const owner = users.find(user => user.type === "owner");
              // console.log("businessId: ", nextProps);
              // if (owner.businessId === nextProps.businessId) {
              console.log(response);
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
                        )}.png` /*users.filter(user => user.userId === message.userId)[0]
                    .photo*/,
                  user:
                    message.user === ls.get("userId")
                      ? "Вы"
                      : "Админ" /*users
                    .filter(user => user.userId === message.userId)[0]
                    .firstName.concat(
                      " ",
                      users.filter(user => user.userId === message.userId)[0]
                        .lastName
                    )*/,
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
              //console.log("Users - ", users);

              self.loadInitialMessages(editedMessages);
              /* } else {
                console.log("delete conversationId");
                ls.delete("conversationId");
              }
              //const buttonUserId = ls.get("userId");
              /*if (
                users.filter(
                  user => user.userId === buttonUserId && user.type === "joiner"
                ).length === 0
              ) {
                self.loadInitialMessages([]);
              } else {*/

              //}
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      } else {
        //const sh = getSentHistory(this.props.businessId);
        //console.log("SH: ", sh);
        /*this.setState({
          sentHistory: sh
        });*/
      }
    }
  }

  componentWillUnmount() {
    ls.set("streamInProgress", false);
    if (this.socket) this.socket.close();
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
      .then(function(response) {
        console.log("STREAM button clicked", response);
      })
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
    console.log("photo src: ", src);
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
    /*if (Hls.isSupported()) {
      let video = this.loadedVideo.getInternalPlayer();
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        
        video.msRequestFullscreen();
      }
    }*/
  }

  handleStreamToVideo() {
    this.setState({
      streamToVideo: null
    });
  }

  /*handlePropositionClick(id) {
    let self = this;
    const chat = this.state.existingChats.find(chat => chat.port.id === id);
    const users = chat.messages.users;
    const messages = chat.messages.messages;
    const editedMessages = messages.map(message => ({
      text: message.message,
      time: message.time,
      photo: users.filter(user => user.userId === message.userId)[0].photo,
      user: users
        .filter(user => user.userId === message.userId)[0]
        .firstName.concat(
          " ",
          users.filter(user => user.userId === message.userId)[0].lastName
        ),
      type:
        message.attachments.length > 0
          ? message.attachments[0].type
          : "message",
      src: message.attachments.length > 0 ? message.attachments[0].src : null,
      thumb:
        message.attachments.length > 0 &&
        message.attachments[0].type === "video"
          ? message.attachments[0].thumbnail
          : null,
      flv:
        message.attachments.length > 0 &&
        message.attachments[0].type === "stream"
          ? `https://static.eyezon.app/live/${message._id}.flv`
          : "",
      id: message._id
    }));
    ls.set("conversationId", chat.port.id);
    console.log("conv id: ", chat.port.id);
    setConversationArray(self.props.buttonId, chat.port.id);
    const value = this.state.lastValue;
    axios
      .get(`https://api.eyezon.app/ports/${chat.port.id}`)
      .then(function(response) {
        console.log(response);
        if (response.data.port.isLive) {
          let room = this.state.streamId;
          const streamMessage = editedMessages.find(
            message => message.type === "stream"
          );
          room = streamMessage.id;
          let obj = {
            event: "comment",
            room: room,
            text: value
          };
          console.log(obj);
          self.socket.emit("port", JSON.stringify(obj));
        } else {
          axios
            .put(`https://api.eyezon.app/messages/${chat.port.id}`, {
              message: value,
              url: currentUrl
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
        self.loadInitialMessages([
          ...editedMessages,
          { text: value, time: new Date(), id: uuidv1() }
        ]);
      })
      .catch(function(error) {
        console.log(error);
      });
  }*/

  componentWillReceiveProps(nextProps) {
    this.setState({
      displayFlag: nextProps.displayChat
    });
    /*if (nextProps.displayChat) {
      if (!iOS) {
        this.notificationPermission();
      }
    }*/
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
    //const sh = getSentHistory(this.props.businessId);
    //console.log("the sentH value: ", sh);
    const flag = msgs.length > 0;
    this.setState({
      messages: msgs,
      firstTimeFlag: false,
      startedFlag: flag ? true : false,
      existingChats: [],
      awaitingConnection: false
      /*sentHistory: flag ? { message: "", status: false } : sh*/
    });
    /*if (flag) {
      setSentHistory(this.props.businessId, "", false);
    }*/
  }
  handleSubmitS() {
    let self = this;
    const value = this.state.valueStream;
    if (value.length > 0) {
      if (!this.state.awaitingConnection) {
        this.setState({
          messagesStream: [
            ...this.state.messagesStream,
            { text: value, time: new Date(), id: uuidv1() }
          ],
          valueStream: ""
        });
        //if (ls.get("streamInProgress")) {
        let obj = {
          messageText: value,
          dialogId: ls.get("dialogId"),
          userId: ls.get("userId"),
          type: "STREAM"
        };
        console.log(obj);
        self.socket.emit("messageOnStream", JSON.stringify(obj));
        //}
      }
    }
  }

  handleSubmit(event) {
    let self = this;
    const value = this.state.value;
    const rndUser = getRndInteger(1, 8);
    const rndAdmin = getRndInteger(1, 2);
    if (value.length > 0) {
      if (!this.state.startedFlag && !this.state.awaitingConnection) {
        this.setState({
          messages: [
            ...this.state.messages,
            {
              text: value,
              time: new Date(),
              id: uuidv1(),
              photo: `https://witheyezon.com/eyezonsite/static/images/user${rndUser}.png`
            }
          ],
          value: "",
          awaitingConnection: true,
          lastValue: value
          /*sentHistory: {
          message: { text: value, time: new Date(), id: uuidv1() },
          status: true
        }*/
        });

        axios
          .post("https://eyezon.herokuapp.com/api/dialog", {
            client: ls.get("userId"),
            title: value,
            websiteUrl: currentUrl,
            button: self.props.buttonId,
            description: value
          })
          .then(function(response) {
            console.log("U sent the request - thats new response:", response);
            ls.set("dialogId", response.data._id);
            self.socket.emit("enterDialog", response.data._id);
            ls.set("adminIcon", rndAdmin);
            ls.set("userIcon", rndUser);
            const url = `https://eyezon.herokuapp.com/api/button/${this.props.buttonId}/event`;
            axios
              .post(url, {
                eventType: "SENDED_REQUESTS"
              })
              .then(function(response) {
                console.log("button clicked", response);
              })
              .catch(function(error) {
                console.log(error);
              });
            /*let obj = {
            messageText: value,
            dialogId: response.data._id,
            userId: ls.get("userId")
          };
          console.log(obj);
          self.socket.emit("message", JSON.stringify(obj));*/
            //ls.set("conversationId", members[0]._id);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (!this.state.awaitingConnection) {
        this.setState({
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
        });
        if (ls.get("streamInProgress")) {
          let obj = {
            messageText: value,
            dialogId: ls.get("dialogId"),
            userId: ls.get("userId"),
            type: "DIALOG"
          };
          console.log(obj);
          self.socket.emit("message", JSON.stringify(obj));
        } else {
          let obj = {
            messageText: value,
            dialogId: ls.get("dialogId"),
            userId: ls.get("userId"),
            type: "DIALOG"
          };
          console.log(obj);
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
      console.log("onorientationchange", window.innerHeight);
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
  componentDidMount() {
    //this.handleChangeOrientationWrapper();
  }
  render() {
    //console.log("Display flag: ", this.state.displayFlag);
    return (
      <ChatWrapper displayFlag={this.state.displayFlag}>
        <JsChatOverlay
          onClick={() => {
            this.setState({
              streamFlag: false
            });
            if (this.live) {
              /*this.live.pause();*/
            }
            if (this.loadedVideo.getInternalPlayer()) {
              this.loadedVideo.getInternalPlayer().pause();
            }
            this.props.destroy();
          }}
        />

        <WindowWrapper>
          <JsChatWindow
            visible={!this.state.streamFlag}
            height={this.props.innerHeight}
          >
            <JsChatMessageContainer>
              {!this.state.messages ||
              this.state.messages.length ==
                0 /*&&
                (!this.state.sentHistory || !this.state.sentHistory.status)*/ ? (
                <JsChatMessagePlaceholder>
                  <PlaceholderMessage>
                    {this.props.greetingText}
                    {/*Участники команд расскажут о проекте и ответят на все
                      интересующие вопросы!*/}
                    {/*We're here to share our eyes with you!*/}
                    {/* Just ask, and our staff will help answer any
                    of your questions using the magic of LIVE streams.</PlaceholderMessage>*/}
                  </PlaceholderMessage>

                  <JsChatEmpty src="https://witheyezon.com/eyezonsite/static/images/empty.png" />
                </JsChatMessagePlaceholder>
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
                />
              )}
              <form>
                <div style={{ flexDirection: "column  !important" }}>
                  <InputFieldA
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Спросите что-нибудь ;)"
                    onKeyPress={event => {
                      if (event.key === "Enter") {
                        this.handleSubmit(event);
                      }
                    }}
                  />

                  <SendRequest onClick={this.handleSubmit}>
                    {/*Send*/}Отправить
                  </SendRequest>
                </div>
              </form>
              <CloseWrapperA visibleExtra={this.state.photoSrc}>
                <CloseButton
                  onClick={() => {
                    this.setState({
                      streamFlag: false
                    });
                    /*this.live.pause();*/
                    if (this.loadedVideo.getInternalPlayer()) {
                      this.loadedVideo.getInternalPlayer().pause();
                    }
                    this.props.destroy();
                  }}
                />
              </CloseWrapperA>
            </JsChatMessageContainer>
          </JsChatWindow>

          <StreamWrapper
            height={this.props.innerHeight}
            visible={this.state.streamFlag /*true*/}
          >
            <VideoWrapperS visible={this.state.streamFlag /*true*/}>
              {/*<video
                id="live"
                ref={stream => {
                  this.live = stream;
                }}
                controls
              />
             */}
              {true && (
                <iframe
                  id="fp_embed_player"
                  src={`https://wcs5-eu.flashphoner.com:8444/embed_player?urlServer=wss://server.witheyezon.com:8443&streamName=${ls.get(
                    "dialogId"
                  )}&mediaProviders=WebRTC`}
                  marginWidth="0"
                  marginHeight="0"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen="allowfullscreen"
                />
              )}
              <CloseWrapper>
                <CloseButton
                  onClick={() => {
                    this.setState({
                      streamFlag: false
                    });
                    /*this.live.pause();
                    flvPlayer.destroy();*/
                    ls.set("streamInProgress", false);
                  }}
                />
              </CloseWrapper>
              <StreamChat messages={this.state.messagesStream} />
              <ControlShader />
            </VideoWrapperS>
            <TextFieldExtra>
              <InputFieldA
                stream
                type="text"
                value={this.state.valueStream}
                onChange={this.handleChangeInStream}
                placeholder="Спросите что-нибудь ;)"
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.handleSubmitS();
                  }
                }}
              />
            </TextFieldExtra>
            <SendRequest
              stream
              onClick={() => {
                this.handleSubmitS();
              }}
            >
              {/*Send*/}Отправить
            </SendRequest>
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
