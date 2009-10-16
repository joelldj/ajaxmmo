@import <AppKit/CPView.j>

@implementation Tile : CPView
{
  id _delegate;
}
+ (void)initialize
{
  blankTile = [[CPImage alloc] initWithContentsOfFile: "Resources/Tiles/blanktile.gif" size: CPSizeMake(40,40)];
}
- (id)initWithFrame:(CPRect)frame
{
  self = [super initWithFrame:frame];

  self._DOMElement.style.cursor = "pointer";

  [self setBackgroundColor:[CPColor colorWithPatternImage:blankTile]];

  return self;
}

@end 
