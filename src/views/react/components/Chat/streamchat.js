import React from "react";

import styled from "styled-components";
//import Response from "../Response";
//import awaitingBox from "./awaiting.svg";

const uuidv1 = require("uuid/v1");

const MessageContainer = styled.div`
  &&& {
    width: 100% !important;
    z-index: 10008 !important;
    display: flex !important;
    position: absolute !important;
    bottom: 0 !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ) !important;
    flex: 1 !important;
    height: 167px !important;
    overflow: auto !important;
    ::-webkit-scrollbar {
      display: none !important;
    }
    -ms-overflow-style: none !important;
  }
`;

const Response = styled.div`
  &&& {
    display: flex !important;
    font-family: "Mont" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;

    align-items: center !important;
    color: #ffffff !important;
    width: 188px !important;
  }
`;

export class StreamChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages || []
    };
    this.messageRef = [];
    this.setItems = this.setItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //let propsToCome = nextProps;
    this.setItems(nextProps);
  }

  setItems(props) {
    this.setState({
      messages: props.messages
    });
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  render() {
    //const isOpen = this.state.toggle;
    //console.log("what is going on bro", this.props.sentHistory);
    return (
      <MessageContainer
        ref={c => {
          this.messageList = c;
        }}
      >
        {this.state.messages.map(message => (
          <Response key={message.id || uuidv1()}>{message.text}</Response>
        ))}
      </MessageContainer>
    );
  }
}

export default StreamChat;
