import { database } from '../Firebase';
export const FETCH_POSTS = 'fetch_posts';
export const POST_STATUS = 'post_status';

export function getPosts() {
  return dispatch => {
    // loading
    dispatch({
      type: POST_STATUS,
      payload: true,
    });
    // not loading
    database.on(
      'value',
      snapshot => {
        dispatch({
          type: POST_STATUS,
          payload: false,
        });
        dispatch({
          type: FETCH_POSTS,
          payload: snapshot.val(),
        });
        // dispatch another callback function on .on
      },
      () => {
        dispatch({
          type: POST_STATUS,
          // -1 indicates tried to load & will load again in the future
          payload: -1,
        });
      }
    );
  };
}

export function savePost(post) {
  return dispatch => database.push(post);
}

export function deletePost(id) {
  return dispatch => database.child(id).remove();
}
