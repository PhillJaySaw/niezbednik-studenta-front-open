/* eslint-disable react/jsx-indent */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react'
//import './style.scss' 

class CurrentPageTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {title} = this.props;
        return (
            <>
            <div className="title-container">
                <div className='current-page-title'>
                    <p className="title">{title.toUpperCase()}</p>
                    <div className="title-line" />
                </div>
            </div>
            </>
        );
    }
}

export default CurrentPageTitle;