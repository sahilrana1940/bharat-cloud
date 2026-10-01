import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

export default async function handler(req, res) {
  try {
    const s3 = new S3Client({
      region: "ap-northeast-1",
      endpoint: "https://s3.ap-northeast-1.wasabisys.com",
      credentials: {
        accessKeyId: process.env.WASABI_ACCESS_KEY,
        secretAccessKey: process.env.WASABI_SECRET_KEY,
      },
    })
    await s3.send(new PutObjectCommand({
      Bucket: process.env.WASABI_BUCKET,
      Key: `test/${Date.now()}.txt`,
      Body: "Bharat Cloud Live from Akhnoor!",
    }))
    res.json({ msg: "✅ Backup ho gaya Wasabi me!" })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}