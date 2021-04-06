import {
  getOptionalAccessoriesUrl,
} from "../../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import {
  callAuthApiJSON,
  callAuthApi
} from '../../helpers/api';

const REQUEST_CREATE_OPTIONAL_ACCESSORIES = 'REQUEST_CREATE_OPTIONAL_ACCESSORIES';
const SUCCESS_CREATE_OPTIONAL_ACCESSORIES = 'SUCCESS_CREATE_OPTIONAL_ACCESSORIES';
const FAILURE_CREATE_OPTIONAL_ACCESSORIES = 'FAILURE_CREATE_OPTIONAL_ACCESSORIES';

const REQUEST_UPDATE_OPTIONAL_ACCESSORIES = 'REQUEST_UPDATE_OPTIONAL_ACCESSORIES';
const SUCCESS_UPDATE_OPTIONAL_ACCESSORIES = 'SUCCESS_UPDATE_OPTIONAL_ACCESSORIES';
const FAILURE_UPDATE_OPTIONAL_ACCESSORIES = 'FAILURE_UPDATE_OPTIONAL_ACCESSORIES';

const REQUEST_OPTIONAL_ACCESSORIES = 'REQUEST_OPTIONAL_ACCESSORIES';
const SUCCESS_OPTIONAL_ACCESSORIES = 'SUCCESS_OPTIONAL_ACCESSORIES';
const FAILURE_OPTIONAL_ACCESSORIES = 'FAILURE_OPTIONAL_ACCESSORIES';

const REQUEST_DELETE_OPTIONAL_ACCESSORIES = 'REQUEST_DELETE_OPTIONAL_ACCESSORIES';
const SUCCESS_DELETE_OPTIONAL_ACCESSORIES = 'SUCCESS_DELETE_OPTIONAL_ACCESSORIES';
const FAILURE_DELETE_OPTIONAL_ACCESSORIES = 'FAILURE_DELETE_OPTIONAL_ACCESSORIES';

const createOptionalAccessories = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getOptionalAccessoriesUrl(item.id),
    method: 'POST',
    data: item,
    types: [
      REQUEST_CREATE_OPTIONAL_ACCESSORIES,
      {
        type: SUCCESS_CREATE_OPTIONAL_ACCESSORIES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_CREATE_OPTIONAL_ACCESSORIES
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const updateOptionalAccessories = (item) => (dispatch, getState) => {
  const request = {
    endpoint: getOptionalAccessoriesUrl(item.id),
    method: 'PUT',
    data: item,
    types: [
      REQUEST_UPDATE_OPTIONAL_ACCESSORIES,
      {
        type: SUCCESS_UPDATE_OPTIONAL_ACCESSORIES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_UPDATE_OPTIONAL_ACCESSORIES
    ]
  }
  return dispatch(callAuthApiJSON(request));
}

const getOptionalAccessories = () => (dispatch, getState) => {
  const request = {
    endpoint: getOptionalAccessoriesUrl(),
    types: [
      REQUEST_OPTIONAL_ACCESSORIES,
      {
        type: SUCCESS_OPTIONAL_ACCESSORIES,
        payload: (action, s, res) => getJSON(res).then(json => json),
      },
      FAILURE_OPTIONAL_ACCESSORIES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const deleteOptionalAccessories = (id) => (dispatch, getState) => {
  const request = {
    endpoint: getOptionalAccessoriesUrl(id),
    method: 'DELETE',
    types: [
      REQUEST_DELETE_OPTIONAL_ACCESSORIES,
      {
        type: SUCCESS_DELETE_OPTIONAL_ACCESSORIES,
        payload: () => id
      },
      FAILURE_DELETE_OPTIONAL_ACCESSORIES
    ]
  }
  return dispatch(callAuthApi(request));
}

export {
  REQUEST_CREATE_OPTIONAL_ACCESSORIES,
  SUCCESS_CREATE_OPTIONAL_ACCESSORIES,
  FAILURE_CREATE_OPTIONAL_ACCESSORIES,
  REQUEST_UPDATE_OPTIONAL_ACCESSORIES,
  SUCCESS_UPDATE_OPTIONAL_ACCESSORIES,
  FAILURE_UPDATE_OPTIONAL_ACCESSORIES,
  REQUEST_OPTIONAL_ACCESSORIES,
  SUCCESS_OPTIONAL_ACCESSORIES,
  FAILURE_OPTIONAL_ACCESSORIES,
  REQUEST_DELETE_OPTIONAL_ACCESSORIES,
  SUCCESS_DELETE_OPTIONAL_ACCESSORIES,
  FAILURE_DELETE_OPTIONAL_ACCESSORIES,
  createOptionalAccessories,
  updateOptionalAccessories,
  getOptionalAccessories,
  deleteOptionalAccessories,
}