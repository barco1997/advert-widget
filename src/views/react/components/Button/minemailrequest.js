import React from "react";
import styled from "styled-components";
import Delete from "./close.svg";
import FormField from "../FormField";
import BasicButton from "../BasicButton";

const ChatWrap = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    width: 320px !important;
    height: 420px !important;
    background: #ffffff !important;
    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25) !important;
    border-radius: 10px 10px 0px 10px !important;
    box-sizing: border-box !important;
    padding: 16px 36px 24px 36px !important;
    position: absolute !important;
    bottom: 110px !important;
    right: 65px !important;
  }
`;

const Heading = styled.div`
  &&& {
    display: flex !important;
    font-size: 14px !important;
    line-height: 140% !important;
    font-family: "Montserrat" !important;
    color: ${props => props.color || "#000000"} !important;
    margin-top: ${props => props.marginTop || "24px"}!important;
    justify-content: center !important;
    text-align: center !important;
  }
`;

const Text = styled.div`
  &&& {
    display: flex !important;
    font-size: 14px !important;
    line-height: 140% !important;
    font-family: "Mont" !important;
    color: #979797 !important;
    margin-top: ${props => props.marginTop || "24px"}!important;
  }
`;

const PositionWrapper = styled.div`
  &&& {
    display: flex !important;
    margin-top: ${props => props.marginTop || "0px"}!important;
    margin-bottom: ${props => props.marginBottom || "0px"}!important;
    justify-content: ${props => props.justifyContent || "flex-start"}!important;
  }
`;

const Close = styled.img`
  &&& {
    display: flex !important;
    align-self: flex-end !important;
    cursor: pointer !important;
    margin-right: -10px !important;
    alt: "close";
  }
`;

export class MinEmailRequest extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(field, value) {
    this.setState({
      [field]: value
    });
  }
  render() {
    return (
      <ChatWrap>
        <Close src={Delete} onClick={this.props.closeRequest} />
        <Heading marginTop="6px">Не пропустите ответ!</Heading>
        <Heading color="#979797">
          Включите уведомления или оставьте почту. Как только сотрудник ответит,
          вы получите ссылку на диалог.
        </Heading>
        <Text>Ваш email:</Text>
        <PositionWrapper marginTop="8px">
          <FormField
            placeholder="Email"
            maxWidth="248px"
            noOutline="true"
            value={this.state.email}
            onChange={event => this.handleChange("email", event.target.value)}
          />
        </PositionWrapper>

        <Text>Ваше имя:</Text>
        <PositionWrapper marginTop="8px">
          <FormField
            placeholder="Имя"
            maxWidth="248px"
            noOutline="true"
            value={this.state.name}
            onChange={event => this.handleChange("name", event.target.value)}
          />
        </PositionWrapper>
        <PositionWrapper
          marginTop="23px"
          marginBottom="10px"
          justifyContent="center"
        >
          <BasicButton
            onClick={() =>
              this.props.sendEmailDetails(this.state.email, this.state.name)
            }
          >
            Отправить
          </BasicButton>
        </PositionWrapper>
      </ChatWrap>
    );
  }
}

export default MinEmailRequest;
