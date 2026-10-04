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
  if (req.method!== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const form = formidable({ keepExtensions: true, multiples: false });
    const [fields, files] = await form.parse(req);

    console.log("DEBUG FILES KEYS:", Object.keys(files));

    const fileKey = Object.keys(files)[0];
    if (!fileKey) {
      return res.status(400).json({ error: "file field missing", receivedKeys: Object.keys(files), fields });
    }

    let file = files[fileKey];
    if (Array.isArray(file)) file = file[0];

    const stream = fs.createReadStream(file.filepath);
    const s3Key = `${Date.now()}-${file.originalFilename || 'file'}`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.WASABI_BUCKET,
      Key: s3Key,
      Body: stream,
      ContentType: file.mimetype || "application/octet-stream",
    }));

    const url = `https://${process.env.WASABI_BUCKET}.s3.ap-northeast-1.wasabisys.com/${s3Key}`;
    return res.status(200).json({ ok: true, url });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}