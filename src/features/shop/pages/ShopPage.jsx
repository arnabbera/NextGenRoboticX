import { useMemo, useState } from "react";
import { ExternalLink, Search, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { Footer, Navbar } from "../../../components/home";

const STOREFRONT_URL =
  "https://www.amazon.in/shop/digitaltechtutor?tag=onamzarnabber-21&isPublicView=true";

const products = [
  {
    asin: "B08DHRLJ1N",
    title: "OSOYOO V2.1 Smart IoT Robot Car Kit for Arduino",
    category: "Robotics Kits",
    description:
      "Hands-on STEM robot car kit with Wi-Fi, Bluetooth, line tracking, obstacle avoidance and Arduino-compatible programming.",
    image: "https://m.media-amazon.com/images/I/81jeWkW1K-L._AC_SL1000__.jpg",
    discount: 67,
    rating: "4.3",
    link: "https://www.amazon.in/dp/B08DHRLJ1N?linkCode=ssc&tag=onamzarnabber-21&creativeASIN=B08DHRLJ1N&asc_item-id=amzn1.shoppablemedia.v1.b00d5a7b-3963-48dd-ae67-6c6b08ccd301&ref_=aip_sf_photo_spv_ons_mixed_d_asin",
  },
];

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) =>
      `${product.title} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(normalized)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <section className="overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.25fr_.75fr] lg:items-center lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-100">
                <Sparkles size={17} /> Digital Tech Tutor Picks
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
                Smart technology deals for makers and learners
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                Explore selected robotics, electronics, IoT and learning products from the Digital Tech Tutor Amazon storefront.
              </p>
              <a
                href={STOREFRONT_URL}
                target="_blank"
                rel="sponsored nofollow noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-amber-300"
              >
                View complete Amazon storefront <ExternalLink size={19} />
              </a>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur">
              <ShoppingBag className="text-amber-300" size={48} />
              <h2 className="mt-5 text-2xl font-bold">Deals in one place</h2>
              <p className="mt-3 leading-7 text-blue-100">
                Discount badges highlight the offer visible when each deal is added. Final price and availability are always confirmed on Amazon.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-bold uppercase tracking-[0.2em] text-blue-700">Featured deals</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">Recommended products</h2>
            </div>
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">Search shop products</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <article key={product.asin} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-3 py-1.5 text-sm font-extrabold text-white shadow-lg">
                  -{product.discount}% OFF
                </span>
                <div className="aspect-square overflow-hidden bg-white p-5">
                  <img src={product.image} alt={product.title} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
                </div>
                <div className="border-t border-slate-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">{product.category}</p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900">{product.title}</h3>
                  <p className="mt-2 text-sm text-amber-600">★ {product.rating} on Amazon</p>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="sponsored nofollow noreferrer"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 font-bold text-white transition hover:bg-blue-800"
                  >
                    Check price on Amazon <ExternalLink size={17} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="mt-9 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              No products match your search.
            </div>
          )}

          <div className="mt-12 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
            <ShieldCheck className="mt-0.5 shrink-0 text-emerald-700" size={22} />
            <p>
              <strong>Affiliate disclosure:</strong> As an Amazon Associate, Digital Tech Tutor may earn from qualifying purchases. Prices, discounts and availability can change; Amazon displays the final current offer before purchase.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
