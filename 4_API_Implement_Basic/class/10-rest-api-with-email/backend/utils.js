export const getToday = function () {
    const now = new Date();
    return now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
};