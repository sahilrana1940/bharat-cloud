import { useState, useEffect } from "react";
const API = "https://bharatcloud-api.sahilrana1940.workers.dev";

function cleanName(name){
  return name.replace(/^\d+-/,"");
}

export default function App(){
  const [logged,setLogged]=useState(!!localStorage.getItem("bharatcloud_email"));
  const [email,setEmail]=useState(localStorage.getItem("bharatcloud_email")||"");
  const [pass,setPass]=useState("");
  const [files,setFiles]=useState([]);
  const [upFile,setUpFile]=useState(null);
  const [loading,setLoading]=useState(false);

  async function loadFiles(){
    const res = await fetch(`${API}/list?email=${email}`);
    const data = await res.json();
    setFiles(data.files||[]);
  }
  useEffect(()=>{ if(logged) loadFiles(); },[logged]);

  async function handleLogin(e){
    e.preventDefault();
    const res = await fetch(`${API}/login`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password:pass})
    });
    const data = await res.json();
    if(data.success){
      localStorage.setItem("bharatcloud_email",email);
      setLogged(true); loadFiles();
    }else{ alert(data.error||"Login failed"); }
  }

  async function handleUpload(){
    if(!upFile) return alert("File choose karo");
    setLoading(true);
    const form = new FormData();
    form.append("file",upFile);
    form.append("email",email);
    const res = await fetch(`${API}/upload`,{method:"POST",body:form});
    const data = await res.json();
    setLoading(false);
    if(data.success){ setUpFile(null); loadFiles(); }
    else alert("Upload failed");
  }

  async function handleDelete(key){
    if(!confirm("Delete?")) return;
    await fetch(`${API}/delete`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,key})
    });
    loadFiles();
  }

  if(!logged){
    return (
      <div style={{minHeight:"100vh",background:"#000",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <form onSubmit={handleLogin} style={{background:"#111",padding:30,borderRadius:12,width:350}}>
          <h2 style={{marginBottom:20}}>BharatCloud Login</h2>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:10,marginBottom:10,borderRadius:6}} />
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:"100%",padding:10,marginBottom:15,borderRadius:6}} />
          <button style={{width:"100%",padding:12,background:"#fff",color:"#000",border:0,borderRadius:8,fontWeight:700}}>Login</button>
          <p style={{fontSize:12,marginTop:10,opacity:.6}}>Email: admin@bharatcloud.com / Pass: 123456</p>
        </form>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh",background:"#000",color:"#fff",padding:20}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <h1>BharatCloud PRO 🚀</h1>
        <p style={{opacity:.7}}>Logged in as: {email} <button onClick={()=>{localStorage.removeItem("bharatcloud_email");setLogged(false)}} style={{marginLeft:10}}>Logout</button></p>

        <div style={{background:"#111",padding:20,borderRadius:12,marginTop:20,display:"flex",gap:10}}>
          <input type="file" onChange={e=>setUpFile(e.target.files[0])} />
          <button onClick={handleUpload} disabled={loading} style={{padding:"8px 20px",background:"#fff",color:"#000",border:0,borderRadius:8,fontWeight:700}}>{loading?"Uploading...":"Upload"}</button>
        </div>

        <h2 style={{marginTop:30}}>My Files</h2>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:10}}>
          {files.map(f=>(
            <div key={f.key} style={{background:"#111",padding:12,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <img src={`${API}/file/${f.key}?email=${email}`} style={{width:55,height:55,objectFit:"cover",borderRadius:8}} onError={e=>e.target.style.display='none'} />
                <div>
                  <div style={{fontWeight:600}}>{cleanName(f.name||f.key)}</div>
                  <div style={{fontSize:12,opacity:.6}}>{(f.size/1024).toFixed(1)} KB</div>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <a href={`${API}/file/${f.key}?email=${email}`} target="_blank" style={{padding:"6px 12px",background:"#222",color:"#fff",borderRadius:6,textDecoration:"none"}}>Open</a>
                <button onClick={()=>{navigator.clipboard.writeText(`${API}/file/${f.key}?email=${email}`);alert("Link copied!");}} style={{padding:"6px 12px",background:"#333",color:"#fff",border:0,borderRadius:6}}>Share</button>
                <button onClick={()=>handleDelete(f.key)} style={{padding:"6px 12px",background:"#a00",color:"#fff",border:0,borderRadius:6}}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
