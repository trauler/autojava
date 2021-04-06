import {
  getWarehousesUrl,
} from "../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import {
  callAuthApiJSON,
  callAuthApi
} from '../helpers/api';

const REQUEST_CREATE_WAREHOUSES = 'REQUEST_CREATE_WAREHOUSES';
const SUCCESS_CREATE_WAREHOUSES = 'SUCCESS_CREATE_WAREHOUSES';
const FAILURE_CREATE_WAREHOUSES = 'FAILURE_CREATE_WAREHOUSES';

const REQUEST_UPDATE_WAREHOUSES = 'REQUEST_UPDATE_WAREHOUSES';
const SUCCESS_UPDATE_WAREHOUSES = 'SUCCESS_UPDATE_WAREHOUSES';
const FAILURE_UPDATE_WAREHOUSES = 'FAILURE_UPDATE_WAREHOUSES';

const REQUEST_WAREHOUSES = 'REQUEST_WAREHOUSES';
const SUCCESS_WAREHOUSES = 'SUCCESS_WAREHOUSES';
const FAILURE_WAREHOUSES = 'FAILURE_WAREHOUSES';

const REQUEST_DELETE_WAREHOUSES = 'REQUEST_DELETE_WAREHOUSES';
const SUCCESS_DELETE_WAREHOUSES = 'SUCCESS_DELETE_WAREHOUSES';
const FAILURE_DELETE_WAREHOUSES = 'FAILURE_DELETE_WAREHOUSES';

const createWarehouses = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getWarehousesUrl(item.id),
    method: 'POST',
    data: item,
    types: [
      REQUEST_CREATE_WAREHOUSES,
      {
        type: SUCCESS_CREATE_WAREHOUSES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_CREATE_WAREHOUSES
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const updateWarehouses = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getWarehousesUrl(item.id),
    method: 'PUT',
    data: item,
    types: [
      REQUEST_UPDATE_WAREHOUSES,
      {
        type: SUCCESS_UPDATE_WAREHOUSES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_UPDATE_WAREHOUSES
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const getWarehouses = () => (dispatch, getState) => {
  const request = {
    endpoint: getWarehousesUrl(),
    types: [
      REQUEST_WAREHOUSES,
      {
        type: SUCCESS_WAREHOUSES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_WAREHOUSES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const deleteWarehouses = (id) => (dispatch, getState) => {
  const request = {
    endpoint: getWarehousesUrl(id),
    method: 'DELETE',
    types: [
      REQUEST_DELETE_WAREHOUSES,
      {
        type: SUCCESS_DELETE_WAREHOUSES,
        payload: () => id
      },
      FAILURE_DELETE_WAREHOUSES
    ]
  }
  return dispatch(callAuthApi(request));
}

export {
  REQUEST_CREATE_WAREHOUSES,
  SUCCESS_CREATE_WAREHOUSES,
  FAILURE_CREATE_WAREHOUSES,
  REQUEST_UPDATE_WAREHOUSES,
  SUCCESS_UPDATE_WAREHOUSES,
  FAILURE_UPDATE_WAREHOUSES,
  REQUEST_WAREHOUSES,
  SUCCESS_WAREHOUSES,
  FAILURE_WAREHOUSES,
  REQUEST_DELETE_WAREHOUSES,
  SUCCESS_DELETE_WAREHOUSES,
  FAILURE_DELETE_WAREHOUSES,
  createWarehouses,
  updateWarehouses,
  getWarehouses,
  deleteWarehouses,
}