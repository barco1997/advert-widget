import React from "react";
import styled, { keyframes } from "styled-components";

const spinnAnimation = keyframes`
0% { transform: translate(-50%,-50%) rotate(0deg); }
100% { transform: translate(-50%,-50%) rotate(360deg); }
`;

const Button = styled.button`
  &&& {
    border-radius: 2px !important;
    border: none !important;
    &:focus {
      outline: none !important;
    }

    padding: 8px !important;
    min-width: 67px;

    font-family: "Montserrat" !important;
    text-align: center !important;
    font-size: 14px !important;
    line-height: 24px !important;
    font-weight: 800 !important;

    background: ${props =>
      props.status === "LIVE" ? "#FF2D55" : "#FFFFFF"} !important;
    color: ${props =>
      props.status !== "LIVE" ? "#FF2D55" : "#FFFFFF"} !important;
    transition: 0.5s ease-in-out;
    &:hover {
      background: blue;
    }
  }
`;

const SpinnerWrap = styled.div`
  &&& {
    width: 20px !important;
    height: 20px !important;
    display: inline-block !important;
    background: #ffffff !important;
  }
`;

const Spinner = styled.div`
  &&& {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
    transform: translateZ(0) scale(1) !important;
    backface-visibility: hidden !important;
    transform-origin: 0 0 !important;
  }
`;

const SpinnerContent = styled.div`
  &&& {
    position: absolute !important;
    width: 11px !important;
    height: 11px !important;
    border: 2px solid #ff2d55 !important;
    border-top-color: transparent !important;
    border-radius: 50% !important;

    animation: ${spinnAnimation} 1s linear infinite !important;
    top: 15px !important;
    left: 5px !important;

    box-sizing: content-box !important;
  }
`;

export class StatusButton extends React.Component {
  render() {
    return (
      <Button>
        {this.props.status === "CONNECTING" && (
          <SpinnerWrap>
            <Spinner>
              <SpinnerContent />
            </Spinner>
          </SpinnerWrap>
        )}
        {this.props.status}
      </Button>
    );
  }
}

export default StatusButton;
