/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getLoginLink } from '../../store/reducers/userLogin/actions';
import LocaleSelector from '../LocaleSelector';
import './style.scss';
import logo from '../../assets/img/logo-big.png';
import { Spinner } from 'react-bootstrap';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends React.Component {
  componentDidUpdate() {
    const { isPending, loginUrl } = this.props;
    if (!isPending && loginUrl !== '') {
      window.location.href = `${loginUrl}`;
    }
  }

  render() {
    const { getLoginLink, oAuthToken, isPending } = this.props;
    if (oAuthToken !== '') {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-wrapper">
        <div className="logo-container">
          <img src={logo} alt="logo" className="login-logo" />
        </div>
        <div className="content-container">
          <div className="row text-center">
            <div className="col">
              <p className="login-title">
                <FormattedMessage id="login.login-info" />
              </p>
            </div>
          </div>
          <div className="row text-center">
            <div className="col">
              <div className="login-btn button" type="submit" onClick={getLoginLink}>
                <p className="login-btn-text">
                  {isPending ? (
                    <Spinner animation="border" role="status" />
                  ) : (
                    <FormattedMessage id="login.login-button button" />
                  )}
                </p>
              </div>
            </div>
          </div>
          <LocaleSelector />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUrl: state.userLogin.loginUrl,
  oAuthToken: state.userLogin.oAuthToken,
  oAuthTokenSecret: state.userLogin.oAuthTokenSecret,
  oAuthCallbackConfirmed: state.userLogin.oAuthCallbackConfirmed,
  isPending: state.userLogin.isPending,
});

const mapDispatchToProps = (dispatch) => ({
  getLoginLink: () => dispatch(getLoginLink()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
