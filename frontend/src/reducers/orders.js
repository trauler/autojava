import * as actions from '../actions/orders';

const initialState = {
  loaded: false,
  inited: false,
  error: false,
  items: [],
};

export default function orders(state = initialState, action = {}) {
  switch (action.type) {
    
    // READ
    case actions.REQUEST_ORDERS:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_ORDERS:
      const items = action.payload || [];
      return {
        ...state,
        items: items,
        loaded: true,
        inited: true,
        error: false,
      };

    case actions.FAILURE_ORDERS:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // DELETE
    case actions.REQUEST_DELETE_ORDER:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_DELETE_ORDER:
      const id = action.payload || [];
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
        loaded: true,
        error: false,
      };

    case actions.FAILURE_DELETE_ORDER:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    default:
      return state;
  }
}