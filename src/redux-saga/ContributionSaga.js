import {put, call, takeLatest} from 'redux-saga/effects';

import {CONTRIBUTE} from '../redux/Store/TypeConstants';
import {
  POST_SET,
  GET,
  GET_SET,
  POST,
  getToken,
  json_data,
  form_data,
  DELETE_SET,
} from './setup/method';

function* createContribution(action) {
  try {
    yield call(
      POST_SET,
      CONTRIBUTE.CREATE_CONTRIBUTION_SUCCESS,
      CONTRIBUTE.CREATE_CONTRIBUTION_FAILURE,
      'submit-load-gen-form',
      action.payload,
    );
  } catch (error) {
    yield put({
      type: CONTRIBUTE.CREATE_CONTRIBUTION_FAILURE,
      data: {error: error},
    });
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(
        CONTRIBUTE.CREATE_CONTRIBUTION_REQUEST.type,
        createContribution,
      );
    })(),
  ],
};
