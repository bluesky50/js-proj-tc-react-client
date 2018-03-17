import { combineReducers } from 'redux';

import messages from './messagesReducer.js';
import userInfo from './authReducer.js';
import socket from './socketReducer.js';
import topics from './topicsReducer.js';
import users from './usersReducer.js';

const appReducer = combineReducers({
    messages,
    userInfo,
    socket,
    users,
    topics
});

export default appReducer;