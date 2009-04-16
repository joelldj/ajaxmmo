#include "gpdef.h"
#include "gpstdlib.h"
#include "gpgraphic.h"

#include "gpstdio.h"
#include "gpfont.h"
#include "gpmm.h"




#include "map.h"
#include "sprites/sky.h"


#include "gpmain.h"
#include "draw.h"
#include "character.h"
#include "gfx.h"
#include "collision.h"
#include "movement.h"
#include "load.h"

#include "sound.h"


struct player enemie[10];
int i, ii;
//int currentenemiebullet;


void move_enemie()
{
	int currentenemie;

	for ( currentenemie = 0; currentenemie < 10; currentenemie++ ){


	if (enemie[currentenemie].alive == TRUE){

	   /* //
	      // Do the enemie scipting
	      // */
	   enemie_script(currentenemie);


	   /*///////////////////////////////////////////////
	     //                                           //
	     //  DO NOT CHANGE WHATS BELOW FOR SCRIPTING  //
		 //                                           //
		 //THIS IS FOR BOT AUTOMATION AND PHYSICS ONLY//       
		 //                                           //
	     ///////////////////////////////////////////////*/
	

  	   if (enemie[currentenemie].direction == LEFT) {enemie[currentenemie].xspeed = -enemie[currentenemie].energy/10;}
   	   if (enemie[currentenemie].direction == RIGHT) {enemie[currentenemie].xspeed = enemie[currentenemie].energy/10;}

	   // set movement to yes and set next position
       enemie[currentenemie].canmove = TRUE;
	   enemie[currentenemie].nextx += enemie[currentenemie].xspeed;
	   enemie[currentenemie].nexty += enemie[currentenemie].yspeed;

	   // Gravity
	   enemie[currentenemie].yspeed += gravity;

	   // Move LEFT | RIGHT
	   if (enemie[currentenemie].direction == LEFT) {enemie[currentenemie].xspeed=-5;}
	   if (enemie[currentenemie].direction == RIGHT) {enemie[currentenemie].xspeed=5;}

	    /* // 
	      // CHECK collisions after calculating posible new position
	      // */
       enemie_collisions(currentenemie);


	   // stop if the next position collides
	   if (enemie[currentenemie].canmove){ enemie[currentenemie].pos_x = enemie[currentenemie].nextx; enemie[currentenemie].pos_y = enemie[currentenemie].nexty;
	   } else { enemie[currentenemie].yspeed = 0; }

	   // stop moving
	   // current position is next position
	   enemie[currentenemie].nextx = enemie[currentenemie].pos_x;
	   enemie[currentenemie].nexty = enemie[currentenemie].pos_y;





	   if (enemie[currentenemie].hp<0){
		   enemie[currentenemie].alive = FALSE; 
		   explosions_start(currentenemie);
		   GpPcmRemove((unsigned short*)boom);
		   GpPcmPlay((unsigned short*)boom,sizeof(boom),0);
	   } 

	}
	}
}



void enemie_script(int e)
{

	/*/////////////////////////////////////////////////////////////////////////
	  //                                                                     //  
	  // The scripting bit                                                   //
	  //                                                                     //
	  // Only write to ACTION and only READ the various positions of the bots//
	  //                                                                     //
	  /////////////////////////////////////////////////////////////////////////*/

	if ((abs(mario.pos_x - enemie[e].pos_x)) >= 50){ 
		if (mario.pos_x > enemie[e].pos_x) { enemie[e].direction = LEFT ;} else { enemie[e].direction = RIGHT ;}
	} else { enemie[e].direction = NONE ;}

	if ((abs(mario.pos_x - enemie[e].pos_x)) <= 50){ 
	    if (mario.pos_x > enemie[e].pos_x) { enemie[e].direction = RIGHT ;} else { enemie[e].direction = LEFT ;}
	} else { enemie[e].direction = NONE ;}


	// Rate of fire
	if (mario.alive == TRUE){
	if ((enemie[e].lastshot + enemie[e].rateoffire) < GpTickCountGet()){
	    
		if((abs(mario.pos_x - enemie[e].pos_x))<200){ enemie[e].shoot = TRUE;}

		enemie[e].lastshot = GpTickCountGet();

	}
	}

}


void enemie_collisions(int e)
{

	// Collision
    for ( i=0; i<XTILES; i++){
		for ( ii=0; ii<YTILES; ii++){
			if ( rects1[i][ii].type > 0 ){
		       if ( testsquares( rects1[i][ii], enemie[e] ) == 1 ) { enemie[e].canmove = 0;} 
			}
		}
	}

	
    // Collision with the bullets
    for ( i=0; i<10; i++){
		   if ( bullettest( mario.bullets[i], enemie[e] ) ) { enemie[e].hp = enemie[e].hp - mario.bulletpower ; mario.bullets[i].alive = FALSE;} // take enemie energy if hit by a bullet
	}
}


void move_enemie_bullets()
{
	int i,e;

	for (e = 0; e < 10; e++){

	   // Flame thrower style shooting
	   for ( i = 0; i < 10; i++){
        	enemie[e].bullets[i].pos_x += enemie[e].bullets[i].xspeed;  // + (gravity * (GpRand()%5));
	        enemie[e].bullets[i].pos_y += enemie[e].bullets[i].yspeed;  //  the rand bit makes it like a flame thrower		
		    //enemie.bullets[currentenemiebullet].yspeed += gravity;
	   }
	// Other shooting
	}
}

void shoot_enemie_bullets()
{

	int e;

	for (e = 0; e < 10; e++){

	   enemie[e].currentbullet = (enemie[e].currentbullet + 1)%9;

	   if (enemie[e].shoot){
	      enemie[e].bullets[enemie[e].currentbullet].size_x = 10;
	      enemie[e].bullets[enemie[e].currentbullet].size_y = 10;
	      enemie[e].bullets[enemie[e].currentbullet].pos_x = enemie[e].pos_x;
	      enemie[e].bullets[enemie[e].currentbullet].pos_y = enemie[e].pos_y;
	      enemie[e].bullets[enemie[e].currentbullet].alive = TRUE;

	       // (gravity * (GpRand()%5)); // like an ak
	      enemie[e].bullets[enemie[e].currentbullet].xspeed += GpRand()%5; // plus random initial speed
	   
	      enemie[e].bullets[enemie[e].currentbullet].xspeed = (int) -((enemie[e].pos_x - mario.pos_x )/5);
	      enemie[e].bullets[enemie[e].currentbullet].yspeed = (int) -((enemie[e].pos_y - mario.pos_y )/5);


	      enemie[e].shoot = FALSE;


          GpPcmRemove((unsigned short*)gunshot);
		  GpPcmPlay((unsigned short*)gunshot,sizeof(gunshot),0);

	   }
	}
}