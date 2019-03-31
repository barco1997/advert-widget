import styled from "styled-components";
import React from "react";
import { format } from "date-fns";

import { media } from "../../../../utils/media";

const Item = styled.li`
  display: flex;
  width: 100%;
  margin: 5px 0;
  padding: 10px 0px;
  border-radius: 5px;
  justify-content: flex-start;
  min-height: 48px;
  cursor: pointer;
  flex-wrap: wrap;
  background: #f1f1f1;
`;

const ItemStart = styled.div`
  display: flex;
  flex: 2;
  margin-left: 20px;
  flex-direction: column;
  justify-content: center;
`;

const ItemEnd = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Title = styled.h4`
  margin: 0;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  ${media.desktop`
  font-size: 14px;
  `};
`;

const Summary = styled.p`
  margin: 0;
  font-size: 12px;
  opacity: 0.5;
  margin-top: 6px;
`;

const Date = styled.time`
  color: white;
  margin-right: 20px;
  font-size: 12px;
  border-radius: 10px;
  padding: 1px 12px;
  background: #ff2d55;
`;

export class Response extends React.Component {
  constructor(props) {
    super(props);

    //this.played = this.played.bind(this);
    //this.paused = this.paused.bind(this);
  }

  componentWillMount() {}

  handleClick() {
    //
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
      <Item>
        <ItemStart>
          <Title>{this.props.title}</Title>

          {this.props.description && (
            <Summary>{format(this.props.description, "h:m")}</Summary>
          )}
        </ItemStart>
        <ItemEnd>
          <Date>{this.props.messagesCount}</Date>
        </ItemEnd>
      </Item>
    );
  }
}
/*<PlayIcon src={this.state.playIcon ? playV : pauseV} />*/

export default Response;
