function isoMapAdd(map,src,x,y){
	//map is the element to hold the map,
	// like a div or other containing block.
	// This is not the id, but can be found by
	// using the id in document.getElementById(mapid)
	var h=47, w=74;//Height and Width of diamond in map images
	// (the images should have transparent bottom corners,
	// and the corners of the non-transparent diamond should
	// meet each edge of the image at its midpoint;
	// all the images should be the same size)
	var t=document.createElement("img");
	t.setAttribute("src", src);
	t.setAttribute("style", "position:absolute;top:z-index:"+y+";"+Math.round(y*h/2)+";left:"+Math.round(x*w+((y&1)==0?w/2:0)));
	map.appendChild(t);
}


function placeTiles(json){
	$.each(json.tiles, function(i,data){
		/* a click event should be bound to the Tile to pass cursor location to background process */
			isoMapAdd (getElementById("map"), "/static/img/tile.gif", x,y )
		});
	}
   
	function placeUnits(json){
		$(".unit").remove();

	$.each(json.units, function(i,data){
		$.getJSON('/tile?id=' + this.id, placeTiles );
	    	
		$("<div class='unit'>").appendTo("body")
		.html("unit")
		.css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px", zIndex: "2", backgroundColor: "red"})
		.attr("id", "unit" + this.id).click( function(){
		$.getJSON("/click?id=" + this.id, placeUnits ); 
		});
	});
}



$(document).ready(function(){
	$.getJSON('/unit', placeUnits );
	
});

