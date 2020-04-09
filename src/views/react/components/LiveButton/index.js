/**
 *
 * SendButton
 *
 */

import React from "react";
//import PropTypes from "prop-types";
import styled from "styled-components";
import { staticUrl } from "../../constants";
const Image = styled.div`
  &&& {
    background: url(${(props) => props.src}) !important;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    width: 8px !important;
    margin-right: 7px !important;
    height: 11px !important;
  }
`;

const ButtonWrapper = styled.div`
  &&& {
    text-decoration: none !important;
    background: ${(props) =>
      props.watched
        ? "rgba(255, 45, 85, 0.5) !important"
        : "#FFFFFF !important"};
    border-radius: 5px !important;
    font-size: 12px !important;
    display: flex !important;
    width: 103px !important;
    height: 36px !important;
    justify-content: center !important;
    align-items: center !important;
    font-family: "Montserrat" !important;
    color: #000000 !important;
  }
`;
const Child = styled.div`
  &&& {
    margin-top: 2px !important;
  }
`;

export class Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      wasWatched: false,
      id: this.props.id,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setFlv(this.state.id);
    this.setState({
      wasWatched: true,
    });
  }

  render() {
    return (
      <ButtonWrapper onClick={() => this.handleClick()}>
        <Image src={`${staticUrl}/static/images/Vector.png`} />
        <Child>{this.props.children}</Child>
      </ButtonWrapper>
    );
  }
}

export default Button;
