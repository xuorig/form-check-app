/* @flow */

import React from 'react'
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import 'babel/polyfill';
import styles from './SignInPage.css';

import SignInMutation from '../../mutations/SignInMutation';
import FacebookLoginMutation from '../../mutations/FacebookLoginMutation';
import FacebookLoginButton from '../shared/Buttons/FacebookLoginButton';


class SignInPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      message: null,
      loading: false,
    };
  }

  handleClick(e) {
    e.preventDefault();
    let app_id = 1008856875844872;
    let redirect_uri = 'http://localhost:8080/signin';
    window.location = `https://www.facebook.com/dialog/oauth?client_id=${app_id}&redirect_uri=${redirect_uri}&scope=email,public_profile`;
  }

  componentDidMount() {
    // Facebook redirect
    if (this.props.code) {
      //console.log(this.props.code);
      this.facebookLogin(this.props.code);
    }
  }

  facebookLogin(code) {
    let onSuccess = this.onLoginSuccess.bind(this);

    let onFailure = (transaction) => {
      this.setState({loading: false});
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    this.setState({loading: true});

    Relay.Store.update(new FacebookLoginMutation({
      authorization_code: code
    }), {onFailure, onSuccess});
  }

  onLoginSuccess(response) {
    this.setState({loading: false});
    console.log(response);
    const signinResponse = response.signin || response.facebookLogin;
    const access_token = signinResponse.access_token;
    localStorage.setItem('formcheck_token', access_token);
    window.location = "/";
  }

  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;

    let onFailure = (transaction) => {
      this.setState({loading: false});
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    this.setState({loading: true});
    let onSuccess = this.onLoginSuccess.bind(this);

    Relay.Store.update(new SignInMutation({
      email: email,
      password: password
    }), {onFailure, onSuccess});
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <span className="page__header__title">
            Sign In
          </span>
        </div>
        <div className="page__body">
          <form className="form-check-form">
            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Email</label>
              <input className="form-check-form__input-field" type="email" ref="email"/>
            </div>
            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Password</label>
              <input className="form-check-form__input-field" type="password" ref="password"/>
            </div>
            <div>
              <button onClick={this.onSubmit.bind(this)} type="submit" className="form-check-form__submit-button">Sign In</button>
            </div>
            <div>
              <FacebookLoginButton onClick={this.handleClick.bind(this)} />
            </div>
          </form>

        </div>
      </div>
    );
  }
}

export default Relay.createContainer(SignInPage, {
  initialVariables: {
    code: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        currentUser {
          email
        }
      }
    `,
  }
});
