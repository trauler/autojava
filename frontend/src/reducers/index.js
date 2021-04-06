import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import clients from './clients';
import autoNodes from './autoNodes';
import autoParts from './autoParts';
import adminOptionalAccessories from './adminPanel/optionalAccessories';
import adminServiceTypes from './adminPanel/serviceTypes';
import adminServices from './adminPanel/services';
import multiStepsForm from './multiStepsForm';
import order from './order';
import orders from './orders';
import services from './services';
import user from './user';
import users from './users';
import warehouses from './warehouses';
import workshops from './workshops';
import warehouseAutoParts from './warehouseAutoParts';
import workshopStations from './workshopStations';

// Import other reducers
//import config from './config';

const getRootReducer = (history) => {
  const reduxHistory = { ...history };
  const appReducer = combineReducers({
    reduxHistory: (state = reduxHistory) => ({
      ...reduxHistory,
      ...state,
    }),
    router: connectRouter(history),
    // Other reducers
    clients,
    autoNodes,
    autoParts,
    adminOptionalAccessories,
    adminServiceTypes,
    adminServices,
    multiStepsForm,
    order,
    orders,
    services,
    user,
    users,
    warehouses,
    warehouseAutoParts,
    workshops,
    workshopStations
  });
  const rootReducer = (state, action) => appReducer(state, action);

  return rootReducer;
};

export default getRootReducer;
