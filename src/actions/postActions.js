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
          type: FETCH_POSTS,
          payload: snapshot.val(),
        });
        dispatch({
          type: POST_STATUS,
          payload: false,
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

export function savePost(post, uid) {
  return dispatch => database.push({ ...post, uid });
}

export function deletePost(id) {
  return dispatch => database.child(id).remove();
}

export function saveComment(comment, id, uid) {
  return dispatch =>
    database
      .child(id)
      .child('comments')
      .push({ content: comment.content, uid });
}

export function deleteComment(postId, commentId) {
  return dispatch =>
    database
      .child(postId)
      .child('comments')
      .child(commentId)
      .remove();
}
