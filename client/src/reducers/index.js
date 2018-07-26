import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
  //will be connected with the mapStateToProps function
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});
