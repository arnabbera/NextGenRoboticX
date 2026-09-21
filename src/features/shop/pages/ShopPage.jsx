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
  {
    asin: "B0FHG4W9MF",
    title: "Electrobot Smart Robot Car Kit for Beginners with UNO R3",
    category: "Robotics Kits",
    description:
      "Beginner-friendly DIY STEM kit with an UNO R3-compatible board, ultrasonic obstacle detection, line tracking, IR remote control, motors and chassis.",
    image: "https://api.electrobot.co.in/file/inventory_images/EB-KIT-160/EB-KIT-160-2e908db3b2d72f53-full.jpg",
    discount: null,
    rating: "2.4",
    link: "https://www.amazon.in/dp/B0FHG4W9MF?linkCode=ssc&tag=onamzarnabber-21&creativeASIN=B0FHG4W9MF&asc_item-id=amzn1.shoppablemedia.v1.322d6c9f-1c09-4813-8c63-2ed9768fd97a&ref_=hype_hm_sf_e_asin",
  },
  {
    asin: "B09G84NRRJ",
    title: "IDUINO Starter Kit for Arduino UNO R3, Nano and Mega 2560",
    category: "Arduino Kits",
    description:
      "Electronics project kit with displays, DHT11 and ultrasonic sensors, relay, joystick, servo motor, breadboards, LEDs, resistors and jumper wires.",
    image: "https://images-na.ssl-images-amazon.com/images/I/61HPua8qitL.jpg",
    discount: null,
    rating: "2.6",
    link: "https://www.amazon.in/dp/B09G84NRRJ?asc_item-id=amzn1.shoppablemedia.v1.047128fd-448f-4bff-95d0-f0bb094046c1&linkCode=ll2&tag=arnabbera05-21&linkId=0e3965535925443a92105df95aa168d8&ref_=as_li_ss_tl",
  },
  {
    asin: "B0FQ32PZ1L",
    title: "KITSONIX DIY Quadcopter Drone Kit – Complete Set",
    category: "Drone Kits",
    description:
      "Complete intermediate-level quadcopter build kit with brushless motors, ESCs, propellers, flight controller, frame and transmitter-receiver set.",
    image: "https://m.media-amazon.com/images/I/51vQFVJUM4L.jpg",
    discount: 18,
    rating: "3.1",
    link: "https://www.amazon.in/dp/B0FQ32PZ1L?linkCode=ssc&creativeASIN=B0FQ32PZ1L&asc_item-id=amzn1.shoppablemedia.v1.0f3f9c8f-51f3-453f-b89b-9041b72cc0e2&ref_=aip_sf_photo_spv_ons_mixed_d_qv_asin_mlt&tag=onamzarnabber-21",
  },
  {
    asin: "B0DWWFST91",
    title: "DIY Quadcopter Drone Kit with Pixhawk & FSi6",
    category: "Drone Kits",
    description:
      "Complete drone assembly set with Pixhawk flight controller, FSi6 transmitter and receiver, motors, ESCs, propellers, frame, battery and charger.",
    image: "https://m.media-amazon.com/images/I/51boByx7wBL._SL500_.jpg",
    discount: 39,
    rating: "1.0",
    link: "https://www.amazon.in/dp/B0DWWFST91?linkCode=ssc&tag=arnabbera05-21&creativeASIN=B0DWWFST91&asc_item-id=amzn1.shoppablemedia.v1.0f3f9c8f-51f3-453f-b89b-9041b72cc0e2&ref_=aip_sf_photo_spv_ofs_mixed_d_asin",
  },
  {
    asin: "B096D8P8G7",
    title: "OSOYOO Smart Robot Car Kit with Servo Steering",
    category: "Robotics Kits",
    description:
      "Arduino-compatible programmable robot car with servo power steering, Wi-Fi and Bluetooth control, ultrasonic obstacle avoidance, line tracking and IR remote control.",
    image: "https://osoyoo.com/picture/Arduino_Sport_Car/lesson1/L5.jpg",
    discount: null,
    rating: null,
    link: "https://www.amazon.in/dp/B096D8P8G7?asc_item-id=amzn1.shoppablemedia.v1.b00d5a7b-3963-48dd-ae67-6c6b08ccd301&linkCode=ll2&tag=arnabbera05-21&linkId=0d54b14e18b2c292ddc44723d8324acd&ref_=as_li_ss_tl",
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
                <span className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1.5 text-sm font-extrabold text-white shadow-lg ${product.discount ? "bg-red-600" : "bg-blue-700"}`}>
                  {product.discount ? `-${product.discount}% OFF` : "CHECK LATEST DEAL"}
                </span>
                <div className="aspect-square overflow-hidden bg-white p-5">
                  <img src={product.image} alt={product.title} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
                </div>
                <div className="border-t border-slate-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">{product.category}</p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900">{product.title}</h3>
                  {product.rating && <p className="mt-2 text-sm text-amber-600">★ {product.rating} on Amazon</p>}
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
