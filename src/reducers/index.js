import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postingsReducer from './postingsReducer';

export default combineReducers({
  auth: authReducer,
  postings: postingsReducer,
});
