import * as messagesTypes from '../reduxTypes/messagesTypes.js';

// This is for when a new message is received from the socket.
export const addMessage = (message) => {
    return {
        type: messagesTypes.ADD_MESSAGE,
        payload: message 
    };
};

export const setMessages = (messages) => {
    if (messages && Array.isArray(messages)) {
        return {
            type: messagesTypes.SET_MESSAGES,
            payload: messages
        }
    }

    return {
        type: messagesTypes.SET_MESSAGES,
        payload: []
    };
};