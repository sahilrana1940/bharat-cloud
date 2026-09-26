import { useState, useEffect } from 'react';

const API = "https://bharatcloud-api.sahilrana1940.workers.dev";
const EMAIL = localStorage.getItem("bharatcloud_email") || "admin@bharatcloud.com";

export default function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const loadFiles = async () => {
    setLoading(true);
    setMsg("Loading...");
    try {
      // prefix hataya hai taaki R2 ki saari files dikhe
      const res = await fetch(`${API}/list`);
      if (!res.ok) throw new Error("API Fail: " + res.status);
      const data = await res.json();
      console.log("R2 DATA:", data);
      setFiles(data.files || []);
      setMsg(data.files?.length === 0 ? "R2 me koi file nahi mili" : "");
    } catch (e) {
      console.error(e);
      setMsg("Error: " + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", `${EMAIL}/${Date.now()}-${file.name}`);
    setMsg("Uploading...");
    try {
      await fetch(`${API}/upload`, { method: "POST", body: formData });
      setMsg("Uploaded ✅");
      loadFiles();
    } catch (err) {
      setMsg("Upload failed: " + err.message);
    }
  };

  const handleDelete = async (key) => {
    if (!confirm("Delete karu? " + key)) return;
    await fetch(`${API}/delete/${encodeURIComponent(key)}`);
    loadFiles();
  };

  const logout = () => {
    localStorage.removeItem("bharatcloud_email");
    location.reload();
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h1>BharatCloud Dashboard ✅ Login Success!</h1>
      <p><b>Logged in as:</b> {EMAIL}</p>
      
      <input type="file" onChange={handleUpload} />
      <p style={{color: "green"}}>{msg}</p>

      <h2>My Files</h2>
      {loading ? <p>Loading...</p> : null}
      
      {files.length === 0 && !loading ? <p>No files yet</p> : null}

      <div>
        {files.map((f) => {
          const shortName = f.name.split("/").pop();
          return (
            <div key={f.name} style={{ border: "1px solid #ddd", padding: "12px", margin: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <b>{shortName}</b><br/>
                <small>{f.name} - {(f.size/1024).toFixed(2)} KB</small>
              </div>
              <div>
                <a href={`${API}/file/${encodeURIComponent(f.name)}`} target="_blank" rel="noreferrer" style={{ marginRight: 10 }}>Open</a>
                <button onClick={() => handleDelete(f.name)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      <br/>
      <button onClick={logout}>Logout</button>
      <br/><br/>
      <small>API: {API}</small>
    </div>
  );
}
