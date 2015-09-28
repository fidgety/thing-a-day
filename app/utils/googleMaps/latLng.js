var computeDistanceBetween = google.maps.geometry.spherical.computeDistanceBetween;

module.exports = {
    nearest(start, end1, end2) {
        var firstDistance = computeDistanceBetween(start, end1);
        var secondDistance = computeDistanceBetween(start, end2);
        return firstDistance < secondDistance ? end1 : end2;
    }
};
