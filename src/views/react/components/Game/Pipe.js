import React from "react";

import styled from "styled-components";
const Reactangle = styled.div`
  border-radius: ${props =>
    props.up ? "0px 0px 50px 50px" : "50px 50px 0px 0px"};
  height: ${props => (props.height ? `${props.height}px` : "0px")};

  width: 40px;
  background: #ff2d55;
`;
export default function Pipe(props) {
  const upperPipeHeight = props.upperPipeHeight;
  const pipeX = props.x;

  const lowerHeight = props.bottomPipeTop;
  const bottomPipeHeight = props.bottomPipeHeight;

  const color = props.isHit ? "#FF2D55" : "#FF2D55";

  return (
    <div id="pipe">
      <div style={{ left: pipeX, top: 0, position: "absolute" }}>
        <Reactangle
          width={40}
          height={upperPipeHeight}
          fill={{ color: color }}
          up
        />
      </div>
      <div style={{ left: pipeX, top: lowerHeight, position: "absolute" }}>
        <Reactangle
          width={40}
          height={bottomPipeHeight}
          fill={{ color: color }}
        />
      </div>
    </div>
  );
}
