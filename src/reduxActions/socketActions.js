import { SET_SOCKET, INIT_SOCKET } from '../reduxTypes/socketTypes.js';

export const setSocket = (socket) => {
    return {
        type: SET_SOCKET,
        payload: socket
    }
}; 

export const initSocket = (config) => {
    return {
        type: INIT_SOCKET,
        payload: config
    };
};