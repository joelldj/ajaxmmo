var tilesize = 32;
   
function placeTiles(json){
        $.each(json.tiles, function(i,data){
                /* if $(this.id) exists then access it with $("#id"). then change if required */
                /* tiles should not have not refresh as much as Units */
               
                tilecolor = "rgb(" + this.alt + "," + this.alt + "," + this.alt + ")";
               
                        if ($("x" + this.x + "y" + this.y).is("*")){
                                $("x" + this.x + "y" + this.y).html("")
                        .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px",backgroundColor: tilecolor})
                        .attr("id", "x" + this.x + "y" + this.y).click( function(){
                        $.post("/click?id=" + this.id);
                    });
                                /* a click event should be bound to the Tile to pass cursor location to background process */
                        } else {
                                $("<div class='tile'>").appendTo("body")
                        .html("")
                        .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px",backgroundColor: tilecolor, zIndex: "1"})
                        .attr("id", "x" + this.x + "y" + this.y).click( function(){ // id == x#y#
                        $.post("/click?id=" + this.id);
                    });
                        }
    });
    }
   
    function placeUnits(json){
                $.each(json.units, function(i,data){
                        /* if $(this.id) exists then access it with $("#id"). then change if required */
                        if ($("u" + this.id).is("*")){
                                $("u" + this.id).html(this.id)
                        .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px"})
                        .attr("id", this.id).click( function(){
                        $.post("/click?id=" + this.id);
                    });
                                /* click event should be bound to the Unit to send to the background process */
                        } else {
                                $("<div class='unit'>").appendTo("body")
                        .html(this.id)
                        .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px", zIndex: "2", backgroundColor: "red"})
                        .attr("id", "u" + this.id).click( function(){
                        $.post("/click?id=" + this.id);
                    });
                        }
        });
    }


$(document).ready(function(){
    $.getJSON('/tile', placeTiles );
    $.getJSON('/unit', placeUnits ); 
});

