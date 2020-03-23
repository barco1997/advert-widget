import React from "react";
import styled from "styled-components";
//import Image from "./tick.svg";
const Wrapper = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
  }
`;
const NotifyButtonWrapper = styled.div`
  &&& {
    display: flex !important;
    width: ${props => (props.width ? props.width : "327px")} !important;
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

const TextWrapper = styled.div`
  &&& {
    display: flex !important;
    width: 327px !important;
    padding: 16px !important;
    box-sizing: border-box !important;
    background: #f2f2f2 !important;
    border-radius: 5px 5px 5px 0px !important;

    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 160% !important;
    color: #000 !important;
  }
`;

const MiddleWrapper = styled.div`
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
    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 160% !important;
    color: #cacaca !important;
  }
`;

const Button = styled.div`
  &&& {
    display: flex !important;
    width: 48px !important;
    box-sizing: border-box !important;
    height: 40px !important;
    background: #ff2d55 !important;
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

const Text = styled.div`
  &&& {
    display: flex !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;
    color: ${props => (props.isActive ? "#333333" : "#ababab")} !important;
    text-shadow: ${props => (props.isActive ? "none" : "none")} !important;
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

export class NotifyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {}
  render() {
    return (
      <Wrapper>
        <TextWrapper>{this.props.text}</TextWrapper>
        <MiddleWrapper>
          <Email type="text" placeholder="Адрес электронной почты" />
          <Button onClick={this.props.onClick}>OK</Button>
        </MiddleWrapper>
        <NotifyButtonWrapper
          onClick={this.handleClick}
          width={this.props.width}
        >
          <Text isActive={!this.props.isActive} onClick={this.handleClick}>
            {this.props.isActive
              ? this.props.activeText
              : this.props.inactiveText}
          </Text>
          {this.props.isActive && (
            <img
              src="https://www.witheyezon.com/eyezonsite/static/images/tick.svg"
              alt="logo"
            />
          )}
        </NotifyButtonWrapper>
      </Wrapper>
    );
  }
}

NotifyButton.defaultProps = {
  inactiveText: "Включить уведомления ",
  activeText: "Уведомления включены ",
  text:
    "ваплавшуов ваофукшь валофа валфук вофуко валфкош аьв ваовсм ушсьтс у слау в9суа вамзвлс алвазцы у0цаь хвалы всо ушсьтс у слау в9суа вамзвлс алвазцы у0цаь хвалы всо"
};

export default NotifyButton;
