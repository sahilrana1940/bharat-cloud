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

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method!== "POST") return res.status(405).json({ error: "POST only" });

  const form = formidable({ keepExtensions: true, multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Parse error: " + err.message });
    }

    // koi bhi naam se aaye file pakad lega
    const firstKey = Object.keys(files)[0];
    if (!firstKey) return res.status(400).json({ error: "file field missing" });

    let file = files[firstKey];
    if (Array.isArray(file)) file = file[0];

    try {
      const fileStream = fs.createReadStream(file.filepath);
      const key = `${Date.now()}-${file.originalFilename || 'file.pdf'}`;

      await s3.send(new PutObjectCommand({
        Bucket: process.env.WASABI_BUCKET,
        Key: key,
        Body: fileStream,
        ContentType: file.mimetype || "application/octet-stream",
      }));

      const url = `https://${process.env.WASABI_BUCKET}.s3.ap-northeast-1.wasabisys.com/${key}`;
      return res.status(200).json({ ok: true, url });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  });
}