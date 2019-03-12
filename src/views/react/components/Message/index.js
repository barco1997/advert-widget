import React from "react";

import styled from "styled-components";
import ios from "./iosDownload.png";
import android from "./androidDownload.png";
import iphone from "./Iphone_8.png";
import ls from "local-storage";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "./constants";
import { media } from "../../../../utils/media";

const JsWidgetImage = styled.img`
  width: 214px;
  height: 337px;
  margin-left: 20px;
  margin-top: -10px;
`;
const JsWidgetDownload = styled.div`
  width: 210px;
  display: flex;
  justify-content: space-between;
  height: 42px;
`;
const JsWidgetIos = styled.img`
  width: 85px;
  height: 28px;
  margin-top: -36px;
`;
const JsWidgetAndroid = styled.img`
  width: 95px;
  height: 27px;
  margin-top: -35px;
`;
const JsWidgetLowrow = styled.div`
  width: 100%;
  margin-top: 101px;
  margin-bottom: 34px;
  display: flex;
  justify-content: flex-start;
  ${media.desktop`
  margin-bottom: 50px;
  margin-top: 0px;
  flex: 1;
  align-items: flex-end;
  `};
`;

const JsWidgetOverlay = styled.div`
  z-index: 10002;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  opacity: 0.2;
  background-color: #000;
  ${media.desktop`
  display: none;
  `};
`;

const JsWidgetWindow = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;

  z-index: 10003;
  background: #fff;
  max-height: 620px;
  top: 15%;

  width: 840px;
  padding: 20px 60px;
  padding-top: 60px;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  ${media.desktop`
  max-height: 100vh;
  width: 100%;
  height: 100vh;
  top: 0%;
  padding: 0px 60px;
  `};
`;
const JsWidgetDialogue = styled.div`
  width: 376px;
  font-size: 12px;
  margin-top: 10px;
  color: black;
  ${media.desktop`
  width: 100vw;
  height: 100vh;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  
  `};
`;

const JsWidgetDialogueH2 = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin: 0px;
`;

const JsWidgetDialogueSpan = styled.span`
  opacity: 0.5;
  ${media.desktop`
  max-width: 100%;
  
  `};
`;

const JsWidgetIcons = styled.div`
  width: 210px;

  margin-right: 55px;
  margin-left: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  ${media.desktop`
  display: none;
  margin-right: 0px;
  margin-left: 0px;
  `};
`;

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Mont";
`;

const GetStream = styled.button`
  text-decoration: none;
  border-width: 0px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  width: 258px;
  height: 44px;
  font-size: 12px;
  font-weight: 600;

  background: #ff2d55;
  color: white;
  border-radius: 32px;
  border-style: none;
  box-shadow: 0px 4px 15px rgba(255, 45, 85, 0.8);

  transition: box-shadow 300ms ease-in-out;
  ${media.desktop`
  width: 100%;
  `};
`;

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

export class Message extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleRegistration() {
    const showChat = () => this.props.showChat();
    const storedToken = ls.get("token");
    if (storedToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      showChat();
    } else {
      const uuidv1 = require("uuid/v1");
      const uuidv4 = require("uuid/v4");
      const time = uuidv1();
      const random = uuidv4();
      const prefix = "bt_";
      const uniquePassword = prefix.concat(time, random);
      const uniqueId = uniquePassword.slice(0, 63);
      ls.set("userId", uniqueId);
      ls.set("uniquePassword", uniquePassword);
      axios
        .post(
          "https://api.eyezon.app/register/basic",
          {
            userId: uniqueId,
            nickName: "myapiBt",
            password: uniquePassword,
            lastName: "Button",
            firstName: "User",
            photo:
              "https://firebasestorage.googleapis.com/v0/b/eyezon-192313.appspot.com/o/photos%2Fbasic_user_photo.jpg?alt=media"
          },
          {
            auth: {
              username: CLIENT_ID,
              password: CLIENT_SECRET
            }
          }
        )
        .then(function(response) {
          const token = response.data.access_token;
          ls.set("token", token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          showChat();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  render() {
    return (
      <React.Fragment>
        <MessageWrapper>
          <JsWidgetOverlay
            onClick={() => {
              this.props.destroy();
            }}
          />
          <JsWidgetWindow>
            <CloseButton
              onClick={() => {
                this.props.destroy();
              }}
            />
            <JsWidgetDialogue>
              <JsWidgetDialogueH2>Что такое eyezon?</JsWidgetDialogueH2>
              <JsWidgetDialogueSpan>
                Это инструмент для видео-трансляций нового поколения, напрямую
                соединяющий вас с тем, кто может показать интересующий вас
                видео-обзор.
              </JsWidgetDialogueSpan>
              <br />
              <br />
              <br />

              <JsWidgetDialogueH2>Как он работает?</JsWidgetDialogueH2>
              <JsWidgetDialogueSpan>
                Используя искусственный интеллект, система анализирует все фото
                и короткие видео в приложении и, сопоставляя эти результаты с
                поисковым запросом, выдает в качестве результата только те
                изобажнеия, которые ему релевантны. Остается отправить запрос и
                ждать, когда автор сможет прислать видео-ответ на него.
              </JsWidgetDialogueSpan>
              <JsWidgetLowrow>
                <GetStream
                  onClick={e => {
                    e.preventDefault;
                    this.handleRegistration();
                  }}
                >
                  Запросить трансляцию
                </GetStream>
              </JsWidgetLowrow>
            </JsWidgetDialogue>
            <JsWidgetIcons>
              <JsWidgetImage src={iphone} />

              <JsWidgetDownload>
                <JsWidgetAndroid src={android} />
                <JsWidgetIos src={ios} />
              </JsWidgetDownload>
            </JsWidgetIcons>
          </JsWidgetWindow>
        </MessageWrapper>
      </React.Fragment>
    );
  }
}

export default Message;
