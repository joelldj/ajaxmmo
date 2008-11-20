function placeTiles(json){
	var tilesize = 32;
	
	alert("hi here");
	
    $.each(json.tiles, function(i,data){
    	
    	tilecolor = "rgb(" + this.alt + "," + this.alt + "," + this.alt + ")";

                $("<div class='tile'>").appendTo("body")
        .html(this.id)
        .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px"})
        .attr("id", this.id).click( function(){
        $.post("/click?id=" + this.id);
        });
    });
}

function placeUnits(json){
	
	var tilesize = 32;
	
        $.each(json.units, function(i,data){
                if ($(this.id).is("*")){
                    $(this.id).html(this.id)
            .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px"})
            .attr("id", this.id).click( function(){
            $.post("/click?id=" + this.id);
        });

            } else {
                    $("<div class='unit'>").appendTo("body")
            .html(this.id)
            .css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px"})
            .attr("id", this.id).click( function(){
            $.post("/click?id=" + this.id);
            });
                }
    });
}
   

$(document).ready(function(){
	$.getJSON('/tile',function(data){
		alert("hi");
	});
	
	$.getJSON('/tile', 
    		placeTiles 
    );
    
    $.getJSON('/unit', placeUnits );
});

