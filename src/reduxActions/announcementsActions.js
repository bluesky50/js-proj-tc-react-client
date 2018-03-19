import * as annTypes from '../reduxTypes/announcementsTypes.js';

export const addAnnouncement = (annStr) => {
    return {
        type: annTypes.ADD_ANN,
        payload: annStr
    };
}