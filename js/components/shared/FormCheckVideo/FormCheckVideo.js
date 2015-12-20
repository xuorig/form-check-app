/* @flow */

import React from 'react';
import styles from './FormCheckVideo.css';

class FormCheckVideo extends React.Component {
  render() {
    return (
      <div className={styles['video-container']}>
        <video id="my-video" controls preload="auto" width="100%"
        poster="http://vjs.zencdn.net/v/oceans.png" data-setup="{}">
          <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
          </p>
        </video>
      </div>
    );
  }
}

export default FormCheckVideo;
