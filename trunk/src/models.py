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