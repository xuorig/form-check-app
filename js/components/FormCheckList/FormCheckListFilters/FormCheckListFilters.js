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
      </div>
    );
  }
}

export default FormCheckListFilters;
