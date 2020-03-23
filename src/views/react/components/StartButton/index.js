import React from "react";
import styled, { keyframes, css } from "styled-components";

const bottom = keyframes`
    0% {
      -webkit-transform: translateY(100%);
        -moz-transform: translateY(100%);
        -ms-transform: translateY(100%);
        transform: translateY(100%);
    }
      20% {
        -webkit-transform: translateY(80%);
        -moz-transform: translateY(80%);
        -ms-transform: translateY(80%);
        transform: translateY(80%);
    }
    50%{
      -webkit-transform: translateY(50%);
        -moz-transform: translateY(50%);
        -ms-transform: translateY(50%);
        transform: translateY(50%);
    }
    100% {
      -webkit-transform: translateY(0%);
        -moz-transform: translateY(0%);
        -ms-transform: translateY(0%);
        transform: translateY(0%);
    }   
`;

const right = keyframes`
    0% {
      -webkit-transform: translateX(100%);
        -moz-transform: translateX(100%);
        -ms-transform: translateX(100%);
        transform: translateX(100%);
    }
      20% {
        -webkit-transform: translateX(80%);
        -moz-transform: translateX(80%);
        -ms-transform: translateX(80%);
        transform: translateX(80%);
    }
    50%{
            -webkit-transform: translateX(50%);
        -moz-transform: translateX(50%);
        -ms-transform: translateX(50%);
        transform: translateX(50%);
    }
    100% {
      -webkit-transform: translateX(0%);
        -moz-transform: translateX(0%);
        -ms-transform: translateX(0%);
        transform: translateX(0%);
    }   
`;

const left = keyframes`
    0% {
      -webkit-transform: translateX(-100%);
        -moz-transform: translateX(-100%);
        -ms-transform: translateX(-100%);
        transform: translateX(-100%);
    }
      20% {
        -webkit-transform: translateX(-80%);
        -moz-transform: translateX(-80%);
        -ms-transform: translateX(-80%);
        transform: translateX(-80%);
    }
    50%{
      -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    100% {
      -webkit-transform: translateX(0%);
        -moz-transform: translateX(0%);
        -ms-transform: translateX(0%);
        transform: translateX(0%);
    }   
`;

const Wrap = styled.div`
  &&& {
    position: absolute !important;
    z-index: 1000 !important;

    ${props =>
      props.status === "answer" &&
      css`
        -webkit-animation: ${props.positions === "bottom"
            ? bottom
            : props.positions === "left"
            ? left
            : props.positions === "right"
            ? right
            : ""}
          0.5s ease-in-out 0s !important;
        -moz-animation: ${props.positions === "bottom"
            ? bottom
            : props.positions === "left"
            ? left
            : props.positions === "right"
            ? right
            : ""}
          0.5s ease-in-out 0s !important;
        -ms-animation: ${props.positions === "bottom"
            ? bottom
            : props.positions === "left"
            ? left
            : props.positions === "right"
            ? right
            : ""}
          0.5s ease-in-out 0s !important;
        animation: ${props.positions === "bottom"
            ? bottom
            : props.positions === "left"
            ? left
            : props.positions === "right"
            ? right
            : ""}
          0.5s ease-in-out 0s !important;
      `}

    bottom: ${props =>
      props.positions === "bottom-left" ||
      props.positions === "bottom-right" ||
      (props.positions === "bottom" && props.status === "answer")
        ? "24px !important"
        : props.positions === "bottom"
        ? "0 !important"
        : "none !important"};

    left: ${props =>
      props.positions === "bottom-left"
        ? "24px !important"
        : props.positions === "left"
        ? "0 !important"
        : "none !important"};
    right: ${props =>
      props.positions === "bottom-right"
        ? "24px !important"
        : props.positions === "right"
        ? "0 !important"
        : "none !important"};

    &:after {
      position: absolute !important;

      left: ${props =>
        props.positions === "bottom-right" || props.positions === "bottom-left"
          ? "37px !important"
          : props.positions === "left"
          ? props.status === "answer"
            ? "205px !important"
            : "47px !important"
          : "none !important"};
      right: ${props =>
        props.positions === "right"
          ? props.status === "answer"
            ? "205px !important"
            : "47px !important"
          : "none !important"};
      top: ${props =>
        props.positions === "bottom" ? "3px !important" : "0 !important"};

      content: ${props =>
        (props.positions === "bottom-right" ||
          props.positions === "bottom-left") &&
        props.status !== "rest"
          ? `'${props.count}' !important`
          : "'' !important"};
      font-weight: 500 !important;
      font-size: 13px !important;
      line-height: 16px !important;
      color: #ffffff !important;
      text-align: center !important;
      letter-spacing: -0.006em !important;

      height: ${props =>
        props.positions === "bottom"
          ? props.status === "answer"
            ? "13px !important"
            : "7px !important"
          : props.positions === "bottom-left" ||
            props.positions === "bottom-right"
          ? "16px !important"
          : "13px !important"};
      width: ${props =>
        props.positions === "bottom"
          ? props.status === "answer"
            ? "13px !important"
            : "7px !important"
          : props.positions === "bottom-left" ||
            props.positions === "bottom-right"
          ? "16px !important"
          : "13px !important"};

      border-radius: 50% !important;

      background: ${props =>
        props.status !== "rest"
          ? "#ff204a !important"
          : "transparent !important"};
    }
  }
`;

