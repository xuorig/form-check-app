/* @flow */

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import ViewerQueries from './queries/ViewerQueries';
import FormCheckQueries from './queries/FormCheckQueries';

import App from './components/App';
import FormCheckPage from './components/FormCheckPage/FormCheckPage';
import FormCheckList from './components/FormCheckList/FormCheckList';
import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import AboutPage from './components/AboutPage/AboutPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import NewFormCheckPage from './components/NewFormCheckPage/NewFormCheckPage';

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
        path="/formcheck/:slug"
        component={FormCheckPage}
        queries={ViewerQueries}
    />
    <Route
        path="/signin"
        component={SignInPage}
        queries={ViewerQueries}
        queryParams={['code']}
    />
    <Route
        path="/signup"
        component={SignUpPage}
    />
    <Route
        path="/about"
        component={AboutPage}
    />
    <Route
        path="/profile"
        component={ProfilePage}
        queries={ViewerQueries}
    />
    <Route
        path="/new-form-check"
        component={NewFormCheckPage}
        queries={ViewerQueries}
    />
  </Route>
)
