/* @flow */

import React from 'react';
import Relay from 'react-relay';
import styles from './CommentSection.css';

class CommentSection extends React.Component {
  render() {
    return (
      <div className={styles['comment-section']}>
        {this.props.formcheck.comments.edges.map(edge =>
          <div className={styles['comment-section__comment']} key={edge.node.__dataID__}>
            <span className={styles['comment-section__comment__author']}>
              <a href="#">
                <img className={styles['comment-section__comment__author__picture']}
                  src={edge.node.user.profile_pic_url} alt="user profile picture"/>
              </a>
              <a className={styles['comment-section__comment__author__name']} href="#">{ edge.node.user.username}</a>
            </span>
            <span className={styles['comment-section__comment__content']}>
              {edge.node.content}
            </span>
          </div>
        )}
        <div className={styles['comment-section__comment__add-comment']}>
          <span className={styles['comment-section__comment__author']}>
            <a href="#">
              <img className={styles['comment-section__comment__author__picture']}
                src="http://mgiroux.me/assets/images/avatar@2x.png" alt="user profile picture"/>
            </a>
            <a className={styles['comment-section__comment__author__name']} href="#">xuorig</a>
          </span>
          <input type="text" className={styles['comment-section__comment__add-comment__input']}
              placeholder="Leave a comment!"/>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(CommentSection, {
  fragments: {
    formcheck: () => Relay.QL`
      fragment on FormCheck {
        comments(first: 5) {
          edges {
            node {
              user {
                username
                profile_pic_url
              }
              created_at
              content
            }
          }
        }
      }
    `,
  },
});
