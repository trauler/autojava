import queryString from 'qs';
import { getJSON } from 'redux-api-middleware';
import { getOrdersUrl } from '../selectors/urls';
import { callAuthApiJSON } from '../helpers/api';
import { formatOrderData } from '../helpers/data';


const REQUEST_ORDER = 'REQUEST_ORDER';
const SUCCESS_ORDER = 'SUCCESS_ORDER';
const FAILURE_ORDER = 'FAILURE_ORDER';

const REQUEST_CREATE_ORDER = 'REQUEST_CREATE_ORDER';
const SUCCESS_CREATE_ORDER = 'SUCCESS_CREATE_ORDER';
const FAILURE_CREATE_ORDER = 'FAILURE_CREATE_ORDER';


const createOrder = (workshopId) => (dispatch, getState) => {
  const query = queryString.stringify({ workshop: workshopId }, {
    skipNulls: true,
    arrayFormat: 'repeat',
  });
  
  const request = {
    method: 'POST',
    endpoint: `${getOrdersUrl()}?${query}`,
    types: [
      REQUEST_CREATE_ORDER,
      {
        type: SUCCESS_CREATE_ORDER,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => json.id);
        },
      },
      FAILURE_CREATE_ORDER,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};


const getOrder = (id) => (dispatch, getState) => {
  const request = {
    endpoint: getOrdersUrl(id),
    types: [
      REQUEST_ORDER,
      {
        type: SUCCESS_ORDER,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => formatOrderData(json));
        },
      },
      FAILURE_ORDER,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

export {
  REQUEST_CREATE_ORDER,
  SUCCESS_CREATE_ORDER,
  FAILURE_CREATE_ORDER,
  REQUEST_ORDER,
  SUCCESS_ORDER,
  FAILURE_ORDER,
  getOrder,
  createOrder,
};