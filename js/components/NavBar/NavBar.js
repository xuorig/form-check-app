/* @flow */

import React from 'react'
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import 'babel/polyfill';
import styles from './NavBar.css';

class NavBar extends React.Component {
  render() {
    let userLink;
    if (this.props.viewer.currentUser) {
      userLink = <a href="#/login" className={styles['navbar__content__nav-link']}>{this.props.viewer.currentUser.email}</a>
    } else {
      userLink = (<span>
        <a href="#/signin" className={styles['navbar__content__nav-link']}>Sign In</a>
        <a href="#/signup" className={styles['navbar__content__nav-link']}>Sign Up</a>
      </span>)
    }

    return (
      <nav className={styles.navbar}>
        <div className={styles.navbar__content}>
          <div className={styles.navbar__content__brand}><a href="#"></a></div>
          <div className={styles.navbar__content__nav}>
            <a className={styles['navbar__content__nav-link']}href="#/about">About</a>
            <a className={styles['navbar__content__nav-link']}href="#">FAQ</a>
            { userLink }
          </div>
        </div>
      </nav>
    );
  }
}

export default Relay.createContainer(NavBar, {
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
