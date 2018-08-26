import React from 'react';
import ReactDOM from 'react-dom';
import ListPosts from './containers/ListPosts';
import registerServiceWorker from './registerServiceWorker';
// create our global store and apply our middleware for redux
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
// will match up react and redux
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// wrap this in provider to bind redux to react application
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/CreateAccount" component={CreateAccount} />
        <Route path="/Login" component={Login} />
        <Route path="/" component={ListPosts} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
