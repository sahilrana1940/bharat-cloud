import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true")

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Demo Login - yahi ID se login hoga
    if ((email === "admin@bharatcloud.com" && password === "123456") || 
        (email === "test@test.com" && password === "test123")) {
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      setIsLoggedIn(true);
      alert("Login Success!");
    } else {
      alert("Wrong ID Pass! \nUse: admin@bharatcloud.com / 123456");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }

  if (isLoggedIn) {
    return (
      <div style={{padding: "40px", textAlign: "center"}}>
        <h1>BharatCloud - Secure Storage</h1>
        <p>Logged in as: {localStorage.getItem("userEmail")}</p>
        <button onClick={handleLogout} style={{padding: "10px 20px", background: "#2b6cb0", color: "white", border: "none", borderRadius: "8px", cursor: "pointer"}}>Logout</button>
      </div>
    )
  }

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f7fafc"}}>
      <div style={{background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", width: "320px", textAlign: "center"}}>
        <h2 style={{color: "#2b6cb0"}}>BharatCloud</h2>
        <p>Desi Secure Storage</p>
        
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width: "100%", padding: "12px", margin: "8px 0", border: "1px solid #ddd", borderRadius: "8px"}} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{width: "100%", padding: "12px", margin: "8px 0", border: "1px solid #ddd", borderRadius: "8px"}} />
          <button type="submit" style={{width: "100%", padding: "12px", background: "#2b6cb0", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginTop: "10px"}}>Login</button>
        </form>

        <div style={{marginTop: "15px", fontSize: "12px", background: "#f0f0f0", padding: "10px", borderRadius: "5px"}}>
          <b>Demo ID Password:</b><br/>
          ID: admin@bharatcloud.com<br/>
          Pass: 123456
        </div>
      </div>
    </div>
  )
}

export default App;
