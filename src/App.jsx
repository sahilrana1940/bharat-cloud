import { useState } from 'react'

function App() {
  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    setLink("")
    const formData = new FormData()
    formData.append("file", file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setLink(data.url);
      else setLink(data.error || "Upload failed");
    } catch (err) {
      setLink("Error: " + err.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Bharat Cloud</h1>
      <input type="file" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
      {link && <p style={{ wordBreak: 'break-all' }}>{link}</p>}
    </div>
  )
}

export default App;