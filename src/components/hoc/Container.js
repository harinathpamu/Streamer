import React from "react";
import Notification from "../Notification";

function Container(props) {
  return (
    <React.Fragment>
      <Notification />
      <div className="container pt-5">{props.children}</div>
    </React.Fragment>
  );
}

export default Container;
