/* @flow */

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import ViewerQueries from './queries/ViewerQueries';
import FormCheckQueries from './queries/FormCheckQueries';

import App from './components/App';
import FormCheckPage from './components/FormCheckPage/FormCheckPage';
import FormCheckList from './components/FormCheckList/FormCheckList';

export default (
  <Route
    path="/"
    component={App}
    queries={ViewerQueries}
  >
    <IndexRoute
      component={FormCheckList}
      queries={ViewerQueries}
    />
    <Route
        path="/formcheck/:id"
        component={FormCheckPage}
        queries={ViewerQueries}
    />
  </Route>
)
