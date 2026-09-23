from flask import Flask, render_template, send_from_directory

app = Flask(_name_)

@app.route('/.well-known/assetlinks.json')
def assetlinks():
    return send_from_directory('.well-known', 'assetlinks.json', mimetype='application/json')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# Vercel ke liye zaruri
if _name_ == '_main_':
    app.run(debug=True)
