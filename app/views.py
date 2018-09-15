'''Module to render pages
'''
from flask import render_template
from flask_jwt import jwt_required

from . import APP


@APP.route('/home')
def index():
    '''Render the home page
    '''
    return render_template('index.html')


@APP.route('/profile')
def profile():
    '''render the profile page
    '''
    return render_template('profile.html')


@APP.route('/auth')
def get_started():
    '''render the login/signup page
    '''
    return render_template('login.html')

@APP.route('/')
def getting_started():
    '''render the login/signup page
    '''
    return redirect(url_for('get_started'))
