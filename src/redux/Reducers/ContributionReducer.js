import {CONTRIBUTE} from '../Store/TypeConstants';

const initialState = {
  status: '',
  error: '',
  loading: false,
};

const ContributionReducer = (state = initialState, action) => {
  if (CONTRIBUTE[action.type]) {
    if (action.type.toString().endsWith('_REQUEST')) {
      return {
        ...state,
        loading: true,
        status: CONTRIBUTE[action.type].type,
      };
    }
    return {
      ...state,
      loading: false,
      ...action.data,
      status: CONTRIBUTE[action.type].type,
    };
  } else if (action.type == 'RESET') {
    return {
      status: '',
      error: '',
      loading: false,
    };
  } else {
    return {
      ...state,
    };
  }
};
export default ContributionReducer;
