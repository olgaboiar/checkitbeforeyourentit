function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    var input = document.getElementById('building');
    var autocomplete = new google.maps.places.Autocomplete(input);
    
}
