import { useState, useEffect, useRef } from 'react';

function App() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bharatcloud_files') || '[]');
    setFiles(saved);
  }, []);

  const handleFileSelect = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    setUploading(true);
    const newFiles = Array.from(selectedFiles).map(f => ({
      id: Date.now() + Math.random(),
      name: f.name,
      size: (f.size / 1024).toFixed(2) + ' KB',
      type: f.type,
    }));
    const updated = [...newFiles, ...files];
    setFiles(updated);
    localStorage.setItem('bharatcloud_files', JSON.stringify(updated));
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
      
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <div className="font-black text-2xl">☁️ BharatCloud<span className="text-green-600">.store</span></div>
      </nav>

      {/* PRICING - 6 PLANS */}
      <section className="px-6 py-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-center">India's Own <span className="text-orange-600">Cloud</span></h1>
        <p className="text-center text-gray-500 mt-2">Free me ads, Paid me no tension 🇮🇳</p>

        <h3 className="font-bold mt-8 mb-3 text-gray-500">🔶 WITH ADS - Sasta</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-2xl p-5"><span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">HEAVY ADS</span><h3 className="font-bold mt-2">FREE 3GB</h3><p className="text-3xl font-black">₹0</p><p className="text-xs text-gray-500">Har 2 click pe Video Ad</p></div>
          <div className="border rounded-2xl p-5"><span className="text-xs bg-yellow-100 px-2 py-1 rounded-full font-bold">LIMITED ADS</span><h3 className="font-bold mt-2">Student 50GB</h3><p className="text-3xl font-black">₹49</p><p className="text-xs text-gray-500">Sirf banner</p></div>
          <div className="border rounded-2xl p-5"><span className="text-xs bg-yellow-100 px-2 py-1 rounded-full font-bold">LIMITED ADS</span><h3 className="font-bold mt-2">Starter 100GB</h3><p className="text-3xl font-black">₹79</p><p className="text-xs text-gray-500">Banner only</p></div>
        </div>

        <h3 className="font-bold mt-8 mb-3 text-green-700">✅ NO ADS - HERO</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border-2 border-orange-500 rounded-2xl p-5 bg-orange-50 shadow-lg"><span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full font-bold">NO ADS ⭐ BESTSELLER</span><h3 className="font-bold mt-2">Pro 250GB</h3><p className="text-3xl font-black text-orange-600">₹99</p><p className="text-xs">Ad-free full maza</p></div>
          <div className="border-2 rounded-2xl p-5"><span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">NO ADS</span><h3 className="font-bold mt-2">Yearly 1TB</h3><p className="text-3xl font-black">₹999</p><p className="text-xs text-gray-500">2 months FREE</p></div>
          <div className="border-2 rounded-2xl p-5"><span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">NO ADS FAMILY</span><h3 className="font-bold mt-2">Family 2TB</h3><p className="text-3xl font-black">₹599</p><p className="text-xs text-gray-500">5 Users</p></div>
        </div>
      </section>

      {/* FILE UPLOAD - TERA PURANA LOGIC */}
      <section className="px-6 py-8 max-w-6xl mx-auto bg-gray-50 rounded-2xl mt-6">
        <h2 className="text-2xl font-bold mb-4">📁 My Files - Upload Karo</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white"
          onClick={() => fileInputRef.current.click()}
        >
          <p className="font-bold">Click to Upload or Drag & Drop</p>
          <input type="file" multiple ref={fileInputRef} className="hidden" onChange={(e) => handleFileSelect(e.target.files)} />
          {uploading && <p className="text-orange-600 mt-2">Uploading...</p>}
        </div>
        <div className="mt-4">
          {files.length === 0 ? <p className="text-gray-400 text-center">Koi file nahi hai</p> :
            files.map(f => (
              <div key={f.id} className="flex justify-between bg-white p-3 rounded-lg mt-2 border">
                <span>{f.name}</span><span className="text-xs text-gray-500">{f.size}</span>
              </div>
            ))
          }
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-gray-400 border-t mt-10">© 2026 BharatCloud.store 🇮🇳</footer>
    </div>
  )
}

export default App;
