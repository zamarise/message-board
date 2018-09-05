import './env';
import * as firebase from 'firebase';

require('dotenv').config();

const API_KEY = process.env.REACT_APP_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const SENDER_ID = process.env.REACT_APP_SENDER_ID;

const config = {
  apiKey: API_KEY,
  authDomain: `message-board-${API_KEY}.firebaseapp.com`,
  databaseURL: `https://message-board-${AUTH_DOMAIN}.firebaseio.com`,
  projectId: `message-board-${AUTH_DOMAIN}`,
  storageBucket: `message-board-${AUTH_DOMAIN}.appspot.com`,
  messagingSenderId: SENDER_ID,
};
firebase.initializeApp(config);

export const database = firebase.database().ref('posts/');
export const auth = firebase.auth();
