import styled from "styled-components";
import React from "react";
import { format } from "date-fns";
//import logo from "./logo.png";
//import playV from "./playIcon.svg";
//import pauseV from "./pauseIcon.svg";
import LiveButton from "../LiveButton/index";
import ReactAudioPlayer from "react-audio-player";
import { media } from "../../../../utils/media";
//import iconClose from "./iconClose.png";
//import plus from "./plus.png";
//import minus from "./minus.png";
import ControlButton from "./button";
import axios from "axios";

const Item = styled.li`
  &&& {
    display: flex !important;
    width: 100% !important;
    margin: 5px 0 !important;
    padding: 10px 0px !important;
    border-radius: 5px !important;
    justify-content: flex-start !important;
    min-height: 41px !important;
    height: auto !important;

    flex-wrap: wrap !important;
  }
`;

const Icon = styled.div`
  &&& {
    width: 40px !important;
    height: 40px !important;

    margin-right: 20px !important;
    background: white !important;

    & > img {
      border-radius: 50% !important;
      width: 100% !important;
      height: 100% !important;
    }
    ${media.desktop`
  width: 35px !important;
  height: 35px !important;
  margin-right: 15px !important;
  `};
  }
`;

const ItemStart = styled.div`
  &&& {
    display: flex !important;
    flex: 2 !important;
    flex-direction: column !important;
    justify-content: center !important;
  }
`;

const ItemEnd = styled.div`
  &&& {
    display: flex !important;
    flex: 1 !important;
    flex-direction: column !important;
    align-items: flex-end !important;
    justify-content: center !important;
  }
`;

const Title = styled.h4`
  &&& {
    margin: 0 !important;
    font-size: 16px !important;
    font-weight: bold !important;
    ${media.desktop`
  font-size: 14px !important;
  `};
  }
`;
const ImageA = styled.img`
  &&& {
    height: 143px !important;
    border-radius: 10px !important;
    object-fit: cover !important;
    width: 270px !important;
    cursor: pointer !important;
    ${media.desktop`
  height: 130px !important;
  
  width: 175px !important;
  `};
  }
`;
const VideoA = styled.div`
  &&& {
    height: 143px !important;

    width: 270px !important;
    cursor: pointer;
    border-radius: 10px !important;
    background: url(${props => props.src}) !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;

    ${media.desktop`
  height: 130px !important;
  
  width: 175px !important;
  `};
  }
`;

const PlayIcon = styled.img`
  &&& {
    height: 40px !important;
    width: 40px !important;

    object-fit: cover !important;

    cursor: pointer !important;
  }
`;

const RepointsWindow = styled.div`
  &&& {
    z-index: 16000 !important;
    position: absolute !important;
    bottom: -10px !important;
    left: 0 !important;
    display: flex !important;
    color: white !important;
    border-radius: 100px !important;

    height: 28px !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1) !important;
    background: white !important;

    background: ${props => (props.color ? props.color : "white !important")};
    width: ${props => (props.toggle ? "190px !important" : "28px !important")};
    transition: ${props =>
      props.toggle ? "width 120ms linear !important" : "none !important"};

    overflow: hidden !important;
  }
`;

const ControlIcon = styled.img`
  &&& {
    height: 12px !important;
    width: 12px !important;
    object-fit: cover !important;
    padding: 8px !important;
    text-decoration: none !important;
    -webkit-font-smoothing: antialiased !important;
    -webkit-touch-callout: none !important;
    user-select: none !important;
    cursor: pointer !important;
    outline: 0 !important;
    &:focus {
      outline: 0 !important;
    }
  }
`;

const RepointsAmountWrapper = styled.div`
  &&& {
    margin-left: 8px !important;
    height: 28px !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
  }
`;

const SignWrapper = styled.div`
  &&& {
    height: 28px !important;
    width: 28px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    cursor: pointer !important;
  }
`;

const Minus = styled.img`
  &&& {
    height: 1.75px !important;
    width: 11.8px !important;
  }
`;

const Plus = styled.img`
  &&& {
    height: 11.8px !important;
    width: 11.67px !important;
  }
`;

const NumberWrapper = styled.div`
  &&& {
    width: 44px !important;
    margin-top: 4px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    font-size: 19px !important;
    color: #666666 !important;
  }
`;

