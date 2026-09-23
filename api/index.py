from flask import Flask, send_from_directory
import os

app = Flask(_name_)

@app.route('/.well-known/assetlinks.json')
def assetlinks():
    root_dir = os.path.dirname(os.path.dirname(_file_))
    well_known_dir = os.path.join(root_dir, '.well-known')
    return send_from_directory(well_known_dir, 'assetlinks.json', mimetype='application/json')

@app.route('/')
def home():
    return "<h1>Bharat Cloud Live Hai ✅</h1><p><a href='/.well-known/assetlinks.json'>Assetlinks Check Karo</a></p>"

# Vercel ke liye ye line bahut zaruri hai
app = app
