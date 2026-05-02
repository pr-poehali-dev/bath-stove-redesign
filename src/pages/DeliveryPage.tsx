import Icon from "@/components/ui/icon";

interface DeliveryPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function DeliveryPage({ onNavigate }: DeliveryPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <button onClick={() => onNavigate("home")} className="hover:text-stone-300 transition-colors">Главная</button>
        <Icon name="ChevronRight" size={14} />
        <span style={{ color: "#E8A04A" }}>Доставка и оплата</span>
      </div>

      <h1 className="font-display font-semibold mb-10" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#EDE0CF" }}>
        Доставка и оплата
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {[
          { icon: "Package", title: "Бесплатная доставка", text: "При заказе от 40 000 ₽ доставляем бесплатно курьером до двери в Москве и МО. В другие регионы — транспортной компанией за наш счёт." },
          { icon: "Truck", title: "Сроки доставки", text: "Москва и МО: 1–2 рабочих дня. ЦФО и СЗФО: 3–5 дней. Другие регионы: 5–10 дней. Дальний Восток: 10–20 дней." },
          { icon: "Wrench", title: "Профессиональный монтаж", text: "Наши сертифицированные мастера установят печь, подключат дымоход и проведут пробный запуск. Монтаж в день доставки или на следующий день." },
          { icon: "CreditCard", title: "Способы оплаты", text: "Оплата картой онлайн, наличными курьеру, банковским переводом, а также рассрочка 0% на 12 месяцев для физических лиц." },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 p-6 rounded-2xl border" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(210,120,30,0.1)", border: "1px solid rgba(210,120,30,0.2)" }}>
              <Icon name={item.icon as "Package"} size={22} style={{ color: "#D2781E" }} />
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#EDE0CF" }}>{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery table */}
      <div className="mb-12">
        <h2 className="font-display font-semibold text-2xl mb-6" style={{ color: "#EDE0CF" }}>Стоимость доставки</h2>
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(210,120,30,0.15)" }}>
          <div className="grid grid-cols-3 px-5 py-3 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(210,120,30,0.08)", color: "#D2781E" }}>
            <span>Регион</span><span>Стоимость</span><span>Срок</span>
          </div>
          {[
            { zone: "Москва и МО", price: "Бесплатно", days: "1–2 дня" },
            { zone: "ЦФО (кроме МО)", price: "от 1 200 ₽", days: "2–4 дня" },
            { zone: "СЗФО (СПб и обл.)", price: "от 1 800 ₽", days: "3–5 дней" },
            { zone: "Другие регионы РФ", price: "от 2 500 ₽", days: "5–10 дней" },
            { zone: "Дальний Восток", price: "по запросу", days: "10–20 дней" },
          ].map((row, i) => (
            <div key={row.zone} className="grid grid-cols-3 px-5 py-4 border-t text-sm"
              style={{ background: i % 2 === 0 ? "#14100A" : "#110E08", borderColor: "rgba(210,120,30,0.08)" }}>
              <span className="text-stone-300">{row.zone}</span>
              <span style={{ color: row.price === "Бесплатно" ? "#34D399" : "#E8A04A" }}>{row.price}</span>
              <span className="text-stone-500">{row.days}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-600 mt-3">* При заказе от 40 000 ₽ доставка по всей России бесплатна</p>
      </div>

      {/* Installment */}
      <div className="rounded-2xl p-8 mb-10" style={{ background: "linear-gradient(135deg,#1A0F06,#2A1608)", border: "1px solid rgba(210,120,30,0.2)" }}>
        <h2 className="font-display font-semibold text-2xl mb-3" style={{ color: "#EDE0CF" }}>Рассрочка 0%</h2>
        <p className="text-stone-400 mb-6">Разделите сумму заказа на 12 месяцев без переплат и скрытых комиссий. Доступно для физических лиц при оформлении через сайт.</p>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => onNavigate("catalog")}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 glow-ember"
            style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}>
            Выбрать печь
          </button>
          <button onClick={() => onNavigate("contacts")}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(210,120,30,0.3)", color: "#E8A04A" }}>
            Задать вопрос
          </button>
        </div>
      </div>
    </div>
  );
}
