/* @flow */

import React from 'react';
import styles from './FormCheckVideo.css';

class FormCheckVideo extends React.Component {
  render() {
    let url = this.props.url || "http://vjs.zencdn.net/v/oceans.mp4";
    return (
      <div className={styles['video-container']}>
        <video id="my-video" controls width="100%"
        poster={this.props.thumb_url}>
          <source src={url} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default FormCheckVideo;
