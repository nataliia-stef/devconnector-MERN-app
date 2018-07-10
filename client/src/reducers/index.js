import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  //will be connected with the mapStateToProps function
  auth: authReducer,
  errors: errorReducer
});
