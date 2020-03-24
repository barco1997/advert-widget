import React from "react";
import styled from "styled-components";
//import Image from "./tick.svg";
const Wrapper = styled.div`
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

const Text = styled.div`
  &&& {
    display: flex !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 15px !important;
    color: ${props => (props.selected ? "#333333" : "#ababab")} !important;
    text-shadow: ${props => (props.selected ? "none" : "none")} !important;
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

export class BlurredButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      selected: true
    });
    this.props.onClick();
  }
  render() {
    return (
      <Wrapper onClick={this.handleClick} width={this.props.width}>
        <Text selected={!this.state.selected} onClick={this.handleClick}>
          {this.props.children}
        </Text>
        {this.state.selected && (
          <img
            src="https://www.witheyezon.com/eyezonsite/static/images/tick.svg"
            alt="logo"
          />
        )}
      </Wrapper>
    );
  }
}

/*BlurredButton.defaultProps = {
  text: "Включить уведомления "
};*/

export default BlurredButton;
