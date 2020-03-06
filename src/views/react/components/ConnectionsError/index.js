import React from "react";
import styled from "styled-components";

const ErrorWrap = styled.div``;

const ButtonsWrap = styled.div``;

const ErrorHeader = styled.h3``;

const ErrorImg = styled.img``;

const ErrorDescription = styled.p``;

const RefreshButton = styled.button``;

const EndButton = styled.button``;

export class ConnectionsError extends React.Component {
  render() {
    const { renewStream, endStream } = this.props;
    return (
      <ErrorWrap>
        <ButtonsWrap>
          <ErrorImg />
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
