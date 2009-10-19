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

   _tileArray = [CPMutableArray array];
   for (x=0;x<10;x++){
     for (y=0;y<10;y++){
      /* create a Tile object */
      var _blankTile = [[Tile alloc] init];
      [_blankTile setBounds:CGRectMake(0,0,40,40)];

      /* reposition object */
      [_blankTile setFrameOrigin:CGPointMake(5*x,5*y)];

      [_tileArray addObject:_blankTile];
   
      /* add the tile to the window */
      [contentView addSubview:[_tileArray lastObject]];
      console.log("x: " + x*5 + " y:" + y*5);
     }
    }

    [theWindow orderFront:self];
}

@end
