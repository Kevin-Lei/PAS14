/*<?php
	$data = json_decode(file_get_contents('https://www.padherder.com/api/events/'));
?>*/
jQuery(document).ready(function($) {
	padHerder();
});
function padHerder() {
    setTimeout(padHerder,1000000);
	var query = "https://www.padherder.com/api/events/";
	console.log(query)
	getData(query);
}
function getData(query) {
	/*$.ajax({
		url: query,
		type: 'GET',
		crossDomain: true,
		dataType: 'jsonp',
		success: function() {alert("hello");}
	});*/
	$.getJSON(query).done(function(parsed_json) {
		console.log(parsed_json);});
}