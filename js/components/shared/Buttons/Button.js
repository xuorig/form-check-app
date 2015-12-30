import React from 'react';
import Relay from 'react-relay';

import 'babel/polyfill';
import styles from './Button.css';
import Spinner from '../Spinner/Spinner';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let content = this.props.loading ? <Spinner /> : (<a href={this.props.href || '#'} className={styles.button} onClick={this.props.onClickFunc}>
        {this.props.text}
       </a>)
    return (
      <div className={styles['button-container']}>
        {content}
      </div>
    );
  }
}

export default Relay.createContainer(Button, {
  fragments: {}
});
