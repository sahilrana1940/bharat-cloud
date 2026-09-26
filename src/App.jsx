import { useState } from "react"

export default function App(){
  const [page, setPage] = useState("login")
  const [step, setStep] = useState("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [plan, setPlan] = useState(null)
  const [photos, setPhotos] = useState([])
  const [videos, setVideos] = useState([])
  const [docs, setDocs] = useState([])
  const [whatsappOn, setWhatsappOn] = useState(false)

  const [userId] = useState("BC" + Math.floor(100000+Math.random()*900000))
  const [backupCode] = useState("BK-" + Math.floor(1000+Math.random()*9000))
  const BACKEND = "https://bharatcloud-backend.workers.dev"

  const PLANS = [
    { id:"FREE", price:0, gb:5, days:"LIFETIME", label:"LIFETIME FREE", icon:"🎁", desc:"5GB • Lifetime Free" },
    { id:"LITE 69", price:69, gb:25, days:30, label:"₹69", icon:"⚡", desc:"25GB • 30 Days • With Ads" },
    { id:"PRO 99", price:99, gb:60, days:45, label:"₹99", icon:"👑", desc:"60GB • WhatsApp FREE • No Ads" },
    { id:"KING 690", price:690, gb:100, days:365, label:"₹690", icon:"💎", desc:"100GB • Family 1+3 • No Ads" },
  ]

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if(!file) return
    if(plan==="FREE" && (photos.length+videos.length+docs.length)>=3){ alert("FREE me 3 hi files - 69 le"); return }
    const url = URL.createObjectURL(file)
    const obj = { url, name: file.name, size: (file.size/1024/1024).toFixed(2)+" MB" }
    if(file.type.startsWith("image/")) setPhotos(p=>[...p, obj])
    else if(file.type.startsWith("video/")) setVideos(v=>[...v, obj])
    else setDocs(d=>[...d, obj])
  }

  const selectPlan = (p) => {
    setPlan(p.id)
    if(p.id==="PRO 99" || p.id==="KING 690"){ setWhatsappOn(true) }
    else { setWhatsappOn(false) }
    setPage("files")
  }

  if(page==="login"){
    return (
      <div style={{minHeight:"100vh", display:"flex", justifyContent:"center", background:"#f5f5f7", fontFamily:"Inter"}}>
        <div style={{width:430, background:"white", minHeight:"100vh", padding:20, display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <div style={{textAlign:"center"}}>
            <div style={{width:64, height:64, background:"black", color:"white", borderRadius:20, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:24}}>B</div>
            <div style={{fontWeight:900, fontSize:22, marginTop:10}}>BHARAT CLOUD</div>
            <div style={{fontSize:11, color:"#888"}}>Mumbai L2 • Encrypted • bharatcloud.store</div>
          </div>
          {step==="phone"? (
            <div style={{marginTop:28, border:"1px solid #eee", borderRadius:20, padding:18}}>
              <div style={{fontWeight:800}}>Login - FREE 5GB LIFETIME</div>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="10 digit mobile" style={{width:"100%", marginTop:12, padding:14, borderRadius:12, border:"1.5px solid #ddd"}}/>
              <button onClick={()=>{ if(phone.length!==10){alert("10 digit daal"); return} setStep("otp"); alert("OTP 1234 Demo")}} style={{width:"100%", marginTop:12, background:"black", color:"white", padding:14, borderRadius:12, border:"none", fontWeight:800}}>Get OTP</button>
            </div>
          ):(
            <div style={{marginTop:28, border:"1px solid #eee", borderRadius:20, padding:18}}>
              <div style={{fontWeight:800}}>OTP {phone}</div>
              <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="1234" style={{width:"100%", marginTop:12, padding:14, borderRadius:12, border:"1.5px solid #ddd", textAlign:"center", letterSpacing:6, fontSize:20}}/>
              <button onClick={()=>{ if(otp!=="1234"){alert("OTP 1234"); return} setPage("home"); setPlan("FREE"); }} style={{width:"100%", marginTop:12, background:"black", color:"white", padding:14, borderRadius:12, border:"none", fontWeight:800}}>Verify</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh", display:"flex", justifyContent:"center", background:"#f5f5f7", fontFamily:"Inter"}}>
      <div style={{width:430, background:"white", minHeight:"100vh", paddingBottom:85, border:"1px solid #eee", position:"relative"}}>
        <div style={{padding:12, background:"#0f172a", color:"white", display:"flex", justifyContent:"space-between", position:"sticky", top:0, zIndex:10}}>
          <div style={{fontWeight:900, fontSize:12}}>{userId} • {plan} • {PLANS.find(p=>p.id===plan)?.gb||0}GB</div>
          <div onClick={()=>setPage("login")} style={{fontSize:10, background:"#ef4444", padding:"4px 8px", borderRadius:8, cursor:"pointer"}}>Logout</div>
        </div>

        {page==="home" && (
          <div style={{padding:14}}>
            <div style={{background:"#111", color:"white", borderRadius:18, padding:14}}>
              <div style={{fontSize:11, opacity:0.6}}>YOUR STORAGE</div>
              <div style={{fontSize:22, fontWeight:900, marginTop:4}}>{plan? PLANS.find(p=>p.id===plan).gb+"GB Active" : "No Plan"}</div>
              <div style={{fontSize:11, opacity:0.7}}>{plan==="FREE"?"LIFETIME FREE":PLANS.find(p=>p.id===plan)?.days+" Days"} • {photos.length+videos.length+docs.length} Files</div>
            </div>
            <div style={{marginTop:14, fontWeight:800}}>Choose Plan</div>
            <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:10}}>
              {PLANS.map(p=>(
                <div key={p.id} onClick={()=>selectPlan(p)} style={{padding:14, borderRadius:16, background: p.id==="FREE"?"#fee2e2":p.id==="LITE 69"?"#ffedd5":p.id==="PRO 99"?"#dcfce7":"#dbeafe", border: plan===p.id?"2.5px solid black":"1px solid #eee", cursor:"pointer"}}>
                  <div style={{display:"flex", justifyContent:"space-between"}}><div><div style={{fontWeight:900}}>{p.icon} {p.id} {p.label} {p.gb}GB {p.days==="LIFETIME"?"LIFETIME":p.days+"D"}</div><div style={{fontSize:11, marginTop:2}}>{p.desc}</div></div><b>›</b></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page==="files" && (
          <div style={{padding:14}}>
            {/* STATS */}
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}>
              <div style={{background:"white", border:"1px solid #eee", borderRadius:12, padding:10, textAlign:"center"}}><div style={{fontWeight:900}}>{photos.length}</div><div style={{fontSize:10}}>Photos</div></div>
              <div style={{background:"white", border:"1px solid #eee", borderRadius:12, padding:10, textAlign:"center"}}><div style={{fontWeight:900}}>{videos.length}</div><div style={{fontSize:10}}>Videos</div></div>
              <div style={{background:"white", border:"1px solid #eee", borderRadius:12, padding:10, textAlign:"center"}}><div style={{fontWeight:900}}>{docs.length}</div><div style={{fontSize:10}}>Docs</div></div>
            </div>

            {/* UPLOAD BOX */}
            <div style={{marginTop:12, border:"1.5px dashed #3b82f6", borderRadius:18, padding:16, textAlign:"center", background:"white"}}>
              <div style={{fontWeight:800}}>Upload - Auto Sort</div>
              <label style={{marginTop:10, background:"black", color:"white", padding:"12px 18px", borderRadius:12, display:"inline-block", fontWeight:700, cursor:"pointer"}}>Browse Files<input type="file" hidden onChange={handleUpload}/></label>
              <div style={{fontSize:11, marginTop:8, fontWeight:700, color: whatsappOn? "#16a34a":"#999"}}>WhatsApp Backup: {whatsappOn? "✅ AUTO ON - Roz 12 AM" : "🔒 Locked - PRO 99 / KING 690 lo"}</div>
            </div>

            {whatsappOn && <div style={{marginTop:10, background:"#16a34a", color:"white", borderRadius:12, padding:12, fontSize:12, fontWeight:800, textAlign:"center"}}>💬 WhatsApp Backup ACTIVE - Photos/Videos roz raat 12 baje backup honge</div>}
            {!whatsappOn && plan && <div style={{marginTop:10, background:"#fffbeb", border:"1px solid #f59e0b", borderRadius:12, padding:10, fontSize:11}}>⚠️ {plan} me WhatsApp backup nahi hai. PRO 99 lo to auto ON ho jayega.</div>}

            <div style={{marginTop:14, display:"flex", flexDirection:"column", gap:10}}>
              <div style={{background:"white", borderRadius:14, padding:12, border:"1px solid #eee"}}>
                <b>🖼️ Photos ({photos.length})</b>
                <div style={{marginTop:8, display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
                  {photos.length===0 && <div style={{fontSize:11, color:"#999"}}>No photos yet</div>}
                  {photos.map((p,i)=><div key={i} style={{borderRadius:10, overflow:"hidden", border:"1px solid #eee"}}><img src={p.url} style={{width:"100%", height:90, objectFit:"cover"}}/><div style={{padding:5, fontSize:9}}>{p.name.slice(0,12)} • {p.size}</div></div>)}
                </div>
              </div>
              <div style={{background:"white", borderRadius:14, padding:12, border:"1px solid #eee"}}>
                <b>🎬 Videos ({videos.length})</b>
                <div style={{marginTop:6}}>{videos.length===0 && <div style={{fontSize:11, color:"#999"}}>No videos yet</div>}{videos.map((v,i)=><div key={i} style={{fontSize:11, background:"#f9fafb", padding:6, borderRadius:6, marginTop:4, display:"flex", justifyContent:"space-between"}}><span>{v.name}</span><span>{v.size}</span></div>)}</div>
              </div>
              <div style={{background:"white", borderRadius:14, padding:12, border:"1px solid #eee"}}>
                <b>📁 Docs ({docs.length})</b>
                <div style={{marginTop:6}}>{docs.length===0 && <div style={{fontSize:11, color:"#999"}}>No docs yet</div>}{docs.map((d,i)=><div key={i} style={{fontSize:11, background:"#f9fafb", padding:6, borderRadius:6, marginTop:4, display:"flex", justifyContent:"space-between"}}><span>{d.name}</span><span>{d.size}</span></div>)}</div>
              </div>
            </div>

            {(plan==="FREE" || plan==="LITE 69") && <div style={{marginTop:12, background:"black", color:"white", borderRadius:12, padding:12, textAlign:"center", fontSize:11}}>📢 AD BOX - Upgrade to PRO 99 / KING 690 for No Ads + WhatsApp Backup</div>}
          </div>
        )}

        {page==="profile" && (
          <div style={{padding:14, display:"flex", flexDirection:"column", gap:12}}>
            <div style={{background:"#0f172a", color:"white", borderRadius:18, padding:16, textAlign:"center", border:"1px solid #1e293b"}}>
              <div style={{fontSize:10, opacity:0.6, letterSpacing:2}}>YOUR USER ID</div>
              <div style={{fontWeight:900, letterSpacing:2, fontSize:22, marginTop:4}}>{userId}</div>
              <div style={{marginTop:12, background:"white", color:"black", borderRadius:10, padding:10}}>
                <div style={{fontSize:10, opacity:0.6}}>BACKUP CODE (Screenshot le le)</div>
                <div style={{fontWeight:900, fontSize:18, letterSpacing:1, marginTop:4}}>{userId}-{backupCode}</div>
                <button onClick={()=>{navigator.clipboard.writeText(userId+"-"+backupCode); alert("Copied!")}} style={{marginTop:8, width:"100%", padding:8, borderRadius:8, border:"1px solid #ddd", fontWeight:700}}>Copy Code</button>
              </div>
              <div style={{fontSize:10, marginTop:10, opacity:0.6}}>Is code se dusre phone me login kar sakta hai</div>
            </div>

            <div style={{background:"white", borderRadius:14, padding:12, border:"1px solid #eee"}}>
              <b>🎁 Refer & Earn 10GB</b>
              <div style={{fontSize:11, color:"#666", marginTop:2}}>Dost ko bhej, dono ko 10GB milega</div>
              <div style={{marginTop:8, background:"#f9fafb", padding:10, borderRadius:10, textAlign:"center", fontWeight:900, letterSpacing:3, border:"1px dashed #ccc"}}>{userId}</div>
              <a href={`https://wa.me/?text=Join BharatCloud - Lifetime Free 5GB - Use my code ${userId} https://bharatcloud.store`} target="_blank" style={{display:"block", marginTop:8, background:"#25D366", color:"white", padding:12, borderRadius:10, textAlign:"center", textDecoration:"none", fontWeight:800}}>WhatsApp Share</a>
            </div>

            <div style={{background:"white", borderRadius:14, padding:12, border:"1px solid #eee"}}>
              <b>🆘 Help & Support</b>
              <a href="https://wa.me/919999999999?text=Hi BharatCloud Support - My ID is ${userId}" target="_blank" style={{display:"block", marginTop:10, background:"#f0fdf4", border:"1px solid #22c55e", padding:12, borderRadius:10, textDecoration:"none", color:"black", fontWeight:700}}>💬 WhatsApp Support - 24x7</a>
              <a href="mailto:support@bharatcloud.store?subject=Help - ${userId}" style={{display:"block", marginTop:8, background:"#eff6ff", border:"1px solid #3b82f6", padding:12, borderRadius:10, textDecoration:"none", color:"black", fontWeight:700}}>✉️ Email: support@bharatcloud.store</a>
              <div style={{marginTop:8, background:"#f9fafb", padding:10, borderRadius:10, fontSize:11, color:"#666"}}>🔐 Data Encrypted • Mumbai L2 Server<br/>📄 Terms • Privacy Policy</div>
            </div>

            <button onClick={()=>{ if(confirm("Logout?")) setPage("login") }} style={{background:"#fee2e2", color:"#ef4444", border:"1px solid #fecaca", padding:12, borderRadius:12, fontWeight:800}}>Logout</button>
          </div>
        )}

        <div style={{position:"fixed", bottom:0, left:0, right:0, maxWidth:430, margin:"0 auto", background:"white", borderTop:"1px solid #eee", display:"flex", justifyContent:"space-around", padding:"12px 0", zIndex:20}}>
          <span onClick={()=>setPage("home")} style={{fontWeight:page==="home"?800:400, cursor:"pointer"}}>Home</span>
          <span onClick={()=>setPage("files")} style={{fontWeight:page==="files"?800:400, cursor:"pointer"}}>Files {photos.length+videos.length+docs.length>0?`(${photos.length+videos.length+docs.length})`:""}</span>
          <span onClick={()=>setPage("profile")} style={{fontWeight:page==="profile"?800:400, cursor:"pointer"}}>Profile</span>
        </div>
      </div>
    </div>
  )
}