import React from 'react';
import ReactDOM from 'react-dom';
// will match up react and redux
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// create our global store and apply our middleware for redux
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import AuthenticatedComponent from './containers/AuthenticatedComponent';
import CreateAccount from './containers/CreateAccount';
import ListPosts from './containers/ListPosts';
import LoadingComponent from './containers/LoadingComponent';
import Login from './containers/Login';
import PostDetail from './containers/PostDetail';
import reducers from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// wrap this in provider to bind redux to react application
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <LoadingComponent>
        <Switch>
          <Route path="/CreateAccount" component={CreateAccount} />
          <Route path="/Login" component={Login} />
          <AuthenticatedComponent>
            <Route path="/:id" component={PostDetail} />
            <Route exact path="/" component={ListPosts} />
          </AuthenticatedComponent>
        </Switch>
      </LoadingComponent>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
