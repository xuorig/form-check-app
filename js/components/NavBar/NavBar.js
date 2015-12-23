/* @flow */

import React from 'react'
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import 'babel/polyfill';
import styles from './NavBar.css';
import DropDownMenu from './DropDownMenu/DropDownMenu';

class NavBar extends React.Component {
  render() {
    let userLink;
    if (this.props.viewer.currentUser) {
      userLink = <DropDownMenu viewer={this.props.viewer} />;
    } else {
      userLink = (<span>
        <a href="#/signin" className={styles['navbar__content__nav-link']}>Sign In</a>
        <a href="#/signup" className={styles['navbar__content__nav-link']}>Sign Up</a>
      </span>);
    }

    return (
      <nav className={styles.navbar}>
        <div className={styles.navbar__content}>
          <a href="#" className={styles.navbar__content__brand}></a>
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
          username
        }
      }
    `,
  }
});
