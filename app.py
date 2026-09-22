from flask import Flask, request, redirect
from supabase import create_client
import os

app = Flask(__name__)

# Vercel pe Settings > Environment Variables se aayega
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
BUCKET = "bharat-cloud"

supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

HTML_TOP = """
<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bharat Cloud - Mumbai Server</title>
<style>
body{background:#0f0f0f;color:white;font-family:Arial;padding:20px;text-align:center}
.card{background:#1e1e1e;padding:20px;border-radius:15px;max-width:500px;margin:20px auto}
a{color:#00d1ff;text-decoration:none}
button{background:#00d1ff;border:none;padding:10px 20px;border-radius:8px;font-weight:bold;cursor:pointer}
.file{display:flex;justify-content:space-between;background:#2a2a2a;padding:10px;margin:8px 0;border-radius:8px}
</style></head><body>
<h1>🇮🇳 Bharat Cloud</h1><p>Mumbai Server - Live</p>
<div class="card">
<form action="/upload" method="post" enctype="multipart/form-data">
<input type="file" name="file" required><br><br>
<button type="submit">Upload to Mumbai</button>
</form>
</div>
<div class="card">
<h3>Your Files</h3>
"""

HTML_BOTTOM = "</div></body></html>"

@app.route("/")
def home():
    files_html = ""
    if not supabase:
        files_html = "<p style='color:red'>Supabase Keys Set Nahi Hai Vercel Pe</p>"
    else:
        try:
            res = supabase.storage.from_(BUCKET).list()
            for f in res:
                name = f['name']
                url = supabase.storage.from_(BUCKET).get_public_url(name)
                files
