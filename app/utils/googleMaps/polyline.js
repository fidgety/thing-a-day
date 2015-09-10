var encodePath = google.maps.geometry.encoding.encodePath;
var decodePath = google.maps.geometry.encoding.decodePath;

module.exports = {
    join(polyline, polyline2) {
        if (!polyline || !polyline2) {
            return;
        }

        var mainPathArray = polyline.getPath();
        var pathToMerge = polyline2.getPath().getArray();

        pathToMerge.forEach(point => {
            mainPathArray.push(point);
        });

        return polyline;
    },
    encode(polyline) {
        return encodePath(polyline.getPath());
    },
    decode(encodedPath) {
        return decodePath(encodedPath);
    }
};