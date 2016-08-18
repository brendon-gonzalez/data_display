import React, { PropTypes } from 'react';
import Map from './Map.react';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchInitialData, setGeofence } from '../actions/Map.actions';

class App extends Component {
  componentWillMount() {
    this.props.fetchInitialData();
  }

  onDrawingComplete(e) {
    const ne = e.overlay.getBounds().getNorthEast();
    const sw = e.overlay.getBounds().getSouthWest();
    this.props.setGeofence({
      lngs: [sw.lng(), ne.lng(), ne.lng(), sw.lng()],
      lats: [sw.lat(), sw.lat(), ne.lat(), ne.lat()]
    });
  }

  render() {
    const { mapPoints, mapBounds } = this.props;
    return (
      <Map
        onDrawingComplete={(e) => this.onDrawingComplete(e)}
        mapBounds={mapBounds}
        mapPoints={mapPoints}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    mapPoints: state.map.get('data'),
    mapBounds: state.map.get('mapBounds')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInitialData,
    setGeofence
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
