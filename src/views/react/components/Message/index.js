/**
 *
 * SendButton
 *
 */

import React from "react";

import styled from "styled-components";
import ios from "./iosDownload.png";
import android from "./androidDownload.png";
import iphone from "./Iphone_8.png";
import ls from "local-storage";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "./constants";
const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Mont";

  & > .js-widget-image {
    width: 214px;
    height: 337px;
    margin-left: 20px;
    margin-top: -10px;
  }

  & > .js-widget-download {
    width: 210px;
    display: flex;
    justify-content: space-between;
    height: 42px;
  }
  & > .js-widget-ios {
    width: 85px;
    height: 28px;
    margin-top: -36px;
  }
  & > .js-widget-android {
    width: 95px;
    height: 27px;
    margin-top: -35px;
  }
  & > .js-widget-lowrow {
    width: 100%;
    margin-top: 101px;
    margin-bottom: 34px;
    display: flex;
    justify-content: flex-start;
  }
  & > .js-widget-getstream {
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
  }

  & > .js-widget-overlay {
    z-index: 10002;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    opacity: 0.2;
    background-color: #000;
  }
  & > .js-widget-window {
    position: fixed;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    z-index: 10003;
    background: #fff;

    top: 15%;

    width: 760px;
    padding: 20px 60px;
    padding-top: 60px;
    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
  }
  & > .js-widget-dialog {
    width: 376px;
    font-size: 12px;
    margin-top: 10px;
  }
  & > .js-widget-dialog > h2 {
    font-size: 26px;
    font-weight: bold;
    margin: 0px;
  }
  & > .js-widget-dialog > span {
    opacity: 0.5;
  }
  & > .js-widget-icons {
    width: 210px;

    margin-right: 55px;
    margin-left: 55px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
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
            password: uniquePassword
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
    //const isOpen = this.state.toggle;
    return (
      <React.Fragment>
        <MessageWrapper>
          <div
            className="js-widget-overlay"
            onClick={() => {
              this.props.destroy();
            }}
          />
          <div className="js-widget-window">
            <CloseButton
              onClick={() => {
                this.props.destroy();
              }}
            />
            <div className="js-widget-dialog">
              <h2>Что такое eyezon?</h2>
              <span>
                Это инструмент для видео-трансляций нового поколения, напрямую
                соединяющий вас с тем, кто может показать интересующий вас
                видео-обзор.
              </span>
              <br />
              <br />
              <br />

              <h2>Как он работает?</h2>
              <span>
                Используя искусственный интеллект, система анализирует все фото
                и короткие видео в приложении и, сопоставляя эти результаты с
                поисковым запросом, выдает в качестве результата только те
                изобажнеия, которые ему релевантны. Остается отправить запрос и
                ждать, когда автор сможет прислать видео-ответ на него.
              </span>
              <div className="js-widget-lowrow">
                <GetStream
                  onClick={e => {
                    e.preventDefault;
                    this.handleRegistration();
                  }}
                >
                  Запросить трансляцию
                </GetStream>
              </div>
            </div>
            <div className="js-widget-icons">
              <img src={iphone} className="js-widget-image" />

              <div className="js-widget-download">
                <img src={android} className="js-widget-android" />
                <img src={ios} className="js-widget-ios" />
              </div>
            </div>
          </div>
        </MessageWrapper>
      </React.Fragment>
    );
  }
}

export default Message;
