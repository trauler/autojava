import * as actions from '../actions/multiStepsForm';

const initialState = {};
const itemInitialState = {
  loaded: false,
  error: false,
};

export default function multiStepsForm(state = initialState, action = {}) {
  
  switch (action.type) {
    case actions.REQUEST_MULTI_STEPS_FORM: {
      const { name, data, ...other } = action.payload;
      return {
        ...state,
        [name]: { ...itemInitialState, data },
        ...other
      };
    }

    case actions.SUCCESS_MULTI_STEPS_FORM: {
      const { name, data, ...other } = action.payload;
      return {
        ...state,
        [name]: { 
          loaded: true, 
          error: false,
          data,
          ...other
        }
      };
    }

    case actions.FAILURE_MULTI_STEPS_FORM: {
      const { name, data, error, ...other } = action.payload;
      return {
        ...state,
        [name]: { 
          loaded: true, 
          error: error || true,
          data,
          ...other
        }
      };
    }
  
    default:
      return state;
  }
};
