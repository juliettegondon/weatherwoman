# weatherwoman
This weather dashboard has form inputs that allow the user to search for a certain city, and based on that city name an API returns the current weather. With this information, I also used other API's that track lat & lon to get the uv Index for the city, and the user is presented the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index. The UV index color dynamically changes on the page to reflect favorable, moderate, and severe UV indexes. 

For some reason, when I run the app on my local machine the UV functionality works, but through github pages there is an issue where this div gets left blank even after the ajax call fires. 

The user can also view a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity for the city. Local storage is also utilized to save search history and creates a list of cities searched. 
