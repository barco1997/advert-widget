import React from "react";
//import PropTypes from "prop-types";
import styled from "styled-components";
//import logo from "./image.png";
//import Message from "../Message/index";
import { Chat } from "../Chat";
import ls from "local-storage";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "./constants";
import { setConversationIdValue } from "../../constants";
import { media } from "../../../../utils/media";
import LoadingCircle from "../Loader";
import MinEmailRequest from "./minemailrequest";
//const messageSound = require("https://witheyezon.com/eyezonsite/static/not.mp3");
//import disableScroll from "disable-scroll";

const io = require("socket.io-client");
//const reqId = ls.get("conversationId");
const storedToken = ls.get("token");
let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
let currentUrl = window.location.href;
//const bodyScroll = require("body-scroll-toggle");
let ifMobile =
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i);

if (storedToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

const ButtonReqWrapper = styled.div`
  &&& {
    width: 100% !important;
    display: flex !important;
    position: relative !important;
  }
`;

const NotificationMessageWrapper = styled.div`
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
`;

const ApiOverlay = styled.div`
  &&& {
    z-index: 20002 !important;
    position: fixed !important;
    top: 0px !important;
    bottom: 0px !important;
    left: 0px !important;
    right: 0px !important;
    opacity: 0.4 !important;
    background-color: #000 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    /*${media.desktop`
    position: absolute !important;
  `};*/
  }
`;

const ButtonWrapper = styled.button`
  &&& {
    text-decoration: none !important;
    box-shadow: none !important;
    -webkit-font-smoothing: antialiased !important;
    -webkit-touch-callout: none !important;
    user-select: none !important;
    cursor: pointer !important;
    outline: 0 !important;
    /*overflow: hidden !important;*/
    position: fixed !important;
    z-index: 9998 !important;
    background: #fff !important;
    right: 2% !important;
    bottom: 30px !important;
    margin: 0 0 0 0 !important;

    background: ${props => (props.color ? props.color : "white  !important")};

    border: solid 1px #dddddd !important;
    border-radius: 28px !important;
    display: flex !important;
    flex-wrap: nowrap !important;
    width: ${props =>
      props.toggle ? "278px  !important" : "42px  !important"}; /*58*/
    min-width: 42px !important;
    height: 51px !important; /*56*/

    align-items: center !important;

    transition: ${props =>
      props.toggle
        ? "width 120ms linear !important"
        : "width 180ms linear !important"};
    font-family: "Montserrat" !important;
    &:focus {
      outline: 0 !important;
    }
  }
`;

const NotificationWrapper = styled.div`
  &&& {
    position: absolute !important;
    top: -7px !important;
    right: -7px !important;
    border-radius: 50% !important;
    color: white !important;
    background: #ff2d55 !important;
    font-size: 10px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 22px !important;
    height: 22px !important;
  }
`;

const JsButtonImageWrapper = styled.div`
  &&& {
    width: 42px !important;
    height: 51px !important;
    border-radius: 28px !important;

    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    min-width: 42px !important;
    max-height: 51px !important;
    cursor: pointer !important;
  }
`;

const JsButtonImage = styled.img`
  &&& {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px !important;
    max-height: 40px !important;
    cursor: pointer !important;
  }
`;
const JsButtonText = styled.div`
  &&& {
    display: flex !important;
    transition: ${props =>
      props.toggle
        ? "opacity 1s ease-in !important"
        : "opacity 100ms linear !important"};

    opacity: ${props => (props.toggle ? "1 !important" : "0 !important")};
    height: 34px !important;

    flex-direction: column !important;
    width: 200px !important;
    margin-right: 14px !important;
    margin-left: 8px !important;
  }
`;

const JsButtonHeader = styled.div`
  &&& {
    font-size: 16px !important;
    font-weight: bold !important;
  }
`;
const JsButtonInfo = styled.div`
  &&& {
    font-size: 8px !important;
    opacity: 0.5 !important;
  }
`;

const MinReqWrapper = styled.div`
  &&& {
    position: relative !important;
    top: 0px !important;
    left: 0px !important;
    width: 100vw !important;
    height: 100vh !important;
    display: block;
    ${media.tablet`
    display: none !important;
  `};
  }
`;

const disableScroll = () => {
  //document.body.classList.add("unscrollable");
  if (ifMobile) {
    const scrollY = document.documentElement.style.getPropertyValue(
      "--scroll-y"
    );
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}`;
  }
};

const enableScroll = () => {
  //document.body.classList.remove("unscrollable");
  if (ifMobile) {
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }
};

export class Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      toggle: false,
      displayMessage: false,
      displayChat: false,
      initializeChat: ls.get("token") ? true : false,
      businessId: this.props.businessId,
      multiButton: false,
      notificationMessageToggle: false,
      apiLoading: false,
      innerHeight: window.innerHeight,
      displayEmailRequest: false,
      emailSentFlag: false,
      displayMainRequest: false,
      currentTitle: null
    };
    this.handleRegistration = this.handleRegistration.bind(this);
    this.notifyMe = this.notifyMe.bind(this);
    this.notificationPermission = this.notificationPermission.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.destroyMessage = this.destroyMessage.bind(this);
    this.destroyChat = this.destroyChat.bind(this);
    this.showChat = this.showChat.bind(this);
    this.showChatHere = this.showChatHere.bind(this);
    this.showMessageHere = this.showMessageHere.bind(this);
    this.joinDialogue = this.joinDialogue.bind(this);
    this.closeRequest = this.closeRequest.bind(this);
    this.closeMainRequest = this.closeMainRequest.bind(this);
    this.showMainRequest = this.showMainRequest.bind(this);
    this.sendEmailDetails = this.sendEmailDetails.bind(this);
  }

  closeRequest() {
    this.setState({
      displayEmailRequest: false
    });
  }

  closeMainRequest() {
    this.setState({
      displayMainRequest: false
    });
  }

  showMainRequest() {
    this.setState({
      displayMainRequest: true
    });
  }

  sendEmailDetails(email, name) {
    this.socket.emit(
      "fillClientData",
      JSON.stringify({
        id: ls.get("userId"),
        name,
        email
      })
    );
    this.setState({
      emailSentFlag: true,
      displayMainRequest: false,
      displayEmailRequest: false,
      displayChat: false
    });
  }

  handleRegistration() {
    //ls.set("conversationPermission", true);
    if (ls.get("userId")) {
      this.showChat();
    } else {
      const mongoObjectId =
        ((new Date().getTime() / 1000) | 0).toString(16) +
        "xxxxxxxxxxxxxxxx"
          .replace(/[x]/g, function() {
            return ((Math.random() * 16) | 0).toString(16);
          })
          .toLowerCase();

      ls.set("userId", mongoObjectId);
      this.showChat();
    }
  }

  componentDidMount() {
    let self = this;
    if (this.props.eyezonGlobal)
      this.props.eyezonGlobal.function = (buttonId, title) =>
        this.handleClick(null, buttonId, title);
    if (ls.get("userId")) {
      const url = `https://eyezon.herokuapp.com/api/button/${
        this.props.buttonId
      }/unread/${ls.get("userId")}`;
      const url2 = `https://eyezon.herokuapp.com/api/client/${ls.get(
        "userId"
      )}`;
      axios
        .get(url)
        .then(function(response) {
          self.props.setNotifications(response.data.count);
        })
        .catch(function(error) {
          console.log(error);
        });
      axios
        .get(url2)
        .then(function(response) {
          self.setState({
            emailSentFlag: true
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
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
          //ls.set("notificationPermission", true);
        }
        self.setState({
          notificationMessageToggle: false
        });
      });
    }
  }

  joinDialogue() {
    if (ls.get("userId")) {
      this.socket.emit("enterSocket", ls.get("userId"));
    }
    if (ls.get("dialogId")) {
      this.socket.emit("enterDialog", ls.get("dialogId"));
    }
  }

  handleClick(e, buttonId, title) {
    this.closeRequest();
    if (title) {
      this.setState({
        currentTitle: title
      });
    } else {
      this.setState({
        currentTitle: null
      });
    }
    //e.preventDefault();
    if (!iOS) {
      this.notificationPermission();
    }
    if (ls.get("dialogId")) {
      this.socket.emit("readMessage", ls.get("dialogId"));
    }

    let self = this;
    self.props.setNotifications(0);
    self.setState({
      buttonId: buttonId,
      apiLoading: true
    });

    if (!ls.get("dialogId")) {
      if (ls.get("userId")) {
        axios
          .post(
            `https://eyezon.herokuapp.com/api/user/${ls.get("userId")}/dialogs`,
            {}
          )
          .then(function(response) {
            if (response.data.count > 0) {
              //let notifPerm = ls.get("conversationPermission");
              /*if (ls.get("conversationPermission")) {
                ls.set("conversationId", response.data.dialogs[0].port._id);
                setConversationArray(
                  self.state.businessId,
                  response.data.dialogs[0].port._id
                );
              }*/
              ls.set("dialogId", response.data.data[0]._id);
              self.showChatHere();
            } else {
              self.handleRegistration();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        self.handleRegistration();
      }
    } else {
      axios
        .post(
          `https://eyezon.herokuapp.com/api/dialog/${ls.get(
            "dialogId"
          )}/messages`,
          {}
        )
        .then(function(response) {
          if (response.data.count > 0) {
            self.showChatHere();
          } else {
            ls.set("dialogId", "");
            self.showChatHere();
          }
        })
        .catch(function(error) {
          ls.set("dialogId", "");
          self.showChatHere();
          console.log(error);
        });
    }
    const url = `https://eyezon.herokuapp.com/api/button/${this.props.buttonId}/event`;
    axios
      .post(url, {
        eventType: "CLICK"
      })
      .then(function(response) {})
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    //

    let self = this;

    //if (ls.get("userId")) {
    this.socket = io("https://eyezon.herokuapp.com", {
      /*query: "token=" + ls.get("token"),*/
      transports: ["websocket"],
      upgrade: false
    });
    this.socket.on("connect", () => {
      this.joinDialogue();
    });
    this.socket.on("received", data => {
      /**feature */
      if (data.user !== ls.get("userId")) {
        this.notificationSound.play();

        self.props.incrementNotifications();

        /***Feature****** */
        if (self.state.initializeChat && self.state.displayChat) {
          self.props.decrementNotifications();
        }
        /******* */
        if (
          "Notification" in window &&
          !(Notification.permission === "granted") &&
          !this.state.emailSentFlag &&
          !this.state.displayChat
        ) {
          self.setState({
            displayEmailRequest: true
          });
        }
        if (!iOS) {
          this.notifyMe(
            "New message at Eyezon button",
            currentUrl,
            self.props.buttonId
          );
        }
      }
    });
    //}

    if (this.props.buttons) {
      this.props.buttons.map(
        button =>
          button.target &&
          button.target.addEventListener("click", event =>
            self.handleClick(event, button.buttonId)
          )
      );
      let b_count = 0;
      if (this.props.button) {
        b_count = 1;
      }
      if (this.props.buttons.length + b_count > 1) {
        this.setState({
          multiButton: true
        });
      }
    }

    if (this.props.ifOpened) {
      this.handleClick(null, this.props.buttonId);
    }
  }

  handleMouseLeave() {
    this.setState({
      toggle: false
    });
  }

  handleMouseEnter() {
    this.setState({
      toggle: false
    });
  }

  destroyMessage() {
    this.setState({ displayMessage: false });
  }
  destroyChat() {
    this.setState({
      displayChat: false,
      initializeChat: false,
      innerHeight: window.innerHeight,
      displayMainRequest: false
    });
    enableScroll();
    //}
  }
  showChat() {
    this.setState({
      displayChat: true,
      displayMessage: false,
      initializeChat: true,
      apiLoading: false
    });
    disableScroll();
  }

  showMessageHere() {
    this.setState({
      displayMessage: true,
      displayChat: false,
      toggle: false
    });
  }

  showChatHere() {
    this.setState({ initializeChat: true }, () => {
      this.setState({
        displayChat: true,
        displayMessage: false,
        toggle: false,
        apiLoading: false
      });
    });
    disableScroll();
    //}
  }

  render() {
    const isOpen = this.state.toggle;

    return (
      <ButtonReqWrapper>
        <audio
          ref={element => {
            this.notificationSound = element;
          }}
          src="https://witheyezon.com/eyezonsite/static/not.mp3"
          hidden="hidden"
        ></audio>
        {this.state.displayEmailRequest && (
          <MinReqWrapper>
            <MinEmailRequest
              closeRequest={this.closeRequest}
              sendEmailDetails={this.sendEmailDetails}
            />
          </MinReqWrapper>
        )}
        <NotificationMessageWrapper
          toggle={this.state.notificationMessageToggle}
        >
          <NotificationMessageArrow src="https://witheyezon.com/eyezonsite/static/images/arrow2.svg" />
          <NotificationMessageText>
            Включи уведомления, если хочешь получить ответ
          </NotificationMessageText>
        </NotificationMessageWrapper>
        {this.state.apiLoading && (
          <ApiOverlay>
            <LoadingCircle loadingFlag />
          </ApiOverlay>
        )}
        {this.props.button && (
          <ButtonWrapper
            color={this.props.color}
            toggle={isOpen}
            onClick={event => this.handleClick(event, this.props.buttonId)}
            /*onMouseEnter={() => this.handleMouseEnter()}
            onMouseLeave={() => this.handleMouseLeave()}*/
          >
            {this.props.notifications > 0 && (
              <NotificationWrapper>
                {this.props.notifications}
              </NotificationWrapper>
            )}

            <JsButtonImageWrapper>
              <JsButtonImage src="https://witheyezon.com/eyezonsite/static/images/image.png" />
              {/* <LoadingCircle loadingFlag />*/}
            </JsButtonImageWrapper>
            <JsButtonText toggle={isOpen}>
              <JsButtonHeader>Запросить трансляцию</JsButtonHeader>
              <JsButtonInfo>
                Уточните все интересующие вас вопросы на онлайн трансляции с
                нашим сотрудником
              </JsButtonInfo>
            </JsButtonText>
          </ButtonWrapper>
        )}
        {/*this.state.displayMessage && (
          <Message destroy={this.destroyMessage} showChat={this.showChat} />
        )*/}
        {this.state.initializeChat && (
          <Chat
            destroy={this.destroyChat}
            displayChat={this.state.displayChat}
            businessId={this.state.businessId}
            buttonId={this.props.buttonId}
            initializeChat={this.state.initializeChat}
            greetingText={this.props.greetingText}
            waitingText={this.props.waitingText}
            innerHeight={this.state.innerHeight}
            joinDialogue={this.joinDialogue}
            displayMainRequest={this.state.displayMainRequest}
            closeMainRequest={this.closeMainRequest}
            showMainRequest={this.showMainRequest}
            emailSentFlag={this.state.emailSentFlag}
            sendEmailDetails={this.sendEmailDetails}
            currentTitle={this.state.currentTitle}
          />
        )}
      </ButtonReqWrapper>
    );
  }
}

export default Button;
