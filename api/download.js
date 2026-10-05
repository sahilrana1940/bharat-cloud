import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
const s3 = new S3Client({
  region: process.env.WASABI_REGION,
  endpoint: process.env.WASABI_ENDPOINT,
  credentials: { accessKeyId: process.env.WASABI_ACCESS_KEY, secretAccessKey: process.env.WASABI_SECRET_KEY },
  forcePathStyle: true,
});
export default async function handler(req, res) {
  try {
    const data = await s3.send(new GetObjectCommand({ Bucket: process.env.WASABI_BUCKET, Key: req.query.key }));
    res.setHeader("Content-Type", data.ContentType);
    res.setHeader("Content-Disposition", `attachment; filename="${req.query.key}"`);
    data.Body.pipe(res);
  } catch (e) { res.status(500).json({ error: e.message }); }
}