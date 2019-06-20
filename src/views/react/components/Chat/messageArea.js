import React from "react";

import styled from "styled-components";
import Response from "../Response";
import awaitingBox from "./awaiting.svg";
import ChatProposition from "../ChatProposition";
const uuidv1 = require("uuid/v1");

const MessageContainer = styled.div`
  &&& {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    flex: 1;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
  }
`;

const AwaitingBoxWrapper = styled.div`
  &&& {
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
  }
`;
const AwaitingBoxImage = styled.img`
  &&& {
    width: 300px;

    object-fit: contain;
    position: absolute;
    left: 0px;
    top: 0px;
  }
`;

const SelectChatsText = styled.div`
  &&& {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin: 70px 30px;
  }
`;

export class MessageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages || [],
      awaitingConnection: this.props.awaitingConnection,

      streamIndexVal: []
    };
    this.messageRef = [];
    this.setItems = this.setItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let propsToCome = nextProps;
    if (nextProps.strVideo !== null) {
      console.log("one step further", nextProps.strVideo.src);
      const index = nextProps.messages
        .slice()
        .reverse()
        .findIndex(a => a.type === "stream");
      const count = nextProps.messages.length - 1;
      const finalIndex = index >= 0 ? count - index : index;
      console.log(finalIndex);
      const frog = [
        ...this.state.streamIndexVal,
        {
          index: finalIndex,
          src: nextProps.strVideo.src,
          thumb: nextProps.strVideo.thumbnail
        }
      ];
      this.setState({
        streamIndexVal: [
          ...this.state.streamIndexVal,
          {
            index: finalIndex,
            src: nextProps.strVideo.src,
            thumb: nextProps.strVideo.thumbnail
          }
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
    if (nextProps.manipulateVideoId) {
      console.log("Help me");
      let indexOfCurrentVideo = nextProps.messages.findIndex(
        message => message.id === nextProps.manipulateVideoId
      );
      propsToCome.messages[indexOfCurrentVideo].ifPauseIcon =
        nextProps.ifPauseIcon;
    }
    this.setItems(propsToCome);
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
    console.log("what is going on bro", this.props.sentHistory);
    return (
      <MessageContainer
        ref={c => {
          this.messageList = c;
        }}
      >
        {this.props.sentHistory.status && !(this.state.messages.length > 0) && (
          <Response
            title={this.props.sentHistory.message.text}
            description={this.props.sentHistory.message.user || "Вы"}
            date={this.props.sentHistory.message.time}
            icon={this.props.sentHistory.message.photo}
            type={this.props.sentHistory.message.type}
            transactionLimit={this.props.transactionLimit}
          />
        )}
        {this.state.messages.map((message, index) => (
          <Response
            key={message.id || uuidv1()}
            ref={element => {
              this.messageRef[message.id] = element;
            }}
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
            thumb={
              message.flv &&
              this.state.streamIndexVal.some(elem => elem.index === index)
                ? this.state.streamIndexVal.filter(
                    elem => elem.index === index
                  )[0].thumb
                : message.thumb
            }
            type={message.type}
            handlePhoto={this.props.handlePhoto}
            handleVideo={this.props.handleVideo}
            id={message.id}
            ifPauseIcon={message.ifPauseIcon}
            transactionLimit={this.props.transactionLimit}
          />
        ))}
        {((this.state.awaitingConnection &&
          !(this.props.existingChats.length > 0)) ||
          this.props.sentHistory.status) && (
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
        {this.props.existingChats.length > 0 && (
          <SelectChatsText>
            {" "}
            К сожалению, все специалисты заняты. Вы можете присоединиться к
            другому запросу:{" "}
          </SelectChatsText>
        )}
        {this.props.existingChats.length > 0 &&
          this.props.existingChats.map(chat => (
            <div
              key={chat.port.id}
              onClick={() => this.props.handlePropositionClick(chat.port.id)}
            >
              <ChatProposition
                title={chat.port.request}
                description={chat.port.date}
                messagesCount={chat.messages.count}
              />
            </div>
          ))}
      </MessageContainer>
    );
  }
}

export default MessageArea;
