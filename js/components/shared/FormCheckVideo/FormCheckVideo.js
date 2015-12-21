/* @flow */

import React from 'react';
import styles from './FormCheckVideo.css';

class FormCheckVideo extends React.Component {
  render() {
    return (
      <div className={styles['video-container']}>
        <video id="my-video" controls width="100%"
        poster="http://vjs.zencdn.net/v/oceans.png">
          <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default FormCheckVideo;
