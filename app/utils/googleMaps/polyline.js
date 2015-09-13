var encodePath = google.maps.geometry.encoding.encodePath;
var decodePath = google.maps.geometry.encoding.decodePath;
var calcDistance = google.maps.geometry.spherical.computeLength;
var gBound = google.maps.LatLngBounds;

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
    },
    distance(polyline) {
        return calcDistance(polyline);
    },
    toBounds(polyline) {
        if (polyline) {
            var bounds = new gBound();
            console.log(polyline)
            polyline.getPath().getArray().forEach(latLng => bounds.extend(latLng));

            return bounds;
        }
    }
};