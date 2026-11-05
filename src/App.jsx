import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionConfig, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import logo from "./assets/logo.png";
import sweep from "./assets/sweep.jpg";
import textured from "./assets/textured.jpg";
import bleach from "./assets/bleach.jpg";
import crop from "./assets/crop.jpg";
import fade from "./assets/fade.jpg";
import fadeLarge from "./assets/fade-large.jpg";

const ease = [0.2, 0.7, 0.1, 1];
const cuts = [
  { name: "Fade and beard", note: "A clean fade into a beard kept full where it counts.", src: fade },
  { name: "Classic taper", note: "Soft sides, a clean neck, length kept where it flatters.", src: sweep },
  { name: "Textured crop", note: "Movement on top, a tidy edge underneath.", src: textured },
  { name: "Bleach and fade", note: "Toned for daylight, faded down to the skin.", src: bleach },
  { name: "Skin fade", note: "Blended so well there is no line to find.", src: crop },
];
const services = [
  { name: "Skin fade", note: "Blended from the skin up, finished with a sharp edge." },
  { name: "Classic taper", note: "The cut you can wear to anything." },
  { name: "Textured crop", note: "Cut dry, so you see how it will actually move." },
  { name: "Colour and bleach", note: "Consultation first, toner always." },
  { name: "Beard sculpt", note: "Shaped to the jaw, not to a template." },
  { name: "Cut and beard", note: "The full reset in one chair." },
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const times = ["10:00", "12:30", "15:00", "17:30"];
const maps = "https://www.google.com/maps/search/?api=1&query=37-39+Bloom+Street+Manchester+M1+3LY";

function Curtains() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 2600); return () => clearTimeout(t); }, []);
  if (done) return null;
  const panel = (l) => (
    <motion.div initial={{ x: 0 }} animate={{ x: l ? "-101%" : "101%" }} transition={{ duration: 1.3, ease, delay: 0.4 }} className={`absolute top-0 h-full w-1/2 bg-[#0d0708] ${l ? "left-0" : "right-0"}`} />
  );
  return <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">{panel(true)}{panel(false)}</div>;
}

const Seal = ({ className = "" }) => (
  <div className={`grid aspect-square place-items-center rounded-full bg-[#f4f4f2] ${className}`}>
    <img src={logo} alt="Barbers Boutique crest" className="w-[70%]" />
  </div>
);

