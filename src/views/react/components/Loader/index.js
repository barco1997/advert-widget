import React from "react";
import styled, { keyframes } from "styled-components";
import "./loader.css";

const LoadingWrapper = styled.div`
  &&& {
    display: ${props =>
      props.loadingFlag ? "flex !important" : "none !important"};
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
    padding-top: 48px !important;
    opacity: 1 !important;

    width: ${props => (props.width ? props.width : "48px !important")};
    height: ${props => (props.height ? props.height : "48px !important")};
  }
`;

const Loading = styled.div`
  &&& {
    width: ${props => (props.width ? props.width : "48px !important")};
    height: ${props => (props.height ? props.height : "48px !important")};

    position: relative !important;
  }
`;

export class LoadingCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.loadingFlag
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loadingFlag !== this.props.loadingFlag) {
      this.setState({
        isLoading: this.props.loadingFlag
      });
    }
  }
  render() {
    return (
      <LoadingWrapper loadingFlag={this.state.isLoading}>
        <Loading>
          <div className="loader-5 center">
            <span />
          </div>
        </Loading>
      </LoadingWrapper>
    );
  }
}

export default LoadingCircle;
