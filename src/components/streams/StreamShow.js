import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { getStream } from "../../actions";
import Container from "../hoc/Container";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { stream_id } = this.props.match.params;
    this.props.getStream(stream_id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    if (this.player) this.player.destroy();
  }

  buildPlayer = () => {
    if (this.player || !this.props.stream) {
      return;
    }
    const { stream_id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://192.168.0.2:8000/live/${stream_id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  };

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Please wait ... </div>;
    }
    return (
      <Container>
        <div className="row align-items-start">
          <div className="col">
            <video ref={this.videoRef} controls className="w-100"></video>
          </div>
          <div className="w-100" />
          <div className="col">
            <p className="h3">{stream.title}</p>
            <p className="h6">{stream.description}</p>
          </div>
        </div>
      </Container>
    );
  }
}

const getState = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.stream_id],
    isSignedIn: state.userInfo.isSignedIn
  };
};

export default connect(
  getState,
  { getStream }
)(StreamShow);
