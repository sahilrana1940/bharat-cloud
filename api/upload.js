import { formidable } from "formidable";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method!== "POST") return res.status(405).json({ error: "POST only" });

  const region = process.env.WASABI_REGION || "ap-northeast-1";
  // Tumne WASABI_ENDPOINT add kiya hai, usko use karenge
  const endpoint = (process.env.WASABI_ENDPOINT || `https://s3.${region}.wasabisys.com`).replace(/\/$/, "");

  const s3 = new S3Client({
    region,
    endpoint,
    credentials: {
      accessKeyId: process.env.WASABI_ACCESS_KEY,
      secretAccessKey: process.env.WASABI_SECRET_KEY,
    },
    forcePathStyle: true,
  });

  const form = formidable({ keepExtensions: true, maxFileSize: 50 * 1024 * 1024 });

  try {
    const [fields, files] = await form.parse(req);
    let f = files.file;
    if (Array.isArray(f)) f = f[0];
    if (!f) {
      const firstKey = Object.keys(files)[0];
      f = files[firstKey];
      if (Array.isArray(f)) f = f[0];
    }
    if (!f) return res.status(400).json({ error: "file field missing" });

    // FIX: Stream ki jagah Buffer - Vercel pe yehi chalta hai
    const fileBuffer = fs.readFileSync(f.filepath);
    const Key = `${Date.now()}-${f.originalFilename.replace(/\s+/g, "-")}`;

    console.log(`Uploading ${Key} size ${fileBuffer.length} to ${process.env.WASABI_BUCKET}`);

    await s3.send(new PutObjectCommand({
      Bucket: process.env.WASABI_BUCKET,
      Key,
      Body: fileBuffer,
      ContentType: f.mimetype || "application/octet-stream",
      ContentLength: fileBuffer.length,
    }));

    // temp file delete
    try { fs.unlinkSync(f.filepath); } catch {}

    const publicUrl = `${endpoint}/${process.env.WASABI_BUCKET}/${Key}`;
    console.log("SUCCESS:", publicUrl);
    return res.json({ ok: true, url: publicUrl });

  } catch (e) {
    console.error("FAIL:", e);
    return res.status(500).json({ error: e.message });
  }
}