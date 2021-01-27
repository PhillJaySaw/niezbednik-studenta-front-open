/* eslint-disable react/jsx-indent */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

class AddItemButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name, onClick = () => {} } = this.props;
    return (
      <>
        <div className="add-item-button button" onClick={onClick}>
          <p>{name}</p>
        </div>
      </>
    );
  }
}

export default AddItemButton;
