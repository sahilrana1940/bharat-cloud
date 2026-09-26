import { useState } from "react"

export default function Admin(){
  const [freeGB, setFreeGB] = useState(5)

  const [videos, setVideos] = useState([
    {id:"HOLD-01", user:"Ravi - FREE 5GB", reason:"AI Defaulter - Adult Content Detect", name:"ravi_party.mp4", size:"32MB", time:"10 min ago", status:"Hold - Review Pending"},
    {id:"HOLD-02", user:"Aman - LITE 69", reason:"Copyright - Song Detected", name:"aman_vlog_song.mp4", size:"89MB", time:"1 hr ago", status:"Hold - Customer ne dala tha"},
  ])

  const [backupReq, setBackupReq] = useState([
    {id:"BK-01", name:"Vikash Kumar", phone:"919876543210", plan:"KING 699", time:"2 min ago"},
    {id:"BK-02", name:"Aman Singh", phone:"919876500001", plan:"PRO 99", time:"10 min ago"},
  ])

  const [selectedBackup, setSelectedBackup] = useState(backupReq[0])

  const cutFreeGB = (gb) => {
    if(confirm(`${gb}GB kar du? Jin ka data ${gb}GB se upar hai unko auto notification jayega - 'Plan shift karo 69/99/699 me'`)){
      setFreeGB(gb)
      alert(`Done! 875 users ko notification chala gaya - 'Aapka storage ${gb}GB se upar hai, 69/99/699 me shift karo'`)
    }
  }

  return (
    <div style={{background:"#0e0e0e", minHeight:"180vh", color:"white", fontFamily:"Inter"}}>

      {/* 1. TOP PE - USER + REVENUE + KHARCHA - TUNE JO BOLA */}
      <div style={{background:"#0f0f0f", borderBottom:"1px solid #222", padding:"12px 16px"}}>
        <b>BHARAT CLOUD ADMIN V31 - TUNE JO BOLA WAHI ORDER 🇮🇳</b>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1.5fr", gap:10, marginTop:10}}>
          <div style={{background:"#151515", border:"1px solid #222", padding:12, borderRadius:10}}><small>👥 Total Users</small><div style={{fontSize:20, fontWeight:900}}>1247 Users</div><small style={{color:"#22c55e"}}>875 FREE - {freeGB}GB use kar rahe</small></div>
          <div style={{background:"#151515", border:"1px solid #22c55e", padding:12, borderRadius:10}}><small>💰 Ab Tak Payment Mili</small><div style={{fontSize:20, fontWeight:900}}>Rs 2,33,827</div><small>69: 222 | 99: 155 | 699: 36</small></div>
          <div style={{background:"#151515", border:"1px solid #222", padding:12, borderRadius:10}}><small>🔵 Is Mahine Kharcha</small><div style={{fontSize:20, fontWeight:900}}>Rs 11,000</div><small>HOT 110GB | COLD 80GB | -80% Save</small></div>
          <div style={{background:"#151515", border:"1px solid #22c55e", padding:12, borderRadius:10}}><small>🟢 Profit</small><div style={{fontSize:20, fontWeight:900, color:"#22c55e"}}>Rs 2,22,827</div><small>90.1% Margin</small></div>
          <div style={{background:"#151515", border:"2px solid #ff6a00", padding:12, borderRadius:10}}>
            <small>👥 FREE Use + Kam Karo - Tere Haath Me</small><div style={{fontSize:18, fontWeight:900, marginTop:4}}>{freeGB}GB pe 875 Users - 3.2TB / 4.3TB</div>
            <div style={{display:"flex", gap:6, marginTop:8}}>
              <button onClick={()=>cutFreeGB(5)} style={{flex:1, padding:7, borderRadius:6, border:"none", background:freeGB===5?"#22c55e":"#222", color:"white", fontWeight:700}}>5GB</button>
              <button onClick={()=>cutFreeGB(3)} style={{flex:1, padding:7, borderRadius:6, border:"none", background:freeGB===3?"#ef4444":"#ff6a00", color:"white", fontWeight:700}}>3GB Karo</button>
              <button onClick={()=>cutFreeGB(2)} style={{flex:1, padding:7, borderRadius:6, border:"none", background:"#222", color:"white"}}>2GB</button>
            </div>
            <small style={{fontSize:8, color:"#f59e0b", marginTop:6, display:"block"}}>3GB karte hi auto notification: "2-3GB se upar hai to 69/99/699 me shift karo"</small>
          </div>
        </div>
      </div>

      <div style={{display:"flex"}}>
        <div style={{width:150, background:"#0f0f0f", minHeight:"180vh", padding:10, borderRight:"1px solid #222"}}>
          <div style={{background:"#ff6a00", padding:8, borderRadius:6, fontSize:11}}>🏠 Dashboard</div>
          <div style={{marginTop:8, fontSize:10, lineHeight:2, background:"#151515", padding:8, borderRadius:8}}>FREE {freeGB}GB Locked<br/>875 users<br/>3.2TB / 4.3TB<br/>Auto Notif ON</div>
        </div>

        <div style={{flex:1, padding:12}}>

          {/* 2. REVENUE KA PURA DATA + SIDE ME NOTIFICATION + USER DETAIL - TUNE JO BOLA */}
          <div style={{display:"grid", gridTemplateColumns:"1.6fr 0.8fr", gap:12}}>
            <div style={{background:"#151515", borderRadius:10, padding:12, border:"1px solid #222"}}>
              <b>💰 Revenue Ka Pura Data - Neeche Aayega</b>
              <div style={{marginTop:8, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}>
                <div style={{background:"#0f0f0f", padding:10, borderRadius:8}}><small>LITE 69 - 25GB</small><div style={{fontWeight:900}}>222 Users</div><b>Rs 15,318</b></div>
                <div style={{background:"#0f0f0f", padding:10, borderRadius:8, border:"1px solid #ff6a00"}}><small>PRO 99 - 60GB HERO</small><div style={{fontWeight:900}}>155 Users</div><b>Rs 15,345</b></div>
                <div style={{background:"#0f0f0f", padding:10, borderRadius:8, border:"1px solid #f59e0b"}}><small>KING 699 - 100GB</small><div style={{fontWeight:900}}>36 Users</div><b style={{color:"#f59e0b"}}>Rs 25,164</b></div>
              </div>
              <div style={{marginTop:8, background:"#0a0a0a", padding:10, borderRadius:8, fontSize:11, display:"flex", justifyContent:"space-between"}}><span>Total Revenue + Ads</span><b>Rs 2,33,827</b><span>Cost -11k</span><b style={{color:"#22c55e"}}>Profit Rs 2,22,827</b></div>
            </div>

            <div style={{display:"flex", flexDirection:"column", gap:10}}>
              <div style={{background:"#151515", border:"2px solid #f59e0b", borderRadius:10, padding:10}}>
                <b style={{fontSize:11}}>🔔 Notification - Kisne Backup Manga - Side Me</b>
                {backupReq.map(b=>(
                  <div key={b.id} onClick={()=>setSelectedBackup(b)} style={{background:"#0f0f0f", padding:8, borderRadius:6, marginTop:6, cursor:"pointer", borderLeft:"3px solid #f59e0b"}}>
                    <div style={{fontSize:11, fontWeight:700}}>{b.name} - {b.plan}</div><small style={{fontSize:9}}>{b.time} - Backup code chahiye</small>
                  </div>
                ))}
              </div>
              <div style={{background:"#151515", border:"1px solid #222", borderRadius:10, padding:10}}>
                <b style={{fontSize:11}}>👤 User Detail - Side Me - Dashboard Ki</b>
                <div style={{marginTop:6, background:"#0f0f0f", padding:8, borderRadius:6, fontSize:10, lineHeight:1.8}}>
                  Selected: <b>{selectedBackup?.name}</b><br/>
                  Phone: <b>{selectedBackup?.phone}</b><br/>
                  Plan: <b>{selectedBackup?.plan}</b><br/>
                  FREE Users: 875<br/>
                  Paid: 413<br/>
                  Storage: 3.2TB / 4.3TB<br/>
                  Region: Mumbai IDC<br/>
                  <span style={{color:"#22c55e"}}>● All Healthy</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. AI DEFAULTER / HOLD VIDEO - TUNE JO BOLA */}
          <div style={{marginTop:12, background:"#151515", borderRadius:12, padding:12, border:"2px solid #ef4444"}}>
            <b>🚨 AI Defaulter / Hold Video - Customer Ne Dali Thi - Is Karan Hold Kiya</b><br/>
            <small style={{color:"#888", fontSize:10}}>Ye customer ne AI se upload kiya tha, AI ne hold kar diya, tere paas aayega - Ya to upload kar do data me ya delete mar do</small>
            <div style={{marginTop:10}}>
              {videos.map(v=>(
                <div key={v.id} style={{background:"#0f0f0f", padding:12, borderRadius:10, marginBottom:8, display:"flex", justifyContent:"space-between", borderLeft:"3px solid #ef4444"}}>
                  <div>
                    <div style={{fontSize:12, fontWeight:700}}>{v.name} - {v.size} - {v.time}</div>
                    <div style={{fontSize:11, marginTop:3}}>👤 {v.user} - Kaaran: <b style={{color:"#ef4444"}}>{v.reason}</b></div>
                    <small style={{color:"#f59e0b"}}>{v.status} - Tere paas aaya hai</small>
                  </div>
                  <div style={{display:"flex", gap:6}}>
                    <button onClick={()=>{setVideos(videos.map(x=> x.id===v.id? {...x, status:"Approved - Data Me Upload Kar Diya ✓"}:x))}} style={{padding:"8px 12px", borderRadius:8, border:"none", background:"#22c55e", color:"white", fontWeight:700, fontSize:11}}>📦 Data Me Upload Kar Do</button>
                    <button onClick={()=>setVideos(videos.filter(x=> x.id!==v.id))} style={{padding:"8px 12px", borderRadius:8, border:"none", background:"#222", color:"#ef4444", fontSize:11}}>🗑️ Yaha Se Delete Mar Do</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. BACKUP CODE */}
          <div style={{marginTop:12, background:"#151515", borderRadius:12, padding:12, border:"2px solid #22c55e"}}>
            <b>🔑 Backup Code - Uske Baad Aayega</b>
            <div style={{marginTop:8, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
              <div>
                {backupReq.map(b=>(
                  <div key={b.id} style={{background:"#0f0f0f", padding:10, borderRadius:8, marginBottom:6, borderLeft:"3px solid #22c55e"}}>
                    <div style={{fontSize:11, fontWeight:700}}>{b.name} - {b.phone} - {b.plan}</div>
                    <div style={{fontFamily:"monospace", fontSize:12, marginTop:4}}>BK-{Math.floor(Math.random()*9000)+1000}-XYZ</div>
                    <button onClick={()=>window.open(`https://wa.me/${b.phone}?text=Backup Code: BK-XXXX`,"_blank")} style={{marginTop:6, padding:"6px 10px", borderRadius:6, border:"none", background:"#25D366", color:"white", fontSize:11}}>WhatsApp SEND</button>
                  </div>
                ))}
              </div>
              <div style={{background:"#0a0a0a", border:"1px solid #222", borderRadius:8, padding:10, fontSize:11}}>
                <b>Logic:</b><br/>PRO 99 + KING 699 = FREE Backup ✓<br/>FREE + LITE 69 = Rs 99 Pay<br/><br/>Click karte hi naam + WhatsApp aa jayega - Jo tune bola wahi
              </div>
            </div>
          </div>

          {/* 5. LAST ME - PER DAY REVENUE / LOSS */}
          <div style={{marginTop:12, background:"#151515", borderRadius:12, padding:12, border:"1px solid #222"}}>
            <b>📈 Last Me - Per Day Revenue / Loss Kya Chal Raha Hai</b>
            <div style={{marginTop:8, display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", gap:8}}>
              <div style={{background:"#0f0f0f", padding:10, borderRadius:8, textAlign:"center"}}><small>Today</small><div style={{fontWeight:900, color:"#22c55e"}}>Rs 3,420</div><small style={{fontSize:9}}>+12% ↑</small></div>
              <div style={{background:"#0f0f0f", padding:10, borderRadius:8, textAlign:"center"}}><small>Yesterday</small><div style={{fontWeight:900}}>Rs 2,980</div><small style={{fontSize:9}}>Normal</small></div>
              <div style={{background:"#0f0f0f", padding:10, borderRadius:8, textAlign:"center"}}><small>This Week</small><div style={{fontWeight:900}}>Rs 18,400</div><small style={{fontSize:9}}>Avg 2.6k/day</small></div>
              <div style={{background:"#0f0f0f", padding:10, borderRadius:8, textAlign:"center"}}><small>This Month</small><div style={{fontWeight:900}}>Rs 91,000</div><small style={{fontSize:9}}>Target 1L</small></div>
              <div style={{background:"#0f0f0f", padding:10, borderRadius:8, textAlign:"center", border:"1px solid #ef4444"}}><small>Loss / Refund</small><div style={{fontWeight:900, color:"#ef4444"}}>Rs 0</div><small style={{fontSize:9}}>No Loss ✓</small></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}