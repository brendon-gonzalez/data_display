import { Map } from 'immutable';
const initialState = Map({
  numDropOffPoints: 0,
  averageTripLength: 0
});

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_NUM_DROPOFF_POINTS':
      state
        .set('numDropOffPoints', action.payload);
      break;
    case 'SET_AVERAGE_TRIP_LENGTH':
      state
        .set('averageTripLength', action.payload);
    default:
      return state;
  }
}
