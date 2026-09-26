import { useState, useEffect } from "react";
const API = "https://bharatcloud-api.sahilrana1940.workers.dev";
const cleanName = (n) => n? n.replace(/^\d+-/, "") : "Unnamed";

export default function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("bc_email"));
  const [email, setEmail] = useState(localStorage.getItem("bc_email") || "");
  const [pass, setPass] = useState("");
  const [files, setFiles] = useState([]);
  const [upFile, setUpFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  async function loadFiles(curr) {
    const e = curr || email; if(!e) return;
    const r = await fetch(`${API}/list?email=${e}`); const d = await r.json();
    setFiles(d.files || []);
  }
  useEffect(()=>{ if(logged) loadFiles(); },[logged]);

  async function handleLogin(e) {
    e.preventDefault();
    const r = await fetch(`${API}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pass})});
    const d = await r.json();
    if(d.success){ localStorage.setItem("bc_email",email); setLogged(true); loadFiles(email); } else alert(d.error);
  }

  function doUpload(file){
    if(!file) return; setLoading(true); setProgress(0);
    const xhr = new XMLHttpRequest();
    const fd = new FormData(); fd.append("file", file); fd.append("email", email);
    xhr.upload.onprogress = (e) => { if(e.lengthComputable) setProgress(Math.round((e.loaded/e.total)*100)); };
    xhr.onload = () => { setLoading(false); setProgress(0); setUpFile(null); loadFiles(); };
    xhr.onerror = () => { setLoading(false); alert("Upload fail"); };
    xhr.open("POST", `${API}/upload`); xhr.send(fd);
  }

  async function handleDelete(key){
    if(!confirm("Delete?")) return;
    await fetch(`${API}/delete`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,key})});
    loadFiles();
  }

  const filtered = files.filter(f => cleanName(f.name||f.key).toLowerCase().includes(search.toLowerCase()));
  const logout=()=>{ localStorage.removeItem("bc_email"); setLogged(false); setEmail(""); setFiles([]); }

  if(!logged) return (<div style={{minHeight:"100vh",background:"#000",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"sans-serif"}}><form onSubmit={handleLogin} style={{background:"#111",padding:"32px",borderRadius:"16px",width:"350px",border:"1px solid #222"}}><h1 style={{fontSize:"26px",fontWeight:"800"}}>BharatCloud PRO 🚀</h1><p style={{opacity:0.5,fontSize:"13px",marginBottom:"22px"}}>Search + Drag & Drop + Preview</p><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required style={{width:"100%",padding:"12px",marginBottom:"12px",borderRadius:"8px",background:"#000",color:"#fff",border:"1px solid #333"}}/><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" required style={{width:"100%",padding:"12px",marginBottom:"18px",borderRadius:"8px",background:"#000",color:"#fff",border:"1px solid #333"}}/><button type="submit" style={{width:"100%",padding:"12px",background:"#fff",color:"#000",border:"0",borderRadius:"8px",fontWeight:"800",cursor:"pointer"}}>Login</button></form></div>);

  return (<div style={{minHeight:"100vh",background:"#000",color:"#fff",padding:"20px",fontFamily:"sans-serif"}} onDragOver={e=>{e.preventDefault(); setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault(); setDragOver(false); const f=e.dataTransfer.files[0]; setUpFile(f); doUpload(f);}}>
    {dragOver && <div style={{position:"fixed",inset:0,background:"rgba(255,255,255,0.1)",zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"30px",fontWeight:"800",backdropFilter:"blur(10px)"}}>Drop Here to Upload 👇</div>}
    <div style={{maxWidth:"950px",margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h1 style={{fontSize:"28px",fontWeight:"800"}}>BharatCloud PRO 🚀</h1><button onClick={logout} style={{padding:"6px 14px",background:"#111",color:"#fff",border:"1px solid #333",borderRadius:"20px",cursor:"pointer"}}>Logout</button></div>
      <p style={{opacity:0.5,fontSize:"13px"}}>{email}</p>

      <div style={{background:"#111",padding:"16px",borderRadius:"12px",marginTop:"20px",border:"1px solid #222"}}>
        <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
          <input type="file" onChange={e=>setUpFile(e.target.files[0])} style={{flex:1,color:"#fff"}}/>
          <button onClick={()=>doUpload(upFile)} disabled={loading ||!upFile} style={{padding:"10px 22px",background:"#fff",color:"#000",border:"0",borderRadius:"8px",fontWeight:"700",opacity:(!upFile||loading)?0.5:1}}>{loading?`${progress}% Uploading...`:"Upload"}</button>
          <button onClick={()=>loadFiles()} style={{padding:"10px 14px",background:"#222",color:"#fff",border:"0",borderRadius:"8px"}}>Refresh</button>
        </div>
        {loading && <div style={{marginTop:"12px",height:"8px",background:"#222",borderRadius:"10px",overflow:"hidden"}}><div style={{width:`${progress}%`,height:"100%",background:"#fff",transition:"width 0.2s"}}></div></div>}
        <p style={{fontSize:"11px",opacity:0.4,marginTop:"8px"}}>Tip: File ko kheech ke (Drag & Drop) bhi daal sakta hai!</p>
      </div>

      <div style={{marginTop:"22px",display:"flex",gap:"10px"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search files..." style={{flex:1,padding:"12px",borderRadius:"10px",background:"#111",color:"#fff",border:"1px solid #222"}}/>
      </div>

      <h2 style={{marginTop:"24px",fontWeight:"700"}}>My Files ({filtered.length} / {files.length})</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:"12px",marginTop:"12px"}}>
        {filtered.map(f=>{
          const url=`${API}/file/${f.key}?email=${email}`;
          return (<div key={f.key} style={{background:"#151515",padding:"12px",borderRadius:"12px",border:"1px solid #222"}}>
            <img onClick={()=>setPreview(url)} src={url} style={{width:"100%",height:"140px",objectFit:"cover",borderRadius:"8px",background:"#222",cursor:"pointer"}} onError={e=>e.target.style.display="none"}/>
            <div style={{fontWeight:"600",fontSize:"13px",marginTop:"8px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{cleanName(f.name||f.key)}</div>
            <div style={{fontSize:"11px",opacity:0.5}}>{f.size?(f.size/1024).toFixed(1)+" KB":""}</div>
            <div style={{display:"flex",gap:"6px",marginTop:"10px"}}>
              <a href={url} target="_blank" style={{flex:1,textAlign:"center",padding:"6px",background:"#222",color:"#fff",borderRadius:"6px",textDecoration:"none",fontSize:"12px"}}>Open</a>
              <button onClick={()=>{navigator.clipboard.writeText(url);alert("Link Copied!");}} style={{flex:1,padding:"6px",background:"#333",color:"#fff",border:"0",borderRadius:"6px",fontSize:"12px"}}>Share</button>
              <button onClick={()=>handleDelete(f.key)} style={{padding:"6px 10px",background:"#7a0000",color:"#fff",border:"0",borderRadius:"6px",fontSize:"12px"}}>Del</button>
            </div>
          </div>)
        })}
      </div>
      {filtered.length===0 && <p style={{opacity:0.3,textAlign:"center",marginTop:"30px"}}>No files found</p>}
    </div>
    {preview && <div onClick={()=>setPreview(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}><img src={preview} style={{maxWidth:"90%",maxHeight:"90%",borderRadius:"12px"}}/></div>}
  </div>);
}
