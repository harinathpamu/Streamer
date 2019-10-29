import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: false,
    name: "",
    visible: false
  };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "xxxxxxxxxxxxxxx",
          scope: "profile"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(
            this.auth.isSignedIn.get(),
            this.auth.currentUser.get().getBasicProfile()
          );
          this.auth.isSignedIn.listen(() =>
            this.onAuthChange(
              this.auth.isSignedIn.get(),
              this.auth.currentUser.get().getBasicProfile()
            )
          );
        });
    });
  }

  onAuthChange = (isSignedIn, profile) => {
    if (isSignedIn) {
      this.props.signIn(isSignedIn, profile.getName(), profile.getId());
    } else {
      this.props.signOut(isSignedIn, "blankName", "blankId");
    }
  };

  handleLogin = () => {
    if (this.state.isSignedIn) {
      this.auth.signOut();
    } else {
      this.auth.signIn();
    }
  };

  onMouseOverHandler = () => {
    this.setState({ visible: true });
  };

  onMouseLeaveHandler = () => {
    this.setState({ visible: false });
  };

  componentWillReceiveProps(props) {
    this.setState({ isSignedIn: props.isSignedIn, name: props.profile });
  }

  render() {
    return (
      <span
        onClick={this.handleLogin}
        onMouseOver={this.onMouseOverHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        className="nav-link align-middle text-white rounded"
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        {!this.state.isSignedIn ? (
          <img
            className="mb-1 mx-1"
            alt="google icon"
            src="https://auth.udacity.com/static/media/google_logo.12018216.svg"
            width="22px"
          />
        ) : null}
        {this.state.isSignedIn
          ? !this.state.visible
            ? "   " + this.state.name
            : "Sign Out"
          : "  Sign In"}
      </span>
    );
  }
}

const getState = state => {
  return state.userInfo;
};

export default connect(
  getState,
  { signIn, signOut }
)(GoogleAuth);
