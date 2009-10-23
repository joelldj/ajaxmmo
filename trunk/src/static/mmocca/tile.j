@import <AppKit/CPView.j>

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
