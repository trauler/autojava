import * as actions from '../actions/order';

const initialState = {
  loaded: false,
  inited: false,
  error: false,
  item: {},
};

export default function order(state = initialState, action = {}) {
  switch (action.type) {

    // CREATE
    case actions.REQUEST_CREATE_ORDER:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_CREATE_ORDER:
      return {
        ...state,
        loaded: true,
        error: false,
      };

    case actions.FAILURE_CREATE_ORDER:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // READ
    case actions.REQUEST_ORDER:
      return initialState;

    case actions.SUCCESS_ORDER:
      const item = action.payload || {};
      return {
        ...state,
        item: item,
        loaded: true,
        inited: true,
        error: false,
      };

    case actions.FAILURE_ORDER:
      return {
        ...state,
        loaded: true,
        error: true,
      };
    
    default:
      return state;
  }
}