import styled from "styled-components";
import React from "react";
import { format } from "date-fns";
import logo from "./logo.png";
import LiveButton from "../LiveButton/index";
import ReactAudioPlayer from "react-audio-player";

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
/*const Response = ({
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
  
  const handleClick = () => {
    if (type === "photo" && src) {
      handlePhoto(src);
    } else if (type === "video" && src) {
      handleVideo(src);
    } else if (type === "stream" && src) {
      handleVideo(src);
    }
  };

  let typeVar = type;
  if (typeVar === "stream" && src) {
    typeVar = "video";
  }
  

  return (
    <div style={{ display: "block" }}>
      <Item>
        <Icon>
          <img src={icon || logo} alt="item type" />
        </Icon>
        <ItemStart>
          {description && flv && !src && (
            <SummaryTop>{description} начал прямую трансляцию</SummaryTop>
          )}
          {description && typeVar === "audio" && (
            <SummaryTop>{description} поделился аудио</SummaryTop>
          )}
          {description && !flv && typeVar === "video" && (
            <SummaryTop>{description} поделился видео</SummaryTop>
          )}
          {description && flv && typeVar === "video" && (
            <SummaryTop>{description} провел прямую трансляцию</SummaryTop>
          )}
          {description && typeVar === "photo" && (
            <SummaryTop>{description} поделился фото</SummaryTop>
          )}
          {!flv && <Title>{title}</Title>}
          {flv && !src && (
            <LiveButton flv={flv} setFlv={functionA}>
              Смотреть
            </LiveButton>
          )}
          {typeVar === "photo" && src && (
            <ImageA src={src} onClick={() => handleClick()} />
          )}
          {typeVar === "video" && src && (
            <VideoA src={src} onClick={() => handleClick()} />
          )}

          {typeVar === "audio" && src && (
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

export default Response;*/

export class Response extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeVar: this.props.type,
      src: this.props.src
    };

    this.setItems = this.setItems.bind(this);
    this.setSrc = this.setSrc.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /*componentWillReceiveProps(nextProps) {
    const source = this.state.src;
    console.log(source);
    console.log("got here");
    if (nextProps.flv && nextProps.src === null) {
      this.setSrc(source);
    } else {
      this.setSrc(nextProps.src);
    }
  }
  componentDidUpdate(prevProps) {
    console.log("got to update");
  }*/

  componentWillMount() {
    if (this.state.typeVar === "stream" && this.props.src) {
      console.log("got stream", this.props.src);
      this.setItems("video", this.props.src);
    }
  }

  handleClick() {
    if (this.props.type === "photo" && this.state.src) {
      this.props.handlePhoto(this.state.src);
    } else if (this.props.type === "video" && this.state.src) {
      this.props.handleVideo(this.state.src);
    } else if (this.props.type === "stream" && this.state.src) {
      this.props.handleVideo(this.state.src);
    }
  }

  setItems(type, src) {
    this.setState({
      typeVar: type,
      src: src
    });
  }

  setSrc(props) {
    this.setState({
      src: props
    });
  }

  render() {
    return (
      <div style={{ display: "block" }}>
        <Item>
          <Icon>
            <img src={this.props.icon || logo} alt="item type" />
          </Icon>
          <ItemStart>
            {this.props.description && this.props.flv && !this.state.src && (
              <SummaryTop>
                {this.props.description} начал прямую трансляцию
              </SummaryTop>
            )}
            {this.props.description && this.state.typeVar === "audio" && (
              <SummaryTop>{this.props.description} поделился аудио</SummaryTop>
            )}
            {this.props.description &&
              !this.props.flv &&
              this.state.typeVar === "video" && (
                <SummaryTop>
                  {this.props.description} поделился видео
                </SummaryTop>
              )}
            {this.props.description &&
              this.props.flv &&
              this.state.typeVar === "video" && (
                <SummaryTop>
                  {this.props.description} провел прямую трансляцию
                </SummaryTop>
              )}
            {this.props.description && this.state.typeVar === "photo" && (
              <SummaryTop>{this.props.description} поделился фото</SummaryTop>
            )}
            {!this.props.flv && <Title>{this.props.title}</Title>}
            {this.props.flv && !this.state.src && (
              <LiveButton flv={this.props.flv} setFlv={this.props.functionA}>
                Смотреть
              </LiveButton>
            )}
            {this.state.typeVar === "photo" && this.state.src && (
              <ImageA src={this.state.src} onClick={() => this.handleClick()} />
            )}
            {this.state.typeVar === "video" && this.state.src && (
              <ImageA
                src={this.props.thumb}
                onClick={() => this.handleClick()}
              />
            )}

            {this.state.typeVar === "audio" && this.state.src && (
              <ReactAudioPlayer
                src={this.state.src}
                controls
                style={{ width: "270px" }}
              />
            )}
            {this.props.description && !this.props.flv && !this.state.src && (
              <Summary>{this.props.description}</Summary>
            )}
          </ItemStart>
          <ItemEnd>
            <Date>{format(this.props.date, "h:m")}</Date>
          </ItemEnd>
        </Item>
      </div>
    );
  }
}

export default Response;
