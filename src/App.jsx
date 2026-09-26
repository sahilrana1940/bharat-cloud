import { useState } from 'react'
function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = () => {
    if(email === "admin@bharatcloud.com" && password === "123456"){
      alert("Login Success!")
    } else {
      alert("Galat ID")
    }
  }
  return (
    <div style={{padding:"50px"}}>
      <h2>Login</h2>
      <input onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
export default App;
