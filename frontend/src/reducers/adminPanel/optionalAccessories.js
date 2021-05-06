import * as actions from '../../actions/adminPanel/optionalAccessories';

const initialState = {
  loaded: false,
  inited: false,
  error: false,
  items: [],
};

export default function optionalAccessories(state = initialState, action = {}) {
  switch (action.type) {

    // CREATE
    case actions.REQUEST_CREATE_OPTIONAL_ACCESSORIES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_CREATE_OPTIONAL_ACCESSORIES:
      return {
        ...state,
        items: [...state.items, action.payload],
        loaded: true,
        error: false,
      };

    case actions.FAILURE_CREATE_OPTIONAL_ACCESSORIES:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // UPDATE
    case actions.REQUEST_UPDATE_OPTIONAL_ACCESSORIES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_UPDATE_OPTIONAL_ACCESSORIES:
      const payload = action.payload || [];
      return {
        ...state,
        items: state.items.map((item) => item.vid === payload.vid ? payload : item),
        loaded: true,
        error: false,
      };

    case actions.FAILURE_UPDATE_OPTIONAL_ACCESSORIES:
      return {
        ...state,
        loaded: true,
        error: true,
      };


    // READ
    case actions.REQUEST_OPTIONAL_ACCESSORIES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_OPTIONAL_ACCESSORIES:
      const items = action.payload || [];
      return {
        ...state,
        items: items,
        loaded: true,
        inited: true,
        error: false,
      };

    case actions.FAILURE_OPTIONAL_ACCESSORIES:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // DELETE
    case actions.REQUEST_DELETE_OPTIONAL_ACCESSORIES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_DELETE_OPTIONAL_ACCESSORIES:
      const id = action.payload || [];
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
        loaded: true,
        error: false,
      };

    case actions.FAILURE_DELETE_OPTIONAL_ACCESSORIES:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    default:
      return state;
  }
}