import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import { GoogleMapLoader, GoogleMap, Marker, DrawingManager } from 'react-google-maps';

class Map extends Component {
  componentWillReceiveProps() {
    console.log(this.props.mapBounds.get('lats'));
    console.log(this.props.mapBounds.get('lngs'));
  }

  onDrawingComplete(e) {
    this.props.onDrawingComplete(e);
  }

  inBounds(testx, testy) {
    // Full credit for this goes to
    // https://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html#License
    const vertx = this.props.mapBounds.get('lngs');
    const verty = this.props.mapBounds.get('lats');
    const nvert = vertx.length;
    let i = 0;
    let j = 0;
    let c = 0;
    for (i = 0, j = nvert - 1; i < nvert; j = i++) {
      if (((verty[i] > testy) != (verty[j] > testy)) &&
        (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i]))
          c = !c;
    }
    return c;
  }

  render() {
    const { mapPoints, mapBounds } = this.props;
    let JSX_markers = null;

    if (mapPoints) {
      JSX_markers = mapPoints.map((marker, index) => {
        if (mapBounds.get('lngs').length && mapBounds.get('lats').length) {
          if (this.inBounds(marker.position.lng, marker.position.lat)) {
            return (
              <Marker {...marker} />
            );
          }
        } else {
          return (
            <Marker {...marker} />
          )
        }
      });
    }
    return (
      <section style={{height: "100%", width: '100%', position: 'absolute'}}>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props.containerElementProps}
              style={{
              height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={14}
            defaultCenter={{ lat: 40.746, lng: -73.9884 }}
            >
              <DrawingManager
                onOverlaycomplete={(e) => this.onDrawingComplete(e)}
                defaultOptions={{
                  drawingControlOptions: {
                    drawingModes: ['rectangle']
                  }
                }}
              />
              {JSX_markers}
            </GoogleMap>
          }
        />
      </section>
    );
  }
}

export default Map;
