import * as c from './../actions/ActionTypes';

const initialState = {
  selectedPrompt: null,
}

export default (state = initialState, action) => {
  const { prompt } = action;
  switch (action.type){
    case c.ADD_SELECTED_PROMPT:
      return Object.assign({}, state, {
        selectedPrompt: prompt
      })
    case c.REMOVE_SELECTED_PROMPT:
      return Object.assign({}, state, {
        selectedPrompt: null
      })
  }
  return state;
};