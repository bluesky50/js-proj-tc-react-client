import * as usersTypes from '../reduxTypes/usersTypes.js';

export const setUsers = (usersList) => {
    if (usersList && Array.isArray(usersList)) {
        const action = {
            type: usersTypes.SET_USERS,
            payload: usersList
        };
        return action;
    }
    return {
        type: usersTypes.SET_USERS,
        payload: []
    };
}

export const addUser = (userString) => {
    const action = {
        type: usersTypes.ADD_USER,
        payload: userString
    };
    return action;
}

// export const removeUser = (userObj) => {
//     const action = {
//         type: userTypes.REMOVE_USER,
//         payload: userObj
//     };
//     return action;
// }

// const updateUser = () => {
//     const action = {
//         type: usersTypes.SET_USERS,
//         payload: usersList
//     };
//     return action;
// }
