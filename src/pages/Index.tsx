import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  hero: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/cbb2c6b2-b49b-4a7f-b317-9167537e3730.jpg",
  gallery1: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/f09f06fb-f553-4e67-a1d3-3a79bb3cae64.jpg",
  gallery2: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/be61cc5f-dd27-46f7-974e-f0f7dae1a551.jpg",
  catalog1: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/4bbc48ea-8f11-4f1c-ab14-9082bd70f74c.jpg",
  catalog2: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/1f51ea85-9d76-4fda-8a11-b20008c7e355.jpg",
  catalog3: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/47923b95-e366-414f-b520-635ce01306e9.jpg",
};

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "gallery", label: "Галерея" },
  { id: "delivery", label: "Доставка" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

const CATALOG_ITEMS = [
  {
    id: 1,
    name: "Харизма Pro",
    series: "Классическая серия",
    price: "от 48 900 ₽",
    power: "12–22 м³",
    material: "Нержавеющая сталь",
    img: IMAGES.catalog1,
    badge: "Хит продаж",
    badgeColor: "bg-amber-500",
  },
  {
    id: 2,
    name: "Скандик Elite",
    series: "Скандинавская серия",
    price: "от 67 500 ₽",
    power: "18–36 м³",
    material: "Талькохлорит + сталь",
    img: IMAGES.catalog2,
    badge: "Новинка",
    badgeColor: "bg-emerald-600",
  },
  {
    id: 3,
    name: "Русская Душа",
    series: "Традиционная серия",
    price: "от 39 200 ₽",
    power: "8–18 м³",
    material: "Чугун",
    img: IMAGES.catalog3,
    badge: null,
    badgeColor: "",
  },
];

const GALLERY_ITEMS = [
  { img: IMAGES.hero, caption: "Баня в стиле лофт" },
  { img: IMAGES.gallery1, caption: "Финская сауна" },
  { img: IMAGES.gallery2, caption: "Русская баня" },
  { img: IMAGES.catalog1, caption: "Современный интерьер" },
  { img: IMAGES.catalog2, caption: "Скандинавский стиль" },
  { img: IMAGES.catalog3, caption: "Традиционная атмосфера" },
];

const REVIEWS = [
  {
    name: "Алексей В.",
    city: "Москва",
    text: "Печь Харизма Pro — это шедевр. Баня прогревается за 45 минут, камни держат жар до 3 часов. Соседи завидуют!",
    rating: 5,
    date: "Март 2025",
  },
  {
    name: "Марина К.",
    city: "Санкт-Петербург",
    text: "Заказали Скандик Elite под ключ. Монтажники приехали вовремя, всё аккуратно установили. Уже третий год пользуемся — ни единой проблемы.",
    rating: 5,
    date: "Январь 2025",
  },
  {
    name: "Дмитрий С.",
    city: "Екатеринбург",
    text: "Долго выбирал печь — консультант помог подобрать под размер бани. Доставка пришла раньше срока, упаковка идеальная.",
    rating: 5,
    date: "Февраль 2025",
  },
  {
    name: "Ольга Н.",
    city: "Казань",
    text: "Русская Душа — именно то, что я искала. Настоящий пар, мягкий жар, дровяной аромат. Рекомендую всем любителям традиционной бани.",
    rating: 5,
    date: "Апрель 2025",
  },
];

function useIntersection(ref: React.RefObject<Element>, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((n) => n.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "#0E0A06", color: "#EDE0CF" }}>

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-ember/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="font-display text-xl font-semibold" style={{ color: "#E8A04A" }}>
              ОгнеПечь
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 font-body"
                style={{
                  color: activeSection === item.id ? "#E8A04A" : "#9CA3AF",
                  background: activeSection === item.id ? "rgba(210,120,30,0.1)" : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:block px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #D2781E, #E8A04A)", color: "#0E0A06" }}
          >
            Получить консультацию
          </button>

          <button className="md:hidden p-2" style={{ color: "#9CA3AF" }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-dark border-t px-6 py-4 flex flex-col gap-2" style={{ borderColor: "rgba(210,120,30,0.1)" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left py-3 font-medium border-b last:border-0 transition-colors"
                style={{ color: "#D1D5DB", borderColor: "rgba(210,120,30,0.1)" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="Баня с печью" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(14,10,6,0.3) 0%, rgba(14,10,6,0.5) 50%, rgba(14,10,6,0.95) 100%)"
          }} />
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(210,120,30,0.25) 0%, transparent 70%)", filter: "blur(60px)" }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
          <div
            className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-medium"
            style={{ borderColor: "rgba(210,120,30,0.3)", color: "#E8A04A", background: "rgba(210,120,30,0.08)" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#D2781E" }} />
            Более 1500 довольных клиентов
          </div>

          <h1
            className="font-display font-semibold leading-tight mb-6 animate-fade-up"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", letterSpacing: "-0.02em" }}
          >
            Печи, которые{" "}
            <span className="text-fire-gradient">создают атмосферу</span>
          </h1>

          <p
            className="text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", animationDelay: "0.15s" }}
          >
            Банные печи премиум-класса для истинных ценителей. От классической русской бани до скандинавской сауны — каждая печь создана для совершенного пара.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => scrollTo("catalog")}
              className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 glow-ember hover:scale-105"
              style={{ background: "linear-gradient(135deg, #D2781E, #E8A04A)", color: "#0E0A06" }}
            >
              Смотреть каталог
            </button>
            <button
              onClick={() => scrollTo("gallery")}
              className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-white/5"
              style={{ border: "1px solid rgba(210,120,30,0.4)", color: "#E8A04A" }}
            >
              Галерея работ
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.45s" }}>
            {[
              { value: "12+", label: "лет на рынке" },
              { value: "1500+", label: "установок" },
              { value: "5 лет", label: "гарантия" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-semibold mb-1 text-fire-gradient"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-stone-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float opacity-40">
          <Icon name="ChevronDown" size={28} style={{ color: "#D2781E" }} />
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 px-6 section-divider">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "#D2781E" }}>
              Наши модели
            </p>
            <h2 className="font-display font-semibold mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Каталог печей
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto">
              Каждая модель проходит многоступенчатый контроль качества и поставляется с пятилетней гарантией
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {CATALOG_ITEMS.map((item, i) => (
              <AnimatedSection key={item.id}>
                <div
                  className="group rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(210,120,30,0.45)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(210,120,30,0.15)")}
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(14,10,6,0.8) 0%, transparent 60%)" }}
                    />
                    {item.badge && (
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">{item.series}</p>
                    <h3 className="font-display font-semibold text-2xl mb-4" style={{ color: "#EDE0CF" }}>{item.name}</h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-stone-400">
                        <Icon name="Flame" size={14} style={{ color: "#D2781E" }} />
                        Объём парной: {item.power}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-stone-400">
                        <Icon name="Layers" size={14} style={{ color: "#D2781E" }} />
                        {item.material}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg" style={{ color: "#E8A04A" }}>{item.price}</span>
                      <button
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:opacity-90"
                        style={{ background: "rgba(210,120,30,0.12)", color: "#E8A04A", border: "1px solid rgba(210,120,30,0.25)" }}
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 section-divider" style={{ background: "#0B0805" }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "#D2781E" }}>
              Вдохновение
            </p>
            <h2 className="font-display font-semibold mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Печи в интерьере бани
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto">
              Реальные фото наших установок — каждая баня уникальна и создаёт свою особую атмосферу
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <AnimatedSection key={i}>
                <div
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  style={{ aspectRatio: (i === 0 || i === 3) ? "3/4" : "1/1" }}
                  onClick={() => setGalleryOpen(i)}
                >
                  <img
                    src={item.img}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4"
                    style={{ background: "linear-gradient(to top, rgba(14,10,6,0.85) 0%, transparent 60%)" }}
                  >
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#E8A04A" }}>
                      <Icon name="Expand" size={16} />
                      {item.caption}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {galleryOpen !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.93)" }}
            onClick={() => setGalleryOpen(null)}
          >
            <button className="absolute top-6 right-6 p-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "#9CA3AF" }}>
              <Icon name="X" size={24} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full"
              style={{ background: "rgba(255,255,255,0.1)", color: "#9CA3AF" }}
              onClick={(e) => { e.stopPropagation(); setGalleryOpen((galleryOpen - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length); }}
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            <img
              src={GALLERY_ITEMS[galleryOpen].img}
              alt={GALLERY_ITEMS[galleryOpen].caption}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full"
              style={{ background: "rgba(255,255,255,0.1)", color: "#9CA3AF" }}
              onClick={(e) => { e.stopPropagation(); setGalleryOpen((galleryOpen + 1) % GALLERY_ITEMS.length); }}
            >
              <Icon name="ChevronRight" size={24} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm" style={{ color: "#6B7280" }}>
              {GALLERY_ITEMS[galleryOpen].caption} · {galleryOpen + 1} / {GALLERY_ITEMS.length}
            </div>
          </div>
        )}
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 px-6 section-divider">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "#D2781E" }}>
              Логистика
            </p>
            <h2 className="font-display font-semibold mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Доставка и монтаж
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                {[
                  { icon: "Package", title: "Бесплатная доставка", text: "При заказе от 40 000 ₽ доставляем бесплатно по всей России. Упаковка защищает от любых повреждений." },
                  { icon: "Truck", title: "Срок доставки 3–7 дней", text: "Москва и МО — 1–2 дня. Регионы — до 7 рабочих дней. Отслеживание груза в реальном времени." },
                  { icon: "Wrench", title: "Профессиональный монтаж", text: "Наши мастера установят и подключат печь, настроят дымоход. Гарантия на монтаж — 2 года." },
                  { icon: "Shield", title: "Гарантия 5 лет", text: "Полная гарантия на корпус и все комплектующие. Бесплатный выезд мастера по гарантийным случаям." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 group">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: "rgba(210,120,30,0.1)", border: "1px solid rgba(210,120,30,0.2)" }}
                    >
                      <Icon name={item.icon as "Package"} size={20} style={{ color: "#D2781E" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: "#EDE0CF" }}>{item.title}</h3>
                      <p className="text-sm text-stone-500 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="rounded-2xl overflow-hidden" style={{ background: "#14100A", border: "1px solid rgba(210,120,30,0.15)" }}>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: "#EDE0CF" }}>
                    Стоимость доставки
                  </h3>
                  <div className="space-y-4">
                    {[
                      { zone: "Москва и МО", price: "Бесплатно", days: "1–2 дня" },
                      { zone: "ЦФО", price: "от 1 200 ₽", days: "2–4 дня" },
                      { zone: "Остальные регионы", price: "от 2 500 ₽", days: "4–7 дней" },
                      { zone: "Дальний Восток", price: "по запросу", days: "7–14 дней" },
                    ].map((row) => (
                      <div
                        key={row.zone}
                        className="flex items-center justify-between py-3 border-b last:border-0"
                        style={{ borderColor: "rgba(210,120,30,0.1)" }}
                      >
                        <span className="text-stone-300">{row.zone}</span>
                        <div className="text-right">
                          <div className="font-semibold" style={{ color: "#E8A04A" }}>{row.price}</div>
                          <div className="text-xs text-stone-500">{row.days}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 rounded-xl text-sm text-stone-400"
                    style={{ background: "rgba(210,120,30,0.06)", border: "1px solid rgba(210,120,30,0.12)" }}>
                    При заказе от <span style={{ color: "#E8A04A" }}>40 000 ₽</span> — доставка по России бесплатно
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 section-divider" style={{ background: "#0B0805" }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "#D2781E" }}>
              Отзывы
            </p>
            <h2 className="font-display font-semibold mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Что говорят клиенты
            </h2>
            <div className="flex items-center justify-center gap-2 text-stone-400">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">★</span>
                ))}
              </div>
              <span className="font-semibold" style={{ color: "#EDE0CF" }}>4.9</span>
              <span>· 248 отзывов</span>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((review, i) => (
              <AnimatedSection key={i}>
                <div
                  className="p-6 rounded-2xl border transition-all duration-300"
                  style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.12)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(210,120,30,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(210,120,30,0.12)")}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
                        style={{ background: "rgba(210,120,30,0.18)", color: "#E8A04A" }}
                      >
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: "#EDE0CF" }}>{review.name}</div>
                        <div className="text-xs text-stone-500">{review.city}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-400 text-sm">{"★".repeat(review.rating)}</div>
                      <div className="text-xs text-stone-500 mt-1">{review.date}</div>
                    </div>
                  </div>
                  <p className="text-stone-400 text-sm leading-relaxed">{review.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 section-divider">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "#D2781E" }}>
                Связаться с нами
              </p>
              <h2 className="font-display font-semibold mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                Контакты
              </h2>
              <p className="text-stone-400 mb-8 leading-relaxed">
                Наши специалисты помогут подобрать печь под размер вашей бани, рассчитают стоимость доставки и ответят на все вопросы.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (800) 555-XX-XX", hint: "Бесплатно по России" },
                  { icon: "Mail", label: "Email", value: "info@ognepech.ru", hint: "Ответим за 2 часа" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, 1", hint: "Шоурум открыт Пн–Сб 10:00–19:00" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–20:00", hint: "Сб–Вс: 10:00–18:00" },
                ].map((contact) => (
                  <div key={contact.label} className="flex gap-4 items-start">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(210,120,30,0.1)", border: "1px solid rgba(210,120,30,0.2)" }}
                    >
                      <Icon name={contact.icon as "Phone"} size={18} style={{ color: "#D2781E" }} />
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 mb-0.5">{contact.label}</div>
                      <div className="font-medium" style={{ color: "#EDE0CF" }}>{contact.value}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{contact.hint}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="rounded-2xl p-8" style={{ background: "#14100A", border: "1px solid rgba(210,120,30,0.15)" }}>
                <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: "#EDE0CF" }}>
                  Оставить заявку
                </h3>
                <div className="space-y-4">
                  {[
                    { placeholder: "Ваше имя", type: "text" },
                    { placeholder: "Телефон", type: "tel" },
                    { placeholder: "Email (необязательно)", type: "email" },
                  ].map((field) => (
                    <input
                      key={field.placeholder}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-body placeholder:text-stone-600"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(210,120,30,0.2)",
                        color: "#EDE0CF",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.2)")}
                    />
                  ))}
                  <textarea
                    placeholder="Расскажите о вашей бане (размер, тип, пожелания)"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none font-body placeholder:text-stone-600"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(210,120,30,0.2)",
                      color: "#EDE0CF",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.2)")}
                  />
                  <button
                    className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:opacity-90 hover:scale-[1.02] glow-ember"
                    style={{ background: "linear-gradient(135deg, #D2781E, #E8A04A)", color: "#0E0A06" }}
                  >
                    Отправить заявку
                  </button>
                  <p className="text-xs text-stone-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: "rgba(210,120,30,0.1)", background: "#080604" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="font-display text-xl font-semibold" style={{ color: "#E8A04A" }}>ОгнеПечь</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-stone-600 text-sm">© 2025 ОгнеПечь. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
