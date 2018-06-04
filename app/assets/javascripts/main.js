
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.812285, lng: -73.951209},
        zoom: 13
    });
    var input = document.getElementById('building');
    var strictBounds = document.getElementById('strict-bounds-selector');
    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
        address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
        }
        console.log(place.address_components);
        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);

        function displayViolation(){
            var streetName = place.address_components[1].long_name.replace(/(\d+)(?:st|nd|rd|th)/, "$1").toUpperCase();
            var date = new Date();
            date.setFullYear(date.getFullYear() - 3)
            date = moment(date).format("YYYY-MM-DDTHH:MM:SS.000");
            console.log(date);
            $.ajax({
                url: "/welcome/search",
                type: "GET",
                data: {
                  "where" : "housenumber='" + place.address_components[0].short_name + "' AND streetname='" + streetName + "' AND boro='" + place.address_components[3].long_name.toUpperCase() + "' AND approveddate>'" + date + "'" 
                }
            }).done(function(data) {
           
            });
        }
        
        displayViolation();
    });

}
