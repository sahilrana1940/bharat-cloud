import { useState, useEffect } from "react";

const API = "https://bharatcloud-api.sahilrana1940.workers.dev";

// 1790417 wala number hatane ke liye
const cleanName = (name) => {
  if (!name) return "Unnamed File";
  return name.replace(/^\d+-/, "");
};

export default function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("bc_email"));
  const [email, setEmail] = useState(localStorage.getItem("bc_email") || "");
  const [pass, setPass] = useState("");
  const [files, setFiles] = useState([]);
  const [upFile, setUpFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadFiles(currentEmail) {
    const e = currentEmail || email;
    if (!e) return;
    try {
      const res = await fetch(`${API}/list?email=${e}`);
      const data = await res.json();
      console.log("API DATA ->", data);
      setFiles(data.files || []);
    } catch (err) {
      console.log("Load error", err);
    }
  }

  useEffect(() => {
    if (logged) loadFiles();
  }, [logged]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("bc_email", email);
        setLogged(true);
        loadFiles(email);
      } else {
        alert(data.error || "Login failed");
      }
    } catch {
      alert("API Error");
    }
  }

  async function handleUpload() {
    if (!upFile) return alert("Pehle file select karo!");
    setLoading(true);
    const fd = new FormData();
    fd.append("file", upFile);
    fd.append("email", email);

    try {
      const res = await fetch(`${API}/upload`, { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setUpFile(null);
        document.getElementById("fileInput").value = "";
        loadFiles();
      } else {
        alert("Upload fail");
      }
    } catch {
      alert("Upload error");
    }
    setLoading(false);
  }

  async function handleDelete(key) {
    if (!confirm("Delete karna hai?")) return;
    await fetch(`${API}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, key }),
    });
    loadFiles();
  }

  function handleLogout() {
    localStorage.removeItem("bc_email");
    setLogged(false);
    setEmail("");
    setFiles([]);
  }

  // LOGIN SCREEN
  if (!logged) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <form onSubmit={handleLogin} style={{ background: "#111", padding: "32px", borderRadius: "16px", width: "350px", border: "1px solid #222" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "8px" }}>BharatCloud PRO 🚀</h1>
          <p style={{ opacity: 0.5, fontSize: "13px", marginBottom: "22px" }}>Secure Cloud Storage</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "8px", background: "#000", color: "#fff", border: "1px solid #333", outline: "none" }} />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" required style={{ width: "100%", padding: "12px", marginBottom: "18px", borderRadius: "8px", background: "#000", color: "#fff", border: "1px solid #333", outline: "none" }} />
          <button type="submit" style={{ width: "100%", padding: "12px", background: "#fff", color: "#000", border: "0", borderRadius: "8px", fontWeight: "800", cursor: "pointer" }}>Login</button>
          <p style={{ fontSize: "11px", opacity: 0.3, marginTop: "12px", textAlign: "center" }}>admin@bharatcloud.com / 123456</p>
        </form>
      </div>
    );
  }

  // DASHBOARD - BLACK
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "950px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800" }}>BharatCloud PRO 🚀</h1>
          <button onClick={handleLogout} style={{ padding: "6px 14px", background: "#111", color: "#fff", border: "1px solid #333", borderRadius: "20px", cursor: "pointer", fontSize: "13px" }}>Logout</button>
        </div>
        <p style={{ opacity: 0.5, fontSize: "13px", marginTop: "4px" }}>Logged in as: {email}</p>

        <div style={{ background: "#111", padding: "16px", borderRadius: "12px", marginTop: "24px", display: "flex", gap: "10px", border: "1px solid #222", alignItems: "center" }}>
          <input id="fileInput" type="file" onChange={(e) => setUpFile(e.target.files[0])} style={{ flex: 1, color: "#fff" }} />
          <button onClick={handleUpload} disabled={loading} style={{ padding: "9px 20px", background: "#fff", color: "#000", border: "0", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>{loading? "Uploading..." : "Upload"}</button>
          <button onClick={() => loadFiles()} style={{ padding: "9px 14px", background: "#222", color: "#fff", border: "0", borderRadius: "8px" }}>Refresh</button>
        </div>

        <h2 style={{ marginTop: "28px", fontSize: "18px", fontWeight: "700" }}>My Files ({files.length})</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
          {files.length === 0 && <p style={{ opacity: 0.4, padding: "20px", textAlign: "center", border: "1px dashed #222", borderRadius: "10px" }}>No files yet. Upload karo!</p>}
          {files.map((f) => (
            <div key={f.key} style={{ background: "#151515", padding: "12px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #222" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img src={`${API}/file/${f.key}?email=${email}`} alt="" style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "8px", background: "#222" }} onError={(e) => (e.target.style.display = "none")} />
                <div>
                  <div style={{ fontWeight: "600", fontSize: "14px", maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cleanName(f.name || f.key)}</div>
                  <div style={{ fontSize: "11px", opacity: 0.5, marginTop: "2px" }}>{f.size? (f.size / 1024).toFixed(1) + " KB" : ""} • {f.key?.slice(0, 15)}...</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <a href={`${API}/file/${f.key}?email=${email}`} target="_blank" rel="noreferrer" style={{ padding: "7px 12px", background: "#222", color: "#fff", borderRadius: "7px", textDecoration: "none", fontSize: "13px" }}>Open</a>
                <button onClick={() => { navigator.clipboard.writeText(`${API}/file/${f.key}?email=${email}`); alert("Link Copied! ✅"); }} style={{ padding: "7px 12px", background: "#333", color: "#fff", border: "0", borderRadius: "7px", fontSize: "13px", cursor: "pointer" }}>Share</button>
                <button onClick={() => handleDelete(f.key)} style={{ padding: "7px 12px", background: "#7a0000", color: "#fff", border: "0", borderRadius: "7px", fontSize: "13px", cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
