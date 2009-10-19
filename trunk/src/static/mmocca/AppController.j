/*
 * AppController.j
 * NewApplication
 *
 * Created by You on July 5, 2009.
 * Copyright 2009, Your Company All rights reserved.
 */

@import <Foundation/CPObject.j>
@import "tile.j"

@implementation AppController : CPObject
{
//  CPView _blankTile;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
   /* Create the window */
   var theWindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask],
       contentView = [theWindow contentView];

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
      var screenx = Math.round((x - y) * (tileSize * 0.5)) + xoffset;
      var screeny = Math.round((x + y) * (tileSize * 0.25)) - yoffset;
      
      [_blankTile setFrameOrigin:CGPointMake(screenx,screeny)];

      [_tileArray addObject:_blankTile];
   
      /* add the tile to the window */
      [contentView addSubview:[_tileArray lastObject]];
     }
    }

    [theWindow orderFront:self];
}

@end
