/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import pageNotFoundImg from '../../assets/img/ufo.svg';
import './style.scss';

class PageNotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="page-not-found-container">
          <img src={pageNotFoundImg} alt="page-not-found-img" className="page-not-found-img" />
          <div className="page-not-found-title">
            <p>404</p>
            <p>Page not found</p>
          </div>
        </div>
      </>
    );
  }
}

export default PageNotFound;
