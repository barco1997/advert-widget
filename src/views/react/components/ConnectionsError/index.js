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
    width: 288px !important;

    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
`;

const ErrorHeader = styled.h3`
  &&& {
    font-weight: 800 !important;
    font-size: 24px !important;
    line-height: 28px !important;

    margin-top: 5px !important;
    margin-bottom: 12px !important;
    padding: 0 !important;
  }
`;

const ErrorDescription = styled.p`
  &&& {
    width: 289px !important;

    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 28px !important;
    text-align: center !important;

    margin: 0 !important;
    margin-bottom: 22px !important;
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
    color: #ffffff !important;

    padding: 12px 30px !important;
    box-sizing: border-box;
    box-shadow: none !important;

    margin: 0 !important;
  }
`;

const EndButton = styled.button`
  &&& {
    border-radius: 5px !important;
    border: 1px solid #ffffff !important;
    &:focus {
      outline: none !important;
    }
    background: transparent !important;
    color: #ffffff !important;

    padding: 12px 34px !important;
    box-sizing: border-box;
    box-shadow: none !important;

    margin: 0 !important;
  }
`;

class ConnectionsError extends React.Component {
  render() {
    const { renewStream, endStream } = this.props;
    return (
      <ErrorWrap>
        <img src={Image} alt="error" />
        <ErrorHeader>Соединение прервано</ErrorHeader>
        <ErrorDescription>
          Проверьте подключение к сети и попробуйте возобновить трансляцию
        </ErrorDescription>
        <ButtonsWrap>
          <RefreshButton onClick={renewStream}>Возобновить</RefreshButton>
          <EndButton onClick={endStream}>Завершить</EndButton>
        </ButtonsWrap>
      </ErrorWrap>
    );
  }
}

export default ConnectionsError;
