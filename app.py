import os
from flask import Flask, request, render_template_string, redirect, session
from supabase import create_client
from werkzeug.utils import secure_filename
import time

app = Flask(__name__)
# SECRET_KEY Vercel se aayega, yahan hardcode nahi
app.secret_key = os.environ.get("SECRET_KEY", "bharat-goredi-rani-420-secure-final-temp")

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
BUCKET_NAME = "bharat-files"

ALLOWED_EXTENSIONS = {'png','jpg','jpeg','pdf','mp4','mp3','docx','zip'}
MAX_FILE_SIZE_MB = 50
ADMIN_USER = os.environ.get("ADMIN_USER", "admin420")
ADMIN_PASS = os.environ.get("ADMIN_PASS", "rani@420")

# Agar Vercel me key missing hui toh saaf error batayega, Internal Server Error nahi
if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: SUPABASE_URL / SUPABASE_KEY Vercel me nahi mile!")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

def allowed_file(f): return '.' in f and f.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

HTML = """
<!DOCTYPE html><html><head><title>Bharat Cloud Pro</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<style>
body{margin:0;font-family:sans-serif;background:#0f0f0f;color:white;display:flex;height:100vh}
.sidebar{width:260px;background:#1a1a1a;padding:20px;border-right:1px solid #333}
.main{flex:1;padding:25px;overflow-y:auto;background:#121212}
.logo{font-size:22px;font-weight:800;margin-bottom:30px}.logo span{color:#4F46E5}
.menu-item{padding:12px 15px;border-radius:10px;margin-bottom:8px;color:#aaa}.active{background:#4F46E5;color:white}
.card{background:#1e1e1e;border-radius:15px;padding:20px;border:1px solid #2a2a2a}
.upload-box{border:2px dashed #4F46E5;background:#1a1a2e;text-align:center;padding:30px;border-radius:15px;margin-bottom:25px}
.btn{background:#4F46E5;color:white;padding:10px 20px;border-radius:8px;border:none;cursor:pointer;font-weight:600;text-decoration:none}
.file-row{display:flex;justify-content:space-between;padding:15px;background:#1e1e1e;border:1px solid #2a2a2a;border-radius:12px;margin-bottom:10px}
.search{width:100%;padding:12px 15px;border-radius:10px;background:#1e1e1e;border:1px solid #333;color:white;margin-bottom:20px}
</style></head><body>
<div class="sidebar"><div class="logo"><i class="fa-solid fa-cloud"></i> BHARAT <span>CLOUD</span></div>
<div class="menu-item active"><i class="fa-solid fa-hard-drive"></i> My Drive</div>
<div class="menu-item"><i class="fa-solid fa-trash"></i> Trash</div>
<div class="card" style="margin-top:30px"><p style="color:#aaa;font-size:13px">Storage</p><b>Safe & Locked</b><p style="font-size:11px;color:#666;margin-top:10px">India Server • Encrypted</p></div>
<a href="/logout" style="color:#ff5555;text-decoration:none;display:block;margin-top:20px">Logout</a></div>
<div class="main">
<input class="search" placeholder="Search in Drive" id="s" onkeyup="let q=this.value.toLowerCase();document.querySelectorAll('.file-item').forEach(e=>e.style.display=e.innerText.toLowerCase().includes(q)?'flex':'none')">
<div class="upload-box"><h3>Upload Securely</h3><p style="color:#aaa;font-size:13px">Max 50MB • jpg, pdf, mp4 only</p>
<form action="/upload" method="post" enctype="multipart/form-data"><input type="file" name="file" required style="margin:15px 0"><br><button class="btn" type="submit">Upload Now</button></form></div>
<h3>Recent Files - {{ files|length }}</h3>
{% for f in files %}<div class="file-row file-item"><div><i class="fa-solid fa-file"></i> {{ f.name }}</div>
<div><a href="/download/{{ f.name }}" class="btn" style="padding:6px 12px;font-size:12px">Download</a> <a href="/delete/{{ f.name }}" class="btn" style="background:#ff3333;padding:6px 12px;font-size:12px">Delete</a></div></div>{% endfor %}
</div></body></html>
"""
LOGIN = """<div style="background:#0f0f0f;height:100vh;display:flex;justify-content:center;align-items:center;font-family:sans-serif">
<div style="background:#1e1e1e;padding:40px;border-radius:15px;text-align:center;border:1px solid #333">
<h2 style="color:white">🇮🇳 Bharat Cloud Login</h2>
<form method="post"><input name="username" placeholder="Username" style="width:100%;padding:12px;margin:10px 0;border-radius:8px;background:#121212;color:white;border:1px solid #333"><input name="password" type="password" placeholder="Password" style="width:100%;padding:12px;margin:10px 0;border-radius:8px;background:#121212;color:white;border:1px solid #333"><button style="width:100%;padding:12px;background:#4F46E5;border:none;border-radius:8px;color:white;font-weight:700">Login</button></form>
<p style="color:#666;font-size:12px;margin-top:15px">Default: admin420 / rani@420</p></div></div>"""

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method=='POST':
        if request.form['username']==ADMIN_USER and request.form['password']==ADMIN_PASS:
            session['logged_in']=True; return redirect('/')
        return "Galat password! <a href='/login'>Try Again</a>"
    return render_template_string(LOGIN)

@app.route('/logout')
def logout(): session.clear(); return redirect('/login')

@app.route('/')
def index():
    if not session.get('logged_in'): return redirect('/login')
    if not supabase: return "Supabase keys missing! Vercel Env check karo"
    res = supabase.storage.from_(BUCKET_NAME).list()
    files = [{'name':x['name']} for x in res if x['name']!='.emptyFolderPlaceholder']
    return render_template_string(HTML, files=files)

@app.route('/upload', methods=['POST'])
def upload():
    if not session.get('logged_in'): return redirect('/login')
    f = request.files.get('file')
    if not f or not allowed_file(f.filename): return f"Sirf {ALLOWED_EXTENSIONS} allowed <a href='/'>Back</a>"
    data=f.read()
    if len(data) > MAX_FILE_SIZE_MB*1024*1024: return "File bahut badi hai! <a href='/'>Back</a>"
    name=f"{int(time.time())}_{secure_filename(f.filename)}"
    supabase.storage.from_(BUCKET_NAME).upload(name, data)
    return redirect('/')

@app.route('/download/<filename>')
def download(filename):
    if not session.get('logged_in'): return redirect('/login')
    try:
        r=supabase.storage.from_(BUCKET_NAME).create_signed_url(filename, 3600)
        return redirect(r['signedURL'])
    except: return redirect(f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{filename}")

@app.route('/delete/<filename>')
def delete(filename):
    if not session.get('logged_in'): return redirect('/login')
    supabase.storage.from_(BUCKET_NAME).remove([filename]); return redirect('/')

if __name__=='__main__': app.run()
