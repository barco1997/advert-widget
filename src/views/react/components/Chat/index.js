import React from "react";

import styled from "styled-components";
import empty from "./empty.png";

import axios from "axios";
import ls from "local-storage";

import ReactPlayer from "react-player";

import favicon from "./favicon.png";
import arrow from "./arrow2.svg";
import { MessageArea } from "./messageArea";
import { media } from "../../../../utils/media";
import {
  setConversationArray,
  setConversationIdValue,
  getLiveIdValue,
  setLiveArray,
  getSentHistory,
  setSentHistory
} from "../../constants";
//require("./flv.min.js");
let flvPlayer;
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

load(
  "https://gitcdn.xyz/cdn/esterTion/live_html5_lib/c3c77fa197621a0560a9a9d16cbe8bf8d4d39bbb/flv.min.js"
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
    width: 319px;
    height: 553px;
    margin-left: 50px;
    border-radius: 10px;
    overflow: hidden;
    & > video {
      width: 100%;
      height: 100%;
    }
    display: ${props => (props.visible ? "block" : "none")};
    ${media.desktop`
  top: 0%;
  width: 100vw;
  height: 100vh;
  
  position: fixed;
  border-radius: 0px;
  margin-left: 0px;
  background: black;
  & > video {
    
  border-radius: 0px;
  }
  `};
  }
`;

const PhotoWrapper = styled.div`
  &&& {
    width: 319px;
    height: 553px;
    margin-left: 50px;
    border-radius: 10px;
    overflow: hidden;
    display: ${props => (props.visible ? "block" : "none")};
    ${media.desktop`
  top: 0%;
  width: 100vw;
  height: 100vh;
  position: fixed;
  border-radius: 0px;
  margin-left: 0px;
  & > div {
    width: 100vw;
  height: 100vh;
  border-radius: 0px;
  }
  `};
  }
`;
const WindowWrapper = styled.div`
  &&& {
    display: flex;
    z-index: 10003;
    position: fixed;
    height: 553px;
    max-width: 85%;
    top: 50%;
    margin-top: -276px;
    bottom: 15%;
    ${media.desktop`
      top: 0%;
      margin-top: 0px;
      height: auto;
  `};
    ${media.tablet`
      
      max-width: 100%;
      
  `};
  }
