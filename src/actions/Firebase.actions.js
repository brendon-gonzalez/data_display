export function testFireBase(number) {
  return ({ firebase, dispatch, getState }) => {
    const getPromise = new Promise((resolve, reject) => {
      firebase.limitToFirst(100).on('value', snap => {
        resolve(dispatch({
          type: 'SET_DATA',
          payload: snap.val()
        }));
      });
    });

    return {
      type: 'TEST_FIREBASE',
      payload: getPromise
    };
  };
}
