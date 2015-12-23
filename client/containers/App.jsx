import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessageLog from '../components/MessageLog.jsx';
import * as LogActions from '../actions/LogActions.jsx';

function mapStateToProps(state) {
  // console.log(state);
  return {
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LogActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageLog);
