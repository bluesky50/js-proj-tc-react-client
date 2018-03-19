import * as annTypes from '../reduxTypes/announcementsTypes.js';

const announcements = (state = [], action) => {
    switch(action.type) {
        case annTypes.ADD_ANN:
        if (state.length > 6) {
            return state.concat([action.payload]).slice(1);
        } else {
            return state.concat([action.payload]);
        }
        default:
            return state;
    }
}

export default announcements;