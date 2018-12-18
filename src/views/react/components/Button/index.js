/**
 *
 * SendButton
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import logo from "./image.png";
import Message from "../Message/index";
import { Chat } from "../Chat";

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
  & > .js-button-image {
    width: 40px;
    height: 40px;
  }
  & > .js-button-image-wrapper {
    width: 42px;
    height: 51px;
    border-radius: 28px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > .js-button-header {
    font-size: 16px;
    font-weight: bold;
  }
  & > .js-button-info {
    font-size: 8px;
    opacity: 0.5;
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
      displayChat: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.destroyMessage = this.destroyMessage.bind(this);
    this.destroyChat = this.destroyChat.bind(this);
    this.showChat = this.showChat.bind(this);
  }

  handleClick() {
    if (this.state.toggle) {
      this.setState({ displayMessage: true, toggle: false });
    } else {
      this.setState({ toggle: true });
    }
  }
  destroyMessage() {
    this.setState({ displayMessage: false });
  }
  destroyChat() {
    this.setState({ displayChat: false });
  }
  showChat() {
    this.setState({ displayChat: true, displayMessage: false });
  }
  render() {
    const isOpen = this.state.toggle;
    return (
      <React.Fragment>
        <ButtonWrapper
          color={this.props.color}
          toggle={isOpen}
          onClick={() => this.handleClick()}
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
        {this.state.displayChat && <Chat destroy={this.destroyChat} />}
      </React.Fragment>
    );
  }
}

export default Button;
