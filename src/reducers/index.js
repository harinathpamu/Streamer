import _ from "lodash";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_ALL_STREAMS,
  CREATE_STREAM,
  GET_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  NOTIFY
} from "../utilities";

const initUserInfo = { isSignedIn: false, profile: "", userId: "" };
const initNotify = { notify: false, msg: "Test msg" };

const notify = (state = initNotify, action) => {
  if (action.type === NOTIFY) {
    return { notify: !state.notify, msg: action.payload };
  } else {
    return state;
  }
};

const handleAuth = (state = initUserInfo, action) => {
  if (action.type === SIGN_IN) {
    return action.payload;
  } else if (action.type === SIGN_OUT) {
    return action.payload;
  } else {
    return state;
  }
};

const resolveStreams = (state = {}, action) => {
  if (action.type === FETCH_ALL_STREAMS) {
    return { ...state, ..._.mapKeys(action.payload, "id") };
  } else if (action.type === CREATE_STREAM) {
    return { ...state, [action.payload.id]: action.payload };
  } else if (action.type === GET_STREAM) {
    return { ...state, [action.payload.id]: action.payload };
  } else if (action.type === EDIT_STREAM) {
    return { ...state, [action.payload.id]: action.payload };
  } else if (action.type === DELETE_STREAM) {
    return _.omit(state, action.payload);
  } else {
    return state;
  }
};

export default combineReducers({
  notify,
  userInfo: handleAuth,
  form: formReducer,
  streams: resolveStreams
});
