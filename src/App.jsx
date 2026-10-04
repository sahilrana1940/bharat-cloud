import { useState, useEffect } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(r => r.forEach(reg => reg.unregister()));
    }
  }, []);

  const upload = async () => {
    if (!file) return setMsg("file choose karo");
    setMsg("Uploading...");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.ok) { setLink(data.url); setMsg("✅ Ho gaya!"); }
      else setMsg("❌ " + data.error);
    } catch (e) {
      setMsg("❌ " + e.message);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>BharatCloud.store IN</h1>
      <p style={{ color: "green" }}>✅ Site Live Hai - Final Build</p>
      <div style={{ border: "2px dashed grey", padding: 20, marginTop: 20 }}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={upload} style={{ marginLeft: 10, background: "black", color: "white", padding: "8px 20px" }}>Upload</button>
        <p>{msg}</p>
        {link && <a href={link} target="_blank" rel="noreferrer">{link}</a>}
      </div>
    </div>
  );
}