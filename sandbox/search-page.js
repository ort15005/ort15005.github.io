//This function should be in charge of providing the suggested location items

$('#search-bar').keyup(function () {
    var value = $('#search-bar').val();
    var rExp = new RegExp(value, "i");
    $.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data); // test for JSON received
        // Begin building output
        var output = '<ol>';
        $.each(data.RESULTS, function (key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="#cityDisplay' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';
            }
        }); // end each
        output += '</ol>';
        $("#searchResults").html(output); // send results to the page
    }); // end getJSON
}); // end onkeyup

// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
    evt.preventDefault();
    // With the text value get the needed value from the weather.json file
    var jsonCity = $(this).text(); // Franklin, etc...
    console.log(jsonCity);
    $.ajax({
        url: "//api.wunderground.com/api/beb771bc77644b32/geolookup/conditions/q/" + jsonCity + ".json",
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            var location = data.location.city + ', ' + data.location.state;
            var temp_f = data.current_observation.temp_f;
            var summary = data.current_observation.icon;
            console.log('Location is: ' + location);
            console.log('Temp is: ' + temp_f + '°F');
            $("#location-short").text(location);
            $("title").html(location + " | Weather Center");
            $("#currentTemp").html(Math.round(temp_f) + '°F');
            $("#summary").text(toTitleCase(data.current_observation.icon));
            console.log('Weather Summary: ' + summary);
            $("#cover").fadeOut(250);

        }
    });

    $.ajax({
        url: "//api.wunderground.com/api/beb771bc77644b32/forecast/q/" + jsonCity + ".json" ,
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            var high = data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
            var low = data.forecast.simpleforecast.forecastday[0].low.fahrenheit;

            $("#high").html("High Temperature: " + high);
            $("#low").html("Low Temperature: " + low);
            console.log('High is: ' + high + '°F');
            console.log('Low is: ' + low + '°F');
        }
    });

    $("#searchResults").html("");






});



function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

//
//function getData(input) {
//    // Get the data from the wunderground API
//    $.ajax({
//        url: "http://api.wunderground.com/api/beb771bc77644b32/geolookup/conditions/q/"
//        + input + ".json"
//        , dataType: "jsonp"
//        , success: function (data) {
//            console.log(data);
//            var location = data.location.city + ', ' + data.location.state;
//            var temp_f = data.current_observation.temp_f;
//            console.log('Location is: ' + location);
//            console.log('Temp is: ' + temp_f);
//            $("#location-short").text(location);
//            $("title").html(location + " | Weather Center");
//            $("#currentTemp").html(Math.round(temp_f) + '°');
//            $("#summary").text(toTitleCase(data.current_observation.icon));
//            $("#cover").fadeOut(250);
//        }
//    });
//}
