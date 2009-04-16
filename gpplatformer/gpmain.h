#ifndef __gpmain_h__
#define __gpmain_h__

#define NONE 0
#define LEFT 1
#define RIGHT 2

// used for aiming
#define UP 3
#define DOWN 4


#define JUMPING 3
#define WALKING 4
#define RUNNING 5
#define STANDING 6
#define GRIPPING 7
#define FALLING 8

#define TRUE 1
#define FALSE 0


extern short nflip;
extern short frameskip;
extern GPDRAWSURFACE	gpDraw[2] ;

extern int viewx, viewy;
extern int viewx2, viewy2;

extern int key, canmove;
extern struct player mario;
extern struct player enemie[10];
extern int fps;
extern int anim[];

extern int framex, framey;


#define XTILES 100
#define YTILES 100



extern int gravity;


struct rect
{
	int size_x, size_y ;
	int pos_x, pos_y ;
	int type;
};

struct str_effect
{
	int size_x, size_y ;
	int pos_x, pos_y;
	int xspeed, yspeed;
	int type;
	int alive;
	int frame;
	int endframe;
};

struct player {
    // used for collision detection
	int nextx;
	int nexty;

	int xspeed;
	int yspeed;
	int ACTION;
	
	int direction;  // left or right
	int aim; // up or down
	int falling;
	
	
	int shoot;
	struct str_effect bullets[10];
	unsigned long lastshot;
	int currentbullet;
	int rateoffire;
	int bulletpower;
	
	int canmove;


	
	// the current position is stored in sprite
	int frame;

	int size_x, size_y ;
	int pos_x, pos_y ;

	int energy;
    int alive;
	int hp;
};





// Variable used for collision detection
extern struct box {
	int x, y, w, h;
};


void GpMain(void *arg);

#endif /*__gpmain_h__*/