
import React from "react";
import styled from "styled-components";
import ls from "local-storage";
import axios from "axios";


const ButtonWrapper = styled.button`
  text-decoration: none;
  border-width: 0px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  width: 140px;
  height: 28px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 10px;
  margin-top: 10px; 

  background: ${props => (props.isWatching ? "#ffb3c6" : "#ff1d55")};
  color: white;
  border-radius: 32px;
  border-style: none;
  box-shadow: ${props => (props.isWatching ? "none" : "0px 0px 10px rgba(255, 45, 85, 0.8)")};

  transition: box-shadow 300ms ease-in-out;
`;

export class StreamButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isWatching: true,
      link: this.props.link,
    }
  }
  

  render() {
    return (
      <React.Fragment>
        <ButtonWrapper
          onClick={() => this.props.streamHandler()}
          isWatching = {this.props.isWatching}
        >Смотреть</ButtonWrapper>
      </React.Fragment>
    );
  }
}

export default StreamButton;
