import React from "react";
import styled from "styled-components";

import { media } from "../../../../utils/media";

// import Image from "./photo.jpg";

const PhotoWrap = styled.div`
  &&& {
    position: relative !important;
    display: flex !important;
    z-index: 10003 !important;
    justify-content: center !important;

    ${media.desktop`
      max-width: 100% !important;
      justify-content: flex-start !important;
      height: auto !important;
  `};
    ${media.tablet`
      height: auto !important;
      max-width: 100% !important;
  `};
  }
`;

const ClosePhotoButton = styled.button`
  &&& {
    z-index: 10004 !important;
    position: fixed !important;
    top: 40px !important;
    right: 40px !important;

    width: 40px !important;
    height: 40px !important;
    padding: 0 !important;
    border-radius: 50% !important;
    border: none !important;

    background: #ffffff !important;
    &:after {
      position: absolute !important;
      top: 14px !important;
      left: 20px !important;
      content: " " !important;
      height: 13px !important;
      width: 2px !important;
      background-color: #000 !important;
      transform: rotate(-45deg);
    }
    &:before {
      position: absolute !important;
      top: 14px !important;
      left: 20px !important;
      content: " " !important;
      height: 13px !important;
      width: 2px !important;
      background-color: #000 !important;
      transform: rotate(45deg);
    }
  }
`;

const PhotoImg = styled.img`
  &&& {
    height: auto !important;
    width: 100% !important;
  }
`;

class Photo extends React.Component {
  render() {
    const { onClose } = this.props;
    return (
      <div>
        <ClosePhotoButton onClick={onClose} />
        <PhotoWrap>{/* <PhotoImg src={Image} alt="photo" /> */}</PhotoWrap>
      </div>
    );
  }
}

export default Photo;
