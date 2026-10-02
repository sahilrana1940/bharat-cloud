import { useState, useEffect } from 'react'

export default function App() {
  const [status, setStatus] = useState('Checking API...')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch('/api/upload')
     .then(r => r.json())
     .then(d => {
        if(d.status === 'LIVE') setStatus('API Connected ✅ LIVE')
        else setStatus('API Not Connected')
      })
     .catch(() => setStatus('API Not Connected'))
  }, [])

  const handleUpload = async () => {
    if(!file) return alert("File select karo pehle!")
    setUploading(true)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      try {
        const base64 = reader.result.split(',')[1]
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            fileName: file.name,
            fileData: base64,
            contentType: file.type
          })
        })
        const data = await res.json()
        if(data.success) alert("Upload Ho Gaya! \nKey: " + data.key)
        else alert("Error: " + JSON.stringify(data))
      } catch (e) {
        alert("Upload fail: " + e.message)
      }
      setUploading(false)
    }
  }

  return (
    <div style={{fontFamily:'Inter, sans-serif', background:'#0a0a0a', minHeight:'100vh', color:'white', padding:'20px'}}>
      <h1>BharatCloud</h1>
      <p>B2B Backup SaaS | Akhnoor, J&K</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px', marginTop:'20px'}}>
        <div style={{background:'#1a1a1a', padding:'20px', borderRadius:'12px'}}>
          <h3>50</h3><p>Total Users</p>
        </div>
        <div style={{background:'#1a1a1a', padding:'20px', borderRadius:'12px'}}>
          <h3>342GB / 1TB</h3><p>Storage Used</p>
          <div style={{background:'#333', height:'8px', borderRadius:'4px', marginTop:'10px'}}>
            <div style={{background:'#00ff88', width:'34%', height:'8px', borderRadius:'4px'}}></div>
          </div>
        </div>
      </div>

      <div style={{marginTop:'20px', background:'#1a1a1a', padding:'15px', borderRadius:'12px'}}>
        API Status: <b style={{color: status.includes('Connected')? '#00ff88' : '#ff4444'}}>{status}</b><br/>
        Domain: bharatcloud.store
      </div>

      <div style={{marginTop:'20px', background:'#1a1a1a', padding:'15px', borderRadius:'12px'}}>
        <h3>Test Upload to Wasabi</h3>
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button onClick={handleUpload} disabled={uploading} style={{background:'#00ff88', color:'black', padding:'8px 16px', borderRadius:'8px', marginLeft:'10px', border:'none', fontWeight:'bold', cursor:'pointer'}}>
          {uploading? 'Uploading...' : 'Upload to Wasabi'}
        </button>
      </div>
    </div>
  )
}