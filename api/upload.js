import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

const s3 = new S3Client({
  region: "ap-northeast-1",
  endpoint: "https://s3.ap-northeast-1.wasabisys.com",
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
  },
  forcePathStyle: true,
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method!== "POST") return res.status(405).json({ error: "Use POST" });

  const form = formidable({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });
    const file = files.file;
    if (!file) return res.status(400).json({ error: "file field missing" });
    const f = Array.isArray(file)? file[0] : file;
    const stream = fs.createReadStream(f.filepath);
    const key = `${Date.now()}-${f.originalFilename}`;
    try {
      await s3.send(new PutObjectCommand({
        Bucket: process.env.WASABI_BUCKET,
        Key: key,
        Body: stream,
        ContentType: f.mimetype || "application/octet-stream",
      }));
      const url = `https://${process.env.WASABI_BUCKET}.s3.ap-northeast-1.wasabisys.com/${key}`;
      return res.json({ ok: true, url });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
}