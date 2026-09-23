from flask import Flask, render_template, request, send_from_directory
import os

app = Flask(__name__)

UPLOAD_FOLDER = '/tmp/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def dashboard():
    files = os.listdir(UPLOAD_FOLDER)
    return render_template('dashboard.html', files=files)

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files.get('file')
    if file and file.filename:
        file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    files = os.listdir(UPLOAD_FOLDER)
    return render_template('dashboard.html', files=files)

@app.route('/download/<filename>')
def download(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run()
