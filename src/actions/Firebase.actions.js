export function testFireBase(number) {
  return ({ firebase, dispatch, getState }) => {
    const getPromise = new Promise((resolve, reject) => {
      firebase.child('/').on('value', snap => {
        const online = snap.val();
        if (getState().app.online === online) return;
        resolve(
          dispatch({ type: online ? 'APP_ONLINE' : 'APP_OFFLINE' })
        );
      });
    });

    return {
      type: 'TEST_FIREBASE',
      payload: getPromise
    };
  };
}
