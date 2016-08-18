import React, { PropTypes } from 'react';
import Map from './Map.react';
import Stats from './Stats.react';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchInitialData, setGeofence, setRect } from '../actions/Map.actions';

class App extends Component {
  componentWillMount() {
    this.props.fetchInitialData();
  }

  onDrawingComplete(e) {
    const { rect, setRect, setGeofence } = this.props;
    // Slightly too narrow. The structure is in place for a more
    // complex poly, but for the given time constraints, i'm just
    // doing rectangles/squares.
    const ne = e.overlay.getBounds().getNorthEast();
    const sw = e.overlay.getBounds().getSouthWest();
    setGeofence({
      lngs: [sw.lng(), ne.lng(), ne.lng(), sw.lng()],
      lats: [sw.lat(), sw.lat(), ne.lat(), ne.lat()]
    });
    e.overlay.setMap(null);
    if (!rect) {
      setRect({
        north: ne.lat(),
        south: sw.lat(),
        west: sw.lng(),
        east: ne.lng()
      });
    }
  }

  render() {
    const { rect, pickUps, mapBounds, showDropOffs } = this.props;
    return (
      <div className="content">
        <Map
          onDrawingComplete={(e) => this.onDrawingComplete(e)}
          showDropOffs={showDropOffs}
          mapBounds={mapBounds}
          pickUps={pickUps}
          rect={rect}
        />
        <Stats

        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pickUps: state.map.get('pickUps'),
    dropOffs: state.map.get('dropOffs'),
    mapBounds: state.map.get('mapBounds'),
    showDropOffs: state.map.get('showDropOffs'),
    rect: state.map.get('rect')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInitialData,
    setGeofence,
    setRect
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
