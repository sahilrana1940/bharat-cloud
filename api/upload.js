import Busboy from "busboy";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
export const config = { api: { bodyParser: false } };

const s3 = new S3Client({
  region: "ap-northeast-1",
  endpoint: "https://s3.ap-northeast-1.wasabisys.com",
  credentials: { accessKeyId: process.env.WASABI_ACCESS_KEY, secretAccessKey: process.env.WASABI_SECRET_KEY },
  forcePathStyle: true,
});

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (!process.env.WASABI_BUCKET) return res.status(500).json({ error: "Vercel ENV missing" });

  const busboy = Busboy({ headers: req.headers });
  let buffer = null; let name = ""; let mime = "";
  busboy.on("file", (field, file, info) => {
    name = info.filename; mime = info.mimeType;
    const chunks = []; file.on("data", d => chunks.push(d));
    file.on("end", () => buffer = Buffer.concat(chunks));
  });
  busboy.on("finish", async () => {
    if (!buffer) return res.status(400).json({ error: "file field missing" });
    const key = Date.now() + "-" + name;
    await s3.send(new PutObjectCommand({ Bucket: process.env.WASABI_BUCKET, Key: key, Body: buffer, ContentType: mime }));
    const url = `https://${process.env.WASABI_BUCKET}.s3.ap-northeast-1.wasabisys.com/${key}`;
    res.json({ ok: true, url });
  });
  req.pipe(busboy);
}