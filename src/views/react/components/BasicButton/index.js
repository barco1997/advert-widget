import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  &&& {
    display: flex !important;
    width: 100% !important;
    height: 33.88px !important;
    border-radius: 100px !important;
    margin-right: 0px !important;
    border: none !important;
    &:focus {
      outline: none !important;
    }

    justify-content: center !important;
    align-items: center !important;
    font-family: "Montserrat" !important;
    font-size: 12px !important;
    line-height: 15px !important;
    text-align: center !important;
    color: #ffffff !important;

    cursor: pointer !important;
    background: ${props =>
      props.isClicked ? "#FF4165" : "#FF2D55"} !important;
    &:hover {
      background: #ff4165 !important;
    }
  }
`;

export class BasicButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick() {
    if (this.props.onClick) this.props.onClick();
    this.setState({
      isClicked: true
    });
  }

  handleBlur() {
    this.setState({
      isClicked: false
    });
  }

  render() {
    return (
      <Wrapper
        isClicked={this.state.isClicked}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
      >
        {this.props.children}
      </Wrapper>
      //<h1>I am here</h1>
    );
  }
}

export default BasicButton;
