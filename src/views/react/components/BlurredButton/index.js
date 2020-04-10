import React from "react";
import styled from "styled-components";
//import Image from "./tick.svg";
const Wrapper = styled.div`
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
    color: ${(props) => (props.selected ? "#333333" : "#ababab")} !important;
    text-shadow: ${(props) => (props.selected ? "none" : "none")} !important;
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

const Span = styled.span`
  &&& {
    position: relative !important;
    width: 15px !important;
    height: 15px !important;
    opacity: 0.7 !important;
    cursor: pointer !important;

    &:after {
      position: absolute !important;
      top: 0px !important;
      left: 5px !important;
      content: " " !important;
      height: 17px !important;
      width: 2px !important;
      background-color: #ff204a !important;
      transform: rotate(-45deg) !important;
    }
    &:before {
      position: absolute !important;
      top: 0px !important;
      left: 5px !important;
      content: " " !important;
      height: 17px !important;
      width: 2px !important;
      background-color: #ff204a !important;
      transform: rotate(45deg) !important;
    }
  }
`;

export class BlurredButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.setState({
      selected: this.props.selected,
    });
  }
  handleClick() {
    this.setState({
      selected: true,
    });
    this.props.onClick();
  }
  render() {
    return (
      <Wrapper
        onClick={this.state.selected ? this.handleClick : null}
        width={this.props.width}
      >
        <Text selected={!this.state.selected} onClick={this.handleClick}>
          {this.props.children}
        </Text>
        {this.state.selected &&
          (this.props.isDenied ? (
            <Span />
          ) : (
            <img
              src="https://www.witheyezon.com/eyezonsite/static/images/tick.svg"
              alt="logo"
            />
          ))}
      </Wrapper>
    );
  }
}

/*BlurredButton.defaultProps = {
  text: "Включить уведомления "
};*/

export default BlurredButton;
