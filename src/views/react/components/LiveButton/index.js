/**
 *
 * SendButton
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  text-decoration: none;
  background: ${props =>
    props.watched ? "rgba(255, 45, 85, 0.5)" : "#ff2d55"};
  border-radius: 100px;
  font-size: 12px;
  display: flex;
  width: 128px;
  height: 28px;
  justify-content: center;
  align-items: center;
  font-family: "Mont";
  color: white;
`;
const Layer2 = styled.div`
  border-radius: 100px;

  display: flex;
  background: ${props => (props.watched ? "white" : "rgba(255, 45, 85, 0.2)")};
  width: 160px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const Layer3 = styled.button`
  text-decoration: none;

  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;

  outline: 0;

  border-radius: 100px;
  display: flex;
  background: ${props => (props.watched ? "white" : "rgba(255, 45, 85, 0.05)")};
  width: 158px;
  height: 52px;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: 0;
  }
`;

export class Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      wasWatched: false,
      flv: this.props.flv
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.state.flv);
    this.props.setFlv(this.state.flv);
    this.setState({
      wasWatched: true
    });
  }

  render() {
    const isOpen = this.state.wasWatched;
    return (
      <React.Fragment>
        <Layer3 watched={isOpen}>
          <Layer2 watched={isOpen}>
            <ButtonWrapper watched={isOpen} onClick={() => this.handleClick()}>
              <div>{this.props.children}</div>
            </ButtonWrapper>
          </Layer2>
        </Layer3>
      </React.Fragment>
    );
  }
}

export default Button;
