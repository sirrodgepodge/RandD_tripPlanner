// Load Google Maps

var addresses = ['5 Hanover Square, New York, NY 10005'];
var mapLoad = function(addresses) {
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[0] + '&sensor=false', null, function(centerData) {
        var centerCoord = centerData.results[0].geometry.location;
        var map,
            mapOptions = {
                center: new google.maps.LatLng(centerCoord.lat, centerCoord.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    stylers: [{
                        'saturation': -100
                    }, {
                        'lightness': 0
                    }, {
                        'gamma': 0.5
                    }]
                }, ],
                zoom: 15,
                scrollwheel: false,
                draggable: true,
            };

        map = new google.maps.Map($('#map')[0], mapOptions);

        var bounds = new google.maps.LatLngBounds(); //this code autofits & zooms to include all markers, bad if there's only one
        for (var x = 0; x < addresses.length; x++) {
            $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[x] + '&sensor=false', null, function(data) {
                var p = data.results[0].geometry.location;
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                bounds.extend(latlng);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: 'images/mapmarker.png'
                });
                var infowindow = new google.maps.InfoWindow({
                    content: '<p>' + addresses[x-1] + '</p>'
                });
                //add listeners
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });

                google.maps.event.addListener(infowindow, 'closeclick', function() {
                    map.setCenter(marker.getPosition());
                });
                if (addresses.length > 1) map.fitBounds(bounds);
            });
        }
    });
};

$(document).ready(mapLoad(addresses));
