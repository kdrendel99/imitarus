import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { score, vote, id } = action;
  switch (action.type) {

  case c.DELETE_POST:
    let newState = { ...state };
    delete newState[id];
    return newState;
  default:
    return state;
  }
};