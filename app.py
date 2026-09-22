import os
from flask import Flask, request, redirect
from supabase import create_client

app = Flask(__name__)

SUPABASE_URL = os.environ.get("SUPABASE_URL") or os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY") or os.environ.get("SUPABASE_ANON_KEY") or os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") or os.environ.get("NEXT_PUBLIC_SUPABASE_KEY")
BUCKET = "bharat-cloud"

supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL.strip(), SUPABASE_KEY.strip())
    except:
        supabase = None

HTML = """<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Bharat Cloud</title><style>body{background:#0f0f0f;color:#fff;font-family:sans-serif;text-align:center;padding:20px}.card{background:#1e1e1e;padding:20px;border-radius:15px;max-width:500px;margin:20px auto}button{background:#00d1ff;border:none;padding:12px 25px;border-radius:8px;font-weight:bold}.file{display:flex;justify-content:space-between;background:#2a2a2a;padding:10px;margin:8px 0;border-radius:8px}a{color:#00d1ff;text-decoration:none}</style></head><body><h1>🇮🇳 Bharat Cloud</h1><p>Mumbai Server - LIVE</p><div class="card"><form action="/upload" method="post" enctype="multipart/form-data"><input type="file" name="file" required><br><br><button type="submit">Upload</button></form></div><div class="card"><h3>Files</h3>__FILES__</div></body></html>"""

@app.route("/")
def home():
    files_html = ""
    if not supabase:
        files_html = "<p style='color:orange'>Vercel pe Keys nahi mili - Env check karo</p>"
    else:
        try:
            data = supabase.storage.from_(BUCKET).list("")
            if not data:
                files_html="<p>Koi file nahi</p>"
            else:
                for f in data:
                    name=f.get('name')
                    if not name or name.startswith('.'): continue
                    url=supabase.storage.from_(BUCKET).get_public_url(name)
                    files_html+=f"<div class='file'><a href='{url}' target='_blank'>{name}</a><a href='/delete/{name}' style='color:red'>Delete</a></div>"
                if files_html=="":
                    files_html="<p>Koi file nahi</p>"
        except Exception as e:
            files_html=f"<p style='color:red'>Error: {e}</p>"
    return HTML.replace("__FILES__", files_html)

@app.route("/upload", methods=["POST"])
def upload():
    f = request.files.get("file")
    if f and supabase:
        try:
            supabase.storage.from_(BUCKET).upload(f.filename, f.read(), {"upsert": "true"})
        except Exception as e:
            print(e)
    return redirect("/")

@app.route("/delete/<path:name>")
def delete(name):
    if supabase:
        try:
            supabase.storage.from_(BUCKET).remove([name])
        except:
            pass
    return redirect("/")
