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
   
$imgwidth = 0;
$imgheight = 0;

$im = imagecreatefrompng("heightmap.png");
$imgwidth = imagesx($im);
$imgheight = imagesy($im);


   for ( $x = 0; $x < $imgwidth; $x++ ){ 

	for ( $y = 0; $y < $imgheight; $y++ ){

		
		$rgb = imagecolorat($im, $x, $y);
		$r = ($rgb >> 16) & 0xFF;
		$g = ($rgb >> 8) & 0xFF;
		$b = $rgb & 0xFF;

		echo $r . " ";

		$sql = "INSERT INTO tiles (x,y,altitude) VALUES ( $x, $y, $r )"; //only r needed as grayscale is assumed
   		$result = mysql_query($sql);
	}

   }

   mysql_free_result($result2);



   
  
}
?>
