/*
 * AppController.j
 * NewApplication
 *
 * Created by You on July 5, 2009.
 * Copyright 2009, Your Company All rights reserved.
 */

// give it the mouse coordinates and it should give you the worlds position on screen
function getWorldPos(w,x,y){
	var h = w/2; // the tile images should be as high as half width.
	var y_3d = Math.round( ((w*y) - (h*x)) / (w*h) );
	var x_3d = Math.round( ((w*y) + (h*x)) / (w*h) );
	
  return {x:(x_3d-1),y:(y_3d)};	
}


@import <Foundation/CPObject.j>
@import "tile.j"

@implementation MMOWindow : CPWindow
{

}
- (void)mouseMoved:(CPEvent)event
{
    var xoffset = 850, yoffset = -150;
    //locationPoint = [self convertPoint:[event locationInWindow] fromView:nil];
    worldPos = getWorldPos(40,event.clientX-xoffset, event.clientY+yoffset); 
    console.log(worldPos);
}
@end


@implementation AppController : CPObject
{
//  CPView _blankTile;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
   /* Create the window */
   var theWindow = [[MMOWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask],
       contentView = [theWindow contentView];
   [theWindow setAcceptsMouseMovedEvents:YES];

   /* Set the background color of contentview to black */
   [contentView setBackgroundColor:[CPColor blackColor]]; 

   /* array to put tiles in, size of tile, offset to move the tiles to. */
   _tileArray = [CPMutableArray array];
   tileSize = 40;
   var xoffset = 850, yoffset = -150;

   for (x=0;x<5;x++){
     for (y=0;y<5;y++){
      /* create a Tile object */
      var _blankTile = [[Tile alloc] initWithFrame:CGRectMake(0,0,tileSize,tileSize)];

      /* reposition object */
     
      // return the x and y coordinates of isometrical positions.
      // TODO make this handled by the Tile object
      var screenx = Math.round((x - y) * (tileSize * 0.5)) + xoffset;
      var screeny = Math.round((x + y) * (tileSize * 0.25)) - yoffset;
      
      [_blankTile setFrameOrigin:CGPointMake(screenx,screeny)];

      [_tileArray addObject:_blankTile];
   
      /* add the tile to the window */
      [contentView addSubview:[_tileArray lastObject]];
      //[contentView addSubview:[_tileArray objectAtIndex:1]];
     }
    }

    for (x=0;x<5;x++){
     for (y=0;y<5;y++){
        console.log([_tileArray objectAtIndex:x*y]);
     }
    }

    [theWindow orderFront:self];
}

@end
