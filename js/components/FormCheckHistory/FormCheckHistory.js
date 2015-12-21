/* @flow */

import React from 'react';
import Relay from 'react-relay';
import FormCheck from '../FormCheck/FormCheck';
import styles from './FormCheckHistory.css';
var moment = require('moment');

class FormCheckHistory extends React.Component {
  render() {
    debugger;
    let history = this.props.formcheck.user.formchecks.edges;
    console.log(history);
    return (
      <div className={styles['form-check-history']}>
        <div className={styles['form-check-history__header']}>
          {this.props.formcheck.user.username}{"'"}s previous Form Checks
        </div>
        <div className={styles['form-check-history__body']}>
          {history.map(fc =>
            <div className={styles['form-check-history__body__item']} key={fc.node.rails_id}>
              <a href="#">
                <img className={styles['form-check-history__body__item__photo']} src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSMeU26GGOJqDf2oq5tX97KeGuLwutP4xNfonVxW4fbCCQXZ0H1gDY7q4BM"/>
              </a>
              <div className={styles['form-check-history__body__item__info']}>
                <div>
                  <a className={styles['form-check-history__body__item__info__title']} href="#">{fc.node.title}</a>
                </div>
                <div className={styles['form-check-history__body__item__info__date']}>
                  {fc.node.created_at}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(FormCheckHistory, {
  fragments: {
    formcheck: () => Relay.QL`
      fragment on FormCheck {
        user {
          username
          formchecks(first: 8) {
            edges {
              node {
                rails_id
                title
                description
                created_at
              }
            }
          }
        }
      }
    `,
  },
});