const Button = styled.button`
  &&& {
    border-radius: ${props =>
      props.positions === "bottom-left" || props.positions === "bottom-right"
        ? "50% !important"
        : props.status === "answer" && props.positions === "bottom"
        ? "28px !important"
        : "none !important"};
    border-top-left-radius: ${props =>
      props.positions === "bottom" && props.status !== "answer"
        ? "5px !important"
        : props.positions === "right"
        ? "28px !important"
        : "none !important"};
    border-top-right-radius: ${props =>
      props.positions === "bottom" && props.status !== "answer"
        ? "5px !important"
        : props.positions === "left"
        ? "28px !important"
        : "none !important"};
    border-bottom-right-radius: ${props =>
      props.positions === "left" ? "28px !important" : "none !important"};
    border-bottom-left-radius: ${props =>
      props.positions === "right" ? "28px !important" : "none !important"};
    border: none !important;

    width: ${props =>
      (props.positions === "bottom" ||
        props.positions === "left" ||
        props.positions === "right") &&
      props.status === "answer"
        ? "218px !important"
        : props.positions === "bottom"
        ? "144px !important"
        : "none !important"};

    &:focus {
      outline: none !important;
    }
    background: transparent !important;
    color: #ffffff !important;

    padding: ${props =>
      props.positions === "bottom" || props.positions === "right"
        ? props.positions === "bottom" && props.status === "answer"
          ? "4px 20px 4px 4px !important"
          : "4px 14px 4px 4px !important"
        : props.positions === "left"
        ? "4px 4px 4px 15px !important"
        : "4px !important"};
    margin: 0 !important;

    box-sizing: border-box !important;
    box-shadow: 0px 2px 5px rgba(99, 114, 130, 0.24) !important;

    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
  }
`;

const Circle = styled.div`
  &&& {
    border-radius: 50% !important;

    width: ${props =>
      (props.status === "answer" && props.positions === "bottom") ||
      props.positions !== "bottom"
        ? "48px !important"
        : "16px !important"};
    height: ${props =>
      (props.status === "answer" && props.positions === "bottom") ||
      props.positions !== "bottom"
        ? "48px !important"
        : "16px !important"};

    background: green !important;
    order: ${props =>
      props.positions === "left" ? "2 !important" : "1 !important"};
  }
`;

const Span = styled.span`
  &&& {
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 170% !important;
    color: ${props =>
      props.status === "rest" ? "#ababab !important;" : "#000000 !important"};
    order: ${props =>
      props.positions === "left" ? "1 !important" : "2 !important"};
  }
`;

class StartButton extends React.Component {
  render() {
    const { positions, status, count } = this.props;
    return (
      <Wrap positions={positions} status={status} count={count}>
        <Button
          positions={positions}
          status={status}
          onClick={this.changeStatus}
        >
          <Circle positions={positions} status={status} />
          {(positions === "bottom" ||
            positions === "left" ||
            positions === "right") && (
            <Span status={status} positions={positions}>
              {status === "rest" && positions === "bottom"
                ? "Ждём ответа"
                : status === "answer"
                ? "У вас новый ответ"
                : positions === "bottom"
                ? "Новый ответ"
                : ""}
            </Span>
          )}
        </Button>
      </Wrap>
    );
  }
}

export default StartButton;
