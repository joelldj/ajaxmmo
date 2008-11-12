$(document).ready(function(){
	
	initTiles();
	
	function initTiles(){
		var x = 0;
		var y = 0;
	
		for (x=0;x<10;x++){
			for (y=0;y<10;y++){
				$.post('/init?x=' + x + '&y=' + y + '&height=1&type=1', function(){
					 $("<b>" + x + ":" + y + "</b> </br>").appendTo("#progress");
				});
			}
		}
	}

});