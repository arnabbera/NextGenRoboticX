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
  {
    asin: "B0H8T6914Y",
    title: "Build-o-Bot Smart Robotics Kit with Uno R3",
    category: "Robotics Kits",
    description:
      "Complete STEM learning kit for ages 10+ with an Uno R3-compatible board, ultrasonic and IR sensors, four-wheel chassis, motors and video curriculum for Bluetooth, line-following and obstacle-avoidance projects.",
    image: null,
    discount: null,
    rating: null,
    link: "https://www.amazon.in/dp/B0H8T6914Y?psc=1&aref=vTcjn7KEK5&sp_csd=d2lkZ2V0TmFtZT1zcF9taXNzaW9uX2JsZW5kZWQ&linkCode=ll2&tag=arnabbera05-21&linkId=cc55a686bab91e578f12b15f52338170&ref_=as_li_ss_tl",
  },
  {
    asin: "B09NBWWP79",
    title: "Logitech Brio Ultra HD 4K Webcam",
    category: "Webcams",
    description:
      "Premium 4K webcam with autofocus, RightLight 3 HDR correction, dual noise-cancelling microphones, adjustable 65°, 78° and 90° field of view, 5x digital zoom and Windows Hello support.",
    image: "https://media.falabella.com/falabellaCO/144845789_03/w%3D1500%2Ch%3D1500%2Cfit%3Dcover",
    discount: null,
    rating: null,
    link: "https://www.amazon.in/Logitech-Calling-Noise-Canceling-Correction-Microsoft/dp/B09NBWWP79?crid=2R2T1H4UJ4WDO&dib=eyJ2IjoiMSJ9.LzxDfSudF4afcVn9PUA3tCIoVlX5xWZGqAZ3xn5eAXsmgQ9TXrDncFgpDRFO8nbanRgVjQRQzzLoJEKcyifSSChc6-6iKcWI0xY67QHZg-WHBUGcrDBszHofSweXyMTlmjlLyX1Lj4XS0wZ_deNxWE--7JW4ZxPCdVWylyzZlR4.tTADW7hndiuL7oyRSYsoBYOQL7Rad4vSONWu1YcOQ7k&dib_tag=se&keywords=Logitech%2BMX%2BBrio%2BUltra%2BHD%2B4K%2BCollabo&nsdOptOutParam=true&qid=1790009621&sprefix=logitech%2Bmx%2Bbrio%2Bultra%2Bhd%2B4k%2Bcollabo%2Caps%2C352&sr=8-5&th=1&linkCode=ll2&tag=arnabbera05-21&linkId=388956d046b5e40aac4ac1f9ec85a981&ref_=as_li_ss_tl",
  },
  {
    asin: "B0B522JCYS",
    title: "Digitek DSG-007F 3-Axis Smartphone Gimbal",
    category: "Creator Accessories",
    description:
      "Foldable handheld smartphone stabilizer with three-axis anti-shake control, face and object tracking, horizontal and vertical shooting, follow and lock modes, and broad Android and iPhone compatibility.",
    image: "https://digitek.net.in/cdn/shop/files/DSG_007F_1.jpg?v=1723026563&width=1500",
    discount: null,
    rating: "3.8",
    link: "https://www.amazon.in/dp/B0B522JCYS?asc_item-id=amzn1.shoppablemedia.v1.03e032c1-19a6-4801-869f-60cdf0ef80e9&th=1&linkCode=ll2&tag=arnabbera05-21&linkId=fdd21308dff1af000893571da1041205&ref_=as_li_ss_tl",
  },
  {
    asin: "B0FJ2L67HJ",
    title: "DJI Osmo Mobile 8 Advanced Tracking Combo",
    category: "Creator Accessories",
    description:
      "Premium smartphone gimbal with three-axis stabilization, native AI tracking with audio and lighting support, 360° pan rotation, built-in extension rod and tripod, magnetic phone clamp and up to 10 hours of battery life.",
    image: "https://media-ik.croma.com/Croma%20Assets/Imaging/Camera%20Accessories/Images/319557_0_XBm9M3ZqJ.png?updatedAt=1771320951567",
    discount: null,
    rating: "4.2",
    link: "https://www.amazon.in/DJI-Stabilizer-Tracking-Extension-Stabilization/dp/B0FJ2L67HJ?pd_rd_w=rF7Nj&content-id=amzn1.sym.e84a26b2-5470-42e6-b7fa-162e7bb17185&pf_rd_p=e84a26b2-5470-42e6-b7fa-162e7bb17185&pf_rd_r=YRK6VA0DCDQT1MTG34VB&pd_rd_wg=Y0YfA&pd_rd_r=b215b666-4153-4b84-886c-00a8603e7b75&pd_rd_i=B0FJ2L67HJ&th=1&linkCode=ll2&tag=arnabbera05-21&linkId=b84d9960d6e19674b05824e573b5d986&ref_=as_li_ss_tl",
  },
  {
    asin: "B09DK9J27F",
    title: "SanDisk Ultra 256GB USB 3.0 Flash Drive",
    category: "Storage",
    description:
      "Compact 256GB USB-A flash drive with a retractable connector, read speeds up to 130 MB/s, USB 2.0 backward compatibility and password-protection support for portable file storage.",
    image: "https://cdn.mafrservices.com/sys-master-root/h80/h51/46979604709406/598445_main.jpg",
    discount: null,
    rating: "4.3",
    link: "https://www.amazon.in/dp/B09DK9J27F?th=1&linkCode=ll2&tag=arnabbera05-21&linkId=43797e1cf59e25d77bcd56abb0a0b9f5&ref_=as_li_ss_tl",
  },
  {
    asin: "B085HP8YJ3",
    title: "KIDWILL 14-in-1 Solar Robot STEM Kit",
    category: "STEM Kits",
    description:
      "Hands-on 261-piece engineering kit that builds 14 robot models, including wheeled, walking and water-based designs, with solar and battery power modes for learning mechanics and renewable energy.",
    image: "https://cdn03.ciceksepeti.com/cicek/kcm61112869-1/XL/kidwill-cocuklar-icin-gunes-enerjili-robot-seti-14-u-1-arada-egitici-yesil-kcm61112869-b59c7b2b-113b-4e56-b703-a86ace29f49d.jpg",
    discount: null,
    rating: "4.2",
    link: "https://www.amazon.in/Educational-Science-Building-Assembly-Operated/dp/B085HP8YJ3?dib=eyJ2IjoiMSJ9.8GbRZ55rhubf8rUsiVS17WBO7DSt39rTSTnU7is5BMR54AqoG6hJFru_6E864jVf4L55UtUtQ6oJAMedJp6RSTHNsE4G5mLj0oExyABYBDFDFVbR--K7xq1WYX38S71lOwNRMB5CcUJV9b3-czF35suyWQrdrXLNCYOXnII44aE9ruRbGqFbHOl1cOzhlk6_zHXDOyeyEk7jtqEawRsRlOUwnEK8MTGO0Pf7exRvpuGJ3rfgB6sAPEUH5tFnPedFI3e8U66Vt5lZ1uma8kbNkkhwg-wx0_QpEhui3WmjdqA.aXtte8juh15bOpKoXwcmyRCHOjbmFgPeyPiytUwqd6g&dib_tag=se&keywords=robotics&qid=1790010742&sr=8-16&linkCode=ll2&tag=arnabbera05-21&linkId=e164cec0a91c44a4ebab9bd4c2a291ea&ref_=as_li_ss_tl",
  },
  {
    asin: "B0FBGGWNXF",
    title: "Kit4Curious 150 Experiments Science Project Kit",
    category: "STEM Kits",
    description:
      "Reusable educational kit for 150 hands-on projects across solar energy, electricity, electronics, circuits, engineering, machines and electric art, with diagrams, templates and a project booklet.",
    image: null,
    discount: 21,
    rating: "4.2",
    link: "https://www.amazon.in/Kit4Curious%C2%AE-Experiments-School-Science-Project/dp/B0FBGGWNXF?dib=eyJ2IjoiMSJ9.8GbRZ55rhubf8rUsiVS17WBO7DSt39rTSTnU7is5BMR54AqoG6hJFru_6E864jVf4L55UtUtQ6oJAMedJp6RSTHNsE4G5mLj0oExyABYBDFDFVbR--K7xq1WYX38S71lOwNRMB5CcUJV9b3-czF35suyWQrdrXLNCYOXnII44aE9ruRbGqFbHOl1cOzhlk6_zHXDOyeyEk7jtqEawRsRlOUwnEK8MTGO0Pf7exRvpuGJ3rfgB6sAPEUH5tFnPedFI3e8U66Vt5lZ1uma8kbNkkhwg-wx0_QpEhui3WmjdqA.aXtte8juh15bOpKoXwcmyRCHOjbmFgPeyPiytUwqd6g&dib_tag=se&keywords=robotics&qid=1790010742&sr=8-24&th=1&linkCode=ll2&tag=arnabbera05-21&linkId=3a7da7bb5087301ed02e67a7d80d8389&ref_=as_li_ss_tl",
  },
  {
    asin: "B08CZ4MG5P",
    title: "ELEGOO Conqueror Robot Tank Kit with UNO R3",
    category: "Robotics Kits",
    description:
      "Arduino-compatible tracked robot kit with an UNO R3 controller, Wi-Fi FPV camera, ultrasonic obstacle avoidance, line tracking, auto-follow, IR remote control and a two-axis camera gimbal.",
    image: null,
    discount: null,
    rating: null,
    link: "https://www.amazon.in/ELEGOO-Conqueror-Robot-Tank/dp/B08CZ4MG5P?pd_rd_w=0Anwi&content-id=amzn1.sym.f834d454-55cc-4825-9252-c75a5f644237&pf_rd_p=f834d454-55cc-4825-9252-c75a5f644237&pf_rd_r=VGGZ9Z5FV383EN4Z3DG3&pd_rd_wg=t1bpK&pd_rd_r=6ec14c18-f15c-4b1a-bc79-9149bb8d12bf&pd_rd_i=B08CZ4MG5P&psc=1&linkCode=ll2&tag=arnabbera05-21&linkId=065999f656d6b33876a8a32fa1798231&ref_=as_li_ss_tl",
  },
  {
    asin: "B00SK5RUQY",
    title: "Makeblock mBot Bluetooth Programmable Robot Kit",
    category: "Robotics Kits",
    description:
      "Beginner-friendly metal robot kit for learning Scratch-based programming, electronics and robotics, with Bluetooth control, ultrasonic obstacle detection, line following, motors and an IR remote.",
    image: "https://robotsteam.vn/sites/default/files/anh_bai_viet/HTB11ESxKFXXXXXgXXXXq6xXFXXXr_0.jpg",
    discount: 69,
    rating: "4.6",
    link: "https://www.amazon.in/Makeblock-Bluetooth-Programmable-Robotics-Electronics/dp/B00SK5RUQY?pd_rd_w=4Cc4Y&content-id=amzn1.sym.0640b4dc-6d30-422d-bb8f-d11de15b1b49&pf_rd_p=0640b4dc-6d30-422d-bb8f-d11de15b1b49&pf_rd_r=6P3AJZG7PK42AQYFZC00&pd_rd_wg=uqEQ1&pd_rd_r=f62298d3-af3c-408e-a37c-2d5ec6f7d8b7&pd_rd_i=B00SK5RUQY&psc=1&linkCode=ll2&tag=arnabbera05-21&linkId=110042eccbc3fe5f04303724657e9367&ref_=as_li_ss_tl",
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
                <span className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1.5 text-sm font-extrabold shadow-lg ${product.discount ? "bg-red-600 text-white" : "bg-amber-400 text-slate-950"}`}>
                  {product.discount ? `-${product.discount}% OFF` : "AMAZON DEAL"}
                </span>
                <div className="aspect-square overflow-hidden bg-white p-5">
                  {product.image ? (
                    <img src={product.image} alt={product.title} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 px-6 text-center text-blue-800">
                      <ShoppingBag size={54} />
                      <span className="mt-4 font-bold">View product on Amazon</span>
                    </div>
                  )}
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
