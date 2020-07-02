// Side-Nav in Materialize CSS
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});
// Ticketmaster API Key
var ticketKey = "M5Wuz6GimDFN0wv2GKvg6IO9KVFEhecq";
//-- Google Maps API Key
var APImapkey = "AIzaSyBb0CDUuXsKE2EwQDS79oQZXtUoAA77HXc";

function currentlocationWeather() {
  let apiKey = "33076c7235c2a39d07b0fde1994a80b1";
  navigator.geolocation.getCurrentPosition(function (position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    console.log(longitude);
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var iconcode = response.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      var city1 = $(".weather").append(
        "<div>" +
          response.name +
          "&ensp;Temp: " +
          ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1) +
          "&#8457 <img id='wicon' src='' alt='' style='height: 3.5%; width: 3.5%;'></div>"
      );

      $("#wicon").attr("src", iconurl);
    });
  });
}
currentlocationWeather();

function cityWeather() {
  console.log("Entering CITY WEATHER:", city);
  let apiKey = "33076c7235c2a39d07b0fde1994a80b1";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    //Store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      var iconcode = response.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      console.log("ICON URL!!!", iconurl);
      console.log("ICON code!!!", iconcode);
      // Log the queryURL
      console.log(queryURL);
      // Log the resulting object
      console.log("Weather Response!!!", response);
      $(".weather").empty();
      // Transfer content to HTML
      var city2 = $(".weather").html(
        "<div>" +
          response.name +
          "<br>Temp: " +
          ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1) +
          "&#8457 <img id='wicon' src='' alt=''></div>"
      );
      //city2.append("<img id='wicon' src='' alt='Weather icon'>");
      console.log("Going to set weather icon!!!");
      $("#wicon").attr("src", iconurl);
      console.log("Done!!!");
    });
}

function initMap(lat, lng, targetIndex) {
  // The location of event
  // var latLng = { lat: lat, lng: lng };
  var latlng = new google.maps.LatLng(lat, lng);
  // The map, centered at city venue
  //console.log(document.getElementById(`map${targetIndex}`));
  var map = new google.maps.Map(document.getElementById(`map${targetIndex}`), {
    zoom: 11,
    center: latlng,
  });
  // The marker, positioned at event venue
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
  });
}

function embedTheMap(index) {
  let ticketKey = "M5Wuz6GimDFN0wv2GKvg6IO9KVFEhecq";
  let queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=" +
    city +
    "&apikey=" +
    ticketKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var venue = response._embedded.events[index]._embedded.venues[0];
    var latitude = venue.location.latitude;
    var longitude = venue.location.longitude;

    var lat = parseFloat(latitude);
    var lng = parseFloat(longitude);
    //console.log("Lat & Lng", lat, lng);
    initMap(lat, lng, index);
  });
}

// // time variable/tells currentday/time
// setInterval(getCurrentTime, 1000);
// var currentDay = $(".time");
// var date = $("<div class='date'>");

// function getCurrentTime() {
//   date.html(moment().format("dddd") + "<br>" + moment().format("MMMM Do YYYY"));
//   currentDay.append(date);
// }

// Buys Tickets from Ticketmaster
function ticketEvents() {
  var ticketKey = "M5Wuz6GimDFN0wv2GKvg6IO9KVFEhecq";
  let queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sport&city=" +
    city +
    "&apikey=" +
    ticketKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response._embedded.events.length);

    for (let i = 0; i < response._embedded.events.length; i++) {
      let event = response._embedded.events[i];
      let venue = response._embedded.events[i]._embedded.venues[0];

      let eventCards = $(".event-data");

      let card = $("<div class='event-card row'>");

      // Pull event date and reverse string
      let leftColumn = $("<div class='col s12 m3'></div>");
      let middleColumn = $("<div class='col s12 m6 center-align'></div>");
      let rightColumn = $("<div class='col s12 m3'></div>");
      card.append(leftColumn);
      card.append(middleColumn);
      card.append(rightColumn);

      rightColumn.append(
        `<div id='map${i}' style='width: 200px; height: 200px' class='map'>`
      );
      embedTheMap(i);

      let time = event.dates.start.localTime;

      time = time.split(":"); // convert to array

      // fetch
      let hours = Number(time[0]);
      let minutes = Number(time[1]);

      // calculate
      let timeValue;

      if (hours > 0 && hours <= 12) {
        timeValue = "" + hours;
      } else if (hours > 12) {
        timeValue = "" + (hours - 12);
      } else if (hours == 0) {
        timeValue = "12";
      }

      timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes

      timeValue += hours >= 12 ? " P.M." : " A.M."; // get AM/PM

      // show

      console.log(timeValue);

      // Event Date shortening
      let date = event.dates.start.localDate.split("-").reverse().join("-");
      // Event Name
      let eventNameEl = $("<h2 class='event-title'>" + event.name + "</h2>");
      // Event Date
      let eventDateEl = $(
        "<div class='date-info'>" + date + " at: " + timeValue + "</div>"
      );
      // Event Venue
      let venueNameEl = $("<div>" + "Venue: " + venue.name + "</div>");
      // Event Images
      let eventImageEl = $(
        "<img src=" +
          event._embedded.attractions[0].images[0].url +
          ">" +
          "<img src=" +
          event._embedded.attractions[1].images[0].url +
          ">"
      );
      // Link to purchase tickets

      let eventUrlEl = $(
        "<a target='_blank' class='tixlink' id='tix' href=" +
          event.url +
          "><br>Click here to purchase tickets!</a>"
      );

      let genre = event.classifications[0].genre.name;

      let nbaLogo = $(
        "<img src='Assets/IMAGES/nba.png' style='width: 200px; height: 200px;'>"
      );
      //let nflLogo = $("<img src='assets/nfl.png' width:'200px' height:'200'>");
      let nflLogo = $(
        "<img src='Assets/IMAGES/nfl.png' style='width: 200px; height: 200px;'>"
      );
      let nhlLogo = $(
        "<img src='assets/IMAGES/nhl.png' style='width: 200px; height: 200px;'>"
      );
      let sportsLogo = $(
        "<img src='Assets/IMAGES/sports.jpg' style='width: 200px; height: 200px;'>"
      );
      if (genre == "Football") {
        leftColumn.append(nflLogo);
      } else if (genre == "Hockey") {
        leftColumn.append(nhlLogo);
      } else if (genre == "Basketball") {
        leftColumn.append(nbaLogo);
      } else {
        leftColumn.append(sportsLogo);
      }

      middleColumn.append(eventNameEl);
      middleColumn.append(eventDateEl);
      middleColumn.append(venueNameEl);
      middleColumn.append(eventImageEl);
      middleColumn.append(eventUrlEl);

      eventCards.append(card);
      console.log(i);
    }
  });
}

$(".btn").on("click", function () {
  //console.log("I CLICKED THE BUTTON");
  const cityInput = $("#cityName");
  $(".event-data").empty();
  const myCity = cityInput.val();
  city = myCity;
  console.log("CITY:", city);
  ticketEvents();
  console.log("CALLING CITY WEATHER:", city);
  cityWeather();
});
