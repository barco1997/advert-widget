/**
 *
 * SendButton
 *
 */

import React from "react";

import styled from "styled-components";
import empty from "./empty.png";
import ScrollArea from "react-scrollbar";
//import Response from "../Response";

import { MessageArea } from "./messageArea";

const CloseButton = styled.span`
  position: absolute;
  right: 14px;
  top: 14px;
  width: 14px;
  height: 14px;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    left: 7px;
    content: " ";
    height: 14px;
    width: 3px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const ChatWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Mont";

  & > .js-chat-overlay {
    z-index: 10002;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    opacity: 0.2;
    background-color: #000;
  }

  & > .js-chat-window {
    position: fixed;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    z-index: 10003;
    background: #fff;

    top: 15%;

    width: 462px;
    height: 473px;
    padding: 40px 40px;
    padding-bottom: 20px;
    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
  }
  & > .js-chat-message-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
  }
  & > .js-chat-message-placeholder {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: rgba(0, 0, 0, 0.5);
    flex: 1;
  }
  & > .js-chat-message-placeholder:nth-child(1) {
    margin-top: 80px;
  }
  & > .js-chat-empty {
    margin-top: 60px;
    width: 176px;
    height: 72px;
  }
`;

const InputField = styled.input`
  height: 28px;
  width: 100%;
  background: #f5f5f5;
  border: 0.5px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0px 10px;
  font-family: "Mont";
  font-weight: normal;
  font-size: 11px;
  outline: 0;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const SendRequest = styled.button`
  width: 181px;
  height: 28px;
  background: #ff2d55;
  border-radius: 100px;
  margin-top: 15px;
  text-decoration: none;
  border-width: 0px;

  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  color: white;
  font-size: 11px;
  padding-top: 3px;
  font-weight: normal;
  font-family: "Mont";
`;

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      messages: [],
      awaitingConnection: false,
      startedFlag: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const value = this.state.value;

    if (!this.state.startedFlag) {
      this.setState({
        messages: [...this.state.messages, { text: value, time: new Date() }],
        value: "",
        awaitingConnection: true,
        startedFlag: true
      });
    } else {
      this.setState({
        messages: [...this.state.messages, { text: value, time: new Date() }],
        value: ""
      });
    }

    event.preventDefault();
  }

  render() {
    //const isOpen = this.state.toggle;

    return (
      <React.Fragment>
        <ChatWrapper>
          <div
            className="js-chat-overlay"
            onClick={() => {
              this.props.destroy();
            }}
          />
          <div className="js-chat-window">
            <CloseButton
              onClick={() => {
                this.props.destroy();
              }}
            />
            <div className="js-chat-message-container">
              {this.state.messages.length == 0 ? (
                <div className="js-chat-message-placeholder">
                  <div>Не стесняйтесь, спросите!</div>
                  <div>Наши сотрудники ответят на все ваши вопросы</div>
                  <img src={empty} className="js-chat-empty" />
                </div>
              ) : (
                <MessageArea
                  messages={this.state.messages}
                  awaitingConnection={this.state.awaitingConnection}
                />
              )}
              <form onSubmit={this.handleSubmit}>
                <div style={{ flexDirection: "column" }}>
                  <label>
                    <InputField
                      type="text"
                      value={this.state.value}
                      onChange={this.handleChange}
                      placeholder="Задайте вопрос"
                      style={{ width: "100%" }}
                    />
                  </label>
                  <SendRequest type="submit" value="Submit">
                    Отправить
                  </SendRequest>
                </div>
              </form>
            </div>
          </div>
        </ChatWrapper>
      </React.Fragment>
    );
  }
}

export default Chat;
