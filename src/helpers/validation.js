export const isValidString = (str) => {
    if (str.trim().length > 0 && typeof str === 'string') {
        return true;
    }
    return false;
}