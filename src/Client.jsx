import { useState } from 'react'

export default function App(){
  const [step, setStep] = useState('login')
  const [loginType, setLoginType] = useState('phone')
  const [phone, setPhone] = useState('')
  const [gmail, setGmail] = useState('')
  const [otp, setOtp] = useState('')
  const [plan, setPlan] = useState('FREE')
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  const handleLogin = () => {
    if(loginType === 'phone' && phone.length < 10){ alert('Phone daal'); return; }
    if(loginType === 'gmail' && !gmail.includes('@')){ alert('Gmail daal'); return; }
    setStep('otp')
  }

  const handleOtpVerify = () => {
    if(otp.length < 4){ alert('OTP daal'); return; }
    setStep('plan')
  }

  const handlePlanSelect = (selectedPlan) => {
    setPlan(selectedPlan)
    setStep('dashboard')
  }

  const handleUpload = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if(selectedFiles.length === 0) return
    setUploading(true)
    setTimeout(() => {
      const newFiles = selectedFiles.map(f => ({ name: f.name, size: (f.size/1024/1024).toFixed(2) + ' MB', date: new Date().toLocaleDateString() }))
      setFiles([...files, ...newFiles])
      setUploading(false)
      alert('Upload Success (Demo)')
    }, 1000)
  }

  return (
    <div style={{minHeight:'100vh', background:'#f5f7fb', fontFamily:'Arial', padding:'20px'}}>
      <div style={{maxWidth:'460px', margin:'0 auto', background:'#fff', borderRadius:'16px', padding:'24px', boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}}>
        <h2 style={{textAlign:'center', color:'#1a73e8'}}>BharatCloud 🇮🇳</h2>
        
        {step === 'login' && (
          <div>
            <h3>Login</h3>
            <div style={{display:'flex', gap:'10px', marginBottom:'15px'}}>
              <button onClick={()=>setLoginType('phone')} style={{flex:1, padding:'10px', background: loginType==='phone'?'#1a73e8':'#eee', color: loginType==='phone'?'#fff':'#000', border:'none', borderRadius:'8px', cursor:'pointer'}}>Phone</button>
              <button onClick={()=>setLoginType('gmail')} style={{flex:1, padding:'10px', background: loginType==='gmail'?'#1a73e8':'#eee', color: loginType==='gmail'?'#fff':'#000', border:'none', borderRadius:'8px', cursor:'pointer'}}>Gmail</button>
            </div>
            {loginType === 'phone' ? (
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone Number" style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ccc', boxSizing:'border-box'}} />
            ) : (
              <input value={gmail} onChange={e=>setGmail(e.target.value)} placeholder="Gmail" style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ccc', boxSizing:'border-box'}} />
            )}
            <button onClick={handleLogin} style={{width:'100%', marginTop:'15px', padding:'12px', background:'#1a73e8', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer'}}>Send OTP</button>
          </div>
        )}

        {step === 'otp' && (
          <div>
            <h3>OTP Verify</h3>
            <p>OTP: 1234 daal de (Demo)</p>
            <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="1234" style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ccc', boxSizing:'border-box'}} />
            <button onClick={handleOtpVerify} style={{width:'100%', marginTop:'15px', padding:'12px', background:'#1a73e8', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer'}}>Verify OTP</button>
          </div>
        )}

        {step === 'plan' && (
          <div>
            <h3>Select Plan</h3>
            <div onClick={()=>handlePlanSelect('FREE')} style={{border:'2px solid #ccc', padding:'15px', borderRadius:'10px', marginBottom:'10px', cursor:'pointer'}}><b>FREE</b> - 5GB Storage - 500MB/File</div>
            <div onClick={()=>handlePlanSelect('PREMIUM')} style={{border:'2px solid #1a73e8', padding:'15px', borderRadius:'10px', cursor:'pointer', background:'#e8f0fe'}}><b>PREMIUM - ₹199/month</b> - 100GB Storage - 10GB/File</div>
          </div>
        )}

        {step === 'dashboard' && (
          <div>
            <h3>Dashboard - {plan}</h3>
            <p>{files.length} files uploaded</p>
            <input type="file" multiple onChange={handleUpload} style={{margin:'15px 0'}} />
            {uploading && <p>Uploading...</p>}
            <div>
              {files.map((f,i) => (
                <div key={i} style={{padding:'10px', borderBottom:'1px solid #eee'}}>{f.name} - {f.size}</div>
              ))}
            </div>
            <button onClick={()=>setStep('login')} style={{marginTop:'20px', width:'100%', padding:'10px', background:'#eee', border:'none', borderRadius:'8px', cursor:'pointer'}}>Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}