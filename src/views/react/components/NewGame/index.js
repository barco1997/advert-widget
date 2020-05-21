import React from "react";
import styled from "styled-components";
import Pipe from "./Pipe";
import moment from "moment";
import AwaitTimer from "../AwaitTimer";
import OpaqueButton from "../OpaqueButton";
import GameOver from "../GameOver";
import ls from "local-storage";
import { media, mediaType } from "../../../../utils/media";

//const mediaOffset = mediaType.desktop ? 150 : 170;
const Logo = styled.div`
  &&& {
    position: relative !important;
    width: 24px !important;
    border: ${(props) => `8px solid ${props.color} !important`};
    height: 24px !important;
    border-radius: 50% !important;
    background: black !important;
    z-index: 15000 !important;
  }
`;

const White = styled.div`
  &&& {
    position: absolute !important;
    border-radius: 50% !important;
    background: white !important;
    width: 10px !important;
    height: 10px !important;
    top: 0px !important;
    left: 0px !important;
  }
`;
// change the color #ff2d55 to props.color later

const Wrapper = styled.div`
  &&& {
    touch-action: manipulation !important;
    position: relative !important;
    overflow: hidden !important;
    overflow-y: hidden !important;
    height: ${(props) =>
      props.height ? `${props.height}px` : "100%"} !important;
    width: ${(props) => (props.width ? `${props.width}px` : "100%")} !important;
  }
`;
const HeaderRow = styled.div`
  &&& {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: calc(100% - 20px) !important;
    padding: 10px !important;
    z-index: 20000 !important;
    display: flex !important;
    align-items: center !important;
  }
`;

const ExtraPos = styled.div`
  &&& {
    margin: 0px 20px !important;
    margin-bottom: 12px !important;
  }
`;

const ScoreWrap = styled.div`
  &&& {
    left: 25px !important;
    bottom: 25px !important;
    position: absolute !important;
    z-index: 10009 !important;
    font-weight: 700 !important;
    font-size: 40px !important;
    font-family: "Montserrat" !important;
  }
`;

const CloseButton = styled.span`
  &&& {
    position: relative !important;
    margin-bottom: 12px !important;
    height: 30px !important;
    width: 30px !important;
    background: rgba(171, 171, 171, 0.16) !important;
    border-radius: 50% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;

    margin-right: 15px !important;

    &:hover {
      background: rgba(171, 171, 171, 0.26) !important;
    }
    &:before,
    &:after {
      position: absolute !important;

      content: " " !important;
      height: 12px !important;
      width: 2px !important;
      border-radius: 1px !important;
      background-color: #4e4e4e !important;
    }
    &:before {
      transform: rotate(45deg) !important;
    }
    &:after {
      transform: rotate(-45deg) !important;
    }
    ${media.desktop`
    
      
      
  `};
  }
`;
/* for close button

  for initialtext
  */

const InitialText = styled.div`
  &&& {
    position: absolute !important;
    top: 400px !important;
    left: 100px !important;
    width: 230px !important;
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    line-height: 24px !important;
    /* or 171% */

    letter-spacing: 0.02em !important;
    color: #888888 !important;
    ${media.desktop`
    display: none !important;
    `};
  }
`;

const CloseWrapper = styled.div`
  &&& {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    margin-left: auto !important;
  }
`;

const GameOverWrapper = styled.div`
  &&& {
    position: absolute !important;
    top: 0px !important;
    left: 0px !important;
    height: 100% !important;
    width: 100% !important;
    z-index: 19000 !important;
    opacity: 0.9 !important;
    background: white !important;
  }
`;

const MovingWrap = styled.div.attrs((props) => ({
  style: {
    left: `${props.horizontal}px`,
    top: `${props.vertical}px`,
  },
  className: "ignore-cleanslate",
}))`
  &&& {
    position: absolute !important;
    z-index: 15000 !important;
  }
`;

