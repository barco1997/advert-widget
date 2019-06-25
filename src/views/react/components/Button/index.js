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
//const reqId = ls.get("conversationId");
const storedToken = ls.get("token");
if (storedToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

const ApiOverlay = styled.div`
  &&& {
    z-index: 10002 !important;
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
    ${media.desktop`
  display: none !important;
  `};
  }
`;

const ButtonWrapper = styled.button`
  &&& {
    text-decoration: none !important;

    -webkit-font-smoothing: antialiased !important;
    -webkit-touch-callout: none !important;
    user-select: none !important;
    cursor: pointer !important;
    outline: 0 !important;
    /*overflow: hidden !important;*/
    position: fixed !important;
    z-index: 10001 !important;
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
    font-family: "Mont" !important;
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
  }
`;

const JsButtonImage = styled.img`
  &&& {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px !important;
    max-height: 40px !important;
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

export class Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      toggle: false,
      displayMessage: false,
      displayChat: false,
      initializeChat: ls.get("token") ? true : false,
      businessId: null,
      multiButton: false,
      apiLoading: false
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
      businessId: businessId,
      apiLoading: true
    });
    setConversationIdValue(businessId);
    //return;
    //if (this.state.toggle) {
    if (!ls.get("conversationId")) {
      if (storedToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
        axios
          .get("https://api.eyezon.app/messages/dialogs?type=joiner")
          .then(function(response) {
            self.setState({
              apiLoading: false
            });
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
            self.setState({
              apiLoading: false
            });
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
          self.setState({
            apiLoading: false
          });
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
                self.setState({
                  apiLoading: false
                });
              });
          }
        })
        .catch(function(error) {
          console.log(error);
          self.setState({
            apiLoading: false
          });
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
        {this.state.apiLoading && (
          <ApiOverlay>
            <LoadingCircle loadingFlag />
          </ApiOverlay>
        )}
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
            incrementNotifications={this.props.incrementNotifications}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Button;
