import { combineReducers } from 'redux';

import messages from './messagesReducer.js';
import userInfo from './authReducer.js';
import socket from './socketReducer.js';
import topics from './topicsReducer.js';
import users from './usersReducer.js';
import calls from './callsReducer.js';
import subject from './subjectReducer.js';
import signaledUsers from './signaledUsersReducer.js';
import announcements from './announcementsReducer.js';

const appReducer = combineReducers({
    messages,
    userInfo,
    socket,
    users,
    topics,
    calls,
    subject,
    signaledUsers,
    announcements
});

export default appReducer;