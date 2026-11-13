import { FormEvent, useMemo, useState } from "react";

const A = "/assets";

type Product = {
  name: string;
  description: string;
  price: string;
  category: "Coffee" | "Iced Favorites" | "Non-Coffee" | "Snacks";
  desktop: string;
  mobile: string;
};

const products: Product[] = [
  {
    name: "Americano",
    description: "Espresso, water & ice",
    price: "₱110",
    category: "Coffee",
    desktop: "e0c05.png",
    mobile: "3a2c1.png",
  },
  {
    name: "Café Latte",
    description: "Espresso & silky milk",
    price: "₱130",
    category: "Coffee",
    desktop: "e171f.png",
    mobile: "f55e3.png",
  },
  {
    name: "Spanish Latte",
    description: "Espresso & condensed milk",
    price: "₱150",
    category: "Iced Favorites",
    desktop: "51da5.png",
    mobile: "42673.png",
  },
  {
    name: "Cold Brew",
    description: "Slow-steeped & smooth",
    price: "₱125",
    category: "Iced Favorites",
    desktop: "51adf.png",
    mobile: "960ce.png",
  },
  {
    name: "Matcha Latte",
    description: "Matcha & creamy milk",
    price: "₱140",
    category: "Non-Coffee",
    desktop: "7fe38.png",
    mobile: "38bde.png",
  },
  {
    name: "Iced Mocha",
    description: "Espresso, cocoa & milk",
    price: "₱145",
    category: "Iced Favorites",
    desktop: "83467.png",
    mobile: "85859.png",
  },
  {
    name: "Vanilla Latte",
    description: "Vanilla, espresso & milk",
    price: "₱140",
    category: "Coffee",
    desktop: "e2598.png",
    mobile: "6172c.png",
  },
  {
    name: "Artisanal Pastries",
    description: "Buttery, baked daily",
    price: "₱110",
    category: "Snacks",
    desktop: "b4f30.png",
    mobile: "ef8ed.png",
  },
];

const categories = ["Coffee", "Iced Favorites", "Non-Coffee", "Snacks"] as const;

function ResponsiveImage({
  desktop,
  mobile,
  alt,
  className = "",
}: {
  desktop: string;
  mobile?: string;
  alt: string;
  className?: string;
}) {
  return (
    <picture>
      {mobile && <source media="(max-width: 639px)" srcSet={`${A}/${mobile}`} />}
      <img src={`${A}/${desktop}`} alt={alt} className={className} />
    </picture>
  );
}

function Logo({ light = false, large = false }: { light?: boolean; large?: boolean }) {
  const wind = light ? "b6316.svg" : large ? "1a1c6.svg" : "d3c5c.svg";
  const coffee = light ? "4d4d8.svg" : large ? "70cbb.svg" : "e46a1.svg";
  const mobileWind = light ? wind : large ? "71fe2.svg" : "9762f.svg";
  const mobileCoffee = light ? coffee : large ? "f1760.svg" : "f05e5.svg";
  return (
    <span className={`logo-mark ${large ? "logo-mark-large" : ""}`} aria-hidden="true">
      <picture>
        <source media="(max-width: 639px)" srcSet={`${A}/${mobileWind}`} />
        <img src={`${A}/${wind}`} alt="" />
      </picture>
      <picture>
        <source media="(max-width: 639px)" srcSet={`${A}/${mobileCoffee}`} />
        <img src={`${A}/${coffee}`} alt="" />
      </picture>
    </span>
  );
}

