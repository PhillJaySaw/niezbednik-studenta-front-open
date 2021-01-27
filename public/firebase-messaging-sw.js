importScripts('https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.2/firebase-messaging.js');

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data.messagePl;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png',
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  console.log(event);
  return event;
});
