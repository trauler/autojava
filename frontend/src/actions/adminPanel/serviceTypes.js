import { getServiceTypesUrl } from "../../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import { callAuthApi, callAuthApiJSON } from '../../helpers/api';
import { getServices } from "./services";

const REQUEST_CREATE_SERVICE_TYPES = 'REQUEST_CREATE_SERVICE_TYPES';
const SUCCESS_CREATE_SERVICE_TYPES = 'SUCCESS_CREATE_SERVICE_TYPES';
const FAILURE_CREATE_SERVICE_TYPES = 'FAILURE_CREATE_SERVICE_TYPES';

const REQUEST_SERVICE_TYPES = 'REQUEST_SERVICE_TYPES';
const SUCCESS_SERVICE_TYPES = 'SUCCESS_SERVICE_TYPES';
const FAILURE_SERVICE_TYPES = 'FAILURE_SERVICE_TYPES';

const REQUEST_UPDATE_SERVICE_TYPES = 'REQUEST_UPDATE_SERVICE_TYPES';
const SUCCESS_UPDATE_SERVICE_TYPES = 'SUCCESS_UPDATE_SERVICE_TYPES';
const FAILURE_UPDATE_SERVICE_TYPES = 'FAILURE_UPDATE_SERVICE_TYPES';

const REQUEST_DELETE_SERVICE_TYPES = 'REQUEST_DELETE_SERVICE_TYPES';
const SUCCESS_DELETE_SERVICE_TYPES = 'SUCCESS_DELETE_SERVICE_TYPES';
const FAILURE_DELETE_SERVICE_TYPES = 'FAILURE_DELETE_SERVICE_TYPES';

const createServiceType = (data) => (dispatch, getState) => {
  const request = {
    method: 'POST',
    endpoint: getServiceTypesUrl(),
    data: data,
    types: [
      REQUEST_CREATE_SERVICE_TYPES,
      {
        type: SUCCESS_CREATE_SERVICE_TYPES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_CREATE_SERVICE_TYPES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const getServiceTypes = () => (dispatch, getState) => {
  const request = {
    endpoint: getServiceTypesUrl(),
    types: [
      REQUEST_SERVICE_TYPES,
      {
        type: SUCCESS_SERVICE_TYPES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_SERVICE_TYPES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const getServiceTypesAndServices = () => (dispatch, getState) => 
  Promise.all([dispatch(getServiceTypes()), dispatch(getServices())]);

const updateServiceType = (data) => (dispatch, getState) => {
  const { id } = data
  const request = {
    method: 'PUT',
    endpoint: getServiceTypesUrl(id),
    data: data,
    types: [
      REQUEST_UPDATE_SERVICE_TYPES,
      {
        type: SUCCESS_UPDATE_SERVICE_TYPES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_UPDATE_SERVICE_TYPES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const updateServiceTypeAndGetService = (data) => (dispatch, getState) => 
  dispatch(updateServiceType(data)).then(() => dispatch(getServices()));

const deleteServiceType = (id) => (dispatch, getState) => {
  const request = {
    method: 'DELETE',
    endpoint: getServiceTypesUrl(id),
    types: [
      REQUEST_DELETE_SERVICE_TYPES,
      {
        type: SUCCESS_DELETE_SERVICE_TYPES,
        payload: (action, s, res) => id,
      },
      FAILURE_DELETE_SERVICE_TYPES,
    ],
  };
  return dispatch(callAuthApi(request));
};

export {
  REQUEST_CREATE_SERVICE_TYPES,
  SUCCESS_CREATE_SERVICE_TYPES,
  FAILURE_CREATE_SERVICE_TYPES,
  REQUEST_SERVICE_TYPES,
  SUCCESS_SERVICE_TYPES,
  FAILURE_SERVICE_TYPES,
  REQUEST_UPDATE_SERVICE_TYPES,
  SUCCESS_UPDATE_SERVICE_TYPES,
  FAILURE_UPDATE_SERVICE_TYPES,
  REQUEST_DELETE_SERVICE_TYPES,
  SUCCESS_DELETE_SERVICE_TYPES,
  FAILURE_DELETE_SERVICE_TYPES,
  createServiceType,
  getServiceTypes,
  getServiceTypesAndServices,
  updateServiceType,
  updateServiceTypeAndGetService,
  deleteServiceType,
};