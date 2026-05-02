import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useCart, useUser } from "@/store/cartStore";
import { PRODUCTS } from "@/data/products";

interface LayoutProps {
  children: React.ReactNode;
  page: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function Layout({ children, page, onNavigate }: LayoutProps) {
  const cart = useCart();
  const user = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const searchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const nav = (p: string, params?: Record<string, string>) => {
    onNavigate(p, params);
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0E0A06", color: "#EDE0CF" }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass-dark border-b" style={{ borderColor: "rgba(210,120,30,0.12)" }}>
        {/* Top bar */}
        <div className="hidden md:block border-b text-xs py-2" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)" }}>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-stone-500">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5"><Icon name="Phone" size={12} style={{ color: "#D2781E" }} /> +7 (800) 555-XX-XX — бесплатно</span>
              <span className="flex items-center gap-1.5"><Icon name="Clock" size={12} style={{ color: "#D2781E" }} /> Пн–Пт 9:00–20:00</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5"><Icon name="Truck" size={12} style={{ color: "#D2781E" }} /> Бесплатная доставка от 40 000 ₽</span>
              <span className="flex items-center gap-1.5"><Icon name="Shield" size={12} style={{ color: "#D2781E" }} /> Гарантия 5 лет</span>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <button onClick={() => nav("home")} className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🔥</span>
            <span className="font-display text-xl font-semibold" style={{ color: "#E8A04A" }}>ОгнеПечь</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {[
              { id: "home", label: "Главная" },
              { id: "catalog", label: "Каталог" },
              { id: "delivery", label: "Доставка" },
              { id: "contacts", label: "Контакты" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => nav(item.id)}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                style={{
                  color: page === item.id ? "#E8A04A" : "#9CA3AF",
                  background: page === item.id ? "rgba(210,120,30,0.1)" : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative hidden md:block">
            {searchOpen ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <div className="relative">
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Найти печь..."
                    className="w-64 px-4 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(210,120,30,0.3)", color: "#EDE0CF" }}
                  />
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-72 rounded-xl overflow-hidden shadow-2xl z-50"
                      style={{ background: "#1A130C", border: "1px solid rgba(210,120,30,0.2)" }}>
                      {searchResults.map((p) => (
                        <button key={p.id} onClick={() => nav("product", { slug: p.slug })}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors border-b last:border-0"
                          style={{ borderColor: "rgba(210,120,30,0.1)" }}>
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                          <div>
                            <div className="text-sm font-medium" style={{ color: "#EDE0CF" }}>{p.name}</div>
                            <div className="text-xs" style={{ color: "#E8A04A" }}>{p.price.toLocaleString("ru-RU")} ₽</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="p-2 text-stone-400">
                  <Icon name="X" size={18} />
                </button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg transition-colors hover:bg-white/5" style={{ color: "#9CA3AF" }}>
                <Icon name="Search" size={20} />
              </button>
            )}
          </div>

          {/* User */}
          <button onClick={() => nav("account")}
            className="p-2 rounded-lg transition-colors hover:bg-white/5 relative"
            style={{ color: user ? "#E8A04A" : "#9CA3AF" }}>
            <Icon name="User" size={20} />
            {user && <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#D2781E" }} />}
          </button>

          {/* Cart */}
          <button onClick={() => nav("cart")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-white/5 relative"
            style={{ color: totalItems > 0 ? "#E8A04A" : "#9CA3AF" }}>
            <Icon name="ShoppingCart" size={20} />
            {totalItems > 0 && (
              <span className="min-w-[20px] h-5 rounded-full text-xs font-bold flex items-center justify-center px-1"
                style={{ background: "linear-gradient(135deg, #D2781E, #E8A04A)", color: "#0E0A06" }}>
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" style={{ color: "#9CA3AF" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-1" style={{ borderColor: "rgba(210,120,30,0.1)", background: "#100C08" }}>
            {[
              { id: "home", label: "Главная", icon: "Home" },
              { id: "catalog", label: "Каталог", icon: "Grid3X3" },
              { id: "delivery", label: "Доставка", icon: "Truck" },
              { id: "contacts", label: "Контакты", icon: "Phone" },
              { id: "account", label: "Личный кабинет", icon: "User" },
            ].map((item) => (
              <button key={item.id} onClick={() => nav(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors"
                style={{ color: "#D1D5DB", background: page === item.id ? "rgba(210,120,30,0.1)" : "transparent" }}>
                <Icon name={item.icon as "Home"} size={18} style={{ color: "#D2781E" }} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="border-t mt-20" style={{ borderColor: "rgba(210,120,30,0.1)", background: "#080604" }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🔥</span>
                <span className="font-display text-xl font-semibold" style={{ color: "#E8A04A" }}>ОгнеПечь</span>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed">
                Печи премиум-класса для настоящей бани. 12 лет опыта, 1500+ установок по всей России.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: "#E8A04A" }}>Каталог</h4>
              <div className="space-y-2">
                {["Классическая серия", "Скандинавская серия", "Традиционные", "Электро", "Премиум"].map((l) => (
                  <button key={l} onClick={() => nav("catalog")} className="block text-sm text-stone-500 hover:text-stone-300 transition-colors">{l}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: "#E8A04A" }}>Покупателям</h4>
              <div className="space-y-2">
                {["Доставка и монтаж", "Гарантия", "Возврат", "Оплата"].map((l) => (
                  <button key={l} onClick={() => nav("delivery")} className="block text-sm text-stone-500 hover:text-stone-300 transition-colors">{l}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: "#E8A04A" }}>Контакты</h4>
              <div className="space-y-3 text-sm text-stone-500">
                <div className="flex items-center gap-2"><Icon name="Phone" size={14} style={{ color: "#D2781E" }} /> +7 (800) 555-XX-XX</div>
                <div className="flex items-center gap-2"><Icon name="Mail" size={14} style={{ color: "#D2781E" }} /> info@ognepech.ru</div>
                <div className="flex items-center gap-2"><Icon name="MapPin" size={14} style={{ color: "#D2781E" }} /> Москва, ул. Примерная, 1</div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-600"
            style={{ borderColor: "rgba(210,120,30,0.08)" }}>
            <span>© 2025 ОгнеПечь. Все права защищены.</span>
            <div className="flex gap-6">
              <button className="hover:text-stone-400 transition-colors">Политика конфиденциальности</button>
              <button className="hover:text-stone-400 transition-colors">Публичная оферта</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
