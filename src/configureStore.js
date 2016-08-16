import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import appReducer from './reducers/App.reducer';
import firebase from 'firebase';
import * as config from '../config';
let firebaseDeps = null;

const promiseMiddleware = ({ dispatch }) => next => action => {
  const { type, payload: promise } = action;
  const isPromise = promise && typeof promise.then === 'function';
  if (!isPromise) return next(action);
  const createAction = (suffix, payload) => ({
    type: `${type}_${suffix}`, meta: { action }, payload
  });
  next(createAction('START'));
  const onFulfilled = value => {
    dispatch(createAction('SUCCESS', value));
    return value;
  };
  const onRejected = error => {
    dispatch(createAction('ERROR', error));
    throw error;
  };
  return promise.then(onFulfilled, onRejected);
};

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action);
    let returnValue = next(action);
    console.log('state after dispatch', getState())
    return returnValue;
  }
}

function injectFirebase({ getState, dispatch }) {
  return (next) => (action) => {
    return next(typeof action === 'function'
      ? action({
          firebase: firebaseDeps.firebase,
          firebaseDatabase: firebaseDeps.firebaseDatabase,
          dispatch,
          getState
        })
      : action
    );
  }
}

const middlewares = [
  injectFirebase,
  thunk,
  promiseMiddleware,
  logger
];

export default function configureStore() {
  if (!firebaseDeps) {
    firebase.initializeApp(config.firebase);
    firebaseDeps = {
      firebase: firebase.database().ref('traffic_data'),
      firebaseDatabase: firebase.database
    };
  }
  return createStore(
    appReducer,
    applyMiddleware(...middlewares)
  );
}
