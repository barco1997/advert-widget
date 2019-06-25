import React from "react";

import styled from "styled-components";
import Response from "../Response";
//import awaitingBox from "./awaiting.svg";
import ChatProposition from "../ChatProposition";
const uuidv1 = require("uuid/v1");

const MessageContainer = styled.div`
  &&& {
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;

    flex: 1 !important;
    overflow: auto !important;
    ::-webkit-scrollbar {
      display: none !important;
    }
    -ms-overflow-style: none !important;
  }
`;

const AwaitingBoxWrapper = styled.div`
  &&& {
    width: 250px !important;
    height: 80px !important;
    position: relative !important;
    & > div {
      position: absolute !important;
      left: 0px !important;
      top: 0px !important;
      opacity: 0.4 !important;
      font-size: 10px !important;
      font-family: "Mont" !important;
      font-weight: normal !important;
      padding: 20px !important;
      padding-left: 30px !important;
    }
  }
`;
const AwaitingBoxImage = styled.img`
  &&& {
    width: 300px !important;

    object-fit: contain !important;
    position: absolute !important;
    left: 0px !important;
    top: 0px !important;
  }
`;

const NewTextWrap = styled.div`
  &&& {
    line-height: 1.2 !important;
  }
`;

const SelectChatsText = styled.div`
  &&& {
    display: flex !important;
    justify-content: center !important;
    text-align: center !important;
    align-items: center !important;
    margin: 70px 30px !important;
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
            <span
              style={{
                fontFamily: "Mont !important",
                fontSize: "12px !important",
                opacity: "0.5 !important"
              }}
            >
              Идет подключение ...
            </span>
            <AwaitingBoxWrapper>
              <AwaitingBoxImage src="https://witheyezon.com/eyezonsite/static/images/awaiting.svg" />
              <NewTextWrap>
                Пока кто-то из нашей команды готовиться ответить на ваше
                сообщение, вы можете свернуть окно и продолжить пользоваться
                сайтом, вам придет уведомление.
              </NewTextWrap>
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
