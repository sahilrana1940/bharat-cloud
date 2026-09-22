from flask import Flask, request, redirect, render_template_string
from supabase import create_client
import os

app = Flask(__name__)

# --- TERA SUPABASE CONFIG ---
SUPABASE_URL = "https://YOUR_PROJECT.supabase.co"
SUPABASE_KEY = "YOUR_ANON_KEY"
BUCKET = "bharat-cloud"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

HTML = """
<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bharat Cloud - Mumbai Server</title>
<style>
body{background:#0f0f0f;color:white;font-family:sans-serif;text-align:center;padding:20px}
.card{background:#1e1e1e;padding:20px;border-radius:15px;margin:15px auto;max-width:400px}
a{color:#00d1ff;text-decoration:none} button{background:#00d1ff;border:none;padding:10px 20px;border-radius:8px;font-weight:bold}
</style></head><body>
<h1>🇮🇳 Bharat Cloud</h1><p>Mumbai Server LIVE</p>
<div class="card">
<form action="/upload" method="post" enctype="multipart/form-data">
<input type="file" name="file" required><br><br><button type="submit">Upload Now</button>
</form></div>
<h3>Your Files</h3>
{% for f in files %}
<div class="card"><b>{{f}}</b><br><a href="/file/{{f}}" target="_blank">Open</a> | <a href="/delete/{{f}}" style="color:red">Delete</a></div>
{% endfor %}
</body></html>
"""

@app.route("/")
def home():
    try:
        files = supabase.storage.from_(BUCKET).list()
        names = [x['name'] for x in files]
    except:
        names = []
    return render_template_string(HTML, files=names)

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files['file']
    supabase.storage.from_(BUCKET).upload(file.filename, file.read(), {"upsert":"true"})
    return redirect("/")

@app.route("/file/<name>")
def get_file(name):
    url = supabase.storage.from_(BUCKET).get_public_url(name)
    return redirect(url)

@app.route("/delete/<name>")
def delete(name):
    supabase.storage.from_(BUCKET).remove([name])
    return redirect("/")

if __name__ == "__main__":
    app.run()