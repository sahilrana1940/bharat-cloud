const res = await fetch('/api/upload', { method: 'POST', body: formData });
const data = await res.json();
console.log("SERVER RESPONSE:", data); // ye console me dekhna
if (data.url) setLink(data.url);
else setLink(data.error || "Upload failed");