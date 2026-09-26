import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true")
  const [role, setRole] = useState(localStorage.getItem("role") || "")

  const handleLogin = (e) => {
    e.preventDefault();
    
    // ADMIN LOGIN
    if (email === "admin@bharatcloud.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("role", "admin");
      setRole("admin");
      setIsLoggedIn(true);
    } 
    // CLIENT LOGIN - koi bhi email/pass
    else if (email.includes("@") && password.length >= 3) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("role", "client");
      setRole("client");
      setIsLoggedIn(true);
    } else {
      alert("Galat ID Password!");
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  // LOGIN KE BAAD
  if (isLoggedIn) {
    const currentRole = localStorage.getItem("role");
    const userEmail = localStorage.getItem("userEmail");

    // ===== ADMIN DASHBOARD =====
    if (currentRole === "admin") {
      return (
        <div style={{padding: "20px"}}>
          <h1 style={{color: "#2b6cb0"}}>Admin Panel - BharatCloud</h1>
          <p>Admin: {userEmail} | <button onClick={handleLogout}>Logout</button></p>
          <hr/>
          <h3>All Clients</h3>
          <div style={{background: "#f7fafc", padding: "15px", borderRadius: "8px"}}>
            <p>1. client1@gmail.com - 3 Files</p>
            <p>2. client2@gmail.com - 1 File</p>
            <p>3. test@test.com - 0 Files</p>
          </div>
          <h3 style={{marginTop: "20px"}}>Storage Usage</h3>
          <p>Total Used: 5.2 GB / 100 GB</p>
        </div>
      )
    }

    // ===== CLIENT DASHBOARD =====
    return (
      <div style={{padding: "20px", textAlign: "center"}}>
        <h1>BharatCloud</h1>
        <p>Welcome Client: {userEmail}</p>
        <button onClick={handleLogout}>Logout</button>
        <div style={{marginTop: "20px", background: "#f0f0f0", padding: "20px", borderRadius: "10px"}}>
          <h3>My Files</h3>
          <p>Abhi koi file nahi hai. Upload karo.</p>
          <button style={{padding: "10px", background: "#2b6cb0", color: "white", border: "none", borderRadius: "5px"}}> + Upload File</button>
        </div>
      </div>
    )
  }

  // ===== LOGIN PAGE =====
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f7fafc"}}>
      <div style={{background: "white", padding: "30px", borderRadius: "12px", width: "320px", textAlign: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.1)"}}>
        <h2 style={{color: "#2b6cb0"}}>BharatCloud</h2>
        <p>Atmanirbhar Secure Storage</p>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width: "100%", padding: "12px", margin: "8px 0", borderRadius: "8px", border: "1px solid #ddd"}}/>
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required style={{width: "100%", padding: "12px", margin: "8px 0", borderRadius: "8px", border: "1px solid #ddd"}}/>
          <button type="submit" style={{width: "100%", padding: "12px", background: "#2b6cb0", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold"}}>Login</button>
        </form>
        <div style={{marginTop: "15px", fontSize: "11px", background: "#f0f0f0", padding: "10px", textAlign: "left", borderRadius: "5px"}}>
          <b>Admin:</b> admin@bharatcloud.com / 123456<br/>
          <b>Client:</b> koi bhi email + koi bhi pass (min 3 char)
        </div>
      </div>
    </div>
  )
}

export default App;
