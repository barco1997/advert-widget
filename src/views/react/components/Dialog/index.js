import React from "react";
import styled from "styled-components";

import { media } from "../../../../utils/media";

import Stars from "../Stars";
// import Image from "./error.svg";

const DialogWrap = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;

    position: relative !important;
    z-index: 10005 !important;
    justify-content: flex-end !important;

    font-family: "Montserrat" !important;
    font-style: normal !important;
    color: #000000 !important;

    padding: 16px 20px !important;
  }
`;

const DialogHeader = styled.h3`
  &&& {
    font-weight: bold !important;
    font-size: 14px !important;
    line-height: 160% !important;

    margin-bottom: 8px !important;
    padding: 0 !important;
  }
`;

const DialogDescription = styled.p`
  &&& {
    font-weight: 500 !important;
    font-size: 10px !important;
    line-height: 160% !important;

    color: #888888 !important;

    margin: 0 !important;
    margin-bottom: 4px !important;
  }
`;
const RowWrap = styled.div`
  &&& {
    display: flex !important;
  }
`;

const DialogDate = styled.span`
  &&& {
    color: #ababab !important;
    font-weight: 500 !important;
    font-size: 10px !important;
    line-height: 160% !important;
    margin-left: 8px !important;
  }
`;

class Dialog extends React.Component {
  render() {
    const { description, title, date } = this.props;
    return (
      <DialogWrap>
        <DialogDescription>
          Круглый пуф на металлических ножках
        </DialogDescription>
        <DialogHeader>Покажите плес фокус с кроликом</DialogHeader>
        <RowWrap>
          <Stars isLittle={true} />
          <DialogDate>14.01.2019</DialogDate>
        </RowWrap>
      </DialogWrap>
    );
  }
}

export default Dialog;
