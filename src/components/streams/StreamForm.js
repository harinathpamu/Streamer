import React from "react";
import { Field, reduxForm } from "redux-form";
import Container from "../hoc/Container";
import { CREATE_STREAM_MODE, EDIT_STREAM_MODE } from "../../utilities";

class StreamForm extends React.Component {
  renderInput = ({ input, label, type }) => {
    return (
      <div className="form-group">
        <label htmlFor="formControlRange">{label}</label>
        <input
          className="form-control"
          {...input}
          type={type}
          placeholder={label}
          required
        />
      </div>
    );
  };

  onSubmit = formValues => {
    const fv = {
      ...formValues,
      title: formValues.title.trim(),
      description: formValues.description.trim()
    };
    if (fv.title !== "" && fv.description !== "") {
      this.props.onSubmit(fv);
    }
  };

  resolveMode = MODE => {
    if (MODE === EDIT_STREAM_MODE) {
      return "Update Stream";
    } else if (MODE === CREATE_STREAM_MODE) {
      return "Create Stream";
    }
  };

  render() {
    const { handleSubmit, isSignedIn, mode } = this.props;
    return (
      <Container>
        <div className="row">
          <div className="col col-md-6 mx-auto border p-4 rounded">
            {isSignedIn ? (
              <React.Fragment>
                <p className="h1 mb-3">{this.resolveMode(mode)}</p>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                  <Field
                    name="title"
                    type="text"
                    label="Title"
                    component={this.renderInput}
                  />
                  <Field
                    name="description"
                    type="text"
                    label="Description"
                    component={this.renderInput}
                  />
                  <div className="text-right">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm text-center text-uppercase"
                    >
                      {this.resolveMode(mode)}
                    </button>
                  </div>
                </form>
              </React.Fragment>
            ) : (
              <p className="text-success text-center h4">Please Sign In </p>
            )}
          </div>
        </div>
      </Container>
    );
  }
}

export default reduxForm({
  form: "StreamCreateForm"
})(StreamForm);
