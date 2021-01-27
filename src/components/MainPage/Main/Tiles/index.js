import React, { Component } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import user from '../../../../store/reducers/user/reducers';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, path, color = '#ff9b9b', lastChild = false, imgSrc, onClick, isAdmin } = this.props;
    const style = { backgroundColor: color };
    if (path && (path.includes('admin_page') && !isAdmin)) {
      return <></>;
    } else {
      return (
        <div className="tile" style={style}>
          {path && (<a href={path} className="tile-path">
            {lastChild && <FontAwesomeIcon icon={faUserGraduate} className="user-icon" />}
            <img src={imgSrc} />
            <p>{name}</p>
          </a>)}
          {!path && (<a className="tile-path" onClick={onClick}>
            {lastChild && <FontAwesomeIcon icon={faUserGraduate} className="user-icon" />}
            <img src={imgSrc} />
            <p>{name}</p>
          </a>)}
        </div>
      );
    }
  }
}

export default Tile;
/*
<div className="mainpage-tile" style={'background-color: ' + color}>
                <a href={href}>
                    <div className="triangle" />
                    <p>{name}</p>
                </a>
            </div>
            */
