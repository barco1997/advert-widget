import React, { Component } from "react";

import Pipe from "./Pipe";
import styled from "styled-components";
const birdRadius = 24;

const Logo = styled.div`
  &&& {
    position: relative !important;
    width: 24px !important;
    border: 8px solid #ff2d55 !important;
    height: 24px !important;
    border-radius: 50% !important;
    background: black !important;
  }
`;

const ScoreWrap = styled.div`
  &&& {
    left: 20px !important;
    bottom: 20px !important;
    position: absolute !important;
    z-index: "10009 !important";

    font-size: "40px !important";
    font-family: "Montserrat !important";
  }
`;

const White = styled.div`
  &&& {
    position: absolute !important;
    border-radius: 50% !important;
    background: red !important;
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
const getInitialPipes = (h, w) => {
  const count = 3;
  const pipes = [];
  for (let i = 1; i < count; i++) {
    const x = w + 200 + w / i;
    pipes.push({
      upperPipeHeight: h / 2 - 15 - Math.random() * 150,
      bottomPipeHeight: h / 2 - 15 - Math.random() * 150,
      x: x
    });
  }
  return pipes;
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birdHeight: this.props.height / 2,
      left: this.props.width / 2 - 20,
      gravity: 0.8,
      velocity: 0,
      pipes: getInitialPipes(this.props.height, this.props.width),
      pipeSpeed: 7,
      score: 0
    };

    this.moveUp = this.moveUp.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.handleSpace = this.handleSpace.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 15);
  }

  update() {
    const birdCrashed =
      this.state.birdHeight > this.props.height - birdRadius * 2;
    if (birdCrashed) {
      clearInterval(this.interval);
      return;
    }

    const pipeWasHit = this.state.pipes.find(pipe => pipe.isHit);

    if (pipeWasHit) {
      clearInterval(this.interval);
      return;
    }

    const newVelocity = (this.state.velocity + this.state.gravity) * 0.9;
    const birdHeight = newVelocity + this.state.birdHeight;
    const newPipes = this.state.pipes.map(pipe => {
      const newX = pipe.x - this.state.pipeSpeed;
      if (newX < 0) {
        return {
          upperPipeHeight: this.props.height / 2 - 15 - Math.random() * 150,
          bottomPipeHeight: this.props.height / 2 - 15 - Math.random() * 150,
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
    e.preventDefault;
    this.moveUp();
  }

  handleSpace(e) {
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
    const left = this.state.left;
    const birdHeight = this.state.birdHeight;

    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          touchAction: "manipulation !important",
          overflow: "hidden !important"
        }}
        /*onTouchStart={e => this.handleTouch(e)}*/
      >
        {/*<KeyHandler
          keyEventName={KEYPRESS}
          keyValue="s"
          onKeyHandle={this.moveUp}
        />*/}
        <ScoreWrap>
          <b>{this.state.score}</b>
        </ScoreWrap>
        <Wrap pipeX={left} lowerHeight={birdHeight}>
          <Logo>
            <White />
          </Logo>
        </Wrap>
        {this.state.pipes.map(pipe => {
          const upperPipeHeight = pipe.upperPipeHeight;
          const x = pipe.x;

          const bottomPipeTop = this.props.height - pipe.bottomPipeHeight;
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
      </div>
    );
  }
}

export default Game;
