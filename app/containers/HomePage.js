// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as FileActions from '../actions/file';

function mapStateToProps(state) {
  return {
    file: state.file
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FileActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
