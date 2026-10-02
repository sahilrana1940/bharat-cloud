import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.WASABI_REGION || 'ap-northeast-1',
  endpoint: process.env.WASABI_ENDPOINT || 'https://s3.ap-northeast-1.wasabisys.com',
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
  },
  forcePathStyle: true,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') return res.status(200).json({ status: 'LIVE', wasabi: 'ready' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { fileName, fileData, contentType } = req.body;
    if (!fileName || !fileData) return res.status(400).json({ error: 'fileName and fileData required' });
    
    const buffer = Buffer.from(fileData, 'base64');
    const key = 'uploads/' + Date.now() + '-' + fileName;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.WASABI_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType || 'application/octet-stream',
    }));

    return res.status(200).json({ success: true, key, url: process.env.WASABI_ENDPOINT + '/' + process.env.WASABI_BUCKET + '/' + key });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
