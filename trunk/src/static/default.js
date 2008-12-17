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

jQuery.fn.sprite = function(iso, spriteimg, heightoffset){
	return this.each(function(){
			$(this).css({zIndex:iso.y+heightoffset,"position": "absolute","width": tilesize + "px","height": tilesize + "px","background-image": "url('/static/img/" + spriteimg + ".gif')","left": iso.x,"top": iso.y})
		});
}

function placeTiles(json){
	var h=40, w=40;
	
	$.each(json.tiles, function(i,data){
		iso = getIso(tilesize,this.x,this.y);

		$("<div class='iso'>").appendTo("#world")
		.sprite(iso, "tile", 0) // tile.gif, is the lowest sprite to draw.
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
		.sprite(iso, "unit", 1) // units are above tiles 
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
		
		$("#cursor").sprite(iso, "cursor", 5) // cursor should be shown on top of all other sprites

	  });
}

$(document).ready(function(){
	
	$.getJSON('/unit', function(json){
		units = json.units;
		placeUnits();	
	});

	mouseMove();
	
});

