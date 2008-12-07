<html>
	<head>
		<title>JS Iso</title>
		<script language="javascript" src="js/isogame.js"></script>
		<script>
			id = 0;
			color = "<?if($color){echo $color;}else{echo "AFB8D5";}?>";
			window.onload=function(){
				// Create a Sprite
				s = new isogame.Sprite("test", "w");
				s.src['s'] = "img/tilefill.php?color="+color;
				s.src['w'] = "img/monito_fre.gif";
				s.src['e'] = "img/monito_der.gif";
				s.dim_z = 89;
				s.notify = function (ev){
					if(ev.type == "mousemove" ){
						var coords = isogame.get3DfromScreen( ev.originalEvent.coords[0], ev.originalEvent.coords[1] );
						try{ 
							var obs = scene.whatsIn( coords[0], coords[1] );
						} catch(e){ return };
				
						s.setXYZ( coords[0], coords[1], 0 );
					}
				};
				s.setXYZ(0,0,1);
				isogame.EventManager.register( s );

				// Draw a 10x10 lattice
				scene = new isogame.Scene();
				for(var x=0; x< 10; x++)
					for(var y=0; y< 10; y++) {
						var tile = new isogame.Tile( x+","+y, "", x,y);
						scene.addTile( tile );
					}

				scene.addObject( s );
				scene.draw("screen");
				
				isogame.mainloop( principal, 50 );
			};

			function principal(){
				isogame.EventManager.process();
				s.update();
			};

			function mysprite_notify(ev){
				if(ev.type == "mousemove" ){
					var coords = isogame.get3DfromScreen( ev.originalEvent.coords[0], ev.originalEvent.coords[1] );
					try{ 
						var obs = scene.whatsIn( coords[0], coords[1] );

					if( obs.length == 0 ) return;
					s.setXYZ( coords[0], coords[1], 0 );
					} catch(e){
						return;
					}

				}

			}
		</script>
	</head>
	<body>
	<div id="press"></div>
	<div id="coords"></div>
	<div id="cambio"></div>
	<div id="screen"></div>
	</body>
</html>
