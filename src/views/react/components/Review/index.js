import React from "react";
import styled from "styled-components";

import Stars from "../Stars";
// import Image from "./error.svg";

const ReviewWrap = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    position: relative !important;
    z-index: 10005 !important;
    justify-content: center !important;

    font-family: "Montserrat" !important;
    font-style: normal !important;
    color: #000000 !important;

    padding: 32px !important;
  }
`;

const ReviewHeader = styled.h3`
  &&& {
    font-weight: 800 !important;
    font-size: 16px !important;
    line-height: 140% !important;

    margin-top: 5px !important;
    margin-bottom: 12px !important;
    padding: 0 !important;
  }
`;

const ReviewDescription = styled.p`
  &&& {
    width: 384px !important;

    font-weight: 500 !important;
    font-size: 14px !important;
    line-height: 170% !important;
    text-align: center !important;

    color: #888888 !important;

    margin: 0 !important;
    margin-bottom: 24px !important;
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
    color: #333333 !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;

    padding: 12px 18px !important;
    box-sizing: border-box;
    box-shadow: none !important;

    margin: 40px 0 0 0 !important;
  }
`;

class Review extends React.Component {
  render() {
    const { endWithoutReview } = this.props;
    return (
      <ReviewWrap>
        <ReviewHeader>Оцените работу сотрудника</ReviewHeader>
        <ReviewDescription>
          Пожалуйста, оцените работу сотрудника по пятибальной шкале.
        </ReviewDescription>

        <Stars />
        <EndButton onClick={endWithoutReview}>Завершить без оценки</EndButton>
      </ReviewWrap>
    );
  }
}

export default Review;
