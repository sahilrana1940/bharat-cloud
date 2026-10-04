import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.WASABI_REGION,
  endpoint: process.env.WASABI_ENDPOINT,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
  },
});

export default async function handler(req, res) {
  const { key } = req.query;
  if (!key) return res.status(400).send("No key");

  try {
    const data = await s3.send(new GetObjectCommand({
      Bucket: process.env.WASABI_BUCKET,
      Key: key,
    }));

    res.setHeader("Content-Type", data.ContentType || "application/octet-stream");
    res.setHeader("Content-Disposition", `inline; filename="${key}"`);

    // Stream the file
    data.Body.pipe(res);

  } catch (e) {
    console.error(e);
    return res.status(404).send("File not found");
  }
}