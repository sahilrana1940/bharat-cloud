export default function handler(req,res){
  res.json({
    key: !!process.env.WASABI_ACCESS_KEY,
    secret: !!process.env.WASABI_SECRET_KEY,
    bucket: process.env.WASABI_BUCKET || "MISSING",
    endpoint: process.env.WASABI_ENDPOINT || "MISSING",
    region: process.env.WASABI_REGION || "MISSING",
    all_keys: Object.keys(process.env).filter(k=>k.includes("WASABI"))
  })
}