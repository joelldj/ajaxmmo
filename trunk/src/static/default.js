var tilesize = 32;
   
function placeTiles(json){
        $.each(json.tiles, function(i,data){
		        /* a click event should be bound to the Tile to pass cursor location to background process */
		        $("<div class='tile'>").appendTo("body")
				.addClass(this.alt) /* class comes from json, then the tile has two classes such as .tile and .grass */
//		        .html(this.alt)
		        .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px", zIndex: "1"})
		        .attr("id", "tile" + this.x + "-" + this.y).click( function(){ // id = x-y
		        	// clicking on a tile we repeat the cycle of loading units then retrieving what they can see
		        	$.getJSON("/click?id=" + this.id, placeUnits );
		        });
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
	//$.getJSON('/tile?id=2086', placeTiles );
});

