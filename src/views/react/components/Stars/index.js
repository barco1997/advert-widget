import React from "react";
import styled from "styled-components";

import Star from "./Star";

const StarsList = styled.div`
  &&& {
    display: flex !important;
    justify-content: space-between !important;
    width: ${props =>
      props.width ? "70px !important" : "170px !important"};
  }
`;

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choosedStar: 0
    };
    this.choiseStar = this.choiseStar.bind(this);
  }

  choiseStar(qty) {
    this.setState({
      choosedStar: qty
    });
  }

  render() {
    const { choosedStar } = this.state;
    const { isLittle } = this.props;
    return (
      <StarsList width={isLittle}>
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <Star
              active={choosedStar && idx + 1 <= choosedStar}
              isLittle={isLittle}
              key={`star-${idx}`}
              onClick={() => this.choiseStar(idx + 1)}
            />
          ))}
      </StarsList>
    );
  }
}

export default Stars;
