import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  &&& {
    border-radius: 5px !important;
    text-decoration: none !important;
    border: 1px solid #bebebe !important;
    &:focus {
      outline: none !important;
    }
    background: transparent !important;
    color: #000000 !important;

    padding: 12px 40px !important;
    box-sizing: border-box;
    box-shadow: none !important;

    margin: 0 !important;
  }
`;

function OpaqueButton(props) {
  return (
    <Wrapper onClick={props.onClick}>{props.children}</Wrapper>
    //<h1>I am here</h1>
  );
}

export default OpaqueButton;
