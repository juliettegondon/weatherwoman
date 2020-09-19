var apiKey = "&appid=c84a8aa0a886f082f2e927a6d245e491"
var baseURL = "https://api.openweathermap.org/data/2.5/weather?"
var fivedayURL = "https://api.openweathermap.org/data/2.5/forecast?" 

///////pseudocoding
//get user input for search bar
//search for city on click function
$( "#btn" ).on('click', function(event) {
    event.preventDefault();
    var inputValue = $( "#city-input").val();
    var cityName = 'q=' + inputValue
    
   

    var pastCities = JSON.parse(localStorage.getItem("pastCities")) || [];
    pastCities.push(cityName);
    localStorage.setItem("pastCities", JSON.stringify(pastCities));
 /*    console.log(localStorage); */
    var cityList = $("#searched-cities-list")
 

   pastCities.forEach((element, index, array) => {
       var correctName = element.slice(2)
       cityList.append(`<li class='searched-city-button'>${correctName}</li>`)

      
   });

 /*        console.log('EACH at currentItem -->', currentItem) */

/*  $('.searched-cities-button').each(element => {
     element.on('click', function(){
         console.log(element + 'was clicked')
     })
 }) */


     // need help getting these to display in div id #searchedCities line 58
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
        $("#windspeed").text("Wind speed: " + response.wind.speed + " mph");
        $("#temperature").text("Temperature: " + response.main.temp + " F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        

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
        // uv index call retrieved value and used to change class color
        var uvQuery = "https://api.openweathermap.org/data/2.5/uvi/forecast?&appid=c84a8aa0a886f082f2e927a6d245e491&lat=" +lat + "&lon=" + lon;
        $.ajax({
            url: uvQuery,
            method: "GET",
        }).then(function(secondResponse){
            var uvIndex = secondResponse[0].value;
            console.log(uvIndex);
            $("#uvIndex").text("UV index: " + uvIndex);
            if (uvIndex <= 2) {
                $("#uvIndex").addClass("favorableUV");
              } else if (uvIndex <= 5) {
                $("#uvIndex").addClass("moderateUV");
              } else if (uvIndex <= 11) {
                $("#uvIndex").addClass("severeUV");}
        })

        //5 day forecast ajax call
        $.ajax({
            url: fivedayURL + cityName + "&units=imperial" + apiKey,
            method: "GET",
        })
        .then(function(fivedayResponse){
            console.log(fivedayResponse);
            var day1t = fivedayResponse.list[0].main.temp;
            var day2t = fivedayResponse.list[1].main.temp;
            var day3t = fivedayResponse.list[2].main.temp;
            var day4t = fivedayResponse.list[3].main.temp;
            var day5t = fivedayResponse.list[4].main.temp;
            var day1h = fivedayResponse.list[0].main.humidity;
            var day2h = fivedayResponse.list[1].main.humidity;
            var day3h = fivedayResponse.list[2].main.humidity;
            var day4h = fivedayResponse.list[3].main.humidity;
            var day5h = fivedayResponse.list[4].main.humidity;
      /*       console.log(day1t,day2t,day3t,day4t,day5t);
            console.log(day1h,day2h,day3h,day4h,day5h); */
            
 
            ////// 5 day forecast
            $("#temp1").text("Temperature: " + day1t);
            $("#humid1").text("Humidity: " + day1h);
            $("#temp2").text("Temperature: " + day2t);
            $("#humid2").text("Humidity: " + day2h);
            $("#temp3").text("Temperature: " + day3t);
            $("#humid3").text("Humidity: " + day3h);
            $("#temp4").text("Temperature: " + day4t);
            $("#humid4").text("Humidity: " + day4h);
            $("#temp5").text("Temperature: " + day5t);
            $("#humid5").text("Humidity: " + day5h);
        })
        
    })

});

//create history for search in local storage
//append city, date, and icon

