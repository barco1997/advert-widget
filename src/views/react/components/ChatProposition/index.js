import styled from "styled-components";
import React from "react";

import moment from "moment";
import { media } from "../../../../utils/media";

const Item = styled.li`
  &&& {
    display: flex !important;
    width: 100% !important;
    margin: 5px 0 !important;
    padding: 10px 0px !important;
    border-radius: 5px !important;
    justify-content: flex-start !important;
    min-height: 48px !important;
    cursor: pointer !important;
    flex-wrap: wrap !important;
    background: #f1f1f1 !important;
  }
`;

const ItemStart = styled.div`
  &&& {
    display: flex !important;
    flex: 2 !important;
    margin-left: 20px !important;
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
    justify-content: flex-end !important;
  }
`;

const Title = styled.h4`
  &&& {
    margin: 0 !important;
    margin-bottom: 8px !important;
    font-size: 16px !important;
    font-weight: bold !important;
    ${media.desktop`
  font-size: 14px !important;
  `};
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

const Date = styled.time`
  &&& {
    color: white !important;
    margin-right: 20px !important;
    font-size: 12px !important;
    border-radius: 10px !important;
    padding: 1px 12px !important;
    background: ${(props) => `${props.color} !important`};
  }
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
      src: src,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ifPauseIcon) {
      this.setState({
        pauseIcon: true,
      });
    } else if (this.props.ifPauseIcon && !nextProps.ifPauseIcon) {
      this.setState({
        pauseIcon: false,
      });
    }
    if (this.state.typeVar === "stream" && nextProps.src) {
      this.setItems("video", nextProps.src);
    }
  }

  setSrc(props) {
    this.setState({
      src: props,
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
            <Summary>{moment(this.props.description).format("HH:mm")}</Summary>
          )}
        </ItemStart>
        <ItemEnd>
          <Date color={this.props.color}>{this.props.messagesCount}</Date>
        </ItemEnd>
      </Item>
    );
  }
}
/*<PlayIcon src={this.state.playIcon ? playV : pauseV} />*/

export default Response;
