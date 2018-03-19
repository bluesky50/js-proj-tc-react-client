import * as callsTypes from '../reduxTypes/callsTypes.js';

const calls = (state = [], action) => {
    switch(action.type) {
        case callsTypes.SET_CALLS:
            return action.payload;
        case callsTypes.ADD_CALL:
            return state.concat([action.payload]);
        case callsTypes.REMOVE_CALL:
            return state.filter((c) => {
                return c._id !== action.payload._id;
            });
        default:
            return state
    }
}

export default calls;