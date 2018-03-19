import * as callsTypes from '../reduxTypes/callsTypes.js';

export const setCalls = (callList) => {
    if (callList && Array.isArray(callList)) {
        return {
            type: callsTypes.SET_CALLS,
            payload: callList
        }
    }
}

export const addCall = (callObj) => {
    if (callObj) {
        return {
            type: callsTypes.ADD_CALL,
            payload: callObj
        }
    }
}

export const removeCall = (callId) => {
    if (callId) {
        return {
            type: callsTypes.REMOVE_CALL,
            payload: callId
        }
    }
}