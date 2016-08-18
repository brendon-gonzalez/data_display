import { Map, List } from 'immutable';
const initialState = Map({
  data: List(),
  mapBounds: Map({
    lats: List(),
    lngs: List()
  })
});

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_DATA':
      return state
        .set('data', List.of(...action.payload));
      break;
    case 'SET_GEOFENCE':
      return state
        .setIn(['mapBounds', 'lats'], action.payload.lats)
        .setIn(['mapBounds', 'lngs'], action.payload.lngs)
    default:
      return state;
  }
}
