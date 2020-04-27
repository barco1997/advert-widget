import React from "react";
import styled from "styled-components";

import { media } from "../../../../utils/media";

import OpaqueButton from "../OpaqueButton";

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

const Shader = styled.div`
  &&& {
    display: flex !important;
    flex-direction: column !important;
    background: rgba(255, 255, 255, 0.88) !important;
    justify-content: flex-end !important;
    align-items: flex-end !important;
    width: 100% !important;
    height: 100% !important;
    margin-bottom: 24px !important;
    padding-right: 24px !important;
  }
`;

const Title = styled.h4`
  &&& {
    display: flex !important;
    padding: 15px 15px 12px 12px !important;
    font-size: 14px !important;
    word-break: break-all !important;
    font-weight: normal !important;
    color: ${(props) => `${props.color} !important;`};
    background: ${(props) => `${hexToRGB(props.color, 0.1)} !important;`};
    margin: 0 !important;
    margin-top: 10px !important;
    width: auto !important;
    cursor: pointer !important;
    border-radius: ${(props) =>
      props.ifRecipient ? "5px 5px 0px 5px" : "5px 5px 5px 0px"} !important;
    &:hover {
      background: ${(props) => `${props.color} !important;`};
      color: white !important;
    }
    ${media.desktop`
    
    
    /*background: none !important;
    color: inherit !important;
    margin-left: 0 !important;
      margin-right: 0 !important;
      padding: 0px !important;
      font-weight: bold !important;*/
    
    
      
      font-size: 12px !important;
  `};
  }
`;

const messageList = [
  "Хочу увидеть вживую",
  "У меня есть вопросы по данному товару",
  "Хочу сравнить с другой моделью",
];

class MessagesTemplate extends React.Component {
  render() {
    return (
      <Shader>
        {messageList.map((message, index) => (
          <Title
            key={index}
            color={this.props.color}
            onClick={() => this.props.submitValue(message)}
          >
            {message}
          </Title>
        ))}
      </Shader>
    );
  }
}

export default MessagesTemplate;
