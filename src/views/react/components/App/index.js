import React from "react";
//import PropTypes from "prop-types";
//import styled from "styled-components";
import axios from "axios";
import ls from "local-storage";
import Button from "../Button";
//import { messaging } from "./fcm-init";

export class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      notifications: 0,
      notificationStatus: false,
      greetingTitle: "Не стесняйтесь, спросите!",
      greetingText: "Наши сотрудники с радостью ответят на все ваши вопросы",
      waitingText:
        "вы можете свернуть окно и продолжить пользоваться\n сайтом, вам придет уведомление.",
      waitingTitle:
        "Пока кто-то из нашей команды готовиться ответить на ваше сообщение, "
    };
    this.setNotifications = this.setNotifications.bind(this);
    this.incrementNotifications = this.incrementNotifications.bind(this);
    this.decrementNotifications = this.decrementNotifications.bind(this);
  }
  componentDidMount() {
    //get amount of notifications
    document.querySelectorAll("button").forEach(function(item) {
      item.addEventListener("focus", function() {
        this.blur();
      });
    });
    window.addEventListener("keydown", function(e) {
      if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
      }
    });
    let self = this;
    const buttonId = this.props.buttonId;
    const userId = ls.get("userId");

    const url = `https://eyezon.herokuapp.com/api/button/${buttonId}`;
    axios
      .get(url)
      .then(function(response) {
        //let notificationCount = ls.get("notificationCount");
        console.log("RESP", response);
        self.setState({
          greetingText: response.data.greetingText,
          greetingTitle: response.data.greetingTitle,
          waitingText: response.data.waitingText,
          waitingTitle: response.data.waitingTitle
        });
      })
      .catch(function(error) {
        console.log("INITIAL ERROR", error);
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
        notificationStatus: true
      });
    } else {
      this.setState({
        notifications: val
      });
    }
  }
  incrementNotifications() {
    const val = this.state.notifications;
    this.setState({
      notifications: val + 1,
      notificationStatus: true
    });
  }
  decrementNotifications() {
    const val = this.state.notifications > 0 ? this.state.notifications : 1;
    this.setState({
      notifications: val - 1
    });
  }
  render() {
    return (
      <React.Fragment>
        <Button
          color={this.props.color}
          businessId={this.props.businessId}
          buttonId={this.props.buttonId}
          ifOpened={this.props.ifOpened}
          button={this.props.button || this.state.notificationStatus}
          buttons={this.props.buttons}
          incrementNotifications={this.incrementNotifications}
          notifications={this.state.notifications}
          setNotifications={this.setNotifications}
          decrementNotifications={this.decrementNotifications}
          greetingText={this.state.greetingText}
          waitingText={this.state.waitingText}
          greetingTitle={this.state.greetingTitle}
          waitingTitle={this.state.waitingTitle}
          eyezonGlobal={this.props.eyezonGlobal}
          /*firebase={this.props.firebase}*/
        />
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