function Nav({ onBook }) {
  return (
    <div className="sticky top-3 z-40 h-0">
      <nav className="mx-auto mt-3 flex w-fit max-w-[calc(100%-1.5rem)] items-center gap-3 rounded-full bg-[#150a0c]/85 p-2 text-white ring-1 ring-white/10 backdrop-blur-md sm:gap-6">
        <a href="#" className="flex items-center gap-3"><Seal className="h-10 w-10 p-0.5" /><span className="display hidden pr-1 text-lg sm:block">Barbers Boutique</span></a>
        <span className="hidden gap-6 text-sm text-white/70 md:flex"><a href="#work" className="hover:text-white">The looks</a><a href="#services" className="hover:text-white">Services</a><a href="#book" className="hover:text-white">Visit</a></span>
        <button onClick={() => onBook()} className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[var(--red)] transition hover:bg-[#f4f4f2]">Book a chair</button>
      </nav>
    </div>
  );
}

function Hero({ onBook }) {
  const lines = ["Dressed", "from the", "neck up."];
  return (
    <section className="relative grid min-h-[calc(100svh-30px)] overflow-hidden bg-[var(--red)] text-[#f8f1ee] md:grid-cols-[1.05fr_0.95fr]">
      <div className="relative order-first h-[56svh] md:order-last md:h-auto">
        <motion.img src={fadeLarge} alt="Fade and beard by Barbers Boutique" initial={{ scale: 1.18 }} animate={{ scale: 1 }} transition={{ duration: 2.6, ease, delay: 0.5 }} className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--red)] from-0% via-transparent via-45% to-transparent md:bg-gradient-to-r" />
        <span className="absolute bottom-6 right-6 hidden rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-md md:block">Fade and beard</span>
      </div>
      <div className="relative z-10 -mt-16 flex flex-col justify-end px-6 pb-14 pt-6 md:mt-0 md:px-14 md:pb-20 md:pt-32">
        <h1 className="display text-[clamp(3.4rem,9vw,8.4rem)] font-normal leading-[0.95]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-2">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 1.3 + i * 0.14 }}>{l}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 0.8 }} className="mt-6 max-w-sm text-lg leading-relaxed text-white/80">Fades, tapers and beards, by appointment in Manchester.</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 0.8 }} className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => onBook()} className="rounded-full bg-white px-8 py-3.5 font-medium text-[var(--red)] transition hover:bg-[#f4f4f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Reserve your chair</button>
          <a href="#work" className="rounded-full border border-white/50 px-8 py-3.5 transition hover:bg-white/10">See the looks</a>
        </motion.div>
      </div>
    </section>
  );
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function Card({ c, i, sway, onBook, dragged }) {
  const r = useTransform(sway, (v) => v * (0.9 + i * 0.1));
  return (
    <motion.div style={{ rotate: r, transformOrigin: "50% 0" }} className="shrink-0 snap-start">
      <motion.button data-card="1" onClick={() => { if (!dragged.current) onBook(c.name); }} initial={{ rotate: 7 }} whileInView={{ rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 55, damping: 6, delay: i * 0.1 }} whileHover={{ rotate: -2 }} style={{ transformOrigin: "50% 0" }} className="relative block w-[250px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--red)]">
        <svg viewBox="0 0 40 30" className="mx-auto h-8 w-10 text-white/80" aria-hidden="true"><path d="M20 30V15C20 5 31 4 31 11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
        <div className="rounded-[4px] bg-[var(--card)] p-2 shadow-[0_28px_50px_-22px_rgba(0,0,0,.85)]" style={{ transform: "translateY(calc(var(--near,0) * -12px)) scale(calc(1 + var(--near,0) * 0.045))", transition: "transform .35s ease-out" }}>
          <img src={c.src} alt={c.name} draggable={false} className="aspect-[3/4] w-full object-cover" style={{ filter: "saturate(calc(0.55 + var(--near,0) * 0.55)) brightness(calc(0.93 + var(--near,0) * 0.1))" }} />
          <div className="px-1 pb-1 pt-4">
            <span className="display block text-2xl">{c.name}</span>
            <span className="mt-1 block text-sm leading-snug text-[var(--muted)]">{c.note}</span>
            <span className="mt-3 inline-block rounded-full bg-[var(--red)] px-4 py-1.5 text-sm text-white">Book this look</span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

function Rail({ onBook }) {
  const sc = useRef(null), hov = useRef(false), dragged = useRef(false), drag = useRef(null);
  const [pos, setPos] = useState({ start: 0, size: 1 });
  const { scrollY } = useScroll();
  const sway = useSpring(useTransform(useVelocity(scrollY), (a) => clamp(-a / 450, -5, 5)), { stiffness: 70, damping: 7 });

  const near = (px, py) => {
    sc.current?.querySelectorAll("[data-card]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2);
      el.style.setProperty("--near", Math.max(0, 1 - Math.hypot(dx, dy * 0.6) / 380).toFixed(3));
      el.style.setProperty("--dx", clamp(dx / 300, -1, 1).toFixed(3));
    });
  };
  const rest = () => { const r = sc.current.getBoundingClientRect(); near(r.left + r.width / 2, window.innerHeight / 2); };
  const measure = () => {
    const el = sc.current; if (!el) return;
    setPos({ size: el.clientWidth / el.scrollWidth, start: el.scrollLeft / el.scrollWidth });
  };
  useEffect(() => {
    const f = () => { measure(); if (!hov.current) rest(); };
    f(); window.addEventListener("scroll", f, { passive: true }); window.addEventListener("resize", f);
    return () => { window.removeEventListener("scroll", f); window.removeEventListener("resize", f); };
  }, []);
  const go = (d) => sc.current?.scrollBy({ left: d * 282, behavior: "smooth" });
  const atStart = pos.start < 0.003, atEnd = pos.start + pos.size > 0.997;
  const arrow = "grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:border-[var(--red)] hover:bg-[var(--red)] disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:bg-transparent";
  const pad = "max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))";

  return (
    <section id="work" className="group relative overflow-hidden bg-[var(--night)] py-20 text-[#f4eeea] md:py-28"
      onMouseMove={(e) => { hov.current = true; near(e.clientX, e.clientY); const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`); }}
      onMouseLeave={() => { hov.current = false; rest(); }}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(520px circle at var(--sx,50%) var(--sy,40%), rgba(200,40,54,.3), transparent 62%)" }} />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="display text-5xl leading-none md:text-6xl">Five looks off the rail</h2>
          <p className="mt-5 max-w-md text-white/60">Drag, swipe or use the arrows. Pick one and we’ll book it in.</p>
        </div>
        
      </div>
      <div ref={sc} onScroll={measure} className="relative mt-12 cursor-grab snap-x snap-proximity overflow-x-auto pb-12 active:cursor-grabbing [scrollbar-width:none]" style={{ scrollPaddingLeft: pad }}
        onPointerDown={(e) => { if (e.pointerType !== "mouse") return; drag.current = { x: e.clientX, l: sc.current.scrollLeft }; dragged.current = false; }}
        onPointerMove={(e) => { if (!drag.current) return; const dx = e.clientX - drag.current.x; if (Math.abs(dx) > 5) { dragged.current = true; sc.current.style.scrollSnapType = "none"; sc.current.scrollLeft = drag.current.l - dx; } }}
        onPointerUp={() => { if (!drag.current) return; drag.current = null; sc.current.style.scrollSnapType = ""; setTimeout(() => { dragged.current = false; }, 0); }}
        onPointerLeave={() => { if (!drag.current) return; drag.current = null; sc.current.style.scrollSnapType = ""; }}>
        <div className="relative flex w-max min-w-full gap-8 pt-3" style={{ paddingLeft: pad, paddingRight: "7rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }} style={{ transformOrigin: "0% 50%" }} className="absolute inset-x-0 top-[22px] h-[3px] bg-white/70" />
          {cuts.map((c, i) => <Card key={c.name} c={c} i={i} sway={sway} onBook={onBook} dragged={dragged} />)}
        </div>
      </div>
      <div className="relative mx-auto flex max-w-6xl items-center gap-5 px-6">
        <div className="relative h-[3px] flex-1 rounded bg-white/15"><div className="absolute top-0 h-full rounded bg-[var(--red)] transition-[left] duration-150" style={{ left: `${pos.start * 100}%`, width: `${pos.size * 100}%` }} /></div>
        <div className="flex shrink-0 gap-2">
          <button aria-label="Previous look" disabled={atStart} onClick={() => go(-1)} className={arrow}><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg></button>
          <button aria-label="Next look" disabled={atEnd} onClick={() => go(1)} className={arrow}><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg></button>
        </div>
      </div>
    </section>
  );
}

function Word({ w, i, n, p }) {
  const o = useTransform(p, [i / n, (i + 1.5) / n], [0.18, 1]);
  return <motion.span style={{ opacity: o }} className="mr-[0.25em] inline-block">{w}</motion.span>;
}

function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = "Every cut is checked from the front, from the side and from behind, then finished with a mirror in your hand.".split(" ");
  return (
    <section className="bg-[var(--red)] px-6 py-24 text-white md:py-32">
      <p ref={ref} className="display mx-auto max-w-5xl text-[clamp(2rem,5.2vw,4.4rem)] leading-[1.08]">
        {words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
      </p>
    </section>
  );
}

const look = {
  "Skin fade": { cls: "bg-[var(--red)] text-white md:col-span-2 md:row-span-2", img: crop, big: true, always: true },
  "Classic taper": { img: sweep },
  "Textured crop": { cls: "bg-[var(--tint)]", img: textured },
  "Colour and bleach": { cls: "bg-[var(--night)] text-white md:col-span-2", img: bleach, pos: "50% 35%" },
  "Beard sculpt": { cls: "bg-[var(--card)] md:col-span-2", img: fade, pos: "62% 82%" },
  "Cut and beard": { cls: "bg-[var(--tint)] md:col-span-2", img: fade, pos: "50% 40%" },
};

function Services({ onBook }) {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="display max-w-xl text-5xl leading-none md:text-6xl">What’s on the menu</h2>
      <div className="mt-14 grid gap-4 md:auto-rows-[210px] md:grid-cols-4">
        {services.map((s) => {
          const t = look[s.name] || {};
          return (
            <button key={s.name} onClick={() => onBook(s.name)} className={`group relative isolate flex ${t.big ? "min-h-[270px] md:min-h-0" : "min-h-[180px]"} flex-col justify-between overflow-hidden rounded-3xl p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--red)] ${t.cls || "bg-[var(--card)]"}`}>
              <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--red)] transition-transform duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100" />
              {t.img && (
                <img src={t.img} alt="" draggable={false} style={{ objectPosition: t.pos || "50% 30%", WebkitMaskImage: "linear-gradient(to right, transparent, #000 45%)", maskImage: "linear-gradient(to right, transparent, #000 45%)" }}
                  className={`absolute right-0 top-0 -z-10 h-full scale-100 object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.15] group-hover:[transition-duration:700ms,7000ms] group-focus-visible:scale-[1.15] ${t.big ? "w-1/2" : "w-2/5"} ${t.always ? "opacity-90" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`} />
              )}
              <span className="relative transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
                <span className={`display block leading-tight ${t.big ? "text-4xl md:text-5xl" : "text-2xl"}`}>{s.name}</span>
                <span className="mt-2 block max-w-[16rem] text-sm opacity-70">{s.note}</span>
              </span>
              <span className={`relative w-fit rounded-full px-4 py-1.5 text-sm ring-1 transition group-hover:bg-white group-hover:text-[var(--red)] group-hover:ring-white ${(t.cls || "").includes("text-white") ? "ring-white/40" : "ring-black/20"}`}>Book this</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Chip({ on, children, ...p }) {
  return <button type="button" {...p} className={`rounded-full border px-4 py-2.5 text-sm transition ${on ? "border-[var(--red)] bg-[var(--red)] text-white" : "border-[var(--line)] hover:border-[var(--ink)]"}`}>{children}</button>;
}

function Book({ svc, setSvc }) {
  const [name, setName] = useState("");
  const [day, setDay] = useState("Fri");
  const [time, setTime] = useState("15:00");
  const [sent, setSent] = useState(false);
  const field = "w-full border-0 border-b border-[var(--line)] bg-transparent py-3 outline-none transition focus:border-[var(--red)]";
  const notch = "absolute hidden h-6 w-6 rounded-full bg-[var(--chalk)] md:block";
  return (
    <section id="book" className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:py-28 md:grid-cols-[0.7fr_1.3fr]">
      <div>
        <h2 className="display text-5xl leading-none md:text-6xl">Find us, then sit down</h2>
        <address className="mt-8 space-y-3 not-italic text-lg leading-relaxed">
          <a href={maps} target="_blank" rel="noreferrer" className="block hover:text-[var(--red)]">37-39 Bloom Street<br />Manchester M1 3LY</a>
          <a href="tel:+441614659675" className="block hover:text-[var(--red)]">+44 161 465 9675</a>
          <a href="mailto:iwantmyhaircut@barbersboutique.co.uk" className="block break-all text-[var(--muted)] hover:text-[var(--red)]">iwantmyhaircut@barbersboutique.co.uk</a>
        </address>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="relative grid overflow-hidden rounded-2xl bg-[var(--card)] shadow-[0_30px_60px_-34px_rgba(60,10,16,.5)] md:grid-cols-[1fr_270px]">
        <div className="space-y-7 p-8 md:p-10">
          <input required value={name} onChange={(e) => { setName(e.target.value); setSent(false); }} placeholder="Your name" className={field} />
          <select value={svc} onChange={(e) => { setSvc(e.target.value); setSent(false); }} className={field}>
            {services.map((s) => <option key={s.name} className="text-black">{s.name}</option>)}
          </select>
          <div className="flex flex-wrap gap-2">{days.map((d) => <Chip key={d} on={d === day} onClick={() => { setDay(d); setSent(false); }}>{d}</Chip>)}</div>
          <div className="flex flex-wrap gap-2">{times.map((t) => <Chip key={t} on={t === time} onClick={() => { setTime(t); setSent(false); }}>{t}</Chip>)}</div>
        </div>
        <div className="relative flex flex-col justify-between gap-8 bg-[var(--red)] p-8 text-white md:border-l-2 md:border-dashed md:border-white/40">
          <span className={`${notch} -left-3 -top-3`} /><span className={`${notch} -bottom-3 -left-3`} />
          <div>
            <p className="text-sm text-white/70">Your chair</p>
            <p className="display mt-2 text-3xl leading-tight">{svc}</p>
            <p className="mt-3">{day} at {time}</p>
            {name && <p className="mt-1 text-white/80">for {name}</p>}
          </div>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="s" initial={{ opacity: 0, scale: 1.5, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: -4 }} transition={{ duration: 0.45, ease }}>
                <p className="inline-block rounded border-2 border-white px-3 py-1 text-lg font-medium">Requested</p>
                <p className="mt-3 text-sm text-white/80">Demo only, so nothing was sent.</p>
              </motion.div>
            ) : (
              <motion.button key="b" exit={{ opacity: 0 }} className="rounded-full bg-white px-6 py-3 font-medium text-[var(--red)] transition hover:bg-[#f4f4f2]">Request this chair</motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="overflow-hidden bg-[var(--night)] text-[#f4eeea]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-20 md:grid-cols-[1.2fr_1fr_1fr]">
        <div><Seal className="h-14 w-14 p-1" /><p className="display mt-5 text-2xl">Barbers Boutique</p></div>
        <address className="not-italic leading-relaxed text-white/75">37-39 Bloom Street<br />Manchester M1 3LY</address>
        <div className="space-y-1 text-white/75">
          <a href="tel:+441614659675" className="block hover:text-white">+44 161 465 9675</a>
          <a href="mailto:iwantmyhaircut@barbersboutique.co.uk" className="block break-all hover:text-white">iwantmyhaircut@barbersboutique.co.uk</a>
        </div>
      </div>
      <p aria-hidden="true" className="display mt-16 select-none whitespace-nowrap text-center text-[10.5vw] leading-[0.8] text-white/[0.07]">Barbers Boutique</p>
    </footer>
  );
}

export default function App() {
  const [svc, setSvc] = useState(services[0].name);
  const book = (n) => {
    if (n) setSvc(n);
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <MotionConfig reducedMotion="user">
      <Curtains />
      <div className="mono bg-[#f1ead3] px-4 py-1.5 text-center text-xs text-[#3b3524]">Concept preview made for Barbers Boutique. Enquiries here are a demo: nothing is sent.</div>
      <Nav onBook={book} />
      <main>
        <Hero onBook={book} />
        <Rail onBook={book} />
        <Statement />
        <Services onBook={book} />
        <Book svc={svc} setSvc={setSvc} />
      </main>
      <Footer />
    </MotionConfig>
  );
}
