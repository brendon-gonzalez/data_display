import { Map } from 'immutable';
const initialState = Map();

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_DATA':
      return state
        .set('data', action.payload);
      break;
    default:
      return state;
  }
}
