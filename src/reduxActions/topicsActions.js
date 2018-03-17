import * as topicsTypes from '../reduxTypes/topicsTypes.js';

// const defaultTopics = {};

export const setTopics = (topics) => {
    if (topics && Array.isArray(topics)) {
        return {
            type: topicsTypes.SET_TOPICS,
            payload: topics
        };
    }

    return {
        type: topicsTypes.SET_TOPICS,
        payload: []
    };
}

// export const addTopicVote = (topicStr) => {
//     return {
//         type: topicsTypes.ADD_TOPIC_VOTE,
//         payload: topicStr
//     };
// }

// export const removeTopicVote = (topicStr) => {
//     return {
//         type: topicsTypes.REMOVE_TOPIC_VOTE,
//         payload: topicStr
//     };
// }

// export const addTopic = (topicObj) => {
//     return {
//         type: topicsTypes.ADD_TOPIC,
//         payload: topicObj 
//     };
// };

// export const removeTopic = (topic) => {
//     return {
//         type: topicsTypes.REMOVE_TOPIC,
//         payload: topic
//     };
// };

// export const updateTopic = (topicStr) => {
//      return {
//          type: topicTypes.UPDATE_TOPIC,
//          payload: topicStr
//      };
// }