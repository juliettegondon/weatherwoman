var apiKey = "&appid=c84a8aa0a886f082f2e927a6d245e491"
var baseURL = "https://api.openweathermap.org/data/2.5/weather?"
var fivedayURL = "https://api.openweathermap.org/data/2.5/forecast?" 

///////pseudocoding
//get user input for search bar
//search for city on click function
$( "#btn" ).on('click', function(event) {
    event.preventDefault();
    var inputValue = $( "#city-input").val();
    console.log(inputValue)
    var cityName = 'q=' + inputValue
    var pastCities = [];

    pastCities = JSON.parse(localStorage.getItem("pastCities")) || [];
    pastCities.push(cityName);
    localStorage.setItem("pastCities", JSON.stringify(pastCities));
    console.log(localStorage);
   //ajax call to current weather api's
    $.ajax({
        url: baseURL + cityName + "&units=imperial" + apiKey,
        method: "GET"
    })
    
    .then(function(response){
    //.catch error when a promise is returned, handles the .then if an error occurs
        var res = response;
        var resTemp = res.temperature;
        var temp = $('#temperature')
        var hum = $('#humidity')
        var wnd = $('#windspeed')
        var uvi = $('#uvIndex')
        // append current weather info to page
        $(".city").html("<h1>" + response.name + " Weather Details </h1>");
        // moment JS to get current date
        $("#moment").text("Today is " + moment().format('MMMM Do YYYY'));
        $("#windspeed").text("Wind speed: " + response.wind.speed);
        $("#temperature").text("Temperature: " + response.main.temp);
        $("#humidity").text("Humidity: " + response.main.humidity);
        

    console.log(response)
    }).catch(function(error){
        alert('Please check your spelling')
    })
    
  //ajax call to 5 day

  $.ajax({
    url: fivedayURL + cityName + apiKey,
    method: "GET"
    })
    .then(function(response){
        var lon = response.city.coord.lon;
        var lat = response.city.coord.lat;
        console.log(lat, lon)
//ajax call to uvindex using variables from 5 day
        var uvQuery = "http://api.openweathermap.org/data/2.5/uvi/forecast?&appid=c84a8aa0a886f082f2e927a6d245e491&lat=" +lat + "&lon=" + lon;
        $.ajax({
            url: uvQuery,
            method: "GET",
        }).then(function(secondResponse){
            var uvIndex = secondResponse[0].value;
            console.log(uvIndex);
            $("#uvIndex").text("UV index: " + uvIndex);
        })
    })
    //////ask during office hours why not working
 /*    if (uvIndex <= 2) {
        $("#uvIndex").addClass(".green");
      } else if (uVIndex <= 5) {
        $("#uvIndex").addClass(".yellow");
      } else if (uVIndex <= 8) {
        $("#uvIndex").addClass(".red");} */

});

//create history for search in local storage
//append city, date, and icon
//get UV index
//change color based on UV index
