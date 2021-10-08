// // import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import '../node_modules/boxicons/css/boxicons.css';
import '../node_modules/glightbox/dist/js/glightbox';
import '../node_modules/isotope-layout/dist/isotope.pkgd';
import '../node_modules/swiper/swiper-bundle.min.css';
import '../node_modules/typed.js/src/typed';


import { createStore } from "redux";
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "./firebase";
import 'firebase/auth';
import '../node_modules/lodash'

const store = createStore(rootReducer);

// store.subscribe(() =>
//   console.log(store.getState())
// );

const rrfProps = {
  firebase,
  config: {
        userProfile: "users",
        useFirestoreForProfile: true,
    },
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)



