import { useState, useEffect } from 'react';
const API = "https://bharatcloud-api.sahilrana1940.workers.dev";
export default function App(){
  const [email,setEmail]=useState(localStorage.getItem("bharatcloud_email")||"");
  const [pass,setPass]=useState("");
  const [logged,setLogged]=useState(!!localStorage.getItem("bharatcloud_email"));
  const [files,setFiles]=useState([]);
  const [msg,setMsg]=useState("");
  const loadFiles=async()=>{
    setMsg("Loading...");
    const res=await fetch(`${API}/list`);
    const data=await res.json();
    setFiles(data.files||[]);
    setMsg(data.files?.length?"": "No files yet - upload karo");
  };
  useEffect(()=>{if(logged) loadFiles();},[logged]);
  const handleLogin=()=>{
    if(email==="admin@bharatcloud.com" && pass==="123456"){
      localStorage.setItem("bharatcloud_email",email); setLogged(true);
    } else alert("Wrong pass");
  };
  const handleUpload=async(e)=>{
    const file=e.target.files[0]||document.querySelector('input[type=file]').files[0];
    if(!file) return;
    const fd=new FormData(); fd.append("file",file);
    fd.append("name",`${Date.now()}-${file.name}`);
    setMsg("Uploading "+file.name+"...");
    await fetch(`${API}/upload`,{method:"POST",body:fd});
    await loadFiles(); setMsg("Uploaded ✅");
  };
  const handleDelete=async(name)=>{
    if(!confirm("Delete "+name+"?")) return;
    await fetch(`${API}/delete/${encodeURIComponent(name)}`,{method:"DELETE"});
    await loadFiles();
  };
  const cleanName=n=>n.split('/').pop().replace(/^\d+-/,'');
  if(!logged) return (
    <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0f0f0f",color:"#fff"}}>
      <div style={{background:"#1e1e1e",padding:30,borderRadius:12,width:320}}>
        <h2 style={{textAlign:"center"}}>BharatCloud Login</h2>
        <input style={{width:"100%",padding:10,marginTop:15,borderRadius:8,background:"#111",color:"#fff",border:"1px solid #333"}} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input style={{width:"100%",padding:10,marginTop:10,borderRadius:8,background:"#111",color:"#fff",border:"1px solid #333"}} placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)}/>
        <button onClick={handleLogin} style={{width:"100%",padding:10,marginTop:15,borderRadius:8,background:"#fff",color:"#000",fontWeight:"bold"}}>Login</button>
      </div>
    </div>
  );
  return(
    <div style={{maxWidth:720,margin:"0 auto",padding:20,background:"#0f0f0f",color:"#fff",minHeight:"100vh",fontFamily:"sans-serif"}}>
      <h2 style={{textAlign:"center"}}>BharatCloud Dashboard ✅</h2>
      <div style={{background:"#1e1e1e",padding:15,borderRadius:10,marginTop:20}}>
        <p>Logged in: {email}</p>
        <input type="file" id="f" onChange={handleUpload}/><button onClick={handleUpload} style={{marginLeft:10,padding:"6px 12px",borderRadius:6,background:"#fff",color:"#000",border:0}}>Upload</button>
        <p style={{color:"#8f8"}}>{msg}</p>
      </div>
      <h3>My Files ({files.length})</h3>
      {files.map(f=>(
        <div key={f.name} style={{border:"1px solid #333",background:"#1a1a1a",padding:12,margin:"8px 0",borderRadius:8,display:"flex",justifyContent:"space-between"}}>
          <div><b>{cleanName(f.name)}</b><div style={{fontSize:12,opacity:.6}}>{(f.size/1024).toFixed(1)} KB</div></div>
          <div style={{display:"flex",gap:8}}><a href={`${API}/file/${encodeURIComponent(f.name)}`} target="_blank" style={{background:"#fff",color:"#000",padding:"6px 12px",borderRadius:6,textDecoration:"none"}}>Open</a><button onClick={()=>handleDelete(f.name)} style={{background:"#ff3b3b",color:"#fff",padding:"6px 12px",borderRadius:6,border:0}}>Delete</button></div>
        </div>
      ))}
      <button onClick={()=>{localStorage.removeItem("bharatcloud_email");setLogged(false);}} style={{marginTop:20,padding:"8px 14px",borderRadius:8,background:"#333",color:"#fff",border:0}}>Logout</button>
    </div>
  );
}
