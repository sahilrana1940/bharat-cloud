import { formidable } from "formidable";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  // Auto-fix: agar user ne REGION me URL daal diya ho toh usko sahi kar do
  let region = process.env.WASABI_REGION || "ap-northeast-1";
  if (region.includes("http") || region.includes("wasabisys.com")) {
    region = "ap-northeast-1";
  }
  region = region.trim();

  let endpoint = process.env.WASABI_ENDPOINT || `https://s3.${region}.wasabisys.com`;
  if (!endpoint.startsWith("http")) {
    endpoint = `https://s3.${region}.wasabisys.com`;
  }
  endpoint = endpoint.replace(/\/$/, "");

  console.log("FINAL ENV:", { region, endpoint, bucket: process.env.WASABI_BUCKET });

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
      const k = Object.keys(files)[0];
      f = Array.isArray(files[k]) ? files[k][0] : files[k];
    }
    if (!f) return res.status(400).json({ error: "file field missing" });

    const fileBuffer = fs.readFileSync(f.filepath);
    const Key = `${Date.now()}-${f.originalFilename.replace(/\s+/g, "-")}`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.WASABI_BUCKET,
      Key,
      Body: fileBuffer,
      ContentType: f.mimetype || "application/octet-stream",
      ContentLength: fileBuffer.length,
    }));

    try { fs.unlinkSync(f.filepath); } catch {}

    const publicUrl = `${endpoint}/${process.env.WASABI_BUCKET}/${Key}`;
    return res.json({ ok: true, url: publicUrl });
  } catch (e) {
    console.error("FAIL:", e.message);
    return res.status(500).json({ error: e.message });
  }
}