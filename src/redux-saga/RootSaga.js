import {all} from 'redux-saga/effects';

import LocationSaga from './LocationSaga';
import ContributionSaga from './ContributionSaga';
import CMSSaga from './CMSSaga';

function* RootSaga() {
  yield all([
    ...LocationSaga.source,
    ...ContributionSaga.source,
    ...CMSSaga.source,
  ]);
}
export default RootSaga;
