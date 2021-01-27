import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/scss/bootstrap.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { IntlProvider } from 'react-intl';
import { ToastProvider } from 'react-toast-notifications';
import { PersistGate } from 'redux-persist/integration/react';
import { getCookie } from './helpers/cookies';
import messages_pl from './translation/pl.json';
import messages_en from './translation/en.json';
import App from './App';
import ErrorBoundary from './helpers/ErrorBoundry';
import { store, persistor } from './store';
import { registerServiceWorker } from './serviceWorker';

// temporary way to purge store
// persistor.purge();
window.store = store;

const messages = {
  pl: messages_pl,
  en: messages_en,
};

function getLocaleFromBrowser() {
  const locale = navigator.language.split(/[-_]/)[0];
  return locale !== 'pl' ? 'en' : locale;
}

const language = getCookie('locale') || getLocaleFromBrowser();

ReactDOM.render(
  <ErrorBoundary>
    <CookiesProvider>
      <ToastProvider placement="top-left" autoDismiss>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <IntlProvider locale={language} messages={messages[language]}>
                <App />
              </IntlProvider>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </ToastProvider>
    </CookiesProvider>
  </ErrorBoundary>,
  document.getElementById('root'),
);

registerServiceWorker();
