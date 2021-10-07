// import formVisibleReducer from './form-visible-reducer';
import signupReducer from './signup-reducer';
import loginReducer from './login-reducer';
import selectedPromptReducer from './selected-prompt-reducer';
import postListReducer from './post-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  selectedPrompt: selectedPromptReducer,
  // formVisibleOnPage: formVisibleReducer,
  masterPostList: postListReducer,
  showSignupForm: signupReducer,
  showLoginForm: loginReducer,
  firestore: firestoreReducer
});

export default rootReducer;