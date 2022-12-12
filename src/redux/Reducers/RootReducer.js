import {combineReducers} from 'redux';
import LocationReducer from './LocationReducer';
import ContributionReducer from './ContributionReducer';
import CMSReducer from './CMSReducer';

const allReducers = combineReducers({
  LocationReducer: LocationReducer,
  ContributionReducer: ContributionReducer,
  CMSReducer: CMSReducer,
});

export default rootReducer = (state, reducer) => {
  return allReducers(state, reducer);
};
