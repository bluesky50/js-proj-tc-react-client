import * as usersTypes from '../reduxTypes/usersTypes.js';

const users = (state = [], action) => {
    switch(action.type) {
        case usersTypes.SET_USERS:
            return action.payload;
        case usersTypes.ADD_USER:
            // TODO server side socket.
            return state.concat([action.payload]);
        case usersTypes.REMOVE_USER:
            // TODO implement client side filter
            // TODO Implrment server side as well.
            return state;
        case usersTypes.UPDATE_USER:
            // TODO implement client side filter
            // TODO Implrment server side as well.
            return state;
        default:
            return state;
    }
};

export default users;