import { getJSON } from 'redux-api-middleware';
import { callAuthApiJSON } from '../helpers/api';

const REQUEST_MULTI_STEPS_FORM = 'REQUEST_MULTI_STEPS_FORM';
const SUCCESS_MULTI_STEPS_FORM = 'SUCCESS_MULTI_STEPS_FORM';
const FAILURE_MULTI_STEPS_FORM = 'FAILURE_MULTI_STEPS_FORM';


const saveMultiStepFormData = ({ config, data }) => (dispatch, getState) => {
  const { name, endpoint, method = 'PUT', stepLabel } = config;
  
  const request = {
    method,
    endpoint: endpoint,
    data: data,
    types: [
      {
        type: REQUEST_MULTI_STEPS_FORM,
        payload: { name, data, stepLabel }
      },
      {
        type: SUCCESS_MULTI_STEPS_FORM,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => ({ name, data: json, stepLabel }));
        },
      },
      {
        type: FAILURE_MULTI_STEPS_FORM,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => ({ name, data, error: json, stepLabel }));
        },
      },
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

export {
  REQUEST_MULTI_STEPS_FORM,
  SUCCESS_MULTI_STEPS_FORM,
  FAILURE_MULTI_STEPS_FORM,
  saveMultiStepFormData,
};