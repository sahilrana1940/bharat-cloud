import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'LIVE' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, fileData, contentType } = req.body;
    if (!fileName || !fileData) return res.status(400).json({ error: 'No file data' });

    const bucket = process.env.WASABI_BUCKET;
    const region = process.env.WASABI_REGION || 'ap-southeast-1';
    const endpoint = process.env.WASABI_ENDPOINT; // https://s3.ap-southeast-1.wasabisys.com hona chahiye

    if (!bucket || !endpoint) {
      return res.status(500).json({ error: 'Wasabi env missing' });
    }

    const s3 = new S3Client({
      region: region,
      endpoint: endpoint,
      credentials: {
        accessKeyId: process.env.WASABI_ACCESS_KEY,
        secretAccessKey: process.env.WASABI_SECRET_KEY,
      },
      forcePathStyle: false,
    });

    const buffer = Buffer.from(fileData, 'base64');
    const key = `uploads/${Date.now()}-${fileName}`;

    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType || 'application/octet-stream',
    }));

    return res.status(200).json({ success: true, key });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}