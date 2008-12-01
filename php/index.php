<?
include("include/session.php");
?>

<html>

<head>

<title>Super RPG Game</title>
      <script language="JavaScript" type="text/javascript">      
         var req;
         var isIE = false;
	 var i = 0;
	 var frame = 0;
         var mtimer = 0;
	 var scale = 32;
	 var fov = 10;
         
         var direction = "nowhere";

         
         function loadXMLDoc(url) {
            req = false;
            // branch for native XMLHttpRequest object
            if(window.XMLHttpRequest && !(window.ActiveXObject)) {
               try {
                  req = new XMLHttpRequest();
               } catch(e) {
                  req = false;
               }
            // branch for IE/Windows ActiveX version
            } else if(window.ActiveXObject) {
                  try {
                  req = new ActiveXObject("Msxml2.XMLHTTP");
                  } catch(e) {
                  try {
                        req = new ActiveXObject("Microsoft.XMLHTTP");
                  } catch(e) {
                        req = false;
                  }
               }
            }
            if(req) {
               req.onreadystatechange = processReqChange;
               req.open("GET", url, true);
               req.send("");
            }
         }

	function gameframe(){
		loadXMLDoc('getworld.php');
                setTimeout('gameframe();',5000); //Refresh in 2 seconds
	}

         // handle onreadystatechange event of req object
         function processReqChange(){

             // only if req shows "loaded"
             if (req.readyState == 4) {
                 // only if "OK"
                 if (req.status == 200) {

		     var i;
                     var chat_div = document.getElementById('worldbox');
		     var game_roster = document.getElementById('roster');
		     var playerx;
	             var playery;

		     var response = eval('(' + req.responseText + ')');

			for(i=0;i < response.game[0].player.length; i++) {
				playerx = parseInt(response.game[0].player[i].x);
				playery = parseInt(response.game[0].player[i].y);

				var adjustx = ((playerx - fov)*scale);
				var adjusty = ((playery - fov)*scale);
					
			        chat_div.innerHTML = playerx + ","  + playery + "</br>";
			}
         
			var canvas = document.getElementById('canvas');
			if (canvas.getContext){
		    		var ctx = canvas.getContext('2d');
				ctx.fillStyle = "rgb(255,255,255)";

				ctx.fillRect(0,0,800,800);
				for(i=0;i < response.game[2].tiles.length; i++) {
					var altitude = response.game[2].tiles[i].altitude;
					var tilex = parseInt(response.game[2].tiles[i].x);
					var tiley = parseInt(response.game[2].tiles[i].y);
					
						ctx.fillStyle = "rgb(" + (altitude * 5)%255 + " , " + (altitude * 5)%255+ "," + (altitude * 5)%255 + ")";
				    		ctx.fillRect((tilex*scale)-adjustx,(tiley*scale)-adjusty,scale,scale);
				}

				game_roster.innerHTML = "Other Players:<p>";
				for(i=0;i < response.game[1].otherplayers.length; i++) {
		                        game_roster.innerHTML += "Logon: " + response.game[1].otherplayers[i].player_logon;
		                        game_roster.innerHTML += " Tile: " + response.game[1].otherplayers[i].tileid + "</br>";
					otherplayerx = parseInt(response.game[1].otherplayers[i].x);
					otherplayery = parseInt(response.game[1].otherplayers[i].y);

					ctx.fillStyle = "rgb(0,0,255)";
					ctx.fillRect((otherplayerx*scale)-adjustx,(otherplayery*scale)-adjusty,scale,scale);
				}

				for(i=0;i < response.game[0].player.length; i++) {
					playerx = parseInt(response.game[0].player[i].x);
					playery = parseInt(response.game[0].player[i].y);

		                        chat_div.innerHTML = playerx + ","  + playery + "</br>";

					ctx.fillStyle = "rgb(0,255,0)";
					ctx.fillRect((playerx*scale)-adjustx,(playery*scale)-adjusty,scale,scale);
				}
			}



                  } else {
                     alert("There was a problem retrieving the data:\n" +
                         req.statusText);
                  }

             }

         }

		</script>
	</head>

