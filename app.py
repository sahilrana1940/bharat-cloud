from flask import Flask, session, request, redirect, render_template
from datetime import timedelta
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'bharat-420-final-LOVE-you-1940-permanent-key')
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=30)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username == "admin" and password == "rani@420":
            session.permanent = True
            session['logged_in'] = True
            return redirect('/dashboard')
            
    return render_template('login.html')
