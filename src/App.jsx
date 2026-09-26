import { useState, useEffect } from 'react';
const API = "https://bharatcloud-api.sahilrana1940.workers.dev";

export default function App() {
  const [email, setEmail] = useState(localStorage.getItem("bharatcloud_email") || "");
  const [pass, setPass] = useState("");
  const [logged, setLogged] = useState(!!localStorage.getItem("bharatcloud_email"));
  const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState("");

  const loadFiles = async () => {
    setMsg("Loading files...");
    try {
      const res = await fetch(`${API}/list`);
      const data = await res.json();
      setFiles(data.files || []);
      setMsg(data.files?.length ? "" : "No files in R2");
    } catch(e){ setMsg("API Error: "+e.message) }
  };

  useEffect(()=>{ if(logged) loadFiles(); }, [logged]);

  const handleLogin = () => {
    if(email === "admin@bharatcloud.com" && pass === "123456"){
      localStorage.setItem("bharatcloud_email", email);
      setLogged(true);
      alert("Login Success!");
    } else { alert("Galat ID"); }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("name", `${email}/${Date.now()}-${file.name}`);
    setMsg("Uploading...");
    await fetch(`${API}/upload`, {method:"POST", body: fd});
    loadFiles();
  };

  if(!logged){
    return (
      <div style={{padding:"50px"}}>
        <h2>BharatCloud Login</h2>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/><br/>
        <input placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} /><br/><br/>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }

  return (
    <div style={{fontFamily:"sans-serif", maxWidth:700, margin:"40px auto", padding:20}}>
      <h2>BharatCloud Dashboard ✅ Login Success!</h2>
      <p>Logged in as: {email}</p>
      <input type="file" onChange={handleUpload} />
      <p style={{color:"green"}}>{msg}</p>
      <h3>My Files</h3>
      {files.map(f=>(
        <div key={f.name} style={{border:"1px solid #ddd", padding:10, margin:"8px 0", display:"flex", justifyContent:"space-between"}}>
          <span>{f.name} ({(f.size/1024).toFixed(1)} KB)</span>
          <a href={`${API}/file/${encodeURIComponent(f.name)}`} target="_blank">Open</a>
        </div>
      ))}
      <br/>
      <button onClick={()=>{localStorage.removeItem("bharatcloud_email"); setLogged(false);}}>Logout</button>
    </div>
  );
}
