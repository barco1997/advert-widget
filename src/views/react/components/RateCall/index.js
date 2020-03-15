import React from "react";
import styled from "styled-components";
//import Star from "./star.svg";
//import CheckedStar from "./checkedstar.svg";
const Wrapper = styled.div`
  &&& {
    display: flex !important;
    width: 193px !important;
    height: 25px !important;
    justify-content: space-between !important;
    align-items: center !important;
  }
`;

const ImgWrap = styled.img`
  &&& {
    width: 25px !important;
    height: 25px !important;
    cursor: pointer !important;
  }
`;

export class RateCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.setState({
      rating: e
    });
  }
  render() {
    return (
      <Wrapper>
        <ImgWrap
          src={
            this.state.rating >= 0
              ? "https://www.witheyezon.com/eyezonsite/static/images/checkedstar.svg"
              : "https://www.witheyezon.com/eyezonsite/static/images/star.svg"
          }
          alt="logo"
          onClick={() => this.handleClick(0)}
        />
        <ImgWrap
          src={
            this.state.rating >= 1
              ? "https://www.witheyezon.com/eyezonsite/static/images/checkedstar.svg"
              : "https://www.witheyezon.com/eyezonsite/static/images/star.svg"
          }
          alt="logo"
          onClick={() => this.handleClick(1)}
        />
        <ImgWrap
          src={
            this.state.rating >= 2
              ? "https://www.witheyezon.com/eyezonsite/static/images/checkedstar.svg"
              : "https://www.witheyezon.com/eyezonsite/static/images/star.svg"
          }
          alt="logo"
          onClick={() => this.handleClick(2)}
        />
        <ImgWrap
          src={
            this.state.rating >= 3
              ? "https://www.witheyezon.com/eyezonsite/static/images/checkedstar.svg"
              : "https://www.witheyezon.com/eyezonsite/static/images/star.svg"
          }
          alt="logo"
          onClick={() => this.handleClick(3)}
        />
        <ImgWrap
          src={
            this.state.rating >= 4
              ? "https://www.witheyezon.com/eyezonsite/static/images/checkedstar.svg"
              : "https://www.witheyezon.com/eyezonsite/static/images/star.svg"
          }
          alt="logo"
          onClick={() => this.handleClick(4)}
        />
      </Wrapper>
    );
  }
}

export default RateCall;
