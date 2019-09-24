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
    width: 100% !important;
    height: 80px !important;
    display: flex !important;
    justify-content: center !important;
  }
`;

const ConnectingText = styled.span`
  &&& {
    display: block !important;
    font-family: "Mont" !important;
    font-size: 10px !important;
    line-height: 1.3 !important;
    color: rgba(0, 0, 0, 0.5) !important;
  }
`;

const PlaceholderMessage = styled.div`
  &&& {
    white-space: pre-line !important;
    display: block !important;
    text-align: center !important;
    line-height: 1.3 !important;
    font-size: 14px !important;
    font-family: "Mont" !important;
    font-weight: 500 !important;
    opacity: 0.4 !important;

    padding: 36px 0px !important;
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
      let indexOfCurrentVideo1 = nextProps.messages.findIndex(
        a => a.id === nextProps.strVideo
      );
      propsToCome.messages[indexOfCurrentVideo1].type = "video";
      console.log("VERY IMPORTANT", propsToCome.messages[indexOfCurrentVideo1]);
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
    //console.log("what is going on bro", this.props.sentHistory);
    return (
      <MessageContainer
        ref={c => {
          this.messageList = c;
        }}
      >
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
            src={message.src}
            thumb={message.thumb}
            type={message.type}
            handlePhoto={this.props.handlePhoto}
            handleVideo={this.props.handleVideo}
            id={message.id}
            ifPauseIcon={message.ifPauseIcon}
            transactionLimit={this.props.transactionLimit}
          />
        ))}
        {this.state.awaitingConnection && (
          <div>
            <AwaitingBoxWrapper>
              {/*<AwaitingBoxImage src="https://witheyezon.com/eyezonsite/static/images/awaiting.svg" />*/}
              <PlaceholderMessage>
                {this.props.waitingText}
                {/*Fun Fact: Our in-store representatives go through a rigorous
                obstacle course training in order to reach products in the
                shortest time possible. Feel free to minimize this window,
                continue exploring our site, while you wait for a notification.*/}
              </PlaceholderMessage>
            </AwaitingBoxWrapper>
          </div>
        )}
      </MessageContainer>
    );
  }
}

export default MessageArea;
