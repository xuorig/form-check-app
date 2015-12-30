import Relay from 'react-relay';

export default class AddCommentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addComment}`;
  }

  getVariables() {
    return {
      formCheckId: this.props.formCheckRailsId,
      content: this.props.content,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddCommentPayload {
        formcheck { comments },
        newCommentEdge,
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'formcheck',
      parentID: this.props.formCheckId,
      connectionName: 'comments',
      edgeName: 'newCommentEdge',
      rangeBehaviors: {
        '': 'append',
        'orderby(newest)': 'prepend',
      },
    }];
  }
}
