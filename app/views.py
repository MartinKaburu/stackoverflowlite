'''Module to render pages
'''
import os

from flask import render_template, redirect, url_for, send_from_directory
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


@APP.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(APP.root_path, 'static'),
                          'favicon.ico',mimetype='image/vnd.microsoft.icon')
