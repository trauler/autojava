import { getJSON } from 'redux-api-middleware';
import { callApiJSON } from '../helpers/api';
import { getAuthUrl } from "../selectors/urls";
import { createAction } from 'redux-actions';


const REQUEST_USER_AUTH = 'REQUEST_USER_AUTH';
const SUCCESS_USER_AUTH = 'SUCCESS_USER_AUTH';
const FAILURE_USER_AUTH = 'FAILURE_USER_AUTH';

const SUCCESS_USER_LOGOUT = 'SUCCESS_USER_LOGOUT';

const authSuccess = createAction(SUCCESS_USER_AUTH);
const logoutSuccess = createAction(SUCCESS_USER_LOGOUT);

const tryLogin = () => (dispatch, getState) => {
  const token = localStorage.getItem('tokenData');
  const name = localStorage.getItem('userName');

  if (token && name) {
    dispatch(authSuccess({ token, user: { name } }));
  }
}


const userAuth = (data) => (dispatch, getState) => {
  const request = {
    method: 'POST',
    endpoint: getAuthUrl(),
    data,
    types: [
      REQUEST_USER_AUTH,
      {
        type: SUCCESS_USER_AUTH,
        payload: (action, s, res) => {
          console.log(res);
          return getJSON(res)
            .then(json => {
              const { token, user: { name } = {} } = json;
              if (token) saveToken(token);
              if (name) DEV__saveUserName(name);
              return json;
            });
        },
      },
      FAILURE_USER_AUTH,
    ],
  };
  return dispatch(callApiJSON(request));
};

const userLogOut = () => (dispatch, getState) => {
  localStorage.removeItem('tokenData');
  localStorage.removeItem('userName');
  return dispatch(logoutSuccess());
}

const saveToken = (token) => {
  localStorage.setItem('tokenData', token);
}

const DEV__saveUserName = (name) => {
  localStorage.setItem('userName', name);
}

export {
  REQUEST_USER_AUTH,
  SUCCESS_USER_AUTH,
  FAILURE_USER_AUTH,
  SUCCESS_USER_LOGOUT,
  tryLogin,
  userAuth,
  userLogOut,
}