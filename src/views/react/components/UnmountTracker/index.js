import React from "react";

export class UnmountTracker extends React.Component {
  /*componentDidMount() {
    console.log("DOING");
    if (this.props.mountFunction) {
      console.log("DOING");
      this.props.mountFunction();
    }
  }*/

  componentWillUnmount() {
    console.log("UNDOING");
    if (this.props.unmountFunction) {
      this.props.unmountFunction();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      if (this.props.mountFunction) {
        this.props.mountFunction();
      }
    } else if (this.props.visible !== prevProps.visible) {
      if (this.props.unmountFunction) {
        this.props.unmountFunction();
      }
    }
  }

  render() {
    return (
      <iframe
        id="fp_embed_player"
        src={`https://server.witheyezon.com:8444/embed_player?urlServer=wss://server.witheyezon.com:8443&streamName=${this.props.dialogId}&mediaProviders=WebRTC,Flash,MSE,WSPlayer`}
        marginWidth="0"
        marginHeight="0"
        frameBorder="0"
        scrolling="no"
        allowFullScreen="allowfullscreen"
      />
    );
  }
}

export default UnmountTracker;
