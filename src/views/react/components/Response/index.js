import styled from "styled-components";
import React from "react";
import { format } from "date-fns";
import logo from "./logo.png";
import playV from "./playIcon.svg";
import pauseV from "./pauseIcon.svg";
import LiveButton from "../LiveButton/index";
import ReactAudioPlayer from "react-audio-player";
import { media } from "../../../../utils/media";

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
  ${media.desktop`
  width: 35px;
  height: 35px;
  margin-right: 15px;
  `};
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
  ${media.desktop`
  font-size: 14px;
  `};
`;
const ImageA = styled.img`
  height: 143px;
  border-radius: 10px;
  object-fit: cover;
  width: 270px;
  cursor: pointer;
  ${media.desktop`
  height: 130px;
  
  width: 175px;
  `};
`;
const VideoA = styled.div`
  height: 143px;
  width: 270px;
  cursor: pointer;
  border-radius: 10px;
  background: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.desktop`
  height: 130px;
  
  width: 175px;
  `};
`;

const PlayIcon = styled.img`
  height: 40px;
  width: 40px;

  object-fit: cover;

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
  ${media.desktop`
  font-size: 10px;
  `};
`;

const Date = styled.time`
  opacity: 0.2;
  margin-right: 0px;
  font-size: 12px;
`;

export class Response extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeVar: this.props.type,
      src: this.props.src,
      pauseIcon: this.props.ifPauseIcon ? true : false
    };

    this.setItems = this.setItems.bind(this);
    this.setSrc = this.setSrc.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //this.played = this.played.bind(this);
    //this.paused = this.paused.bind(this);
  }

  componentWillMount() {
    if (this.state.typeVar === "stream" && this.props.src) {
      console.log("got stream", this.props.src);
      this.setItems("video", this.props.src);
    }
  }

  handleClick() {
    let self = this;
    if (this.props.type === "photo" && this.state.src) {
      console.log("mama");
      this.props.handlePhoto(this.state.src);
    } else if (this.props.type === "video" && this.state.src) {
      //const ifPlayed = this.state.playIcon;
      //console.log(ifPlayed);

      this.props.handleVideo(this.state.src, this.props.id);
      /*self.setState({
        playIcon: !ifPlayed
      });*/
    } else if (this.props.type === "stream" && this.state.src) {
      //const ifPlayed = this.state.playIcon;
      this.props.handleVideo(this.state.src, this.props.id);
      /*self.setState({
        playIcon: !ifPlayed
      });*/
    }
  }

  setItems(type, src) {
    this.setState({
      typeVar: type,
      src: src
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ifPauseIcon) {
      this.setState({
        pauseIcon: true
      });
    } else if (this.props.ifPauseIcon && !nextProps.ifPauseIcon) {
      this.setState({
        pauseIcon: false
      });
    }
    if (this.state.typeVar === "stream" && nextProps.src) {
      console.log("got stream", nextProps.src);
      this.setItems("video", nextProps.src);
    }
  }

  setSrc(props) {
    this.setState({
      src: props
    });
  }

  /*played() {
    this.setState({
      playIcon: false
    });
  }
  paused() {
    this.setState({
      playIcon: true
    });
  }*/

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
                  {this.props.description} провел трансляцию
                </SummaryTop>
              )}
            {this.props.description && this.state.typeVar === "photo" && (
              <SummaryTop>{this.props.description} поделился фото</SummaryTop>
            )}
            {!this.props.flv && <Title>{this.props.title}</Title>}
            {this.props.flv && !this.state.src && (
              <LiveButton id={this.props.id} setFlv={this.props.functionA}>
                Смотреть
              </LiveButton>
            )}
            {this.state.typeVar === "photo" && this.state.src && (
              <ImageA src={this.state.src} onClick={() => this.handleClick()} />
            )}
            {this.state.typeVar === "video" && this.state.src && (
              <VideoA src={this.props.thumb} onClick={() => this.handleClick()}>
                <PlayIcon src={this.state.pauseIcon ? pauseV : playV} />
              </VideoA>
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
/*<PlayIcon src={this.state.playIcon ? playV : pauseV} />*/

export default Response;
