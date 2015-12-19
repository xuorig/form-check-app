/* @flow */

import React from 'react';
import Relay from 'react-relay';
import FormCheckListItem from './FormCheckListItem/FormCheckListItem';

class FormCheckList extends React.Component {
  render() {
    return (
      <div className="form-check-list">
        {this.props.viewer.formchecks.edges.map(edge =>
          <div className="item-container" key={edge.node.id}>
            <FormCheckListItem formcheck={edge.node} />
          </div>
        )}
      </div>
    );
  }
}

export default Relay.createContainer(FormCheckList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        formchecks(first: 10) {
          edges {
            node {
              ${FormCheckListItem.getFragment('formcheck')}
            },
          },
        },
      }
    `,
  },
});
