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
    ImageData = FetchImage("http://humanitymmo.appspot.com/static/earthmini.png")
    w,h = ImageData[:2]

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
    
    for x in range(xleft, xright):
        for y in range(ytop, ybottom):
            
	    alt = GetHeightAt(x,y,ImageData)
        
            json["tiles"].append( {"x":x, "y":y, "alt":alt } )
		
	    enemyunits = Unit.gql("where x = :1 and y = :2", x, y)
		
	    for enemyunit in enemyunits:
                if enemyunit.user.nickname() != users.get_current_user().nickname():
                    json["enemyunits"].append( {"x":x, "y":y, "id":enemyunit.key().id(), "owner":enemyunit.user.nickname() } )

			
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
    #xy = re.match('tile(\d+)-(\d+)', self.request.get("tile_id")).groups()
    x_goto = self.request.get("x_goto")
    y_goto = self.request.get("y_goto")
    unitID = self.request.get("unitid")
    
    # just select one unit belonging to user with that id
    units = Unit.gql("where user = :1 and key.id = :2", users.get_current_user() , unitID )
    
    #move units
    for unit in units:
        
        if unit.x > x_goto:
            unit.x = unit.x - 1
        elif unit.x < x_goto:
            unit.x = unit.x + 1
        
        if unit.y > y_goto:    
            unit.y = unit.y - 1
        elif unit.y < y_goto:
            unit.y = unit.y + 1
            
        unit.put()
         
    
    """
    # no longer return a string of units, this will be handled by the game cycle
    
    units = Unit.gql("where user = :1", users.get_current_user() )    
    
    
    # send units back to the client.
    json = {"units":[]}
    
    for unit in units:
        json["units"].append( {"x":unit.x, "y":unit.y, "id":unit.key().id() } )
        
    self.response.out.write(demjson.encode(json))
    """
    
    self.response.out.write("ok")



class MenuAction(webapp.RequestHandler):
    def get(self):
        # get the name of the clicked menu action
        action = self.request.get("action")
        
        # process the action
