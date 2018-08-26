import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// create our global store and apply our middleware for redux
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
// will match up react and redux
import { Provider } from 'react-redux';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// wrap this in provider to bind redux to react application
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
