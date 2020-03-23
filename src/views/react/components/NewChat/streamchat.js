import React from "react";

import styled from "styled-components";
//import Response from "../Response";
//import awaitingBox from "./awaiting.svg";
import { media } from "../../../../utils/media";
const uuidv1 = require("uuid/v1");

const MessageContainer = styled.div`
  &&& {
    width: 100% !important;
    z-index: 10008 !important;
    display: flex !important;

    flex-direction: column !important;
    justify-content: flex-end !important;
    /*background:  linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ) !important;*/
    flex: 1 !important;
    height: 300px !important;
    overflow: auto !important;
    ::-webkit-scrollbar {
      display: none !important;
    }
    -ms-overflow-style: none !important;

    mix-blend-mode: hard-light !important;
    position: relative !important;
    &:after {
      position: absolute !important;
      content: "" !important;
      left: 0px !important;
      top: 0px !important;
      height: 100% !important;
      width: 100% !important;
      background: ${props =>
        props.safari
          ? "none"
          : "linear-gradient(gray, transparent)"} !important;
      ${media.desktop`
      background: none !important;
      `}
    }
  }
`;

const Response = styled.div`
  &&& {
    display: flex !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;

    align-items: center !important;
    color: #ffffff !important;
    background: rgba(255, 255, 255, 0.32) !important;
    /*-webkit-mask-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    ) !important;
    mask-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    ) !important;*/
    width: 188px !important;
    padding: 16px 13px !important;
    margin-left: 24px !important;
    margin-bottom: 8px !important;
    border-radius: 5px 5px 5px 0px !important;
    word-break: break-all !important;
  }
`;

const DoubleWrapper = styled.div`
  &&& {
    height: 300px !important;
    width: 100% !important;
  }
`;

const Wrapper = styled.div`
  &&& {
    height: 100% !important;
    width: 100% !important;
  }
`;

export class StreamChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    };
    this.messageRef = [];
    this.setItems = this.setItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //let propsToCome = nextProps;
    if (nextProps.messages) {
      this.setItems(nextProps);
    }
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
    return (
      <DoubleWrapper>
        <Wrapper>
          <MessageContainer
            ref={c => {
              this.messageList = c;
            }}
            safari={this.props.isSafari}
          >
            {this.state.messages.map(message => (
              <Response key={message.id || uuidv1()}>{message.text}</Response>
            ))}
          </MessageContainer>
          {/*<Shader />*/}
        </Wrapper>
      </DoubleWrapper>
    );
  }
}

export default StreamChat;
