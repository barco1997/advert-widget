import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Message from "../Message/index";
import { Chat } from "../Chat";
import ls from "local-storage";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "./constants";
const reqId = ls.get("conversationId");
const storedToken = ls.get("token");
if (storedToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}
export class ButtonConnector extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      toggle: true,
      displayMessage: false,
      displayChat: false,
      initializeChat: ls.get("token") ? true : false
    };
    this.handleClick = this.handleClick.bind(this);
    this.destroyMessage = this.destroyMessage.bind(this);
    this.destroyChat = this.destroyChat.bind(this);
    this.showChat = this.showChat.bind(this);
    this.showChatHere = this.showChatHere.bind(this);
    this.showMessageHere = this.showMessageHere.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleRegistration() {
    let self = this;
    const storedToken = ls.get("token");
    if (storedToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      self.showChat();
    } else {
      const uuidv1 = require("uuid/v1");
      const uuidv4 = require("uuid/v4");
      const time = uuidv1();
      const random = uuidv4();
      const prefix = "bt_";
      const uniquePassword = prefix.concat(time, random);
      const uniqueId = uniquePassword.slice(0, 63);
      ls.set("userId", uniqueId);
      ls.set("uniquePassword", uniquePassword);
      axios
        .post(
          "https://api.eyezon.app/register/basic",
          {
            userId: uniqueId,
            nickName: "myapiBt",
            password: uniquePassword,
            lastName: "Button",
            firstName: "User",
            photo:
              "https://firebasestorage.googleapis.com/v0/b/eyezon-192313.appspot.com/o/photos%2Fbasic_user_photo.jpg?alt=media"
          },
          {
            auth: {
              username: CLIENT_ID,
              password: CLIENT_SECRET
            }
          }
        )
        .then(function(response) {
          const token = response.data.access_token;
          ls.set("token", token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          self.showChat();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  handleClick() {
    let self = this;
    //if (this.state.toggle) {
    if (!reqId) {
      if (storedToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
        axios
          .get("https://api.eyezon.app/messages/dialogs?type=joiner")
          .then(function(response) {
            console.log(response);
            if (response.data.count > 0) {
              console.log("token, no conversation id, dialogs");
              ls.set("conversationId", response.data.dialogs[0].port._id);
              self.showChatHere();
            } else {
              console.log("token, no conversation id, no dialogs");
              self.handleRegistration();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log("no token, no conversation id");
        self.handleRegistration();
      }
    } else {
      axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      axios
        .get("https://api.eyezon.app/messages/dialogs?type=joiner")
        .then(function(response) {
          console.log(response);

          if (response.data.count > 0) {
            console.log("conversation id, dialogs");
            self.showChatHere();
          } else {
            console.log("conversation id, no dialogs");
            axios
              .get("https://api.eyezon.app/users/")
              .then(function(response) {
                console.log(response);
                if (response.data.user.dialogsCount > 0) {
                  console.log("got here");
                  self.showChatHere();
                } else {
                  ls.set("conversationId", "");
                  self.handleRegistration();
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    /* } else {
     console.log("toggle");
      this.setState({
        displayMessage: false,
        displayChat: false,
        toggle: true
      });
    }*/
  }

  destroyMessage() {
    this.setState({ displayMessage: false });
  }
  destroyChat() {
    this.setState({ displayChat: false });
  }
  showChat() {
    this.setState({
      displayChat: true,
      displayMessage: false,
      initializeChat: true
    });
  }
  componentWillMount() {
    this.props.target.onclick = () => this.handleClick();
    console.log(this.props.ifOpened);
    if (this.props.ifOpened) {
      this.handleClick();
    }
  }

  showMessageHere() {
    this.setState({
      displayMessage: true,
      displayChat: false,
      toggle: true
    });
  }
  showChatHere() {
    this.setState({
      displayChat: true,
      displayMessage: false,
      toggle: true
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.displayMessage && (
          <Message destroy={this.destroyMessage} showChat={this.showChat} />
        )}
        {this.state.initializeChat && (
          <Chat
            destroy={this.destroyChat}
            displayChat={this.state.displayChat}
            businessId={this.props.businessId}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ButtonConnector;
