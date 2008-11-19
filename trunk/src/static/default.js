function postTile(id){
	document.write("tile clicked");
	$.post("/click?id=" + this.id);
}

function placeTile(i,data)
{
	document.write("tile added");
	
	var tilesize = 32;
	var tilecolor;
	
	tilecolor = "rgb(" + this.data + "," + this.data + "," + this.data + ")";

	$("<div class='tile'>").appendTo("body")
	.css({position: "absolute", left: this.x*tilesize+"px", top: this.y*tilesize+"px",backgroundColor: tilecolor})
	.attr("id", "x" + this.x + "y" + this.y).click( postTile(this.id) );
}

function placeTiles(json){
	document.write("adding tiles");
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
	alert("getting tiles");
    $.getJSON('/tile', placeTiles );
    
    //alert("getting units");
    //$.getJSON('/unit', placeUnits );	
}	

$(document).ready(function(){
	document.write("ready");
	loader();	
});

