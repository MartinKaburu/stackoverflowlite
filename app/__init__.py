'''create flask app
'''

from flask import Flask

APP = Flask(__name__)

from . import views
