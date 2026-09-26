import { useState, useEffect, useRef } from 'react';

function App() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [dragOver, setDragOver] = useState(false);
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
      url: URL.createObjectURL(f),
      uploadedAt: new Date().toLocaleString()
    }));
    setTimeout(() => {
      const updated = [...newFiles,...files];
      setFiles(updated);
      localStorage.setItem('bharatcloud_files', JSON.stringify(updated));
      setUploading(false);
    }, 1200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const deleteFile = (id) => {
    const updated = files.filter(f => f.id!== id);
    setFiles(updated);
    localStorage.setItem('bharatcloud_files', JSON.stringify(updated));
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">B</div>
            <div>
              <h1 className="font-bold text-[16px]">BharatCloud</h1>
              <p className="text-[11px] text-white/50">R2 POWERED • SECURE</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">● Login Success</span>
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="text-xs px-4 py-1.5 rounded-full bg-white/10">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex gap-3">
          <div className="flex-1 relative">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search your files..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 outline-none text-sm" />
            <span className="absolute left-4 top-3.5 text-white/30">⌕</span>
          </div>
          <div className="text-xs px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60">{filteredFiles.length} Files</div>
        </div>

        <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className={`cursor-pointer bg-white/5 border-2 border-dashed rounded-[20px] p-8 ${dragOver? 'border-white bg-white/10' : 'border-white/10'}`}>
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white text-black flex items-center justify-center text-2xl mb-4">{uploading? '↻' : '↑'}</div>
            <h3 className="font-semibold">{uploading? 'Uploading...' : 'Drag & Drop files here'}</h3>
            <p className="text-sm text-white/40 mt-1">or click to browse</p>
            <div className="mt-4 inline-flex px-5 py-2 rounded-full bg-white text-black text-sm font-medium">Choose File</div>
            <input ref={fileInputRef} type="file" multiple hidden onChange={(e) => handleFileSelect(e.target.files)} />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredFiles.map(file => (
            <div key={file.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h4 className="font-medium text-sm truncate">{file.name}</h4>
              <p className="text-[11px] text-white/40 mt-1">{file.size} • {file.uploadedAt}</p>
              <div className="mt-3 flex gap-2">
                <a href={file.url} target="_blank" className="flex-1 text-center text-xs py-2 rounded-full bg-white text-black">Preview</a>
                <a href={file.url} download={file.name} className="flex-1 text-center text-xs py-2 rounded-full bg-white/10">Download</a>
              </div>
              <button onClick={() => deleteFile(file.id)} className="mt-2 w-full text-xs py-1 rounded-full bg-red-500/20 text-red-400">Delete</button>
            </div>
          ))}
        </div>
        {filteredFiles.length === 0 && <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-16 text-center text-white/40">No files yet</div>}
      </main>
    </div>
  );
}
export default App;
