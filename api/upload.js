import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

const s3 = new S3Client({
  region: process.env.WASABI_REGION,
  endpoint: process.env.WASABI_ENDPOINT,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method!== "POST") return res.status(405).json({ error: "Method not allowed" });

  const form = formidable({ keepExtensions: true });

  try {
    const [fields, files] = await form.parse(req);

    let file = files.file;
    if (Array.isArray(file)) file = file[0];

    if (!file) return res.status(400).json({ error: "No file received" });

    // formidable v2 vs v3 compatibility
    const filePath = file.filepath || file.filepath;
    const originalName = file.originalFilename || file.originalFilename || "file";
    const mimeType = file.mimetype || "application/octet-stream";

    const fileBuffer = fs.readFileSync(filePath);
    const safeName = originalName.replace(/\s+/g, '-');
    const fileName = `${Date.now()}-${safeName}`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.WASABI_BUCKET,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
    }));

    // Apna proxy link dena hai, direct wasabi nahi (trial me public nahi hota)
    const fileUrl = `https://bharatcloud.store/api/download?key=${fileName}`;

    return res.status(200).json({ url: fileUrl });

  } catch (e) {
    console.error("UPLOAD ERROR:", e);
    return res.status(500).json({ error: e.message || "Upload failed" });
  }
}import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";
export const config = { api: { bodyParser: false } };

const s3 = new S3Client({
  region: process.env.WASABI_REGION,
  endpoint: process.env.WASABI_ENDPOINT,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
  },
});

export default async function handler(req, res) {
  const form = formidable({ keepExtensions: true });
  try {
    const [fields, files] = await form.parse(req);
    let file = files.file;
    if (Array.isArray(file)) file = file[0];
    if (!file) throw new Error("file nahi mili");

    const buffer = fs.readFileSync(file.filepath);
    const key = `${Date.now()}-${file.originalFilename.replace(/\s+/g,'-')}`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.WASABI_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.mimetype,
    }));

    const url = `https://${req.headers.host}/api/download?key=${key}`;
    return res.json({ url });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}