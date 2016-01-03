import Relay from 'react-relay';

export default class SignInMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {facebookLogin}`;
  }

  getVariables() {
    return {
      authorization_code: this.props.authorization_code,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on FacebookLoginPayload {
        access_token
      }
    `;
  }

  getConfigs() {
      return [{
        type: 'REQUIRED_CHILDREN',
        // Forces these fragments to be included in the query
        children: [Relay.QL`
          fragment on FacebookLoginPayload {
            access_token
          }
        `],
      }];
    }
}
