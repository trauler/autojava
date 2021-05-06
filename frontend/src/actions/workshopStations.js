import {
  getWorkshopStationsUrl,
} from "../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import {
  callAuthApiJSON,
  callAuthApi
} from '../helpers/api';

const REQUEST_CREATE_WORKSHOP_STATIONS = 'REQUEST_CREATE_WORKSHOP_STATIONS';
const SUCCESS_CREATE_WORKSHOP_STATIONS = 'SUCCESS_CREATE_WORKSHOP_STATIONS';
const FAILURE_CREATE_WORKSHOP_STATIONS = 'FAILURE_CREATE_WORKSHOP_STATIONS';

const REQUEST_UPDATE_WORKSHOP_STATIONS = 'REQUEST_UPDATE_WORKSHOP_STATIONS';
const SUCCESS_UPDATE_WORKSHOP_STATIONS = 'SUCCESS_UPDATE_WORKSHOP_STATIONS';
const FAILURE_UPDATE_WORKSHOP_STATIONS = 'FAILURE_UPDATE_WORKSHOP_STATIONS';

const REQUEST_WORKSHOP_STATIONS = 'REQUEST_WORKSHOP_STATIONS';
const SUCCESS_WORKSHOP_STATIONS = 'SUCCESS_WORKSHOP_STATIONS';
const FAILURE_WORKSHOP_STATIONS = 'FAILURE_WORKSHOP_STATIONS';

const REQUEST_DELETE_WORKSHOP_STATIONS = 'REQUEST_DELETE_WORKSHOP_STATIONS';
const SUCCESS_DELETE_WORKSHOP_STATIONS = 'SUCCESS_DELETE_WORKSHOP_STATIONS';
const FAILURE_DELETE_WORKSHOP_STATIONS = 'FAILURE_DELETE_WORKSHOP_STATIONS';

const createWorkshopStations = (workshopId, item) => (dispatch, getState) => {
  const request = {
    endpoint: getWorkshopStationsUrl(workshopId, item.id),
    method: 'POST',
    data: item,
    types: [
      REQUEST_CREATE_WORKSHOP_STATIONS,
      {
        type: SUCCESS_CREATE_WORKSHOP_STATIONS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_CREATE_WORKSHOP_STATIONS
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const updateWorkshopStations = (workshopId, item) => (dispatch, getState) => {
  const request = {
    endpoint: getWorkshopStationsUrl(workshopId, item.id),
    method: 'PUT',
    data: item,
    types: [
      REQUEST_UPDATE_WORKSHOP_STATIONS,
      {
        type: SUCCESS_UPDATE_WORKSHOP_STATIONS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_UPDATE_WORKSHOP_STATIONS
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const getWorkshopStations = (workshopId) => (dispatch, getState) => {
  const request = {
    endpoint: getWorkshopStationsUrl(workshopId),
    types: [
      REQUEST_WORKSHOP_STATIONS,
      {
        type: SUCCESS_WORKSHOP_STATIONS,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_WORKSHOP_STATIONS,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const deleteWorkshopStations = (workshopId, id) => (dispatch, getState) => {
  const request = {
    endpoint: getWorkshopStationsUrl(workshopId, id),
    method: 'DELETE',
    types: [
      REQUEST_DELETE_WORKSHOP_STATIONS,
      {
        type: SUCCESS_DELETE_WORKSHOP_STATIONS,
        payload: () => id
      },
      FAILURE_DELETE_WORKSHOP_STATIONS
    ]
  }
  return dispatch(callAuthApi(request));
}

export {
  REQUEST_CREATE_WORKSHOP_STATIONS,
  SUCCESS_CREATE_WORKSHOP_STATIONS,
  FAILURE_CREATE_WORKSHOP_STATIONS,
  REQUEST_UPDATE_WORKSHOP_STATIONS,
  SUCCESS_UPDATE_WORKSHOP_STATIONS,
  FAILURE_UPDATE_WORKSHOP_STATIONS,
  REQUEST_WORKSHOP_STATIONS,
  SUCCESS_WORKSHOP_STATIONS,
  FAILURE_WORKSHOP_STATIONS,
  REQUEST_DELETE_WORKSHOP_STATIONS,
  SUCCESS_DELETE_WORKSHOP_STATIONS,
  FAILURE_DELETE_WORKSHOP_STATIONS,
  createWorkshopStations,
  updateWorkshopStations,
  getWorkshopStations,
  deleteWorkshopStations,
}