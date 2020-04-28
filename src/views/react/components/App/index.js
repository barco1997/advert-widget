import React from "react";
//import PropTypes from "prop-types";
//import styled from "styled-components";
import axios from "axios";
import ls from "local-storage";
import Button from "../Button";
import { apiBaseUrl } from "../../constants";
//import { messaging } from "./fcm-init";
const userLang =
  document.getElementsByTagName("html")[0].getAttribute("lang") ||
  document.getElementsByTagName("html")[0].getAttribute("xml:lang") ||
  navigator.language ||
  navigator.userLanguage;

export class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      readyToRender: false,
      notifications: 0,
      notificationStatus: false,
      countdown: 0,
      requestFieldText: "String",
      mainText: "String",
      color: "#ff2d55",
      askedUserData: "EMAIL",
      miniGame: false,
      greetingTitle: "Не стесняйтесь, спросите!",
      greetingText: "Наши сотрудники с радостью ответят на все ваши вопросы",
      waitingText:
        "вы можете свернуть окно и продолжить пользоваться\n сайтом, вам придет уведомление.",
      waitingTitle:
        "Пока кто-то из нашей команды готовиться ответить на ваше сообщение, ",
      questionExamples: [],
    };
    this.setNotifications = this.setNotifications.bind(this);
    this.incrementNotifications = this.incrementNotifications.bind(this);
    this.decrementNotifications = this.decrementNotifications.bind(this);
    //this.blurFunc = this.blurFunc.bind(this);
    this.keydownFunc = this.keydownFunc.bind(this);
  }

  /*blurFunc() {
    this.blur();
  }*/
  keydownFunc(e) {
    if (e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydownFunc);
  }
  componentDidMount() {
    //get amount of notifications
    console.log("Button react component mounted successfully");
    document.querySelectorAll("button").forEach(function (item) {
      item.addEventListener("focus", function () {
        this.blur();
      });
    });
    window.addEventListener("keydown", this.keydownFunc);
    let self = this;
    const buttonId = this.props.buttonId;
    //const userId = ls.get("userId");

    const url = `${apiBaseUrl}/button/${buttonId}`;
    const lang_url = `${apiBaseUrl}/language`;
    axios.get(lang_url).then(function (languages) {
      axios.get(url).then(function (response) {
        //let notificationCount = ls.get("notificationCount");
        //console.log("RESP", response);
        const languageId = userLang.toLowerCase().includes("en")
          ? languages.data.find((element) => element.value === "EN")._id
          : languages.data.find((element) => element.value === "RU")._id;

        const localisedTextArray = response.data.languageSpecificFields.filter(
          (element) => element.language === languageId
        );
        self.setState({
          readyToRender: true,
          requestFieldText:
            localisedTextArray.find(
              (element) => element.field === "requestFieldText"
            ).value || "requestFieldText",
          mainText:
            localisedTextArray.find((element) => element.field === "mainText")
              .value || "mainText",
          greetingText:
            localisedTextArray.find(
              (element) => element.field === "greetingText"
            ).value || "greetingText",
          greetingTitle:
            localisedTextArray.find(
              (element) => element.field === "greetingTitle"
            ).value || "greetingTitle",
          waitingText:
            localisedTextArray.find(
              (element) => element.field === "waitingText"
            ).value || "waitingText",
          waitingTitle:
            localisedTextArray.find(
              (element) => element.field === "waitingTitle"
            ).value || "waitingTitle",
          questionExamples: localisedTextArray.find(
            (element) => element.field === "questionExamples"
          )
            ? localisedTextArray.find(
                (element) => element.field === "questionExamples"
              ).value
            : [],
          color: response.data.chatColor,
          countdown: response.data.countdown,
          askedUserData: response.data.askedUserData,
          miniGame: response.data.miniGame,
          position:
            response.data.position /*.toLowerCase().replace(/_/gi, "-")*/,
        });
      });
    });
    /*var messaging = this.props.firebase.messagingFunc();
    //console.log("MESS", messaging);
    messaging
      .requestPermission()
      .then(function() {
        messaging.getToken().then(token => {
          console.log("TOKEN", token);
        });
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", message =>
      console.log(message)
    );*/
  }

  setNotifications(val) {
    //let obj;
    if (val > 0) {
      this.setState({
        notifications: val,
        notificationStatus: true,
      });
    } else {
      this.setState({
        notifications: val,
      });
    }
  }
  incrementNotifications() {
    const val = this.state.notifications;
    this.setState({
      notifications: val + 1,
      notificationStatus: true,
    });
  }
  decrementNotifications() {
    const val = this.state.notifications > 0 ? this.state.notifications : 1;
    this.setState({
      notifications: val - 1,
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.readyToRender && (
          <Button
            businessId={this.props.businessId}
            buttonId={this.props.buttonId}
            ifOpened={this.props.ifOpened}
            button={this.props.button || this.state.notificationStatus}
            buttons={this.props.buttons}
            incrementNotifications={this.incrementNotifications}
            notifications={this.state.notifications}
            setNotifications={this.setNotifications}
            decrementNotifications={this.decrementNotifications}
            mainText={this.state.mainText}
            requestFieldText={this.state.requestFieldText}
            greetingText={this.state.greetingText}
            waitingText={this.state.waitingText}
            greetingTitle={this.state.greetingTitle}
            waitingTitle={this.state.waitingTitle}
            eyezonGlobal={this.props.eyezonGlobal}
            color={this.state.color}
            miniGame={this.state.miniGame}
            countdown={this.state.countdown}
            timerFlag={this.state.countdown !== 0}
            position={this.state.position}
            askedUserData={this.state.askedUserData}
            questionExamples={this.state.questionExamples}
            /*firebase={this.props.firebase}*/
          />
        )}
      </React.Fragment>
    );
  }
}

//export default Button;

/*const App = ({ color, button, businessId, ifOpened, buttons }) => {
  return (
    <React.Fragment>
      <Button
        color={color}
        businessId={businessId}
        ifOpened={ifOpened}
        button={button}
        buttons={buttons}
      />
    </React.Fragment>
  );
};*/
export default App;
