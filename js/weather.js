jQuery(document).ready(function($) {
	processWeather();
});
function processWeather() {
    setTimeout(processWeather,1000000);
	var location = navigator.geolocation.getCurrentPosition(getLocation);
}
function getLocation(location) {
	var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
	var query = "http://api.wunderground.com/api/157f6d7d32ac0d32/geolookup/conditions/forecast/q/"+latitude+','+longitude+'.json';
	$.getJSON(query).done(function(parsed_json) {
		console.log(parsed_json);
		var forecast = parsed_json['forecast']['simpleforecast']['forecastday'][0]["icon"];
		var icon;
		var hours = new Date().getHours();
		if ((forecast == 'clear' || forecast == 'sunny')&& hours < 18 && hours > 5) {
			icon = 'B';
		}
		else if (forecast == 'cloudy') { icon = 'Y';}
		else if (forecast.indexOf('flurries')> -1) { icon='U';}
		else if (forecast == 'hazy' || forecast == 'fog') { icon='M';}
		else if (forecast.indexOf('cloudy')> -1 && hours < 18 && hours > 5) { icon='H'; }
		else if (forecast.indexOf('sunny')> -1 && hours < 18 && hours > 5) { icon='H'; }
		else if (forecast.indexOf('sleet')> -1) {icon='R';}
		else if (forecast.indexOf('rain')> -1) {icon='R';}
		else if (forecast.indexOf('tstorms')> -1) {icon='P';}
		else {icon='E';}
		var location = parsed_json['location']['city'];
		var temp_f = parsed_json['current_observation']['temp_f'];
		$('#weather').html('<span class="icon" data-icon="' + icon + '"></span>' + '<h3>' + temp_f + ' °F</h3><small>' + location.toUpperCase() +'</small>');
	});
}