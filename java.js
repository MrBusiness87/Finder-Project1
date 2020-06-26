//-- Google Maps API Key
var APIkey = "AIzaSyBb0CDUuXsKE2EwQDS79oQZXtUoAA77HXc";

 Weather
function populateCityWeather(city, citySearchList) {
    createCityList(citySearchList);
  
    // Current weather
    let queryURL =
   "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=33076c7235c2a39d07b0fde1994a80b1";

  
    let latitude;
  
    let longitude;
  
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // Stores data into "weather"
      .then(function (weather) {
        // Log the queryURL
        console.log(queryURL);
  
        // Log the resulting object
        console.log(weather);
  
        let nowMoment = moment();
  
        let displayMoment = $("<h3>");
        $("#city-name").empty();
        $("#city-name").append(
          displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
        );
  
        let cityName = $("<h3>").text(weather.name);
        $("#city-name").prepend(cityName);
  
        let weatherIcon = $("<img>");
        weatherIcon.attr(
          "src",
          "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
        );
        $("#current-icon").empty();
        $("#current-icon").append(weatherIcon);
  
        $("#current-temp").text("Temperature: " + weather.main.temp + " °F");
        $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");
        $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH");
  
        latitude = weather.coord.lat;
        longitude = weather.coord.lon;
 })