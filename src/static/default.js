var tilesize = 32;
   
function placeTiles(json){
        $.each(json.tiles, function(i,data){
                /* if $(this.id) exists then access it with $("#id"). then change if required */
                /* tiles should not have not refresh as much as Units */
               
        //tilecolor = "rgb(" + this.alt + "," + this.alt + "," + this.alt + ")";
        	
        tilecolor = "rgb(0,250,0)";
               
		if ($(this.x + "-" + this.y).is("*")){
		        $(this.x + "-" + this.y).html(this.x + ":" + this.y)
		        .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px",backgroundColor: tilecolor, zIndex: "1"})
		        .attr("id", this.x + "-" + this.y).click( function(){
		        	$.getJSON("/click?id=" + this.id, placeTiles );
		        });
		        /* a click event should be bound to the Tile to pass cursor location to background process */
		} else {
		        $("<div class='tile'>").appendTo("body")
		        .html(this.x + ":" + this.y)
		        .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px",backgroundColor: tilecolor, zIndex: "1"})
		        .attr("id", this.x + "-" + this.y).click( function(){ // id == x#y#
		        	$.getJSON("/click?id=" + this.id, placeTiles );
		        });
		}
    });
    }
   
    function placeUnits(json){
                $.each(json.units, function(i,data){
                        /* if $(this.id) exists then access it with $("#id"). then change if required */
                        if ($("u" + this.id).is("*")){
                                $("u" + this.id).html(this.x + ":" + this.y)
                                .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px", zIndex: "2"})
                                .attr("id", this.id).click( function(){
                                	$.getJSON("/click?id=" + this.id, placeUnits ); 
                                });
                                /* click event should be bound to the Unit to send to the background process */
                        } else {
                                $("<div class='unit'>").appendTo("body")
                                .html(this.x + ":" + this.y)
                                .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px", zIndex: "2", backgroundColor: "red"})
                                .attr("id", "u" + this.id).click( function(){
                                	$.getJSON("/click?id=" + this.id, placeUnits ); 
                                });
                        }
        });
    }


$(document).ready(function(){
    $.getJSON('/tile', placeTiles );
    $.getJSON('/unit', placeUnits ); 
});

