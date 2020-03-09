import React from "react";

class Star extends React.Component {
  render() {
    const { active, onClick, isLittle } = this.props;
    return (
      <svg
        width={isLittle ? "9" : "28"}
        height={isLittle ? "9" : "26"}
        viewBox="0 0 28 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.0612 1L17.9602 8.89905L26.6795 10.1735L20.3703 16.3186L21.8593 25L14.0612 20.8991L6.26306 25L7.75202 16.3186L1.44287 10.1735L10.1621 8.89905L14.0612 1Z"
          fill={active ? "#FF2D55" : "#E5E5E5"}
          stroke={active ? "#FF2D55" : "#E5E5E5"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={onClick}
        />
      </svg>
    );
  }
}

export default Star;
