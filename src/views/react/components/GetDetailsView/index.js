import React from "react";
import styled from "styled-components";
import FormField from "../FormField";
import BasicButton from "../BasicButton";
import WhiteButton from "../WhiteButton";
import { media } from "../../../../utils/media";
import BlurredButton from "../BlurredButton";
import MessagesTemplate from "../MessagesTemplate";

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

const PositionWrapper = styled.div`
  &&& {
    display: flex !important;
    margin-bottom: 8px !important;
    width: 100% !important;

    ${media.desktop`
      margin-bottom: 16px !important;
    `};
  }
`;
const FieldWrapper = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;

    width: 100% !important;
    margin: 0px 0px 8px 18px !important;
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
      `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.12) 100%), ${props.color} !important`};
    height: 330px !important;
    width: 100% !important;
    ${media.phone`
      height: ${(props) =>
        props.isTall ? "330px !important" : "300px !important"};
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

export class GetDetailsView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isName: this.props.requestedData.includes("NAME"),
      isEmail: this.props.requestedData.includes("EMAIL"),
      isPhone: this.props.requestedData.includes("PHONE"),
    };
  }

  render() {
    return (
      <TextWrap>
        <MainBlock>
          <InfoBlock
            isTall={
              this.state.isEmail || this.state.isPhone || this.state.isName
            }
            color={this.props.color || "#ff2d55"}
          >
            <InfoBlockHeader>{this.props.greetingTitle}</InfoBlockHeader>
            <InfoBlockText>{this.props.greetingText}</InfoBlockText>
            <FieldWrapper>
              {this.state.isEmail && (
                <PositionWrapper>
                  <FormField
                    placeholder="Адрес электронной почты"
                    value={this.props.email}
                    onChange={(event) =>
                      this.props.handleChange(
                        "emailRequested",
                        event.target.value
                      )
                    }
                  />
                </PositionWrapper>
              )}
              {this.state.isPhone && (
                <PositionWrapper>
                  <FormField
                    placeholder="Номер телефона"
                    value={this.props.phone}
                    onChange={(event) =>
                      this.props.handleChange(
                        "phoneRequested",
                        event.target.value
                      )
                    }
                  />
                </PositionWrapper>
              )}
              {this.state.isName && (
                <PositionWrapper>
                  <FormField
                    placeholder="имя"
                    value={this.props.name}
                    onChange={(event) =>
                      this.props.handleChange(
                        "nameRequested",
                        event.target.value
                      )
                    }
                  />
                </PositionWrapper>
              )}
            </FieldWrapper>
          </InfoBlock>
        </MainBlock>
        <MessagesTemplate color={this.props.color || "#ff2d55"} />
      </TextWrap>
    );
  }
}

GetDetailsView.defaultProps = {
  requestedData: "EMAIL&NAME",
};

export default GetDetailsView;
