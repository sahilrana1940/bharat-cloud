import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method!== "POST") return res.status(405).json({ error: "POST only" });

  // Check ENV
  if (!process.env.WASABI_ACCESS_KEY ||!process.env.WASABI_BUCKET) {
    return res.status(500).json({ error: "ENV missing: WASABI keys not set in Vercel" });
  }

  try {
    const s3 = new S3Client({
      region: "ap-northeast-1",
      endpoint: "https://s3.ap-northeast-1.wasabisys.com",
      credentials: {
        accessKeyId: process.env.WASABI_ACCESS_KEY,
        secretAccessKey: process.env.WASABI_SECRET_KEY,
      },
      forcePathStyle: true,
    });

    const form = new formidable.IncomingForm({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Parse failed: " + err.message });

      const firstKey = Object.keys(files)[0];
      if (!firstKey) return res.status(400).json({ error: "file field missing" });

      let f = files[firstKey];
      if (Array.isArray(f)) f = f[0];

      try {
        const stream = fs.createReadStream(f.filepath);
        const s3Key = `${Date.now()}-${f.originalFilename}`;
        await s3.send(new PutObjectCommand({
          Bucket: process.env.WASABI_BUCKET,
          Key: s3Key,
          Body: stream,
          ContentType: f.mimetype || "application/octet-stream",
        }));
        const url = `https://${process.env.WASABI_BUCKET}.s3.ap-northeast-1.wasabisys.com/${s3Key}`;
        return res.status(200).json({ ok: true, url });
      } catch (e) {
        return res.status(500).json({ error: "S3 upload failed: " + e.message });
      }
    });

  } catch (e) {
    return res.status(500).json({ error: "Server crash: " + e.message });
  }
}