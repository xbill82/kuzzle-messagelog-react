import { combineReducers } from 'redux';
import { messages } from './Log.jsx';

const rootReducer = combineReducers({
  messages: messages,
});

export default rootReducer;
