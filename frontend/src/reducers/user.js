import * as actions from '../actions/user';

const initialState = {
  loaded: true,
  error: false,
  isLoggedIn: false,
  token: null,
  name: '',
};

export default function user(state = initialState, action = {}) {
  
  switch (action.type) {
    case actions.REQUEST_USER_AUTH:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_USER_AUTH: {
      const { token, user: { name } = {} } = action.payload || {};
      return {
        ...state,
        loaded: true,
        error: false,
        isLoggedIn: true,
        token: token,
        name: name,
      };
    }

    case actions.FAILURE_USER_AUTH:
      return {
        ...state,
        loaded: true,
        error: true,
      };


    case actions.SUCCESS_USER_LOGOUT:
      return initialState;
  
    default:
      return state;
  }
};
