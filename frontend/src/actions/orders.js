import { getJSON } from 'redux-api-middleware';
import { getServices } from './services'
import { getUsers } from './users';
import { getOrdersUrl } from '../selectors/urls';
import { callAuthApiJSON } from '../helpers/api';
import { formatOrdersData } from '../helpers/data';


const REQUEST_ORDERS = 'REQUEST_ORDERS';
const SUCCESS_ORDERS = 'SUCCESS_ORDERS';
const FAILURE_ORDERS = 'FAILURE_ORDERS';


const getOrders = () => (dispatch, getState) => {
  const request = {
    endpoint: getOrdersUrl(),
    types: [
      REQUEST_ORDERS,
      {
        type: SUCCESS_ORDERS,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => formatOrdersData(json));
        },
      },
      FAILURE_ORDERS,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const getServiceEditData = () => (dispatch, getState) => {
  return Promise.all([dispatch(getServices()), dispatch(getUsers())]);
};

export {
  REQUEST_ORDERS,
  SUCCESS_ORDERS,
  FAILURE_ORDERS,
  getServiceEditData,
  getOrders,
};