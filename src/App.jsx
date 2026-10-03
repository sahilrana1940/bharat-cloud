import { useState } from 'react'
export default function App(){
  const [file,setFile]=useState(null)
  const [status,setStatus]=useState("")
  const [url,setUrl]=useState("")
  const onUpload=()=>{
    if(!file) return alert("File select kar")
    setStatus("Uploading...")
    const r=new FileReader()
    r.onload=async()=>{
      const b64=r.result.split(',')[1]
      try{
        const res=await fetch('/api/upload',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fileName:`${Date.now()}-${file.name}`,fileData:b64,contentType:file.type})})
        const d=await res.json()
        if(d.url){setUrl(d.url);setStatus("✅ Ho gaya!")}else{setStatus("❌ "+d.error)}
      }catch(e){setStatus("❌ "+e.message)}
    }
    r.readAsDataURL(file)
  }
  return(<div style={{padding:30,fontFamily:'system-ui',maxWidth:700}}><h1>BharatCloud.store IN</h1><h3 style={{color:'green'}}>✅ Site Live Hai</h3><div style={{border:'2px dashed #888',padding:20,borderRadius:12,marginTop:20}}><input type="file" onChange={e=>setFile(e.target.files?.[0])}/><button onClick={onUpload} style={{marginLeft:10,padding:'10px 18px',background:'black',color:'white',borderRadius:8,cursor:'pointer'}}>Upload</button><p>{status}</p>{url&&<a href={url} target="_blank" rel="noreferrer" style={{wordBreak:'break-all'}}>{url}</a>}</div></div>)
}