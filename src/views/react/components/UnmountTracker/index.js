import React from "react";
import styled from "styled-components";
let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const VideoElement = styled.div`
  &&& {
    width: 100% !important;
    height: 100% !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    & > video {
      width: 100% !important;
      height: 100% !important;
      border-radius: 10px !important;
    }
  }
`;
export class UnmountTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null
    };

    this.playStream = this.playStream.bind(this);
    this.start = this.start.bind(this);
    //this.played = this.played.bind(this);
    //this.paused = this.paused.bind(this);
  }
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

  playStream(session, streamName) {
    let self = this;
    session
      .createStream({
        name: streamName,
        display: this.player
      })
      .on(this.props.STREAM_STATUS.PLAYING, function(stream) {
        /*document
          .getElementById(stream.id())
          .addEventListener("resize", function(event) {
            resizeVideo(event.target);
          });*/
        //setStatus(stream.status());
        //onStarted(stream);
        if (self.props.iOS) {
          document
            .getElementById(stream.id())
            .setAttribute("playsinline", true);
        }
        self.setState({
          stream
        });
      })
      .on(this.props.STREAM_STATUS.STOPPED, function() {
        //setStatus(STREAM_STATUS.STOPPED);
        //onStopped();
      })
      .on(this.props.STREAM_STATUS.FAILED, function() {
        //setStatus(STREAM_STATUS.FAILED);
        //onStopped();
      })
      .play();
  }

  start() {
    let self = this;
    console.log("Create new session with url");
    Flashphoner.createSession({
      urlServer: "wss://server.witheyezon.com:8443"
    })
      .on(this.props.SESSION_STATUS.ESTABLISHED, function(session) {
        //setStatus(session.status());
        //session connected, start playback
        if (self.props.mountFunction) {
          console.log("Trying to mount");
          self.props.mountFunction();
        }
        self.playStream(session, self.props.dialogId);
      })
      .on(this.props.SESSION_STATUS.DISCONNECTED, function() {
        //setStatus(SESSION_STATUS.DISCONNECTED);
        //onStopped();
      })
      .on(this.props.SESSION_STATUS.FAILED, function() {
        //setStatus(SESSION_STATUS.FAILED);
        //onStopped();
      });
  }

  componentDidUpdate(prevProps) {
    let self = this;
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      console.log("IOS", this.props.iOS);
      if (
        isSafari ||
        this.props.iOS ||
        Flashphoner.getMediaProviders()[0] === "MSE"
      ) {
        console.log("IOS or IOS mobile");
        Flashphoner.playFirstVideo(
          self.player,
          false,
          self.props.PRELOADER_URL
        ).then(function() {
          self.start();
        });
      } else {
        this.start();
      }
    } else if (this.props.visible !== prevProps.visible) {
      if (this.props.unmountFunction) {
        this.props.unmountFunction();
      }
      if (this.state.stream /*&& !this.props.iOS*/) {
        this.state.stream.stop();
      }
    }
  }

  render() {
    return (
      <VideoElement
        ref={element => {
          this.player = element;
        }}
      />
    );
  }
}

/*<iframe
            id="fp_embed_player"
            src={`https://server.witheyezon.com:8444/embed_player?urlServer=wss://server.witheyezon.com:8443&streamName=${this.props.dialogId}&mediaProviders=WebRTC,Flash,MSE,WSPlayer`}
            marginWidth="0"
            marginHeight="0"
            frameBorder="0"
            scrolling="no"
            allowFullScreen="allowfullscreen"
          />*/

export default UnmountTracker;
