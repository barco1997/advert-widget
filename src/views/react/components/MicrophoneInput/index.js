import React from "react";
import styled, { keyframes, css } from "styled-components";
import { media, mediaType } from "../../../../utils/media";
import { staticUrl } from "../../constants";
//import Image from "./micro.svg";
//import muteMicro from "./muteMicro.svg";

const MicroWrap = styled.div`
  &&& {
    display: flex !important;
    justify-content: ${(props) =>
      props.isActive ? "center !important" : "space-between !important"};

    width: 500px !important;
    align-items: center !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    color: #000000 !important;
    user-select: none !important;
  }
`;

const SendIconWrapS = styled.div`
  &&& {
    width: 36px !important;
    height: 36px !important;

    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: #ff2d55 !important;
    border-radius: 50% !important;
    cursor: pointer !important;
    margin-right: ${(props) => (props.stream ? "18px" : "0px")} !important;
  }
`;

const coolBoxKeyframes = keyframes`
    0% {
        transform: translateX(200%);
    }
      25% {
        transform: translateX(125%);
    }
    50%{
        transform: translateX(75%);
    }
    65%{
        transform: translateX(-4%);
    }
    80%{
        transform: translateX(4%);
    }
    95%{
        transform: translateX(-2%);
    }           
    100% {
        transform: translateX(0%);
    }   
`;

export const pulse = keyframes`
    0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(214, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(214, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(214, 0, 0, 0);
	} 
`;

const Input = styled.textarea`
  &&& {
    height: ${(props) => (props.height ? props.height : "63px")} !important;
    color: ${(props) => (props.stream ? "#ffffff" : "black")} !important;
    flex: 1 !important;

    opacity: ${(props) => (props.blocked ? "0.7" : "1")} !important;
    max-width: 100% !important;
    background: ${(props) =>
      props.stream ? "rgba(255, 255, 255, 0.32)" : "#ffffff"} !important;
    border: 0px solid #eaeaea !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
    border-radius: ${(props) => (props.stream ? "4px" : "0px")} !important;
    padding: ${(props) =>
      props.stream ? "13px 24px" : "24px 24px"} !important;
    padding-right: ${(props) => (props.stream ? "24px" : "70px")} !important;
    font-family: "Montserrat" !important;
    font-weight: normal !important;
    font-size: 16px !important;
    line-height: 20px !important;
    outline: 0 !important;
    resize: none !important;
    border-top: ${(props) =>
      props.stream ? "none" : "1px solid #eaeaea"} !important;
    margin: 0px !important;
    width: ${(props) =>
      props.stream ? "calc(100% - 89px)" : "100%"} !important;
    margin-left: ${(props) => (props.stream ? "24px" : "0px")} !important;
    margin-right: ${(props) => (props.stream ? "15px" : "0px")} !important;
    word-break: break-all !important;
    vertical-align: middle !important;
    &::placeholder {
      color: ${(props) =>
        props.stream ? "rgba(255, 255, 255, 0.6)" : "#cacaca"} !important;
      font-weight: normal !important;
    }
    ${media.desktop`
      font-size: 16px !important;
      height: ${(props) => (props.height ? props.height : "63px")} !important;
      
  `};
  }
`;
const ImageSend = styled.div`
  &&& {
    background: url(${(props) => props.src}) !important;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    width: 18px !important;
    margin-left: 3px !important;
    height: 16px !important;
    position: relative !important;
    cursor: pointer !important;
    ${media.desktop`
    
  `};
  }
`;

const HintWrap = styled.div`
  &&& {
    z-index: 10010 !important;
    position: absolute !important;
    top: -85px !important;
    right: 0px !important;
    width: 240px !important;

    background: #ffffff !important;
    padding: 14px !important;
    border-radius: 5px 5px 0px 5px !important;
    font-weight: 500 !important;
    font-size: 12px !important;
    line-height: 160% !important;
    color: #090909 !important;
  }
`;

const CloseButton = styled.span`
  &&& {
    cursor: pointer !important;
    position: absolute !important;
    top: 0px !important;
    right: 0px !important;
    &:after {
      position: absolute !important;
      top: 14px !important;
      left: -20px !important;
      content: " " !important;
      height: 12px !important;
      width: 2px !important;
      background-color: #000 !important;
      transform: rotate(-45deg);
    }
    &:before {
      position: absolute !important;
      top: 14px !important;
      left: -20px !important;
      content: " " !important;
      height: 12px !important;
      width: 2px !important;
      background-color: #000 !important;
      transform: rotate(45deg);
    }
  }
`;

const MicroButton = styled.div`
  &&& {
    background: ${(props) =>
      props.isActive ? `${props.color} !important` : "#f2f2f2 !important"};
    border-radius: 50% !important;
    margin-right: ${(props) => (props.isActive ? "0px" : "18px")} !important;
    &:focus {
      outline: none !important;
    }
    height: 36px !important;
    width: 36px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: none !important;
    border: none !important;
    position: relative !important;

    ${(props) =>
      props.isActive &&
      css`
        animation: ${coolBoxKeyframes} 2s ease-in-out 0s !important;
      `}
    ${(props) =>
      props.isActive &&
      css`
        animation: ${pulse} 1s infinite !important;
      `}
      user-select: none  !important;
  }
`;

class MicrophoneInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.audioStreamStatus ? props.audioStreamStatus : false,
      isShowHint: true,
    };

    this.handleMicro = this.handleMicro.bind(this);
    this.handleHint = this.handleHint.bind(this);
  }
  handleMicro() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      () => {
        this.setState({ isActive: !this.state.isActive, isShowHint: false });
        this.props.audioToggle();
      },
      () => {
        //console.log("record failed");
        !mediaType.desktop
          ? alert(
              "Для использования микрофона во время прямой трансляции, разрешите доступ к микрофону в левом верхнем углу браузера и/или проверьте его наличие на вашем устройстве и перезагрузите страницу"
            )
          : alert(
              "Для использования микрофона во время прямой трансляции, перезагрузите страницу и разрешите доступ к микрофону"
            );
      }
    );
  }

  handleHint(e) {
    e.stopPropagation();
    this.setState({ isShowHint: false });
  }

  render() {
    const { isActive, isShowHint } = this.state;
    return (
      <MicroWrap isActive={isActive}>
        {!isActive && (
          <Input
            rows="1"
            stream
            ref={(item) => {
              this.props.setStreamInput(item);
            }}
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder="Сообщение..."
            onKeyPress={this.props.onKeyPress}
            height={this.props.height}
            onKeyDown={this.props.onKeyDown}
          />
        )}
        {this.props.value.length < 1 && (
          <MicroButton
            onClick={this.handleMicro}
            isActive={isActive}
            color={this.props.color}
          >
            {this.props.isHint && isShowHint && (
              <HintWrap onClick={(e) => e.stopPropagation()}>
                Вы можете говорить с продавцом. Просто включите микрофон.
                <CloseButton onClick={this.handleHint} />
              </HintWrap>
            )}
            <img
              src={
                isActive
                  ? `${staticUrl}/static/images/muteMicro.svg`
                  : `${staticUrl}/static/images/micro.svg`
              }
            />
          </MicroButton>
        )}
        {this.props.value.length > 0 && (
          <SendIconWrapS onClick={() => this.props.handleSubmitS()} stream>
            <ImageSend src={`${staticUrl}/static/images/Subtract.png`} />
          </SendIconWrapS>
        )}
      </MicroWrap>
    );
  }
}

export default MicrophoneInput;
