/* @flow */

import React from 'react';
import Relay from 'react-relay';
import FormCheckVideo from '../shared/FormCheckVideo/FormCheckVideo';
import CommentSection from './CommentSection/CommentSection';

class FormCheck extends React.Component {
  render() {
    let rails_id = this.props.formcheck.rails_id;
    return (
      <article className="item-container__form-check">
        <header className="item-container__form-check__header">
          <a href="#" className="item-container__form-check__header__athlete">
            Marc-Andre Giroux
          </a>
          <a href={`#/formcheck/${rails_id}`} className="item-container__form-check__header__title">
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
           <FormCheckVideo />
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
        id,
        rails_id,
        title,
        description,
        ${CommentSection.getFragment('formcheck')}
      }
    `,
  },
});
