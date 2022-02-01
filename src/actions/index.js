import * as c from './ActionTypes';
//ACTION CREATORS

export const deletePost = id => ({
  type: c.DELETE_POST,
  id
});

export const updateScore = (id, vote) => ({
  type: c.UPDATE_SCORE,
  id,
  vote: vote
})