<?
/**
 * User has already logged in, so display relavent links, including
 * a link to the admin center if the user is an administrator.
 */
if($session->logged_in){
   echo "<h1>Logged In</h1>";
   echo "Welcome <b>$session->username</b>, you are logged in. <br><br>"
       ."[<a href=\"userinfo.php?user=$session->username\">My Account</a>] &nbsp;&nbsp;"
       ."[<a href=\"useredit.php\">Edit Account</a>] &nbsp;&nbsp;";
   if($session->isAdmin()){
      echo "[<a href=\"admin/admin.php\">Admin Center</a>] &nbsp;&nbsp;";
   }
   echo "[<a href=\"process.php\">Logout</a>]";
   
?>


<body onLoad="javascript:gameframe();">

<table>
<tr><td>

<canvas id="canvas" width="640" height="640" style="border: 1px solid black;"></canvas>

<p>

<td>

<table>
<tr>
<td>
<td><button onclick="loadXMLDoc('getworld.php?direction=up');">Up</button><td>

<tr><td><button onclick="loadXMLDoc('getworld.php?direction=left');">Left</button>
<td><h2>Walk</h2>
<td><button onclick="loadXMLDoc('getworld.php?direction=right');">Right</button>

<tr>
<td>
<td><button onclick="loadXMLDoc('getworld.php?direction=down');">Down</button>
<td>

<tr><td colspan=2>

<div id="roster">

</table>

<div id="screen"></div>

<div style="width:100px;height:100px;border:0px solid #51213f;overflow:scroll" id="worldbox"></div>


<?
   
}
else{
?>

<body>

<table>
<tr><td>

<h1>Login</h1>
<?
/**
 * User not logged in, display the login form.
 * If user has already tried to login, but errors were
 * found, display the total number of errors.
 * If errors occurred, they will be displayed.
 */
if($form->num_errors > 0){
   echo "<font size=\"2\" color=\"#ff0000\">".$form->num_errors." error(s) found</font>";
}
?>
<form action="process.php" method="POST">
<table align="left" border="0" cellspacing="0" cellpadding="3">
<tr><td>Username:</td><td><input type="text" name="user" maxlength="30" value="<? echo $form->value("user"); ?>"></td><td><? echo $form->error("user"); ?></td></tr>
<tr><td>Password:</td><td><input type="password" name="pass" maxlength="30" value="<? echo $form->value("pass"); ?>"></td><td><? echo $form->error("pass"); ?></td></tr>
<tr><td colspan="2" align="left"><input type="checkbox" name="remember" <? if($form->value("remember") != ""){ echo "checked"; } ?>>
<font size="2">Remember me next time &nbsp;&nbsp;&nbsp;&nbsp;
<input type="hidden" name="sublogin" value="1">
<input type="submit" value="Login"></td></tr>
<tr><td colspan="2" align="left"><br><font size="2">[<a href="forgotpass.php">Forgot Password?</a>]</font></td><td align="right"></td></tr>
<tr><td colspan="2" align="left"><br>Not registered? <a href="register.php">Sign-Up!</a></td></tr>
</table>
</form>

<?
}

/**
 * Just a little page footer, tells how many registered members
 * there are, how many users currently logged in and viewing site,
 * and how many guests viewing site. Active users are displayed,
 * with link to their user information.
 */
echo "</td></tr><tr><td align=\"center\"><br><br>";
echo "<b>Member Total:</b> ".$database->getNumMembers()."<br>";
echo "There are $database->num_active_users registered members and ";
echo "$database->num_active_guests guests viewing the site.<br><br>";

include("include/view_active.php");

?>

<p id="p_status"></p>

</td></tr>
</table>


</body>
</html>
