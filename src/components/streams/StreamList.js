import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../hoc/Container";
import AlertDialog from "../AlertDialog";
import { fetchAllStreams, deleteStream } from "../../actions";

class StreamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertOpen: false,
      deleteId: null
    };
  }

  componentDidMount() {
    this.props.fetchAllStreams();
  }

  handleDelete = stream_id => {
    this.setState({ alertOpen: true, deleteId: stream_id });
  };

  renderList = userId => {
    return this.props.streams.map(stream => {
      return (
        <li key={stream.id} className="list-group-item">
          <div className="d-flex align-items-center">
            <span className="h1 align-middle mr-3">📽</span>
            <div className="flex-grow-1">
              <Link
                type="text"
                className="h5 text-info"
                to={`/stream/${stream.id}`}
              >
                {stream.title}
              </Link>
              <p className="m-0">{stream.description}</p>
            </div>
            {userId === stream.userId ? (
              <React.Fragment>
                <Link
                  to={`/streams/edit/${stream.id}`}
                  className="h5 align-middle mx-2 "
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  ✏
                </Link>
                <span
                  className="h5 align-middle mx-2"
                  onClick={() => this.handleDelete(stream.id)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  🗑
                </span>
              </React.Fragment>
            ) : null}
          </div>
        </li>
      );
    });
  };

  handleAlertDialog = () => {
    this.setState({ alertOpen: !this.state.alertOpen });
  };

  render() {
    return (
      <Container>
        <AlertDialog
          show={this.state.alertOpen}
          handleAlertDialog={this.handleAlertDialog}
          streamId={this.state.deleteId}
        />
        <div className="row align-items-center">
          <div className="col col-md-10 mx-auto p-4">
            <div className="row align-items-center">
              <div className="col">
                <p className="h1">Now Streaming</p>
              </div>
              <div className="col-auto">
                <span
                  className="h3"
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  📽
                </span>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              {this.renderList(this.props.userId)}
            </ul>
          </div>
        </div>
      </Container>
    );
  }
}

const getState = state => {
  return {
    streams: Object.values(state.streams),
    userId: state.userInfo.userId
  };
};

export default connect(
  getState,
  { fetchAllStreams, deleteStream }
)(StreamList);
