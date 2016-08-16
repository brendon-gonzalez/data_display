import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testFireBase } from '../actions/Firebase.actions';

class App extends Component {
  render() {
    return (
      <div>
        {this.props.data && this.props.data.map((row, i) =>
          <p key={i}>{i} {row.datetime} - Lat: {row.lat} - Lon {row.long}</p>
        )}
        <button onClick={() => this.props.testFireBase(500)}>Increase</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.firebase.get('data')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    testFireBase
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
