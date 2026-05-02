import Icon from "@/components/ui/icon";
import { Product } from "@/data/products";
import { addToCart, useCart } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  const cart = useCart();
  const inCart = cart.some((i) => i.productId === product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <div
      className="group rounded-2xl overflow-hidden border cursor-pointer transition-all duration-400 hover:-translate-y-1 flex flex-col"
      style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(210,120,30,0.4)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(210,120,30,0.15)")}
      onClick={() => onNavigate("product", { slug: product.slug })}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 240 }}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,10,6,0.7) 0%, transparent 55%)" }} />

        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: product.badgeColor }}>
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(14,10,6,0.65)" }}>
            <span className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "rgba(0,0,0,0.6)", color: "#9CA3AF", border: "1px solid rgba(255,255,255,0.1)" }}>
              Нет в наличии
            </span>
          </div>
        )}

        {/* Quick view hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
            style={{ background: "rgba(14,10,6,0.85)", color: "#E8A04A", border: "1px solid rgba(210,120,30,0.3)" }}>
            <Icon name="Eye" size={12} />
            Подробнее
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">{product.seriesLabel}</p>
        <h3 className="font-display font-semibold text-xl mb-1 leading-tight" style={{ color: "#EDE0CF" }}>{product.name}</h3>
        <p className="text-xs text-stone-500 mb-3 line-clamp-1">{product.subtitle}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-xs" style={{ color: s <= Math.round(product.rating) ? "#F59E0B" : "#374151" }}>★</span>
            ))}
          </div>
          <span className="text-xs text-stone-500">{product.rating} ({product.reviewCount})</span>
        </div>

        {/* Specs preview */}
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 text-xs text-stone-500">
            <Icon name="Flame" size={12} style={{ color: "#D2781E" }} />
            {product.specs.volume}
          </span>
          <span className="text-stone-700">·</span>
          <span className="flex items-center gap-1 text-xs text-stone-500">
            <Icon name="Timer" size={12} style={{ color: "#D2781E" }} />
            {product.specs.heatTime}
          </span>
        </div>

        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3 pt-4 border-t" style={{ borderColor: "rgba(210,120,30,0.1)" }}>
          <div>
            <div className="font-semibold text-lg" style={{ color: "#E8A04A" }}>
              {product.price.toLocaleString("ru-RU")} ₽
            </div>
            {product.oldPrice && (
              <div className="text-xs text-stone-600 line-through">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </div>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            style={inCart
              ? { background: "rgba(5,150,105,0.15)", color: "#34D399", border: "1px solid rgba(5,150,105,0.3)" }
              : { background: "linear-gradient(135deg, #D2781E, #E8A04A)", color: "#0E0A06" }}
          >
            <Icon name={inCart ? "Check" : "ShoppingCart"} size={15} />
            {inCart ? "В корзине" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}
