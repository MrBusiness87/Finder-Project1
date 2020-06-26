//-- Google Maps API Key
var APImapkey = "AIzaSyBb0CDUuXsKE2EwQDS79oQZXtUoAA77HXc";

//Google Maps embed

function initMap(lat, lng, targetIndex) {
  // The location of event
  var latlng = new google.maps.LatLng(lat, lng);
  // The map, centered at city venue
  console.log(document.getElementById(`map${targetIndex}`));
  var map = new google.maps.Map(document.getElementById(`map${targetIndex}`), {
      zoom: 8,
      center: latlng
  });
  // The marker, positioned at event venue
  var marker = new google.maps.Marker({
      position: latlng,
      map: map
  });
}

function embedTheMap(index) {
  var queryURL =
      "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=" +
      city +
      "&apikey=" +
      APIticketkey;

  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response) {
      var venue = response._embedded.events[index]._embedded.venues[0];
      var latitude = venue.location.latitude;
      var longitude = venue.location.longitude;

      var lat = parseFloat(latitude);
      var lng = parseFloat(longitude);
      console.log("Lat & Lng", lat, lng);
      initMap(lat, lng, index);
  });
}
