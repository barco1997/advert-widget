import React from "react";
import styled, { keyframes, css } from "styled-components";
import { media } from "../../../../utils/media";
//import Image from "./micro.svg";
//import muteMicro from "./muteMicro.svg";

const MicroWrap = styled.div`
  &&& {
    display: flex !important;
    justify-content: ${props =>
      props.isActive ? "center !important" : "space-between !important"};

    width: 500px !important;
    align-items: center !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    color: #000000 !important;
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
    margin-right: ${props => (props.stream ? "18px" : "0px")} !important;
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
    height: ${props => (props.height ? props.height : "63px")} !important;
    color: ${props => (props.stream ? "#ffffff" : "black")} !important;
    flex: 1 !important;

    opacity: ${props => (props.blocked ? "0.7" : "1")} !important;
    max-width: 100% !important;
    background: ${props =>
      props.stream ? "rgba(255, 255, 255, 0.32)" : "#ffffff"} !important;
    border: 0px solid #eaeaea !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
    border-radius: ${props => (props.stream ? "4px" : "0px")} !important;
    padding: ${props => (props.stream ? "13px 24px" : "24px 24px")} !important;
    padding-right: ${props => (props.stream ? "24px" : "70px")} !important;
    font-family: "Montserrat" !important;
    font-weight: normal !important;
    font-size: 16px !important;
    line-height: 20px !important;
    outline: 0 !important;
    resize: none !important;
    border-top: ${props =>
      props.stream ? "none" : "1px solid #eaeaea"} !important;
    margin: 0px !important;
    width: ${props => (props.stream ? "calc(100% - 89px)" : "100%")} !important;
    margin-left: ${props => (props.stream ? "24px" : "0px")} !important;
    margin-right: ${props => (props.stream ? "15px" : "0px")} !important;
    word-break: break-all !important;
    vertical-align: middle !important;
    &::placeholder {
      color: ${props =>
        props.stream ? "rgba(255, 255, 255, 0.6)" : "#cacaca"} !important;
      font-weight: normal !important;
    }
    ${media.desktop`
      font-size: 16px !important;
      height: ${props => (props.height ? props.height : "63px")} !important;
      
  `};
  }
`;
const ImageSend = styled.div`
  &&& {
    background: url(${props => props.src}) !important;
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

const MicroButton = styled.div`
  &&& {
    background: ${props =>
      props.isActive ? "#FF2D55 !important" : "#f2f2f2 !important"};
    border-radius: 50% !important;
    margin-right: ${props => (props.isActive ? "0px" : "18px")} !important;
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

    ${props =>
      props.isActive &&
      css`
        animation: ${coolBoxKeyframes} 2s ease-in-out 0s !important;
      `}
    ${props =>
      props.isActive &&
      css`
        animation: ${pulse} 1s infinite !important;
      `}
  }
`;

class MicrophoneInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };

    this.handleMicro = this.handleMicro.bind(this);
  }
  handleMicro() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      () => {
        this.setState({ isActive: !this.state.isActive });
        this.props.audioToggle();
      },
      () => {
        console.log("FAIL");
      }
    );
  }

  render() {
    const { isActive } = this.state;
    return (
      <MicroWrap isActive={isActive}>
        {!isActive && (
          <Input
            rows="1"
            stream
            ref={item => {
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
          <MicroButton onClick={this.handleMicro} isActive={isActive}>
            <img
              src={
                isActive
                  ? "https://www.witheyezon.com/eyezonsite/static/images/muteMicro.svg"
                  : "https://www.witheyezon.com/eyezonsite/static/images/micro.svg"
              }
            />
          </MicroButton>
        )}
        {this.props.value.length > 0 && (
          <SendIconWrapS onClick={() => this.props.handleSubmitS()} stream>
            <ImageSend
              src={
                "https://witheyezon.com/eyezonsite/static/images/Subtract.png"
              }
            />
          </SendIconWrapS>
        )}
      </MicroWrap>
    );
  }
}

export default MicrophoneInput;
