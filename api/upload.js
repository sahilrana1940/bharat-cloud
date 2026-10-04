import { formidable } from "formidable";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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
  if (req.method!== "POST") return res.status(405).json({ error: "POST only" });

  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    let f = files.file || files.files || Object.values(files)[0];
    if (Array.isArray(f)) f = f[0];
    if (!f) return res.status(400).json({ error: "file field missing" });

    const stream = fs.createReadStream(f.filepath);
    const Key = Date.now() + "-" + f.originalFilename;
    await s3.send(new PutObjectCommand({
      Bucket: process.env.WASABI_BUCKET,
      Key, Body: stream, ContentType: f.mimetype
    }));
    const url = `https://${process.env.WASABI_BUCKET}.s3.ap-northeast-1.wasabisys.com/${Key}`;
    res.json({ ok: true, url });
  });
}