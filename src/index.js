import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC36N-mC0X0AH_KWmRhEvznWMsFC7_v5UI",
  authDomain: "qwerty-e2961.firebaseapp.com",
  databaseURL: "https://qwerty-e2961.firebaseio.com",
  projectId: "qwerty-e2961",
  storageBucket: "qwerty-e2961.appspot.com",
  messagingSenderId: "719100001866"
};
firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();