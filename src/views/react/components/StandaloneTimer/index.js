import moment from "moment";
import React, { Component } from "react";
//import logo from "./logo.svg";

import styled from "styled-components";

/*****************************************************************************/
/*************************** Styling the page ********************************/
/*****************************************************************************/
const Wrapper = styled.span`
  display: inline-block;
`;

const toTwoDigits = num => {
  return ("0" + num).slice(-2);
};

/*****************************************************************************/
/*************************** Class Logic *************************************/
/*****************************************************************************/

class StandaloneTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      minutes: 0,
      seconds: 0
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
        this.props.setDuration(
          (this.state.minutes * 60 + this.state.seconds) * 1000
        );
      }
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setTime();
    }, this.state.delay);
  }

  render() {
    return (
      <Wrapper>
        {toTwoDigits(this.state.minutes)}:{toTwoDigits(this.state.seconds)}
      </Wrapper>
    );
  }
}

export default StandaloneTimer;
