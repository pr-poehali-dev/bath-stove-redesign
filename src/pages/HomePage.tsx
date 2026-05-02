import { useRef, useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

const HERO_IMG = "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/cbb2c6b2-b49b-4a7f-b317-9167537e3730.jpg";

function useVisible(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useVisible();
  return (
    <div ref={ref} className={`transition-all duration-800 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const hits = PRODUCTS.filter((p) => p.badge || p.rating >= 4.8).slice(0, 4);
  const newItems = PRODUCTS.filter((p) => p.badge === "Новинка" || p.id >= 6).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Баня" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(14,10,6,0.85) 0%, rgba(14,10,6,0.4) 50%, rgba(14,10,6,0.8) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(210,120,30,0.12) 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 text-sm font-medium animate-fade-in"
              style={{ borderColor: "rgba(210,120,30,0.3)", color: "#E8A04A", background: "rgba(210,120,30,0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#D2781E" }} />
              Официальный интернет-магазин
            </div>

            <h1 className="font-display font-semibold leading-[1.05] mb-6 animate-fade-up"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
              Печи для бани <br />
              <span className="text-fire-gradient">премиум-класса</span>
            </h1>

            <p className="text-stone-400 leading-relaxed mb-8 animate-fade-up" style={{ fontSize: "1.1rem", animationDelay: "0.15s" }}>
              8 моделей в каталоге — от компактных дачных до коммерческих VIP-бань. Доставка по всей России, профессиональный монтаж, гарантия 5 лет.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <button
                onClick={() => onNavigate("catalog")}
                className="px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 glow-ember"
                style={{ background: "linear-gradient(135deg, #D2781E, #E8A04A)", color: "#0E0A06" }}>
                Смотреть каталог
              </button>
              <button
                onClick={() => onNavigate("contacts")}
                className="px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-white/5"
                style={{ border: "1px solid rgba(210,120,30,0.35)", color: "#E8A04A" }}>
                Получить консультацию
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float opacity-40">
          <Icon name="ChevronDown" size={26} style={{ color: "#D2781E" }} />
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="border-y" style={{ borderColor: "rgba(210,120,30,0.1)", background: "#100C08" }}>
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "Award", value: "12 лет", label: "на рынке" },
            { icon: "Users", value: "1 500+", label: "установок" },
            { icon: "Shield", value: "5 лет", label: "гарантия" },
            { icon: "Truck", value: "Бесплатно", label: "доставка от 40 000 ₽" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(210,120,30,0.1)", border: "1px solid rgba(210,120,30,0.18)" }}>
                <Icon name={item.icon as "Award"} size={18} style={{ color: "#D2781E" }} />
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: "#EDE0CF" }}>{item.value}</div>
                <div className="text-xs text-stone-500">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* СЕРИИ */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: "#D2781E" }}>Коллекции</p>
            <h2 className="font-display font-semibold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>Серии печей</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: "classic", label: "Классическая", icon: "Flame", count: 2 },
              { id: "scandic", label: "Скандинавская", icon: "Mountain", count: 2 },
              { id: "russian", label: "Традиционная", icon: "Leaf", count: 2 },
              { id: "electric", label: "Электро", icon: "Zap", count: 1 },
              { id: "premium", label: "Премиум", icon: "Star", count: 1 },
            ].map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <button
                  onClick={() => onNavigate("catalog", { series: s.id })}
                  className="w-full p-5 rounded-2xl border text-center transition-all duration-300 hover:-translate-y-1 group"
                  style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(210,120,30,0.45)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(210,120,30,0.15)")}
                >
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(210,120,30,0.1)", border: "1px solid rgba(210,120,30,0.2)" }}>
                    <Icon name={s.icon as "Flame"} size={22} style={{ color: "#D2781E" }} />
                  </div>
                  <div className="font-medium text-sm mb-1" style={{ color: "#EDE0CF" }}>{s.label}</div>
                  <div className="text-xs text-stone-500">{s.count} модели</div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ХИТЫ */}
      <section className="py-20 px-6 section-divider" style={{ background: "#0B0805" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: "#D2781E" }}>Популярное</p>
              <h2 className="font-display font-semibold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>Хиты продаж</h2>
            </div>
            <button onClick={() => onNavigate("catalog")}
              className="hidden md:flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "#E8A04A" }}>
              Весь каталог <Icon name="ArrowRight" size={16} />
            </button>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hits.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} onNavigate={onNavigate} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <button onClick={() => onNavigate("catalog")}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{ border: "1px solid rgba(210,120,30,0.35)", color: "#E8A04A" }}>
              Весь каталог
            </button>
          </div>
        </div>
      </section>

      {/* НОВИНКИ */}
      <section className="py-20 px-6 section-divider">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: "#D2781E" }}>Новое</p>
              <h2 className="font-display font-semibold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>Новинки и акции</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newItems.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} onNavigate={onNavigate} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-6" style={{ background: "#0B0805" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: "#D2781E" }}>Почему мы</p>
            <h2 className="font-display font-semibold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>Наши преимущества</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Factory", title: "Собственное производство", text: "Контролируем каждый этап — от прокатки стали до упаковки. Никаких посредников." },
              { icon: "Wrench", title: "Монтаж под ключ", text: "Бригады мастеров в 45 городах России. Выезд на следующий день после доставки." },
              { icon: "HeadphonesIcon", title: "Поддержка 7 дней в неделю", text: "Консультируем по выбору, помогаем с монтажом, решаем гарантийные случаи." },
              { icon: "Leaf", title: "Экологичные материалы", text: "Только сертифицированная сталь и природные материалы. Безопасно для здоровья." },
              { icon: "CreditCard", title: "Удобная оплата", text: "Наличные, карта, рассрочка 0% на 12 месяцев, оплата при получении." },
              { icon: "RotateCcw", title: "Возврат 30 дней", text: "Не подошла — вернём деньги без вопросов в течение 30 дней с момента покупки." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="p-6 rounded-2xl border transition-all duration-300 hover:border-amber-700/40 group"
                  style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.12)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(210,120,30,0.1)", border: "1px solid rgba(210,120,30,0.2)" }}>
                    <Icon name={item.icon as "Factory"} size={22} style={{ color: "#D2781E" }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: "#EDE0CF" }}>{item.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1A0F06 0%, #2A1608 50%, #1A0F06 100%)", border: "1px solid rgba(210,120,30,0.25)" }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(210,120,30,0.08) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <h2 className="font-display font-semibold mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#EDE0CF" }}>
                  Не можете выбрать?
                </h2>
                <p className="text-stone-400 mb-8 max-w-xl mx-auto leading-relaxed">
                  Расскажите о своей бане — мы подберём идеальную печь под ваши размеры, тип бани и бюджет. Бесплатная консультация.
                </p>
                <button onClick={() => onNavigate("contacts")}
                  className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 glow-ember"
                  style={{ background: "linear-gradient(135deg, #D2781E, #E8A04A)", color: "#0E0A06" }}>
                  Получить консультацию бесплатно
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
