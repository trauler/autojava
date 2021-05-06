import * as actions from '../actions/services';

const initialState = {
  loaded: false,
  inited: false,
  error: false,
  items: [],
};

export default function services(state = initialState, action = {}) {
  
  switch (action.type) {
    case actions.REQUEST_SERVICES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_SERVICES: {
      const items = action.payload || {};
      return {
        ...state,
        items: items,
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.FAILURE_SERVICES:
      return {
        ...state,
        loaded: true,
        error: true,
      };
  
    default:
      return state;
  }
};
