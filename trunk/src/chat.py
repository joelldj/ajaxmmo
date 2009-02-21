import datetime
from models import Unit

from google.appengine.ext import db
from google.appengine.api import users
from google.appengine.ext import webapp

from models import ChatMessage

""" This will handle both the post (for writing messages) and get (for reading messages) """
class UnitMessages(webapp.RequestHandler):
    def get(self):
        # http://code.google.com/appengine/docs/memcache/usingmemcache.html
        """ fill memcache with the last 10 messages """
        
        """ return the oldest unread message from memcache """
        # return msg, to, from, time in json format
        
        """ mark the message as read """
        
    def post(self):
        req = self.request
        
        msg = ChatMessage()
        msg.text = req("text")
        msg.unitfrom = Unit.get_by_id(req("fromid"))
        msg.unitto = Unit.get_by_id(req("toid"))
        msg.put()
