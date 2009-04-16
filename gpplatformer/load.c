#include "gpdef.h"
#include "gpstdlib.h"
#include "gpgraphic.h"

#include "gpstdio.h"
#include "gpfont.h"
#include "gpmm.h"




#include "map.h"

#include "gpmain.h"
#include "collision.h"
#include "ai.h"

struct rect rects1[100][100];
struct rect rects2[100][100];

struct rect landingzone[10];



void load_rects(){
	int x, y;


	// clear all the rects
	for (x=0; x<=XTILES; x++){
		for (y=0; y<=YTILES; y++){
		   rects1[x][y].pos_x = 0;
		   rects1[x][y].pos_y = 0;
		   rects1[x][y].size_x = 0;
		   rects1[x][y].size_y = 0;
		   rects1[x][y].type = 0;
		}
	}

	for (x=0; x<=XTILES; x++){
		for (y=0; y<=YTILES; y++){
		   rects2[x][y].pos_x = 0;
		   rects2[x][y].pos_y = 0;
		   rects2[x][y].size_x = 0;
		   rects2[x][y].size_y = 0;
		   rects2[x][y].type = 0;
		}
	}


	/* set landing zones to null*/
	for (x=0; x<10;x++){
		landingzone[x].pos_x = x *16;
		landingzone[x].pos_y = y *16;
		landingzone[x].size_x = 16;
		landingzone[x].type = 1;
	}






    // load the rects from the map data
	int type;
	int e;
	type = 0;
	e = 0;

	for (x=0; x<=XTILES; x++){
		for (y=0; y<=YTILES; y++){
			   type = map1[y][x];
			   if (type == 2) { 
				   type = 0; 
				   mario.pos_x = x * 16;  
				   mario.pos_y = y * 16; 
				   mario.nextx = mario.pos_x;
				   mario.nexty = mario.pos_y;	
				   mario.hp = 320;
				   mario.rateoffire = 500;
				   mario.direction = LEFT;
	               mario.shoot = FALSE;
	               mario.alive = TRUE;
				   mario.size_x = 60;
	               mario.size_y = 52;
				   mario.bulletpower = 15;
			   } 
			   if (type == 3) { 
				   type = 0; 
				   enemie[e].pos_x = x * 16;  
				   enemie[e].pos_y = y * 16;
				   enemie[e].nextx = enemie[e].pos_x;
				   enemie[e].nexty = enemie[e].pos_y;
				   enemie[e].alive = TRUE;
				   enemie[e].size_x = 36;
				   enemie[e].size_y = 44;
				   enemie[e].hp = 30;
				   enemie[e].rateoffire = 2000;
				   enemie[e].bulletpower = 5;


				   e++;
			   }

			   /* set a landing zone if aproprite tile has been found */
			   if (type == 14) { 
				   landingzone[1].pos_x = x *16;
				   landingzone[1].pos_y = y *16;
				   landingzone[1].size_x = 16;
				   landingzone[1].type = 1;

			   }  /* set landing zone */
			   //if (type == 14) { type = 0;}    /*  */

			   

			   rects1[x][y].pos_x = x * 16;
			   rects1[x][y].pos_y = y * 16;
			   rects1[x][y].size_x = 16;
			   rects1[x][y].size_y = 16;
			   rects1[x][y].type = type;
		}
	}


	/*
	for (x=0; x<=20; x++){
		for (y=0; y<=20; y++){
			   type = map2[y][x];
			   //if (type == 4) { type = 0; mario.pos_x = x * 16;  mario.pos_y = y * 16;} 
			   //if (type == 8) { type = 0; enemie.pos_x = x * 16;  enemie.pos_y = y * 16;}
			   //if (type == 125) { type = 0;}
		


			   rects2[x][y].pos_x = x * 16;
			   rects2[x][y].pos_y = y * 16;
			   rects2[x][y].size_x = 16;
			   rects2[x][y].size_y = 16;
			   rects2[x][y].type = type;
		}
	}
	*/


}


