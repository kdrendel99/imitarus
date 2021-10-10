// import formVisibleReducer from './form-visible-reducer';
import userLikesReducer from './user-likes-reducer';
import selectedPromptReducer from './selected-prompt-reducer';
import postListReducer from './post-list-reducer';
import localLikesReducer from './local-likes-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  selectedPrompt: selectedPromptReducer,
  userLikes: userLikesReducer,
  // formVisibleOnPage: formVisibleReducer,
  localLikes: localLikesReducer, 
  masterPostList: postListReducer,
  firestore: firestoreReducer
});

export default rootReducer;