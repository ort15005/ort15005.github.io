// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled! Potato.");
    }

  })();

  // Get the data from the wunderground API
    function getData(lat, long){
        // Get the data from the wunderground API
        $.ajax({
            url : "http://api.wunderground.com/api/beb771bc77644b32/geolookup/conditions/q/" + lat + "," + long + ".json",
                dataType : "jsonp",
                success : function(data) {
                    var location = data['location']['city'];
                    var temp_f = Math.round(data['current_observation']['temp_f']);
                    var temp = temp_f + "&deg";

                    alert("Current temperature in " + location + " is: " + temp_f);

                    $("#cityDisplay").text(data.current_observation.display_location.full);
                    $("#currentTemp").html(temp);
                    $("#summary").text(data.current_observation.weather);
                    $("#title-location").text(data.current_observation.display_location.full + " Weather Home");
                    $("#wind_speed").text("Wind Speed: " + data.current_observation.wind_mph + " mph");
                    $("#wind_direction").text("Wind Direction: " + data.current_observation.wind_dir);
                    $("#precip").text("Estimated Precipitation: " + data.current_observation.precip_today_string);

//this is where i changed the id names so they would work on my weather website
                    $("#location-short").text(data.current_observation.display_location.full);

                    var zip = data['current_observation']['display_location']['zip'];

                    $("#location-full").text(data.current_observation.display_location.full + " , " + zip);


//
//
//                    $("#add1").text('Elevation:' + ' ' +  Math.round(data.current_observation.display_location.elevation * 3.28084) + ' ' + 'Feet');

                    $("#cover").fadeOut(250);
                    console.log(data);
                }
               });

    }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
