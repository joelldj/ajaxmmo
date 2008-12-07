<?php

// tilefill By: OscarMedina

    $image = imageCreateFromGIF ('tile.gif'); // transparent GIF

	$cara = imageColorAllocate ($image, hexdec($color{0}.$color{1}), hexdec($color{2}.$color{3}), hexdec($color{4}.$color{5}));
	
	imagefill($image, 20, 10, $cara); //Cara Superior
	imagefill($image, 9, 23, $cara); //Cara Frontal

	imagecolorset($image, 0, (hexdec(($color{0}.$color{1}))-40), (hexdec(($color{2}.$color{3}))-42), (hexdec(($color{4}.$color{5}))-44)); //Borde
	
    Header("Content-type: image/gif");
    imageGIF ($image);

    imagedestroy ($image);
    
?>
