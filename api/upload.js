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

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Parse error" });
    const file = files.file[0] || files.file;
    if (!file) return res.status(400).json({ error: "No file" });

    const fileBuffer = fs.readFileSync(file.filepath);
    const fileName = `${Date.now()}-${file.originalFilename.replace(/\s+/g, '-')}`;

    try {
      await s3.send(new PutObjectCommand({
        Bucket: process.env.WASABI_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.mimetype,
      }));

      // Ab direct Wasabi link nahi, apni hi website ka link denge
      const fileUrl = `https://bharatcloud.store/api/download?key=${fileName}`;
      return res.status(200).json({ url: fileUrl, key: fileName });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  });
}