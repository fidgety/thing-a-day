var elevationsService = new google.maps.ElevationService();

module.exports = function (samplePoints, callback) {
    elevationsService.getElevationForLocations({
        locations: samplePoints
    }, function (results, status) {
        if (status === google.maps.ElevationStatus.OK) {
            return callback(results);
        }

        alert('bad response from elevations service', samplePoints, results, status);
        console.log('bad response from elevations service', samplePoints, results, status);
    });
};
