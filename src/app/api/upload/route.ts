import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3 = new S3Client({
  region: process.env.WASABI_REGION!,
  endpoint: `https://s3.${process.env.WASABI_REGION}.wasabisys.com`,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY!,
    secretAccessKey: process.env.WASABI_SECRET_KEY!,
  },
})

export async function POST(req: Request) {
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File
  if (!file) return Response.json({ msg: "No file" })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  await s3.send(new PutObjectCommand({
    Bucket: process.env.WASABI_BUCKET!,
    Key: `akhnoor-demo/${Date.now()}-${file.name}`,
    Body: buffer,
  }))

  return Response.json({ msg: `✅ ${file.name} Backup ho gaya Wasabi me!` })
}