`;

const CloseButtonB = styled.span`
  &&& {
    position: relative;
    left: 0px;
    top: 0px;
    width: 14px;
    height: 14px;
    opacity: 0.3;
    &:hover {
      opacity: 1;
    }
    &:before,
    &:after {
      position: absolute;
      left: 7px;
      content: " ";
      height: 14px;
      width: 3px;
      background-color: #333;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
`;
const CloseButtonC = styled.span`
  &&& {
    position: relative;
    left: 0px;
    top: 0px;
    width: 14px;
    height: 14px;
    opacity: 0.3;
    &:hover {
      opacity: 1;
    }
    &:before,
    &:after {
      position: absolute;
      left: 7px;
      content: " ";
      height: 14px;
      width: 3px;
      background-color: #333;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
`;
const CloseWrapper = styled.div`
  &&& {
    position: absolute;
    right: 28px;
    top: 14px;
  }
`;
const CloseWrapperB = styled.div`
  &&& {
    position: absolute;
    right: 28px;
    top: 14px;
  }
`;
const CloseWrapperA = styled.div`
  &&& {
    position: absolute;
    right: -7px;

    top: 14px;
    ${media.desktop`
  top: -14px;
  right: 14px;
  `};
  }
`;

const ChatWrapper = styled.div`
  &&& {
    color: black;
    width: 100%;
    display: ${props => (props.displayFlag ? "flex" : "none")};
    justify-content: center;
    font-family: "Mont";
  }
`;

const InputFieldA = styled.input`
  &&& {
    height: 42px;
    color: black;
    width: 100%;
    max-width: 100%;
    background: #f5f5f5;
    border: 0.5px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0px 10px;
    font-family: "Mont";
    font-weight: normal;
    font-size: 14px;
    outline: 0;
    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const Image = styled.div`
  &&& {
    background: url(${props => props.src});
    width: 319px;
    height: 553px;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    ${media.desktop`
  border-radius: 0px;
  `};
  }
`;

const NotificationMessageWrapper = styled.div`
  &&& {
    position: fixed;
    left: 0px;
    top: 135px;
    z-index: 20000;
    display: ${props => (props.toggle ? "flex" : "none")};
    flex-direction: column;
  }
`;
const NotificationMessageArrow = styled.img`
  &&& {
    margin-left: 150px;
    width: 220px;
    height: 270px;
  }
`;
const NotificationMessageText = styled.span`
  &&& {
    font-family: "Caveat";
    font-weight: bold;
    font-size: 35px;
    margin-left: 75px;
    width: 360px;
    margin-top: 25px;
    color: white;
  }
`;

const SendRequest = styled.button`
  &&& {
    width: 181px;
    height: 28px;
    background: #ff2d55;
    border-radius: 100px;
    margin-top: 15px;
    text-decoration: none;
    border-width: 0px;

    -webkit-font-smoothing: antialiased;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
    outline: 0;
    color: white;
    font-size: 11px;
    padding-top: 3px;
    font-weight: normal;
    font-family: "Mont";
    ${media.desktop`
  width: 100%;
  height: 40px;
  font-size: 14px;
  `};
  }
`;

const JsChatWindow = styled.div`
  &&& {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    background: #fff;

    width: 542px;
    height: 553px;

    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    ${media.desktop`
  height: 100vh;
  width: 100vw;
  border-radius: 0px;
  & > :first-child {
    
    margin-top: 40px;
  }
  `};
  }
`;
const JsChatOverlay = styled.div`
  &&& {
    z-index: 10002;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    opacity: 0.4;
    background-color: #000;
    ${media.desktop`
  display: none;
  `};
  }
`;
const JsChatMessageContainer = styled.div`
  &&& {
    width: 462px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 40px 0px;

    margin: 0px 40px;

    flex: 1;
    position: relative;
    ${media.desktop`
  width: auto;
  padding: 0px;
  margin: 0px 15px;
  margin-bottom: 80px;
  `};
    ${media.android`
  max-width: 300px;
  `};
  }
`;
const JsChatMessagePlaceholder = styled.div`
  &&& {
    width: 100%;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: rgba(0, 0, 0, 0.5);
    flex: 1;
    & > :first-child {
      margin-top: 80px;
    }
  }
`;
const JsChatEmpty = styled.img`
  &&& {
    margin-top: 60px;
    width: 176px;
    height: 72px;
  }
`;

const SizedForm = styled.form`
  &&& {
    width: 100%;
    max-width: 100%;
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
      sentHistory: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadInitialMessages = this.loadInitialMessages.bind(this);
    this.handleStreamClick = this.handleStreamClick.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handleStreamToVideo = this.handleStreamToVideo.bind(this);
    this.handlePropositionClick = this.handlePropositionClick.bind(this);

    this.notifyMe = this.notifyMe.bind(this);
    this.notificationPermission = this.notificationPermission.bind(this);
  }

  notifyMe(message, href, businessId) {
    // Проверка поддержки браузером уведомлений
    let options = {
      icon: favicon,
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
            "?open=true&businessId=",
            businessId
          );
        } else {
          console.log("target");
          new_window.location.href = event.target.data.concat(
            "?open=true&businessId=",
            businessId
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
                "?open=true&businessId=",
                this.props.businessId
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

    if (ls.get("token")) {
      this.socket = io("https://api.eyezon.app/", {
        query: "token=" + ls.get("token"),
        transports: ["websocket"],
        upgrade: false
      });
      this.socket.on("connect", () => {
        console.log("socket got connected");
      });
      this.socket.on("disconnect", () => {
        console.log("socket got disconnected");
        this.socket.open();
      });
      this.socket.on("messageUpdated", data => {
        console.log("message got updated", data.message.attachments[0]);
        this.setState({ streamToVideo: data.message.attachments[0] });
      });
      this.socket.on("newMessage", data => {
        /**feature */
        let notificationCount = ls.get("notificationCount");
        if (notificationCount) {
          notificationCount++;
        } else {
          notificationCount = 1;
        }
        ls.set("notificationCount", notificationCount);
        //() => self.props.setNotificationStatus(true);
        self.props.incrementNotifications();
        /********* */
        if (data.userId !== storedId) {
          if (!ls.get("conversationId")) {
            ls.set("conversationId", data.requestId);
            setConversationArray(self.props.businessId, data.requestId);
          }
          console.log("u got a reply again", data);
          console.log("props: ", self.props);
          if (!iOS) {
            this.notifyMe(
              "New message at Eyezon button",
              currentUrl,
              self.props.businessId
            );
          }
          let type;
          let source;
          let thumbnail;
          if (
            data.attachments.length > 0 &&
            data.attachments[0].type === "audio"
          ) {
            type = "audio";
            source = data.attachments[0].src;
          }

          if (
            data.attachments.length > 0 &&
            data.attachments[0].type === "video"
          ) {
            type = "video";
            source = data.attachments[0].src;
            thumbnail = data.attachments[0].thumbnail;
          }

          if (
            data.attachments.length > 0 &&
            data.attachments[0].type === "photo"
          ) {
            type = "photo";
            source = data.attachments[0].src;
          }

          if (
            data.attachments.length > 0 &&
            data.attachments[0].type === "stream"
          ) {
            type = "stream";
            ls.set("streamDamnId", data._id);
            setLiveArray(self.props.businessId, data._id);
          }
          setSentHistory(self.props.businessId, "", false);
          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: data.message,
                time: new Date(),
                awaitingConnection: false,
                photo: data.user.photo,
                user: data.user.firstName.concat(" ", data.user.lastName),
                type: type,
                flv:
                  type === "stream"
                    ? `https://static.eyezon.app/live/${data._id}.flv`
                    : null,
                streamId: type === "stream" ? data._id : null,

                src: source,
                thumb: thumbnail,
                id: data._id
              }
            ],
            awaitingConnection: false,
            startedFlag: true,
            sentHistory: { message: "", status: false }
          });
        }
      });
      this.socket.on("portOnline", data => {
        console.log("port on data:", data);
        if (!iOS) {
          this.notifyMe(
            "Stream started at Eyezon button",
            currentUrl,
            self.props.businessId
          );
        }
        /*this.socket.emit(
          "joinRoom",
          getLiveIdValue(self.props.businessId) /*ls.get("streamDamnId")*/
        /*);*/
      });
      this.socket.on("portOffline", data => {
        console.log("port off data:", data);
        if (!iOS) {
          this.notifyMe(
            "Stream ended at Eyezon button",
            currentUrl,
            self.props.businessId
          );
        }
        ls.set("streamInProgress", false);
        let objlv = {
          event: "leaveRoom",
          room: /*ls.get("streamDamnId")*/ getLiveIdValue(self.props.businessId)
        };
        this.socket.emit("port", JSON.stringify(objlv));
      });

      this.socket.on("port", data => {
        console.log("what data:", data);
        if (data.event === "comment") {
          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: data.text,
                time: new Date(),
                photo: data.user.photo,
                user: data.user.firstName.concat(" ", data.user.lastName),
                type: null,
                id: uuidv1()
              }
            ]
          });
        }
      });
      this.socket.open();
    }
    axios
      .get(`https://api.eyezon.app/market/transactions`)
      .then(function(response) {
        console.log(response.data.transactions.totalAmount);
        self.setState({
          transactionLimit: response.data.transactions.totalAmount
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillUpdate(nextProps) {
    let self = this;
    if (
      nextProps.displayChat &&
      nextProps.displayChat !== this.props.displayChat
    ) {
      if (ls.get("conversationId")) {
        if (this.state.firstTimeFlag) {
          axios
            .get(
              `https://api.eyezon.app/messages/get/${ls.get("conversationId")}/`
            )
            .then(function(response) {
              const users = response.data.users;
              const messages = response.data.messages;
              const owner = users.find(user => user.type === "owner");
              console.log("businessId: ", self.props.businessId);
              if (owner.businessId === self.props.businessId) {
                console.log(messages);
                const editedMessages = messages.map(message => ({
                  text: message.message,
                  time: message.time,
                  photo: users.filter(user => user.userId === message.userId)[0]
                    .photo,
                  user: users
                    .filter(user => user.userId === message.userId)[0]
                    .firstName.concat(
                      " ",
                      users.filter(user => user.userId === message.userId)[0]
                        .lastName
                    ),
                  type:
                    message.attachments.length > 0
                      ? message.attachments[0].type
                      : "message",
                  src:
                    message.attachments.length > 0
                      ? message.attachments[0].src
                      : null,
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
                console.log("Users - ", users);

                self.loadInitialMessages(editedMessages);
              } /*else {
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
        const sh = getSentHistory(this.props.businessId);
        console.log("SH: ", sh);
        this.setState({
          sentHistory: sh
        });
      }
    }
  }

  componentWillUnmount() {
    ls.set("streamInProgress", false);
    this.socket.close();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleStreamClick(id) {
    if (this.loadedVideo.getInternalPlayer()) {
      this.loadedVideo.getInternalPlayer().pause();
    }
    this.setState({
      streamLink: url,
      streamFlag: true,
      photoSrc: null
    });
    ls.set("streamInProgress", true);
    ls.set("streamDamnId", id);
    setLiveArray(self.props.businessId, data.id);
    let self = this;
    let url = `https://static.eyezon.app/live/${id}.flv`;
    let stream = this.live;
    console.log(
      "THIS IS STREAM HLS LINK",
      `https://static.eyezon.app/live/${id}/index.m3u8`
    );

    if (flvjs.isSupported()) {
      flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: url
      });
      flvPlayer.attachMediaElement(stream);
      flvPlayer.load();
      flvPlayer.play();
    } /*else if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(`https://static.eyezon.app/live/${id}/index.m3u8`);
      hls.attachMedia(stream);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        if (stream.requestFullscreen) {
          stream.requestFullscreen();
        } else if (stream.mozRequestFullScreen) {
          stream.mozRequestFullScreen();
        } else if (stream.webkitRequestFullscreen) {
          stream.webkitRequestFullscreen();
        } else if (stream.msRequestFullscreen) {
          stream.msRequestFullscreen();
        }
        stream.play();
      });
      
    }*/
    if (iOS) {
      alert(
        "Извините, но на iOS стримы пока не поддерживаются,  дождитесь окончания трансляции и просмотрите запись, просим прощения за неудобства"
      );
    }
    console.log("first success");
    let obj = {
      event: "joinRoom",
      room: /*ls.get("streamDamnId")*/ getLiveIdValue(self.props.businessId)
    };
    this.socket.emit("port", JSON.stringify(obj));
  }

  handlePhoto(src) {
    if (this.loadedVideo.getInternalPlayer()) {
      this.loadedVideo.getInternalPlayer().pause();
    }
    if (this.live) {
      this.live.pause();
    }

    this.setState({
      photoSrc: src,
      streamFlag: false,
      videoSrc: null
    });
  }

  handleVideo(src, videoManipulateId) {
    if (this.live) {
      this.live.pause();
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

  handlePropositionClick(id) {
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
    setConversationArray(self.props.businessId, chat.port.id);
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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      displayFlag: nextProps.displayChat
    });
    if (nextProps.displayChat) {
      if (!iOS) {
        this.notificationPermission();
      }
    }
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
    const sh = getSentHistory(this.props.businessId);
    console.log("the sentH value: ", sh);
    const flag = msgs.length > 1;
    this.setState({
      messages: msgs,
      firstTimeFlag: false,
      startedFlag: flag ? true : false,
      existingChats: [],
      awaitingConnection: false,
      sentHistory: flag ? { message: "", status: false } : sh
    });
    if (flag) {
      setSentHistory(this.props.businessId, "", false);
    }
  }

  handleSubmit(event) {
    let self = this;
    if (!this.state.startedFlag && !this.state.awaitingConnection) {
      const value = this.state.value;
      this.setState({
        messages: [
          ...this.state.messages,
          { text: value, time: new Date(), id: uuidv1() }
        ],
        value: "",
        awaitingConnection: true,
        lastValue: value,
        sentHistory: {
          message: { text: value, time: new Date(), id: uuidv1() },
          status: true
        }
      });
      setSentHistory(
        self.props.businessId,
        { text: value, time: new Date(), id: uuidv1() },
        true
      );
      axios
        .get(`https://api.eyezon.app/ports?businessId=${self.props.businessId}`)
        .then(function(response) {
          const freePorts = response.data.ports.filter(
            port => !port.isDiscussionInProgress
          );
          console.log("The ports needed", freePorts);

          console.log(value);
          //
          //
          //
          //
          //
          if (freePorts.length !== 0) {
            axios
              .post(
                `https://api.eyezon.app/ports/requestBusinessStream/${
                  self.props.businessId
                }`,
                {
                  message: value
                  /*url: currentUrl*/
                }
              )
              .then(function(response) {
                console.log(
                  "U sent the request - thats new response:",
                  response
                );

                //ls.set("conversationId", members[0]._id);
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            console.log("The ports with conversation", response.data.ports);
            response.data.ports.map(port => {
              axios
                .get(`https://api.eyezon.app/messages/get/${port._id}/`)
                .then(function(response) {
                  //
                  console.log("Mapping port to messages", response);
                  self.setState({
                    existingChats: [
                      ...self.state.existingChats,
                      {
                        port: {
                          id: port._id,
                          date: port.waiters[0].date,
                          request: port.waiters[0].message
                        },
                        messages: response.data
                      }
                    ]
                  });

                  //
                });
            });
            /*self.setState({
              existingChats: response.data.ports
            });*/
          }
          //
          //
          //
          //end of temporary code
        })
        .catch(function(error) {
          console.log(error);
        });
    } else if (!this.state.awaitingConnection) {
      const port = ls.get("conversationId");
      const value = this.state.value;

      this.setState({
        messages: [
          ...this.state.messages,
          { text: value, time: new Date(), id: uuidv1() }
        ],
        value: ""
      });
      if (ls.get("streamInProgress")) {
        let obj = {
          event: "comment",
          room: /*ls.get("streamDamnId")*/ getLiveIdValue(
            self.props.businessId
          ),
          text: value
        };
        console.log(obj);
        self.socket.emit("port", JSON.stringify(obj));
      } else {
        axios
          .put(`https://api.eyezon.app/messages/${port}`, {
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
    }
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <ChatWrapper displayFlag={this.state.displayFlag}>
          <NotificationMessageWrapper
            toggle={this.state.notificationMessageToggle}
          >
            <NotificationMessageArrow src={arrow} />
            <NotificationMessageText>
              Включи уведомления, если хочешь получить ответ
            </NotificationMessageText>
          </NotificationMessageWrapper>
          <JsChatOverlay
            onClick={() => {
              this.props.destroy();
              this.setState({
                streamFlag: false
              });
              if (this.live) {
                this.live.pause();
              }
              if (this.loadedVideo.getInternalPlayer()) {
                this.loadedVideo.getInternalPlayer().pause();
              }
            }}
          />

          <WindowWrapper>
            <JsChatWindow>
              <JsChatMessageContainer>
                {(!this.state.messages || this.state.messages.length == 0) &&
                (!this.state.sentHistory || !this.state.sentHistory.status) ? (
                  <JsChatMessagePlaceholder>
                    <div>Не стесняйтесь, спросите! </div>
                    <div style={{ textAlign: "center" }}>
                      Наши сотрудники с радостью ответят на все ваши вопросы
                      {/*Участники команд расскажут о проекте и ответят на все
                      интересующие вопросы!*/}
                    </div>
                    <JsChatEmpty src={empty} />
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
                    handlePropositionClick={this.handlePropositionClick}
                    transactionLimit={this.state.transactionLimit}
                    sentHistory={this.state.sentHistory}
                  />
                )}
                <form onSubmit={this.handleSubmit}>
                  <div style={{ flexDirection: "column" }}>
                    <InputFieldA
                      type="text"
                      value={this.state.value}
                      onChange={this.handleChange}
                      placeholder="Задайте вопрос"
                    />

                    <SendRequest type="submit" value="Submit">
                      Отправить
                    </SendRequest>
                  </div>
                </form>
                <CloseWrapperA visibleExtra={this.state.photoSrc}>
                  <CloseButtonC
                    onClick={() => {
                      this.props.destroy();
                      this.setState({
                        streamFlag: false
                      });
                      this.live.pause();
                      if (this.loadedVideo.getInternalPlayer()) {
                        this.loadedVideo.getInternalPlayer().pause();
                      }
                    }}
                  />
                </CloseWrapperA>
              </JsChatMessageContainer>
            </JsChatWindow>

            <VideoWrapper visible={this.state.streamFlag}>
              <video
                id="live"
                ref={stream => {
                  this.live = stream;
                }}
                controls
              />
              <CloseWrapper>
                <CloseButtonC
                  onClick={() => {
                    this.setState({
                      streamFlag: false
                    });
                    this.live.pause();
                    flvPlayer.destroy();
                    ls.set("streamInProgress", false);
                  }}
                />
              </CloseWrapper>
            </VideoWrapper>

            <VideoWrapper
              visible={this.state.videoSrc && !this.state.streamFlag}
            >
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
                  this.live.pause();
                }}
              />
              <CloseWrapper>
                <CloseButtonC
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
                <CloseWrapperB>
                  <CloseButtonB
                    onClick={() => {
                      this.setState({
                        photoSrc: null
                      });
                    }}
                  />
                </CloseWrapperB>
              </Image>
            </PhotoWrapper>
          </WindowWrapper>
        </ChatWrapper>
      </React.Fragment>
    );
  }
}

export default Chat;
