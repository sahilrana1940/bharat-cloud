from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify
import os

app = Flask(__name__)

# --- Fix for Address Bar Issue ---
@app.route('/.well-known/assetlinks.json')
def assetlinks():
    return send_from_directory(
        os.path.join(app.root_path, 'public', '.well-known'), 
        'assetlinks.json',
        mimetype='application/json'
    )

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
