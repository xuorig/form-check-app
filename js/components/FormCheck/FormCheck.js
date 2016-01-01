/* @flow */

import React from 'react';
import Relay from 'react-relay';
import FormCheckVideo from '../shared/FormCheckVideo/FormCheckVideo';
import CommentSection from './CommentSection/CommentSection';

class FormCheck extends React.Component {
  render() {
    let slug = this.props.formcheck.slug;
    return (
      <article className="item-container__form-check">
        <header className="item-container__form-check__header">
          <a href="#" className="item-container__form-check__header__athlete">
            {this.props.formcheck.user.username}
          </a>
          <a href={`#/formcheck/${slug}`} className="item-container__form-check__header__title">
            {this.props.formcheck.title}
          </a>
          <a href="#" className="item-container__form-check__header__time">
            1h
          </a>
        </header>
        <div className="item-container__form-check__body">
           <div className="item-container__form-check__body__description">
             {this.props.formcheck.description}
           </div>
           <FormCheckVideo url={this.props.formcheck.video_url} thumb_url={this.props.formcheck.thumbnail_url}/>
        </div>
        <CommentSection formcheck={this.props.formcheck}/>
      </article>
    );
  }
}

export default Relay.createContainer(FormCheck, {
  fragments: {
    formcheck: () => Relay.QL`
      fragment on FormCheck {
        id
        rails_id
        slug
        video_url
        title
        description
        user {
          username
        }
        ${CommentSection.getFragment('formcheck')}
      }
    `,
  },
});
