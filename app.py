from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify
import os

app = Flask(__name__)

# --- Ye wala naya route hai jo Not Found fix karega ---
@app.route('/.well-known/assetlinks.json')
def assetlinks():
    return send_from_directory(
        os.path.join(app.root_path, '.well-known'), 
        'assetlinks.json',
        mimetype='application/json'
    )

# --- Tera main page ---
@app.route('/')
def home():
    return render_template('index.html')

# --- Agar file upload/download wala code hai to wahi rehne de ---
# Example:
# @app.route('/upload', methods=['POST'])
# def upload():
#     ...

if __name__ == '__main__':
    app.run(debug=True)
