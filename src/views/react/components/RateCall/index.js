import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  &&& {
    display: flex !important;
    width: 327px !important;
    height: 40px !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
    border: 1px solid #bebebe !important;
    box-sizing: border-box !important;
    border-radius: 5px !important;
    cursor: pointer !important;
  }
`;

export class RateCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: true
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      selected: !this.state.selected
    });
  }
  render() {
    return (
      <Wrapper onClick={this.handleClick}>
        {this.state.selected && <img src={Image} alt="logo" />}
      </Wrapper>
    );
  }
}

export default RateCall;
