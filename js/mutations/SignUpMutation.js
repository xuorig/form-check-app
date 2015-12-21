import Relay from 'react-relay';

export default class SignUpMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {signup}`;
  }

  getVariables() {
    return {
      email: this.props.email,
      username: this.props.username,
      fullname: this.props.fullname,
      password: this.props.password,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SignUpPayload {
        access_token
      }
    `;
  }

  getConfigs() {
      return [{
        type: 'REQUIRED_CHILDREN',
        // Forces these fragments to be included in the query
        children: [Relay.QL`
          fragment on SignUpPayload {
            access_token
          }
        `],
      }];
    }
}
