$(document).ready(function() {
	var searched = false;
	var height = $(document).height()-300;
	$('#information').css({height: $(document).height()-10-$('#searchBlock').height()});
	$('#searchBlock').css({position: 'absolute', top: height/2.0 + 'px'});
    $('#searchBlock').hide().fadeIn(1000);
	$('#search').focus();
	$('#search').keypress(function(e){
		if(e.keyCode==13) {
			var ua = window.navigator.userAgent
			var msie = ua.indexOf ( "MSIE " )
			if ( msie <= 0 ) {
				$('#btnSearch').click();
			}
		}
    });
	$('#search').focus( function() {
		$('#search').val('');
	});
	$('#btnSearch').click( function() {
		var search = $('#search').val();
		$('#search').blur();
		console.log(search);
		if (!searched) {
			$('#weee').animate({'font-size': 1.5 + 'em'},1000);
			$('#searchBlock').animate({'top': 0 + 'px'}, 1000, function(){
				$('#results').css({'top': $('#searchBlock').height() + 'px'}).fadeIn(200);
			});
			searched = true;
			$('#searchBlock').css({position: 'fixed'});
		}
		$('#information').empty();
		$('#information').append('<h1>WHats UP DAWg ' + search + '</h1>');
	});
});