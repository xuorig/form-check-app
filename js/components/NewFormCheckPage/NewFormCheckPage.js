/* @flow */

import React from 'react'
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import Select from 'react-select';

import 'babel/polyfill';
import styles from './NewFormCheckPage.css';
import $ from 'jquery';
require('react-select/dist/react-select.css');

import AddFormCheckMutation from '../../mutations/AddFormCheckMutation';

import NewFormCheckSubmitSection from './NewFormCheckSubmitSection';

class NewFormCheckPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      loading: false,
      file: null,
      visibility: null,
      uploadingVideo: false,
      videoProgress: 0,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let fields = this.props.viewer.currentUser.presigned_s3_post.fields;
    let url = this.props.viewer.currentUser.presigned_s3_post.url;
    let file = this.state.file

    let form = new FormData();
    form.append('acl', fields.acl)
    form.append('key',fields.key)
    form.append('policy', fields.policy)
    form.append('success_action_status', fields.success_action_status)
    form.append('x-amz-algorithm', fields.x_amz_algorithm)
    form.append('x-amz-credential', fields.x_amz_credential)
    form.append('x-amz-date', fields.x_amz_date)
    form.append('x-amz-signature', fields.x_amz_signature)
    form.append('file', file);

    let self = this;

    self.setState({uploadingVideo: true})
    $.ajax({
      url: url,
      data: form,
      cache: false,
      processData: false,
      contentType: false,
      type: 'POST',
      dataType: 'xml',
      xhr: () => {
        // get the native XmlHttpRequest object
        var xhr = $.ajaxSettings.xhr();
        // set the onprogress event handler
        xhr.upload.onprogress = function(evt) {
          self.setState({videoProgress: Math.round(evt.loaded/evt.total*100)})
          console.log(self.state.videoProgress);
        };
        // set the onload event handler
        xhr.upload.onload = function() {
          self.setState({loading: true});
          self.setState({uploadingVideo: false})
        };
        // return the customized object
        return xhr;
      },
      success: (data) => {
        // This is ugly, why cant we $(data) ?
        let uploadLocation = data.firstChild.firstChild.innerHTML;
        self.submitFormCheck(uploadLocation);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submitFormCheck(uploadLocation) {
    let title = this.refs.title.value;
    let description  = this.refs.description.value;
    let visibilityType = this.state.visibility;
    let teamVisibilityId = this.state.teamVisibilityId;

    let onSuccess = (response) => {
      console.log(response);
      window.location = "/";
    };

    let onFailure = (transaction) => {
      this.setState({loading: false});
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    Relay.Store.update(new AddFormCheckMutation({
      title: title,
      description: description,
      videoUrl: uploadLocation,
      sportId: 1,
      mouvementId: 1,
      visibilityType: visibilityType,
      teamVisibilityId: teamVisibilityId,
    }), {onFailure, onSuccess});
  }

  onDrop(file) {
    console.log(file);
    this.setState({file: file[0]});
  }

  getTeams() {
    return this.props.viewer.currentUser.memberships.edges.map((team) => {
      return { value: team.node.rails_id, label: team.node.name }
    });
  }

  onVisibilityChanged(e) {
    this.setState({visibility: e.currentTarget.value});
  }

  handleTeamChange(team_id) {
    this.setState({teamVisibilityId: team_id});
  }

  render() {
    let dropzoneFileSection = this.state.file ? (
      <div className="form-check-form__field-container__dropzone__inner">{this.state.file.name}</div>
    ) : <div className="form-check-form__field-container__dropzone__inner">Drop a video here, or click here to upload it.</div>

    let teamForm = this.state.visibility === 'team' ? (
      <div style={{marginTop: '10px'}}>
        <Select multi simpleValue disabled={false} value={this.state.teamVisibilityId} placeholder="Select team" options={this.getTeams()} onChange={this.handleTeamChange.bind(this)} />
      </div>
    ) : null;

    return (
      <div className="page">
        <div className="page__header">
          <span className="page__header__title">
            New FormCheck
          </span>
        </div>
        <div className="page__body">
          <form className="form-check-form">

            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Title</label>
              <input className="form-check-form__input-field" type="text" ref="title"/>
            </div>

            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Description</label>
              <textarea  className="form-check-form__textarea-field" type="text" ref="description"/>
            </div>

            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Video</label>
              <Dropzone onDrop={this.onDrop.bind(this)} className="form-check-form__field-container__dropzone" activeClassName="form-check-form__field-container__dropzone--active">
                { dropzoneFileSection }
              </Dropzone>
            </div>

            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Sport</label>
              <select className="form-check-form__select-field" ref="mouvement">
                <option value="1">Weightlifting</option>
                <option value="1">CrossFit</option>
                <option value="1">Powerlifting</option>
                <option value="1">Basketball</option>
                <option value="1">Hockey</option>
                <option value="1">Football</option>
              </select>
            </div>

            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Mouvement</label>
              <select className="form-check-form__select-field" ref="mouvement">
                <option value="1">Squat</option>
                <option value="1">Snatch</option>
                <option value="1">Clean and Jerk</option>
                <option value="1">Slap Shot</option>
                <option value="1">Tackle</option>
                <option value="1">Lay Up</option>
              </select>
            </div>

            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Visibility</label>
              <div className="form-check-form__field-container__radio-container">
                <input type="radio" name="visibility" value="public" onChange={this.onVisibilityChanged.bind(this)} ref="vis"/>
                <span className="form-check-form__field-container__radio-container__field-label">Public</span>
                <div className="form-check-form__field-container__radio-container__field_description">Anyone will be able to view and comment on your FormCheck.</div>
              </div>
              <div className="form-check-form__field-container__radio-container">
                <input type="radio" name="visibility" value="team" onChange={this.onVisibilityChanged.bind(this)} ref="vis"/>
                <span className="form-check-form__field-container__radio-container__field-label">Team only</span>
                <div className="form-check-form__field-container__radio-container__field_description">Restrict viewing and commenting to your team only.</div>
                { teamForm }
              </div>
            </div>

            <NewFormCheckSubmitSection loading={this.state.loading}
              uploadingVideo={this.state.uploadingVideo} videoProgress={this.state.videoProgress}
              onSubmit={this.onSubmit.bind(this)}/>
          </form>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(NewFormCheckPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        currentUser {
          email
          presigned_s3_post {
            url
            fields {
              key
              success_action_status
              acl
              policy
              x_amz_credential
              x_amz_algorithm
              x_amz_date
              x_amz_signature
            }
          }
          memberships(first: 10) {
            edges {
              node {
                rails_id
                name
              }
            }
          }
        }
      }
    `
  }
});
