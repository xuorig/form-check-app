/* @flow */

import React from 'react'
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import Select from 'react-select';

import 'babel/polyfill';
import styles from './NewFormCheckPage.css';

require('react-select/dist/react-select.css');

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

class NewFormCheckPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      loading: false,
      visibility: null,
    };
  }

  onSubmit(e) {

  }

  onDrop(e) {
    console.log(e);
  }

  onVisibilityChanged(e) {
    this.setState({visibility: e.currentTarget.value});
  }

  render() {
    let teams = [
        { value: 'one', label: 'The Dark Orchestra' },
        { value: 'two', label: 'Giroux Team' },
        { value: '3', label: 'Le Sauteur Team' }
    ];
    let athletes = [
        { value: 'one', label: 'XuoriG' },
        { value: 'two', label: 'gLeSauteur' },
        { value: '3', label: 'JonNorth' },
        { value: '4', label: 'JaredEnderton' }
    ];

    let athletesForm = this.state.visibility === 'athletes' ? (
      <div style={{marginTop: '10px'}}>
        <Select multi disabled={false} value={this.state.value} placeholder="Select athletes" options={athletes} onChange={this.handleAthletesChange} />
      </div>
    ) : null;
    let teamForm = this.state.visibility === 'team' ? (
      <div style={{marginTop: '10px'}}>
        <Select multi simpleValue disabled={false} value={this.state.value} placeholder="Select team" options={teams} onChange={this.handleTeamChange} />
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
              <label className="form-check-form__label">Mouvement</label>
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
                <input type="radio" name="visibility" value="public" onChange={this.onVisibilityChanged.bind(this)}/>
                <span className="form-check-form__field-container__radio-container__field-label">Public</span>
                <div className="form-check-form__field-container__radio-container__field_description">Anyone will be able to view and comment on your FormCheck.</div>
              </div>
              <div className="form-check-form__field-container__radio-container">
                <input type="radio" name="visibility" value="team" onChange={this.onVisibilityChanged.bind(this)}/>
                <span className="form-check-form__field-container__radio-container__field-label">Team only</span>
                <div className="form-check-form__field-container__radio-container__field_description">Restrict viewing and commenting to your team only.</div>
                { teamForm }
              </div>
              <div className="form-check-form__field-container__radio-container">
                <input type="radio" name="visibility" value="athletes" onChange={this.onVisibilityChanged.bind(this)}/>
                <span className="form-check-form__field-container__radio-container__field-label">Athlete only</span>
                <div className="form-check-form__field-container__radio-container__field_description">Restrict viewing and commenting to selected athletes only.</div>
                { athletesForm }
              </div>
            </div>

            <div className="form-check-form__field-container">
              <label className="form-check-form__label">Visibility</label>
              <Dropzone onDrop={this.onDrop} className="form-check-form__field-container__dropzone" activeClassName="form-check-form__field-container__dropzone--active">
                <div className="form-check-form__field-container__dropzone__inner">Drop a video here, or click here to upload it.</div>
              </Dropzone>
            </div>

            <div>
              <button onClick={this.onSubmit.bind(this)} type="submit" className="form-check-form__submit-button">Submit Form Check</button>
            </div>
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
        }
      }
    `
  }
});
