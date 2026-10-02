const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    const base64 = reader.result.split(',')[1];
    const res = await fetch('https://www.bharatcloud.store/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        fileData: base64,
        contentType: file.type
      })
    });
    const data = await res.json();
    console.log(data);
    alert(data.success? `Uploaded: ${data.key}` : `Error: ${data.error}`);
  };
  reader.readAsDataURL(file);
};

// JSX me:
<input type="file" onChange={handleUpload} />