import {CMS} from '../Store/TypeConstants';

const initialState = {
  status: '',
  error: '',
  loading: false,
};

const CMSReducer = (state = initialState, action) => {
  if (CMS[action.type]) {
    if (action.type.toString().endsWith('_REQUEST')) {
      return {
        ...state,
        loading: true,
        status: CMS[action.type].type,
      };
    }
    return {
      ...state,
      loading: false,
      ...action.data,
      status: CMS[action.type].type,
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
export default CMSReducer;
