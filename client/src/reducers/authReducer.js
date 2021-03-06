import { SET_CURRENT_USER } from '../actions/types.js';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        //set the user
        user: action.payload
      };
    default:
      return state;
  }
}
