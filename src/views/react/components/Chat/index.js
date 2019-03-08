import React from "react";

import PropTypes from "prop-types";

import styled from "styled-components";
import empty from "./empty.png";

import axios from "axios";
import ls from "local-storage";

import ReactPlayer from "react-player";
import poster from "./poster.svg";
import favicon from "./favicon.png";
import arrow from "./arrow2.svg";
import { MessageArea } from "./messageArea";
import { media } from "../../../../utils/media";
const uuidv1 = require("uuid/v1");
let currentUrl = window.location.href;
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

load("https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js")
  .then(function() {
    console.log("Loaded!");
  })
  .catch(function(err) {
    console.error("Something went wrong!", err);
  });
const io = require("socket.io-client");
const storedToken = ls.get("token");
const storedId = ls.get("userId");
const conversationId = ls.get("conversationId");

const VideoWrapper = styled.div`
  width: 273px;
  height: 473px;
  margin-left: 50px;
  border-radius: 10px;
  overflow: hidden;
  display: ${props => (props.visible ? "block" : "none")};
`;
const PhotoWrapper = styled.div`
  width: 273px;
  height: 473px;
  margin-left: 50px;
  border-radius: 10px;
  overflow: hidden;
  display: ${props => (props.visible ? "block" : "none")};
`;
const WindowWrapper = styled.div`
  display: flex;
  z-index: 10003;
  position: fixed;

  top: 15%;
  ${media.desktop`
  top: 0%;
  width: 100vw;
  
  `};
`;

const CloseButtonB = styled.span`
  position: relative;
  left: 246px;
  top: 13px;
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
`;
const CloseButtonC = styled.span`
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
`;
const CloseWrapper = styled.div`
  position: absolute;
  right: 28px;
  top: 14px;
`;
const CloseWrapperA = styled.div`
  position: absolute;
  right: 28px;
  top: 13px;
`;

const ChatWrapper = styled.div`
  color: black;
  width: 100%;
  display: ${props => (props.displayFlag ? "flex" : "none")};
  justify-content: center;
  font-family: "Mont";
`;

const InputFieldA = styled.input`
  height: 28px;
  color: black;
  width: 100%;
  background: #f5f5f5;
  border: 0.5px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0px 10px;
  font-family: "Mont";
  font-weight: normal;
  font-size: 11px;
  outline: 0;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.div`
  background: url(${props => props.src});
  width: 273px;
  height: 473px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
`;

const NotificationMessageWrapper = styled.div`
  position: fixed;
  left: 0px;
  top: 135px;
  z-index: 20000;
  display: ${props => (props.toggle ? "flex" : "none")};
  flex-direction: column;
`;
const NotificationMessageArrow = styled.img`
  margin-left: 150px;
  width: 220px;
  height: 270px;
`;
const NotificationMessageText = styled.span`
  font-family: "Caveat";
  font-weight: bold;
  font-size: 35px;
  margin-left: 75px;
  width: 360px;
  margin-top: 25px;
  color: white;
