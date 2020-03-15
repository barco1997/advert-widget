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
    margin-top: 3px !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 9px !important;
    line-height: 160% !important;
    color: #ababab !important;
  }
`;

export class EntryInfo extends React.Component {
  render() {
    return (
      <Wrapper>
        <img src={Image} alt="logo" />
        <Text>Опишите полностью ваш вопрос в одном сообщении</Text>
      </Wrapper>
    );
  }
}

export default EntryInfo;
