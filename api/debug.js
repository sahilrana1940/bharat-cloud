export default function handler(req,res){
  res.json({
    hasKey: !!process.env.WASABI_ACCESS_KEY,
    hasSecret: !!process.env.WASABI_SECRET_KEY,
    bucket: process.env.WASABI_BUCKET || "MISSING",
    endpoint: process.env.WASABI_ENDPOINT || "MISSING",
    region: process.env.WASABI_REGION || "MISSING"
  })
}