`;

const SendRequest = styled.button`
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
`;

const JsChatWindow = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  background: #fff;

  width: 462px;
  height: 473px;
  padding: 40px 40px;

  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  ${media.desktop`
  height: 100vh;
  padding: 0px 40px;
  & > :first-child {
    margin-top: 40px;
  }
  `};
`;
const JsChatOverlay = styled.div`
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
`;
const JsChatMessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
`;
const JsChatMessagePlaceholder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  flex: 1;
  & > :first-child {
    margin-top: 80px;
  }
`;
const JsChatEmpty = styled.img`
  margin-top: 60px;
  width: 176px;
  height: 72px;
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
      videoElement: this.live,
      photoSrc: null,
      videoSrc: null,
      streamToVideo: null,
      notificationMessageToggle: false,
      videoManipulateId: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadInitialMessages = this.loadInitialMessages.bind(this);
    this.handleStreamClick = this.handleStreamClick.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handleStreamToVideo = this.handleStreamToVideo.bind(this);

    this.notifyMe = this.notifyMe.bind(this);
    this.notificationPermission = this.notificationPermission.bind(this);
  }

  notifyMe(message, href) {
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
        new_window.location.href = event.target.data; //set url of newly created window(tab) and focus
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
            new_window.location.href = event.target.data; //set url of newly created window(tab) and focus
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
        if (data.userId !== storedId) {
          if (!ls.get("conversationId")) {
            ls.set("conversationId", data.requestId);
          }
          console.log("u got a reply again", data);
          this.notifyMe("New message at Eyezon button", currentUrl);
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
          }
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
      this.socket.on("portOnline", data => {
        console.log("port on data:", data);
        this.notifyMe("Stream started at Eyezon button", currentUrl);
        this.socket.emit("joinRoom", ls.get("streamDamnId"));
      });
      this.socket.on("portOffline", data => {
        console.log("port off data:", data);
        this.notifyMe("Stream ended at Eyezon button", currentUrl);
        ls.set("streamInProgress", false);
        let objlv = {
          event: "leaveRoom",
          room: ls.get("streamDamnId")
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
              const buttonUserId = ls.get("userId");
              if (
                users.filter(
                  user => user.userId === buttonUserId && user.type === "joiner"
                ).length === 0
              ) {
                self.loadInitialMessages([]);
              } else {
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
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      }
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleStreamClick(url) {
    ls.set("streamInProgress", true);
    console.log(url);
    let self = this;
    this.setState({
      streamLink: url,
      streamFlag: true,
      photoSrc: null
    });
    if (flvjs.isSupported()) {
      let videoElement = this.live;
      let flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: url
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }
    console.log("first success");
    let obj = {
      event: "joinRoom",
      room: ls.get("streamDamnId")
    };
    this.socket.emit("port", JSON.stringify(obj));
  }

  handlePhoto(src) {
    this.setState({
      photoSrc: src,
      streamFlag: false,
      videoSrc: null
    });
  }

  handleVideo(src, videoManipulateId) {
    this.setState({
      videoSrc: src,
      photoSrc: null,
      streamFlag: false,
      videoManipulateId: videoManipulateId
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
    if (nextProps.displayChat) {
      this.notificationPermission();
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
    this.setState({
      messages: msgs,
      firstTimeFlag: false,
      startedFlag: msgs.length > 1 ? true : false
    });
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
        awaitingConnection: true
      });
      axios
        .get("https://api.eyezon.app/ports")
        .then(function(response) {
          console.log(response);
          console.log(value);
          axios
            .post(
              `https://api.eyezon.app/ports/requestBusinessStream/${
                self.props.businessId
              }` /*members[0]._id*/,
              {
                message: value
              }
            )
            .then(function(response) {
              console.log(response);
              //ls.set("conversationId", members[0]._id);
            })
            .catch(function(error) {
              console.log(error);
            });
          //}

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
          room: ls.get("streamDamnId"),
          text: value
        };
        console.log(obj);
        self.socket.emit("port", JSON.stringify(obj));
      } else {
        axios
          .put(`https://api.eyezon.app/messages/${port}`, {
            message: value
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
              this.live.pause();
            }}
          />

          <WindowWrapper>
            <JsChatWindow>
              <JsChatMessageContainer>
                <CloseWrapperA>
                  <CloseButtonC
                    onClick={() => {
                      this.props.destroy();
                      this.setState({
                        streamFlag: false
                      });
                      this.live.pause();
                    }}
                  />
                </CloseWrapperA>
                {!this.state.messages || this.state.messages.length == 0 ? (
                  <JsChatMessagePlaceholder>
                    <div>Не стесняйтесь, спросите!</div>
                    <div>Наши сотрудники ответят на все ваши вопросы</div>
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
                  />
                )}
                <form onSubmit={this.handleSubmit}>
                  <div style={{ flexDirection: "column" }}>
                    <label>
                      <InputFieldA
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Задайте вопрос"
                      />
                    </label>
                    <SendRequest type="submit" value="Submit">
                      Отправить
                    </SendRequest>
                  </div>
                </form>
              </JsChatMessageContainer>
            </JsChatWindow>

            <VideoWrapper visible={this.state.streamFlag}>
              <video
                id="live"
                ref={video => {
                  this.live = video;
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
                  }}
                />
              </CloseWrapper>
            </VideoWrapper>
            <VideoWrapper visible={this.state.videoSrc}>
              <ReactPlayer
                url={this.state.videoSrc}
                playing
                width="273px"
                height="473px"
                controls
              />
              <CloseWrapper>
                <CloseButtonC
                  onClick={() => {
                    this.setState({
                      videoSrc: null
                    });
                    if (this.state.paused) {
                      this.state.paused();
                    }
                  }}
                />
              </CloseWrapper>
            </VideoWrapper>
            <PhotoWrapper visible={this.state.photoSrc}>
              <Image src={this.state.photoSrc}>
                <CloseButtonB
                  onClick={() => {
                    this.setState({
                      photoSrc: null
                    });
                  }}
                />
              </Image>
            </PhotoWrapper>
          </WindowWrapper>
        </ChatWrapper>
      </React.Fragment>
    );
  }
}

export default Chat;
