var xoffset = 900, yoffset = 300;

function placeTiles(json){
	var h=40, w=40;
	
	$.each(json.tiles, function(i,data){
		
		var isox = Math.round((this.x - this.y) * h * 0.5) + xoffset;
		var isoy = Math.round((this.x + this.y) * w * 0.25) - yoffset
		
		$("<div class='iso'>").appendTo("body")
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

		var isox = Math.round((this.x - this.y) * h * 0.5) + xoffset;
		var isoy = Math.round((this.x + this.y) * w * 0.25) - yoffset;
	    	
		$("<div class='unit'>").appendTo("body")
		.css({zIndex:isoy+1,"position": "absolute","width": w + "px","height": h + "px","background-image": "url('/static/img/isobldg.gif')","left": isox,"top": isoy})
		.attr("id", "unit" + this.id).click( function(){
			$.getJSON("/click?id=" + this.id, placeUnits ); 
		});
	});
}



$(document).ready(function(){
	$.getJSON('/unit', placeUnits, xoffset, yoffset );
});

