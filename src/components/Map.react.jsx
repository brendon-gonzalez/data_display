import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import { GoogleMapLoader, GoogleMap, Marker, DrawingManager, Rectangle } from 'react-google-maps';

class Map extends Component {
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
    const { pickUps, mapBounds, showDropOffs, rect } = this.props;
    let JSX_pickUps = null;
    let JSX_dropOffs = null;
    let JSX_rect = null;

    if (rect) {
      JSX_rect = (
        <Rectangle
          bounds={rect.toJS()}
        />
      )
    }
    if (pickUps) {
      JSX_pickUps = pickUps.map((marker, index) => {
        if (mapBounds.get('lngs').length && mapBounds.get('lats').length) {
          if (this.inBounds(marker.position.lng, marker.position.lat)) {
            return (
              <Marker
                {...marker}
              />
            );
          }
        } else {
          return (
            <Marker {...marker} />
          )
        }
      });
    }

    if (showDropOffs) {
      JSX_dropOffs = pickUps.map((marker, index) => {
        if (mapBounds.get('lngs').length && mapBounds.get('lats').length) {
          if (this.inBounds(marker.position.lng, marker.position.lat)) {
            return (
              <Marker
                {...marker.dropOff}
              />
            );
          }
        } else {
          return (
            <Marker {...marker.dropOff} />
          )
        }
      });
    }
    return (
      <section className="map-container">
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props.containerElementProps}
              className="map"
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={14}
              defaultCenter={{ lat: 40.746, lng: -73.9884 }}
            >
              {!rect &&
                <DrawingManager
                  onOverlaycomplete={(e) => this.onDrawingComplete(e)}
                  defaultOptions={{
                    drawingControlOptions: {
                      drawingModes: ['rectangle']
                    }
                  }}
                />
              }
              {JSX_pickUps}
              {JSX_dropOffs}
              {JSX_rect}
            </GoogleMap>
          }
        />
      </section>
    );
  }
}

export default Map;
