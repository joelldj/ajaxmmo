var tilesize = 32;

function placeTile(i,data)
{
	tilecolor = "rgb(" + this.data + "," + this.data + "," + this.data + ")";

	$("<div class='tile'>").appendTo("body")
	.css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px",backgroundColor: tilecolor})
	.attr("id", "x" + this.x + "y" + this.y).click( function(){ // id == x#y#
		$.post("/click?id=" + this.id);
	}
}

function placeTiles(json){
	$.each(json.tiles, placeTile(i,data));
}

function placeUnits(json){
	$.each(json.tiles, function(i,data){

		if ($(this.id).is("*")){
			$(this.id).html(this.id)
    		.css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px"})
    		.attr("id", this.id).click( function(){ 
    	    	$.post("/click?id=" + this.id);
    	    });

		} else {
			$("<div class='tile'>").appendTo("body")
    		.html(this.id)
    		.css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px"})
    		.attr("id", this.id).click( function(){ 
    	    	$.post("/click?id=" + this.id);
    	    });
		}
	});
}

function loader(){
    $.getJSON('/tile', placeTiles );
    $.getJSON('/unit', placeUnits );	
}


$(document).ready(function(){
	loader();
});

