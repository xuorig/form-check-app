/* @flow */

import React from 'react'
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import 'babel/polyfill';
import styles from './DropDownMenu.css';

class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  onMenuClick(e) {
    e.preventDefault();
    console.log("click");
    const currentState = this.state.visible;
    this.setState({visible: !currentState});
  }

  componentDidMount() {
    document.addEventListener("click", this.documentClickHandler.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.documentClickHandler.bind(this));
  }

  documentClickHandler(e) {
    var localNode = ReactDOM.findDOMNode(this);
    var source = e.target;
    var found = false;
    // if source=local then this event came from "somewhere" inside and should be ignored.
    while(source.parentNode) {
      found = (source === localNode);
      if(found) return;
      source = source.parentNode;
    }
    this.setState({visible: false});
  }

  render() {
    let dropdownClass = styles['drop-down-menu__menu']
    if (this.state.visible) {
      dropdownClass = dropdownClass + ' ' + styles['drop-down-menu__menu--visible']
    }

    return (
      <div className={styles['drop-down-menu']}>
        <a href="#" className={styles['drop-down-menu__button']} onClick={this.onMenuClick.bind(this)}>
          <span>{this.props.viewer.currentUser.username}</span>
        </a>
        <div className={dropdownClass}>
          <ul className={styles['drop-down-menu__menu__list']}>
            <li className={styles['drop-down-menu__menu__list__item']}>
              <a href="#/profile" className={styles['drop-down-menu__menu__link']}>
                My Profile
              </a>
            </li>
            <li className={styles['drop-down-menu__menu__list__item']}>
              <a href="#/settings" className={styles['drop-down-menu__menu__link']}>
                Settings
              </a>
            </li>
            <li className={styles['drop-down-menu__menu__list__item']}>
              <a href="#/create-team" className={styles['drop-down-menu__menu__link']}>
                Create a Team
              </a>
            </li>
            <li className={styles['drop-down-menu__menu__list__item'] + ' ' + styles['drop-down-menu__menu__list__item--main']}>
              <a href="#/new-form-check" className={styles['drop-down-menu__menu__link--main']}>
                Upload FormCheck
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default DropDownMenu;
