import React from "react";
import StreamForm from "./StreamForm";
import { connect } from "react-redux";
import _ from "lodash";
import { editStream, getStream } from "../../actions";
import { EDIT_STREAM_MODE } from "../../utilities";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.getStream(this.props.match.params.stream_id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.stream_id, formValues);
  };

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Please wait ... </div>;
    }
    return (
      <StreamForm
        initialValues={_.pick(stream, "title", "description")}
        onSubmit={this.onSubmit}
        mode={EDIT_STREAM_MODE}
        isSignedIn={this.props.isSignedIn}
      />
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
  { editStream, getStream }
)(StreamEdit);
