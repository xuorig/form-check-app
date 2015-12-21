/* @flow */

import Relay from 'react-relay';

export default {
  formcheck: () => Relay.QL`query { viewer }`
};
