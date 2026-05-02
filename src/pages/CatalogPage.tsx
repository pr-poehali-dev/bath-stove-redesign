import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, SERIES_OPTIONS, MATERIAL_OPTIONS, FUEL_OPTIONS } from "@/data/products";

interface CatalogPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialSeries?: string;
}

const SORT_OPTIONS = [
  { value: "popular", label: "По популярности" },
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "rating", label: "По рейтингу" },
];

export default function CatalogPage({ onNavigate, initialSeries }: CatalogPageProps) {
  const [sort, setSort] = useState("popular");
  const [filterSeries, setFilterSeries] = useState<string[]>(initialSeries ? [initialSeries] : []);
  const [filterMaterial, setFilterMaterial] = useState<string[]>([]);
  const [filterFuel, setFilterFuel] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleArr = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const filtered = useMemo(() => {
    let res = [...PRODUCTS];
    if (filterSeries.length) res = res.filter((p) => filterSeries.includes(p.series));
    if (filterMaterial.length) res = res.filter((p) => filterMaterial.includes(p.specs.material));
    if (filterFuel.length) res = res.filter((p) => filterFuel.includes(p.specs.fuel));
    if (onlyInStock) res = res.filter((p) => p.inStock);
    if (priceMin) res = res.filter((p) => p.price >= Number(priceMin));
    if (priceMax) res = res.filter((p) => p.price <= Number(priceMax));
    switch (sort) {
      case "price-asc": return res.sort((a, b) => a.price - b.price);
      case "price-desc": return res.sort((a, b) => b.price - a.price);
      case "rating": return res.sort((a, b) => b.rating - a.rating);
      default: return res.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [filterSeries, filterMaterial, filterFuel, onlyInStock, priceMin, priceMax, sort]);

  const activeFiltersCount = filterSeries.length + filterMaterial.length + filterFuel.length + (onlyInStock ? 1 : 0) + (priceMin ? 1 : 0) + (priceMax ? 1 : 0);

  const resetFilters = () => {
    setFilterSeries([]); setFilterMaterial([]); setFilterFuel([]);
    setPriceMin(""); setPriceMax(""); setOnlyInStock(false);
  };

  const FilterSection = ({ title, options, active, onToggle }: {
    title: string; options: { value: string; label: string }[];
    active: string[]; onToggle: (v: string) => void;
  }) => (
    <div className="mb-6">
      <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#E8A04A" }}>{title}</h4>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={() => onToggle(opt.value)}
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={{
                background: active.includes(opt.value) ? "linear-gradient(135deg,#D2781E,#E8A04A)" : "transparent",
                border: active.includes(opt.value) ? "none" : "1.5px solid rgba(210,120,30,0.3)",
              }}
            >
              {active.includes(opt.value) && <Icon name="Check" size={10} style={{ color: "#0E0A06" }} />}
            </div>
            <span className="text-sm text-stone-400 group-hover:text-stone-200 transition-colors">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold" style={{ color: "#EDE0CF" }}>Фильтры</h3>
        {activeFiltersCount > 0 && (
          <button onClick={resetFilters} className="text-xs flex items-center gap-1 transition-colors" style={{ color: "#D2781E" }}>
            <Icon name="X" size={12} /> Сбросить ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Stock */}
      <div className="mb-6 pb-6 border-b" style={{ borderColor: "rgba(210,120,30,0.1)" }}>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <div
            onClick={() => setOnlyInStock(!onlyInStock)}
            className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200"
            style={{
              background: onlyInStock ? "linear-gradient(135deg,#D2781E,#E8A04A)" : "transparent",
              border: onlyInStock ? "none" : "1.5px solid rgba(210,120,30,0.3)",
            }}
          >
            {onlyInStock && <Icon name="Check" size={10} style={{ color: "#0E0A06" }} />}
          </div>
          <span className="text-sm text-stone-400">Только в наличии</span>
        </label>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b" style={{ borderColor: "rgba(210,120,30,0.1)" }}>
        <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#E8A04A" }}>Цена, ₽</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="От"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,120,30,0.2)", color: "#EDE0CF" }}
          />
          <input
            type="number"
            placeholder="До"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,120,30,0.2)", color: "#EDE0CF" }}
          />
        </div>
      </div>

      <div className="pb-6 border-b" style={{ borderColor: "rgba(210,120,30,0.1)" }}>
        <FilterSection title="Серия" options={SERIES_OPTIONS} active={filterSeries}
          onToggle={(v) => toggleArr(filterSeries, v, setFilterSeries)} />
      </div>
      <div className="py-6 border-b" style={{ borderColor: "rgba(210,120,30,0.1)" }}>
        <FilterSection title="Материал" options={MATERIAL_OPTIONS} active={filterMaterial}
          onToggle={(v) => toggleArr(filterMaterial, v, setFilterMaterial)} />
      </div>
      <div className="pt-6">
        <FilterSection title="Тип топлива" options={FUEL_OPTIONS} active={filterFuel}
          onToggle={(v) => toggleArr(filterFuel, v, setFilterFuel)} />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <button onClick={() => onNavigate("home")} className="hover:text-stone-300 transition-colors">Главная</button>
        <Icon name="ChevronRight" size={14} />
        <span style={{ color: "#E8A04A" }}>Каталог</span>
      </div>

      <div className="flex items-start gap-8">
        {/* SIDEBAR desktop */}
        <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-24">
          <div className="p-5 rounded-2xl border" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
            <Sidebar />
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display font-semibold text-2xl" style={{ color: "#EDE0CF" }}>Каталог печей</h1>
              <p className="text-sm text-stone-500 mt-1">Найдено: {filtered.length} товаров</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile filters */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                style={{ border: "1px solid rgba(210,120,30,0.25)", color: "#E8A04A", background: activeFiltersCount > 0 ? "rgba(210,120,30,0.08)" : "transparent" }}
              >
                <Icon name="SlidersHorizontal" size={15} />
                Фильтры{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ""}
              </button>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 rounded-xl text-sm outline-none cursor-pointer"
                style={{ background: "#14100A", border: "1px solid rgba(210,120,30,0.2)", color: "#EDE0CF" }}
              >
                {SORT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>

              {/* View mode */}
              <div className="hidden md:flex rounded-xl overflow-hidden border" style={{ borderColor: "rgba(210,120,30,0.2)" }}>
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className="p-2 transition-colors"
                    style={{ background: viewMode === mode ? "rgba(210,120,30,0.15)" : "transparent", color: viewMode === mode ? "#E8A04A" : "#6B7280" }}
                  >
                    <Icon name={mode === "grid" ? "Grid3X3" : "List"} size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile filter panel */}
          {filtersOpen && (
            <div className="lg:hidden mb-6 p-5 rounded-2xl border animate-fade-up" style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}>
              <Sidebar />
            </div>
          )}

          {/* Active filters chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filterSeries.map((v) => {
                const label = SERIES_OPTIONS.find((o) => o.value === v)?.label;
                return (
                  <span key={v} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "rgba(210,120,30,0.12)", color: "#E8A04A", border: "1px solid rgba(210,120,30,0.25)" }}>
                    {label}
                    <button onClick={() => toggleArr(filterSeries, v, setFilterSeries)}><Icon name="X" size={11} /></button>
                  </span>
                );
              })}
              {filterMaterial.map((v) => {
                const label = MATERIAL_OPTIONS.find((o) => o.value === v)?.label;
                return (
                  <span key={v} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "rgba(210,120,30,0.12)", color: "#E8A04A", border: "1px solid rgba(210,120,30,0.25)" }}>
                    {label}
                    <button onClick={() => toggleArr(filterMaterial, v, setFilterMaterial)}><Icon name="X" size={11} /></button>
                  </span>
                );
              })}
            </div>
          )}

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Icon name="SearchX" size={48} className="mx-auto mb-4 text-stone-600" />
              <h3 className="font-semibold text-lg mb-2" style={{ color: "#EDE0CF" }}>Ничего не найдено</h3>
              <p className="text-stone-500 mb-6">Попробуйте изменить фильтры</p>
              <button onClick={resetFilters} className="px-6 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "rgba(210,120,30,0.12)", color: "#E8A04A", border: "1px solid rgba(210,120,30,0.25)" }}>
                Сбросить фильтры
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p) => (
                <div key={p.id} className="flex gap-6 p-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:border-amber-700/40"
                  style={{ background: "#14100A", borderColor: "rgba(210,120,30,0.15)" }}
                  onClick={() => onNavigate("product", { slug: p.slug })}>
                  <img src={p.images[0]} alt={p.name} className="w-32 h-32 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">{p.seriesLabel}</p>
                        <h3 className="font-display font-semibold text-xl mb-1" style={{ color: "#EDE0CF" }}>{p.name}</h3>
                        <p className="text-sm text-stone-500 mb-3">{p.subtitle}</p>
                        <div className="flex gap-4 text-xs text-stone-500">
                          <span className="flex items-center gap-1"><Icon name="Flame" size={11} style={{ color: "#D2781E" }} />{p.specs.volume}</span>
                          <span className="flex items-center gap-1"><Icon name="Timer" size={11} style={{ color: "#D2781E" }} />{p.specs.heatTime}</span>
                          <span className="flex items-center gap-1"><Icon name="Weight" size={11} style={{ color: "#D2781E" }} />{p.specs.weight}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold text-xl mb-1" style={{ color: "#E8A04A" }}>{p.price.toLocaleString("ru-RU")} ₽</div>
                        {p.oldPrice && <div className="text-xs text-stone-600 line-through mb-3">{p.oldPrice.toLocaleString("ru-RU")} ₽</div>}
                        <button
                          onClick={(e) => { e.stopPropagation(); import("@/store/cartStore").then(({ addToCart }) => addToCart(p.id)); }}
                          disabled={!p.inStock}
                          className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                          style={{ background: "linear-gradient(135deg,#D2781E,#E8A04A)", color: "#0E0A06" }}
                        >
                          {p.inStock ? "В корзину" : "Нет в наличии"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
