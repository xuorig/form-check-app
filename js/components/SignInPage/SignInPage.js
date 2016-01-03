/* @flow */

import React from 'react'
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import 'babel/polyfill';
import styles from './SignInPage.css';

import SignInMutation from '../../mutations/SignInMutation';
import FacebookLoginMutation from '../../mutations/FacebookLoginMutation';


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
    window.location = `https://www.facebook.com/dialog/oauth?client_id=${app_id}&redirect_uri=${redirect_uri}`;
  }

  componentDidMount() {
    // Facebook redirect
    if (this.props.code) {
      //console.log(this.props.code);
      this.facebookLogin(this.props.code);
    }
  }

  facebookLogin(code) {
    let onSuccess = (response) => {
      this.setState({loading: false});
      console.log(response);
    };

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

  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;

    let onSuccess = (response) => {
      this.setState({loading: false});
      console.log(response);
      let access_token = response.signin.access_token;
      localStorage.setItem('formcheck_token', access_token);
      window.location = "/";
    };

    let onFailure = (transaction) => {
      this.setState({loading: false});
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    this.setState({loading: true});

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
          </form>

          <a href="#" onClick={this.handleClick.bind(this)}>Login</a>

          <div id="status">
          </div>
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
