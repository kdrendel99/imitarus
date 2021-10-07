import * as c from './../actions/ActionTypes';

export default (state = false, action) => {
  // console.log(action.type)
  // console.log('in sign up')
  switch (action.type) {
  case c.TOGGLE_SIGNUP_FORM:
    return !state;
  default:
    return state;
  }
};