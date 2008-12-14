var xoffset = 900, yoffset = 300;

function placeTiles(json){
	var h=40, w=40;
	
	$.each(json.tiles, function(i,data){
		
		var isox = Math.round((this.x - this.y) * h * 0.5) + xoffset;
		var isoy = Math.round((this.x + this.y) * w * 0.25) - yoffset
		
		$("<div class='iso'>").appendTo("#world")
		.html(this.x + ":" + this.y)
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
		
		// slow
//		var worldx, worldy;
//		worldx = (this.x * h);
//		worldy = (this.y * h);
//		
//		var screenx = Math.round(((worldx - worldy) * 0.5) + xoffset);
//		var screeny = Math.round(((worldx + worldy) * 0.25) - yoffset);
		
		$("<div class='unit'>").appendTo("#world")
		.css({zIndex:screeny+1,"position": "absolute","width": w + "px","height": h + "px","background-image": "url('/static/img/isobldg.gif')","left": screenx,"top": screeny})
		.attr("id", "unit" + this.id).click( function(){
			$.getJSON("/click?id=" + this.id, placeUnits ); 
		});
	});
}

function mouseMove(){
	$("#world").mousemove(function(e){
		var ymouse=((2*e.clientY-e.clientX)/2) + xoffset;
		var xmouse=(e.clientX+ymouse) + yoffset;
		
	    $("span:last").text("x:" + Math.round(xmouse/40) + " y:" + Math.round(ymouse/40))
	    
	  });
}

$(document).ready(function(){
	$.getJSON('/unit', placeUnits, xoffset, yoffset );
	mouseMove();
});

