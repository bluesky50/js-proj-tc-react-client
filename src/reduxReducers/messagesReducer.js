import * as messagesTypes from '../reduxTypes/messagesTypes.js';

const messages = (state = [], action) => {
    switch(action.type) {
        case messagesTypes.ADD_MESSAGE:
            return state.concat([action.payload]);
        case messagesTypes.SET_MESSAGES:
            return action.payload;
        default:
            return state;
    }
};

export default messages;