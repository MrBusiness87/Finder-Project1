document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});

//-- Google Maps API Key
var APImapkey = "AIzaSyBb0CDUuXsKE2EwQDS79oQZXtUoAA77HXc";

function currentlocationWeather() {
  var apiKey = "33076c7235c2a39d07b0fde1994a80b1";
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
          "<br>Temp: " +
          ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1) +
          "&#8457 <img id='wicon' src='' alt='Weather icon'></div>"
      );
      // city1.append("<img id='wicon' src='' alt='Weather icon'>");

      $("#wicon").attr("src", iconurl);
    });
  });
}
currentlocationWeather();

function cityWeather() {
  var apiKey = "33076c7235c2a39d07b0fde1994a80b1";
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
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      var iconcode = response.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);
      $(".weather").empty();
      // Transfer content to HTML
      var city2 = $(".weather").html(
        "<div>" +
          response.name +
          "<br>Temp: " +
          ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1) +
          "&#8457<img id='wicon' src='' alt='Weather icon'></div>"
      );
      //city2.append("<img id='wicon' src='' alt='Weather icon'>");

      $("#wicon").attr("src", iconurl);
      cityWeather();
    });
}
