import { auth } from '../Firebase';

export const GET_USER = 'get_user';
// getUser is asynchronous meaning that it doesn't automatically run on the page
export function getUser() {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      dispatch({
        type: GET_USER,
        payload: user,
      });
    });
  };
}

export function login(email, password) {
  return dispatch => auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
  return dispatch => auth.signOut();
}

export function createAccount(email, password) {
  return dispatch => auth.createUserWithEmailAndPassword(email, password);
}
