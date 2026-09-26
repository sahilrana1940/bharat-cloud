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
    const r=await fetch(`${API}/list`);
    const d=await r.json();
    setFiles(d.files||[]);
    setMsg(d.files?.length?`${d.files.length} files`:"No files yet - upload karo");
  };
  useEffect(()=>{ if(logged) loadFiles(); },[logged]);

  const handleLogin=()=>{
    if(email==="admin@bharatcloud.com" && pass==="123456"){
      localStorage.setItem("bharatcloud_email",email); setLogged(true);
    } else alert("Wrong password - admin@bharatcloud.com / 123456");
  };

  const handleUpload=async(e)=>{
    const file=e.target.files[0]; if(!file) return;
    const fd=new FormData();
    fd.append("file",file);
    fd.append("name",`${Date.now()}-${file.name}`);
    setMsg("Uploading "+file.name+"...");
    await fetch(`${API}/upload`,{method:"POST",body:fd});
    await loadFiles();
    setMsg("Uploaded ✅");
  };

  const handleDelete=async(name)=>{
    if(!confirm("Delete "+cleanName(name)+"?")) return;
    await fetch(`${API}/delete/${encodeURIComponent(name)}`,{method:"DELETE"});
    await loadFiles();
  };

  const handleShare=async(name)=>{
    const link = `${API}/file/${encodeURIComponent(name)}`;
    try{
      await navigator.clipboard.writeText(link);
      if(navigator.share){
        await navigator.share({title: cleanName(name), text: "BharatCloud File:", url: link});
      } else {
        alert("Link Copied ✅\n"+link);
      }
    } catch{
      alert(link);
    }
  };

  const cleanName = (n) => n.split('/').pop().replace(/^\d+-/,'');
  const isImage = (n) => /\.(jpg|jpeg|png|webp|gif)$/i.test(n);

  if(!logged) return(
    <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0a0a0a",color:"#fff",fontFamily:"sans-serif"}}>
      <div style={{background:"#171717",padding:30,borderRadius:16,width:330,border:"1px solid #262626"}}>
        <h2 style={{textAlign:"center",margin:0}}>BHARAT CLOUD ☁️</h2>
        <p style={{textAlign:"center",opacity:.5,fontSize:12,marginTop:6}}>ADMIN v14 - Share Edition</p>
        <input style={{width:"100%",padding:12,marginTop:20,borderRadius:10,background:"#0f0f0f",color:"#fff",border:"1px solid #333",boxSizing:"border-box"}} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input style={{width:"100%",padding:12,marginTop:10,borderRadius:10,background:"#0f0f0f",color:"#fff",border:"1px solid #333",boxSizing:"border-box"}} type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)}/>
        <button onClick={handleLogin} style={{width:"100%",padding:12,marginTop:14,borderRadius:10,background:"#ff7a18",color:"#fff",border:0,fontWeight:700,cursor:"pointer"}}>Login</button>
      </div>
    </div>
  );

  return(
    <div style={{maxWidth:850,margin:"0 auto",padding:20,background:"#0a0a0a",color:"#fff",minHeight:"100vh",fontFamily:"Inter, sans-serif"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2 style={{margin:0}}>BharatCloud Dashboard ✅</h2>
        <button onClick={()=>{localStorage.removeItem("bharatcloud_email");setLogged(false)}} style={{padding:"7px 12px",borderRadius:8,background:"#222",color:"#fff",border:"1px solid #333"}}>Logout</button>
      </div>

      <div style={{background:"#171717",padding:16,borderRadius:14,marginTop:18,border:"1px solid #262626"}}>
        <div style={{fontSize:13,opacity:.6}}>Logged in: {email}</div>
        <div style={{marginTop:12, display:"flex", alignItems:"center", gap:10}}>
          <label style={{background:"#fff",color:"#000",padding:"10px 16px",borderRadius:10,fontWeight:700,cursor:"pointer"}}>
            + Upload File
            <input type="file" onChange={handleUpload} style={{display:"none"}}/>
          </label>
          <span style={{color:"#4ade80",fontSize:13}}>{msg}</span>
        </div>
      </div>

      <h3 style={{marginTop:22}}>My Files ({files.length})</h3>

      <div style={{display:"grid", gap:10}}>
      {files.map(f=>(
        <div key={f.name} style={{border:"1px solid #262626",background:"#171717",padding:12,borderRadius:12,display:"flex",gap:12,alignItems:"center"}}>
          {isImage(f.name)
           ? <a href={`${API}/file/${encodeURIComponent(f.name)}`} target="_blank"><img src={`${API}/file/${encodeURIComponent(f.name)}`} style={{width:52,height:52,objectFit:"cover",borderRadius:9}} alt=""/></a>
            : <div style={{width:52,height:52,background:"#222",borderRadius:9,display:"grid",placeItems:"center",fontSize:20}}>📄</div>
          }
          <div style={{flex:1,overflow:"hidden"}}>
            <div style={{fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontSize:14}}>{cleanName(f.name)}</div>
            <div style={{fontSize:11,opacity:.5,marginTop:2}}>{(f.size/1024).toFixed(1)} KB • {new Date(f.uploaded).toLocaleDateString()}</div>
          </div>
          <div style={{display:"flex",gap:6, flexWrap:"wrap"}}>
            <a href={`${API}/file/${encodeURIComponent(f.name)}`} target="_blank" style={{background:"#fff",color:"#000",padding:"7px 12px",borderRadius:8,textDecoration:"none",fontWeight:700,fontSize:12}}>Open</a>
            <button onClick={()=>handleShare(f.name)} style={{background:"#2a2a2a",color:"#fff",padding:"7px 12px",borderRadius:8,border:"1px solid #3a3a3a",fontSize:12,fontWeight:600}}>Share</button>
            <button onClick={()=>handleDelete(f.name)} style={{background:"#ff2d2d",color:"#fff",padding:"7px 12px",borderRadius:8,border:0,fontSize:12,fontWeight:600}}>Delete</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
