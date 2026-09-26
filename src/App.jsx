import { useState, useEffect } from "react";
const API = "https://bharatcloud-api.sahilrana1940.workers.dev";
const cleanName = (n) => n.replace(/^\d+-/,"");

export default function App(){
  const [logged,setLogged]=useState(!!localStorage.getItem("bc_email"));
  const [email,setEmail]=useState(localStorage.getItem("bc_email")||"");
  const [pass,setPass]=useState("");
  const [files,setFiles]=useState([]);
  const [upFile,setUpFile]=useState(null);
  const [loading,setLoading]=useState(false);

  async function load(){
    const r=await fetch(`${API}/list?email=${email}`);
    const d=await r.json(); setFiles(d.files||[]);
  }
  useEffect(()=>{ if(logged) load(); },[logged]);

  async function login(e){
    e.preventDefault();
    const r=await fetch(`${API}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pass})});
    const d=await r.json();
    if(d.success){ localStorage.setItem("bc_email",email); setLogged(true); load(); }
    else alert(d.error);
  }

  async function upload(){
    if(!upFile) return alert("File select karo");
    setLoading(true);
    const fd=new FormData(); fd.append("file",upFile); fd.append("email",email);
    const r=await fetch(`${API}/upload`,{method:"POST",body:fd});
    const d=await r.json(); setLoading(false);
    if(d.success){ setUpFile(null); load(); } else alert("Fail");
  }

  async function del(k){
    if(!confirm("Delete?")) return;
    await fetch(`${API}/delete`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,key:k})});
    load();
  }

  if(!logged){
    return <div style={{minHeight:"100vh",background:"#000",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <form onSubmit={login} style={{background:"#111",padding:30,borderRadius:16,width:340}}>
        <h1 style={{marginBottom:20}}>BharatCloud PRO</h1>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:12,marginBottom:10,borderRadius:8}}/>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:"100%",padding:12,marginBottom:15,borderRadius:8}}/>
        <button style={{width:"100%",padding:12,background:"#fff",color:"#000",border:0,borderRadius:8,fontWeight:800}}>Login</button>
        <p style={{fontSize:11,opacity:.5,marginTop:10}}>admin@bharatcloud.com / 123456</p>
      </form>
    </div>
  }

  return <div style={{minHeight:"100vh",background:"#000",color:"#fff",padding:20}}>
    <div style={{maxWidth:900,margin:"0 auto"}}>
      <h1>BharatCloud PRO 🚀</h1>
      <p style={{opacity:.6}}>{email} <button onClick={()=>{localStorage.removeItem("bc_email");setLogged(false)}} style={{marginLeft:10,padding:"4px 10px"}}>Logout</button></p>
      <div style={{background:"#111",padding:16,borderRadius:12,marginTop:20,display:"flex",gap:10}}>
        <input type="file" onChange={e=>setUpFile(e.target.files[0])}/>
        <button onClick={upload} disabled={loading} style={{padding:"8px 18px",background:"#fff",color:"#000",border:0,borderRadius:8,fontWeight:700}}>{loading?"...":"Upload"}</button>
      </div>
      <h2 style={{marginTop:25}}>My Files</h2>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {files.length==0 && <p style={{opacity:.5}}>No files yet</p>}
        {files.map(f=><div key={f.key} style={{background:"#151515",padding:12,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <img src={`${API}/file/${f.key}?email=${email}`} style={{width:56,height:56,objectFit:"cover",borderRadius:8,background:"#222"}}/>
            <div><div style={{fontWeight:600}}>{cleanName(f.name||f.key)}</div><div style={{fontSize:11,opacity:.5}}>{(f.size/1024).toFixed(1)} KB</div></div>
          </div>
          <div style={{display:"flex",gap:6}}>
            <a href={`${API}/file/${f.key}?email=${email}`} target="_blank" style={{padding:"6px 10px",background:"#222",color:"#fff",borderRadius:6,textDecoration:"none"}}>Open</a>
            <button onClick={()=>{navigator.clipboard.writeText(`${API}/file/${f.key}?email=${email}`);alert("Link Copied!");}} style={{padding:"6px 10px",background:"#333",color:"#fff",border:0,borderRadius:6}}>Share</button>
            <button onClick={()=>del(f.key)} style={{padding:"6px 10px",background:"#8a0000",color:"#fff",border:0,borderRadius:6}}>Delete</button>
          </div>
        </div>)}
      </div>
    </div>
  </div>
}
