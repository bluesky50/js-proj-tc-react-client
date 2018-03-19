import * as subjectTypes from '../reduxTypes/subjectTypes.js';

export const setSubject = (subjectStr = '') => {
    if (subjectStr) {
        return {
            type: subjectTypes.SET_SUBJECT,
            payload: subjectStr
        };
    } 
    return {
        type: subjectTypes.SET_SUBJECT,
        payload: ''
    }
}