export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (username, accessCode) => {
    const action = {
        type: LOGIN,
        payload: {
            username,
            room: accessCode
        }
    }

    return action;
};

export const logout = () => {
    const action = {
        type: LOGOUT,
        payload: {}
    }
    return action;
};
