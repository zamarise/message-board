import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, getUser } from '../actions/userActions';
import FooterFormButton from '../components/FooterFormButton';
import InputField from '../components/InputField';
import SimpleBox from '../components/SimpleBox';
import ErrorAlert from '../components/ErrorAlert';
import { errStyle } from '../helpers/ReduxFormValidation';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  componentWillMount() {
    if (this.props.user !== null) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null) {
      nextProps.history.push('/');
    }
  }

  submitLogin(event) {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password).catch(err => {
      this.setState({
        error: err,
      });
    });
  }

  renderBody() {
    return (
      <div>
        <form
          onSubmit={event => {
            this.submitLogin(event);
          }}
        >
          <InputField
            id="email"
            type="text"
            label="Email"
            inputAction={event => this.setState({ email: event.target.value })}
            style={this.state.error ? errStyle : null}
          />

          <InputField
            id="password"
            type="password"
            label="Password"
            inputAction={event => this.setState({ password: event.target.value })}
            style={this.state.error ? errStyle : null}
          />

          {this.state.error && <ErrorAlert>Your username and/or password is incorrect.</ErrorAlert>}

          <FooterFormButton
            submitLabel="Sign in"
            otherLabel="Create Account"
            goToLink="/CreateAccount"
            {...this.props}
          />
        </form>
      </div>
    );
  }
  render() {
    // console.log(this.state);
    return (
      <div>
        <SimpleBox title="Sign in" body={this.renderBody()} />
      </div>
    );
  }
}

// to get the user
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(
  mapStateToProps,
  { login, getUser }
)(Login);
