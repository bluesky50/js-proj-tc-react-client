import * as subjectTypes from '../reduxTypes/subjectTypes.js';

const subject = (state = 'Welcome to chat', action) => {
    switch (action.type) {
        case subjectTypes.SET_SUBJECT:
            return action.payload;
        default:
            return state;
    }
}

export default subject;