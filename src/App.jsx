import { useState, useEffect } from 'react';

const API = "https://bharatcloud-api.sahilrana1940.workers.dev";
const EMAIL = localStorage.getItem("bharatcloud_email") || "admin@bharatcloud.com";

export default function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/list?prefix=${encodeURIComponent(EMAIL)}/`);
      const data = await res.json();
      console.log("API DATA", data);
      setFiles(data.files || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadFiles(); }, []);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("name", `${EMAIL}/${Date.now()}-${file.name}`);
    setLoading(true);
    await fetch(`${API}/upload`, { method: "POST", body: fd });
    alert("Uploaded ✅");
    loadFiles();
  };

  const deleteFile = async (key) => {
    if (!confirm("Delete?")) return;
    await fetch(`${API}/delete/${encodeURIComponent(key)}`);
    loadFiles();
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 650, margin: '30px auto', padding: 20 }}>
      <h2>BharatCloud Dashboard ✅</h2>
      <p>Logged in as: {EMAIL}</p>
      <input type="file" onChange={uploadFile} />
      <h3>My Files</h3>
      {loading? <div>Loading...</div> : files.length === 0? <div>No files yet - R2 me 3 files hain, ab dikh jayengi</div> :
        files.map(f => {
          const shortName = f.name.split('/').pop();
          return (
            <div key={f.name} style={{ border: '1px solid #ddd', padding: 10, margin: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
              <span>{shortName} ({(f.size/1024).toFixed(1)} KB)</span>
              <span>
                <a href={`${API}/file/${encodeURIComponent(f.name)}`} target="_blank" rel="noreferrer" style={{marginRight:8}}>Open</a>
                <button onClick={() => deleteFile(f.name)}>Delete</button>
              </span>
            </div>
          )
        })
      }
    </div>
  );
}
