import { useState } from "react";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/ProductCard";
import { getProductBySlug, getProductById, Product } from "@/data/products";
import { addToCart, useCart } from "@/store/cartStore";

const MATERIAL_LABELS: Record<string, string> = {
  steel: "Нержавеющая сталь", "cast-iron": "Чугун", soapstone: "Талькохлорит", combined: "Комбинированный",
};
const FUEL_LABELS: Record<string, string> = { wood: "Дровяная", electric: "Электрическая", gas: "Газовая" };

interface ProductPageProps {
  slug: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function ProductPage({ slug, onNavigate }: ProductPageProps) {
  const product = getProductBySlug(slug);
  const cart = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [lightbox, setLightbox] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-3xl mb-4" style={{ color: "#EDE0CF" }}>Товар не найден</h2>
        <button onClick={() => onNavigate("catalog")} className="px-6 py-3 rounded-xl font-semibold"
          style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}>
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const inCart = cart.some((i) => i.productId === product.id);
  const related = product.related.map((id) => getProductById(id)).filter(Boolean) as Product[];

  const handleAdd = () => {
    addToCart(product.id, qty);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-stone-500 mb-8 flex-wrap">
        <button onClick={() => onNavigate("home")} className="hover:text-stone-300 transition-colors">Главная</button>
        <Icon name="ChevronRight" size={14} />
        <button onClick={() => onNavigate("catalog")} className="hover:text-stone-300 transition-colors">Каталог</button>
        <Icon name="ChevronRight" size={14} />
        <span style={{ color: "#E8A04A" }}>{product.name}</span>
      </div>

      {/* MAIN PRODUCT BLOCK */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* GALLERY */}
        <div>
          <div className="relative rounded-2xl overflow-hidden mb-4 cursor-zoom-in group" style={{ aspectRatio: "4/3" }}
            onClick={() => setLightbox(true)}>
            <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.3)" }}>
              <div className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
                style={{ background: "rgba(14,10,6,0.8)", color: "#E8A04A", border: "1px solid rgba(210,120,30,0.3)" }}>
                <Icon name="ZoomIn" size={16} /> Увеличить
              </div>
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-semibold text-white"
                style={{ background: product.badgeColor }}>
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200"
                style={{ border: activeImg === i ? "2px solid #D2781E" : "2px solid transparent", opacity: activeImg === i ? 1 : 0.6 }}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">{product.seriesLabel}</p>
          <h1 className="font-display font-semibold mb-2 leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#EDE0CF" }}>
            {product.name}
          </h1>
          <p className="text-stone-400 mb-4">{product.subtitle}</p>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b" style={{ borderColor: "rgba(210,120,30,0.1)" }}>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} style={{ color: s <= Math.round(product.rating) ? "#F59E0B" : "#374151", fontSize: 18 }}>★</span>
              ))}
            </div>
            <span className="font-semibold" style={{ color: "#EDE0CF" }}>{product.rating}</span>
            <button onClick={() => setActiveTab("reviews")} className="text-sm text-stone-500 hover:text-stone-300 transition-colors">
              {product.reviewCount} отзывов
            </button>
            <span className="ml-auto text-sm" style={{ color: product.inStock ? "#34D399" : "#EF4444" }}>
              {product.inStock ? `✓ В наличии (${product.stockCount} шт.)` : "✗ Нет в наличии"}
            </span>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: "Flame", label: "Объём парной", value: product.specs.volume },
              { icon: "Timer", label: "Время нагрева", value: product.specs.heatTime },
              { icon: "Zap", label: "Мощность", value: product.specs.power },
              { icon: "Weight", label: "Вес", value: product.specs.weight },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(210,120,30,0.06)", border: "1px solid rgba(210,120,30,0.12)" }}>
                <Icon name={s.icon as "Flame"} size={16} style={{ color: "#D2781E" }} />
                <div>
                  <div className="text-xs text-stone-500">{s.label}</div>
                  <div className="text-sm font-semibold" style={{ color: "#EDE0CF" }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="font-semibold" style={{ fontSize: "2rem", color: "#E8A04A" }}>
                {product.price.toLocaleString("ru-RU")} ₽
              </span>
              {product.oldPrice && (
                <span className="text-lg text-stone-600 line-through">{product.oldPrice.toLocaleString("ru-RU")} ₽</span>
              )}
              {product.oldPrice && (
                <span className="px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: "rgba(5,150,105,0.15)", color: "#34D399" }}>
                  −{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>
          </div>

          {/* Quantity + Add */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center rounded-xl overflow-hidden border" style={{ borderColor: "rgba(210,120,30,0.2)" }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-white/5" style={{ color: "#E8A04A" }}>
                <Icon name="Minus" size={16} />
              </button>
              <span className="w-12 text-center font-semibold" style={{ color: "#EDE0CF" }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-11 h-11 flex items-center justify-center transition-colors hover:bg-white/5" style={{ color: "#E8A04A" }}>
                <Icon name="Plus" size={16} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed glow-ember"
              style={inCart
                ? { background: "rgba(5,150,105,0.15)", color: "#34D399", border: "1px solid rgba(5,150,105,0.3)" }
                : { background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}
            >
              <Icon name={inCart ? "Check" : "ShoppingCart"} size={18} />
              {inCart ? "Добавлено в корзину" : "Добавить в корзину"}
            </button>
          </div>

          {inCart && (
            <button onClick={() => onNavigate("cart")} className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:bg-white/5 mb-4"
              style={{ border: "1px solid rgba(210,120,30,0.35)", color: "#E8A04A" }}>
              Перейти в корзину →
            </button>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              { icon: "Shield", text: "Гарантия 5 лет" },
              { icon: "Truck", text: "Бесплатная доставка" },
              { icon: "RotateCcw", text: "Возврат 30 дней" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5 text-xs text-stone-500">
                <Icon name={b.icon as "Shield"} size={13} style={{ color: "#D2781E" }} />
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-16">
        <div className="flex gap-1 mb-8 border-b" style={{ borderColor: "rgba(210,120,30,0.12)" }}>
          {[
            { id: "desc", label: "Описание" },
            { id: "specs", label: "Характеристики" },
            { id: "reviews", label: `Отзывы (${product.reviews.length})` },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-[1px]"
              style={{
                borderColor: activeTab === tab.id ? "#D2781E" : "transparent",
                color: activeTab === tab.id ? "#E8A04A" : "#6B7280",
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "desc" && (
          <div className="max-w-3xl">
            <p className="text-stone-400 leading-relaxed text-base mb-8">{product.description}</p>
            <h3 className="font-semibold mb-4" style={{ color: "#EDE0CF" }}>Особенности и преимущества</h3>
            <ul className="space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(210,120,30,0.15)", border: "1px solid rgba(210,120,30,0.3)" }}>
                    <Icon name="Check" size={11} style={{ color: "#D2781E" }} />
                  </div>
                  <span className="text-stone-300">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="max-w-2xl">
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(210,120,30,0.15)" }}>
              {[
                { label: "Объём парной", value: product.specs.volume },
                { label: "Мощность", value: product.specs.power },
                { label: "Вес", value: product.specs.weight },
                { label: "Габариты (ДxШxВ)", value: product.specs.dimensions },
                { label: "Материал корпуса", value: MATERIAL_LABELS[product.specs.material] || product.specs.material },
                { label: "Тип топлива", value: FUEL_LABELS[product.specs.fuel] || product.specs.fuel },
                { label: "Макс. загрузка камней", value: product.specs.maxLoad },
                { label: "Время нагрева", value: product.specs.heatTime },
                { label: "Время сохранения жара", value: product.specs.steamTime },
              ].map((row, i) => (
                <div key={row.label}
                  className="flex items-center justify-between px-5 py-3.5 border-b last:border-0"
                  style={{ background: i % 2 === 0 ? "#14100A" : "#110E08", borderColor: "rgba(210,120,30,0.08)" }}>
                  <span className="text-sm text-stone-500">{row.label}</span>
                  <span className="text-sm font-medium" style={{ color: "#EDE0CF" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-3xl space-y-4">
            {product.reviews.map((r) => (
              <div key={r.id} className="p-6 rounded-2xl border" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.12)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
                      style={{ background: "rgba(210,120,30,0.18)", color: "#E8A04A" }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "#EDE0CF" }}>{r.name}</div>
                      <div className="text-xs text-stone-500">{r.city} · {r.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-amber-400 text-sm">{"★".repeat(r.rating)}</div>
                    {r.verified && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(5,150,105,0.12)", color: "#34D399" }}>
                        ✓ Подтверждено
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display font-semibold text-2xl mb-8" style={{ color: "#EDE0CF" }}>
            Похожие товары
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.93)" }}
          onClick={() => setLightbox(false)}>
          <button className="absolute top-6 right-6 p-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "#9CA3AF" }}>
            <Icon name="X" size={24} />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "#9CA3AF" }}
            onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg - 1 + product.images.length) % product.images.length); }}>
            <Icon name="ChevronLeft" size={24} />
          </button>
          <img src={product.images[activeImg]} alt={product.name}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()} />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "#9CA3AF" }}
            onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg + 1) % product.images.length); }}>
            <Icon name="ChevronRight" size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
