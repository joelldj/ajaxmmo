@import <AppKit/CPView.j>

// give it the mouse coordinates and it should give you the worlds position on screen
function getWorldPos(w,x,y){
	var h = w/2; // the tile images should be as high as half width.
	var y_3d = Math.round( ((w*y) - (h*x)) / (w*h) );
	var x_3d = Math.round( ((w*y) + (h*x)) / (w*h) );
	
  return {x:(x_3d-1),y:(y_3d)};	
}

@implementation Tile : CPView
{
  id _delegate;
  int x, y;
}
+ (void)initialize
{
  //alert("initialised");
  blankTile = [[CPImage alloc] initWithContentsOfFile: "Resources/Tiles/blanktile.gif" size: CPSizeMake(40,40)];
  hoveredTile = [[CPImage alloc] initWithContentsOfFile: "Resources/Tiles/hoveredtile.gif" size: CPSizeMake(40,40)];
}
- (id)initWithFrame:(CPRect)frame
{
  self = [super initWithFrame:frame];

  self._DOMElement.style.cursor = "crosshair";

  [self setBackgroundColor:[CPColor colorWithPatternImage:blankTile]];

  return self;
}
- (void)mouseEntered:(CPEvent)anEvent
{
  [self setBackgroundColor:[CPColor colorWithPatternImage:hoveredTile]];
}

- (void)mouseExited:(CPEvent)anEvent
{
  [self setBackgroundColor:[CPColor colorWithPatternImage:blankTile]];
}
@end 
