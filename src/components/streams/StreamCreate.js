import React from "react";
import StreamForm from "./StreamForm";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import { CREATE_STREAM_MODE } from "../../utilities";

class StreamCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <StreamForm
        mode={CREATE_STREAM_MODE}
        onSubmit={this.onSubmit}
        isSignedIn={this.props.isSignedIn}
      />
    );
  }
}

const getState = state => {
  return {
    isSignedIn: state.userInfo.isSignedIn
  };
};

export default connect(
  getState,
  { createStream }
)(StreamCreate);
