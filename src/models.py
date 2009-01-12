from google.appengine.ext import db
from google.appengine.api import users

class Tile(db.Model):
    x = db.IntegerProperty()
    y = db.IntegerProperty()
    height = db.IntegerProperty()
    type = db.IntegerProperty()

class Unit(db.Model):
    x = db.IntegerProperty()
    y = db.IntegerProperty()
    user = db.UserProperty()
    
class Message(db.Model):
    text = db.StringProperty()
    unitfrom = db.ReferenceProperty(Unit)
    unitto = db.ReferenceProperty(unit)
    messagetime = db.DateTimeProperty(auto_now=True)
    
