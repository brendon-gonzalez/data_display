import { Map, List } from 'immutable';
const initialState = Map({
  showDropOffs: false,
  dropOffs: List(),
  pickUps: List(),
  mapBounds: Map({
    lats: List(),
    lngs: List()
  }),
  rect: null
});

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_PICKUPS':
      return state
        .set('pickUps', List.of(...action.payload));
      break;
    case 'SET_DROPOFFS':
      return state
        .set('dropOffs', List.of(...action.payload));
      break;
    case 'TOGGLE_DROP_OFFS':
      return state
        .set('showDropOffs', !state.get('showDropOffs'));
      break;
    case 'SET_RECT':
      return state
        .set('rect', Map(action.payload));
    case 'CLEAR_RECT':
      return state
        .set('rect', null);
    case 'SET_GEOFENCE':
      return state
        .setIn(['mapBounds', 'lats'], action.payload.lats)
        .setIn(['mapBounds', 'lngs'], action.payload.lngs)
    case 'CLEAR_GEOFENCE':
      return state
        .set('mapBounds', initialState.get('mapBounds'));
    default:
      return state;
  }
}
