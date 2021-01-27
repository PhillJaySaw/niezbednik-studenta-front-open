/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import errorPageImg from '../../assets/img/error-logo.png';
import './style.scss';

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="error-page-container">
          <img src={errorPageImg} alt="error-page-img" className="error-page-img" />
          <div className="error-page-title">
            <p>Oops!</p>
            <p>Something went wrong.</p>
          </div>
        </div>
      </>
    );
  }
}

export default ErrorPage;
