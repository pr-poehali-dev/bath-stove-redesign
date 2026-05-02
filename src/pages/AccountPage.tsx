import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useUser, loginUser, logoutUser } from "@/store/cartStore";
import { getProductById } from "@/data/products";

interface AccountPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  processing: { bg: "rgba(245,158,11,0.12)", color: "#F59E0B", label: "В обработке" },
  shipped: { bg: "rgba(59,130,246,0.12)", color: "#60A5FA", label: "В пути" },
  delivered: { bg: "rgba(5,150,105,0.12)", color: "#34D399", label: "Доставлен" },
  cancelled: { bg: "rgba(239,68,68,0.12)", color: "#F87171", label: "Отменён" },
};

export default function AccountPage({ onNavigate }: AccountPageProps) {
  const user = useUser();
  const [tab, setTab] = useState<"orders" | "profile">("orders");
  const [loginForm, setLoginForm] = useState({ name: "", phone: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: user?.name || "", phone: user?.phone || "", email: user?.email || "" });

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(210,120,30,0.1)", border: "1px solid rgba(210,120,30,0.2)" }}>
            <Icon name="User" size={28} style={{ color: "#D2781E" }} />
          </div>
          <h1 className="font-display font-semibold text-2xl mb-2" style={{ color: "#EDE0CF" }}>Личный кабинет</h1>
          <p className="text-stone-500">Введите данные для входа или создания аккаунта</p>
        </div>

        <div className="p-6 rounded-2xl border space-y-4" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
          {[
            { name: "name" as const, placeholder: "Ваше имя *", type: "text" },
            { name: "phone" as const, placeholder: "Телефон *", type: "tel" },
            { name: "email" as const, placeholder: "Email", type: "email" },
          ].map((f) => (
            <input
              key={f.name}
              type={f.type}
              placeholder={f.placeholder}
              value={loginForm[f.name]}
              onChange={(e) => setLoginForm({ ...loginForm, [f.name]: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all placeholder:text-stone-600"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,120,30,0.2)", color: "#EDE0CF" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.2)")}
            />
          ))}
          <button
            onClick={() => { if (loginForm.name && loginForm.phone) loginUser(loginForm); }}
            disabled={!loginForm.name || !loginForm.phone}
            className="w-full py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed glow-ember"
            style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}>
            Войти / Зарегистрироваться
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center font-display font-semibold text-xl"
            style={{ background: "rgba(210,120,30,0.18)", color: "#E8A04A", border: "1px solid rgba(210,120,30,0.3)" }}>
            {user.name[0]}
          </div>
          <div>
            <h1 className="font-display font-semibold text-xl" style={{ color: "#EDE0CF" }}>Привет, {user.name}!</h1>
            <p className="text-sm text-stone-500">{user.email || user.phone}</p>
          </div>
        </div>
        <button onClick={logoutUser} className="flex items-center gap-2 text-sm text-stone-500 hover:text-red-400 transition-colors">
          <Icon name="LogOut" size={16} />
          <span className="hidden sm:block">Выйти</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b" style={{ borderColor: "rgba(210,120,30,0.12)" }}>
        {[
          { id: "orders" as const, label: `Заказы (${user.orders.length})`, icon: "Package" },
          { id: "profile" as const, label: "Профиль", icon: "User" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-[1px]"
            style={{ borderColor: tab === t.id ? "#D2781E" : "transparent", color: tab === t.id ? "#E8A04A" : "#6B7280" }}>
            <Icon name={t.icon as "Package"} size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ORDERS */}
      {tab === "orders" && (
        <div className="space-y-4">
          {user.orders.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="Package" size={48} className="mx-auto mb-4 text-stone-600" />
              <h3 className="font-semibold text-lg mb-2" style={{ color: "#EDE0CF" }}>Заказов пока нет</h3>
              <p className="text-stone-500 mb-6">Выберите печь и оформите первый заказ</p>
              <button onClick={() => onNavigate("catalog")}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 glow-ember"
                style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}>
                Перейти в каталог
              </button>
            </div>
          ) : (
            user.orders.map((order) => {
              const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.processing;
              return (
                <div key={order.id} className="p-6 rounded-2xl border transition-all"
                  style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold" style={{ color: "#EDE0CF" }}>Заказ #{order.id}</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: statusStyle.bg, color: statusStyle.color }}>
                          {statusStyle.label}
                        </span>
                      </div>
                      <span className="text-sm text-stone-500">{order.date}</span>
                    </div>
                    <span className="font-semibold text-lg" style={{ color: "#E8A04A" }}>
                      {order.total.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => {
                      const p = getProductById(item.productId);
                      if (!p) return null;
                      return (
                        <div key={item.productId} className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm cursor-pointer hover:text-amber-400 transition-colors"
                              style={{ color: "#EDE0CF" }}
                              onClick={() => onNavigate("product", { slug: p.slug })}>
                              {p.name}
                            </span>
                          </div>
                          <span className="text-sm text-stone-500 flex-shrink-0">× {item.quantity}</span>
                        </div>
                      );
                    })}
                  </div>
                  {order.address && (
                    <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs text-stone-500"
                      style={{ borderColor: "rgba(210,120,30,0.08)" }}>
                      <Icon name="MapPin" size={12} style={{ color: "#D2781E" }} />
                      {order.address}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* PROFILE */}
      {tab === "profile" && (
        <div className="max-w-md">
          <div className="p-6 rounded-2xl border" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold" style={{ color: "#EDE0CF" }}>Личные данные</h3>
              <button onClick={() => { setEditMode(!editMode); setEditForm({ name: user.name, phone: user.phone, email: user.email }); }}
                className="text-sm flex items-center gap-1.5 transition-colors" style={{ color: "#D2781E" }}>
                <Icon name={editMode ? "X" : "Pencil"} size={14} />
                {editMode ? "Отмена" : "Редактировать"}
              </button>
            </div>
            {editMode ? (
              <div className="space-y-3">
                {[
                  { name: "name" as const, placeholder: "Имя", type: "text" },
                  { name: "phone" as const, placeholder: "Телефон", type: "tel" },
                  { name: "email" as const, placeholder: "Email", type: "email" },
                ].map((f) => (
                  <input key={f.name} type={f.type} placeholder={f.placeholder}
                    value={editForm[f.name]}
                    onChange={(e) => setEditForm({ ...editForm, [f.name]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none placeholder:text-stone-600"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,120,30,0.2)", color: "#EDE0CF" }} />
                ))}
                <button onClick={() => { loginUser({ ...editForm }); setEditMode(false); }}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] glow-ember"
                  style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}>
                  Сохранить
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { icon: "User", label: "Имя", value: user.name },
                  { icon: "Phone", label: "Телефон", value: user.phone },
                  { icon: "Mail", label: "Email", value: user.email || "—" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(210,120,30,0.08)", border: "1px solid rgba(210,120,30,0.15)" }}>
                      <Icon name={f.icon as "User"} size={15} style={{ color: "#D2781E" }} />
                    </div>
                    <div>
                      <div className="text-xs text-stone-500">{f.label}</div>
                      <div className="text-sm font-medium" style={{ color: "#EDE0CF" }}>{f.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
