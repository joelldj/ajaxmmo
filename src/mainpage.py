import datetime

from models import Tile
from models import Unit

from google.appengine.ext import db
from google.appengine.api import users
from google.appengine.ext import webapp

from google.appengine.api import images

import png
import os

#from django.utils import simplejson

class MainPage(webapp.RequestHandler):
  def get(self):
    head = """<html><head><title>Mainpage</title>"""
    head = head + """<script src="/static/jquery-1.2.6.min.js" type="text/javascript"></script>"""
    head = head + """<script src="/static/default.js" type="text/javascript"></script>"""
    head = head + """<link href="/static/default.css" rel="stylesheet" type="text/css" /></head>"""
    head = head + """<body>"""
    
    self.response.out.write(head)
    
    self.response.out.write("""
          </div>
        </body>
      </html>""")


    
class GetTiles(webapp.RequestHandler):
  def get(self):

    # should get the tiles, within proximity of units.
    # foreach unit, get tiles within range of the unit
    # in this instance limit it to 1 unit only
    units = Unit.gql("where user = :1", users.get_current_user() )

    json = """{"tiles": ["""
    
    firstnode = True   
    
    for unit in units:        
        reader = png.Reader(os.path.join(os.path.dirname(__file__), 'static', 'earth.png') ) # streams are also accepted
        w, h, pixels, metadata = reader.read()
        pixel_byte_width = 4 if metadata['has_alpha'] else 3
        
        fov =  2# fov is how many tiles a unit can see around it
        xleft = max(unit.x - fov, 0)
        xright = min(unit.x + fov + 1, w)
        ytop = max(unit.y - fov, 0)
        ybottom = min(unit.y + fov + 1, h)
        
        for x in range(xleft, xright):
            for y in range(ytop, ybottom):
                
                if firstnode == False:
                    json = json + ","
                
                point = (x, y) # coordinates of pixel to read                

                pixel_position = point[0] + point[1] * w
                
                pixel = pixels[
                  pixel_position * pixel_byte_width :
                  (pixel_position + 1) * pixel_byte_width]
                
                alt = pixel[1]
                
                if alt > 25:
                    tile = "sea"
                    
                if alt > 50:
                    tile = "sand"
                    
                if alt > 75:
                    tile = "dune"
                    
                if alt > 100:
                    tile = "rock"
                    
                if alt > 125:
                    tile = "plain"
                    
                if alt > 150:
                    tile = "savanah"
                    
                if alt > 175:
                    tile = "hill"
                    
                if alt > 200:
                    tile = "cliff"
                    
                if alt > 225:
                    tile = "peak"
                    
                
                json = json + "{"
                json = json + "\"x\":" + str(x) + ","
                json = json + "\"y\":" + str(y) + ","
                json = json + "\"alt\":\"" + str(tile) + "\""
                json = json + "}"
                firstnode = False
        firstnode = False
    json = json + "]}"
            
    self.response.out.write(json)

class GetUnits(webapp.RequestHandler):
    def get(self):
        units = Unit.gql("where user = :1", users.get_current_user() )
        firstnode = True
        
        json = """{"units": ["""
        for unit in units:
            if firstnode == False:
                json = json + ","
            json = json + "{"
            json = json + """"x":""" + str(unit.x) + ","
            json = json + """"y":""" + str(unit.y) + ","
            json = json + """"id":""" + str(unit.key().id()) + ""
            json = json + "}"
            firstnode = False
        json = json + "]}"
            
        self.response.out.write(json)
        
    
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
    
    
class ClickOnTile(webapp.RequestHandler):
  def post(self):
    #find out what has been clicked and do the appropriate action
    
    #if a tile is clicked, move the selected unit towards that tile
    
    #if a unit is clicked then select it
    
    #tile = Tile.get_by_id(int(self.request.get("id"))) #.all()
    #tile.type = 0
    #tile.put()
    
    self.response.out.write("success ")
    
class MenuAction(webapp.RequestHandler):
    def post(selfself):
        # get the name of the clicked menu action
        action = self.request.get("action")
        
        # process the action
        
        