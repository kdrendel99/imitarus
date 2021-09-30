// import formVisibleReducer from './form-visible-reducer';
import selectedPromptReducer from './selected-prompt-reducer';
import postListReducer from './post-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  selectedPrompt: selectedPromptReducer,
  // formVisibleOnPage: formVisibleReducer,
  masterPostList: postListReducer,
  firestore: firestoreReducer
});

export default rootReducer;