import * as topicsTypes from '../reduxTypes/topicsTypes';

const defaultTopics = [];

const topics = (state = defaultTopics, action) => {
    switch(action.type) {
        case topicsTypes.SET_TOPICS:
            return action.payload;
        default:
            return state;
    }
};

export default topics;