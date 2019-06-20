import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import logo from "./image.png";
import Message from "../Message/index";
import { Chat } from "../Chat";
import ls from "local-storage";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "./constants";
import { setConversationArray, setConversationIdValue } from "../../constants";
//const reqId = ls.get("conversationId");
const storedToken = ls.get("token");
if (storedToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

const ButtonWrapper = styled.button`
  &&& {
    text-decoration: none;

    -webkit-font-smoothing: antialiased;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
    outline: 0;

    position: fixed;
    z-index: 10001;
    background: #fff;
    right: 2%;
    bottom: 30px;
    margin: 0 0 0 0;

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
  }
`;

const NotificationWrapper = styled.div`
  &&& {
    position: absolute;
    top: -7px;
    right: -7px;
    border-radius: 50%;
    color: white;
    background: #ff2d55;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
  }
`;

const JsButtonImageWrapper = styled.div`
  &&& {
    width: 42px;
    height: 51px;
    border-radius: 28px;

    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 42px;
    max-height: 51px;
  }
`;

const JsButtonImage = styled.img`
  &&& {
    width: 40px;
    height: 40px;
    max-width: 40px;
    max-height: 40px;
  }
`;
const JsButtonText = styled.div`
  &&& {
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

const JsButtonHeader = styled.div`
  &&& {
    font-size: 16px;
    font-weight: bold;
  }
`;
const JsButtonInfo = styled.div`
  &&& {
    font-size: 8px;
    opacity: 0.5;
  }
`;

export class Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      toggle: false,
      displayMessage: false,
      displayChat: false,
      initializeChat: ls.get("token") ? true : false,
      businessId: null,
      multiButton: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.destroyMessage = this.destroyMessage.bind(this);
    this.destroyChat = this.destroyChat.bind(this);
    this.showChat = this.showChat.bind(this);
    this.showChatHere = this.showChatHere.bind(this);
    this.showMessageHere = this.showMessageHere.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleRegistration() {
    let self = this;
    //const storedToken = ls.get("token");
    ls.set("conversationPermission", true);
    if (ls.get("token")) {
      axios.defaults.headers.common.Authorization = `Bearer ${ls.get("token")}`;
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

  handleClick(e, businessId) {
    //e.preventDefault();
    console.log("pressed eyezonButton");
    let self = this;
    self.props.setNotifications(0);
    self.setState({
      businessId: businessId
    });
    setConversationIdValue(businessId);
    //if (this.state.toggle) {
    if (!ls.get("conversationId")) {
      if (storedToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
        axios
          .get("https://api.eyezon.app/messages/dialogs?type=joiner")
          .then(function(response) {
            console.log(response);
            if (response.data.count > 0) {
              console.log("token, no conversation id, dialogs");
              //let notifPerm = ls.get("conversationPermission");
              /*if (ls.get("conversationPermission")) {
                ls.set("conversationId", response.data.dialogs[0].port._id);
                setConversationArray(
                  self.state.businessId,
                  response.data.dialogs[0].port._id
                );
                console.log("Not supposed to reach here - check if errors");
              }*/

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
                  //setConversationArray(self.state.businessId, "");
                  self.showChatHere();
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

  componentWillMount() {
    //
    let self = this;

    if (this.props.buttons) {
      this.props.buttons.map(button =>
        button.target.addEventListener("click", event =>
          self.handleClick(event, button.businessId)
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
    console.log(this.props.ifOpened);
    if (this.props.ifOpened) {
      this.handleClick();
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
    if (!this.state.multiButton) {
      this.setState({ displayChat: false });
    } else {
      this.setState({ displayChat: false, initializeChat: false });
    }
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
    if (!this.state.multiButton) {
      this.setState({
        displayChat: true,
        displayMessage: false,
        toggle: false
      });
    } else {
      this.setState({ initializeChat: true }, () => {
        this.setState({
          displayChat: true,
          displayMessage: false,
          toggle: false
        });
      });
    }
  }

  render() {
    const isOpen = this.state.toggle;
    return (
      <React.Fragment>
        {this.props.button && (
          <ButtonWrapper
            color={this.props.color}
            toggle={isOpen}
            onClick={event => this.handleClick(event, this.props.businessId)}
            onMouseEnter={() => this.handleMouseEnter()}
            onMouseLeave={() => this.handleMouseLeave()}
          >
            {this.props.notifications > 0 && (
              <NotificationWrapper>
                {this.props.notifications}
              </NotificationWrapper>
            )}
            <JsButtonImageWrapper>
              <JsButtonImage src={logo} />
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
        {this.state.displayMessage && (
          <Message destroy={this.destroyMessage} showChat={this.showChat} />
        )}
        {this.state.initializeChat && (
          <Chat
            destroy={this.destroyChat}
            displayChat={this.state.displayChat}
            businessId={this.state.businessId}
            incrementNotifications={this.props.incrementNotifications}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Button;
