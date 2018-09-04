import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, savePost, deletePost } from '../actions/postActions';
import { Field, reduxForm, reset } from 'redux-form';
import '../styles/App.css';
import _ from 'lodash';
import PostCard from '../components/PostCard';
import { getUser, logout } from '../actions/userActions';

class App extends Component {
  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <PostCard key={key}>
          <div className="card post" key={key}>
            <div className="card-block">
              <h3 className="card-title">{post.title}</h3>
              <p className="card-text">{post.body}</p>
              <button className="btn btn-danger float-right" onClick={() => this.props.deletePost(key)}>
                Delete
              </button>
            </div>
          </div>
        </PostCard>
      );
    });
  }

  renderField(field) {
    return <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} className={field.class} />;
  }

  onSubmit(values) {
    this.props.savePost(values).then(this.props.dispatch(reset('NewPost')));
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
          <div className="navbar fixed-bottom">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="footerForm">
              <Field name="title" component={this.renderField} label="Title" class="footer-title" />
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
