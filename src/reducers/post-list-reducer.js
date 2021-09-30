import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { 
    // title, 
    // body, 
    // score, 
    score, vote, id } = action;
  switch (action.type) {
  // case c.ADD_POST:
  //   return Object.assign({}, state, {
  //     [id]: {
  //       title: title,
  //       body: body,
  //       score: score,
  //       id: id
  //     }
  //   });
  case c.DELETE_POST:
    let newState = { ...state };
    delete newState[id];
    return newState;
  // case c.UPDATE_SCORE:
  //   const updatedScore = score + vote;
  //   // const currScore = state[id].score;
  //   // const updatedPost = {...state[id], score: currScore + vote};
  //   // const updatedState = {...state, [id]: updatedPost}
  //   return updatedScore;
  default:
    return state;
  }
};