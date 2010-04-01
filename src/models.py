from google.appengine.ext import db
from google.appengine.api import users

class TileType(db.Model):
    name = db.StringProperty()
    canTravel = db.BooleanProperty()

class Tile(db.Model):
    x = db.IntegerProperty()
    y = db.IntegerProperty()
    height = db.IntegerProperty()
    type = db.IntegerProperty()

class Faction(db.Model): # spain, france...
    name = db.StringProperty()

class Dock(db.Model):
    location = db.ReferenceProperty(Tile)
    faction = db.ReferenceProperty(Faction) # ie. ships must be neutral

class AggresivityType(db.Model):
    name = db.StringProperty()

class Unit(db.Model):
    x = db.IntegerProperty()
    y = db.IntegerProperty()
    user = db.UserProperty()
    faction = db.ReferenceProperty(Faction) # spain, france...
    dock = db.ReferenceProperty(Dock) # can be none
    aggresivity = db.ReferenceProperty(AggresivityType)

class ChatMessage(db.Model):
    text = db.StringProperty()
    unitfrom = db.ReferenceProperty(Unit, required=True, collection_name="unitfrom")
    unitto = db.ReferenceProperty(Unit, required=False, collection_name="unitto")
    messagetime = db.DateTimeProperty(auto_now=True)
    
