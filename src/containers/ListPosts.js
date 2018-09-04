import '../styles/App.css';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/es/Link';
import { Field, reduxForm, reset } from 'redux-form';
import { deletePost, getPosts, savePost } from '../actions/postActions';
import { getUser, logout } from '../actions/userActions';
import PostCard from '../components/PostCard';
import { errStyle, required } from '../helpers/ReduxFormValidation';

class App extends Component {
  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <PostCard key={key}>
          <Link to={`/${key}`}>
            <h3>{post.title}</h3>
          </Link>
          <p className="card-text">{post.body}</p>
          {post.uid === this.props.user.uid && (
            <button className="btn btn-danger float-right" onClick={() => this.props.deletePost(key)}>
              Delete
            </button>
          )}
        </PostCard>
      );
    });
  }

  renderField(field) {
    return (
      <input
        type="text"
        placeholder={`Enter a ${field.label}...`}
        {...field.input}
        className={field.class}
        style={field.meta.touched && field.meta.error ? errStyle : null}
      />
    );
  }

  onSubmit(values) {
    this.props.savePost(values, this.props.user.uid).then(this.props.dispatch(reset('NewPost')));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="navbar">
          <button
            className="btn btn-danger"
            onClick={() => {
              this.props.logout();
            }}
          >
            Sign out
          </button>
        </div>
        <div className="container">
          <div className="main">{this.renderPosts()}</div>

          <div className="navbar fixed-bottom d-block">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="footerForm">
              <Field name="title" component={this.renderField} label="Title" class="footer-title" validate={required} />

              <Field name="body" component={this.renderField} label="Body" class="footer-body" />

              <button type="submit" className="btn footer-button">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: 'NewPost',
})(App);
// whenever ownProps is included, it's going to take whatever reducers intial state it had and use it
form = connect(
  (state, ownProps) => ({
    posts: state.posts,
    user: state.user,
  }),
  { savePost, getPosts, deletePost, getUser, logout }
)(form);

export default form;
