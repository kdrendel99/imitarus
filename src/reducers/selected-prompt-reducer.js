import * as c from './../actions/ActionTypes';

const initialState = {
  selectedPrompt: null,
}

export default (state = initialState, action) => {
  const { id } = action;
  switch (action.type){
    case c.ADD_SELECTED_PROMPT:
      return Object.assign({}, state, {
        selectedPrompt: id
      })
    case c.REMOVE_SELECTED_PROMPT:
      return Object.assign({}, state, {
        selectedPrompt: null
      })
      // default:
      //   return state;
  }
  return state;
};