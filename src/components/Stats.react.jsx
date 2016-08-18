import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearRect, clearGeofence, toggleDropOffs } from '../actions/Map.actions';

class Stats extends Component {
  removeRect() {
    const { clearRect, clearGeofence } = this.props;
    clearRect();
    clearGeofence();
  }
  render() {
    const { showDropOffs, toggleDropOffs, rect } = this.props;
    return (
      <div className="stats-container">
        <h2>Fencing</h2>
        {rect &&
          <button onClick={() => this.removeRect()}>
            Remove Shape
          </button>}
        <button onClick={() => toggleDropOffs()}>
          {showDropOffs ? 'Hide' : 'Show'} Dropoffs
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rect: state.map.get('rect'),
    showDropOffs: state.map.get('showDropOffs')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleDropOffs,
    clearRect,
    clearGeofence
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);
