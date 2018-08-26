import { FETCH_POSTS } from '../actions/postActions';
// this is a reducer of any type
// it will run through every reducer we have
// normal, basic reducer
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
}
