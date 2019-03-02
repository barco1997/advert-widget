/**
 *
 * SendButton
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Message from "../Message/index";
import { Chat } from "../Chat";
import ls from "local-storage";
import axios from "axios";
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
  }

  handleClick() {
    let self = this;
    //let showM = this.showMessageHere();
    //let showCH = this.showChatHere();
    if (this.state.toggle) {
      if (!reqId) {
        if (storedToken) {
          axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
          axios
            .get("https://api.eyezon.app/messages/dialogs?type=joiner")
            .then(function(response) {
              console.log(response);
              if (response.data.count > 0) {
                console.log("token, no conversation id, dialogs");
                self.showChatHere();
              } else {
                console.log("token, no conversation id, no dialogs");
                self.showMessageHere();
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("no token, no conversation id");
          self.showMessageHere();
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
              self.showMessageHere();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    } else {
      console.log("toggle");
      this.setState({
        displayMessage: false,
        displayChat: false,
        toggle: true
      });
    }
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
