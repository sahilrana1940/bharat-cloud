import { useState } from 'react'

export default function Admin() {
  const [id, setId] = useState('')
  const [pass, setPass] = useState('')
  const [login, setLogin] = useState(false)

  const handleLogin = () => {
    if (id === 'admin' && pass === 'Bharat@123') {
      setLogin(true)
    } else {
      alert('Galat ID Password hai bhai')
    }
  }

  if (!login) {
    return (
      <div style={{padding: '50px'}}>
        <h2>bharatcloud.store - Admin Login</h2>
        <input placeholder="ID" onChange={(e)=>setId(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)} /><br/><br/>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome Admin!</h1>
      <p style={{color: 'gray'}}>Dashboard yahan ayega</p>
    </div>
  )
}