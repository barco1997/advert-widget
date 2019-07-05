/**
 *
 * SendButton
 *
 */

import React from "react";
//import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  &&& {
    text-decoration: none !important;
    background: ${props =>
      props.watched
        ? "rgba(255, 45, 85, 0.5) !important"
        : "#ff2d55 !important"};
    border-radius: 100px !important;
    font-size: 12px !important;
    display: flex !important;
    width: 128px !important;
    height: 28px !important;
    justify-content: center !important;
    align-items: center !important;
    font-family: "Mont" !important;
    color: white !important;
  }
`;
const Layer2 = styled.div`
  &&& {
    border-radius: 100px !important;

    display: flex !important;
    background: ${props =>
      props.watched
        ? "rgba(255, 45, 85, 0.05) !important"
        : "rgba(255, 45, 85, 0.2) !important"};
    width: 160px !important;
    height: 40px !important;
    justify-content: center !important;
    align-items: center !important;
  }
`;

const Layer3 = styled.button`
  &&& {
    text-decoration: none !important;

    -webkit-font-smoothing: antialiased !important;
    -webkit-touch-callout: none !important;
    user-select: none !important;
    cursor: pointer !important;
    box-shadow: none !important;
    outline: 0 !important;
    border: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    border-radius: 100px !important;
    display: flex !important;
    background: ${props =>
      props.watched
        ? "rgba(255, 45, 85, 0.05) !important"
        : "rgba(255, 45, 85, 0.05) !important"};
    width: 158px !important;
    height: 52px !important;
    justify-content: center !important;
    align-items: center !important;
    &:focus {
      outline: 0 !important;
    }
  }
`;

export class Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      wasWatched: false,
      id: this.props.id
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setFlv(this.state.id);
    this.setState({
      wasWatched: true
    });
  }

  render() {
    const isOpen = this.state.wasWatched;
    return (
      <Layer3 watched={isOpen}>
        <Layer2 watched={isOpen}>
          <ButtonWrapper watched={isOpen} onClick={() => this.handleClick()}>
            <div>{this.props.children}</div>
          </ButtonWrapper>
        </Layer2>
      </Layer3>
    );
  }
}

export default Button;
