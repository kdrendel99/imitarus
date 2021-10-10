import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { id } = action;
  switch (action.type) {
  case c.ADD_USER_LIKE:
    console.log('local reducer like: ' + id)
    return Object.assign({}, state, {
      [id]: {
        id: id
      }
    });
  case c.REMOVE_USER_LIKE:
    console.log('local reducer like delete: ' + id)
    const newState = { ...state };
    delete newState[id];
    return newState;
  default:
    return state;
  }
};