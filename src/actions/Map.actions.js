export function fetchInitialData(number) {
  return ({ firebase, dispatch, getState }) => {
    const getPromise = new Promise((resolve, reject) => {
      firebase.limitToFirst(300).on('value', snap => {
        if (snap) {
          const redoneData = snap.val().map((point, i) => {
            return {
              position: {
                lat: point.lat,
                lng: point.long
              },
              key: i,
              label: 'P',
              title: point.datetime,
              dropOff: {
                position: {
                  lat: point.dropOffLat,
                  lng: point.dropOffLong
                },
                key: `${i}_dropoff`,
                label: 'D',
                title: point.datetime,
              }
            }
          });
          resolve(dispatch({
            type: 'SET_PICKUPS',
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

export function clearGeofence() {
  return {
    type: 'CLEAR_GEOFENCE'
  }
}

export function setRect(bounds) {
  return {
    type: 'SET_RECT',
    payload: bounds
  }
}

export function clearRect() {
  return {
    type: 'CLEAR_RECT'
  }
}


export function toggleDropOffs() {
  return {
    type: 'TOGGLE_DROP_OFFS'
  }
}
