function App() {
  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <div style={{height: '6px', background: 'linear-gradient(to right, orange, white, green)'}}></div>
      
      <nav style={{display:'flex', justifyContent:'space-between', padding:'16px', maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{fontWeight:'900', fontSize:'22px'}}>☁️ BharatCloud.store</div>
        <div style={{background:'#ea580c', color:'white', padding:'8px 16px', borderRadius:'10px', fontWeight:'bold'}}>Dashboard</div>
      </nav>

      <div style={{textAlign:'center', padding:'40px 20px', maxWidth:'1100px', margin:'0 auto'}}>
        <h1 style={{fontSize:'42px', fontWeight:'900'}}>India's Own <span style={{color:'#ea580c'}}>Cloud</span></h1>
        <p style={{color:'#666'}}>Free me ads, Paid me no tension 🇮🇳</p>

        <h3 style={{textAlign:'left', marginTop:'40px', color:'#666'}}>🔶 WITH ADS</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', marginTop:'10px'}}>
          <div style={{border:'1px solid #ddd', padding:'16px', borderRadius:'16px', textAlign:'left'}}>
            <span style={{background:'#fee2e2', color:'#dc2626', fontSize:'10px', padding:'4px 8px', borderRadius:'20px', fontWeight:'bold'}}>HEAVY ADS</span>
            <p style={{fontWeight:'bold', marginTop:'8px'}}>FREE 3GB</p>
            <p style={{fontSize:'28px', fontWeight:'900'}}>₹0</p>
            <p style={{fontSize:'12px', color:'#666'}}>Har 2 click pe ad</p>
          </div>
          <div style={{border:'1px solid #ddd', padding:'16px', borderRadius:'16px', textAlign:'left'}}>
            <span style={{background:'#fef9c3', fontSize:'10px', padding:'4px 8px', borderRadius:'20px', fontWeight:'bold'}}>LIMITED ADS</span>
            <p style={{fontWeight:'bold', marginTop:'8px'}}>Student 50GB</p>
            <p style={{fontSize:'28px', fontWeight:'900'}}>₹49</p>
          </div>
          <div style={{border:'1px solid #ddd', padding:'16px', borderRadius:'16px', textAlign:'left'}}>
            <span style={{background:'#fef9c3', fontSize:'10px', padding:'4px 8px', borderRadius:'20px', fontWeight:'bold'}}>LIMITED ADS</span>
            <p style={{fontWeight:'bold', marginTop:'8px'}}>Starter 100GB</p>
            <p style={{fontSize:'28px', fontWeight:'900'}}>₹79</p>
          </div>
        </div>

        <h3 style={{textAlign:'left', marginTop:'30px', color:'#15803d'}}>✅ NO ADS - HERO</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', marginTop:'10px'}}>
          <div style={{border:'2px solid #ea580c', padding:'16px', borderRadius:'16px', textAlign:'left', background:'#fff7ed'}}>
            <span style={{background:'#16a34a', color:'white', fontSize:'10px', padding:'4px 8px', borderRadius:'20px', fontWeight:'bold'}}>NO ADS ⭐ BESTSELLER</span>
            <p style={{fontWeight:'bold', marginTop:'8px'}}>Pro 250GB</p>
            <p style={{fontSize:'28px', fontWeight:'900', color:'#ea580c'}}>₹99</p>
          </div>
          <div style={{border:'1px solid #ddd', padding:'16px', borderRadius:'16px', textAlign:'left'}}>
            <span style={{background:'#16a34a', color:'white', fontSize:'10px', padding:'4px 8px', borderRadius:'20px'}}>NO ADS</span>
            <p style={{fontWeight:'bold', marginTop:'8px'}}>Yearly 1TB</p>
            <p style={{fontSize:'28px', fontWeight:'900'}}>₹999</p>
          </div>
          <div style={{border:'1px solid #ddd', padding:'16px', borderRadius:'16px', textAlign:'left'}}>
            <span style={{background:'#16a34a', color:'white', fontSize:'10px', padding:'4px 8px', borderRadius:'20px'}}>NO ADS</span>
            <p style={{fontWeight:'bold', marginTop:'8px'}}>Family 2TB</p>
            <p style={{fontSize:'28px', fontWeight:'900'}}>₹599</p>
          </div>
        </div>

        <div style={{marginTop:'40px', border:'2px dashed #ccc', padding:'30px', borderRadius:'16px', background:'#f9fafb'}}>
          <h2>📁 File Upload - Jaldi aayega</h2>
          <p style={{color:'#666', fontSize:'14px'}}>Upload logic agle step me jodenge</p>
        </div>
      </div>
    </div>
  )
}
export default App;
