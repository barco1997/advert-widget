import React from "react";
import styled, { keyframes, css } from "styled-components";

import Image from "./micro.svg";
import muteMicro from "./muteMicro.svg";

const MicroWrap = styled.div`
  &&& {
    display: flex !important;
    justify-content: ${props =>
      props.isActive ? "center !important" : "space-between !important"};

    width: 500px !important;

    font-family: "Montserrat" !important;
    font-style: normal !important;
    color: #000000 !important;
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

const Input = styled.input`
  &&& {
    width: 388px !important;

    background: rgba(255, 255, 255, 0.32) !important;
    color: rgba(0, 0, 0, 0.6) !important;

    border-radius: 4px !important;

    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 170% !important;

    padding: 8px 16px !important;
  }
`;

const MicroButton = styled.button`
  &&& {
    background: ${props =>
      props.isActive ? "#FF2D55 !important" : "#f2f2f2 !important"};
    border-radius: 50% !important;
    padding: 11px 15px !important;
    &:focus {
      outline: none !important;
    }

    box-sizing: border-box !important;
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
    this.setState({ isActive: true });
  }

  render() {
    const { isActive } = this.state;
    return (
      <MicroWrap isActive={isActive}>
        {!isActive && <Input placeholder="Сообщение..." />}
        <MicroButton onClick={this.handleMicro} isActive={isActive}>
          <img src={isActive ? muteMicro : Image} />
        </MicroButton>
      </MicroWrap>
    );
  }
}

export default MicrophoneInput;
