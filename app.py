from flask import Flask, session
from datetime import timedelta
import os

app = Flask(__name__)

# Ye line sabse important hai - isse 10 min wala issue khatam hoga
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'bharat-420-final-LOVE-you-1940-permanent-key')
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=30)
app.config['SESSION_PERMANENT'] = True

# ... baki tera supabase wala code same rahega
