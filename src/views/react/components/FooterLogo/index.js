import React from "react";
import styled from "styled-components";
import Image from "./normal.png";
const Wrapper = styled.div`
  &&& {
    display: flex !important;
    width: 186px !important;
    height: 18px !important;
    background: greenyellow !important;
  }
`;

const Text = styled.div`
  &&& {
    display: flex !important;
    height: 16px !important;
    margin-right: 5px !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    line-height: 18px !important;
    color: #ffffff !important;
  }
`;

export class FooterLogo extends React.Component {
  render() {
    return (
      <Wrapper>
        <Text>Мы используем</Text>
        <img src={Image} alt="logo" />
      </Wrapper>
    );
  }
}

export default FooterLogo;
