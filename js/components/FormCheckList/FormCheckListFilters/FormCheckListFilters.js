/* @flow */

import React from 'react';
import styles from './FormCheckListFilters.css';

class FormCheckListFilters extends React.Component {
  render() {
    return (
      <div className={styles['form-check-list__filters']}>
        <div className={styles['form-check-list__filters__header']}>
          Filters
        </div>
        <div className={styles['form-check-list__filters__body']}>
          <div className={styles['form-check-list__filters__body__item']}>
            <span className={styles['form-check-list__filters__body__item__label']}>Sport</span>
            <select>
              <option value="0">Crossfit</option>
              <option value="0">Weightlifting</option>
              <option value="0">Powerlifting</option>
            </select>
          </div>
          <div className={styles['form-check-list__filters__body__item']}>
            <span className={styles['form-check-list__filters__body__item__label']}>Mouvement</span>
            <select>
              <option value="0">Bench</option>
              <option value="0">Squat</option>
              <option value="0">Lay Up</option>
            </select>
          </div>
          <div className={styles['form-check-list__filters__body__item']}>
            <span className={styles['form-check-list__filters__body__item__label']}>Athlete</span>
            <input type="text" placeholder="Arnold"/>
          </div>
        </div>
        <div className={styles['form-check-list__filters__header']}>
          My Teams
        </div>
        <div className={styles['form-check-list__filters__body']}>
          <div className={styles['form-check-list__filters__body__item']}>
            <a href="#">
              <img className={styles['form-check-list__filters__body__item__team-pic']}
                src="http://mgiroux.me/assets/images/avatar@2x.png" alt="user profile picture"/>
            </a>
            <a className={styles['form-check-list__filters__body__item__team-name']} href="#">The Dark Orchestra</a>
          </div>
          <div className={styles['form-check-list__filters__body__item']}>
            <a href="#">
              <img className={styles['form-check-list__filters__body__item__team-pic']}
                src="http://s3.amazonaws.com/content.sitezoogle.com/u/50335/f99c69d4108b56b32909dd511adcd28b9ab8f5d0/large/600x400-dark-orchestra-logo-v3.jpg?1412236198" alt="user profile picture"/>
            </a>
            <a className={styles['form-check-list__filters__body__item__team-name']} href="#">Catalyst Athletics</a>
          </div>
        </div>
      </div>
    );
  }
}

export default FormCheckListFilters;
