import { useState, useEffect } from 'react'

export default function App() {
  const [status, setStatus] = useState('Checking API...')
  
  useEffect(() => {
    fetch('/api/upload')
      .then(r => r.json())
      .then(d => {
        if(d.status === 'LIVE') setStatus('API Connected ✅ LIVE')
        else setStatus('API Not Connected')
      })
      .catch(() => setStatus('API Not Connected'))
  }, [])

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
        API Status: <b style={{color: status.includes('Connected') ? '#00ff88' : '#ff4444'}}>{status}</b><br/>
        Domain: bharatcloud.store
      </div>
    </div>
  )
}