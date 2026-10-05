export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, message: "Upload API working" });
  }

  if (req.method!== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Abhi ke liye test response - S3 baad me add karenge
  return res.status(200).json({
    ok: true,
    url: "https://bharatcloud.store/test-file-link.pdf",
    message: "Build fix done!"
  });
}