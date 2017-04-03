jQuery(document).ready(function($) {
$.ajax({
url : "weather.json",
dataType : "json",
success : function(parsed_json) {
var location = parsed_json['Franklin']['City'];
var temp_f = parsed_json['Franklin']['High'];
alert("Current temperature in " + location + " is: " + temp_f);
}
});
});
