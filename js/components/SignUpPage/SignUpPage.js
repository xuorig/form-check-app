/* @flow */

import React from 'react'
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import 'babel/polyfill';
import styles from './SignUpPage.css';

import SignUpMutation from '../../mutations/SignUpMutation';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      loading: false,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let fullname = this.refs.fullname.value;
    let email = this.refs.email.value;
    let username = this.refs.username.value;
    let password = this.refs.password.value;

    let onSuccess = (response) => {
      this.setState({loading: false});
      console.log(response);
      let access_token = response.signup.access_token;
      localStorage.setItem('formcheck_token', access_token);
      window.location = "/";
    };

    let onFailure = (transaction) => {
      this.setState({loading: false});
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    this.setState({loading: true});

    Relay.Store.update(new SignUpMutation({
      fullname: fullname,
      email: email,
      username: username,
      password: password
    }), {onFailure, onSuccess});
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <span className="page__header__title">
            Sign Up
          </span>
        </div>
        <div className="page__body">
          <form className="form-check-form">
            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Full Name</label>
              <input className="form-check-form__input-field" type="text" ref="fullname"/>
            </div>
            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Email</label>
              <input className="form-check-form__input-field" type="email" ref="email"/>
            </div>
            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Username</label>
              <input className="form-check-form__input-field" type="text" ref="username"/>
            </div>
            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Password</label>
              <input className="form-check-form__input-field" type="password" ref="password"/>
            </div>
            <div>
              <button type="submit" onClick={this.onSubmit.bind(this)} className="form-check-form__submit-button">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(SignUpPage, {
  fragments: {}
});
