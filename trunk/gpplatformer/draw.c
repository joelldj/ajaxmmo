#include "gpdef.h"
#include "gpstdlib.h"
#include "gpgraphic.h"

#include "gpstdio.h"
#include "gpfont.h"
#include "gpmm.h"

#include "gpmain.h"
#include "draw.h"
#include "gfx.h"
#include "load.h"

#include "bgtiles.h"
#include "bg.h"
#include "fire.h"
#include "enemie.h"

#include "movement.h"
#include "ai.h"


#include "explosion.h"
#include "sound.h"


void draw_rects(){	
	struct rect r;
	int setx, sety;
    int i, ii;
	
	
	
	// draw the background tiles
	for (i=0; i<=20; i++){
		for (ii=0; ii<=20; ii++){
	    r = rects2[i][ii];

		   // change rows of the tileset
		   sety = r.type / 32;
		   setx = r.type % 32;

		   if (r.type > 0){


		   /*
	       GpTransBlt(NULL, 
	           &gpDraw[nflip], 
		       (int)(mario.pos_x * -0.5)%320 , r.pos_y, 
		       320, 240, 
		       (unsigned char*)bg, 
		       setx * 16 , sety * 16, 
		       512, 208,0xe3);

		   GpTransBlt(NULL, 
	           &gpDraw[nflip], 
		       (int)(mario.pos_x * -0.5)%320+320 , r.pos_y, 
		       320, 240, 
		       (unsigned char*)bg, 
		       setx * 16 , sety * 16, 
		       512, 208,0xe3);

           */

		   }
		}
	}
	


    GpTransBlt(NULL, 
          &gpDraw[nflip], 
          (int)(mario.pos_x * -0.5)%320 , 0, 
	      320, 240, 
	      (unsigned char*)bg, 
	      0 , 0, 
	      320, 240,0xe3);

	GpTransBlt(NULL, 
	      &gpDraw[nflip], 
	      (int)(mario.pos_x * -0.5)%320+320 , 0, 
	      320, 240, 
	      (unsigned char*)bg, 
	      0 , 0, 
	      320, 240,0xe3);




	

	// draw the foreground tiles
    for (i=0; i<=XTILES; i++){
		for (ii=0; ii<=YTILES; ii++){
	       r = rects1[i][ii];

		   // change rows of the tileset
		   sety = r.type / 32;
		   setx = r.type % 32;




		   if ((r.pos_x - viewx)+480 > 320){
			   if ((r.pos_y - viewy)+360 > 240){
				   if ((r.type != 0)&&(r.type != 125)){

		   GpTransBlt(NULL, 
	           &gpDraw[nflip], 
	           r.pos_x + viewx, r.pos_y + viewy, 
		       16, 16, 
		       (unsigned char*)bgtiles, 
		       setx * 16, sety * 16, 
		       512, 208,0xe3);

				   }
			   }
		   }
		}
	}
		 

	

}


void draw_bullets ()
{
   int i;

   for (i=0; i < 10; i++){
	   if (mario.bullets[i].alive == TRUE){


		   
		   if ((mario.bullets[i].pos_x - viewx)+480 > 320){
			   if ((mario.bullets[i].pos_y - viewy)+360 > 240){

	                GpTransBlt(NULL, 
	                   &gpDraw[nflip], 
		               mario.bullets[i].pos_x+viewx, mario.bullets[i].pos_y+viewy, 
		               24, 24, 
		                (unsigned char*)fire, 
		               0, 0, 
		               24, 24,0xff);
			   }
		   }
	   }
   }
}

void draw_enemie_bullets ()
{
   int i, e;



   for (e=0; e < 10; e++){

   for (i=0; i < 10; i++){
	   if (enemie[e].bullets[i].alive == TRUE){


		   
		   if ((enemie[e].bullets[i].pos_x - viewx)+480 > 320){
			   if ((enemie[e].bullets[i].pos_y - viewy)+360 > 240){

	                GpTransBlt(NULL, 
	                   &gpDraw[nflip], 
		               enemie[e].bullets[i].pos_x+viewx, enemie[e].bullets[i].pos_y+viewy, 
		               24, 24, 
		                (unsigned char*)fire, 
		               0, 0, 
		               24, 24,0xff);
			   }
		   }
	   }
   }
   }
}

void draw_enemie ()
{
   int e;

   for (e = 0; e < 10; e++){



	   if (enemie[e].alive == TRUE){


		   


          if ((enemie[e].direction == LEFT)){

 
	        	GpTransBlt(NULL, 
	                 &gpDraw[nflip], 
	                 enemie[e].pos_x + viewx, enemie[e].pos_y + viewy, 
	    	          36, 44, 
		             (unsigned char*)enemiepic, 
		             0, 0, 
		             36, 44,0xff);
	 
		  } else {


		        GpTransLRBlt(NULL, 
	                 &gpDraw[nflip], 
	                 enemie[e].pos_x + viewx, enemie[e].pos_y + viewy, 
		             36, 44, 
		             (unsigned char*)enemiepic, 
		             0, 0, 
		             36, 44,0xff);
		  }

		  GpRectFill(NULL, &gpDraw[nflip],enemie[e].pos_x + viewx , enemie[e].pos_y + viewy, enemie[e].size_x , 4, 0xff);
		  GpRectFill(NULL, &gpDraw[nflip],enemie[e].pos_x + viewx + 1, enemie[e].pos_y + viewy + 1, enemie[e].hp % enemie[e].size_x + 3, 3, 0x0f);

	  }
   }
}
	 


void explosions_anim()
{
	int e;

	for (e =0; e < 10; e++){


	if (explosion[e].alive == TRUE){

	   explosion[e].frame++;

	   GpTransBlt(NULL, 
	        &gpDraw[nflip], 
	        explosion[e].pos_x + viewx, explosion[e].pos_y + viewy, 
	        48, 48, 
	        (unsigned char*)explosion_pic, 
	        48 * explosion[e].frame, 0, 
	        816, 48,0xe3);
	   }

	if (explosion[e].frame == explosion[e].endframe){ 
		explosion[e].alive = FALSE; 
	}
	}
}

void hero_explosions_anim()
{

	if (heroexplosion.alive == TRUE){

	   heroexplosion.frame++;

	   GpTransBlt(NULL, 
	        &gpDraw[nflip], 
	        heroexplosion.pos_x + viewx, heroexplosion.pos_y + viewy, 
	        48, 48, 
	        (unsigned char*)explosion_pic, 
	        48 * heroexplosion.frame, 0, 
	        816, 48,0xe3);
	   }

	if (heroexplosion.frame == heroexplosion.endframe){ 
		heroexplosion.alive = FALSE; 
		
	}
}

