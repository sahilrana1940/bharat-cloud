import { useState } from 'react'

export default function App() {
  const [role, setRole] = useState('company') // company | superadmin
  const [company, setCompany] = useState({ name: 'Akhnoor Pvt Ltd', domain: 'akhnoor.com', users: 50, used: '342 GB / 1 TB' })
  const [employees, setEmployees] = useState([
    { id: 1, email: 'sahil@akhnoor.com', gmail: '12GB', drive: '20GB', status: 'Backed up', lastBackup: 'Today 2 AM' },
    { id: 2, email: 'rahul@akhnoor.com', gmail: '4GB', drive: '35GB', status: 'Pending', lastBackup: '2 days ago' },
    { id: 3, email: 'accounts@akhnoor.com', gmail: '25GB', drive: '5GB', status: 'Backed up', lastBackup: 'Today 2 AM' },
  ])

  return (
    <div style={{minHeight:'100vh', background:'#f1f3f6', fontFamily:'Arial'}}>
      {/* HEADER */}
      <div style={{background:'#111', color:'#fff', padding:'15px 25px', display:'flex', justifyContent:'space-between'}}>
        <b>BharatCloud B2B</b>
        <span>{company.name} - {company.domain}</span>
      </div>

      <div style={{display:'flex'}}>
        {/* SIDEBAR */}
        <div style={{width:'220px', background:'#fff', minHeight:'100vh', padding:'20px', borderRight:'1px solid #ddd'}}>
          <p style={{fontWeight:'bold'}}>Company Admin</p>
          <div style={{marginTop:'20px'}}>
            <div style={{padding:'10px', background:'#e8f0fe', borderRadius:'8px'}}>📊 Dashboard</div>
            <div style={{padding:'10px', marginTop:'8px'}}>👥 Employees (50)</div>
            <div style={{padding:'10px', marginTop:'8px'}}>💾 Storage - {company.used}</div>
            <div style={{padding:'10px', marginTop:'8px'}}>⚙️ Billing - ₹24,950/mo</div>
            <div style={{padding:'10px', marginTop:'8px'}}>📜 Compliance Vault</div>
          </div>
          <div style={{marginTop:'30px', background:'#111', color:'#fff', padding:'12px', borderRadius:'8px', textAlign:'center'}}>
            <small>Current Plan</small><br/><b>BUSINESS - 1TB / User</b>
          </div>
        </div>

        {/* MAIN */}
        <div style={{flex:1, padding:'25px'}}>
          {/* STATS */}
          <div style={{display:'flex', gap:'15px'}}>
            <div style={{flex:1, background:'#fff', padding:'15px', borderRadius:'12px'}}><small>Total Users</small><h2>{company.users}</h2></div>
            <div style={{flex:1, background:'#fff', padding:'15px', borderRadius:'12px'}}><small>Storage Used</small><h2>{company.used}</h2></div>
            <div style={{flex:1, background:'#fff', padding:'15px', borderRadius:'12px'}}><small>Risk Users</small><h2 style={{color:'red'}}>2 Users</h2></div>
            <div style={{flex:1, background:'#fff', padding:'15px', borderRadius:'12px'}}><small>Backup Status</small><h2 style={{color:'green'}}>92% Done</h2></div>
          </div>

          {/* EMPLOYEE TABLE */}
          <div style={{background:'#fff', marginTop:'20px', borderRadius:'12px', padding:'20px'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <h3>Employee Backups</h3>
              <button style={{padding:'8px 15px', background:'#1a73e8', color:'#fff', border:'none', borderRadius:'8px'}}>Backup All Now</button>
            </div>

            <table style={{width:'100%', marginTop:'15px', borderCollapse:'collapse'}}>
              <thead><tr style={{textAlign:'left', borderBottom:'1px solid #eee', color:'#666'}}><th style={{padding:'10px'}}>Email</th><th>Gmail</th><th>Drive</th><th>Last Backup</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {employees.map(emp=>(
                  <tr key={emp.id} style={{borderBottom:'1px solid #f1f1f1'}}>
                    <td style={{padding:'12px'}}>{emp.email}</td>
                    <td>{emp.gmail}</td>
                    <td>{emp.drive}</td>
                    <td>{emp.lastBackup}</td>
                    <td><span style={{background: emp.status==='Backed up' ? '#e8f5e9' : '#fff3e0', padding:'4px 8px', borderRadius:'6px', fontSize:'12px'}}>{emp.status}</span></td>
                    <td><button style={{padding:'6px 10px', border:'1px solid #ddd', borderRadius:'6px'}}>Restore</button></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{marginTop:'20px', padding:'15px', background:'#fff8e1', borderRadius:'8px', fontSize:'13px'}}>
              <b>⚠️ Compliance Alert:</b> rahul@akhnoor.com ne 2 din se backup off kiya hua hai. Auto backup fail ho raha hai. <a href="#">Fix Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}