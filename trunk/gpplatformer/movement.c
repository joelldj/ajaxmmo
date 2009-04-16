#include "gpdef.h"
#include "gpstdlib.h"
#include "gpgraphic.h"
#include "gpstdio.h"
#include "gpfont.h"
#include "gpmm.h"


#include "map.h"
//#include "sprites/sky.h"


#include "gpmain.h"
#include "draw.h"
#include "character.h"
#include "gfx.h"
#include "collision.h"
#include "movement.h"
#include "load.h"
#include "sound.h"

struct str_effect bullets[10];
struct str_effect explosion[10];
struct str_effect heroexplosion;

int currentbullet;

int mariocanmove;




void move_blocky()
{


	if (mario.alive == TRUE){

	
	   // stop movement if STANDING
	   if (mario.ACTION == STANDING){
	    	mario.xspeed = 0;
	   }
	   // JUMP and empty energy bar
	   if (mario.ACTION == JUMPING){ 
	   	    mario.yspeed = -20; 
	   }
	   // run fast and empty energy bar if RUNNING
	   if (mario.ACTION == RUNNING){
	    	if (mario.direction == LEFT) {mario.xspeed = -30;}
	    	if (mario.direction == RIGHT) {mario.xspeed = 30;}
	   } 


	   // set movement to yes and set next position
       mariocanmove = 1;
	   mario.nextx += mario.xspeed;
	   mario.nexty += mario.yspeed;

	   // Gravity
	   mario.yspeed += gravity;


	   // Move LEFT | RIGHT
	   if ((mario.direction == LEFT)&&(mario.ACTION == WALKING)) {mario.xspeed=-15;}
	   if ((mario.direction == RIGHT)&&(mario.ACTION == WALKING)) {mario.xspeed=15;}

	


	   hero_collision();
	


	
	   // stop if the next position collides
	   if (mariocanmove){ mario.pos_x = mario.nextx; mario.pos_y = mario.nexty;
	   } else { 
	    	mario.yspeed = 0; 
	        // current next position is current position (stop)
	        mario.nextx = mario.pos_x;
	        mario.nexty = mario.pos_y;
	   }

	   if (mario.hp<0){ 
		   mario.alive = FALSE; 
	       hero_explosions_start();
		   GpPcmRemove((unsigned short*)boom);
		   GpPcmPlay((unsigned short*)boom,sizeof(boom),0);
	   }


	}
}


void hero_collision()
{

	int i, ii;


	// Collision with the tiles
    for ( i=0; i<XTILES; i++){
		for ( ii=0; ii<YTILES; ii++){
			if ( rects1[i][ii].type > 0 ){
		       if ( testsquares( rects1[i][ii], mario ) == 1 ) {
				   mariocanmove = 0;


				   /* check which teleport touched and move to paired
				      landing zone */
				   if (rects1[i][ii].type == 13){
                       /*check if landing zone exists*/
					   if ( landingzone[1].type == 1){
						   mario.pos_x = landingzone[1].pos_x; mario.pos_y = landingzone[1].pos_y;
					   }
				   }
			   } 
			}
		}
	}



	int e;

	for ( e = 0; e < 10; e++ ){
	// Collision with the bullets
    for ( i=0; i<10; i++){
		   if ( bullettest( enemie[e].bullets[i], mario ) ) { mario.hp = mario.hp - enemie[e].bulletpower ; enemie[e].bullets[i].alive = FALSE;} // take enemie energy if hit by a bullet
	}
	}

}


void move_bullets()
{
	int i;

	// Flame thrower style shooting
	for ( i = 0; i < 10; i++){
    	mario.bullets[i].pos_x += mario.bullets[i].xspeed;  // + (gravity * (GpRand()%5));
	    mario.bullets[i].pos_y += mario.bullets[i].yspeed;  //  the rand bit makes it like a flame thrower		
	}
	// Other shooting
}

void shoot_bullets()
{
	currentbullet = (currentbullet + 1)%9;

	if (mario.shoot){
	   mario.bullets[currentbullet].size_x = 10;
	   mario.bullets[currentbullet].size_y = 10;

       // Default Position
	   mario.bullets[currentbullet].pos_x = mario.pos_x;
	   mario.bullets[currentbullet].pos_y = mario.pos_y - 10;

	   // Move a bit if left or right
       if (mario.direction == LEFT){
	      mario.bullets[currentbullet].pos_x = mario.pos_x;
	      mario.bullets[currentbullet].pos_y = mario.pos_y;
	   }

	   
       if (mario.direction == RIGHT){
	      mario.bullets[currentbullet].pos_x = mario.pos_x + 15;
	      mario.bullets[currentbullet].pos_y = mario.pos_y;
	   }


	   mario.bullets[currentbullet].alive = TRUE;

	   if (mario.direction==RIGHT){ mario.bullets[currentbullet].xspeed = 15; mario.bullets[currentbullet].yspeed = 0;}
	   if (mario.direction==LEFT){ mario.bullets[currentbullet].xspeed = -15; mario.bullets[currentbullet].yspeed = 0;} 
	   if ((mario.direction==LEFT)&&(mario.aim == UP)) { mario.bullets[currentbullet].xspeed = -15; mario.bullets[currentbullet].yspeed = -30; } 
	   if ((mario.direction==LEFT)&&(mario.aim == DOWN)){ mario.bullets[currentbullet].xspeed = -15; mario.bullets[currentbullet].yspeed = 30;} 
	   if ((mario.direction==RIGHT)&&(mario.aim == UP)){ mario.bullets[currentbullet].xspeed = 15; mario.bullets[currentbullet].yspeed = -30;} 
	   if ((mario.direction==RIGHT)&&(mario.aim == DOWN)){ mario.bullets[currentbullet].xspeed = 15; mario.bullets[currentbullet].yspeed = 30;} 
	   if ((mario.aim == UP)&&(mario.ACTION == STANDING)){ mario.bullets[currentbullet].xspeed = 0; mario.bullets[currentbullet].yspeed = -30; }
	   if ((mario.aim == DOWN)&&(mario.ACTION == STANDING)){ mario.bullets[currentbullet].xspeed = 0; mario.bullets[currentbullet].yspeed = 30; }

	   //mario.bullets[currentbullet].yspeed += gravity; // (gravity * (GpRand()%5)); // like an ak
	   //mario.bullets[currentbullet].xspeed += GpRand()%5; // plus random initial speed


	   GpPcmRemove((unsigned short*)gunshot);
	   GpPcmPlay((unsigned short*)gunshot,sizeof(gunshot),0);

	   mario.shoot = FALSE;
	}
}



void explosions_start(int e)
{
	explosion[e].pos_x = enemie[e].pos_x;
	explosion[e].pos_y = enemie[e].pos_y;
	explosion[e].alive = TRUE;
	explosion[e].frame = 0;
	explosion[e].endframe = 16;
}

void hero_explosions_start()
{
	heroexplosion.pos_x = mario.pos_x;
	heroexplosion.pos_y = mario.pos_y;
	heroexplosion.alive = TRUE;
	heroexplosion.frame = 0;
	heroexplosion.endframe = 16;
}