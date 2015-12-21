/* @flow */

import React from 'react'
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import 'babel/polyfill';

class AboutPage extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="page__header">
          <span className="page__header__title">
            About MyFormCheck
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

export default AboutPage;
