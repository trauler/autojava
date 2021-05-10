import * as actions from '../actions/clients';

const initialState = {
  loaded: false,
  inited: false,
  error: false,
  items: [],
  carsLoaded: false,
  carsError: false,
  carsItems: {},
};

export default function clients(state = initialState, action = {}) {

  switch (action.type) {
    case actions.REQUEST_CLIENTS:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_CLIENTS: {
      const items = action.payload || {};
      return {
        ...state,
        items: items,
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.FAILURE_CLIENTS:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    case actions.REQUEST_SAVE_CLIENT:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_SAVE_CLIENT: {
      const actionItem = action.payload || {};
      const newItems = [];
      let itemFounded = false;
      state.items.forEach((item) => {

        if (item.id === actionItem.id) {
          newItems.push(actionItem);
          itemFounded = true;
        } else newItems.push(item);
      });
      if (!itemFounded) newItems.push(actionItem);

      return {
        ...state,
        items: newItems,
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.FAILURE_SAVE_CLIENT:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    case actions.REQUEST_UPDATE_CLIENT:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_UPDATE_CLIENT:
      return {
        ...state,
        loaded: true,
        error: false,
      };

    case actions.FAILURE_UPDATE_CLIENT:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    case actions.REQUEST_CLIENT_CARS:
      return {
        ...state,
        carsLoaded: false,
        carsError: false,
      };

    case actions.SUCCESS_CLIENT_CARS: {
      const items = { ...state.carsItems };
      const { id: clientId, items: carItems } = action.payload || {};
      items[clientId] = carItems;
      return {
        ...state,
        carsItems: items,
        carsLoaded: true,
        carsError: false,
      };
    }

    case actions.FAILURE_CLIENT_CARS:
      return {
        ...state,
        carsLoaded: true,
        carsError: true,
      };

    case actions.REQUEST_SAVE_CLIENT_CAR:
      return {
        ...state,
        carsLoaded: false,
        carsError: false,
      };

    case actions.SUCCESS_CREATE_CLIENT_CAR: {
      const items = { ...state.carsItems };
      const { id: clientId, item: carItem } = action.payload || {};
      items[clientId] = [ ...items[clientId], carItem ];
      return {
        ...state,
        carsItems: items,
        carsLoaded: true,
        carsError: false,
      };
    }

    case actions.SUCCESS_SAVE_CLIENT_CAR: {
      const items = { ...state.carsItems };
      const { id: clientId, item: carItem } = action.payload || {};
      const { id } = carItem;
      const newItems = items[clientId].map((item) => {
        if (item.id === id) return carItem;
        else return item;
      });
      items[clientId] = newItems;
      return {
        ...state,
        carsItems: items,
        carsLoaded: true,
        carsError: false,
      };
    }

    case actions.FAILURE_SAVE_CLIENT_CAR:
      return {
        ...state,
        carsLoaded: true,
        carsError: true,
      };

    // DELETE
    case actions.REQUEST_DELETE_CLIENT_CAR:
      return {
        ...state,
        carsLoaded: false,
        carsError: false,
      };

    case actions.SUCCESS_DELETE_CLIENT_CAR:
      const id = action.payload || [];
      return {
        ...state,
        carsItems: state.carsItems.filter((item) => item.id !== id),
        carsLoaded: true,
        carsError: false,
      };

    case actions.FAILURE_DELETE_CLIENT_CAR:
      return {
        ...state,
        carsLoaded: true,
        carsError: true,
      };

    default:
      return state;
  }
};
