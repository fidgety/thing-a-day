module.exports = function (nestedArray) {
    return Array.prototype.concat.apply([], nestedArray);
};
