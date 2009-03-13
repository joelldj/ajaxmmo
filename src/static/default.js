var xoffset = 850, yoffset = -150;
var tilesize=40; // width and height of the tiles (formulas should be scalable, this won't be needed)
var cursorX, cursorY;
var runOnce = 0;

function getIso(tilesize,x,y){
	// make tiles with the back of the tile at half the width of the tile
	var isox = Math.round((x - y) * (tilesize * 0.5)) + xoffset;
	var isoy = Math.round((x + y) * (tilesize * 0.25)) - yoffset;
	
	return {x:isox,y:isoy};
}

function getWorldPos(w,x,y){
	var h = w/2; // the tile images should be as high as half width.
	var y_3d = Math.round( ((w*y) - (h*x)) / (w*h) );
	var x_3d = Math.round( ((w*y) + (h*x)) / (w*h) );
	
	//return {x:(x_3d-15),y:(y_3d+28)};
        return {x:(x_3d-1),y:(y_3d)};	
}

/* place the passed list sprites with the parameter posision and img */
jQuery.fn.sprite = function(iso, spriteimg, heightoffset){
	return this.each(function(){
			$(this).css({
                               zIndex:iso.y+heightoffset,
                               "position": "absolute",
                               "width": tilesize + "px",
                               "height": tilesize + "px",
                               "background-image": "url('/static/img/" + spriteimg + ".gif')",
                               "left": iso.x,
                                "top": iso.y});
		});
}

/* similar to sprite but the sprite position x,y attributes are set
   zIndex is one level below the sprite.
 */
jQuery.fn.underlay = function(spriteimg){
	return this.each(function(){
			left = $(this).css("left");
			top = $(this).css("top");
			zindex = $(this).css("zIndex");

			$("<div class='reticle'>").appendTo("#world")
                        .css({
                              zIndex:zindex-1,
                              "position": "absolute",
                              "width": tilesize + "px",
                              "height": tilesize + "px",
                              "background-image": "url('/static/img/" + spriteimg + ".gif')",
                              "left": left,
                              "top": top
                        })
		});
}

jQuery.fn.label = function(text){
	return this.each(function(){
			left = $(this).css("left");
			top = $(this).css("top");
			zindex = $(this).css("zIndex");
			labelid = "#label" + $(this).attr("id");

		        labelElement =  $(labelid);
	
		        if (labelElement.length === 0 ){

				$("<a>").appendTo("#world").attr("id", "label" + $(this).attr("id"))

				labelElement =  $(labelid);
			}

			labelElement.css({
		                      zIndex:zindex+1,
		                      "position": "absolute",
		                      "left": left,
		                      "top": top
		                }).html(text);

		});
}


function resetClick(){
	runOnce = 0;
	showSelectedUnits();
}

function worldClick(){

	$(".tile").mouseup(function(){
		clickedTile = $(".tile[x="+cursorX+"][y="+cursorY+"]");


		// clicks that post back should be on a timer
		if (runOnce == 0){
			runOnce++;

			$(".unit[selected=true]").each( function(){
				unitid = $(this).attr("id");

				$.getJSON("/click?id=" + clickedTile.attr("id"), function(json){
					//units = json.units;
					placeUnits(json,"unit");
					showSelectedUnits();	
				});
			});

			setTimeout("resetClick()", 250);
		}


		// gui only clicks not to be time limited.
		clickedUnit = $(".unit[x="+cursorX+"][y="+cursorY+"]");

		if (clickedUnit.length > 0){
			// toggle unit selection
			if (clickedUnit.attr("selected") == "false"){
				clickedUnit.attr("selected","true");
			} else {
				clickedUnit.attr("selected","false");
			}
		}

	});
}

function placeTiles(json){
	var h=40, w=40;
	
	$.each(json.tiles, function(i,data){
		iso = getIso(tilesize,this.x,this.y);

		var tiletype;

		tiletype = "tile";

		if (this.alt < 81){
		    tiletype = "water";
		}

		// add tile existence checking like for unit checking.	
        tileElement =  $('#tile' + this.x + "-" + this.y);
	
        if (tileElement.length === 0 ){
			$("<div class='tile'>").appendTo("#world")
			.sprite(iso, tiletype, 0) // tile.gif, is the lowest sprite to draw.
			.attr("id", "tile" + this.x + "-" + this.y) 
			.attr("x", this.x) // give it custom attributes for x and y
			.attr("y", this.y);
        }
		
		// place enemy units on screen.
		placeUnits(json,"enemy");
		
		setTimeout("worldClick()",100);
	});
}

function placeUnits(json,unitfaction){
	var unitfaction;

	if (unitfaction == "unit"){
		units = json.units;
	} else {
		units = json.enemyunits;
	}


	$(units).each(function(i, data){
	
		if (unitfaction == "unit"){
			$.getJSON('/tile?id=' + this.id, placeTiles );
		}
	
		iso = getIso(tilesize,this.x,this.y);
			
		tileElement =  $('#unit' + this.id);
		
		if (tileElement.length === 0 ){			
			$("<div class='" + unitfaction + "'>").appendTo("#world").attr("id", "unit" + this.id);
			tileElement =  $('#unit' + this.id);
		}
	
		tileElement.sprite(iso, unitfaction, 3) // units are above tiles 
		.label(this.owner) 
		.attr("x", this.x)
		.attr("y", this.y);
	});
}

function showSelectedUnits(){
	$(".reticle").remove();
        $(".unit[selected=true]").underlay("unitselect");
} 

function drawCursor(x,y){
	var w = 40;
	
	worldpos = getWorldPos(w,x-xoffset,y+yoffset);

	iso = getIso(tilesize,worldpos.x,worldpos.y);

	cursorX = worldpos.x;
	cursorY = worldpos.y;
	
	$("#cursor").sprite(iso, "cursor", 1); // cursor should be shown on top of all other sprites
}

function worldMouse(){
	$("#world").mousemove(function(e){
		var x = e.pageX - 10;
		var y = e.pageY - 20;
		drawCursor(x,y);
	});
}

function gameChatPoll(){
	// getJson of latest message /chat every x millseconds
	$.getJSON("/chat", function(json){
		msg = json.msg;
		$("#chatRoom").appendTo( msg.time + " " + msg.from + "says: " + msg.text + " to: " + msg.to);
	});

	setTimeout("gameChatPoll()",5000); 
}

function chatKeyboardEvents(){
	$("#msgbox").keypress(function (e) {
		if (e.which == 13){
			var msg = $("#msgbox")[0].value;
			$("#msgbox")[0].value = "";
			//$.post("/chat") // post message to the chat server
			unitid = $(".unit[selected=true] :first").attr("id");
			$.post("/chat", { from: unitid, to:0, text:msg } ); 			
		}
	})
}

$(document).ready(function(){
	
	$.getJSON('/unit', function(json){
		//units = json.units;
		placeUnits(json,"unit");
		worldMouse();
		setTimeout("worldClick()",500);
		setTimeout("chatKeyboardEvents()",500);
	});

});

