import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiMiddleware } from 'redux-api-middleware';
import logger from './middlewares/logger';
import rootReducer from './reducers';
import interceptor from 'redux-api-middleware-interceptor';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { getIntl } from '../helpers/intl';
import { fetchUserData } from './reducers/user/action';
import { getAuthTokens } from '../api/header';
import { userLogout } from './reducers/userLogin/actions';

const intl = getIntl();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['userLogin'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (preloadedState) => {
  const middlewares = [apiMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(
    interceptor({
      onRequestError: (state, response) => {
        switch (response.status_code) {
          case 400: {
            if (response.message === 'COORDINATOR-HAS-COURSES') {
              Swal.fire({
                icon: 'error',
                text: intl.formatMessage({ id: 'message-box.tutor-delete-error' }),
              });
            } else {
              Swal.fire({
                icon: 'error',
                text: intl.formatMessage({ id: 'message-box.400-error' }),
              });
            }
            break;
          }
          case 403: {
            if (window.location.href.includes('admin_page')) {
              Swal.fire({
                icon: 'error',
                text: intl.formatMessage({ id: 'message-box.403-error' }),
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = `/`;
                }
              });
            } else if (response.path !== '/notification/is-read') {
              Swal.fire({
                icon: 'error',
                text: intl.formatMessage({ id: 'message-box.403-error' }),
              });
            }
            break;
          }
          case 404: {
            Swal.fire({
              icon: 'error',
              text: intl.formatMessage({ id: 'message-box.404-error' }),
            });
            break;
          }
          case 405: {
            Swal.fire({
              icon: 'error',
              text: intl.formatMessage({ id: 'message-box.405-error' }),
            });
            break;
          }
          case 417: {
            if (response.raw_res === 'File too large!') {
              Swal.fire({
                icon: 'error',
                text: intl.formatMessage({ id: 'message-box.file-too-large' }),
              });
            }
            break;
          }
          case 500: {
            if (response.path === '/user/profile') {
              Swal.fire({
                icon: 'error',
                text: intl.formatMessage({ id: 'message-box.500-error' }),
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href =
                    'https://cas.amu.edu.pl/cas/logout?service=https%3A%2F%2Fusosweb.amu.edu.pl%2Fkontroler.php%3F_action%3Dnews%2Fdefault';
                }
              });
            } else if (response.path !== '/notification/is-read') {
              Swal.fire({
                icon: 'error',
                text: intl.formatMessage({ id: 'message-box.500-error' }),
              });
            }
            break;
          }
          default: {
            Swal.fire({
              icon: 'error',
              text: intl.formatMessage({ id: 'message-box.unknow-error' }),
            });
            break;
          }
        }
      },
    }),
    ...middlewares,
  );

  const enhancers = [middlewareEnhancer];
  const composeEnhancers = compose(...enhancers);

  return createStore(persistedReducer, preloadedState, composeEnhancers);
};

const preloadedState = {};
const store = configureStore(preloadedState);
const persistor = persistStore(store);

export { store, persistor };
