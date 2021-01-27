/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ErrorPage from '../../components/ErrorPage';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, errorInfo){
        this.setState({
            hasError: true,
            error,
            errorInfo
        })
    }

    render() { 
        const {hasError} = this.state
        const {children} = this.props

        if(hasError)
            return <ErrorPage />

        return children
    }
}
 
export default ErrorBoundary;