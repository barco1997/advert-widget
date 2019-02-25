import React from "react";

import styled from "styled-components";
import Response from "../Response";
import awaitingBox from "./awaiting.svg";

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
      streamVideoSrc: null,
      streamIndexVal: []
    };

    this.setItems = this.setItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.strSrc !== null) {
      console.log("one step further", nextProps.strSrc);
      const index = nextProps.messages
        .slice()
        .reverse()
        .findIndex(a => a.type === "stream");
      const count = nextProps.messages.length - 1;
      const finalIndex = index >= 0 ? count - index : index;
      console.log(finalIndex);
      const frog = [
        ...this.state.streamIndexVal,
        { index: finalIndex, src: nextProps.strSrc }
      ];
      this.setState({
        streamVideoSrc: nextProps.strSrc,
        streamIndexVal: [
          ...this.state.streamIndexVal,
          { index: finalIndex, src: nextProps.strSrc }
        ]
      });

      console.log("Stream Index Value", frog);
      console.log("True?", frog.some(elem => elem.index === finalIndex));
      console.log(
        "Src:",
        frog.filter(elem => elem.index === finalIndex)[0].src
      );
      nextProps.handleStreamToVideo();
    }
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

  render() {
    //const isOpen = this.state.toggle;

    return (
      <MessageContainer
        ref={c => {
          this.messageList = c;
        }}
      >
        {this.state.messages.map((message, index) => (
          <Response
            key={uuidv1()}
            title={message.text}
            description={message.user || "Вы"}
            date={message.time}
            icon={message.photo}
            flv={message.flv}
            functionA={message.flv ? this.props.setFlv : null}
            src={
              message.flv &&
              this.state.streamIndexVal.some(elem => elem.index === index)
                ? this.state.streamIndexVal.filter(
                    elem => elem.index === index
                  )[0].src
                : message.src
            }
            type={message.type}
            handlePhoto={this.props.handlePhoto}
            handleVideo={this.props.handleVideo}
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
