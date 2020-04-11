import React from "react";
import styled from "styled-components";
import { media } from "../../../../utils/media";
import NotifyButtonAndEmail from "../NotifyButtonAndEmail";

const TextWrap = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;

    width: 100% !important;
    height: 100% !important;

    align-items: center !important;
    position: relative !important;
    ${media.tablet`
     
  `};
  }
`;

const MainBlock = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    width: 100% !important;

    ${media.tablet`
    margin-top: 0px !important;
  `};
  }
`;

const InfoBlock = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    background: ${(props) =>
      `linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.12) 100%), ${props.color} !important`};
    height: 370px !important;
    width: 100% !important;
    ${media.phone`
      height: 250px !important;
    `};
  }
`;

const InfoBlockHeader = styled.div`
  &&& {
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 24px !important;
    line-height: 140% !important;
    /* identical to box height, or 34px */

    display: flex !important;
    align-items: flex-end !important;
    letter-spacing: 0.02em !important;

    /* Primary / white - background */
    margin: 0px 24px !important;
    color: #ffffff !important;
  }
`;

const ButtonWrapper = styled.div`
  &&& {
    display: flex !important;
    width: 100% !important;
    margin-top: 16px !important;
    padding-left: 25px !important;
  }
`;

const InfoBlockText = styled.div`
  &&& {
    font-family: "Montserrat" !important;

    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    line-height: 170% !important;
    max-width: 380px !important;
    /* or 24px */

    /* Primary / white - background */

    color: #ffffff !important;
    margin: 16px 24px !important;
  }
`;

export class NoStreamerComponent extends React.Component {
  render() {
    return (
      <TextWrap>
        <MainBlock>
          <InfoBlock color={this.props.color || "#ff2d55"}>
            <InfoBlockHeader>
              {this.props.receivedDetails
                ? "Мы сообщим, как появятся сотрудники!"
                : "Нет доступных продавцов"}
            </InfoBlockHeader>
            <InfoBlockText>
              {this.props.receivedDetails
                ? "Мы сразу уведомим вас об ответе выбранным вами способом. А пока вы можете продолжить пользоваться сайтом."
                : "Вы можете оставить свой запрос, включите уведомления, оставьте свой e-mail и как появятся стримеры мы ответим вам."}
            </InfoBlockText>
          </InfoBlock>
          {!this.props.receivedDetails && (
            <ButtonWrapper>
              <NotifyButtonAndEmail
                sendEmailDetails={this.props.sendEmailDetails}
                notificationPermission={this.props.notificationPermission}
                emailSentFlag={this.props.emailSentFlag}
              />
            </ButtonWrapper>
          )}
        </MainBlock>
      </TextWrap>
    );
  }
}

NoStreamerComponent.defaultProps = {
  receivedDetails: false,
};

export default NoStreamerComponent;
