import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method!== "POST") {
    return res.status(200).json({ ok: true, msg: "POST karo file ke saath" });
  }

  try {
    const form = formidable({ multiples: false });
    const [fields, files] = await form.parse(req);
    const file = files.file?.[0] || files.file;

    if (!file) return res.status(400).json({ error: "No file" });

    const s3 = new S3Client({
      region: process.env.WASABI_REGION || "ap-northeast-1",
      endpoint: process.env.WASABI_ENDPOINT,
      credentials: {
        accessKeyId: process.env.WASABI_ACCESS_KEY,
        secretAccessKey: process.env.WASABI_SECRET_KEY,
      },
      forcePathStyle: true,
    });

    const buffer = fs.readFileSync(file.filepath);
    const key = `${Date.now()}-${file.originalFilename}`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.WASABI_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.mimetype,
    }));

    const url = `${process.env.WASABI_ENDPOINT}/${process.env.WASABI_BUCKET}/${key}`;
    return res.status(200).json({ ok: true, url, key });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}