function Button({
  children,
  href,
  dark = false,
  outline = false,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  dark?: boolean;
  outline?: boolean;
  onClick?: () => void;
}) {
  const className = `pill ${dark ? "pill-dark" : ""} ${outline ? "pill-outline" : ""}`;
  return href ? (
    <a
      className={className}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  ) : (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Coffee");
  const [selectedDrink, setSelectedDrink] = useState("");
  const [sent, setSent] = useState(false);

  const orderedProducts = useMemo(
    () => [
      ...products.filter((item) => item.category === category),
      ...products.filter((item) => item.category !== category),
    ],
    [category],
  );

  function preOrder(name: string) {
    setSelectedDrink(name);
    setSent(false);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.querySelector<HTMLInputElement>("#name")?.focus(), 500);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5efe6] text-[#3b261d]">
      <header className="sticky top-0 z-50 border-b border-[#d8cabc] bg-[#f5efe6]/95 backdrop-blur">
        <div className="flex h-[76px] items-center justify-between px-6 md:h-[88px] md:px-16">
          <a href="#home" className="flex items-center gap-2.5" aria-label="Kape Amihan home">
            <Logo />
            <span className="font-outfit-bold text-[21px] md:text-[25px]">Kape Amihan</span>
          </a>
          <nav
            className="hidden items-center gap-7 text-[13px] md:flex"
            aria-label="Main navigation"
          >
            {[
              ["Home", "home"],
              ["About Us", "about"],
              ["Menu", "menu"],
              ["Gallery", "gallery"],
              ["Promotions", "promotion"],
              ["Contact", "contact"],
            ].map(([label, id], index) => (
              <a
                key={id}
                href={`#${id}`}
                className={
                  index === 0
                    ? "font-inter-bold text-[#c86d51]"
                    : "font-inter-medium hover:text-[#c86d51]"
                }
              >
                {label}
              </a>
            ))}
          </nav>
          <Button href="#contact">Find Us ↗</Button>
        </div>
        <nav
          className="flex justify-between px-6 pb-[15px] font-inter-semibold text-[9px] md:hidden"
          aria-label="Mobile sections"
        >
          {[
            ["Home", "home"],
            ["About Us", "about"],
            ["Menu", "menu"],
            ["Gallery", "gallery"],
            ["Promos", "promotion"],
            ["Contact", "contact"],
          ].map(([label, id], index) => (
            <a key={id} href={`#${id}`} className={index === 0 ? "text-[#c86d51]" : ""}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section
        id="home"
        className="hero relative flex h-[690px] flex-col items-center justify-center gap-[38px] overflow-hidden text-[#f5efe6] md:h-[812px] md:gap-[54px]"
      >
        <ResponsiveImage
          desktop="4f407.png"
          mobile="59750.png"
          alt="Dark espresso-toned wood grain"
          className="absolute inset-0 size-full object-cover"
        />
        <p className="relative font-inter-regular text-[10px] tracking-[3px]">
          A LITTLE PAUSE. A LOT OF HEART.
        </p>
        <div className="relative flex w-full items-center justify-center gap-14">
          <div className="ritual-side hidden md:block">
            <span>PAHUWAY</span>
            <i>|</i>
            <em>Higop</em>
          </div>
          <div className="flex size-[284px] flex-col items-center justify-center gap-3.5 rounded-full bg-[#f5efe6] text-[#3b261d] md:size-[376px] md:gap-[18px]">
            <p className="font-inter-regular text-[10px] tracking-[3px]">YOUR NEIGHBORHOOD KAPE</p>
            <Logo large />
            <h1 className="font-outfit-extrabold text-[34px] tracking-[-1.5px] md:text-[45px]">
              Kape Amihan
            </h1>
            <p className="font-inter-semibold text-[9px] tracking-[1px] md:text-[11px]">
              EST. 2026 • POTOTAN, ILOILO
            </p>
          </div>
          <div className="ritual-side hidden md:block">
            <i>|</i>
            <span>BALIK</span>
            <em>stay a little.</em>
          </div>
        </div>
        <div className="relative flex w-[342px] items-center justify-between border-y border-[#f5efe6] py-3.5 md:hidden">
          <span className="font-outfit-medium text-lg tracking-[2px]">PAHUWAY</span>
          <span>|</span>
          <em className="font-caveat text-[27px]">Higop</em>
          <span>|</span>
          <span className="font-outfit-regular text-lg tracking-[2px]">BALIK</span>
        </div>
        <a href="#about" className="relative flex flex-col items-center font-caveat text-[31px]">
          {"{ explore }"}
          <img src={`${A}/f3745.svg`} alt="" className="mt-2 h-[35px] w-[27px]" />
        </a>
      </section>

      <section id="about" className="border-b border-[#d8cabc] pb-[42px] pt-11 md:pt-[50px]">
        <p className="text-center font-caveat text-[33px] text-[#c86d51] md:text-[41px]">
          Your little pause in Pototan.
        </p>
        <div className="editorial-latte relative mx-auto h-[410px] max-w-[1440px] md:h-[430px]">
          <span className="absolute left-6 top-2 z-10 font-outfit-black text-[62px] tracking-[-3px] md:left-[4.5%] md:top-[95px] md:text-[10.4vw] md:tracking-[-7px]">
            PAHUWAY
          </span>
          <span className="absolute bottom-2 left-[17%] z-10 font-outfit-black text-[64px] tracking-[-3px] md:bottom-auto md:left-[57%] md:top-[95px] md:text-[10.4vw] md:tracking-[-7px]">
            AMIHAN
          </span>
          <ResponsiveImage
            desktop="27001.png"
            mobile="10a11.png"
            alt="Iced latte on a stone plinth"
            className="absolute left-1/2 top-[43px] z-20 h-[280px] w-[254px] -translate-x-1/2 object-contain md:top-[-20px] md:h-[445px] md:w-[416px]"
          />
          <span className="absolute right-[10%] top-[270px] hidden -rotate-8 font-caveat text-[28px] text-[#c86d51] md:block">
            Maayong adlaw! ↖
          </span>
        </div>
        <div className="flex justify-center gap-2.5 md:gap-3.5">
          <Button href="#menu">Explore Our Menu</Button>
          <Button href="#story" outline>
            Our Story
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-x-5 gap-y-8 border-b border-[#d8cabc] px-6 py-10 md:grid-cols-4 md:gap-7 md:px-16 md:py-12">
        {[
          ["c5345.svg", "Locally Rooted", "Ilonggo warmth & local flavors"],
          ["cfe8b.svg", "Slow Sips", "Freshly brewed espresso & non-coffee"],
          ["40361.svg", "Study & Work Space", "Cozy seating & reliable Wi-Fi"],
          ["3e357.svg", "Community Vibe", "Made for students, families & friends"],
        ].map(([icon, title, copy]) => (
          <article key={title} className="flex flex-col items-center gap-3 text-center">
            <span className="flex size-[52px] items-center justify-center rounded-full bg-[#3b261d]">
              <img src={`${A}/${icon}`} alt="" className="size-6" />
            </span>
            <h3 className="font-outfit-bold text-base md:text-xl">{title}</h3>
            <p className="font-inter-regular text-[11px] leading-6 text-[#79675b] md:text-[13px]">
              {copy}
            </p>
          </article>
        ))}
      </section>

      <section id="menu" className="section-pad">
        <p className="eyebrow">BREWED FOR YOUR EVERYDAY</p>
        <div className="mt-7 flex items-end justify-between">
          <div className="flex items-center gap-3 md:gap-6">
            <h2 className="display-title">Menu</h2>
            <span className="-rotate-6 font-caveat text-[31px] text-[#c86d51] md:text-[42px]">
              drinks & snacks
            </span>
          </div>
          <p className="hidden font-inter-regular text-[13px] text-[#79675b] md:block">
            Your usual, or something new?
          </p>
        </div>
        <div className="mt-8 flex gap-2.5 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-5 py-3 font-inter-semibold text-xs transition ${item === category ? "bg-[#c86d51] text-white" : item === "Non-Coffee" ? "bg-[#e0e4d9]" : "bg-[#e8ddcf]"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3.5 md:grid-cols-4 md:gap-6">
          {orderedProducts.map((product) => (
            <article
              key={product.name}
              className={`menu-card ${product.category !== category ? "opacity-55 hover:opacity-100" : ""}`}
            >
              <ResponsiveImage
                desktop={product.desktop}
                mobile={product.mobile}
                alt={product.name}
                className="h-[155px] w-full object-cover md:h-[230px]"
              />
              <div className="p-2.5 md:p-[18px]">
                <h3 className="min-h-10 font-outfit-bold text-base md:min-h-[29px] md:text-[23px]">
                  {product.name}
                </h3>
                <p className="min-h-7 font-inter-regular text-[10px] leading-[1.4] text-[#79675b] md:min-h-[17px] md:text-xs">
                  {product.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <strong className="font-outfit-bold text-lg md:text-2xl">{product.price}</strong>
                  <button
                    type="button"
                    onClick={() => preOrder(product.name)}
                    className="rounded-full bg-[#3b261d] px-2 py-2 font-inter-semibold text-[9px] text-[#f5efe6] md:px-[13px] md:text-[10px]"
                  >
                    Pre-order
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 flex items-end justify-between gap-6">
          <p className="max-w-[650px] font-inter-regular text-[11px] leading-[1.6] text-[#79675b] md:text-xs">
            Made fresh, one cup at a time. Sample prices are in Philippine pesos; the final menu,
            prices, milk options, and pastry selection are to be confirmed before launch.
          </p>
          <span className="hidden font-caveat text-[30px] text-[#c86d51] md:block">
            See you over coffee!
          </span>
        </div>
      </section>

      <section id="story" className="grid md:grid-cols-2">
        <div className="flex min-h-[540px] flex-col items-start justify-center gap-[26px] bg-[#3b261d] px-7 py-14 text-[#f5efe6] md:min-h-[700px] md:p-[72px]">
          <p className="eyebrow !text-[#f5efe6]">A BREEZE. A BREW. A PLACE TO BELONG.</p>
          <h2 className="font-outfit-extrabold text-[49px] leading-[1.03] tracking-[-2px] md:text-[68px]">
            Our Story
          </h2>
          <p className="font-caveat text-[35px] text-[#c86d51] md:text-[43px]">
            A little room to breathe.
          </p>
          <p className="body-copy text-[#f5efe6]">
            Amihan is the cool, refreshing breeze that invites you to slow down. We bring that
            feeling to a little neighborhood café in Pototan, Iloilo.
          </p>
          <p className="body-copy text-[#f5efe6]">
            Between classes, after work, or in the middle of an ordinary day—there’s a seat for you
            here. Familiar flavors, thoughtful coffee, and the easy warmth of an Ilonggo welcome.
            Pahuway anay. Stay a while.
          </p>
          <Button href="#gallery" outline>
            Learn More ↗
          </Button>
        </div>
        <div className="bg-[#e8ddcf]">
          <ResponsiveImage
            desktop="959d2.png"
            mobile="18fa2.png"
            alt="Barista preparing a pour-over coffee"
            className="h-[292px] w-full object-cover md:h-[354px]"
          />
          <div className="flex flex-col items-start gap-[18px] px-7 py-9 md:px-12 md:py-[38px]">
            <h2 className="font-outfit-extrabold text-[34px] tracking-[-1px] md:text-[43px]">
              Meet Your Coffee
            </h2>
            <p className="body-copy text-[#79675b]">
              Rooted in local beans, with a soft spot for Philippine-grown coffee. Think comforting
              cocoa, toasted nuts, and a gentle sweetness—a balanced roast made for easy sipping.
              Ground fresh and brewed with care, just for you.
            </p>
            <Button href="#menu" dark>
              Our Beans ↗
            </Button>
          </div>
        </div>
      </section>

      <section
        id="promotion"
        className="grid gap-5 bg-[#c86d51] px-7 py-[54px] md:grid-cols-[1.05fr_.95fr] md:gap-11 md:p-16"
      >
        <div className="flex flex-col items-start gap-[22px]">
          <p className="eyebrow !text-[#f5efe6]">YOUR NEW WEEKLY RITUAL</p>
          <div>
            <h2 className="font-outfit-extrabold text-[54px] leading-[.98] tracking-[-2px] text-[#f5efe6] md:text-[85px] md:tracking-[-4px]">
              Drink of
              <br />
              the Week
            </h2>
            <p className="-rotate-7 font-caveat text-4xl text-[#3b261d] md:text-5xl">
              featured, with love.
            </p>
          </div>
          <h3 className="font-outfit-bold text-3xl md:text-[39px]">Iced Spanish Latte</h3>
          <p className="body-copy max-w-[520px]">
            Bold espresso meets creamy condensed milk over ice. Sweet, smooth, and the cool little
            pick-me-up your afternoon deserves.
          </p>
          <div className="grid w-full grid-cols-3 gap-3 border-t border-[#3b261d] pt-[22px]">
            {[
              ["2", "Espresso Shots"],
              ["Creamy", "Condensed Milk"],
              ["15%", "Student Bundle"],
            ].map(([value, label]) => (
              <div key={label}>
                <strong className="block font-outfit-extrabold text-[23px] md:text-[30px]">
                  {value}
                </strong>
                <span className="font-inter-regular text-[10px] md:text-xs">{label}</span>
              </div>
            ))}
          </div>
          <p className="font-inter-regular text-[10px] leading-[1.6] text-[#3b261d]">
            Academic concept offer. Availability, promotion dates, eligibility, and final terms are
            to be confirmed before launch. Seasonal drinks and community-event announcements will be
            posted here once verified.
          </p>
        </div>
        <div className="relative h-[470px] md:h-[560px]">
          <span className="absolute left-2 top-2 z-10 -rotate-9 rounded-full bg-[#8a9a86] px-5 py-3 font-inter-regular text-xs">
            Weekly Promo
          </span>
          <ResponsiveImage
            desktop="5629e.png"
            mobile="14085.png"
            alt="Iced Spanish latte with coffee beans"
            className="absolute left-1/2 top-8 h-[370px] w-[330px] -translate-x-1/2 object-contain md:top-0 md:h-[514px] md:w-[480px]"
          />
          <div className="absolute bottom-9 left-0 md:bottom-5">
            <span className="block font-outfit-regular text-2xl line-through md:text-[28px]">
              ₱150
            </span>
            <strong className="font-outfit-black text-[73px] leading-none tracking-[-4px] text-[#f5efe6] md:text-8xl">
              ₱130
            </strong>
          </div>
          <div className="absolute bottom-0 right-0">
            <Button onClick={() => preOrder("Iced Spanish Latte")} dark>
              Pre-order Your Latte ↗
            </Button>
          </div>
        </div>
      </section>

      <section id="gallery" className="section-pad">
        <p className="eyebrow">GOOD COFFEE. BETTER COMPANY.</p>
        <div className="mt-7 flex items-end justify-between">
          <h2 className="max-w-[900px] font-outfit-extrabold text-[43px] leading-[1.06] tracking-[-2px] md:text-[65px]">
            The Amihan Experience
          </h2>
          <span className="hidden -rotate-5 font-caveat text-[37px] text-[#c86d51] md:block">
            Make yourself at home.
          </span>
        </div>
        <p className="mt-3 font-caveat text-3xl text-[#c86d51] md:hidden">Make yourself at home.</p>
        <div className="mt-7 grid grid-cols-2 gap-3 md:gap-6">
          <div className="grid gap-3 md:gap-6">
            <GalleryImage desktop="48078.png" mobile="1bf84.png" label="ROOM TO PAUSE" tall />
            <GalleryImage desktop="a3873.png" mobile="838db.png" label="BREWED WITH CARE" />
          </div>
          <div className="grid gap-3 md:gap-6">
            <GalleryImage desktop="a0577.png" mobile="d1293.png" label="STAY A LITTLE" />
            <GalleryImage desktop="bc584.png" mobile="c40ff.png" label="YOUR COZY CORNER" tall />
          </div>
        </div>
        <p className="mt-7 body-copy text-[#79675b]">
          For slow mornings, study dates, and the people who make an ordinary day feel special.
        </p>
      </section>

      <section id="contact" className="bg-[#eee5d9] px-6 py-[62px] md:px-16 md:py-[88px]">
        <p className="eyebrow">THERE’S A SEAT WAITING FOR YOU</p>
        <div className="mt-7 flex items-center justify-between">
          <h2 className="display-title">Visit Us</h2>
          <span className="-rotate-5 font-caveat text-[25px] text-[#c86d51] md:text-[39px]">
            Dali, kape ta!
          </span>
        </div>
        <div className="mt-9 grid gap-9 md:grid-cols-2 md:gap-16">
          <div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <h3 className="font-outfit-regular text-[21px] md:text-[26px]">Pototan, Iloilo</h3>
                <p className="mt-2 font-inter-regular text-xs leading-[1.6] text-[#79675b]">
                  [Street address to be confirmed] Philippine neighborhood café
                </p>
              </div>
              <div>
                <h3 className="font-outfit-regular text-[21px] md:text-[26px]">Come on over</h3>
                <p className="mt-2 font-inter-regular text-xs text-[#79675b]">
                  Proposed hours: 8:00 AM – 9:00 PM
                </p>
              </div>
            </div>
            <div className="my-7">
              <p className="eyebrow mb-4">STUDENT PROJECT CONTACTS</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <article className="contact-card">
                  <h3 className="font-outfit-bold text-xl">Jay Best Bullon</h3>
                  <a href="tel:+639205757324">0920 575 7324</a>
                  <a href="mailto:jbullon@usa.edu.ph">jbullon@usa.edu.ph</a>
                  <a
                    href="https://www.facebook.com/jay.jay.964155"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook profile ↗
                  </a>
                </article>
                <article className="contact-card">
                  <h3 className="font-outfit-bold text-xl">John Lorenz Gonzales</h3>
                  <a href="tel:+639195020212">0919 502 0212</a>
                  <a href="mailto:jlgonzales@usa.edu.ph">jlgonzales@usa.edu.ph</a>
                  <a
                    href="https://www.facebook.com/lorenz.gonzales.900"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook profile ↗
                  </a>
                </article>
              </div>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <h3 className="font-outfit-bold text-[25px] md:text-[29px]">
                Say hello. Or save a sip.
              </h3>
              <label className="field">
                <span>Your name</span>
                <input id="name" required placeholder="How should we call you?" />
              </label>
              <label className="field">
                <span>Email or phone</span>
                <input required placeholder="Where can we reach you?" />
              </label>
              <label className="field">
                <span>Inquiry / pre-order</span>
                <textarea
                  required
                  value={selectedDrink}
                  onChange={(event) => setSelectedDrink(event.target.value)}
                  placeholder="Tell us what’s brewing…"
                />
              </label>
              <p className="font-inter-regular text-[10px] leading-[1.6] text-[#79675b]">
                Use this space for an inquiry or order request. Please don’t include sensitive
                personal information. Academic concept—no live orders are collected here.
              </p>
              <button type="submit" className="pill">
                Send Inquiry ↗
              </button>
              {sent && (
                <p role="status" className="font-inter-semibold text-sm text-[#8a5948]">
                  Salamat! This concept form has been completed locally.
                </p>
              )}
            </form>
          </div>
          <div>
            <div className="map relative h-[392px] overflow-hidden bg-[#e8ddcf] md:h-[600px]">
              <img src={`${A}/79648.svg`} alt="" className="absolute hidden size-full md:block" />
              <img src={`${A}/13af6.svg`} alt="" className="absolute size-full md:hidden" />
              <div className="absolute left-[6%] top-[16%]">
                <strong className="font-outfit-bold text-base tracking-[1px] text-[#79675b] md:text-[23px]">
                  POTOTAN
                </strong>
                <span className="block font-inter-regular text-[9px] tracking-[2px] text-[#79675b]">
                  ILOILO, PHILIPPINES
                </span>
              </div>
              <div className="absolute left-1/2 top-[34%] flex -translate-x-1/2 flex-col items-center gap-2">
                <span className="flex size-[54px] items-center justify-center rounded-full bg-[#c86d51] md:size-[68px]">
                  <img src={`${A}/d2937.svg`} alt="" className="size-7" />
                </span>
                <span className="font-outfit-regular">Amihan</span>
              </div>
              <span className="absolute right-5 top-5 font-inter-regular text-xs">N ↑</span>
              <div className="absolute bottom-5 left-5 right-5 bg-[#f5efe6] p-[18px]">
                <p className="mb-3 font-inter-regular text-[11px] leading-[1.5] text-[#79675b]">
                  Illustrative location only—not a verified pin. Exact location to be confirmed.
                </p>
                <Button href="https://www.google.com/maps/search/Pototan,+Iloilo" dark>
                  Get Directions ↗
                </Button>
              </div>
            </div>
            <p className="mt-4 font-inter-regular text-[11px] leading-[1.6] text-[#79675b]">
              The street address and map pin are placeholders pending verification. Project-team
              phone numbers and email addresses are provided above.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-[#3b261d] px-6 py-12 text-[#f5efe6] md:px-16 md:py-[60px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="flex size-16 items-center justify-center rounded-full border border-[#f5efe6]">
              <Logo light />
            </span>
            <div>
              <strong className="block font-outfit-bold text-3xl">Kape Amihan</strong>
              <span className="font-inter-regular text-[10px] tracking-[2px]">
                POTOTAN, ILOILO · EST. 2026
              </span>
            </div>
          </div>
          <p className="font-caveat text-4xl md:text-5xl">Pahuway. Higop. Balik.</p>
          <div className="flex gap-2.5">
            <a
              href="https://www.facebook.com/jay.jay.964155"
              target="_blank"
              rel="noreferrer"
              aria-label="Jay Best Bullon on Facebook"
              className="flex size-10 items-center justify-center rounded-full border border-[#f5efe6]"
            >
              <img src={`${A}/f4aec.svg`} alt="" className="size-[18px]" />
            </a>
            <span
              aria-label="Official Instagram link to be added"
              title="Official Instagram link to be added"
              className="flex size-10 items-center justify-center rounded-full border border-[#f5efe6] opacity-50"
            >
              <img src={`${A}/d1822.svg`} alt="" className="size-[18px]" />
            </span>
            <span
              aria-label="Official X link to be added"
              title="Official X link to be added"
              className="flex size-10 items-center justify-center rounded-full border border-[#f5efe6] opacity-50"
            >
              <img src={`${A}/ff1a3.svg`} alt="" className="size-[18px]" />
            </span>
          </div>
        </div>
        <div className="my-10 h-px bg-[#f5efe6]/20" />
        <div className="grid gap-8 font-inter-regular text-[11px] md:grid-cols-2 md:gap-[90px]">
          <div>
            <p>PRIVACY · PHILIPPINE DATA PRIVACY ACT (RA 10173)</p>
            <p className="mt-2.5 leading-[1.7] text-[#d7c7b7]">
              Names, contact details, and inquiry/order messages would be used only to respond to
              your request and coordinate your order—not for unrelated marketing. This academic
              mockup does not collect or store personal data.
            </p>
          </div>
          <div>
            <p>MADE WITH CARE · AN ACADEMIC CONCEPT</p>
            <p className="mt-2.5 leading-[1.7] text-[#d7c7b7]">
              Planned by Jay Best A. Bullon and John Lorenz Gonzales for University of San Agustin,
              MM 326 E-Commerce & Internet Marketing, under Dr. Carina Raylos, AFBE. Kape Amihan is
              an academic promotional concept, not a verified operating café; its business address,
              menu, prices, hours, promotions, and location graphic remain illustrative until
              confirmed.
            </p>
          </div>
        </div>
        <p className="mt-10 font-inter-regular text-[10px] text-[#d7c7b7]">
          © 2026 Kape Amihan · A little pause in Pototan.
        </p>
      </footer>
    </main>
  );
}

function GalleryImage({
  desktop,
  mobile,
  label,
  tall = false,
}: {
  desktop: string;
  mobile: string;
  label: string;
  tall?: boolean;
}) {
  return (
    <figure
      className={`group relative overflow-hidden ${tall ? "h-[260px] md:h-[340px]" : "h-[210px] md:h-[244px]"}`}
    >
      <ResponsiveImage
        desktop={desktop}
        mobile={mobile}
        alt={label.toLowerCase()}
        className="size-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[#24170f9c]" />
      <figcaption className="absolute bottom-[18px] left-[18px] font-inter-regular text-[11px] tracking-[1px] text-[#f5efe6]">
        {label}
      </figcaption>
    </figure>
  );
}

export default App;
