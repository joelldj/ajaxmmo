
function placeTiles(json){
	var h=40, w=40;
	var offset = 1;
	
	$.each(json.tiles, function(i,data){
		var isoy = Math.round((this.y+offset)*h/4) + "px";
		var isox = Math.round(this.x*w+((this.y&1)==1?w/2:0)) + "px";
		
		$("<div class='iso'>").appendTo("body")
		.html(this.x + ":" + this.y)
		.css({zIndex:this.y,"position": "absolute","width": w + "px","height": h + "px","background-image": "url('/static/img/tile.gif')","left": isox,"top": isoy})
		.attr("id", "tile" + this.x + "-" + this.y).click(function(){
			$.getJSON("/click?id=" + this.id, placeUnits ); 
		});
	});
}


function placeUnits(json){
	$(".unit").remove();
	var tilesize = 32;
	var h=40, w=40;
	var offset = 1;

	$.each(json.units, function(i,data){
		$.getJSON('/tile?id=' + this.id, placeTiles );

		var isoy = Math.round((this.y+offset)*h/4) + "px";
		var isox = Math.round(this.x*w+((this.y&1)==1?w/2:0)) + "px";
	    	
		$("<div class='unit'>").appendTo("body")
		.css({zIndex:this.y+1,"position": "absolute","width": w + "px","height": h + "px","background-image": "url('/static/img/isobldg.gif')","left": isox,"top": isoy})
		.attr("id", "unit" + this.id).click( function(){
			$.getJSON("/click?id=" + this.id, placeUnits ); 
		});
	});
}



$(document).ready(function(){
	$.getJSON('/unit', placeUnits );
});

