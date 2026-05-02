import Icon from "@/components/ui/icon";

interface ContactsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function ContactsPage({ onNavigate }: ContactsPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <button onClick={() => onNavigate("home")} className="hover:text-stone-300 transition-colors">Главная</button>
        <Icon name="ChevronRight" size={14} />
        <span style={{ color: "#E8A04A" }}>Контакты</span>
      </div>

      <h1 className="font-display font-semibold mb-10" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#EDE0CF" }}>
        Контакты
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="space-y-6 mb-10">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (800) 555-XX-XX", hint: "Звонок бесплатный, Пн–Пт 9:00–20:00" },
              { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "+7 (900) 000-XX-XX", hint: "Ответим за 15 минут" },
              { icon: "Mail", label: "Email", value: "info@ognepech.ru", hint: "Ответ в течение 2 часов" },
              { icon: "MapPin", label: "Шоурум", value: "Москва, ул. Примерная, 1", hint: "Пн–Сб 10:00–19:00, метро Примерная" },
            ].map((c) => (
              <div key={c.label} className="flex gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(210,120,30,0.1)", border: "1px solid rgba(210,120,30,0.2)" }}>
                  <Icon name={c.icon as "Phone"} size={18} style={{ color: "#D2781E" }} />
                </div>
                <div>
                  <div className="text-xs text-stone-500 mb-0.5">{c.label}</div>
                  <div className="font-medium" style={{ color: "#EDE0CF" }}>{c.value}</div>
                  <div className="text-xs text-stone-500 mt-0.5">{c.hint}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl border" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
          <h3 className="font-display text-xl font-semibold mb-5" style={{ color: "#EDE0CF" }}>Написать нам</h3>
          <div className="space-y-3">
            {[
              { placeholder: "Ваше имя", type: "text" },
              { placeholder: "Телефон", type: "tel" },
              { placeholder: "Email", type: "email" },
            ].map((f) => (
              <input key={f.placeholder} type={f.type} placeholder={f.placeholder}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all placeholder:text-stone-600"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,120,30,0.2)", color: "#EDE0CF" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.2)")} />
            ))}
            <textarea placeholder="Ваш вопрос" rows={4}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none placeholder:text-stone-600"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,120,30,0.2)", color: "#EDE0CF" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(210,120,30,0.2)")} />
            <button className="w-full py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02] glow-ember"
              style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}>
              Отправить сообщение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
