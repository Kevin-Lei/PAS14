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
	$.getJSON(query).done(function(parsed_json) {
		for (var x=0; x< parsed_json.length; x++) {
			console.log(x);
			if (parsed_json[x]["group_name"]=='B') {
				console.log(parsed_json[x]["title"]);
				console.log(parsed_json[x]["starts_at"]);
			}
		}
	console.log(parsed_json);});
}