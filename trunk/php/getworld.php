<?

include("include/session.php");



//Send some headers to keep the user's browser from caching the response.
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT" ); 
header("Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . "GMT" ); 
header("Cache-Control: no-cache, must-revalidate" ); 
header("Pragma: no-cache" );


/**
 * User has already logged in, so display relavent links, including
 * a link to the admin center if the user is an administrator.
 */
if($session->logged_in){

   mysql_connect(localhost, "gamer", "AThm.9bWufxRGwxU");
   mysql_select_db("gameworld") or die("Unable to select database");
   
   $direction = $_GET["direction"];
   $username = $session->username;

   $sql = "select id as player_id, logon as player_logon, tileid, hp, maxhp, tribeid, direction,";
   $sql = $sql . " (SELECT x FROM tiles WHERE id = (SELECT player.tileid from player where logon = '$username')) AS x, ";
   $sql = $sql . " (SELECT y FROM tiles WHERE id = (SELECT player.tileid from player where logon = '$username')) AS y ";
   $sql = $sql . " from player where logon = '$username'";

   //echo $sql;
   $result = mysql_query($sql);

   $xdir = 0;
   $ydir = 0;
   echo '{';
	echo 'game:[';

		echo '{player:';
		echo '[';
			echo '{';
				while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
					echo 'player_id:"' . $row["player_id"] . '",' ;
					echo 'player_logon:"' . $row["player_logon"] . '",' ;
					$player_tile_id = $row["tileid"];
					echo 'tileid:"' . $row["tileid"] . '",';
					echo 'hp:"' . $row["hp"] . '",';
					echo 'maxhp:"' . $row["maxhp"] . '",';
					echo 'tribeid:"' . $row["tribeid"] . '",';
					echo 'direction:"' . $row["direction"] . '",'; 
					echo 'x:"' . $row["x"] . '",'; 
					$playerx = $row["x"];
					echo 'y:"' . $row["y"] . '"'; 
					$playery = $row["y"];

						if (sizeof($direction) == 0 ) { $direction = "nowhere"; }
						mysql_query("update player SET direction = '$direction' WHERE logon = '$username'");

						$sql = "select x, y from tiles where id = ( select tileid from player where logon = '$username')";
						$movementresult = mysql_query($sql);
						while ($movementrow = mysql_fetch_array($movementresult, MYSQL_ASSOC)) {
							$x = $movementrow["x"];
						        $y = $movementrow["y"];
						if ($row["direction"] == "right") { $xdir = 1; }
						if ($row["direction"] == "left") { $xdir = -1; } 
						if ($row["direction"] == "up") { $ydir = -1; }
						if ($row["direction"] == "down") { $ydir = 1; }
							$sql = "update player set tileid = ( select id from tiles where x = ($x+$xdir) and y = ($y+$ydir)) where logon = '$username'";
							mysql_query($sql);
						}


				}
			echo "}";
		echo ']';
		echo "}";
		mysql_free_result($result);

		$sql = "SELECT pl.id as player_id, logon AS player_logon, tileid, hp, maxhp, tribeid, direction, tl.x, tl.y";
		$sql = $sql . " FROM player as pl INNER JOIN tiles as tl ON pl.tileid = tl.id WHERE logon <> '$username' ";

		$result2 = mysql_query($sql);
		$numrows = mysql_num_rows($result2);
		$i = 0;

		echo ",";
		echo "{otherplayers:";
		echo "[";

			while ($row = mysql_fetch_array($result2, MYSQL_ASSOC)) {
				echo '{';
					echo 'player_id:"' . $row["player_id"] . '",' ;
					echo 'player_logon:"' . $row["player_logon"] . '",' ;
					echo 'tileid:"' . $row["tileid"] . '",';
					echo 'hp:"' . $row["hp"] . '",';
					echo 'maxhp:"' . $row["maxhp"] . '",';
					echo 'tribeid:"' . $row["tribeid"] . '",';
					echo 'direction:"' . $row["direction"] . '",';
					echo 'x:"' . $row["x"] . '",'; 
					echo 'y:"' . $row["y"] . '"'; 
				echo "}";


				$i++;

				if( $numrows <> $i ) {	
					echo ",";
				}
			}
	   	echo "]}"; 

		$sql = "select id, x, y, altitude from tiles where (" .
		"((x >= ($playerx - 10)) and (x <= ($playerx + 10))) and ((y >= ($playery-10)) and (y <= ($playery + 10))) )";

		$result3 = mysql_query($sql);


		echo ",";
		echo "{tiles:";
		echo "[";

		$i = 0;
		$numrows = mysql_num_rows($result3);

		while ($row = mysql_fetch_array($result3, MYSQL_ASSOC)) {
		echo '{';
			echo 'id:' . $row["id"] . ',' ;
			echo 'x:' . $row["x"] . ',' ;
			echo 'y:' . $row["y"] . ',';
			echo 'altitude:' . $row["altitude"];
		echo "}";


		$i++;

		if( $numrows <> $i ) {	
			echo ",";
		}
		}
		echo "]}"; 

	echo "]";
   echo "}";


		
   

	
		
   mysql_free_result($result2);



   
  
}
?>
