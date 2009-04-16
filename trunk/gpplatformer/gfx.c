#include "gpdef.h"
#include "gpstdlib.h"
#include "gpgraphic.h"

#include "gpstdio.h"
#include "gpfont.h"
#include "gpmm.h"

#include "sound.h"


#include "title.h"
#include "gfx.h"
#include "gpmain.h"
#include "map.h"

#include "bgtiles.h"



void initgp(void)
{
	//GpClockSpeedChange(80000000, 0x48012, 1);
	//GpClockSpeedChange(132000000, 0x24001, 2);


	GpFatInit() ;
	GpKeyInit() ;
	GpPcmInit(PCM_M22,PCM_16BIT);
	GpGraphicModeSet(8,NULL) ;
	GpLcdSurfaceGet(&gpDraw[0],0) ;
	GpLcdSurfaceGet(&gpDraw[1],1) ;
	GpLcdEnable() ;

}


// swap buffers
void flip(void)
{
	// Flip the buffer
	GpSurfaceFlip(&gpDraw[nflip]);
	nflip ^= 1;
}


void randseedmenu()
{
   GpBitBlt(NULL, &gpDraw[nflip], 0, 0, 320, 240,
       (unsigned char*)titlepic, 
	   0, 0, 320, 240);

	while (!(GpKeyGet()==GPC_VK_START)){}

    GpSrand(GpTickCountGet()%36547);
}



// Thanks toris
void Vsync()
{
 	volatile long *lcdcon1 = (long *)0x14a00000;
 	int current_line;
 	#define VLINE (*lcdcon1>>18)&0x1ff
 	current_line=VLINE; while(current_line==VLINE);
}
