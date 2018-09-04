// combine all reducers into one place called rootReducer
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postReducer from './postReducer';
import userReducer from './userReducer';

// will run through a reducer everytime action is dispatched.
// will dispatch those things that matter into their respective places in reducer.
const rootReducer = combineReducers({
  form: formReducer,
  posts: postReducer,
  user: userReducer,
});

export default rootReducer;
