#!/usr/bin/env python

import cgi
import datetime
import wsgiref.handlers

from mainpage import GetTiles
from mainpage import GetUnits
from mainpage import InitUnit
from mainpage import ClickOnTile

from google.appengine.ext import db
from google.appengine.api import users
from google.appengine.ext import webapp
        
application = webapp.WSGIApplication([
  ('/tile', GetTiles),
  ('/unit', GetUnits),
  ('/initunit', InitUnit),
  ('/click', ClickOnTile)
], debug=False)


def main():
  wsgiref.handlers.CGIHandler().run(application)
  

if __name__ == '__main__':
  main()
