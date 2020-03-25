import React from "react";

import styled from "styled-components";
import Response from "../Response";
//import awaitingBox from "./awaiting.svg";
import ChatProposition from "../ChatProposition";
import NotifyButton from "../NotifyButton";
import AwaitTimer from "../AwaitTimer";
import moment from "moment";
import ls from "local-storage";
import { media } from "../../../../utils/media";
import OpaqueButton from "../OpaqueButton";
const uuidv1 = require("uuid/v1");

const MessageContainer = styled.div`
  &&& {
    width: calc(100% - 48px) !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    margin: 0px 24px !important;
    margin-top: 20px !important;
    flex: 1 !important;
    overflow: auto !important;
    ::-webkit-scrollbar {
      display: none !important;
    }
    -ms-overflow-style: none !important;
    margin-bottom: 5px !important;
    ${media.desktop`
    width: calc(100% - 30px) !important;
    margin: 0px 15px !important;
    `};
    & > :nth-child(1) {
      margin-top: auto !important;
    }
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
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: normal;
    font-size: 14px !important;
    line-height: 160% !important;
    /* or 22px */

    color: #000000 !important;
    width: 100% !important;
  }
`;

const B = styled.span`
  &&& {
    font-weight: bold !important;
  }
`;

const PlaceholderMessage = styled.div`
  &&& {
    white-space: pre-line !important;
    display: block !important;
    text-align: center !important;
    line-height: 1.3 !important;
    font-size: 14px !important;
    font-family: "Montserrat" !important;
    font-weight: 500 !important;
    opacity: 0.4 !important;

    padding: 36px 0px !important;
  }
`;

const Result = styled.div`
  &&& {
    margin-top: 5px !important;
    display: flex !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 48px !important;
    line-height: 61px !important;

    color: #000000 !important;
  }
`;

const Late = styled.div`
  &&& {
    margin-top: 5px !important;
    display: flex !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 25px !important;
    line-height: 32px !important;
    color: #000000 !important;
  }
`;

const StartGameWrapper = styled.div`
  &&& {
    display: flex !important;
    align-items: center !important;
  }
`;

const ButtonWrap = styled.div`
  &&& {
    margin-left: ${props => (props.noTimer ? "0px" : "20px")} !important;
    margin-bottom: 12px !important;
    margin-top: ${props => (props.noTimer ? "10px" : "0px")} !important;
  }
`;

export class MessageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages || [],
      awaitingConnection: this.props.awaitingConnection,
      timestamp: ls.get("awaitTmp") || null,
      streamIndexVal: [],
      timerExceeded: false,
      success: false
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

      nextProps.handleStreamToVideo();
    }
    if (nextProps.manipulateVideoId) {
      let indexOfCurrentVideo = nextProps.messages.findIndex(
        message => message.id === nextProps.manipulateVideoId
      );
      propsToCome.messages[indexOfCurrentVideo].ifPauseIcon =
        nextProps.ifPauseIcon;
    }
    if (
      this.props.awaitingConnection &&
      !nextProps.awaitingConnection &&
      !this.state.timerExceeded
    ) {
      this.setState({
        success: true
      });
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
    if (!this.state.timestamp) {
      const tmp = moment().toISOString();
      this.setState({
        timestamp: tmp
      });
      ls.set("awaitTmp", tmp);
    }
    this.scrollToBottom();
  }

  render() {
    const lessThan2 =
      this.state.timestamp &&
      moment().diff(moment(this.state.timestamp, moment.ISO_8601), "minutes") <
        2;
    const ifTimer =
      !this.state.timerExceeded && lessThan2 && !this.state.success;
    return (
      <MessageContainer
        ref={c => {
          this.messageList = c;
        }}
      >
        {this.state.messages[0] && (
          <Response
            key={this.state.messages[0].id || uuidv1()}
            ref={element => {
              this.messageRef[this.state.messages[0].id] = element;
            }}
            title={this.state.messages[0].text}
            description={this.state.messages[0].user || "Вы"}
            ifRecipient={(this.state.messages[0].user || "Вы") === "Вы"}
            date={this.state.messages[0].time}
            icon={this.state.messages[0].photo}
            flv={this.state.messages[0].flv}
            functionA={this.state.messages[0].flv ? this.props.setFlv : null}
            src={this.state.messages[0].src}
            thumb={this.state.messages[0].thumb}
            type={this.state.messages[0].type}
            handlePhoto={this.props.handlePhoto}
            handleVideo={this.props.handleVideo}
            id={this.state.messages[0].id}
            ifPauseIcon={this.state.messages[0].ifPauseIcon}
            transactionLimit={this.props.transactionLimit}
            color={this.props.color}
          />
        )}
        {(this.state.awaitingConnection ||
          this.state.success ||
          this.state.timerExceeded) && (
          <ConnectingText>
            <B>{this.props.waitingTitle}</B>
            <br />
            {this.props.waitingText}
            <br />

            <StartGameWrapper>
              {this.props.timerFlag && ifTimer && (
                <AwaitTimer
                  exceedFunc={() => {
                    this.setState({
                      timerExceeded: true
                    });
                  }}
                  startSec={
                    this.state.timestamp &&
                    moment().diff(
                      moment(this.state.timestamp, moment.ISO_8601),
                      "seconds"
                    ) % 60
                  }
                  startMin={
                    this.state.timestamp &&
                    moment().diff(
                      moment(this.state.timestamp, moment.ISO_8601),
                      "minutes"
                    )
                  }
                />
              )}
              {this.props.miniGame &&
                (this.props.timerFlag
                  ? ifTimer
                  : this.state.awaitingConnection) && (
                  <ButtonWrap noTimer={!this.props.timerFlag}>
                    <OpaqueButton onClick={this.props.startGame}>
                      Играть
                    </OpaqueButton>
                  </ButtonWrap>
                )}
            </StartGameWrapper>

            {/*<div>
            <AwaitingBoxWrapper>
              <PlaceholderMessage>{this.props.waitingText}</PlaceholderMessage>
            </AwaitingBoxWrapper>
          </div>*/}
          </ConnectingText>
        )}
        {this.props.timerFlag &&
          !this.state.awaitingConnection &&
          this.state.success && <Result>Успели!</Result>}
        {this.props.timerFlag &&
          (this.state.awaitingConnection || this.state.timerExceeded) &&
          (this.state.timerExceeded || !lessThan2) && (
            <NotifyButton
              sendEmailDetails={this.props.sendEmailDetails}
              notificationPermission={this.props.notificationPermission}
              emailSentFlag={this.props.emailSentFlag}
            />
          )}

        {this.state.messages
          .slice(1, this.state.messages.length)
          .map((message, index) => (
            <Response
              key={message.id || uuidv1()}
              ref={element => {
                this.messageRef[message.id] = element;
              }}
              title={message.text}
              description={message.user || "Вы"}
              ifRecipient={(message.user || "Вы") === "Вы"}
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
              color={this.props.color}
            />
          ))}
      </MessageContainer>
    );
  }
}

export default MessageArea;
