/* @flow */

import React from 'react'
import ReactDOM from 'react-dom';
import Relay from 'react-relay'

import 'babel/polyfill';

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="page__header">
          <span className="page__header__title">
            {this.props.viewer.currentUser.username}
          </span>
        </div>
        <div className="page__body">
          <p>
Curabitur eu nunc et nisi finibus placerat. Praesent venenatis nibh sed feugiat pulvinar. Etiam in augue gravida, volutpat mi interdum, mollis diam. Vestibulum sollicitudin massa ipsum, quis fringilla mauris fringilla sed. Nunc eleifend urna et bibendum efficitur. Proin malesuada, sem vitae pretium volutpat, sapien.
          </p>

          <p>
Curabitur eu nunc et nisi finibus placerat. Praesent venenatis nibh sed feugiat pulvinar. Etiam in augue gravida, volutpat mi interdum, mollis diam. Vestibulum sollicitudin massa ipsum, quis fringilla mauris fringilla sed. Nunc eleifend urna et bibendum efficitur. Proin malesuada, sem vitae pretium volutpat, sapien.
          </p>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(ProfilePage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        currentUser {
          email
          username
        }
      }
    `,
  },
});
