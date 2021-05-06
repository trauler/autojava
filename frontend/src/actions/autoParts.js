import {
  getAutoPartsUrl,
} from "../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import {
  callAuthApiJSON,
  callAuthApi
} from '../helpers/api';

const REQUEST_CREATE_AUTO_PARTS = 'REQUEST_CREATE_AUTO_PARTS';
const SUCCESS_CREATE_AUTO_PARTS = 'SUCCESS_CREATE_AUTO_PARTS';
const FAILURE_CREATE_AUTO_PARTS = 'FAILURE_CREATE_AUTO_PARTS';

const REQUEST_UPDATE_AUTO_PARTS = 'REQUEST_UPDATE_AUTO_PARTS';
const SUCCESS_UPDATE_AUTO_PARTS = 'SUCCESS_UPDATE_AUTO_PARTS';
const FAILURE_UPDATE_AUTO_PARTS = 'FAILURE_UPDATE_AUTO_PARTS';

const REQUEST_AUTO_PARTS = 'REQUEST_AUTO_PARTS';
const SUCCESS_AUTO_PARTS = 'SUCCESS_AUTO_PARTS';
const FAILURE_AUTO_PARTS = 'FAILURE_AUTO_PARTS';

const REQUEST_DELETE_AUTO_PARTS = 'REQUEST_DELETE_AUTO_PARTS';
const SUCCESS_DELETE_AUTO_PARTS = 'SUCCESS_DELETE_AUTO_PARTS';
const FAILURE_DELETE_AUTO_PARTS = 'FAILURE_DELETE_AUTO_PARTS';

const createAutoParts = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getAutoPartsUrl(item.id),
    method: 'POST',
    data: item,
    types: [
      REQUEST_CREATE_AUTO_PARTS,
      {
        type: SUCCESS_CREATE_AUTO_PARTS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_CREATE_AUTO_PARTS
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const updateAutoParts = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getAutoPartsUrl(item.id),
    method: 'PUT',
    data: item,
    types: [
      REQUEST_UPDATE_AUTO_PARTS,
      {
        type: SUCCESS_UPDATE_AUTO_PARTS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_UPDATE_AUTO_PARTS
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const getAutoParts = () => (dispatch, getState) => {
  const request = {
    endpoint: getAutoPartsUrl(),
    types: [
      REQUEST_AUTO_PARTS,
      {
        type: SUCCESS_AUTO_PARTS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_AUTO_PARTS,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const deleteAutoParts = (id) => (dispatch, getState) => {
  const request = {
    endpoint: getAutoPartsUrl(id),
    method: 'DELETE',
    types: [
      REQUEST_DELETE_AUTO_PARTS,
      {
        type: SUCCESS_DELETE_AUTO_PARTS,
        payload: () => id
      },
      FAILURE_DELETE_AUTO_PARTS
    ]
  }
  return dispatch(callAuthApi(request));
}

export {
  REQUEST_CREATE_AUTO_PARTS,
  SUCCESS_CREATE_AUTO_PARTS,
  FAILURE_CREATE_AUTO_PARTS,
  REQUEST_UPDATE_AUTO_PARTS,
  SUCCESS_UPDATE_AUTO_PARTS,
  FAILURE_UPDATE_AUTO_PARTS,
  REQUEST_AUTO_PARTS,
  SUCCESS_AUTO_PARTS,
  FAILURE_AUTO_PARTS,
  REQUEST_DELETE_AUTO_PARTS,
  SUCCESS_DELETE_AUTO_PARTS,
  FAILURE_DELETE_AUTO_PARTS,
  createAutoParts,
  updateAutoParts,
  getAutoParts,
  deleteAutoParts,
}