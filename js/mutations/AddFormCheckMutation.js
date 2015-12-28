import Relay from 'react-relay';

export default class AddFormCheckMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addFormCheck}`;
  }

  getVariables() {
    return {
      title: this.props.title,
      description: this.props.description,
      videoUrl: this.props.videoUrl,
      mouvementId: this.props.mouvementId,
      sportId: this.props.sportId,
      visibility: this.props.visibility,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddFormCheckPayload {
        rails_id
        title
        description
        videoUrl
        mouvementId
        sportId
        visibility
      }
    `;
  }

  getConfigs() {
      return [{
        type: 'REQUIRED_CHILDREN',
        // Forces these fragments to be included in the query
        children: [Relay.QL`
          fragment on AddFormCheckPayload {
            rails_id
          }
        `],
      }];
    }
}
