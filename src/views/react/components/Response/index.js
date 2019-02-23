import styled from "styled-components";
import React from "react";
import { format } from "date-fns";
import logo from "./logo.png";
import LiveButton from "../LiveButton/index";
import ReactAudioPlayer from "react-audio-player";
const Response = ({
  title,
  description,
  date,
  icon,
  flv,
  functionA,
  src,
  type,
  handlePhoto,
  handleVideo
}) => {
  const Item = styled.li`
    display: flex;
    width: 100%;
    margin: 5px 0;
    padding: 10px 0px;
    border-radius: 5px;
    justify-content: flex-start;
    min-height: 41px;
    overflow: hidden;
    flex-wrap: wrap;
  `;

  const Icon = styled.div`
    width: 40px;
    height: 40px;

    margin-right: 20px;
    background: white;

    & > img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  `;

  const ItemStart = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column;
    justify-content: center;
  `;

  const ItemEnd = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  `;

  const Title = styled.h4`
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  `;
  const ImageA = styled.img`
    height: 143px;
    border-radius: 10px;
    object-fit: cover;
    width: 270px;
    cursor: pointer;
  `;
  const VideoA = styled.video`
    height: 143px;
    border-radius: 10px;
    object-fit: cover;
    width: 270px;
    cursor: pointer;
  `;

  const Summary = styled.p`
    margin: 0;
    font-size: 12px;
    opacity: 0.5;
    margin-top: 6px;
  `;
  const SummaryTop = styled.p`
    margin: 0;
    font-size: 12px;
    opacity: 0.5;
    margin-bottom: 6px;
  `;

  const Date = styled.time`
    opacity: 0.2;
    margin-right: 0px;
    font-size: 12px;
  `;
  const handleClick = () => {
    if (type === "photo" && src) {
      handlePhoto(src);
    } else if (type === "video" && src) {
      handleVideo(src);
    }
  };

  const handleVideoClick = (path, secs, callback) => {
    let me = this,
      video = document.createElement("video");
    video.onloadedmetadata = function() {
      if ("function" === typeof secs) {
        secs = secs(this.duration);
      }
      this.currentTime = Math.min(
        Math.max(0, (secs < 0 ? this.duration : 0) + secs),
        this.duration
      );
    };
    video.onseeked = function(e) {
      let canvas = document.createElement("canvas");
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      let img = new Image();
      canvas.setAttribute("crossorigin", "anonymous");
      img.src = canvas.toDataURL();
      callback.call(me, img, this.currentTime, e);
    };
    video.onerror = function(e) {
      callback.call(me, undefined, undefined, e);
    };
    video.src = path;
  };
  let imageFromVideo;
  /*if (type === "video" && src) {
    handleVideoClick(src, 0, function(img, secs, event) {
      if (event.type == "seeked") {
        imageFromVideo = img;
        console.log("The image src - ", imageFromVideo);
      }
    });
  }*/

  return (
    <div style={{ display: "block" }}>
      <Item>
        <Icon>
          <img src={icon || logo} alt="item type" />
        </Icon>
        <ItemStart>
          {description && flv && (
            <SummaryTop>{description} начал прямую трансляцию</SummaryTop>
          )}
          {description && type === "audio" && (
            <SummaryTop>{description} поделился аудио</SummaryTop>
          )}
          {description && type === "video" && (
            <SummaryTop>{description} поделился видео</SummaryTop>
          )}
          {description && type === "photo" && (
            <SummaryTop>{description} поделился фото</SummaryTop>
          )}
          {!flv && <Title>{title}</Title>}
          {flv && (
            <LiveButton flv={flv} setFlv={functionA}>
              Смотреть
            </LiveButton>
          )}
          {type === "photo" && src && (
            <ImageA src={src} onClick={() => handleClick()} />
          )}
          {type === "video" && src && (
            <VideoA src={src} onClick={() => handleClick()} />
          )}
          {type === "audio" && src && (
            <ReactAudioPlayer src={src} controls style={{ width: "270px" }} />
          )}
          {description && !flv && !src && <Summary>{description}</Summary>}
        </ItemStart>
        <ItemEnd>
          <Date>{format(date, "h:m")}</Date>
        </ItemEnd>
      </Item>
    </div>
  );
};

export default Response;
