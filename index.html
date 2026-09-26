<!DOCTYPE html>
<html>
<head>
<title>BharatCloud</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{font-family:sans-serif;max-width:650px;margin:30px auto;padding:20px}
#files div{border:1px solid #ddd;padding:10px;margin:8px 0;display:flex;justify-content:space-between;align-items:center}
button{padding:6px 12px;cursor:pointer}
</style>
</head>
<body>
<h2>BharatCloud Dashboard ✅</h2>
<p id="emailShow"></p>
<input type="file" id="fileInput" />
<button onclick="uploadFile()">Upload</button>
<h3>My Files</h3>
<div id="files">Loading...</div>
<br><button onclick="logout()">Logout</button>

<script>
const API = "https://bharatcloud-api.sahilrana1940.workers.dev";
const EMAIL = localStorage.getItem("bharatcloud_email") || "admin@bharatcloud.com";
document.getElementById("emailShow").innerText = "Logged in as: " + EMAIL;

async function loadFiles(){
  try{
    const res = await fetch(`${API}/list?prefix=${encodeURIComponent(EMAIL)}/`);
    const data = await res.json();
    console.log("API DATA", data);
    const files = data.files || [];
    const div = document.getElementById("files");
    if(files.length === 0){ div.innerHTML = "No files yet"; return; }
    div.innerHTML = files.map(f=>{
      const key = f.name;
      const shortName = key.split('/').pop();
      return `<div><span>${shortName} (${(f.size/1024).toFixed(1)} KB)</span><span><a href="${API}/file/${encodeURIComponent(key)}" target="_blank">Open</a> <button onclick="deleteFile('${encodeURIComponent(key)}')">Delete</button></span></div>`;
    }).join('');
  }catch(e){
    console.error(e);
    document.getElementById("files").innerHTML = "Error loading files: " + e.message;
  }
}

async function uploadFile(){
  const input = document.getElementById("fileInput");
  if(!input.files[0]) return alert("Pehle file select karo");
  const fd = new FormData();
  fd.append("file", input.files[0]);
  fd.append("name", `${EMAIL}/${Date.now()}-${input.files[0].name}`);
  document.getElementById("files").innerHTML = "Uploading...";
  const res = await fetch(`${API}/upload`, { method: "POST", body: fd });
  const json = await res.json();
  console.log("Upload", json);
  alert("Uploaded ✅");
  loadFiles();
}

async function deleteFile(key){
  if(!confirm("Delete karna hai?")) return;
  await fetch(`${API}/delete/${key}`);
  loadFiles();
}

function logout(){
  localStorage.removeItem("bharatcloud_email");
  location.reload();
}

loadFiles();
</script>
</body>
</html>
