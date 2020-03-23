import React, { Component } from "react";
import styled from "styled-components";

import { media } from "../../../../utils/media";

import Pipe from "./Pipe";

const birdRadius = 24;

const Wrapper = styled.div`
  &&& {
    touch-action: manipulation !important;
    position: relative !important;
    overflow: hidden !important;
    height: ${props => (props.height ? props.height : "100%")} !important;
    width: ${props => (props.width ? props.width : "100%")} !important;
  }
`;

const Logo = styled.div`
  &&& {
    position: relative !important;
    width: 24px !important;
    border: ${props => `8px solid ${props.color} !important`};
    height: 24px !important;
    border-radius: 50% !important;
    background: black !important;
  }
`;

const ScoreWrap = styled.div`
  &&& {
    left: 25px !important;
    bottom: 25px !important;
    position: absolute !important;
    z-index: "10009 !important";
    font-weight: 700 !important;
    font-size: 40px !important;
    font-family: "Montserrat" !important;
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

const Wrap = styled.div`
  &&& {
    left: ${props => `${props.pipeX}px !important;`};
    top: ${props => `${props.lowerHeight}px !important;`};
    position: absolute !important;
  }
`;

const HeaderRow = styled.div`
  &&& {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
  }
`;

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

const getInitialPipes = (h, w) => {
  const count = 3;
  const pipes = [];
  for (let i = 1; i < count; i++) {
    const x = w + 200 + w / i;
    pipes.push({
      upperPipeHeight:
        h / 2 - 15 - Math.random() * (!media.desktop ? 170 : 150),
      bottomPipeHeight:
        h / 2 - 15 - Math.random() * (!media.desktop ? 170 : 150),
      x: x
    });
  }
  return pipes;
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birdHeight: this.props.height / 2 - 100,
      left: this.props.width / 2 - 20,
      gravity: 0.8,
      velocity: 0,
      pipes: getInitialPipes(this.props.height, this.props.width),
      pipeSpeed: 7,
      started: false,
      score: 0
    };

    this.moveUp = this.moveUp.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.handleSpace = this.handleSpace.bind(this);
  }

  componentDidMount() {
    //
  }

  update() {
    const birdCrashed =
      this.state.birdHeight > this.props.height - birdRadius * 2;
    if (birdCrashed || this.state.pipes.find(pipe => pipe.isHit)) {
      clearInterval(this.interval);
      return;
    }

    //const pipeWasHit = this.state.pipes.find(pipe => pipe.isHit);

    /*if (pipeWasHit) {
      clearInterval(this.interval);
      return;
    }*/

    const newVelocity = (this.state.velocity + this.state.gravity) * 0.9;
    const birdHeight = newVelocity + this.state.birdHeight;
    const newPipes = this.state.pipes.map(pipe => {
      const newX = pipe.x - this.state.pipeSpeed;
      if (newX < 0) {
        return {
          upperPipeHeight:
            this.props.height / 2 -
            15 -
            Math.random() * (!media.desktop ? 170 : 150),
          bottomPipeHeight:
            this.props.height / 2 -
            15 -
            Math.random() * (!media.desktop ? 170 : 150),
          x: this.props.width - 40
        };
      } else {
        let isHit = false;
        const xDifference = this.state.left - pipe.x;
        const hitOnX = xDifference < 10 && xDifference > 0;
        const hitOnUpperY = birdHeight < pipe.upperPipeHeight;
        const hitOnLowerY =
          birdHeight + birdRadius > this.props.height - pipe.bottomPipeHeight;
        if (hitOnX) {
          if (hitOnUpperY || hitOnLowerY) {
            isHit = true;
          } else {
            this.setState({
              score: this.state.score + 1
            });
          }
        }

        return {
          ...pipe,
          x: newX,
          isHit: isHit
        };
      }
    });
    this.setState({
      velocity: newVelocity,
      birdHeight: birdHeight,
      pipes: newPipes
    });
  }

  moveUp() {
    this.setState({
      velocity: this.state.velocity - 25
    });
  }

  handleTouch(e) {
    if (!this.state.started) {
      this.interval = setInterval(() => this.update(), 15);
      this.setState({ started: true });
    }
    e.preventDefault;
    this.moveUp();
  }

  handleSpace(e) {
    if (!this.state.started) {
      this.interval = setInterval(() => this.update(), 15);
      this.setState({ started: true });
    }
    e.preventDefault;
    if (e.keyCode == 32) {
      this.moveUp();
    }
  }

  componentWillMount() {
    window.addEventListener("touchstart", this.handleTouch);
    window.addEventListener("keydown", this.handleSpace);
  }

  componentWillUnmount() {
    window.removeEventListener("touchstart", this.handleTouch);
    window.removeEventListener("keydown", this.handleSpace);
  }

  render() {
    const { score, left, birdHeight } = this.state;
    const { height, width } = this.props;

    return (
      <Wrapper>
        {!this.state.started && (
          <InitialText>
            Нажмите пробел чтобы взлететь и набирать высоту
          </InitialText>
        )}
        <ScoreWrap height={height + "px"} width={width + "px"}>
          {score}
        </ScoreWrap>
        <Wrap pipeX={left} lowerHeight={birdHeight}>
          <Logo color={this.props.color}>
            <White />
          </Logo>
        </Wrap>
        {this.state.pipes.map(pipe => {
          const upperPipeHeight = pipe.upperPipeHeight;
          const x = pipe.x;

          const bottomPipeTop = height - pipe.bottomPipeHeight;
          const bottomPipeHeight = pipe.bottomPipeHeight;

          return (
            <Pipe
              key={x}
              isHit={pipe.isHit}
              upperPipeHeight={upperPipeHeight}
              bottomPipeHeight={bottomPipeHeight}
              x={x}
              bottomPipeTop={bottomPipeTop}
            />
          );
        })}
      </Wrapper>
    );
  }
}

export default Game;
