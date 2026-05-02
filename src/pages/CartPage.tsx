import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useCart, updateQuantity, removeFromCart, placeOrder } from "@/store/cartStore";
import { getProductById } from "@/data/products";

interface CartPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

type Step = "cart" | "checkout" | "success";

const DELIVERY_OPTIONS = [
  { id: "courier", label: "Курьером до двери", price: 0, hint: "Бесплатно при заказе от 40 000 ₽" },
  { id: "pickup", label: "Самовывоз из Москвы", price: 0, hint: "Бесплатно, ул. Примерная, 1" },
  { id: "transport", label: "Транспортная компания", price: 2500, hint: "СДЭК, ПЭК, Деловые линии" },
];

export default function CartPage({ onNavigate }: CartPageProps) {
  const cart = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [orderId, setOrderId] = useState("");
  const [delivery, setDelivery] = useState("courier");
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", comment: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const items = cart.map((c) => ({ ...c, product: getProductById(c.productId) })).filter((c) => c.product);
  const subtotal = items.reduce((s, i) => s + (i.product!.price * i.quantity), 0);
  const deliveryPrice = subtotal >= 40000 ? 0 : DELIVERY_OPTIONS.find((d) => d.id === delivery)?.price || 0;
  const total = subtotal + deliveryPrice;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.phone.trim()) e.phone = "Введите телефон";
    if (!form.address.trim() && delivery !== "pickup") e.address = "Введите адрес доставки";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = () => {
    if (!validate()) return;
    const id = placeOrder(form, total);
    setOrderId(id);
    setStep("success");
  };

  const Field = ({ name, placeholder, type = "text" }: { name: keyof typeof form; placeholder: string; type?: string }) => (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all placeholder:text-stone-600"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${errors[name] ? "#EF4444" : "rgba(210,120,30,0.2)"}`,
          color: "#EDE0CF",
        }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.6)")}
        onBlur={(e) => (e.target.style.borderColor = errors[name] ? "#EF4444" : "rgba(210,120,30,0.2)")}
      />
      {errors[name] && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors[name]}</p>}
    </div>
  );

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in"
          style={{ background: "rgba(5,150,105,0.15)", border: "2px solid rgba(5,150,105,0.4)" }}>
          <Icon name="Check" size={36} style={{ color: "#34D399" }} />
        </div>
        <h1 className="font-display font-semibold text-3xl mb-3" style={{ color: "#EDE0CF" }}>Заказ оформлен!</h1>
        <p className="text-stone-400 mb-2">Номер заказа: <span className="font-semibold" style={{ color: "#E8A04A" }}>{orderId}</span></p>
        <p className="text-stone-500 mb-8">Менеджер свяжется с вами в течение 30 минут для подтверждения.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => onNavigate("account")}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ border: "1px solid rgba(210,120,30,0.35)", color: "#E8A04A" }}>
            Мои заказы
          </button>
          <button onClick={() => onNavigate("catalog")}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 glow-ember"
            style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}>
            Продолжить покупки
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(210,120,30,0.08)", border: "1px solid rgba(210,120,30,0.2)" }}>
          <Icon name="ShoppingCart" size={32} style={{ color: "#D2781E" }} />
        </div>
        <h2 className="font-display font-semibold text-2xl mb-3" style={{ color: "#EDE0CF" }}>Корзина пуста</h2>
        <p className="text-stone-500 mb-8">Добавьте понравившиеся печи из каталога</p>
        <button onClick={() => onNavigate("catalog")}
          className="px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 glow-ember"
          style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}>
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Breadcrumb + Steps */}
      <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <button onClick={() => onNavigate("home")} className="hover:text-stone-300 transition-colors">Главная</button>
        <Icon name="ChevronRight" size={14} />
        <span style={{ color: "#E8A04A" }}>Корзина</span>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-4 mb-10">
        {[
          { id: "cart", label: "Корзина", n: 1 },
          { id: "checkout", label: "Оформление", n: 2 },
        ].map((s, i) => (
          <div key={s.id} className="flex items-center gap-3">
            {i > 0 && <div className="w-12 h-px" style={{ background: "rgba(210,120,30,0.2)" }} />}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={step === s.id || (s.id === "cart" && step === "checkout")
                  ? { background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }
                  : { background: "rgba(210,120,30,0.1)", color: "#6B7280", border: "1px solid rgba(210,120,30,0.2)" }}>
                {s.n}
              </div>
              <span className="text-sm font-medium hidden sm:block"
                style={{ color: step === s.id ? "#E8A04A" : "#6B7280" }}>
                {s.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          {step === "cart" && (
            <>
              <h1 className="font-display font-semibold text-2xl mb-6" style={{ color: "#EDE0CF" }}>
                Корзина ({cart.reduce((s, i) => s + i.quantity, 0)} товара)
              </h1>
              {items.map(({ product, productId, quantity }) => (
                <div key={productId} className="flex gap-4 p-4 rounded-2xl border transition-all"
                  style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
                  <img src={product!.images[0]} alt={product!.name}
                    className="w-24 h-24 object-cover rounded-xl flex-shrink-0 cursor-pointer"
                    onClick={() => onNavigate("product", { slug: product!.slug })} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-stone-500 mb-0.5">{product!.seriesLabel}</p>
                        <h3 className="font-semibold cursor-pointer hover:text-amber-400 transition-colors"
                          style={{ color: "#EDE0CF" }}
                          onClick={() => onNavigate("product", { slug: product!.slug })}>
                          {product!.name}
                        </h3>
                        <p className="text-xs text-stone-500 mt-0.5">{product!.subtitle}</p>
                      </div>
                      <button onClick={() => removeFromCart(productId)} className="text-stone-600 hover:text-red-400 transition-colors flex-shrink-0">
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center rounded-xl overflow-hidden border" style={{ borderColor: "rgba(210,120,30,0.2)" }}>
                        <button onClick={() => updateQuantity(productId, quantity - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-white/5" style={{ color: "#E8A04A" }}>
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold" style={{ color: "#EDE0CF" }}>{quantity}</span>
                        <button onClick={() => updateQuantity(productId, quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-white/5" style={{ color: "#E8A04A" }}>
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                      <span className="font-semibold" style={{ color: "#E8A04A" }}>
                        {(product!.price * quantity).toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {step === "checkout" && (
            <>
              <h1 className="font-display font-semibold text-2xl mb-6" style={{ color: "#EDE0CF" }}>Оформление заказа</h1>

              {/* Contact */}
              <div className="p-6 rounded-2xl border" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "#EDE0CF" }}>Контактные данные</h3>
                <div className="space-y-3">
                  <Field name="name" placeholder="Ваше имя *" />
                  <Field name="phone" placeholder="Телефон *" type="tel" />
                  <Field name="email" placeholder="Email (необязательно)" type="email" />
                </div>
              </div>

              {/* Delivery */}
              <div className="p-6 rounded-2xl border" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "#EDE0CF" }}>Способ доставки</h3>
                <div className="space-y-3 mb-4">
                  {DELIVERY_OPTIONS.map((opt) => (
                    <label key={opt.id} className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: delivery === opt.id ? "rgba(210,120,30,0.08)" : "transparent",
                        border: `1px solid ${delivery === opt.id ? "rgba(210,120,30,0.35)" : "rgba(210,120,30,0.1)"}`,
                      }}
                      onClick={() => setDelivery(opt.id)}>
                      <div className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center"
                        style={{ border: `2px solid ${delivery === opt.id ? "#D2781E" : "#374151"}` }}>
                        {delivery === opt.id && <div className="w-2 h-2 rounded-full" style={{ background: "#D2781E" }} />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium" style={{ color: "#EDE0CF" }}>{opt.label}</div>
                        <div className="text-xs text-stone-500 mt-0.5">{opt.hint}</div>
                      </div>
                      <div className="text-sm font-semibold flex-shrink-0" style={{ color: opt.price === 0 ? "#34D399" : "#E8A04A" }}>
                        {opt.price === 0 ? "Бесплатно" : `${opt.price.toLocaleString("ru-RU")} ₽`}
                      </div>
                    </label>
                  ))}
                </div>
                {delivery !== "pickup" && (
                  <Field name="address" placeholder="Адрес доставки *" />
                )}
              </div>

              {/* Comment */}
              <div className="p-6 rounded-2xl border" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "#EDE0CF" }}>Комментарий к заказу</h3>
                <textarea
                  placeholder="Пожелания по доставке, установке, контактному времени..."
                  rows={3}
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none placeholder:text-stone-600"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,120,30,0.2)", color: "#EDE0CF" }}
                />
              </div>
            </>
          )}
        </div>

        {/* RIGHT — Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-2xl border" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
            <h3 className="font-semibold mb-5" style={{ color: "#EDE0CF" }}>Итого</h3>

            {step === "checkout" && (
              <div className="space-y-2 mb-4 pb-4 border-b" style={{ borderColor: "rgba(210,120,30,0.1)" }}>
                {items.map(({ product, quantity }) => (
                  <div key={product!.id} className="flex justify-between text-sm">
                    <span className="text-stone-500 truncate mr-2">{product!.name} × {quantity}</span>
                    <span style={{ color: "#EDE0CF" }}>{(product!.price * quantity).toLocaleString("ru-RU")} ₽</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-stone-400">Товары ({cart.reduce((s, i) => s + i.quantity, 0)} шт.)</span>
                <span style={{ color: "#EDE0CF" }}>{subtotal.toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-400">Доставка</span>
                <span style={{ color: deliveryPrice === 0 ? "#34D399" : "#E8A04A" }}>
                  {deliveryPrice === 0 ? "Бесплатно" : `${deliveryPrice.toLocaleString("ru-RU")} ₽`}
                </span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-lg mb-6 pt-4 border-t" style={{ borderColor: "rgba(210,120,30,0.1)" }}>
              <span style={{ color: "#EDE0CF" }}>Итого</span>
              <span style={{ color: "#E8A04A" }}>{total.toLocaleString("ru-RU")} ₽</span>
            </div>

            {step === "cart" ? (
              <button onClick={() => setStep("checkout")}
                className="w-full py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] glow-ember"
                style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}>
                Перейти к оформлению
              </button>
            ) : (
              <div className="space-y-3">
                <button onClick={handleOrder}
                  className="w-full py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] glow-ember"
                  style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}>
                  Оформить заказ
                </button>
                <button onClick={() => setStep("cart")}
                  className="w-full py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(210,120,30,0.2)", color: "#9CA3AF" }}>
                  ← Назад в корзину
                </button>
              </div>
            )}

            <div className="mt-4 space-y-2">
              {[
                { icon: "Shield", text: "Безопасная обработка данных" },
                { icon: "Truck", text: "Доставка от 1 до 7 дней" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 text-xs text-stone-600">
                  <Icon name={b.icon as "Shield"} size={13} style={{ color: "#D2781E" }} />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
