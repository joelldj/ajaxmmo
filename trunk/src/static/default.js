$(document).ready(function(){
    
    /* 
    	getJSON string of tiles that have not yet been send to the browser
    	/tile will send the tiles within proximity of the characters belonging to user.  
    */ 
    $.getJSON('/tile', placeTiles );
    
    /* make the functions update the div's if they exist, otherwise append to body. */ 
    
	function placeTiles(json){
		$.each(json.tiles, function(i,data){
			/* if $(this.id) exists then access it with $("#id"). then change if required */
			/* tiles should not have not refresh as much as Units */
				if ($(this.id).is("*")){
					$(this.id).html(this.id)
		    		.css({position: "absolute", left: this.x*32+"px", top: this.y*32+"px"})
		    		.attr("id", this.id);
					/* a click event should be bound to the Tile to pass cursor location to background process */
				} else {
					$("<div class='tile'>").appendTo("body")
		    		.html(this.id)
		    		.css({position: "absolute", left: this.x*32+"px", top: this.y*32+"px"})
		    		.attr("id", this.id);
				}
    	});
    }
    
    $.getJSON('/unit', placeUnits );
    
    /* use placeTiles() as template */
    
    function placeUnits(json){
		$.each(json.tiles, function(i,data){
			/* if $(this.id) exists then access it with $("#id"). then change if required */
			if ($(this.id).is("*")){
				$(this.id).html(this.id)
	    		.css({position: "absolute", left: this.x*32+"px", top: this.y*32+"px"})
	    		.attr("id", this.id);
				/* click event should be bound to the Unit to send to the background process */
			} else {
				$("<div class='tile'>").appendTo("body")
	    		.html(this.id)
	    		.css({position: "absolute", left: this.x*32+"px", top: this.y*32+"px"})
	    		.attr("id", this.id);
			}
    	});
    }
});
