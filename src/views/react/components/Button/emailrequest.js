import React from "react";
import styled from "styled-components";
import FormField from "../FormField";
import BasicButton from "../BasicButton";
import WhiteButton from "../WhiteButton";

const TextWrap = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    max-width: 462px !important;
    width: 100% !important;
  }
`;

const Heading = styled.div`
  &&& {
    display: flex !important;
    font-size: 14px !important;
    line-height: 140% !important;
    font-family: "Mont" !important;
    color: ${props => props.color || "#000000"} !important;
    margin-top: ${props => props.marginTop || "36px"}!important;
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
  }
`;

export class EmailRequest extends React.Component {
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
      <TextWrap>
        <Heading marginTop="70px">Не пропустите ответ!</Heading>
        <Heading color="#979797">
          Включитель уведомления или оставьте почту. Как только сотрудник
          ответит, вы получите ссылку на диалог.
        </Heading>
        <Text marginTop="36px">Ваш email:</Text>
        <PositionWrapper marginTop="8px">
          <FormField
            placeholder="Email"
            maxWidth="462px"
            noOutline="true"
            value={this.state.email}
            onChange={event => this.handleChange("email", event.target.value)}
          />
        </PositionWrapper>
        <Text>Ваше имя:</Text>
        <PositionWrapper marginTop="8px">
          <FormField
            placeholder="Имя"
            maxWidth="462px"
            noOutline="true"
            value={this.state.name}
            onChange={event => this.handleChange("name", event.target.value)}
          />
        </PositionWrapper>
        <PositionWrapper marginTop="40px">
          <BasicButton
            onClick={() =>
              this.props.sendEmailDetails(this.state.email, this.state.name)
            }
          >
            Отправить
          </BasicButton>
        </PositionWrapper>
        <PositionWrapper marginTop="15px">
          <WhiteButton onClick={() => this.props.destroy()}>
            Нет, спасибо
          </WhiteButton>
        </PositionWrapper>
      </TextWrap>
    );
  }
}

export default EmailRequest;
