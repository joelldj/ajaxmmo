var tilesize = 32;
   
function placeTiles(json){
        $.each(json.tiles, function(i,data){
        /* if $(this.id) exists then access it with $("#id"). then change if required */
        /* tiles should not have not refresh as much as Units */
              
        if ($("#tile" + this.x + "-" + this.y).length > 0){	
		        $(this.x + "-" + this.y).html(this.x + ":" + this.y)
		        .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px",backgroundColor: tilecolor, zIndex: "1"})
		        .attr("id", this.x + "-" + this.y).click( function(){
		        	// clicking on a tile we repeat the cycle of loading units then retriving what they can see
		        	$.getJSON("/click?id=" + this.id, placeUnits );
		        });
		        /* a click event should be bound to the Tile to pass cursor location to background process */
		} else {
		        $("<div class='tile'>").appendTo("body")
				.addClass(this.alt) /* class comes from json, then the tile has two classes such as .tile and .grass */
		        .html(this.x + ":" + this.y)
		        .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px", zIndex: "1"})
		        .attr("id", "tile" + this.x + "-" + this.y).click( function(){ // id = x-y
		        	// clicking on a tile we repeat the cycle of loading units then retriving what they can see
		        	$.getJSON("/click?id=" + this.id, placeUnits );
		        });
		}
    });
    }
   
    function placeUnits(json){
                $.each(json.units, function(i,data){
                	
                    	$.getJSON('/tile?id=' + this.id, placeTiles );
                	
                        /* if $(this.id) exists then access it with $("#id"). then change if required */
                        if ($("#unit" + this.id).length > 0){
                                $(this.id).html(this.x + ":" + this.y)
                                .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px", zIndex: "2"})
                                .attr("id", "unit" + this.id).click( function(){
                                	$.getJSON("/click?id=" + this.id, placeUnits ); 
                                });
                                /* click event should be bound to the Unit to send to the background process */
                        } else {
                                $("<div class='unit'>").appendTo("body")
                                .html(this.x + ":" + this.y)
                                .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px", zIndex: "2", backgroundColor: "red"})
                                .attr("id", "unit" + this.id).click( function(){
                                	$.getJSON("/click?id=" + this.id, placeUnits ); 
                                });
                        }
        });
    }


$(document).ready(function(){
    $.getJSON('/unit', placeUnits ); 
});

