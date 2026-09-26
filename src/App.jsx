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
    setMsg(data.files?.length?`Total ${data.files.length} files`:"No files yet - upload karo");
  };
  useEffect(()=>{ if(logged) loadFiles(); },[logged]);

  const handleLogin=()=>{
    if(email==="admin@bharatcloud.com" && pass==="123456"){
      localStorage.setItem("bharatcloud_email",email);
      setLogged(true);
    } else alert("Wrong ID/Password - admin@bharatcloud.com / 123456");
  };

  const handleUpload=async(e)=>{
    const file=e.target.files[0];
    if(!file) return;
    const fd=new FormData();
    fd.append("file",file);
    fd.append("name",`${Date.now()}-${file.name}`);
    setMsg("Uploading "+file.name+"...");
    await fetch(`${API}/upload`,{method:"POST",body:fd});
    await loadFiles();
  };

  const handleDelete=async(name)=>{
    if(!confirm("Delete? "+cleanName(name))) return;
    await fetch(`${API}/delete/${encodeURIComponent(name)}`,{method:"DELETE"});
    await loadFiles();
  };

  const cleanName = (n) => n.split('/').pop().replace(/^\d+-/, '');
  const isImage = (n) => /\.(jpg|jpeg|png|webp|gif)$/i.test(n);

  if(!logged) return (
    <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0a0a0a",color:"#fff",fontFamily:"Inter, sans-serif"}}>
      <div style={{background:"#171717",padding:32,borderRadius:16,width:340, border:"1px solid #2a2a2a"}}>
        <h2 style={{textAlign:"center", margin:0}}>BharatCloud ☁️</h2>
        <p style={{textAlign:"center", opacity:.6, fontSize:13, marginTop:8}}>Secure Desi Storage</p>
        <input style={{width:"100%",padding:12,marginTop:20,borderRadius:10,background:"#0f0f0f",color:"#fff",border:"1px solid #2a2a2a", boxSizing:"border-box"}} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input style={{width:"100%",padding:12,marginTop:12,borderRadius:10,background:"#0f0f0f",color:"#fff",border:"1px solid #2a2a2a", boxSizing:"border-box"}} placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)}/>
        <button onClick={handleLogin} style={{width:"100%",padding:12,marginTop:16,borderRadius:10,background:"#fff",color:"#000",fontWeight:"700",border:0, cursor:"pointer"}}>Login</button>
      </div>
    </div>
  );

  return(
    <div style={{maxWidth:800,margin:"0 auto",padding:20,background:"#0a0a0a",color:"#fff",minHeight:"100vh",fontFamily:"Inter, sans-serif"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2 style={{margin:0}}>BharatCloud Dashboard ✅</h2>
        <button onClick={()=>{localStorage.removeItem("bharatcloud_email");setLogged(false);}} style={{padding:"6px 12px",borderRadius:8,background:"#222",color:"#fff",border:"1px solid #333"}}>Logout</button>
      </div>

      <div style={{background:"#171717",padding:16,borderRadius:14,marginTop:20, border:"1px solid #2a2a2a"}}>
        <div style={{fontSize:13, opacity:.7, marginBottom:8}}>Logged in as: {email}</div>
        <label style={{display:"inline-block", background:"#fff", color:"#000", padding:"10px 16px", borderRadius:10, fontWeight:600, cursor:"pointer"}}>
          + Choose File
          <input type="file" onChange={handleUpload} style={{display:"none"}}/>
        </label>
        <span style={{marginLeft:12, color:"#22c55e", fontSize:13}}>{msg}</span>
      </div>

      <h3 style={{marginTop:24}}>My Files ({files.length})</h3>
      <div style={{display:"grid", gap:10}}>
      {files.map(f=>(
        <div key={f.name} style={{border:"1px solid #2a2a2a",background:"#171717",padding:12,borderRadius:12,display:"flex",gap:12, alignItems:"center"}}>
          {isImage(f.name)? <img src={`${API}/file/${encodeURIComponent(f.name)}`} style={{width:50, height:50, objectFit:"cover", borderRadius:8}} /> : <div style={{width:50, height:50, background:"#222", borderRadius:8, display:"grid", placeItems:"center"}}>📄</div>}
          <div style={{flex:1, overflow:"hidden"}}>
            <div style={{fontWeight:"600", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{cleanName(f.name)}</div>
            <div style={{fontSize:12, opacity:.5}}>{(f.size/1024).toFixed(1)} KB • {new Date(f.uploaded).toLocaleDateString()}</div>
          </div>
          <div style={{display:"flex",gap:6}}>
            <a href={`${API}/file/${encodeURIComponent(f.name)}`} target="_blank" style={{background:"#fff",color:"#000",padding:"7px 12px",borderRadius:8,textDecoration:"none",fontSize:13,fontWeight:600}}>Open</a>
            <button onClick={()=>{navigator.clipboard.writeText(`${API}/file/${encodeURIComponent(f.name)}`); alert("Link copied!")}} style={{background:"#2a2a2a",color:"#fff",padding:"7px 12px",borderRadius:8,border:"1px solid #333",fontSize:13}}>Share</button>
            <button onClick={()=>handleDelete(f.name)} style={{background:"#ff2d2d",color:"#fff",padding:"7px 12px",borderRadius:8,border:0,fontSize:13}}>Delete</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
