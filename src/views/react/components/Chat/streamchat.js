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
    left: 0 !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    background: /*rgba(0, 0, 0, 0.5)*/ linear-gradient(
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
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;

    align-items: center !important;
    color: #ffffff !important;
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
    padding-left: 12px !important;
    margin-bottom: 5px !important;
  }
`;
const Shader = styled.div`
  &&& {
    width: 100% !important;
    z-index: 10009 !important;
    display: flex !important;
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;

    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 90%,
      rgba(0, 0, 0, 0) 100%
    ) !important;

    height: 167px !important;
  }
`;

const DoubleWrapper = styled.div`
  &&& {
    position: absolute !important;
    height: 167px !important;
    width: 100% !important;
    bottom: 35px !important;
    left: 0 !important;
  }
`;

const Wrapper = styled.div`
  &&& {
    position: relative !important;
    height: 100% !important;
    width: 100% !important;
    top: 0 !important;
    left: 0 !important;
    opacity: 1 !important;
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
    //const isOpen = this.state.toggle;
    //console.log("what is going on bro", this.props.sentHistory);
    return (
      <DoubleWrapper>
        <Wrapper>
          <MessageContainer
            ref={c => {
              this.messageList = c;
            }}
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
