import { combineReducers } from 'redux';
import map from './Map.reducer';
import stats from './Stats.reducer';
// a little empty in here, buts for extensiblity.
export default combineReducers({
  map,
  stats
});
