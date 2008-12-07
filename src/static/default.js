
function placeTiles(json){
	$.each(json.tiles, function(i,data){
		/* a click event should be bound to the Tile to pass cursor location to background process */

		var tile = new isogame.Tile( this.x+","+this.y, "", this.x,this.y);
		scene.addTile( tile );    
	    
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



function principal(){
	isogame.EventManager.process();
	s.update();
};


$(document).ready(function(){
	scene = new isogame.Scene();
	$.getJSON('/unit', placeUnits );
	scene.draw("screen");
	isogame.mainloop( principal, 50 );
});

