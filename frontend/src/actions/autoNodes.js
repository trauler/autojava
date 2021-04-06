import {
  getAutoNodesUrl,
} from "../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import {
  callAuthApiJSON,
  callAuthApi
} from '../helpers/api';

const REQUEST_CREATE_AUTO_NODES = 'REQUEST_CREATE_AUTO_NODES';
const SUCCESS_CREATE_AUTO_NODES = 'SUCCESS_CREATE_AUTO_NODES';
const FAILURE_CREATE_AUTO_NODES = 'FAILURE_CREATE_AUTO_NODES';

const REQUEST_UPDATE_AUTO_NODES = 'REQUEST_UPDATE_AUTO_NODES';
const SUCCESS_UPDATE_AUTO_NODES = 'SUCCESS_UPDATE_AUTO_NODES';
const FAILURE_UPDATE_AUTO_NODES = 'FAILURE_UPDATE_AUTO_NODES';

const REQUEST_AUTO_NODES = 'REQUEST_AUTO_NODES';
const SUCCESS_AUTO_NODES = 'SUCCESS_AUTO_NODES';
const FAILURE_AUTO_NODES = 'FAILURE_AUTO_NODES';

const REQUEST_DELETE_AUTO_NODES = 'REQUEST_DELETE_AUTO_NODES';
const SUCCESS_DELETE_AUTO_NODES = 'SUCCESS_DELETE_AUTO_NODES';
const FAILURE_DELETE_AUTO_NODES = 'FAILURE_DELETE_AUTO_NODES';

const createAutoNodes = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getAutoNodesUrl(item.id),
    method: 'POST',
    data: item,
    types: [
      REQUEST_CREATE_AUTO_NODES,
      {
        type: SUCCESS_CREATE_AUTO_NODES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_CREATE_AUTO_NODES
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const updateAutoNodes = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getAutoNodesUrl(item.id),
    method: 'PUT',
    data: item,
    types: [
      REQUEST_UPDATE_AUTO_NODES,
      {
        type: SUCCESS_UPDATE_AUTO_NODES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_UPDATE_AUTO_NODES
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const getAutoNodes = () => (dispatch, getState) => {
  const request = {
    endpoint: getAutoNodesUrl(),
    types: [
      REQUEST_AUTO_NODES,
      {
        type: SUCCESS_AUTO_NODES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_AUTO_NODES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const deleteAutoNodes = (id) => (dispatch, getState) => {
  const request = {
    endpoint: getAutoNodesUrl(id),
    method: 'DELETE',
    types: [
      REQUEST_DELETE_AUTO_NODES,
      {
        type: SUCCESS_DELETE_AUTO_NODES,
        payload: () => id
      },
      FAILURE_DELETE_AUTO_NODES
    ]
  }
  return dispatch(callAuthApi(request));
}

export {
  REQUEST_CREATE_AUTO_NODES,
  SUCCESS_CREATE_AUTO_NODES,
  FAILURE_CREATE_AUTO_NODES,
  REQUEST_UPDATE_AUTO_NODES,
  SUCCESS_UPDATE_AUTO_NODES,
  FAILURE_UPDATE_AUTO_NODES,
  REQUEST_AUTO_NODES,
  SUCCESS_AUTO_NODES,
  FAILURE_AUTO_NODES,
  REQUEST_DELETE_AUTO_NODES,
  SUCCESS_DELETE_AUTO_NODES,
  FAILURE_DELETE_AUTO_NODES,
  createAutoNodes,
  updateAutoNodes,
  getAutoNodes,
  deleteAutoNodes,
}