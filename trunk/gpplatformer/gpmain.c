#include "gpdef.h"
#include "gpstdlib.h"
#include "gpgraphic.h"

#include "gpstdio.h"
#include "gpfont.h"
#include "gpmm.h"

#include "gpmodplay.h"
#include "modplay.h"
//#include "sonorous.h"


#include "sound.h"

#include "map.h"
//#include "sprites/sky.h"


#include "gpmain.h"
#include "draw.h"
#include "character.h"
#include "gfx.h"
#include "collision.h"
#include "movement.h"
#include "load.h"
#include "ai.h"


short nflip = 0 ;
short frameskip = 0;
GPDRAWSURFACE gpDraw[2] ;

int lastfocus;
int viewx, viewy;
int viewx2, viewy2;

int key, frame, canmove;
int framex, framey;
int gravity;


struct player mario;

int fps;

int anim[] = {1,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};






//thx thunderz
void delay(int ms)
{
   unsigned int ticks;
   ticks=GpTickCountGet();
   while(GpTickCountGet()-ticks<ms);
}

/*	last modification: Ivo Grigull aka Loolarge	May 03.2003*/
int FPS(){
	static int fpsthistick, fpslasttick,tmp_fps,tmp;
	tmp++;

	fpsthistick = GpTickCountGet();
	if((fpsthistick-fpslasttick)>1000) {
		fpslasttick=fpsthistick;
		tmp_fps = tmp;
		tmp = 0;
	return tmp_fps;
	} else return fps;
}




void keyhandler(void)
{

	key = GpKeyGet();


	// if no movement keys are pressed he will remain standing
	mario.ACTION = STANDING;


    if (key&GPC_VK_LEFT){mario.direction = LEFT; mario.frame = (mario.frame + 1)%16; mario.ACTION = WALKING; } 
	if (key&GPC_VK_RIGHT){mario.direction = RIGHT; mario.frame = (mario.frame + 1)%16; mario.ACTION = WALKING; }

	
	if (key&GPC_VK_UP){mario.aim = UP; } else {
		if (key&GPC_VK_DOWN){mario.aim = DOWN; } else {
			mario.aim = NONE;
		}
	}


	if (key&GPC_VK_FB){
		if ( (mario.yspeed < 1 )&&(mario.yspeed > -1) ){  
			mario.ACTION = JUMPING;// very hard to do 
		}
	}

	//if (key&GPC_VK_FL){enemie.shoot = TRUE;}

	if (key&GPC_VK_FA){
		if (mario.alive){

		if( (mario.lastshot + mario.rateoffire) < GpTickCountGet() )
		{
		   mario.shoot = TRUE; 
		   mario.lastshot = GpTickCountGet();
		}
		}

	}

 
	if (key&GPC_VK_SELECT){viewx = -(mario.pos_x - 120) ; viewy = -(mario.pos_y-110); mario.ACTION = RUNNING;}
}




void draw_NRG()
{
	 GpRectFill(NULL, &gpDraw[nflip],0,0, mario.hp, 20, 0x0f); 
}

void game_info()
{
	char action[255];
	char direction[5];
	switch ( mario.ACTION ){
       case JUMPING:  sprintf(action, "JUMPING"); break;
       case WALKING:  sprintf(action, "WALKING"); break;
       case RUNNING:  sprintf(action, "RUNNING"); break;
       case STANDING: sprintf(action, "STANDING"); break;
       case GRIPPING: sprintf(action, "GRIPPING"); break;
	}


	switch ( mario.direction ){
       case LEFT:  sprintf(direction, "LEFT"); break;
       case RIGHT:  sprintf(direction, "RIGHT"); break;
    }

    char status[255];

    //sprintf(status, "EHP:%d", enemie[1].hp);
    //GpTextOut(NULL, &gpDraw[nflip], 0, 20, status, 0xff);
	
}

void draw_gameover()
{
	if (mario.alive == FALSE){
		GpTextOut(NULL, &gpDraw[nflip], 100, 120, "GaMe OvEr", 0xff);
	}
}



void autofocus ()
{

	/*PAGE TURNING FOCUS*/

	if ((lastfocus + 1000) < GpTickCountGet() ){
		viewx = -(mario.pos_x - 120) ;
		viewy = -(mario.pos_y-110);
        // same thing for layer 2 but move all the time and not only when you pass the screen
        viewx2 = -mario.pos_x/10;
	    viewy2 = viewy;//-mario.pos_y/16;

		lastfocus = GpTickCountGet();
	}
}


void mod_play()
{
	MODPlay mp;

    MODPlay_Init ( &mp );
    MODPlay_SetMOD ( &mp, sonorous );
    /* MODPlay_Load ( &mp, "gp:\\gpmm\\mod\\sonorous.mod" );*/
    MODPlay_Start ( &mp );
	MODPlay_SetStereo ( &mp, FALSE );
}



// MAIN LOOP

void GpMain(void *arg)
{	
	
	//engine initialization
	initgp();
	mod_play();
	randseedmenu();	


    // make sure all enemies are dead before creation
	int e;
	for (e = 0; e > 10; e++){
	   enemie[e].alive = FALSE;
	   explosion[e].alive = FALSE;
    }

	load_rects();
	

	nflip = 0;
 


    // game specific initialization
	viewx = viewy = 0;
	mario.frame=0;
    gravity = 5;
	lastfocus = 0;




	
	

	viewx = -(mario.pos_x - 120) ; viewy = -(mario.pos_y-110);


    // main loop
	while(1){

	    keyhandler();
       

		autofocus();


        shoot_bullets();
		shoot_enemie_bullets();

	    move_blocky();
		move_bullets();
		move_enemie_bullets();

	    draw_rects();
	    draw_blocky();
		draw_bullets();
		draw_enemie_bullets();

		move_enemie();
		draw_enemie();

		explosions_anim();
		hero_explosions_anim();



	    
        game_info();
		draw_NRG();


		draw_gameover();




        //swap buffers
        flip();

	    Vsync();
	}
	
	

}