const Summary = styled.p`
  &&& {
    margin: 0 !important;
    font-size: 12px !important;
    opacity: 0.5 !important;
    margin-top: 6px !important;
  }
`;
const SummaryTop = styled.p`
  &&& {
    margin: 0 !important;
    font-size: 12px !important;
    opacity: 0.5 !important;
    margin-bottom: 6px !important;
    ${media.desktop`
  font-size: 10px !important;
  `};
  }
`;

const Date = styled.time`
  &&& {
    opacity: 0.2 !important;
    margin-right: 0px !important;
    font-size: 12px !important;
  }
`;

const ItemHolder = styled.div`
  &&& {
    display: flex !important;
    position: relative !important;
    margin-bottom: 10px !important;
  }
`;

const RepointButtonWrapper = styled.div`
  &&& {
    margin-right: 3.8px !important;
  }
`;

export class Response extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeVar: this.props.type,
      src: this.props.src,
      pauseIcon: this.props.ifPauseIcon ? true : false,
      plusToggled: false,
      repointLimit: 50,
      repointValue: 1
    };

    this.setItems = this.setItems.bind(this);
    this.setSrc = this.setSrc.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handleSend = this.handleSend.bind(this);
    //this.played = this.played.bind(this);
    //this.paused = this.paused.bind(this);
  }

  handlePlus() {
    const rep = this.state.repointValue + 1;
    console.log("Plus: ", rep);
    if (rep <= 10 && rep <= this.state.repointLimit) {
      this.setState({
        repointValue: rep
      });
    }
  }

  handleMinus() {
    const rep = this.state.repointValue - 1;
    if (rep > 0) {
      this.setState({
        repointValue: rep
      });
    } else if (rep === 0) {
      this.setState({
        plusToggled: false
      });
    }
  }

  handleSend() {
    let self = this;
    const val = this.state.repointValue;
    self.setState({
      plusToggled: false
    });
    if (val <= self.state.repointLimit) {
      axios
        .patch(`https://api.eyezon.app/messages/${this.props.id}/${val}`)
        .then(function(response) {
          self.setState({
            repointLimit: self.state.repointLimit - val,
            repointValue: 1
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
    }
  }

  componentWillMount() {
    if (this.state.typeVar === "stream" && this.props.src) {
      console.log("got stream", this.props.src);
      this.setItems("video", this.props.src);
    }
  }
  componentDidMount() {
    this.setState({
      repointLimit: this.props.transactionLimit
    });
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
      <div style={{ display: "block !important" }}>
        <Item>
          <Icon>
            <img
              src={
                this.props.icon ||
                "https://witheyezon.com/eyezonsite/static/images/logo.png"
              }
              alt="item type"
            />
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
              <ItemHolder>
                <LiveButton id={this.props.id} setFlv={this.props.functionA}>
                  Смотреть
                </LiveButton>
                <RepointsWindow toggle={this.state.plusToggled}>
                  {!this.state.plusToggled && (
                    <ControlIcon
                      src={
                        "https://witheyezon.com/eyezonsite/static/images/iconClose.png"
                      }
                      onClick={() => {
                        this.setState({ plusToggled: true });
                      }}
                    />
                  )}
                  {this.state.plusToggled && (
                    <React.Fragment>
                      <RepointsAmountWrapper>
                        <SignWrapper onClick={this.handleMinus}>
                          <Minus
                            src={
                              "https://witheyezon.com/eyezonsite/static/images/minus.png"
                            }
                          />
                        </SignWrapper>
                        <NumberWrapper>{this.state.repointValue}</NumberWrapper>
                        <SignWrapper onClick={this.handlePlus}>
                          <Plus
                            src={
                              "https://witheyezon.com/eyezonsite/static/images/plus.png"
                            }
                          />
                        </SignWrapper>
                      </RepointsAmountWrapper>
                      <RepointButtonWrapper>
                        <ControlButton action={this.handleSend}>
                          SEND
                        </ControlButton>
                      </RepointButtonWrapper>
                    </React.Fragment>
                  )}
                </RepointsWindow>
              </ItemHolder>
            )}
            {this.state.typeVar === "photo" && this.state.src && (
              <ItemHolder>
                <ImageA
                  src={this.state.src}
                  onClick={() => this.handleClick()}
                />
                <RepointsWindow toggle={this.state.plusToggled}>
                  {!this.state.plusToggled && (
                    <ControlIcon
                      src={
                        "https://witheyezon.com/eyezonsite/static/images/iconClose.png"
                      }
                      onClick={() => {
                        this.setState({ plusToggled: true });
                      }}
                    />
                  )}
                  {this.state.plusToggled && (
                    <React.Fragment>
                      <RepointsAmountWrapper>
                        <SignWrapper onClick={this.handleMinus}>
                          <Minus
                            src={
                              "https://witheyezon.com/eyezonsite/static/images/minus.png"
                            }
                          />
                        </SignWrapper>
                        <NumberWrapper>{this.state.repointValue}</NumberWrapper>
                        <SignWrapper onClick={this.handlePlus}>
                          <Plus
                            src={
                              "https://witheyezon.com/eyezonsite/static/images/plus.png"
                            }
                          />
                        </SignWrapper>
                      </RepointsAmountWrapper>
                      <RepointButtonWrapper>
                        <ControlButton action={this.handleSend}>
                          SEND
                        </ControlButton>
                      </RepointButtonWrapper>
                    </React.Fragment>
                  )}
                </RepointsWindow>
              </ItemHolder>
            )}
            {this.state.typeVar === "video" && this.state.src && (
              <ItemHolder>
                <VideoA
                  src={this.props.thumb}
                  onClick={() => this.handleClick()}
                >
                  <PlayIcon
                    src={
                      this.state.pauseIcon
                        ? "https://witheyezon.com/eyezonsite/static/images/pauseIcon.svg"
                        : "https://witheyezon.com/eyezonsite/static/images/playIcon.svg"
                    }
                  />
                </VideoA>
                <RepointsWindow toggle={this.state.plusToggled}>
                  {!this.state.plusToggled && (
                    <ControlIcon
                      src={
                        "https://witheyezon.com/eyezonsite/static/images/iconClose.png"
                      }
                      onClick={() => {
                        this.setState({ plusToggled: true });
                      }}
                    />
                  )}
                  {this.state.plusToggled && (
                    <React.Fragment>
                      <RepointsAmountWrapper>
                        <SignWrapper onClick={this.handleMinus}>
                          <Minus
                            src={
                              "https://witheyezon.com/eyezonsite/static/images/minus.png"
                            }
                          />
                        </SignWrapper>
                        <NumberWrapper>{this.state.repointValue}</NumberWrapper>
                        <SignWrapper onClick={this.handlePlus}>
                          <Plus
                            src={
                              "https://witheyezon.com/eyezonsite/static/images/plus.png"
                            }
                          />
                        </SignWrapper>
                      </RepointsAmountWrapper>
                      <RepointButtonWrapper>
                        <ControlButton action={this.handleSend}>
                          SEND
                        </ControlButton>
                      </RepointButtonWrapper>
                    </React.Fragment>
                  )}
                </RepointsWindow>
              </ItemHolder>
            )}

            {this.state.typeVar === "audio" && this.state.src && (
              <ItemHolder>
                <ReactAudioPlayer src={this.state.src} controls />
                <RepointsWindow toggle={this.state.plusToggled}>
                  {!this.state.plusToggled && (
                    <ControlIcon
                      src={
                        "https://witheyezon.com/eyezonsite/static/images/iconClose.png"
                      }
                      onClick={() => {
                        this.setState({ plusToggled: true });
                      }}
                    />
                  )}
                  {this.state.plusToggled && (
                    <React.Fragment>
                      <RepointsAmountWrapper>
                        <SignWrapper onClick={this.handleMinus}>
                          <Minus
                            src={
                              "https://witheyezon.com/eyezonsite/static/images/minus.png"
                            }
                          />
                        </SignWrapper>
                        <NumberWrapper>{this.state.repointValue}</NumberWrapper>
                        <SignWrapper onClick={this.handlePlus}>
                          <Plus
                            src={
                              "https://witheyezon.com/eyezonsite/static/images/plus.png"
                            }
                          />
                        </SignWrapper>
                      </RepointsAmountWrapper>
                      <RepointButtonWrapper>
                        <ControlButton action={this.handleSend}>
                          SEND
                        </ControlButton>
                      </RepointButtonWrapper>
                    </React.Fragment>
                  )}
                </RepointsWindow>
              </ItemHolder>
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
{
  /**/
}
/*<PlayIcon src={this.state.playIcon ? playV : pauseV} />*/

export default Response;
