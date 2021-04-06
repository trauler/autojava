import { getServicesUrl } from "../../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import { callAuthApiJSON } from '../../helpers/api';
import { formatServicesData } from '../../helpers/data';

const ADMIN_REQUEST_CREATE_SERVICES = 'ADMIN_REQUEST_CREATE_SERVICES';
const ADMIN_SUCCESS_CREATE_SERVICES = 'ADMIN_SUCCESS_CREATE_SERVICES';
const ADMIN_FAILURE_CREATE_SERVICES = 'ADMIN_FAILURE_CREATE_SERVICES';

const ADMIN_REQUEST_SERVICES = 'ADMIN_REQUEST_SERVICES';
const ADMIN_SUCCESS_SERVICES = 'ADMIN_SUCCESS_SERVICES';
const ADMIN_FAILURE_SERVICES = 'ADMIN_FAILURE_SERVICES';

const ADMIN_REQUEST_UPDATE_SERVICES = 'ADMIN_REQUEST_UPDATE_SERVICES';
const ADMIN_SUCCESS_UPDATE_SERVICES = 'ADMIN_SUCCESS_UPDATE_SERVICES';
const ADMIN_FAILURE_UPDATE_SERVICES = 'ADMIN_FAILURE_UPDATE_SERVICES';

const ADMIN_REQUEST_DELETE_SERVICES = 'ADMIN_REQUEST_DELETE_SERVICES';
const ADMIN_SUCCESS_DELETE_SERVICES = 'ADMIN_SUCCESS_DELETE_SERVICES';
const ADMIN_FAILURE_DELETE_SERVICES = 'ADMIN_FAILURE_DELETE_SERVICES';

const createServices = (data) => (dispatch, getState) => {
  const request = {
    method: 'POST',
    endpoint: getServicesUrl(),
    data: data,
    types: [
      ADMIN_REQUEST_CREATE_SERVICES,
      {
        type: ADMIN_SUCCESS_CREATE_SERVICES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      ADMIN_FAILURE_CREATE_SERVICES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const getServices = () => (dispatch, getState) => {
  const request = {
    endpoint: getServicesUrl(),
    types: [
      ADMIN_REQUEST_SERVICES,
      {
        type: ADMIN_SUCCESS_SERVICES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      ADMIN_FAILURE_SERVICES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const updateServices = (data) => (dispatch, getState) => {
  const { id } = data;
  
  const request = {
    method: 'PUT',
    endpoint: getServicesUrl(id),
    data: data,
    types: [
      ADMIN_REQUEST_UPDATE_SERVICES,
      {
        type: ADMIN_SUCCESS_UPDATE_SERVICES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      ADMIN_FAILURE_UPDATE_SERVICES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const deleteServices = (id) => (dispatch, getState) => {
  const request = {
    method: 'DELETE',
    endpoint: getServicesUrl(id),
    types: [
      ADMIN_REQUEST_DELETE_SERVICES,
      {
        type: ADMIN_SUCCESS_DELETE_SERVICES,
        payload: (action, s, res) => id,
      },
      ADMIN_FAILURE_DELETE_SERVICES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

export {
  ADMIN_REQUEST_CREATE_SERVICES,
  ADMIN_SUCCESS_CREATE_SERVICES,
  ADMIN_FAILURE_CREATE_SERVICES,
  ADMIN_REQUEST_SERVICES,
  ADMIN_SUCCESS_SERVICES,
  ADMIN_FAILURE_SERVICES,
  ADMIN_REQUEST_UPDATE_SERVICES,
  ADMIN_SUCCESS_UPDATE_SERVICES,
  ADMIN_FAILURE_UPDATE_SERVICES,
  ADMIN_REQUEST_DELETE_SERVICES,
  ADMIN_SUCCESS_DELETE_SERVICES,
  ADMIN_FAILURE_DELETE_SERVICES,
  createServices,
  getServices,
  updateServices,
  deleteServices,
};