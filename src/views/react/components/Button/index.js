import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import logo from "./image.png";
import Message from "../Message/index";
import { Chat } from "../Chat";
import ls from "local-storage";
import axios from "axios";
const reqId = ls.get("conversationId");
const storedToken = ls.get("token");
if (storedToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

const ButtonWrapper = styled.button`
  text-decoration: none;

  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;

  position: fixed;
  z-index: 10001;
  background: #fff;
  right: 10%;
  bottom: 30px;
  margin: 0 -80px 0 0;
  overflow: hidden;
  background: ${props => (props.color ? props.color : "white")};

  border: solid 1px #dddddd;
  border-radius: 28px;
  display: flex;
  width: ${props => (props.toggle ? "278px" : "56px")};

  height: 56px;
  align-items: center;

  transition: ${props =>
    props.toggle ? "width 120ms linear" : "width 180ms linear"};
  font-family: "Mont";
  &:focus {
    outline: 0;
  }

  & > .js-button-text {
    display: flex;
    transition: ${props =>
      props.toggle ? "opacity 1s ease-in" : "opacity 100ms linear"};

    opacity: ${props => (props.toggle ? "1" : "0")};
    height: ${props => (props.toggle ? "42px" : "0px")};
    overflow: hidden;
    flex-direction: column;
    width: 200px;
    margin-right: 14px;
    margin-left: 8px;
  }
`;

export class Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      toggle: false,
      displayMessage: false,
      displayChat: false,
      initializeChat: ls.get("token") ? true : false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
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
                ls.set("conversationId", response.data.dialogs[0].port._id);
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
              ls.set("conversationId", "");
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

  handleMouseLeave() {
    this.setState({
      toggle: false
    });
  }

  handleMouseEnter() {
    this.setState({
      toggle: true
    });
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

  showMessageHere() {
    this.setState({
      displayMessage: true,
      displayChat: false,
      toggle: false
    });
  }
  showChatHere() {
    this.setState({
      displayChat: true,
      displayMessage: false,
      toggle: false
    });
  }

  render() {
    const isOpen = this.state.toggle;
    return (
      <React.Fragment>
        <ButtonWrapper
          color={this.props.color}
          toggle={isOpen}
          onClick={() => this.handleClick()}
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
        >
          <div className="js-button-image-wrapper">
            <img src={logo} className="js-button-image" />
          </div>
          <div className="js-button-text">
            <div className="js-button-header">Запросить трансляцию</div>
            <div className="js-button-info">
              Уточните все интересующие вас вопросы на онлайн трансляции с нашим
              сотрудником
            </div>
          </div>
        </ButtonWrapper>
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

export default Button;
