import {
  getWorkshopsUrl,
} from "../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import {
  callAuthApiJSON,
  callAuthApi
} from '../helpers/api';

const REQUEST_CREATE_WORKSHOPS = 'REQUEST_CREATE_WORKSHOPS';
const SUCCESS_CREATE_WORKSHOPS = 'SUCCESS_CREATE_WORKSHOPS';
const FAILURE_CREATE_WORKSHOPS = 'FAILURE_CREATE_WORKSHOPS';

const REQUEST_UPDATE_WORKSHOPS = 'REQUEST_UPDATE_WORKSHOPS';
const SUCCESS_UPDATE_WORKSHOPS = 'SUCCESS_UPDATE_WORKSHOPS';
const FAILURE_UPDATE_WORKSHOPS = 'FAILURE_UPDATE_WORKSHOPS';

const REQUEST_WORKSHOPS = 'REQUEST_WORKSHOPS';
const SUCCESS_WORKSHOPS = 'SUCCESS_WORKSHOPS';
const FAILURE_WORKSHOPS = 'FAILURE_WORKSHOPS';

const REQUEST_DELETE_WORKSHOPS = 'REQUEST_DELETE_WORKSHOPS';
const SUCCESS_DELETE_WORKSHOPS = 'SUCCESS_DELETE_WORKSHOPS';
const FAILURE_DELETE_WORKSHOPS = 'FAILURE_DELETE_WORKSHOPS';

const createWorkshops = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getWorkshopsUrl(item.id),
    method: 'POST',
    data: item,
    types: [
      REQUEST_CREATE_WORKSHOPS,
      {
        type: SUCCESS_CREATE_WORKSHOPS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_CREATE_WORKSHOPS
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const updateWorkshops = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getWorkshopsUrl(item.id),
    method: 'PUT',
    data: item,
    types: [
      REQUEST_UPDATE_WORKSHOPS,
      {
        type: SUCCESS_UPDATE_WORKSHOPS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_UPDATE_WORKSHOPS
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const getWorkshops = () => (dispatch, getState) => {
  const request = {
    endpoint: getWorkshopsUrl(),
    types: [
      REQUEST_WORKSHOPS,
      {
        type: SUCCESS_WORKSHOPS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_WORKSHOPS,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const deleteWorkshops = (id) => (dispatch, getState) => {
  const request = {
    endpoint: getWorkshopsUrl(id),
    method: 'DELETE',
    types: [
      REQUEST_DELETE_WORKSHOPS,
      {
        type: SUCCESS_DELETE_WORKSHOPS,
        payload: () => id
      },
      FAILURE_DELETE_WORKSHOPS
    ]
  }
  return dispatch(callAuthApi(request));
}

export {
  REQUEST_CREATE_WORKSHOPS,
  SUCCESS_CREATE_WORKSHOPS,
  FAILURE_CREATE_WORKSHOPS,
  REQUEST_UPDATE_WORKSHOPS,
  SUCCESS_UPDATE_WORKSHOPS,
  FAILURE_UPDATE_WORKSHOPS,
  REQUEST_WORKSHOPS,
  SUCCESS_WORKSHOPS,
  FAILURE_WORKSHOPS,
  REQUEST_DELETE_WORKSHOPS,
  SUCCESS_DELETE_WORKSHOPS,
  FAILURE_DELETE_WORKSHOPS,
  createWorkshops,
  updateWorkshops,
  getWorkshops,
  deleteWorkshops,
}