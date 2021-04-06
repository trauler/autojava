import * as actions from '../../actions/adminPanel/serviceTypes';

const initialState = {
  loaded: false,
  inited: false,
  error: false,
  items: [],
};

export default function serviceTypes(state = initialState, action = {}) {
  switch (action.type) {

    // CREATE
    case actions.REQUEST_CREATE_SERVICE_TYPES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_CREATE_SERVICE_TYPES: {
      const successPayload = action.payload || {};
      return {
        ...state,
        items: [...state.items, successPayload],
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.FAILURE_CREATE_SERVICE_TYPES:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // READ
    case actions.REQUEST_SERVICE_TYPES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_SERVICE_TYPES: {
      const items = action.payload || {};
      return {
        ...state,
        items: items,
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.FAILURE_SERVICE_TYPES:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // UPDATE
    case actions.REQUEST_UPDATE_SERVICE_TYPES:
      return {
       ...state,
       loaded: false,
       error: false,
      };

    case actions.SUCCESS_UPDATE_SERVICE_TYPES: {
      const updatePayload = action.payload || {};
      return {
        ...state,
        items: state.items.map((i) => (i.vid === updatePayload.vid) ? updatePayload : i),
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.FAILURE_UPDATE_SERVICE_TYPES:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    // DELETE
    case actions.REQUEST_DELETE_SERVICE_TYPES:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_DELETE_SERVICE_TYPES: {
      const id = action.payload || {};
      return {
        ...state,
        items: state.items.filter((i) => i.id !== id),
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.FAILURE_DELETE_SERVICE_TYPES:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    default:
      return state;
  }
};
