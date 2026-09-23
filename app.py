from flask import Flask, render_template, send_from_directory
app = Flask(__name__)

@app.route('/.well-known/assetlinks.json')
def assetlinks():
    return send_from_directory('.well-known', 'assetlinks.json')

@app.route('/')
def home():
    ... baki tera code ...
