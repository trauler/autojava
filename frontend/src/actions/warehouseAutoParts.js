import {
  getWarehouseAutoPartsUrl,
} from "../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import {
  callAuthApiJSON,
  callAuthApi
} from '../helpers/api';
import { getWarehouses } from './warehouses';
import { getAutoParts } from './autoParts';

const REQUEST_CREATE_WAREHOUSE_AUTO_PARTS = 'REQUEST_CREATE_WAREHOUSE_AUTO_PARTS';
const SUCCESS_CREATE_WAREHOUSE_AUTO_PARTS = 'SUCCESS_CREATE_WAREHOUSE_AUTO_PARTS';
const FAILURE_CREATE_WAREHOUSE_AUTO_PARTS = 'FAILURE_CREATE_WAREHOUSE_AUTO_PARTS';

const REQUEST_UPDATE_WAREHOUSE_AUTO_PARTS = 'REQUEST_UPDATE_WAREHOUSE_AUTO_PARTS';
const SUCCESS_UPDATE_WAREHOUSE_AUTO_PARTS = 'SUCCESS_UPDATE_WAREHOUSE_AUTO_PARTS';
const FAILURE_UPDATE_WAREHOUSE_AUTO_PARTS = 'FAILURE_UPDATE_WAREHOUSE_AUTO_PARTS';

const REQUEST_WAREHOUSE_AUTO_PARTS = 'REQUEST_WAREHOUSE_AUTO_PARTS';
const SUCCESS_WAREHOUSE_AUTO_PARTS = 'SUCCESS_WAREHOUSE_AUTO_PARTS';
const FAILURE_WAREHOUSE_AUTO_PARTS = 'FAILURE_WAREHOUSE_AUTO_PARTS';

const REQUEST_DELETE_WAREHOUSE_AUTO_PARTS = 'REQUEST_DELETE_WAREHOUSE_AUTO_PARTS';
const SUCCESS_DELETE_WAREHOUSE_AUTO_PARTS = 'SUCCESS_DELETE_WAREHOUSE_AUTO_PARTS';
const FAILURE_DELETE_WAREHOUSE_AUTO_PARTS = 'FAILURE_DELETE_WAREHOUSE_AUTO_PARTS';

const createWarehouseAutoParts = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getWarehouseAutoPartsUrl(item.id),
    method: 'POST',
    data: item,
    types: [
      REQUEST_CREATE_WAREHOUSE_AUTO_PARTS,
      {
        type: SUCCESS_CREATE_WAREHOUSE_AUTO_PARTS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_CREATE_WAREHOUSE_AUTO_PARTS
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const updateWarehouseAutoParts = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getWarehouseAutoPartsUrl(item.id),
    method: 'PUT',
    data: item,
    types: [
      REQUEST_UPDATE_WAREHOUSE_AUTO_PARTS,
      {
        type: SUCCESS_UPDATE_WAREHOUSE_AUTO_PARTS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_UPDATE_WAREHOUSE_AUTO_PARTS
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const getWarehouseAutoParts = () => (dispatch, getState) => {
  const request = {
    endpoint: getWarehouseAutoPartsUrl(),
    types: [
      REQUEST_WAREHOUSE_AUTO_PARTS,
      {
        type: SUCCESS_WAREHOUSE_AUTO_PARTS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_WAREHOUSE_AUTO_PARTS,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const deleteWarehouseAutoParts = (id) => (dispatch, getState) => {
  const request = {
    endpoint: getWarehouseAutoPartsUrl(id),
    method: 'DELETE',
    types: [
      REQUEST_DELETE_WAREHOUSE_AUTO_PARTS,
      {
        type: SUCCESS_DELETE_WAREHOUSE_AUTO_PARTS,
        payload: () => id
      },
      FAILURE_DELETE_WAREHOUSE_AUTO_PARTS
    ]
  }
  return dispatch(callAuthApi(request));
}

const getWarehouseAutoPartsData = () => (dispatch, getState) => {
  return Promise.all([dispatch(getWarehouseAutoParts()), dispatch(getWarehouses()), dispatch(getAutoParts())]);
}

export {
  REQUEST_CREATE_WAREHOUSE_AUTO_PARTS,
  SUCCESS_CREATE_WAREHOUSE_AUTO_PARTS,
  FAILURE_CREATE_WAREHOUSE_AUTO_PARTS,
  REQUEST_UPDATE_WAREHOUSE_AUTO_PARTS,
  SUCCESS_UPDATE_WAREHOUSE_AUTO_PARTS,
  FAILURE_UPDATE_WAREHOUSE_AUTO_PARTS,
  REQUEST_WAREHOUSE_AUTO_PARTS,
  SUCCESS_WAREHOUSE_AUTO_PARTS,
  FAILURE_WAREHOUSE_AUTO_PARTS,
  REQUEST_DELETE_WAREHOUSE_AUTO_PARTS,
  SUCCESS_DELETE_WAREHOUSE_AUTO_PARTS,
  FAILURE_DELETE_WAREHOUSE_AUTO_PARTS,
  createWarehouseAutoParts,
  updateWarehouseAutoParts,
  getWarehouseAutoParts,
  deleteWarehouseAutoParts,
  getWarehouseAutoPartsData,
}