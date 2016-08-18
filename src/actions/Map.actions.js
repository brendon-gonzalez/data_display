export function fetchInitialData(number) {
  return ({ firebase, dispatch, getState }) => {
    const getPromise = new Promise((resolve, reject) => {
      firebase.limitToFirst(500).on('value', snap => {
        if (snap) {
          const redoneData = snap.val().map((point, i) => {
            return {
              position: {
                lat: point.lat,
                lng: point.long
              },
              key: i
            }
          });
          resolve(dispatch({
            type: 'SET_DATA',
            payload: redoneData
          }));
        }
      });
    });

    return {
      type: 'FETCH_INITIAL_DATA',
      payload: getPromise
    };
  };
}

export function setGeofence(mapCoords) {
  return {
    type: 'SET_GEOFENCE',
    payload: mapCoords
  }
}
