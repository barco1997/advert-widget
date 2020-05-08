import React, { Suspense } from "react";
//import PropTypes from "prop-types";
import styled from "styled-components";
//import logo from "./image.png";
//import Message from "../Message/index";
import ls from "local-storage";
import axios from "axios";
//import { CLIENT_ID, CLIENT_SECRET } from "./constants";
//import Firebase, { FirebaseContext, withFirebase } from "../Firebase";
import { media, mediaType } from "../../../../utils/media";
import LoadingCircle from "../Loader";
//import MinEmailRequest from "./minemailrequest";
import StartButton from "../StartButton";
const LazyChat = React.lazy(() => import("../NewChat"));
import {
  staticUrl,
  socketUrl,
  setConversationIdValue,
  apiBaseUrl,
} from "../../constants";
let overflow = document.body.style.overflow;
const io = require("socket.io-client");

const storedToken = ls.get("token");
let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
let currentUrl = window.location.href;

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
  }
`;

const NotificationMessageWrapper = styled.div`
  &&& {
    position: fixed !important;
    left: 0px !important;
    top: 135px !important;
    z-index: 20000 !important;
    display: ${(props) =>
      props.toggle ? "flex !important" : "none !important"};
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

const disableScroll = (callback) => {
  //document.body.classList.add("unscrollable");
  //if (ifMobile || window.innerHeight < 634) {
  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  const body = document.body;
  if (!mediaType.desktop) {
    body.style.overflow = "hidden";
  } else {
    body.style.position = "fixed";
    body.style.top = `-${scrollY}`;
  }
  setTimeout(() => {
    callback();
  }, 300);

  //}
};

const enableScroll = () => {
  //document.body.classList.remove("unscrollable");
  //if (ifMobile || window.innerHeight < 634) {
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = "";
  body.style.top = "";
  body.style.overflow = overflow;
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  //}
};

export class Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayMessage: false,
      displayChat: false,
      initializeChat: false,
      businessId: this.props.businessId,
      multiButton: false,
      notificationMessageToggle: false,
      apiLoading: false,
      innerHeight: window.innerHeight,
      displayEmailRequest: false,
      emailSentFlag: false,
      displayMainRequest: false,
      currentTitle: null,
      noStreamerFlag: false,
      leaveOption: true,
    };
    this.handleRegistration = this.handleRegistration.bind(this);
    this.notifyMe = this.notifyMe.bind(this);
    this.notificationPermission = this.notificationPermission.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.destroyMessage = this.destroyMessage.bind(this);
    this.destroyChat = this.destroyChat.bind(this);

    this.showChatHere = this.showChatHere.bind(this);
    this.showMessageHere = this.showMessageHere.bind(this);
    this.joinDialogue = this.joinDialogue.bind(this);
    this.closeRequest = this.closeRequest.bind(this);
    this.closeMainRequest = this.closeMainRequest.bind(this);
    this.showMainRequest = this.showMainRequest.bind(this);
    this.sendEmailDetails = this.sendEmailDetails.bind(this);
    this.handleTabFocus = this.handleTabFocus.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.initializeSocket = this.initializeSocket.bind(this);
  }

  closeRequest() {
    this.setState({
      displayEmailRequest: false,
    });
  }

  closeMainRequest() {
    this.setState({
      displayMainRequest: false,
    });
  }

  showMainRequest() {
    this.setState({
      displayMainRequest: true,
    });
  }

  sendEmailDetails(email, name) {
    this.socket.emit(
      "fillClientData",
      JSON.stringify({
        id: ls.get("userId"),
        name,
        email,
      })
    );
    this.setState({
      emailSentFlag: true,
      displayMainRequest: false,
      displayEmailRequest: false,
      displayChat: true,
    });
  }

  handleRegistration() {
    //ls.set("conversationPermission", true);
    if (ls.get("userId")) {
      // *SHOWCHAT*
      this.showChatHere();
    } else {
      const mongoObjectId =
        ((new Date().getTime() / 1000) | 0).toString(16) +
        "xxxxxxxxxxxxxxxx"
          .replace(/[x]/g, function () {
            return ((Math.random() * 16) | 0).toString(16);
          })
          .toLowerCase();

      ls.set("userId", mongoObjectId);
      this.initializeSocket();
      this.showChatHere();
    }
  }

  handleTabFocus() {
    if (this.state.initializeChat && this.state.displayChat) {
      this.socket.emit("readMessage", ls.get("dialogId"));
      //console.log("SUCCESSFULLY READ");
    }
  }

  handleResize() {
    this.setState({ innerHeight: window.innerHeight });
  }

  componentDidMount() {
    let self = this;
    if (ls.get("userId") && this.socket) {
      this.socket.emit("isButtonAvailable", this.props.buttonId);
    }

    window.addEventListener("resize", this.handleResize);

    window.addEventListener("focus", this.handleTabFocus);

    if (this.props.eyezonGlobal)
      this.props.eyezonGlobal.function = (buttonId, title) =>
        this.handleClick(null, buttonId, title);
    if (ls.get("userId")) {
      const url = `${apiBaseUrl}/button/${this.props.buttonId}/unread/${ls.get(
        "userId"
      )}`;
      const url2 = `${apiBaseUrl}/client/${ls.get("userId")}`;
      axios
        .get(url)
        .then(function (response) {
          self.props.setNotifications(response.data.count);
        })
        .catch(function (error) {
          //console.log(error);
        });
      axios
        .get(url2)
        .then(function (response) {
          self.setState({
            emailSentFlag: true,
          });
        })
        .catch(function (error) {
          //console.log(error);
        });
    }
  }

  notifyMe(message, href, buttonId) {
    // Проверка поддержки браузером уведомлений
    if (!iOS) {
      let options = {
        icon: `${staticUrl}/static/images/favicon.png`,
        data: href,
      };
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      // Проверка разрешения на отправку уведомлений
      else if (Notification.permission === "granted") {
        // Если разрешено, то создаем уведомление
        var notification = new Notification(message, options);

        notification.onclick = function (event) {
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
        Notification.requestPermission(function (permission) {
          // Если пользователь разрешил, то создаем уведомление
          if (permission === "granted") {
            var notification = new Notification(message, options);
            notification.onclick = function (event) {
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
  }

  notificationPermission() {
    let self = this;
    //let messaging = self.props.firebase.getMessaging();
    if (!iOS) {
      /*messaging
        .requestPermission()
        .then(async function (result) {
          const token = await messaging.getToken();
          console.log("TOKEN", token);
        })
        .catch(function (err) {
          console.log("Unable to get permission to notify.", err);
        });
      navigator.serviceWorker.addEventListener("message", (message) =>
        console.log(message)
      );*/
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "default") {
        self.setState({
          notificationMessageToggle: true,
        });
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            //ls.set("notificationPermission", true);
          }
          self.setState({
            notificationMessageToggle: false,
          });
        });
      }
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
    //console.log("EVENT", e);
    this.closeRequest();
    if (title) {
      this.setState({
        currentTitle: title,
      });
    } else {
      this.setState({
        currentTitle: null,
      });
    }
    //e.preventDefault();
    /*if (!iOS) {
      this.notificationPermission();
    }*/
    if (ls.get("dialogId")) {
      this.socket.emit("readMessage", ls.get("dialogId"));
    }

    let self = this;
    self.props.setNotifications(0);
    self.setState({
      buttonId: buttonId,
      apiLoading: true,
    });

    if (!ls.get("dialogId")) {
      if (ls.get("userId")) {
        //console.log("PATH 1");
        axios
          .post(`${apiBaseUrl}/user/${ls.get("userId")}/dialogs`, {})
          .then(function (response) {
            //console.log("TESTING NOW 1", response);
            const active = response.data.data.filter(
              (dialog) => !dialog.isDeleted
            );
            if (response.data.count > 0 && active.length > 0) {
              //let notifPerm = ls.get("conversationPermission");
              /*if (ls.get("conversationPermission")) {
                ls.set("conversationId", response.data.dialogs[0].port._id);
                setConversationArray(
                  self.state.businessId,
                  response.data.dialogs[0].port._id
                );
              }*/
              ls.set("dialogId", active[0]._id);
              self.showChatHere();
            } else {
              self.handleRegistration();
            }
          })
          .catch(function (error) {
            //console.log(error);
          });
      } else {
        //console.log("PATH 2");
        self.handleRegistration();
      }
    } else {
      axios
        .post(`${apiBaseUrl}/user/${ls.get("userId")}/dialogs`, {})
        .then(function (response) {
          //console.log("TESTING NOW 2", response);
          const active = response.data.data.filter(
            (dialog) => !dialog.isDeleted
          );
          if (response.data.count > 0 && active.length > 0) {
            //console.log("PATH 3", response);

            ls.set("dialogId", active[0]._id);
            self.showChatHere();
          } else {
            //console.log("PATH 4", response);
            ls.set("dialogId", "");
            self.showChatHere();
          }
        })
        .catch(function (error) {
          ls.set("dialogId", "");
          self.showChatHere();
          //console.log(error);
        });
    }
    const url = `${apiBaseUrl}/button/${this.props.buttonId}/event`;
    axios
      .post(url, {
        eventType: "CLICK",
      })
      .then(function (response) {})
      .catch(function (error) {
        //console.log(error);
      });
  }

  initializeSocket() {
    //

    let self = this;

    this.socket = io(socketUrl, {
      /*query: "token=" + ls.get("token"),*/
      transports: ["websocket"],
      upgrade: false,
    });
    this.socket.on("connect", () => {
      this.joinDialogue();
    });
    this.socket.on("disconnect", () => {
      this.socket.open();
    });
    this.socket.on("received", (data) => {
      /**feature */
      if (data.user !== ls.get("userId")) {
        if (
          document.hidden ||
          !self.state.initializeChat ||
          !self.state.displayChat
        ) {
          this.notificationSound.play();
        } else {
          self.socket.emit("readMessage", ls.get("dialogId"));
        }

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
            displayEmailRequest: true,
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
    this.socket.on("isButtonAvailableResponse", (result) => {
      this.setState({ noStreamerFlag: !result.isAvailable });
    });
    this.socket.open();
  }

  componentWillMount() {
    let self = this;
    if (ls.get("userId")) {
      this.initializeSocket();
    }

    if (this.props.buttons) {
      this.props.buttons.map(
        (button) =>
          button.target &&
          button.target.addEventListener("click", (event) =>
            self.handleClick(event, button.buttonId)
          )
      );
      let b_count = 0;
      if (this.props.button) {
        b_count = 1;
      }
      if (this.props.buttons.length + b_count > 1) {
        this.setState({
          multiButton: true,
        });
      }
    }

    if (this.props.ifOpened) {
      this.handleClick(null, this.props.buttonId);
    }
  }

  destroyMessage() {
    this.setState({ displayMessage: false });
  }
  destroyChat() {
    this.setState({
      displayChat: false,
      initializeChat: false,
      innerHeight: window.innerHeight,
      displayMainRequest: false,
    });
    if (ls.get("dialogId")) {
      this.socket.emit("clientLeaveDialog", ls.get("dialogId"));
    }

    enableScroll();
    //}
  }

  showMessageHere() {
    this.setState({
      displayMessage: true,
      displayChat: false,
    });
  }

  showChatHere() {
    disableScroll(() => {
      this.setState({ initializeChat: true }, () => {
        this.setState({
          displayChat: true,
          displayMessage: false,
          apiLoading: false,
        });
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("focus", this.handleTabFocus);
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    //console.log("POSITION", this.props.position);
    //console.log("FIREBASE", this.props.firebase.getMessaging());
    return (
      <ButtonReqWrapper>
        <audio
          ref={(element) => {
            this.notificationSound = element;
          }}
          src={`${staticUrl}/static/not.mp3`}
          hidden="hidden"
        ></audio>
        {/*this.state.displayEmailRequest && (
          <MinReqWrapper>
            <MinEmailRequest
              closeRequest={this.closeRequest}
              sendEmailDetails={this.sendEmailDetails}
            />
          </MinReqWrapper>
        )*/}
        <NotificationMessageWrapper
          toggle={this.state.notificationMessageToggle}
        >
          <NotificationMessageArrow
            src={`${staticUrl}/static/images/arrow2.svg`}
          />
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
          <StartButton
            onClick={(event) => this.handleClick(event, this.props.buttonId)}
            color={this.props.color}
            status={this.props.notifications > 0 ? "answer" : "rest"}
            positions={this.props.position}
            count={this.props.notifications}
          />
        )}
        {/*this.state.displayMessage && (
          <Message destroy={this.destroyMessage} showChat={this.showChat} />
        )*/}
        {this.state.initializeChat && (
          <Suspense
            fallback={
              <ApiOverlay>
                <LoadingCircle loadingFlag />
              </ApiOverlay>
            }
          >
            <LazyChat
              destroy={this.destroyChat}
              displayChat={this.state.displayChat}
              businessId={this.state.businessId}
              buttonId={this.props.buttonId}
              initializeChat={this.state.initializeChat}
              greetingText={this.props.greetingText}
              waitingText={this.props.waitingText}
              greetingTitle={this.props.greetingTitle}
              waitingTitle={this.props.waitingTitle}
              innerHeight={this.state.innerHeight}
              joinDialogue={this.joinDialogue}
              displayMainRequest={this.state.displayMainRequest}
              closeMainRequest={this.closeMainRequest}
              showMainRequest={this.showMainRequest}
              emailSentFlag={this.state.emailSentFlag}
              sendEmailDetails={this.sendEmailDetails}
              currentTitle={this.state.currentTitle}
              socket={this.socket}
              color={this.props.color}
              countdown={this.props.countdown}
              miniGame={this.props.miniGame}
              timerFlag={this.props.timerFlag}
              notificationPermission={this.notificationPermission}
              askedUserData={this.props.askedUserData}
              noStreamerFlag={this.state.noStreamerFlag}
              notificationMessageToggle={this.state.notificationMessageToggle}
              leaveOption={this.state.leaveOption}
              questionExamples={this.props.questionExamples}
              requestFieldText={this.props.requestFieldText}
              /*firebase={this.props.firebase}*/
            />
          </Suspense>
        )}
      </ButtonReqWrapper>
    );
  }
}

export default Button;
