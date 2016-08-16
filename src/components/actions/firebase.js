export function testFireBase(number) {
  return ({ firebase, dispatch }) => {
    const getPromise = new Promise(
      // firebase.child(`users/${userId}/lovedOnes`).on('value', (favCountSnap) => {
      //   if (favCountSnap.exists()) {
      //     dispatch(updateUserLovedOnesCount(favCountSnap.numChildren()));
      //   }
      // });
      setTimeout(() => {
        dispatch({
          type: 'SET_DATA',
          payload: 'GG!'
        })
      }, 500);
    );

    return {
      type: 'TEST_FIREBASE',
      payload: getPromise()
    };
  };
}

export function
