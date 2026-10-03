import { useState } from 'react'

export default function App() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("")
  const [url, setUrl] = useState("")

  const handleUpload = async () => {
    if (!file) return alert("File select kar pehle")
    setStatus("Uploading to Wasabi...")

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1]
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: `${Date.now()}-${file.name}`,
            fileData: base64,
            contentType: file.type
          })
        })
        const data = await res.json()
        if(data.url){
          setUrl(data.url)
          setStatus("✅ Ho gaya upload!")
        } else {
          setStatus("❌ " + data.error)
        }
      } catch(e){
        setStatus("❌ " + e.message)
      }
    }
    reader.readAsDataURL(file)
  }

  // duplicate call hatane ke liye correct version:
  const onUploadClick = () => {
    if (!file) return alert("File select kar")
    setStatus("Uploading...")
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1]
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: `${Date.now()}-${file.name}`,
            fileData: base64,
            contentType: file.type
          })
        })
        const data = await res.json()
        if(data.url){ setUrl(data.url); setStatus("✅ Ho gaya!") }
        else{ setStatus("❌ "+data.error) }
      } catch(e){ setStatus("❌ "+e.message) }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div style={{padding:30, fontFamily:'system-ui', maxWidth:700}}>
      <h1>BharatCloud.store <span style={{fontSize:18}}>IN</span></h1>
      <h3 style={{color:'green'}}>✅ Site Live Hai</h3>

      <div style={{border:'2px dashed #888', padding:20, borderRadius:12, marginTop:20}}>
        <input type="file" onChange={e=>setFile(e.target.files?.[0])} />
        <button onClick={onUploadClick} style={{marginLeft:10, padding:'10px 18px', background:'black', color:'white', borderRadius:8, cursor:'pointer'}}>
          Upload
        </button>
        <p>{status}</p>
        {url && <a href={url} target="_blank" rel="noreferrer" style={{wordBreak:'break-all'}}>{url}</a>}
      </div>
    </div>
  )
}