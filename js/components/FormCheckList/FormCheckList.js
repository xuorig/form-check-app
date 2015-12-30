/* @flow */

import React from 'react';
import Relay from 'react-relay';
import FormCheck from '../FormCheck/FormCheck';
import FormCheckListFilters from './FormCheckListFilters/FormCheckListFilters';
import styles from './FormCheckList.css';
import Button from '../shared/Buttons/Button';

class FormCheckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  loadMore(e) {
    e.preventDefault();
    let count = this.props.relay.variables.count;
    this.setState({loading: true});
    this.props.relay.setVariables({
      count: count + 3
    }, (readyState) => {
      if (readyState.done) {
        console.log('done');
        this.setState({loading: false});
      }
    });
  }

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
          <Button loading={this.state.loading} onClickFunc={this.loadMore.bind(this)} text="Load More" />
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(FormCheckList, {
  initialVariables: {
    count: 3,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        formchecks(first: $count) {
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
