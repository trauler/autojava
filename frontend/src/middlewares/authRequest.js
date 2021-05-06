import { callApi, callApiJSON } from "../helpers/api";

const requestMiddleware = ({ getState, dispatch }) => {
  return next => action => {
    if (action.type)
      return next(action);
    const { configs, callJson } = action;
    const { user: { token = '' } = {} } = getState();
    const tokenType = 'Bearer';
    if (callJson)
      return dispatch(callApiJSON({
        ...configs,
        headers: {
          ...configs.headers,
          Authorization: `${tokenType} ${token}`,
        }
      }));
    else
      return dispatch(callApi({
        ...configs,
        headers: {
          ...configs.headers,
          Authorization: `${tokenType} ${token}`,
        }
      }));
  }
}

export default requestMiddleware;