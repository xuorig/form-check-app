import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';
import './FacebookLoginButton.css';

class FacebookLoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a onClick={this.props.onClick} className="btn-auth btn-facebook large" href="#">
          Sign in with <b>Facebook</b>
      </a>
    );
  }
}

export default FacebookLoginButton;
