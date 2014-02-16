$(document).ready(function($) {
		var newDate = new Date();
		var minutes = new Date().getMinutes();
		var height = $(document).height()-300;
		var hours = new Date().getHours();
		$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
		$("#hours").html(hours);
		if (hours > 5 && hours < 12) {
			$('#message').html('<h1>Good morning</h1>');
		}
		else if (hours >= 12 && hours < 18) {
			$('#message').html('<h1>Good afternoon</h1>');
		}
		else {
			$('#message').html('<h1>Good evening</h1>');
		}
		$('#search').focus();
		$('#searchBlock').hide().fadeIn(1000);
		setInterval( function() {
			var minutes = new Date().getMinutes();
			$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
			},1000);	
		setInterval( function() {
			var hours = new Date().getHours();
			$("#hours").html(hours);
			}, 1000);
		var search = $('#search').val();
		$('#search').keypress(function(e){
			if(e.keyCode==13) {
				var ua = window.navigator.userAgent
				var msie = ua.indexOf ( "MSIE " )
				if ( msie <= 0 ) {
					$('#btnSearch').click();
				}
			}
		});
		$('#btnSearch').click( function() {
			var search = $('#search').val();
			$('#search').val('');
			window.open('http://www.puzzledragonx.com/en/search.asp?q=' + search, "_self");
		});
		$('#app-return').click(function(e) {
            e.preventDefault();
            chrome.tabs.update({
                url:'chrome-internal://newtab/'
            });
        });
		$('#todo').click(function(e) {
			console.log('woot');
            e.preventDefault();
            $('#todoapp').toggle();
        });
	});
