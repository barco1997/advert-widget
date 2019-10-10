import React from "react";
import styled from "styled-components";

const Wrapper = styled.input`
  &&& {
    max-width: ${props =>
      props.maxWidth ? props.maxWidth : "220px"} !important;
    height: ${props => (props.height ? props.height : "36.55px")} !important;
    width: 100vw !important;
    font-family: "Mont" !important;
    font-size: 12px !important;
    line-height: 15px !important;
    color: #000000 !important;
    padding-left: 23.08px !important;
    background: #f5f5f5 !important;
    border: ${props =>
      props.noOutline ? "0px" : "0.5px solid #e5e5e5"} !important;

    box-sizing: border-box !important;
    border-radius: ${props =>
      props.borderRadius ? props.borderRadius : "4px"} !important;
    margin-bottom: ${props => (props.extraMargin ? "4px" : "0px")} !important;
    &::-webkit-input-placeholder {
      color: rgba(0, 0, 0, 0.2) !important;
    }

    &:focus {
      outline: 0 !important;
    }
  }
`;
const ExtraWrapper = styled.div`
  &&& {
    display: flex !important;
    position: relative !important;
  }
`;
const Helper = styled.div`
  &&& {
    display: flex !important;
    position: absolute !important;
    bottom: -14.45px !important;
    left: 23px !important;

    font-family: "Mont" !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 9px !important;
    line-height: 12px !important;

    color: rgba(0, 0, 0, 0.2) !important;
    height: 11px !important;
  }
`;
export class FormField extends React.Component {
  render() {
    return (
      <ExtraWrapper>
        <Wrapper
          type={this.props.password ? "password" : "field"}
          maxWidth={this.props.maxWidth}
          placeholder={this.props.placeholder}
          height={this.props.height}
          noOutline={this.props.noOutline}
          borderRadius={this.props.borderRadius}
          value={this.props.value}
          onChange={this.props.onChange}
          extraMargin={this.props.helperText || this.props.extraMargin}
        />
        {this.props.helperText && <Helper>{this.props.helperText}</Helper>}
      </ExtraWrapper>
    );
  }
}

export default FormField;
