#!/usr/bin/env python

import cgi
import datetime
import wsgiref.handlers

from mainpage import MainPage
from mainpage import GetTiles
from mainpage import GetUnits
from mainpage import InitUnit
from mainpage import InitTile
from mainpage import ClickOnTile

from chat import UnitMessages

from google.appengine.ext import db
from google.appengine.api import users
from google.appengine.ext import webapp
        
application = webapp.WSGIApplication([
  ('/', MainPage),
  ('/tile', GetTiles),
  ('/unit', GetUnits),
  ('/inittile', InitTile),
  ('/click', ClickOnTile),
  ('/chat', UnitMessages)
], debug=False)


def main():
  wsgiref.handlers.CGIHandler().run(application)
  

if __name__ == '__main__':
  main()
