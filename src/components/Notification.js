import React from "react";
import { connect } from "react-redux";

function Notification(props) {
  return (
    <div
        className={`toast fade position-absolute ${
          props.notify.notify ? "d-block show" : "d-none"
        }`}
        style={{ top: "20px", right: "10px", zIndex: "1" }}
      >
        <div className="toast-header">
          <strong className="mr-auto text-success">Notification</strong>
        </div>
        <div className="toast-body">{props.notify.msg}</div>
      </div>
    // <div className="position-relative">
      
    // </div>
  );
}

const getState = state => {
  return {
    notify: state.notify
  };
};

export default connect(getState)(Notification);
