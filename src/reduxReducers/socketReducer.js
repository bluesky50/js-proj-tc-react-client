import { SET_SOCKET, INIT_SOCKET } from '../reduxTypes/socketTypes.js';

const socketReducer = (state = null, action) => {
    switch(action.type) {
        case SET_SOCKET:
            return action.payload;
        case INIT_SOCKET:
            // To do this I will need to use redux-saga.
            // Not going to learn that now.
            // Going to do the socket initialization in the dashboard component. 
            return state;
        default:
            return state;
    }
};

export default socketReducer;