import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import State from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
  <Provider
    store={createStore(State, composeEnhancers(applyMiddleware(Thunk)))}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
