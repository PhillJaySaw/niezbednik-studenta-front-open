import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import entities from './entities/reducers';
import userLogin from './userLogin/reducers';
import notices from './notices/reducers';
import tutoringOffers from './tutoring-offers/reducers';
import tutors from './tutors/reducers';
import term from './term/reducers';
import studiesMajor from './studies-major/reducers';
import tutorsDegree from './tutors-degree/reducers';
import courses from './courses/reducers';
import posts from './posts/reducers';
import postComments from './post-comments/reducers';
import user from './user/reducers';
import helpfulLinks from './helpful_links/reducers';
import files from './files/reducers';
import adminNotifications from './admin_notifications/reducers';
import firebase from './firebase/reducers';

const userLoginConfig = {
  key: 'userLogin',
  storage,
  blacklist: ['loginUrl'],
};

const appReducer = combineReducers({
  entities,
  userLogin: persistReducer(userLoginConfig, userLogin),
  notices,
  tutoringOffers,
  tutors,
  term,
  studiesMajor,
  tutorsDegree,
  courses,
  posts,
  postComments,
  user,
  helpfulLinks,
  adminNotifications,
  files,
  firebase,
});

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === 'USER_LOGOUT_SUCCESS') {
    storage.removeItem('persist:root');
    storage.removeItem('persist:userLogin');

    newState = undefined;
  }

  return appReducer(newState, action);
};

export default rootReducer;
