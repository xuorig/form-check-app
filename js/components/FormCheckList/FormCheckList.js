/* @flow */

import React from 'react';
import Relay from 'react-relay';
import FormCheck from '../FormCheck/FormCheck';
import FormCheckListFilters from './FormCheckListFilters/FormCheckListFilters';
import styles from './FormCheckList.css';

class FormCheckList extends React.Component {
  render() {
    return (
      <div className={styles['form-check-list']}>
        <FormCheckListFilters />
        <div className={styles['form-check-list__list']}>
          {this.props.viewer.formchecks.edges.map(edge =>
            <div className="item-container" key={edge.node.__dataID__}>
              <FormCheck formcheck={edge.node} />
            </div>
          )}
        </div>
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
              ${FormCheck.getFragment('formcheck')}
            },
          },
        },
      }
    `,
  },
});
