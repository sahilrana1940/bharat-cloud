from flask import Flask, send_from_directory
import os

app = Flask(_name_)

@app.route('/.well-known/assetlinks.json')
def assetlinks():
    try:
        directory = os.path.join(os.getcwd(), '.well-known')
        return send_from_directory(directory, 'assetlinks.json', mimetype='application/json')
    except Exception as e:
        return str(e), 500

@app.route('/')
def home():
    return "<h1>Bharat Cloud is Live</h1><p><a href='/.well-known/assetlinks.json'>Check assetlinks</a></p>"

if _name_ == '_main_':
    app.run()
