import * as signaledTypes from '../reduxTypes/signaledUsersTypes.js';

const signaledUsers = (state = [], action) => {
    switch(action.type) {
        case signaledTypes.SET_SIGNALED_LIST:
            return action.payload;
        case signaledTypes.ADD_SIGNALED_USER:
            if (state.includes(action.payload)) {
                return state;
            } 
            return state.concat([action.payload]);
        case signaledTypes.REMOVE_SIGNALED_USER:
            return state.filter((u) => {
                return u !== action.payload;
            });
        default:
            return state;
    }
}

export default signaledUsers;