import React from "react";
import styled from "styled-components";

import Image from "./error.svg";

const ErrorWrap = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;

    font-family: "Montserrat" !important;
    font-style: normal !important;
    color: #ffffff !important;
  }
`;

const ButtonsWrap = styled.div`
  &&& {
    display: flex !important;
    justify-content: space-between !important;

    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
`;

const ErrorHeader = styled.h3`
  &&& {
    font-weight: 800 !important;
    font-size: 24px !important;
    line-height: 140% !important;
  }
`;

const ErrorDescription = styled.p`
  &&& {
    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 170% !important;
  }
`;

const RefreshButton = styled.button`
  &&& {
    border-radius: 5px !important;
    border: none !important;
    &:focus {
      outline: none !important;
    }

    background: #ff2d55 !important;

    padding: 12px 34px !important;
    box-sizing: border-box;
  }
`;

const EndButton = styled.button`
  &&& {
    border-radius: 5px !important;
    border: 1px solid #bebebe !important;
    &:focus {
      outline: none !important;
    }
    background: transparent !important;

    padding: 12px 34px !important;
    box-sizing: border-box;
  }
`;

export class ConnectionsError extends React.Component {
  render() {
    const { renewStream, endStream } = this.props;
    return (
      <ErrorWrap>
        <ButtonsWrap>
          <img src={Image} alt="error" />
          <ErrorHeader>Соединение прервано</ErrorHeader>
          <ErrorDescription>
            Проверьте подключение к сети и попробуйте возобновить трансляцию
          </ErrorDescription>
          <RefreshButton onClick={renewStream}>Возобновить</RefreshButton>
          <EndButton onClick={endStream}>Завершить</EndButton>
        </ButtonsWrap>
      </ErrorWrap>
    );
  }
}

export default ConnectionsError;
