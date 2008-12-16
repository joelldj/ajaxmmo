var xoffset = 900, yoffset = 300;
var tilesize=40; // width and height of the tiles (formulas should be scalable, this won't be needed)
var units, tiles;

function getIso(tilesize,x,y){
	// make tiles with the back of the tile at half the width of the tile
	var isox = Math.round((x - y) * (tilesize * 0.5)) + xoffset;
	var isoy = Math.round((x + y) * (tilesize * 0.25)) - yoffset;
	
	return {x:isox,y:isoy};
}

function getWorldPos(w,x,y){
	var h = w/2; // the tile images should be as high as half width.
	var y_3d = Math.round( ((w*y) - (h*x)) / (w*h) );
	var x_3d = Math.round( ((w*y) + (h*x)) / (w*h) );
	
	return {x:(x_3d-9),y:(y_3d+37)};	
}

function placeTiles(json){
	var h=40, w=40;
	
	$.each(json.tiles, function(i,data){
		iso = getIso(tilesize,this.x,this.y);

		$("<div class='iso'>").appendTo("#world")
		.css({zIndex:iso.y,"position": "absolute","width": tilesize + "px","height": tilesize + "px","background-image": "url('/static/img/tile.gif')","left": iso.x,"top": iso.y})
		.attr("id", "tile" + this.x + "-" + this.y) 
		.attr("x", this.x) // give it custom attributes for x and y
		.attr("y", this.y)
		.click( function(){
			$.getJSON("/click?id=" + this.id, function(json){
				units = json.units;
				placeUnits();	
			});
		});
	});
}

function placeUnits(){
	$(".unit").remove();

	$(units).each(function(i, data){
		$.getJSON('/tile?id=' + this.id, placeTiles );
		
		iso = getIso(tilesize,this.x,this.y);
		
		$("<div class='unit'>").appendTo("#world")
		.css({zIndex:iso.y+1,"position": "absolute","width": tilesize + "px","height": tilesize + "px","background-image": "url('/static/img/isobldg.gif')","left": iso.x,"top": iso.y})
		.attr("id", "unit" + this.id)
		.attr("x", this.x)
		.attr("y", this.y)
		.click( function(){
			$.getJSON("/click?id=" + this.id, function(json){
				units = json.units;
				placeUnits();	
			});
		});
	});
}

function mouseMove(){
	$("#world").mousemove(function(e){
		var x = e.clientX - 10;
		var y = e.clientY - 20;
		var w = 40;
		
		worldpos = getWorldPos(w,x,y);

		iso = getIso(tilesize,worldpos.x,worldpos.y);
		
		$("#cursor")
		.css({zIndex:iso.y+2,"position": "absolute","width": tilesize + "px","height": tilesize + "px","background-image": "url('/static/img/cursor.gif')","left": iso.x,"top": iso.y});
	  });
}

$(document).ready(function(){
	
	$.getJSON('/unit', function(json){
		units = json.units;
		placeUnits();	
	});

	mouseMove();
	
});

