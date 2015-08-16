module.exports = {
    routeToLatLngs(route) {
        var latLngs = [];

        route.legs.forEach(function (leg) {
            leg.steps.forEach(function (step) {
                step.lat_lngs.forEach(function (latLng) {
                    latLngs.push(latLng);
                })
            })
        });

        return latLngs;
    },
    makeSamplePoints(latLngs, offset, sampleRate) {
        var i = 0;
        var samplepoints = new Array();
        var s = google.maps.geometry.spherical;

        sampleRate = sampleRate || 1000;
        offset = offset % sampleRate || 0;

        for (; i < latLngs.length - 1; i++) {
            var length = s.computeLength([latLngs[i], latLngs[i + 1]]),
                heading = s.computeHeading(latLngs[i], latLngs[i + 1]),
                chunk = sampleRate - offset;

            while (length > chunk) {
                var samplepoint = s.computeOffset(latLngs[i], chunk, heading);
                samplepoints.push(samplepoint);
                chunk += sampleRate;
            }

            offset = (offset + length) % sampleRate;
        }

        return samplepoints;
    }
};