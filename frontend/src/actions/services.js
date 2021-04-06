import { getServicesUrl } from "../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import { callAuthApiJSON } from '../helpers/api';
import { formatServicesData } from '../helpers/data';

const REQUEST_SERVICES = 'REQUEST_SERVICES';
const SUCCESS_SERVICES = 'SUCCESS_SERVICES';
const FAILURE_SERVICES = 'FAILURE_SERVICES';


const getServices = () => (dispatch, getState) => {
  const request = {
    endpoint: getServicesUrl(),
    types: [
      REQUEST_SERVICES,
      {
        type: SUCCESS_SERVICES,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => formatServicesData(json));
        },
      },
      FAILURE_SERVICES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

export {
  REQUEST_SERVICES,
  SUCCESS_SERVICES,
  FAILURE_SERVICES,
  getServices,
};