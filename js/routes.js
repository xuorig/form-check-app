/* @flow */

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import ViewerQueries from './queries/ViewerQueries';
import App from './components/App';


export default (
  <Route
    path="/"
    component={App}
    queries={ViewerQueries}
  >
  </Route>
)
