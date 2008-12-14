var xoffset = 900, yoffset = 300;

function placeTiles(json){
	var h=40, w=40;
	
	$.each(json.tiles, function(i,data){
		
		var isox = Math.round((this.x - this.y) * h * 0.5) + xoffset;
		var isoy = Math.round((this.x + this.y) * w * 0.25) - yoffset
		
		$("<div class='iso'>").appendTo("#world")
		.css({zIndex:isoy,"position": "absolute","width": w + "px","height": h + "px","background-image": "url('/static/img/tile.gif')","left": isox,"top": isoy})
		.attr("id", "tile" + this.x + "-" + this.y).click(function(){
			$.getJSON("/click?id=" + this.id, placeUnits ); 
		});
	});
}

function placeUnits(json){
	$(".unit").remove();
	var tilesize = 32;
	var h=40, w=40;

	$.each(json.units, function(i,data){
		$.getJSON('/tile?id=' + this.id, placeTiles );
		
		// quick
		var screenx = Math.round((this.x - this.y) * h * 0.5) + xoffset;
		var screeny = Math.round((this.x + this.y) * w * 0.25) - yoffset;
		
		$("<div class='unit'>").appendTo("#world")
		.css({zIndex:screeny+1,"position": "absolute","width": w + "px","height": h + "px","background-image": "url('/static/img/isobldg.gif')","left": screenx,"top": screeny})
		.attr("id", "unit" + this.id).click( function(){
			$.getJSON("/click?id=" + this.id, placeUnits ); 
		});
	});
}

function mouseMove(){
	$("#world").mousemove(function(e){
		var x = e.clientX - 20;
		var y = e.clientY - 20;
		var w = 40;
		var h = 20;
		
		var x_3d = Math.round( ((w*y) - (h*x)) / (w*h) );
		var y_3d = Math.round( ((w*y) + (h*x)) / (w*h) )-1;
		
		$("#coords").text("x:" + (x_3d+35) + " y:" + (y_3d - 9))
		.css({zIndex:1000,"position": "absolute","left": x ,"top": y});
	    
	  });
}

$(document).ready(function(){
	$.getJSON('/unit', placeUnits, xoffset, yoffset );
	mouseMove();
});

