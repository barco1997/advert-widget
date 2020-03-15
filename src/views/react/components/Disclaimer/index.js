import React from "react";
import styled from "styled-components";
//import Logo from "./logoeye.png";
const Wrapper = styled.a`
  &&& {
    display: flex !important;
    text-decoration: none !important;
    height: 18px !important;
    align-items: center !important;
    cursor: pointer !important;
  }
`;

const Text = styled.div`
  &&& {
    display: flex !important;
    height: 16px !important;
    margin-right: 8px !important;
    margin-bottom: 1px !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    line-height: 18px !important;
    color: #ffffff !important;
  }
`;
const Image = styled.img`
  &&& {
    width: 75px !important;
    object-fit: contain !important;
  }
`;
export class Disclaimer extends React.Component {
  render() {
    return (
      <Wrapper
        href="https://button.witheyezon.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text>Мы используем</Text>
        <Image
          src="https://www.witheyezon.com/eyezonsite/static/images/logoeye.png"
          alt="logo"
        />
      </Wrapper>
    );
  }
}

export default Disclaimer;
