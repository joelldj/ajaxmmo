import datetime
import re

from models import Tile
from models import Unit

from google.appengine.ext import db
from google.appengine.api import users
from google.appengine.ext import webapp

from google.appengine.api import images
from google.appengine.api import urlfetch
from google.appengine.api import memcache

from StringIO import StringIO


import png
import os

import demjson

landheight = 81

def FetchImage(filename):
    pngfile = urlfetch.fetch(url=filename).content
    
    reader = png.Reader(file=StringIO(pngfile)) # streams are also accepted
    w, h, pixels, metadata = reader.read()
    pixel_byte_width =  4 if metadata['has_alpha'] else 3

    return [w, h, pixels, pixel_byte_width] 

def GetHeightAt(x,y,ImageData):

    w,h,pixels, pixel_byte_width = ImageData

    pixel_position = (y * w) + x
    
    pixel = pixels[
      pixel_position * pixel_byte_width :
      (pixel_position + 1) * pixel_byte_width]
    
    return pixel[1]



class MainPage(webapp.RequestHandler):
  def get(self):
    head = """<html><head><title>Mainpage</title>"""
    head = head + """<script src="/static/jquery-1.3.2.min.js" type="text/javascript"></script>"""
    head = head + """<script src="/static/default.js" type="text/javascript"></script>"""
    head = head + """<link href="/static/default.css" rel="stylesheet" type="text/css" />"""
    head = head + """<link href="/static/tiles.css" rel="stylesheet" type="text/css" />"""
    head = head + """</head><body><div id="world" style="position:relative" > <span id="cursor" /> </div> <div id="chatroom" /> <input type=text id="msgbox" />"""
    
    self.response.out.write(head)
    
    self.response.out.write("""
        </body>
      </html>""")


    
class GetTiles(webapp.RequestHandler):
  def get(self):

    map = memcache.get("map")
    HeightMapData = FetchImage("http://humanitymmo.appspot.com/static/earthmini.png")
    w,h = HeightMapData[:2]

    # should get the tiles, within proximity of units.
    # foreach unit, get tiles within range of the unit
    # in this instance limit it to 1 unit only
    unit = Unit.get_by_id( int(self.request.get("id")) )

    json = {"tiles":[],"enemyunits":[]}        

    fov =  2 # fov is how many tiles a unit can see around it
    xleft = max(unit.x - fov, 0)
    xright = min(unit.x + fov + 1, w)
    ytop = max(unit.y - fov, 0)
    ybottom = min(unit.y + fov + 1, h)

    # get heightmap based tiles
    for x in range(xleft, xright):
        for y in range(ytop, ybottom):
          # is the tile in the datastore
          curTile = Tile.gql("where x = :1 and y = :2", x,y)
          if curTile.count() > 0:
              if curTile.type.canTravel:
                 curAlt = 80
              else:
                 curAlt = 81

              json["tiles"].append( {"x":curTile.x,"y":curTile.y,"alt":curAlt} )
          else
              alt = GetHeightAt(x,y,HeightMapData)
              json["tiles"].append( {"x":x, "y":y, "alt":alt } )
              # write to datastore
              t = Tile()
              t.x = x
              t.y = y
              t.height = alt
              
              if alt < 81:
                # get tile type where name = water, then reference it

              else:
                # get tile type for land

              t.put()
          
    self.response.out.write(demjson.encode(json))


class GetUnits(webapp.RequestHandler):
    def get(self):
        units = Unit.gql("where user = :1", users.get_current_user() )

	if units.count() == 0:
	    unit = Unit()
	    unit.x = 20
	    unit.y = 20
	    unit.user = users.get_current_user()
	    unit.put()

        units = Unit.gql("where user = :1", users.get_current_user() )
	    
        json = {"units":[]}
        
        for unit in units:
            json["units"].append( {"x":unit.x, "y":unit.y, "id":unit.key().id(), "owner":unit.user.nickname() } )
            
        self.response.out.write(demjson.encode(json))


class InitTile(webapp.RequestHandler):
  def post(self):
    tile = Tile()
    tile.x = int(self.request.get("x"))
    tile.y = int(self.request.get("y"))
    tile.height = int(self.request.get("height"))
    tile.type = int(self.request.get("type"))
    tile.put()
    
    
class InitUnit(webapp.RequestHandler):
  def post(self):
    unit = Unit()
    unit.x = int(self.request.get("x"))
    unit.y = int(self.request.get("y"))
    unit.user = users.get_current_user()
    unit.put()
    
    
class MoveUnit(webapp.RequestHandler):
  def get(self):
    #move the unit towards the x and y goto positions    
    #xy = re.match('tile(\d+)', self.request.get("tile_id")).groups()
    x_goto = int(self.request.get("x-goto"))
    y_goto = int(self.request.get("y-goto"))
    unitID = int(re.match('unit(\d+)', self.request.get("unitid")).group(1))

    destinationTile = Tile.gql("where x = :1 ans y = :2",x_goto, y_goto);

    if destinationTile.type.canTravel:
       # just select the unit with that id
       unit = Unit.get_by_id(unitID)
    
       if unit.x > x_goto:
          unit.x = unit.x - 1
       elif unit.x < x_goto:
          unit.x = unit.x + 1
       if unit.y > y_goto:    
          unit.y = unit.y - 1
       elif unit.y < y_goto:
          unit.y = unit.y + 1
        
       unit.put()

       self.response.out.write("ok")
    else:   
       self.response.out.write("obstructed")



class MenuAction(webapp.RequestHandler):
    def get(self):
        # get the name of the clicked menu action
        action = self.request.get("action")
        
        # process the action
