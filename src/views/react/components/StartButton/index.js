import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  &&& {
    position: absolute !important;
    z-index: 1000 !important;

    bottom: ${props =>
      props.positions === "bottom-left" || props.positions === "bottom-right"
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
        props.positions === "left" ||
        props.positions === "bottom-right" ||
        props.positions === "bottom-left"
          ? "35px !important"
          : "none !important"};
      right: ${props =>
        props.positions === "right" ? "35px !important" : "none !important"};
      top: ${props =>
        props.positions === "bottom" ? "3px !important" : "0 !important"};

      content: "" !important;

      height: ${props =>
        props.positions === "bottom" ? "7px !important" : "13px !important;"};
      width: ${props =>
        props.positions === "bottom" ? "7px !important" : "13px !important;"};

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
        : "none !important"};
    border-top-left-radius: ${props =>
      props.positions === "bottom"
        ? "5px !important"
        : props.positions === "right"
        ? "50% !important"
        : "none !important"};
    border-top-right-radius: ${props =>
      props.positions === "bottom"
        ? "5px !important"
        : props.positions === "left"
        ? "50% !important"
        : "none !important"};
    border-bottom-right-radius: ${props =>
      props.positions === "left" ? "50% !important" : "none !important"};
    border-bottom-left-radius: ${props =>
      props.positions === "right" ? "50% !important" : "none !important"};
    border: none !important;

    width: ${props =>
      props.positions === "bottom" ? "144px !important" : "none !important"};

    &:focus {
      outline: none !important;
    }
    background: transparent !important;
    color: #ffffff !important;

    padding: ${props =>
      props.positions === "bottom" || props.positions === "right"
        ? "4px 12px 4px 4px !important"
        : props.positions === "left"
        ? "4px 4px 4px 12px !important"
        : "9px !important"};
    margin: 0 !important;

    box-sizing: border-box;
    box-shadow: 0px 2px 5px rgba(99, 114, 130, 0.24) !important;

    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
  }
`;

const Circle = styled.div`
  &&& {
    border-radius: 50% !important;

    width: 30px !important;
    height: 30px !important;

    background: green !important;
  }
`;

const Span = styled.span`
  &&& {
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 170% !important;
    color: #ababab !important;
  }
`;

class StartButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "rest" // will be rest/active/answer
    };
  }

  render() {
    const { positions } = this.props;
    return (
      <Wrap positions={positions} status={this.state.status}>
        <Button positions={positions}>
          <Circle />
          {positions === "bottom" && <Span>Ждём ответа</Span>}
        </Button>
      </Wrap>
    );
  }
}

export default StartButton;
