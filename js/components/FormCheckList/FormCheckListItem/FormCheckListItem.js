/* @flow */

import React from 'react';
import Relay from 'react-relay';

class FormCheckListItem extends React.Component {
  render() {
    return (
      <article className="item-container__form-check">
        <header className="item-container__form-check__header">
          <a href="#" className="item-container__form-check__header__title">
            {this.props.formcheck.title}
          </a>
          <a href="#" className="item-container__form-check__header__athlete">
            Marc-Andre Giroux
          </a>
        </header>
        <div className="item-container__form-check__body">
           (ID: {this.props.formcheck.id})
        </div>
        <div className="item-container__form-check__comments">
          Comments
        </div>
      </article>
    );
  }
}

export default Relay.createContainer(FormCheckListItem, {
  fragments: {
    formcheck: () => Relay.QL`
      fragment on FormCheck {
        id,
        rails_id,
        title,
        description,
      }
    `,
  },
});