const getInitialPipes = (h, w) => {
  const count = 3;
  const pipes = [];
  for (let i = 1; i < count; i++) {
    //const x = 2 * w + (2 * w) / i;
    const x = w + (2 * w) / i + 380;
    const upperPipeHeight = h - Math.random() * h * 0.9 - 160;
    let bottomPipeHeight =
      h - upperPipeHeight - 180 - Math.random() * 0.2 * upperPipeHeight;
    if (bottomPipeHeight < 0) {
      bottomPipeHeight = 0;
    }
    pipes.push({
      //upperPipeHeight: h / 2 - 20 - Math.random() * 150,
      //bottomPipeHeight: h / 2 - 20 - Math.random() * 150, //put the media offset
      upperPipeHeight: upperPipeHeight,
      bottomPipeHeight: bottomPipeHeight,
      x: x,
    });
  }
  return pipes;
};

export class FlappyEye extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHeight: props.height * 0.4, // change the constant to props.height
      initialLogoX: props.width * 0.3,
      score: 0,
      pipes: getInitialPipes(props.height, props.width),
      velocity: 10,
      gravity: 1.1,
      pipeSpeed: this.props.width / 100, //smaller width slower pipespeed
      gameStarted: false,
      gameOver: false,
      isHit: false,
      timestamp: ls.get("awaitTmp") || null,
      timerExceeded: false,
    };

    this.handleSpace = this.handleSpace.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.update = this.update.bind(this);
    this.restart = this.restart.bind(this);
  }

  moveUp() {
    this.setState({
      velocity: this.state.velocity - 25,
    });
  }

  restart() {
    this.setState({
      currentHeight: this.props.height * 0.4,
      initialLogoX: this.props.width * 0.3,
      score: 0,
      pipes: getInitialPipes(this.props.height, this.props.width),
      velocity: 10,
      gravity: 1.1,
      pipeSpeed: 5,
      gameStarted: false,
      gameOver: false,
      isHit: false,
      tempPipeHeight: null,
    });
  }
  update() {
    if (
      this.state.currentHeight <= 0 ||
      this.state.currentHeight >= this.props.height - 40 ||
      this.state.isHit ||
      this.state.gameOver
    ) {
      clearInterval(this.interval);
      this.setState({
        velocity: 0,
        gravity: 0,
        gameOver: true,
      });

      return;
    }
    let birdX = this.state.initialLogoX;

    if (
      (this.state.pipes[0].x > birdX - 50 &&
        this.state.pipes[0].x < birdX + 50) ||
      (this.state.pipes[1].x > birdX - 50 && this.state.pipes[1].x < birdX + 50) //don't put hard-values, use it in conjunction with initialx
    ) {
      let closerPipe;
      if (
        this.state.pipes[0].x > birdX - 50 &&
        this.state.pipes[0].x < birdX + 50
      ) {
        //same as above
        closerPipe = this.state.pipes[0];
      } else {
        closerPipe = this.state.pipes[1];
      }

      const xDifference = closerPipe.x - birdX;
      const hitOnX = xDifference < 35 && xDifference > -25; //there might be a small problem
      const hitOnUpperY =
        this.state.currentHeight + 5 < closerPipe.upperPipeHeight; //adding 5 for corners

      const hitOnLowerY =
        this.state.currentHeight + 35 >
        this.props.height - closerPipe.bottomPipeHeight; //10 is for corners, put height

      if (hitOnX) {
        if (hitOnUpperY || hitOnLowerY) {
          this.setState({
            isHit: true,
          });
        }
      }
    }

    const newVelocity = (this.state.velocity + this.state.gravity) * 0.9;
    const newCurrentHeight = newVelocity + this.state.currentHeight;
    const newPipes = this.state.pipes.map((pipe, index) => {
      const newX = pipe.x - this.state.pipeSpeed;
      if (newX < -28) {
        this.setState({
          score: this.state.score + 1,
        });
        let upperPipeHeight =
          this.props.height - Math.random() * this.props.height * 0.9 - 160;
        if (upperPipeHeight < 20) {
          upperPipeHeight = 0;
        }
        if (
          index === 0 &&
          Math.abs(this.state.pipes[1].upperPipeHeight - upperPipeHeight) > 200
        ) {
          upperPipeHeight = Math.abs(
            upperPipeHeight - this.state.pipes[1].upperPipeHeight
          );
          this.setState({
            tempPipeHeight: upperPipeHeight,
          });
        } else if (
          Math.abs(this.state.tempPipeHeight - upperPipeHeight) > 200
        ) {
          upperPipeHeight = Math.abs(
            upperPipeHeight - this.state.tempPipeHeight
          );
        }
        let bottomPipeHeight =
          this.props.height -
          upperPipeHeight -
          180 -
          Math.random() * 0.3 * upperPipeHeight;
        if (bottomPipeHeight < 0) {
          bottomPipeHeight = 0;
        }
        return {
          //upperPipeHeight: this.props.height / 2 - 20 - Math.random() * 150,
          //bottomPipeHeight: this.props.height / 2 - 20 - Math.random() * 150, //add media offset
          upperPipeHeight: upperPipeHeight,
          bottomPipeHeight: bottomPipeHeight,
          x: this.props.width + 400, //add 10 so it renders outside
        };
      }
      return {
        ...pipe,
        x: newX,
      };
    });
    this.setState({
      currentHeight: newCurrentHeight,
      velocity: newVelocity,
      pipes: newPipes,
    });
  }

  handleTouch(e) {
    if (!this.state.gameStarted) {
      this.interval = setInterval(() => this.update(), 15);
      this.setState({ gameStarted: true });
    }
    e.preventDefault();
    this.moveUp();
  }

  handleSpace(e) {
    if (e.keyCode === 32) {
      if (!this.state.gameStarted) {
        this.interval = setInterval(() => this.update(), 15);
        this.setState({ gameStarted: true });
      }
    }
    e.preventDefault();
    if (e.keyCode === 32) {
      this.moveUp();
    }
  }

  componentDidMount() {
    window.addEventListener("touchstart", this.handleTouch);
    window.addEventListener("keydown", this.handleSpace);
  }

  componentWillUnmount() {
    window.removeEventListener("touchstart", this.handleTouch);
    window.removeEventListener("keydown", this.handleSpace);
  }

  render() {
    const { height, width } = this.props;
    return (
      <Wrapper width={this.props.width} height={this.props.height}>
        {this.state.gameOver && (
          <GameOverWrapper>
            <GameOver
              count={this.state.score}
              color={this.props.color}
              restart={this.restart}
              stopGame={this.props.stopGame}
            />
          </GameOverWrapper>
        )}
        <HeaderRow>
          <AwaitTimer
            exceedFunc={() => {
              this.setState({
                timerExceeded: true,
              });
            }}
            startSec={
              this.state.timestamp &&
              moment().diff(
                moment(this.state.timestamp, moment.ISO_8601),
                "seconds"
              ) % 60
            }
            startMin={
              this.state.timestamp &&
              moment().diff(
                moment(this.state.timestamp, moment.ISO_8601),
                "minutes"
              )
            }
            limit={this.props.countdown / 1000}
          />
          <ExtraPos>
            {!this.state.gameOver && (
              <OpaqueButton onClick={this.props.stopGame}>
                Закончить
              </OpaqueButton>
            )}
          </ExtraPos>
          <CloseWrapper>
            <CloseButton onClick={this.props.stopGame} />
          </CloseWrapper>
        </HeaderRow>
        {!this.state.gameStarted && (
          <InitialText>
            Нажмите пробел чтобы взлететь и набирать высоту
          </InitialText>
        )}
        {!this.state.gameOver && (
          <ScoreWrap height={height + "px"} width={width + "px"}>
            {this.state.score}
          </ScoreWrap>
        )}
        <MovingWrap
          horizontal={this.state.initialLogoX}
          vertical={this.state.currentHeight}
        >
          <Logo color={this.props.color}>
            <White />
          </Logo>
        </MovingWrap>
        {this.state.pipes.map((pipe) => {
          const upperPipeHeight = pipe.upperPipeHeight;
          const x = pipe.x;

          const bottomPipeTop = this.props.height - pipe.bottomPipeHeight; //make it height
          const bottomPipeHeight = pipe.bottomPipeHeight;

          return (
            <Pipe
              key={x}
              isHit={pipe.isHit}
              upperPipeHeight={upperPipeHeight}
              bottomPipeHeight={bottomPipeHeight}
              x={x}
              bottomPipeTop={bottomPipeTop}
              color={this.props.color}
            />
          );
        })}
      </Wrapper>
    );
  }
}

export default FlappyEye;
