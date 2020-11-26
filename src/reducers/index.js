import { combineReducers } from 'redux';
import applicationStateReducer from './applicationStateReducer';
import authReducer from './authReducer';
import postingsReducer from './postingsReducer';

export default combineReducers({
  auth: authReducer,
  postings: postingsReducer,
  applicationState: applicationStateReducer,
});
