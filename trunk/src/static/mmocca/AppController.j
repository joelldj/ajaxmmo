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
  CPView _blankTile;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
    /* Create the window */
    var theWindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask],
        contentView = [theWindow contentView];

    /* Set the background color of contentview to black */
    [contentView setBackgroundColor:[CPColor blackColor]]; 

    /* create a Tile object */
    _blankTile = [[Tile alloc] initWithFrame:CGRectMake(0,0,40,40)];

    /* reposition object */
    [_blankTile setFrameOrigin:CGPointMake(40,40)];

    /* add the tile to the window */
    [contentView addSubview:_blankTile];
    [theWindow orderFront:self];
}

@end
