import React from "react";
import styled from "styled-components";
import Image from "./alert-circle.svg";
const Wrapper = styled.div`
  &&& {
    display: flex !important;
    max-width: 476px !important;
    height: 16px !important;
    align-items: center !important;
  }
`;

const Text = styled.div`
  &&& {
    display: flex !important;
    height: 16px !important;
    margin-left: 5px !important;
    margin-top: 2px !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 10px !important;
    line-height: 160% !important;
    color: #ababab !important;
  }
`;

export class CriticalInfo extends React.Component {
  render() {
    return (
      <Wrapper>
        <img src={Image} alt="logo" />
        <Text>Пожалуйста, сформулируйте свой вопрос в одном сообщении!</Text>
      </Wrapper>
    );
  }
}

export default CriticalInfo;
