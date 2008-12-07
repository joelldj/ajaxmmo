
function placeTiles(json){
	var h=47, w=74;
	
	$.each(json.tiles, function(i,data){	
		$("<div class='unit'>").appendTo("body")
		.html("unit")
		.css(
				{
					position: "absolute",
					width: w,
					height: h,
					left: this.x*tilesize+"px",
					top: Math.round(this.y*h/2) + "px",
					left: Math.round(x*w+((y&1)==1?w/2:0)) + "px",
					zIndex: "2",
					background-image:url('/static/img/tile.gif')
				}
			)
		.attr("id", "unit" + this.id)
	}
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

