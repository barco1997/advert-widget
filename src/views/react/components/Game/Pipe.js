import React from "react";

import styled from "styled-components";

const Wrap = styled.div`
  &&& {
    left: ${props => `${props.pipeX}px !important;`};
    top: ${props => `${props.lowerHeight}px !important;`};
    position: absolute !important;
  }
`;

const Reactangle = styled.div`
  &&& {
    border-radius: ${props =>
      props.up
        ? "0px 0px 50px 50px !important;"
        : "50px 50px 0px 0px !important;"};
    height: ${props =>
      props.height ? `${props.height}px !important;` : "0px !important;"};

    width: 40px !important;
    background: #ff2d55 !important;
  }
`;

export default function Pipe({
  upperPipeHeight,
  x,
  bottomPipeTop,
  bottomPipeHeight,
  isHit
}) {
  const color = isHit ? "#FF2D55" : "#FF2D55";

  return (
    <div id="pipe">
      <Wrap pipeX={x} lowerHeight={0}>
        <Reactangle
          width={40}
          height={upperPipeHeight}
          fill={{ color: color }}
          up
        />
      </Wrap>
      <Wrap pipeX={x} lowerHeight={bottomPipeTop}>
        <Reactangle
          width={40}
          height={bottomPipeHeight}
          fill={{ color: color }}
        />
      </Wrap>
    </div>
  );
}
