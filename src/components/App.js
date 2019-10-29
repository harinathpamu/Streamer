import React from "react";
import Header from "./Header";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

function App() {
  return (
    <React.Fragment>
      <Router history={history}>
        <Header />
        <div className="container-fluid position-relative">
          <Switch>
            <Route path="/streams" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route
              path="/streams/edit/:stream_id"
              exact
              component={StreamEdit}
            />
            <Route path="/stream/:stream_id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
