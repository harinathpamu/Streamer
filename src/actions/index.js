import streams from "../api/streams";
import history from "../history";
import {
  NOTIFY,
  SIGN_IN,
  SIGN_OUT,
  FETCH_ALL_STREAMS,
  CREATE_STREAM,
  GET_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "../utilities";

export const notify = notification_msg => {
  return {
    type: NOTIFY,
    payload: notification_msg
  };
};

export const signIn = (isSignedIn, profile, userId) => {
  return {
    type: SIGN_IN,
    payload: { isSignedIn, profile, userId }
  };
};

export const signOut = (isSignedIn, profile, userId) => {
  return {
    type: SIGN_OUT,
    payload: { isSignedIn, profile, userId }
  };
};

export const fetchAllStreams = () => {
  return async function(dispatch) {
    const response = await streams.get("/streams");
    dispatch({
      type: FETCH_ALL_STREAMS,
      payload: response.data
    });
  };
};

export const createStream = formValues => {
  return async function(dispatch, getState) {
    const { userId } = getState().userInfo;
    const response = await streams.post("/streams", { ...formValues, userId });
    if (response.status === 201) {
      dispatch({ type: NOTIFY, payload: "Stream created successfully" });
      setTimeout(() => {
        dispatch({ type: NOTIFY, payload: "Stream created successfully" });
      }, 5000);
      history.push("/streams");
    }
    dispatch({
      type: CREATE_STREAM,
      payload: response.data
    });
  };
};

export const getStream = stream_id => {
  return async function(dispatch) {
    const response = await streams.get(`/streams/${stream_id}`);
    dispatch({
      type: GET_STREAM,
      payload: response.data
    });
  };
};

export const editStream = (stream_id, formValues) => {
  return async function(dispatch) {
    const response = await streams.patch(`/streams/${stream_id}`, formValues);
    if (response.status === 200) {
      dispatch({ type: NOTIFY, payload: "Stream updated successfully" });
      setTimeout(() => {
        dispatch({ type: NOTIFY, payload: "Stream updated successfully" });
      }, 5000);
      history.push("/streams");
    }
    dispatch({
      type: EDIT_STREAM,
      payload: response.data
    });
  };
};

export const deleteStream = stream_id => {
  return async function(dispatch) {
    const response = await streams.delete(`/streams/${stream_id}`);
    if (response.status === 200) {
      dispatch({ type: NOTIFY, payload: "Stream deleted successfully" });
      setTimeout(() => {
        dispatch({ type: NOTIFY, payload: "Stream deleted successfully" });
      }, 5000);
    }
    dispatch({
      type: DELETE_STREAM,
      payload: stream_id
    });
  };
};
