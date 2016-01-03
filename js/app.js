/* @flow */

import 'babel/polyfill';

import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { RelayRouter } from 'react-router-relay';

const createBrowserHistory = require('history/lib/createBrowserHistory');

import routes from './routes';

var token = localStorage.getItem('formcheck_token');
var headers = token ? {Authorization: token} : {};

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/v1/graphql', {
    headers: headers
  })
);

ReactDOM.render(
  <RelayRouter history={createBrowserHistory()} routes={routes} />,
    document.getElementById('root')
);
