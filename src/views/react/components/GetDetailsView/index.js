import React from "react";
import styled from "styled-components";
import FormField from "../FormField";
import BasicButton from "../BasicButton";
import WhiteButton from "../WhiteButton";
import { media } from "../../../../utils/media";
import BlurredButton from "../BlurredButton";

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

const PositionWrapper = styled.div`
  &&& {
    display: flex !important;
    margin-bottom: ${props => props.marginBottom || "0px"} !important;
    width: 100% !important;
  }
`;
const FieldWrapper = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;

    width: 100% !important;
    margin: 16px 0px 10px 18px !important;
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
    background: ${props => `${props.color} !important`};
    height: 370px !important;
    width: 100% !important;
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

export class GetDetailsView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      email: "",
      phone: "",
      isName:
        this.props.requestedData === "NAME" ||
        this.props.requestedData === "EMAIL&NAME"
          ? true
          : false,
      isEmail:
        this.props.requestedData === "EMAIL" ||
        this.props.requestedData === "EMAIL&NAME"
          ? true
          : false,
      isPhone: this.props.requestedData === "PHONE" ? true : false
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
        <MainBlock>
          <InfoBlock color={this.props.color || "#ff2d55"}>
            <InfoBlockHeader>Не стесняйтесь, спросите!</InfoBlockHeader>
            <InfoBlockText>
              Наши сотрудники с радостью покажут и расскажут всё, что вам
              интересно.
            </InfoBlockText>
            <FieldWrapper>
              {this.state.isEmail && (
                <PositionWrapper marginBottom="6px">
                  <FormField
                    placeholder="Адрес электронной почты"
                    value={this.state.email}
                    onChange={event =>
                      this.handleChange("email", event.target.value)
                    }
                  />
                </PositionWrapper>
              )}
              {this.state.isPhone && (
                <PositionWrapper marginBottom="6px">
                  <FormField
                    placeholder="Номер телефона"
                    value={this.state.phone}
                    onChange={event =>
                      this.handleChange("phone", event.target.value)
                    }
                  />
                </PositionWrapper>
              )}
              {this.state.isName && (
                <PositionWrapper marginBottom="6px">
                  <FormField
                    placeholder="имя"
                    value={this.state.name}
                    onChange={event =>
                      this.handleChange("name", event.target.value)
                    }
                  />
                </PositionWrapper>
              )}
            </FieldWrapper>
          </InfoBlock>
        </MainBlock>
      </TextWrap>
    );
  }
}

GetDetailsView.defaultProps = {
  requestedData: "NAME"
};

export default GetDetailsView;
