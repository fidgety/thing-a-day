module.exports = function (array, findFunction) {
    var len = array.length;

    for (var i = 0; i < len; i++) {
        if (findFunction(array[i])) {
            return array[i];
        }
    }
};
