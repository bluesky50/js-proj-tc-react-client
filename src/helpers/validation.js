const MAX_INPUT_LENGTH = 400;

export const isValidString = (str) => {
    if (str && typeof str === 'string' && str.trim().length > 0 && str.length < 360) {
        return true;
    }
    return false;
}

export const isValidInputString = (str) => {
    if (str && typeof str === 'string' && str.trim().length > 0 && str.length < MAX_INPUT_LENGTH) {
        return true;
    }
    return false;
}