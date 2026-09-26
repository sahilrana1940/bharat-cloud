// app/page.tsx - BharatCloud FINAL
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-black text-2xl">
          <span>☁️</span> BharatCloud<span className="text-green-600">.store</span>
        </div>
        <a href="/dashboard" className="px-5 py-2.5 bg-orange-600 text-white rounded-xl font-bold">Dashboard</a>
      </nav>

      <section className="px-6 py-12 text-center max-w-6xl mx-auto">
        <h1 className="text-5xl font-black">India's Own <span className="text-orange-600">Cloud</span></h1>
        <p className="text-gray-500 mt-3">Free me ads, Paid me no tension 🇮🇳</p>

        <h3 className="font-bold mt-12 mb-4 text-left text-gray-500">🔶 WITH ADS - Sasta</h3>
        <div className="grid md:grid-cols-3 gap-5 text-left">
          <div className="border rounded-2xl p-6">
            <span className="text-[11px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">HEAVY ADS</span>
            <h3 className="font-bold mt-3">FREE</h3>
            <p className="text-3xl font-black">₹0 <span className="text-sm font-normal">/ 3GB</span></p>
            <p className="text-xs text-gray-500 mt-2">Har 2 click pe Video Ad</p>
            <button className="mt-5 w-full py-2.5 border-2 rounded-xl font-bold">Start Free</button>
          </div>
          <div className="border rounded-2xl p-6">
            <span className="text-[11px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold">LIMITED ADS</span>
            <h3 className="font-bold mt-3">Student</h3>
            <p className="text-3xl font-black">₹49 <span className="text-sm font-normal">/ 50GB</span></p>
            <p className="text-xs text-gray-500 mt-2">Sirf bottom banner</p>
            <button className="mt-5 w-full py-2.5 border-2 rounded-xl font-bold">Get @ ₹49</button>
          </div>
          <div className="border rounded-2xl p-6">
            <span className="text-[11px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold">LIMITED ADS</span>
            <h3 className="font-bold mt-3">Starter</h3>
            <p className="text-3xl font-black">₹79 <span className="text-sm font-normal">/ 100GB</span></p>
            <p className="text-xs text-gray-500 mt-2">Banner only - Pro leke hatao</p>
            <button className="mt-5 w-full py-2.5 border-2 rounded-xl font-bold">Get @ ₹79</button>
          </div>
        </div>

        <h3 className="font-bold mt-10 mb-4 text-left text-green-700">✅ NO ADS - HERO PLANS</h3>
        <div className="grid md:grid-cols-3 gap-5 text-left">
          <div className="border-2 border-orange-500 rounded-2xl p-6 bg-orange-50 shadow-xl scale-[1.03]">
            <span className="text-[11px] bg-green-600 text-white px-3 py-1 rounded-full font-bold">NO ADS ⭐ BESTSELLER</span>
            <h3 className="font-bold mt-3">Pro</h3>
            <p className="text-4xl font-black text-orange-600">₹99 <span className="text-sm font-normal text-gray-600">/ 250GB</span></p>
            <p className="text-xs text-gray-600 mt-2">Bilkul ad-free, full maza</p>
            <button className="mt-5 w-full py-3 bg-orange-600 text-white rounded-xl font-bold">Go Pro - No Ads</button>
          </div>
          <div className="border-2 border-green-200 rounded-2xl p-6">
            <span className="text-[11px] bg-green-600 text-white px-2 py-1 rounded-full font-bold">NO ADS</span>
            <h3 className="font-bold mt-3">Yearly</h3>
            <p className="text-3xl font-black">₹999 <span className="text-sm font-normal">/ 1TB</span></p>
            <p className="text-xs text-gray-500 mt-2">2 months FREE + No Ads</p>
            <button className="mt-5 w-full py-2.5 bg-black text-white rounded-xl font-bold">Yearly @ ₹999</button>
          </div>
          <div className="border-2 border-green-200 rounded-2xl p-6">
            <span className="text-[11px] bg-green-600 text-white px-2 py-1 rounded-full font-bold">NO ADS FAMILY</span>
            <h3 className="font-bold mt-3">Family</h3>
            <p className="text-3xl font-black">₹599 <span className="text-sm font-normal">/ 2TB</span></p>
            <p className="text-xs text-gray-500 mt-2">5 Users + No Ads</p>
            <button className="mt-5 w-full py-2.5 bg-black text-white rounded-xl font-bold">Family @ ₹599</button>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-gray-400 border-t mt-10">
        © 2026 BharatCloud.store • Made in India 🇮🇳 • Data in India
      </footer>
    </div>
  )
}
