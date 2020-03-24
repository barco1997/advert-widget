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
    margin: ${props => props.margin || "0px"} !important;
    width: 100% !important;
  }
`;
const ButtonBlock = styled.div`
  &&& {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;

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

export class NoStreamersFirst extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      email: e.target.value
    });
  }
  render() {
    return (
      <TextWrap>
        <MainBlock>
          <InfoBlock color={this.props.color || "#ff2d55"}>
            <InfoBlockHeader>Нет доступных продавцов</InfoBlockHeader>
            <InfoBlockText>
              Вы можете оставить свой запрос, включите уведомления, оставьте
              свой e-mail и как появятся стримеры мы ответим вам.
            </InfoBlockText>
            <PositionWrapper margin="8px 0px 10px 24px">
              <FormField
                placeholder="Адрес электронной почты"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </PositionWrapper>
          </InfoBlock>
        </MainBlock>
      </TextWrap>
    );
  }
}

export default NoStreamersFirst;
