import { getJSON } from 'redux-api-middleware';
import { callAuthApiJSON, callAuthApi } from '../helpers/api';
import { getClientsUrl, getClientCarsUrl } from "../selectors/urls";
import { clientInfoSelector } from "../selectors/clients";

const REQUEST_CLIENTS = 'REQUEST_CLIENTS';
const SUCCESS_CLIENTS = 'SUCCESS_CLIENTS';
const FAILURE_CLIENTS = 'FAILURE_CLIENTS';

const REQUEST_SAVE_CLIENT = 'REQUEST_SAVE_CLIENT';
const SUCCESS_SAVE_CLIENT = 'SUCCESS_SAVE_CLIENT';
const FAILURE_SAVE_CLIENT = 'FAILURE_SAVE_CLIENT';


const REQUEST_UPDATE_CLIENT = 'REQUEST_UPDATE_CLIENT';
const SUCCESS_UPDATE_CLIENT = 'SUCCESS_UPDATE_CLIENT';
const FAILURE_UPDATE_CLIENT = 'FAILURE_UPDATE_CLIENT';

const REQUEST_CLIENT_CARS = 'REQUEST_CLIENT_CARS';
const SUCCESS_CLIENT_CARS = 'SUCCESS_CLIENT_CARS';
const FAILURE_CLIENT_CARS = 'FAILURE_CLIENT_CARS';

const REQUEST_SAVE_CLIENT_CAR = 'REQUEST_SAVE_CLIENT_CAR';
const SUCCESS_CREATE_CLIENT_CAR = 'SUCCESS_CREATE_CLIENT_CAR';
const SUCCESS_SAVE_CLIENT_CAR = 'SUCCESS_SAVE_CLIENT_CAR';
const FAILURE_SAVE_CLIENT_CAR = 'FAILURE_SAVE_CLIENT_CAR';


const REQUEST_DELETE_CLIENT_CAR = 'REQUEST_DELETE_CLIENT_CAR';
const SUCCESS_DELETE_CLIENT_CAR = 'SUCCESS_DELETE_CLIENT_CAR';
const FAILURE_DELETE_CLIENT_CAR = 'FAILURE_DELETE_CLIENT_CAR';


const getClients = () => (dispatch, getState) => {
  const request = {
    endpoint: getClientsUrl(),
    types: [
      REQUEST_CLIENTS,
      {
        type: SUCCESS_CLIENTS,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => json);
        },
      },
      FAILURE_CLIENTS,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const saveClient = (data) => (dispatch, getState) => {
  const { id, ...other } = data;

  const request = {
    method: id ? 'PUT' : 'POST',
    endpoint: getClientsUrl(id),
    data: clientInfoSelector({ data: other }),
    types: [
      REQUEST_SAVE_CLIENT,
      {
        type: SUCCESS_SAVE_CLIENT,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => json);
        },
      },
      FAILURE_SAVE_CLIENT,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const updateClient = (data) => (dispatch, getState) => {
  const { id, ...other } = data;

  const request = {
    method: 'PUT',
    endpoint: getClientsUrl(id),
    data: clientInfoSelector({ data: other }),
    types: [
      REQUEST_UPDATE_CLIENT,
      {
        type: SUCCESS_UPDATE_CLIENT,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => json);
        },
      },
      FAILURE_UPDATE_CLIENT,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const getClientCars = (id) => (dispatch, getState) => {
  const request = {
    endpoint: getClientCarsUrl(id),
    types: [
      REQUEST_CLIENT_CARS,
      {
        type: SUCCESS_CLIENT_CARS,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => {
              return {
                id,
                items: json
              }
            });
        },
      },
      FAILURE_CLIENT_CARS,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const saveClientCar = (id, data) => (dispatch, getState) => {
  const { id: carId, ...other } = data;

  const request = {
    method: carId ? 'PUT' : 'POST',
    endpoint: getClientCarsUrl(id, carId),
    data: other,
    types: [
      REQUEST_SAVE_CLIENT_CAR,
      {
        type: carId ? SUCCESS_SAVE_CLIENT_CAR : SUCCESS_CREATE_CLIENT_CAR,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => {
              return {
                id,
                item: json
              }
            });
        },
      },
      FAILURE_SAVE_CLIENT_CAR,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const deleteClientCar = (clientId, id) => (dispatch, getState) => {
  const request = {
    endpoint: getClientCarsUrl(clientId, id),
    method: 'DELETE',
    types: [
      REQUEST_DELETE_CLIENT_CAR,
      {
        type: SUCCESS_DELETE_CLIENT_CAR,
        payload: () => id
      },
      FAILURE_DELETE_CLIENT_CAR
    ]
  }
  return dispatch(callAuthApi(request));
}

export {
  REQUEST_CLIENTS,
  SUCCESS_CLIENTS,
  FAILURE_CLIENTS,
  REQUEST_SAVE_CLIENT,
  SUCCESS_SAVE_CLIENT,
  FAILURE_SAVE_CLIENT,
  REQUEST_UPDATE_CLIENT,
  SUCCESS_UPDATE_CLIENT,
  FAILURE_UPDATE_CLIENT,
  REQUEST_CLIENT_CARS,
  SUCCESS_CLIENT_CARS,
  FAILURE_CLIENT_CARS,
  REQUEST_SAVE_CLIENT_CAR,
  SUCCESS_CREATE_CLIENT_CAR,
  SUCCESS_SAVE_CLIENT_CAR,
  FAILURE_SAVE_CLIENT_CAR,
  REQUEST_DELETE_CLIENT_CAR,
  SUCCESS_DELETE_CLIENT_CAR,
  FAILURE_DELETE_CLIENT_CAR,
  getClients,
  saveClient,
  updateClient,
  getClientCars,
  saveClientCar,
  deleteClientCar,
};