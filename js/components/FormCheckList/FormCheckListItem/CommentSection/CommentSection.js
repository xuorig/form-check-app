/* @flow */

import React from 'react';
import Relay from 'react-relay';

class CommentSection extends React.Component {
  render() {
    return (
      <div className={styles['comment-section']}>
      </div>
    );
  }
}

export default Relay.createContainer(FormCheckListItem, {
  fragments: {
    formcheck: () => Relay.QL`
      fragment on FormCheck {
        comments {
          author {
            name
          }
          created_at
          content
        }
      }
    `,
  },
});
