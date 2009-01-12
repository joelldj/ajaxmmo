var xoffset = 900, yoffset = 300;
var tilesize=40; // width and height of the tiles (formulas should be scalable, this won't be needed)
var cursorX, cursorY;
var units, tiles;
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
	
	return {x:(x_3d-9),y:(y_3d+37)};	
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

function resetClick(){
	runOnce = 0;
	showSelectedUnits();
}

function worldClick(){

	$(".tile").mouseup(function(){
		clickedTile = $(".tile[x="+cursorX+"][y="+cursorY+"]");

		if (runOnce == 0){
			runOnce++;

			$(".unit[selected=true]").each( function(){
				unitid = $(this).attr("id");

				$.getJSON("/click?id=" + clickedTile.attr("id"), function(json){
					units = json.units;
					placeUnits();
					showSelectedUnits();	
				});
			});

			clickedUnit = $(".unit[x="+cursorX+"][y="+cursorY+"]");

			if (clickedUnit.length > 0){
				// toggle unit selection
				if (clickedUnit.attr("selected") == "false"){
					clickedUnit.attr("selected","true");
				} else {
					clickedUnit.attr("selected","false");
				}
			}
			setTimeout("resetClick()", 500);
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

		$("<div class='tile'>").appendTo("#world")
		.sprite(iso, tiletype, 0) // tile.gif, is the lowest sprite to draw.
		.attr("id", "tile" + this.x + "-" + this.y) 
		.attr("x", this.x) // give it custom attributes for x and y
		.attr("y", this.y);

		setTimeout("worldClick()",100);
	});
}

function placeUnits(){
	$(units).each(function(i, data){
		$.getJSON('/tile?id=' + this.id, placeTiles );
		
		iso = getIso(tilesize,this.x,this.y);

                tileElement =  $('#unit' + this.id);
	
                if (tileElement.length === 0 ){
                    $("<div class='unit'>").appendTo("#world").attr("id", "unit" + this.id);
                    tileElement =  $('#unit' + this.id);
                }
	
		tileElement.sprite(iso, "unit", 3) // units are above tiles 
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
	
	worldpos = getWorldPos(w,x,y);

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

function messageSendBoxEvent(){
	$("#msgbox").keypress(function (e) {
		if (e.which == 13){
			$("#msgbox").html("");
			//$.post("/chat") // post message to the chat server
		}
	})
}

$(document).ready(function(){
	
	$.getJSON('/unit', function(json){
		units = json.units;
		placeUnits();
		worldMouse();
		setTimeout("worldClick()",500);
	});
});

