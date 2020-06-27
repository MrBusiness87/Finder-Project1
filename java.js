document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

//-- Google Maps API Key
var APIkey = "AIzaSyBb0CDUuXsKE2EwQDS79oQZXtUoAA77HXc";

// Weather
function populateCityWeather(city, citySearchList) {
  createCityList(citySearchList);

  // Current weather
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=33076c7235c2a39d07b0fde1994a80b1&units=imperial";
  // Forecast
  let queryURL2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=33076c7235c2a39d07b0fde1994a80b1&units=imperial";

  let latitude;

  let longitude;

  $.ajax({
      url: queryURL,
      method: "GET",
    })
    // Stores data into "weather"
    .then(function (weather) {
      $(".temp").text("Temperature: " + response.list[0].main.temp + " C");
    })
}