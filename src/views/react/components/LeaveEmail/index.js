import React from "react";
import styled from "styled-components";
import FormField from "../FormField";
import BasicButton from "../BasicButton";
import WhiteButton from "../WhiteButton";
import { media } from "../../../../utils/media";
import BlurredButton from "../BlurredButton";
import { staticUrl } from "../../constants";

const TextWrap = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;

    width: 100% !important;
    height: 100% !important;
    justify-content: center !important;
    align-items: center !important;
    position: relative !important;
    ${media.tablet`
     
  `};
  }
`;

const ButtonBlock = styled.div`
  &&& {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;

    width: 100% !important;
    padding-left: 25px !important;
    margin-bottom: 60px !important;
    ${media.tablet`
    margin-bottom: 30px !important;
  `};
  }
`;

const MainBlock = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    width: 100% !important;
    margin-bottom: 10px !important;

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
    height: 320px !important;
    width: 100% !important;
  }
`;

const EmailWrapper = styled.div`
  &&& {
    display: flex !important;
    margin: 8px 0px !important;
    width: 327px !important;
    height: 40px !important;
    justify-content: space-between !important;
  }
`;

const Email = styled.input`
  &&& {
    display: flex !important;
    width: 269px !important;
    height: 40px !important;
    padding: 8px 0 8px 12px !important;
    box-sizing: border-box !important;
    border: 1px solid #e5e5e5 !important;
    border-radius: 5px !important;
    background: #ffffff !important;

    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    line-height: 160% !important;
    color: #000000 !important;
  }
`;

const Button = styled.div`
  &&& {
    display: flex !important;
    width: 48px !important;
    box-sizing: border-box !important;
    height: 40px !important;
    background: ${(props) => `${props.color} !important`};
    border-radius: 5px !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;

    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;
    color: #ffffff !important;
  }
`;

const NotifyButtonWrapper = styled.div`
  &&& {
    display: flex !important;
    width: ${(props) => (props.width ? props.width : "327px")} !important;
    height: 40px !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
    border: 1px solid #bebebe !important;
    box-sizing: border-box !important;
    border-radius: 5px !important;
    cursor: pointer !important;
  }
`;

const Text = styled.div`
  &&& {
    display: flex !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;
    color: ${(props) => (props.black ? "#333333" : "#ababab")} !important;
    text-shadow: ${(props) => (props.black ? "none" : "none")} !important;
    margin-right: 10px !important;
    cursor: pointer !important;

    -webkit-touch-callout: none !important; /* iOS Safari */
    -webkit-user-select: none !important; /* Safari */
    -khtml-user-select: none !important; /* Konqueror HTML */
    -moz-user-select: none !important; /* Old versions of Firefox */
    -ms-user-select: none !important; /* Internet Explorer/Edge */
    user-select: none !important;
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

const InfoBlockText = styled.div`
  &&& {
    font-family: "Montserrat" !important;

    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    line-height: 170% !important;
    /* or 24px */

    /* Primary / white - background */

    color: #ffffff !important;
    margin: 16px 24px !important;
  }
`;

export class LeaveEmail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tosend: 0,
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e, field) {
    this.setState({
      [field]: e.currentTarget.value,
    });
  }
  handleClick() {
    const { value } = this.state;
    const re = /\S+@\S+\.\S+/;
    if (re.test(value) && this.state.tosend === 1) {
      this.props.sendEmailDetails(value, "Клиент", false);
      this.setState({
        tosend: this.state.tosend + 1,
      });
    } else if (this.state.tosend !== 1) {
      this.setState({
        tosend: this.state.tosend + 1,
      });
    }
  }
  render() {
    return (
      <TextWrap>
        <MainBlock>
          <InfoBlock color={this.props.color || "#ff2d55"}>
            <InfoBlockHeader>Не пропустите ответ</InfoBlockHeader>
            <InfoBlockText>
              Чтобы узнать, что вам ответили, включите уведомления или оставьте
              свой e-mail. Это нужно только для того, чтобы мы отправили вам
              ссылку на стрим. Никаких дополнительных сообщений и писем вам
              приходить не будет.
            </InfoBlockText>
          </InfoBlock>
        </MainBlock>
        <ButtonBlock>
          <EmailWrapper>
            {this.state.tosend === 0 && (
              <NotifyButtonWrapper onClick={this.handleClick}>
                <Text black={true}>Получить ссылку на Email</Text>
              </NotifyButtonWrapper>
            )}
            {this.state.tosend === 1 && (
              <Email
                type="email"
                placeholder="Адрес электронной почты"
                value={this.state.value}
                onChange={(e) => this.handleChange(e, "value")}
              />
            )}
            {this.state.tosend === 1 && (
              <Button color={this.props.color} onClick={this.handleClick}>
                OK
              </Button>
            )}

            {this.state.tosend === 2 && (
              <NotifyButtonWrapper>
                <Text>Уведомление на Email</Text>
                <img src={`${staticUrl}/static/images/tick.svg`} alt="logo" />
              </NotifyButtonWrapper>
            )}
          </EmailWrapper>
          {"Notification" in window && (
            <BlurredButton
              onClick={this.props.notificationPermission}
              selected={Notification.permission === "granted"}
            >
              Включить уведомления
            </BlurredButton>
          )}
        </ButtonBlock>
      </TextWrap>
    );
  }
}

export default LeaveEmail;
