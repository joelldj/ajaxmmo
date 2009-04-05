/*
The MIT License

Copyright (c) 2008-2009 Joseph Le Brech

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var xoffset = 850, yoffset = -150;
var tilesize=40; // width and height of the tiles (formulas should be scalable, this won't be needed)
var cursorX, cursorY;
var runOnce = 0;

/*** 
   ** ENGINE API STUFF
   ***/
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

/* similar to sprite but the sprite position x,y attributes are set zIndex is one level below the sprite. */
jQuery.fn.underlay = function(spriteimg, classname){
	return this.each(function(){
			left = $(this).css("left");
			top = $(this).css("top");
			zindex = $(this).css("zIndex");

			$("<div class='" + classname + "'>").appendTo("#world")
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

/* Place a peice of text just next to the chained element */
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
/*** 
   ** GAME CODE
   ***/
function gameCycle(){
  // each moving unit should be posted to the server for updates
  $(".unit[selected=true]").each( function(){
    unitid = $(this).attr("id");
    unit_x_goto = $(this).attr("x-goto");
    unit_y_goto = $(this).attr("y-goto");
    
	/**
		move selected units toward goto position
	**/
    $.getJSON("/moveunit?unitid=" + unitid + "&x-goto=" + unit_x_goto + "&y-goto=" + unit_y_goto , function(json){
		// do something with json data, maybe return success (resource data etc..)
    });
	
	/**
	   Get all new player unit data (hence tiles and enemy unit data recursively when you drill down 
	  **/
	$.getJSON("/click?id=" + clickedTile.attr("id"), function(json){
		//units = json.units;
		placeUnits(json,"unit"); // drill into each unit
		showSelectedUnits(); // show the selection reticle on the selected units
	});
	
	
  });

  setTimeout("gameCycle()", 2000); // rerun in x milliseconds
}

function selectedUnitsGoto(x,y){
  $(".unit[selected=true]").each(function(){
    $(this).attr("x-goto", x);
    $(this).attr("y-goto", y);
    $(this).underlay("goto", "goto");
  });
}

function selectClickedUnit(){
		clickedUnit = $(".unit[x="+cursorX+"][y="+cursorY+"]");

		if (clickedUnit.length > 0){
			// toggle unit selection
			if (clickedUnit.attr("selected") == "false"){
				clickedUnit.attr("selected","true");
			} else {
				clickedUnit.attr("selected","false");
			}
		}
}

function worldClick(){
	$(".tile").live("mouseup",function(){
    selectedUnitsGoto(cursorX, cursorY);
    selectClickedUnit();
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
			$.getJSON('/tile?id=' + this.id, placeTiles ); // show me what my units are seeing
		}
	
		iso = getIso(tilesize,this.x,this.y); // convert the units world coordinates to screen coordinates
			
		tileElement =  $('#unit' + this.id); // select the unit
		
		if (tileElement.length === 0 ){ // if unit does not exists
			$("<div class='" + unitfaction + "'>").appendTo("#world").attr("id", "unit" + this.id);
			tileElement =  $('#unit' + this.id); // select the unit now it has been created "tileElement = ..." above should be possible.
		}
	
		tileElement.sprite(iso, unitfaction, 3) // units are above tiles  (3)
		.label(this.owner)
		.attr("x", this.x)
		.attr("y", this.y);
	});
}

function showSelectedUnits(){
	$(".reticle").remove();
  $(".unit[selected=true]").underlay("unitselect", "reticle");
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

/***
   ** Chat
   ***/
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

/***
  ** Initialize
  ***/
$(document).ready(function(){
	$.getJSON('/unit', function(json){
		//units = json.units;
		placeUnits(json,"unit");
		worldMouse();
		setTimeout("worldClick()",500);
		setTimeout("chatKeyboardEvents()",500);
    setTimeout("gameCycle()", 2000);
	});
});

