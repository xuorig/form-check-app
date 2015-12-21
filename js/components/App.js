/* @flow */

import React from 'react';
import Relay from 'react-relay';
import 'normalize.css';
import styles from '../GlobalStyles.css';

import NavBar from './NavBar/NavBar';
import FormCheckList from './FormCheckList/FormCheckList';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <NavBar viewer={this.props.viewer}/>
        {this.props.children}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${NavBar.getFragment('viewer')}
        ${FormCheckList.getFragment('viewer')}
      }
    `,
  },
});
