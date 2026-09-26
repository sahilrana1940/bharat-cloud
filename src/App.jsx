import { useEffect, useState } from "react";

const API = "https://bharatcloud-api.sahilrana1940.workers.dev";
const EMAIL = localStorage.getItem("bharatcloud_email") || "admin@bharatcloud.com";

export default function App() {
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    const res = await fetch(`${API}/list?prefix=${EMAIL}/`);
    const data = await res.json();
    setFiles(data);
  };

  useEffect(() => { loadFiles(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("name", `${EMAIL}/${Date.now()}-${file.name}`);
    await fetch(`${API}/upload`, { method: "POST", body: fd });
    alert("Uploaded ✅");
    loadFiles();
  };

  return (
    <div style={{padding:20, textAlign:'center'}}>
      <h2>BharatCloud ✅ {EMAIL}</h2>
      <input type="file" onChange={handleUpload} />
      <h3>My Files ({files.length})</h3>
      {files.length === 0? <p>No files yet</p> :
        files.map(f => (
          <div key={f.name}>{f.name.split('/').pop()} - <a href={`${API}/file/${f.name}`} target="_blank">Open</a></div>
        ))
      }
    </div>
  );
}
