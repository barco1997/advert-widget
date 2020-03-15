import React, { Component } from "react";
//import logo from "./logo.svg";

import styled from "styled-components";

/*****************************************************************************/
/*************************** Styling the page ********************************/
/*****************************************************************************/
const Wrapper = styled.div`
  &&& {
    display: flex !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 48px !important;
    line-height: 61px !important;
    margin-bottom: 10px !important;
    color: #000000 !important;
  }
`;

const SingleChar = styled.div`
  &&& {
    width: 31px !important;
    display: flex !important;
    justify-content: center !important;
  }
`;

const toTwoDigits = num => {
  return ("0" + num).slice(-2);
};

/*****************************************************************************/
/*************************** Class Logic *************************************/
/*****************************************************************************/

class AwaitTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      minutes: this.props.startMin ? this.props.startMin : 0,
      seconds: this.props.startSec ? this.props.startSec : 0
    };
    this.setTime = this.setTime.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  setTime() {
    this.setState(
      {
        minutes: this.state.minutes + Math.floor((this.state.seconds + 1) / 60),
        seconds:
          this.state.seconds +
          1 -
          60 * Math.floor((this.state.seconds + 1) / 60)
      },
      () => {
        if (this.state.minutes === 2) {
          this.props.exceedFunc();
        }
      }
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setTime();
    }, this.state.delay);
  }

  render() {
    //const minutes = toTwoDigits(this.state.minutes);
    //const seconds = toTwoDigits(this.state.seconds);
    const minuteOffset = this.state.seconds === 0 ? 2 : 1;
    const reverseMinutes = toTwoDigits(minuteOffset - this.state.minutes);
    const reverseSeconds = toTwoDigits(
      this.state.seconds === 0 ? 0 : 60 - this.state.seconds
    );
    return (
      <Wrapper>
        <SingleChar>{reverseMinutes[0]}</SingleChar>
        <SingleChar>{reverseMinutes[1]}</SingleChar>:
        <SingleChar>{reverseSeconds[0]}</SingleChar>
        <SingleChar>{reverseSeconds[1]}</SingleChar>
      </Wrapper>
    );
  }
}

export default AwaitTimer;
