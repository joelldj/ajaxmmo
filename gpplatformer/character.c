#include "gpdef.h"
#include "gpstdlib.h"
#include "gpgraphic.h"

#include "gpstdio.h"
#include "gpfont.h"
#include "gpmm.h"

#include "gpmain.h"
#include "draw.h"
#include "gfx.h"


#include "megaman.h"
#include "runfwd.h"
#include "rundown.h"
#include "runup.h"




void draw_blocky()
{
	int frametodraw;



	/*

	int rowshift;

	if ((mario.aim == DOWN)&&((mario.ACTION == WALKING)||(mario.ACTION == STANDING))){ rowshift = 0 ;} else { rowshift = 100 ;}
	if ((mario.aim == UP)&&((mario.ACTION == WALKING)||(mario.ACTION == STANDING))){ rowshift = 200 ;} else { rowshift = 100 ;}


	framey = anim[mario.frame] / 8;
    framex = anim[mario.frame] % 8;


	if ((mario.aim == UP)&&(mario.ACTION == STANDING)){ framey = 0; framex = 8;}
	if ((mario.aim == DOWN)&&(mario.ACTION == STANDING)){rowshift = 100 ; framey = 1; framex = 8;}



    */

	if (mario.alive == TRUE){

    	switch (mario.aim){
	       case UP: draw_runup(anim[mario.frame]); break;
	       case DOWN: draw_rundown(anim[mario.frame]); break;
	       case NONE: draw_runfwd(anim[mario.frame]); break;
		}
	}




	




}



void draw_runup(int frametodraw)
{
	if ((mario.direction == RIGHT)){


		GpTransBlt(NULL, 
	           &gpDraw[nflip], 
		       mario.pos_x + viewx, mario.pos_y+viewy, 
		       56, 48, 
		       (unsigned char*)runup, 
		       56 * frametodraw, 0, 
		       896, 48,0xe3);

	

	} else {

		GpTransLRBlt(NULL, 
	           &gpDraw[nflip], 
		       mario.pos_x + viewx, mario.pos_y+viewy, 
		       56, 48, 
		       (unsigned char*)runup, 
		       56 * frametodraw, 0, 
		       896, 48,0xe3);
	}
}

void draw_rundown(int frametodraw)
{
	if ((mario.direction == RIGHT)){


		GpTransBlt(NULL, 
	           &gpDraw[nflip], 
		       mario.pos_x + viewx, mario.pos_y+viewy, 
		       56, 48, 
		       (unsigned char*)rundown, 
		       56 * frametodraw, 0, 
		       896, 48,0xe3);

	

	} else {

		GpTransLRBlt(NULL, 
	           &gpDraw[nflip], 
		       mario.pos_x + viewx, mario.pos_y+viewy, 
		       56, 48, 
		       (unsigned char*)rundown, 
		       56 * frametodraw, 0, 
		       896, 48,0xe3);
	}
}

void draw_runfwd(int frametodraw)
{
	if ((mario.direction == RIGHT)){


		GpTransBlt(NULL, 
	           &gpDraw[nflip], 
		       mario.pos_x + viewx, mario.pos_y+viewy, 
		       56, 48, 
		       (unsigned char*)runfwd, 
		       56 * frametodraw, 0, 
		       896, 48,0xe3);

	

	} else {

		GpTransLRBlt(NULL, 
	           &gpDraw[nflip], 
		       mario.pos_x + viewx, mario.pos_y+viewy, 
		       56, 48, 
		       (unsigned char*)runfwd, 
		       56 * frametodraw, 0, 
		       896, 48,0xe3);
	}
}
