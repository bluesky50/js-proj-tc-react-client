import * as signaledTypes from '../reduxTypes/signaledUsersTypes.js';

export const setSignaledUsers = (signaledUsersList) => {
    if (signaledUsersList && Array.isArray(signaledUsersList)) {
        return {
            type: signaledTypes.SET_SIGNALED_LIST,
            payload: signaledUsersList
        }
    }
}

export const addSignaledUser = (username) => {
    return {
        type: signaledTypes.ADD_SIGNALED_USER,
        payload: username
    }
}

export const removeSignaledUser = (username) => {
    return {
        type: signaledTypes.REMOVE_SIGNALED_USER,
        payload: username
    }
}