import React from "react";
import styled from "styled-components";
import FormField from "../FormField";
import BasicButton from "../BasicButton";
import WhiteButton from "../WhiteButton";
import { media } from "../../../../utils/media";

const TextWrap = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    max-width: 462px !important;
    width: 100% !important;
    height: 100% !important;
    justify-content: center !important;
    align-items: center !important;
    position: relative !important;
    ${media.tablet`
      max-width: calc(100% - 30px) !important;
  `};
  }
`;

const Heading = styled.div`
  &&& {
    display: flex !important;
    font-size: 14px !important;
    line-height: 140% !important;
    font-family: "Montserrat" !important;
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
    font-family: "Montserrat" !important;
    color: #979797 !important;
    margin-top: ${props => props.marginTop || "24px"}!important;
  }
`;

const PositionWrapper = styled.div`
  &&& {
    display: flex !important;
    margin-top: ${props => props.marginTop || "0px"}!important;
    width: 100% !important;
  }
`;
const ButtonBlock = styled.div`
  &&& {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    width: 100% !important;
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
    margin-top: 20px !important;
    ${media.tablet`
    margin-top: 0px !important;
  `};
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
        {this.props.children}
        <MainBlock>
          <Heading marginTop="60px">Не пропустите ответ!</Heading>
          <Heading color="#979797">
            Включите уведомления или оставьте почту. Как только сотрудник
            ответит, вы получите ссылку на диалог.
          </Heading>
          <Text marginTop="36px">Ваш email:</Text>
          <PositionWrapper marginTop="8px">
            <FormField
              placeholder="Email"
              maxWidth="100%"
              noOutline="true"
              value={this.state.email}
              onChange={event => this.handleChange("email", event.target.value)}
            />
          </PositionWrapper>
          <Text>Ваше имя:</Text>
          <PositionWrapper marginTop="8px">
            <FormField
              placeholder="Имя"
              maxWidth="100%"
              noOutline="true"
              value={this.state.name}
              onChange={event => this.handleChange("name", event.target.value)}
            />
          </PositionWrapper>
        </MainBlock>
        <ButtonBlock>
          <PositionWrapper marginTop="0px">
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
        </ButtonBlock>
      </TextWrap>
    );
  }
}

export default EmailRequest;
