import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { deleteStream } from "../actions";

function AlertDialog(props) {
  const { show, handleAlertDialog, streamId, deleteStream } = props;

  function handleDelete() {
    deleteStream(streamId);
    handleAlertDialog();
  }

  return ReactDOM.createPortal(
    <div
      className={`modal fade ${show ? "d-block show" : "d-none"}`}
      style={{ paddingRight: "17px", background: "#45454878" }}
      onClick={() => handleAlertDialog()}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-body">
            <strong>Are you sure ?</strong>
          </div>
          <div className="modal-footer borderless">
            <button
              type="button"
              className="btn btn-secondary p-0 px-2"
              onClick={() => handleAlertDialog()}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary p-0 px-2"
              onClick={() => handleDelete()}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#alertdialog")
  );
}

export default connect(
  null,
  { deleteStream }
)(AlertDialog);
