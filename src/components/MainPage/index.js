/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getAccessToken } from '../../store/reducers/userLogin/actions';
import getParamsFromUrl from '../../helpers/getParamsFromUrl';
import './style.scss';
import Main from './Main';

// eslint-disable-next-line react/prefer-stateless-function
function MainPage(props) {
  const { oAuthTokenLogin, oAuthTokenSecretLogin, oAuthCallbackConfirmed, getAccessToken } = props;
  const oAuthTokenSecret = oAuthTokenSecretLogin;
  const oAuthTokenVerifier = getParamsFromUrl(window.location.href).oauth_verifier;

  useEffect(() => {
    if (oAuthCallbackConfirmed) {
      getAccessToken(oAuthTokenLogin, oAuthTokenSecret, oAuthTokenVerifier);
    }
  });

  const search = props.location.search; // returns the URL query String
  const params = new URLSearchParams(search);
  const redirectParams = params.get('redirect');
  return (
    <div className="main">
      <Main
        redirectParams={redirectParams}
        oAuthToken={oAuthTokenLogin}
        oAuthTokenSecret={oAuthTokenSecretLogin}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  oAuthCallbackConfirmed: state.userLogin.oAuthCallbackConfirmed,
  oAuthToken: state.userLogin.oAuthToken,
  oAuthTokenLogin: state.userLogin.oAuthTokenLogin,
  oAuthTokenSecretLogin: state.userLogin.oAuthTokenSecretLogin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAccessToken: (oAuthTokenLogin, oAuthTokenSecret, oAuthTokenVerifier) =>
      dispatch(getAccessToken(oAuthTokenLogin, oAuthTokenSecret, oAuthTokenVerifier)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MainPage));
