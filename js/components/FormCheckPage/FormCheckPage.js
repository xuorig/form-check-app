/* @flow */

import React from 'react';
import Relay from 'react-relay';
import FormCheck from '../FormCheck/FormCheck';
import FormCheckHistory from '../FormCheckHistory/FormCheckHistory';
import styles from './FormCheckPage.css';

class FormCheckPage extends React.Component {
  render() {
    return (
      <div className={styles['form-check-page']}>
        <div className={styles['form-check-page__form-check-container']}>
          <FormCheck formcheck={this.props.viewer.formcheck} />
        </div>
        <div className={styles['form-check-page__history-container']}>
          <FormCheckHistory formcheck={this.props.viewer.formcheck}/>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(FormCheckPage, {
  initialVariables: {
    slug: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        formcheck(id: $slug) {
          ${FormCheck.getFragment('formcheck')}
          ${FormCheckHistory.getFragment('formcheck')}
        }
      }
    `,
  },
});
