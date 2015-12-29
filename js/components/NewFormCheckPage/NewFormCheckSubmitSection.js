/* @flow */

import React from 'react'
import ReactDOM from 'react-dom';
import 'babel/polyfill';
import './NewFormCheckSubmitSection.css';
import Spinner from '../shared/Spinner/Spinner';

class NewFormCheckSubmitSection extends React.Component {
  render () {
    let submitSection;

    if (this.props.uploadingVideo) {
      let percentage = `${this.props.videoProgress}%`;
      submitSection = (<div><p>Uploading Video...</p><div className="meter">
	      <span style={{width: percentage}}></span>
      </div></div>);
    } else if (this.props.loading) {
      submitSection = <div><p>Creating Form Check...</p><Spinner/></div>;
    } else {
      submitSection = <button onClick={this.props.onSubmit} type="submit" className="form-check-form__submit-button">Submit Form Check</button>;
    }

    return (
      <div className="submit-section">
        {submitSection}
      </div>
    );
  }
}

export default NewFormCheckSubmitSection;
