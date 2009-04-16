#include "gpdef.h"
#include "gpstdlib.h"
#include "gpgraphic.h"

#include "gpstdio.h"
#include "gpfont.h"
#include "gpmm.h"





#include "map.h"

#include "gpmain.h"
#include "draw.h"
#include "character.h"
#include "gfx.h"
#include "bgtiles.h"

#include "movement.h"


// COLLISION


int testsquares ( struct rect a, struct player b)
{
	struct box b1, b2;

	b1.x = a.pos_x;
	b1.y = a.pos_y;
	b1.h = a.size_y;
	b1.w = a.size_x;

	b2.x = b.nextx;
	b2.y = b.nexty;
	b2.h = b.size_y;
	b2.w = b.size_x;

	//if (testbox ( b1, b2 )) {
	//return testpix(b1, b2, anim[mario.frame], a.type);
	//}

	return testbox( b1, b2 );

	return 0;
}

int bullettest ( struct str_effect a, struct player b)
{
	struct box b1, b2;

	b1.x = a.pos_x;
	b1.y = a.pos_y;
	b1.h = a.size_y;
	b1.w = a.size_x;

	b2.x = b.nextx;
	b2.y = b.nexty;
	b2.h = b.size_y;
	b2.w = b.size_x;

	return testbox( b1, b2 );

	return 0;
}

int testbelow ( struct rect a, struct player b, int gravity )
{
	struct box b1, b2;

	b1.x = a.pos_x;
	b1.y = a.pos_y - gravity;
	b1.h = a.size_y;
	b1.w = a.size_x;

	b2.x = b.nextx;
	b2.y = b.nexty;
	b2.h = b.size_y;
	b2.w = b.size_x;

	return testbox ( b1, b2 );
}


int testbox ( struct box a, struct box b )
{
	int vcol, hcol;

	vcol = hcol = 0;

	if(((a.x + a.w) >= b.x ) && ( (a.x + a.w) <= b.x + b.w )) vcol = 1;
	if(((b.x + b.w) >= a.x ) && ( (b.x + b.w) <= a.x + a.w ))	vcol = 1; 
    if(((a.y + a.h) >= b.y ) && ( (a.y + a.h) <= b.y + b.h )) hcol = 1;
	if(((b.y + b.h) >= a.y ) && ( (b.y + b.h) <= a.y + a.h )) hcol = 1;

    if(((a.x) >= b.x ) && ( (a.x) <= b.x + b.w )) vcol = 1;
	if(((b.x) >= a.x ) && ( (b.x) <= a.x + a.w ))	vcol = 1; 
    if(((a.y) >= b.y ) && ( (a.y) <= b.y + b.h )) hcol = 1;
	if(((b.y) >= a.y ) && ( (b.y) <= a.y + a.h )) hcol = 1;

	if (vcol&&hcol) return 1;

	return 0;
}



/* BROKEN */
int testpix(struct box a, struct box b, int frame, int tile)
{
	/*


	 if ( a.x1 < b.x1 ) 
         overl.x1 = b.x1; 
     else 
         overl.x1 = a.x1; 
         
     if ( a.x2 > b.x2 ) 
         overl.x2 = b.x2; 
     else 
         overl.x2 = a.x2; 
          
     if ( a.y1 < b.y1 ) 
         overl.y1 = b.y1; 
     else 
         overl.y1 = a.y1; 
	 
     if ( a.y2 > b.y2 ) 
         overl.y2 = b.y2; 
     else 
         overl.y2 = a.y2;


	
     for ( y = 0; y < (overl.y2-overl.y1); y++ ) 
     { 
           //scnla = uglDCAccess[0]( spritea, strya+y ); 
           //scnlb = uglDCAccess[1]( spriteb, stryb+y ); 
           //scnla) += strxa; 
           //scnlb) += strxb; 
                 
          // for ( x = 0; x < (overl.x2-overl.x1); x++ ) 
            //   if ( ((scnla)[x] != 0xe3) &&  
               //scnlb[x] != UGL_BPINK8) ) 
               //return true; 
     }        
      
		*/
	


	return 0;
}