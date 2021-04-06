import * as actions from '../../actions/adminPanel/services';

const initialState = {
  loaded: false,
  inited: false,
  error: false,
  items: [],
};

export default function services(state = initialState, action = {}) {
  
  switch (action.type) {

    // CREATE
    case actions.ADMIN_REQUEST_CREATE_SERVICES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.ADMIN_SUCCESS_CREATE_SERVICES: {
      const successPayload = action.payload || {};
      return {
        ...state,
        items: [...state.items, successPayload],
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.ADMIN_FAILURE_CREATE_SERVICES:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // READ
    case actions.ADMIN_REQUEST_SERVICES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.ADMIN_SUCCESS_SERVICES: {
      const items = action.payload || {};
      return {
        ...state,
        items: items,
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.ADMIN_FAILURE_SERVICES:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // UPDATE
    case actions.ADMIN_REQUEST_UPDATE_SERVICES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.ADMIN_SUCCESS_UPDATE_SERVICES: {
      const updatePayload = action.payload || {};
      return {
        ...state,
        items: state.items.map((i) => (i.vid === updatePayload.vid) ? updatePayload : i),
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.ADMIN_FAILURE_UPDATE_SERVICES:
      return {
        ...state,
        loaded: true,
        error: true,
      };
    
    // DELETE
    case actions.ADMIN_REQUEST_DELETE_SERVICES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.ADMIN_SUCCESS_DELETE_SERVICES: {
      const id = action.payload || {};
      return {
        ...state,
        items: state.items.filter((i) => i.id !== id),
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.ADMIN_FAILURE_DELETE_SERVICES:
      return {
        ...state,
        loaded: true,
        error: true,
      };

  
    default:
      return state;
  }
};
