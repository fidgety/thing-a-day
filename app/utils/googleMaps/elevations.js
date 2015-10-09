var elevationsService = new google.maps.ElevationService();

module.exports = {
    getElevations(samplePoints, callback) {
        elevationsService.getElevationForLocations({
            locations: samplePoints
        }, function (results, status) {
            if (status === google.maps.ElevationStatus.OK) {
                return callback(results);
            }

            //alert('bad response from elevations service', samplePoints, results, status);
            console.log('bad response from elevations service', samplePoints, results, status);
        });
    },
    calculateUpsAndDowns(elevations) {
        var stats = {
            ascending: 0,
            descending: 0,
            flatish: 0
        };

        if (elevations.length === 0) {
            return stats;
        }

        elevations.reduce((prevValue, currentValue) => {
            var difference = prevValue - currentValue;
            var differenceAbs = Math.abs(difference);

            if (differenceAbs < 1) {
                stats.flatish += differenceAbs;
            }
            else {
                difference > 0 ? stats.descending += differenceAbs : stats.ascending += differenceAbs;
            }
            return currentValue;
        });

        return stats;
    }
};
