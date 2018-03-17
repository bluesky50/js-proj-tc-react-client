import { LOGIN, LOGOUT } from '../reduxActions/authActions.js';

const defaultState = {
    username: '',
    accessCode: ''
}

function authReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case LOGOUT:
            return action.payload
        default:
            return state
    }
}

export default authReducer;