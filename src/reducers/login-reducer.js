import * as c from './../actions/ActionTypes';

export default (state = false, action) => {
  console.log('login reducer')
  switch (action.type) {
  case c.TOGGLE_LOGIN_FORM:
    return !state;
  default:
    return state;
  }
};