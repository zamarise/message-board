import React, { Component } from 'react';
import SimpleBox from '../components/SimpleBox';
import InputField from '../components/InputField';
import FooterFormButton from '../components/FooterFormButton';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
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
