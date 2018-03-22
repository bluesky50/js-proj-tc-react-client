import * as annTypes from '../reduxTypes/announcementsTypes.js';

const announcements = (state = [], action) => {
    switch(action.type) {
        case annTypes.ADD_ANN:
        if (state.length > 6) {
            return state.concat([{ text:action.payload, createdAt: new Date().getTime() }]).slice(1);
        } else {
            return state.concat([{ text:action.payload, createdAt: new Date().getTime() }]);
        }
        default:
            return state;
    }
}

export default announcements;