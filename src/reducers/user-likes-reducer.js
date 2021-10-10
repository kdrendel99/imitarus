import * as c from './../actions/ActionTypes';

const initialState = {
  userLikes: null,
}

export default (state = initialState, action) => {
  const { userLikes } = action;
  switch (action.type){
    case c.GET_USER_LIKES:
      // console.log(userLikes.name)
      // console.log("in reducer")

      return Object.assign({}, state, {
        userLikes: userLikes
      })
      // default:
      //   return state;
  }
  return state;
};