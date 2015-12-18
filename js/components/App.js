/* @flow */

import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Form Checks</h1>
        <ul>
          {this.props.viewer.formchecks.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.title} (ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        formchecks(first: 10) {
          edges {
            node {
              id,
              rails_id,
              title,
              description,
            },
          },
        },
      }
    `,
  },
});
