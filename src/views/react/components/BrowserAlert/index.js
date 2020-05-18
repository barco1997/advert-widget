import React from "react";
import styled from "styled-components";

import { media, mediaType } from "../../../../utils/media";

const JsChatOverlay = styled.div`
  &&& {
    z-index: 10002 !important;
    position: fixed !important;
    top: 0px !important;
    bottom: 0px !important;
    left: 0px !important;
    right: 0px !important;
    opacity: 0.4 !important;
    background-color: #000 !important;
  }
`;

const Wrap = styled.div`
  &&& {
    color: black !important;
    width: 100vw !important;
    height: 100vh !important;
    position: fixed !important;
    left: 0 !important;
    z-index: 10000 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    font-family: "Montserrat" !important;
  }
`;

const WindowWrapper = styled.div`
  &&& {
    z-index: 10003 !important;
    /*flex-direction: column !important;*/

    background: #ffffff !important;
    height: 170px !important;
    max-width: 85% !important;

    ${(props) =>
      props.windowHeight < props.height &&
      `
      position: absolute !important;
      max-width: 100% !important;
      justify-content: flex-start !important;
      height: auto !important;
  `}
  }
`;

const Description = styled.div`
  &&& {
    margin-top: 30px !important;
    font-weight: 600 !important;
    font-size: 15px !important;
    line-height: 160% !important;
    text-align: center !important;
  }
`;

const ChatWindowExpansion = styled.div`
  &&& {
    box-sizing: border-box !important;
    flex-direction: column !important;
    align-items: center !important;
    height: 170px !important;
    /**** Feature ****/
    display: flex !important;
    width: 496px !important;
    /**** End     ****/
    padding: 10px !important;
    ${media.tablet`
      width: 100%!important;
  `};
  }
`;

const CloseButton = styled.a`
  &&& {
    position: relative !important;
    left: 93% !important;
    top: 15px !important;
    width: 15px !important;
    height: 15px !important;
    opacity: 0.3 !important;
    cursor: pointer !important;
    &::before {
      position: absolute !important;
      left: 15px !important;
      content: " " !important;
      height: 15px !important;
      width: 2px !important;
      background-color: #333 !important;
      transform: rotate(45deg) !important;
    }
    &::after {
      position: absolute !important;
      left: 15px !important;
      content: " " !important;
      height: 15px !important;
      width: 2px !important;
      background-color: #333 !important;
      transform: rotate(-45deg) !important;
    }
    ${media.phone`
    left: 89% !important;
  `};
  }
`;

class BrowserAlert extends React.Component {
  render() {
    return (
      <Wrap>
        <JsChatOverlay
          onClick={() => {
            this.props.close();
          }}
        />
        <WindowWrapper height={634}>
          <CloseButton
            onClick={() => {
              this.props.close();
            }}
          />
          <ChatWindowExpansion>
            <Description>
              При использования Eyezon в данном браузере могут возникать
              проблемы с работоспособностью, советуем вам воспользоваться другим
              браузером
            </Description>
          </ChatWindowExpansion>
        </WindowWrapper>
      </Wrap>
    );
  }
}

export default BrowserAlert;
