import firebase from 'firebase/app';
import 'firebase/messaging';
import { sendFCMToken } from '../store/reducers/firebase/action';
import { checkUserNotifications } from '../store/reducers/user/action';
import { store } from '../store/index';


// this config requires data from your firebase project
const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

let messaging;
let vapidKey;

if (firebase.messaging.isSupported()) {
  firebase.initializeApp(config);

  messaging = firebase.messaging();
  vapidKey = 'vapidkey'; // can be found in firebase console
}

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    Notification.requestPermission()
      .then(() =>
        messaging.getToken({
          vapidKey,
        }),
      )
      .then((firebaseToken) => {
        store.dispatch(sendFCMToken(firebaseToken));
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      store.dispatch(checkUserNotifications());
      resolve(payload);
    });
  });
