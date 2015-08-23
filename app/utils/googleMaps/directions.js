var directionsService = new google.maps.DirectionsService();

module.exports = {
    snapToRoute: function (latLng, callback) {
        this.getDirections(latLng, latLng, function (route) {
            callback(route.legs[0].start_location);
        });
    },
    getDirections: function (startLatLng, endLatLng, callback) {
        var request = {
            origin: startLatLng,
            destination: endLatLng,
            travelMode: google.maps.DirectionsTravelMode.BICYCLING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                return callback(response.routes[0]);
            }
            alert('bad response from directions service', response, status);
            console.log('bad response from directions service', response, status);
        });
    }
};
