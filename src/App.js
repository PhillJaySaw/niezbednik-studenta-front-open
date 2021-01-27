import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import { useToasts } from 'react-toast-notifications';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Navigation from './components/Navigation';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Courses from './components/Courses';
import NoticeBoard from './components/NoticeBoard';
import Tutors from './components/Tutors';
import HelpfulLinks from './components/HelpfulLinks';
import AdminPage from './components/AdminPage';
import PageNotFound from './components/PageNotFound';
import Course from './components/Course';
import InfoPage from './components/InfoPage';
import ErrorReport from './components/ErrorReport';
import sendFCMToken from './store/reducers/firebase/action';
import { requestFirebaseNotificationPermission, onMessageListener } from './firebase/firebase';
import { getAccessToken } from './store/reducers/userLogin/actions';
import { checkUserNotifications } from './store/reducers/user/action';

// eslint-disable-next-line react/prefer-stateless-function

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App(props) {
  const {
    checkUserNotifications,
    oAuthToken,
    oAuthTokenSecret,
    location,
    firebaseToken,
    firebasePending,
    intl,
  } = props;

  const { addToast } = useToasts();

  useEffect(() => {
    if (oAuthToken != '' && oAuthTokenSecret != '') {
      checkUserNotifications();
    }

    if (
      !window.location.href.includes('login') &&
      firebase.messaging.isSupported() &&
      oAuthToken &&
      !firebasePending
    ) {
      if (!firebaseToken) {
        requestFirebaseNotificationPermission().catch((err) => {
          return err;
        });
      }
    }
  });

  if (
    !window.location.href.includes('login') &&
    firebase.messaging.isSupported() &&
    firebaseToken
  ) {
    onMessageListener(addToast)
      .then((payload) => {
        const message = intl.locale === 'pl' ? payload.data.messagePl : payload.data.messageEn;
        addToast(`${message}`, { appearance: 'info' });
      })
      .catch((err) => {
        return err;
      });
  }

  useInterval(() => {
    if (!window.location.href.includes('login')) checkUserNotifications();
  }, 300000);

  return (
    <>
      {location.pathname !== '/login' ? <Navigation /> : undefined}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" render={() => <MainPage {...props} />} />
        <Route exact path="/notice_board/:name" component={NoticeBoard} />
        <Route exact path="/courses/:name" component={Courses} />
        <Route exact path="/tutors" component={Tutors} />
        <Route exact path="/helpful_links" component={HelpfulLinks} />
        <Route exact path="/admin_page/:name" component={AdminPage} />
        <Route exact path="/course:id/:name" component={Course} />
        <Route exact path="/about" component={InfoPage} />
        <Route component={PageNotFound} />
      </Switch>
      {location.pathname !== '/login' ? <ErrorReport /> : undefined}
      {oAuthToken === '' ? <Redirect to="/login" /> : undefined}
    </>
  );
}

const mapStateToProps = (state) => ({
  oAuthToken: state.userLogin.oAuthToken,
  oAuthCallbackConfirmed: state.userLogin.oAuthCallbackConfirmed,
  oAuthTokenLogin: state.userLogin.oAuthTokenLogin,
  oAuthTokenSecret: state.userLogin.oAuthTokenSecretLogin,
  oAuthTokenSecretLogin: state.userLogin.oAuthTokenSecretLogin,
  firebaseToken: state.firebase.firebaseToken,
  firebasePending: state.firebase.pending,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserNotifications: () => dispatch(checkUserNotifications()),
  sendToken: (token) => dispatch(sendFCMToken(token)),
  getAccessToken: (oAuthTokenLogin, oAuthTokenSecret, oAuthTokenVerifier) =>
    dispatch(getAccessToken(oAuthTokenLogin, oAuthTokenSecret, oAuthTokenVerifier)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(App)));
