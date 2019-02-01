import React from "react";

import styled from "styled-components";
import Response from "../Response";
import awaitingBox from "./awaiting.svg";
import StreamButton from "./StreamButton"

const uuidv1 = require("uuid/v1");

const MessageContainer = styled.div`
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;

const AwaitingBoxWrapper = styled.div`
  width: 250px;
  height: 80px;
  position: relative;
  & > div {
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0.4;
    font-size: 10px;
    font-family: "Mont";
    font-weight: normal;
    padding: 20px;
    padding-left: 30px;
  }
`;
const AwaitingBoxImage = styled.img`
  width: 300px;

  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 0px;
`;

export class MessageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages || [],
      awaitingConnection: this.props.awaitingConnection,
      streamIsWatching: false
    };

    this.setItems = this.setItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setItems(nextProps);
  }

  setItems(props) {
    this.setState({
      messages: props.messages,
      awaitingConnection: props.awaitingConnection
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

  streamHandler() {
    this.setState({
      streamIsWatching: true
    });
  }

  render() {
    //const isOpen = this.state.toggle;

    return (
      <MessageContainer
        ref={c => {
          this.messageList = c;
        }}
      >
        <StreamButton 
          link = 'link'
          isWatching = {this.state.streamIsWatching}
          streamHandler = {() => {this.streamHandler()}}
        />
        {this.state.messages.map(message => (

            // Add message type checker

            <Response
              key={uuidv1()}
              title={message.text}
              description={message.user || "Вы"}
              date={message.time}
              icon={message.photo}
            />
        ))}
        {this.state.awaitingConnection && (
          <div>
            <span style={{ fontSize: "12", opacity: "0.5" }}>
              Идет подключение ...
            </span>
            <AwaitingBoxWrapper>
              <AwaitingBoxImage src={awaitingBox} />
              <div>
                Пока кто-то из нашей команды готовиться ответить на ваше
                сообщение, вы можете свернуть окно и продолжить пользоваться
                сайтом, вам придет уведомление.
              </div>
            </AwaitingBoxWrapper>
          </div>
        )}
      </MessageContainer>
    );
  }
}

export default MessageArea;
