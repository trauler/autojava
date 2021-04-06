import * as actions from '../actions/autoParts';

const initialState = {
  loaded: false,
  inited: false,
  error: false,
  items: [],
};

export default function autoParts(state = initialState, action = {}) {
  switch (action.type) {

    // CREATE
    case actions.REQUEST_CREATE_AUTO_PARTS:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_CREATE_AUTO_PARTS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loaded: true,
        error: false,
      };

    case actions.FAILURE_CREATE_AUTO_PARTS:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // UPDATE
    case actions.REQUEST_UPDATE_AUTO_PARTS:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_UPDATE_AUTO_PARTS:
      const payload = action.payload;
      return {
        ...state,
        items: state.items.map((item) => item.vid === payload.vid ? payload : item),
        loaded: true,
        error: false,
      };

    case actions.FAILURE_UPDATE_AUTO_PARTS:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // READ
    case actions.REQUEST_AUTO_PARTS:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_AUTO_PARTS:
      const items = action.payload || [];
      return {
        ...state,
        items: items,
        loaded: true,
        inited: true,
        error: false,
      };

    case actions.FAILURE_AUTO_PARTS:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // DELETE
    case actions.REQUEST_DELETE_AUTO_PARTS:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_DELETE_AUTO_PARTS:
      const id = action.payload || [];
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
        loaded: true,
        error: false,
      };

    case actions.FAILURE_DELETE_AUTO_PARTS:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    default:
      return state;
  }
}