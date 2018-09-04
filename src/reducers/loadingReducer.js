import { POST_STATUS } from '../actions/postActions';
import { USER_STATUS } from '../actions/userActions';

export default function(state = {}, action) {
  switch (action.type) {
    case POST_STATUS:
      // keep track of old state, but make sure to keep up with new posts loading state
      return { ...state, posts: action.payload };
    case USER_STATUS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
