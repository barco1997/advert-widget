import React from "react";
import styled from "styled-components";

const Wrapper = styled.input`
  &&& {
    max-width: ${props =>
      props.maxWidth ? props.maxWidth : "380px"} !important;
    height: ${props => (props.height ? props.height : "40px")} !important;
    width: 100% !important;
    font-family: "Montserrat" !important;
    font-size: 14px !important;
    line-height: 24px !important;
    color: #000000 !important;
    padding-left: 12px !important;
    background: #ffffff !important;
    border: ${props =>
      props.noOutline ? "0px" : "1px solid #E5E5E5"} !important;

    box-sizing: border-box !important;
    border-radius: ${props =>
      props.borderRadius ? props.borderRadius : "5px"} !important;
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
    width: calc(100% - 48px) !important;
  }
`;
const Helper = styled.div`
  &&& {
    display: flex !important;
    position: absolute !important;
    bottom: -14.45px !important;
    left: 23px !important;

    font-family: "Montserrat" !important;
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
