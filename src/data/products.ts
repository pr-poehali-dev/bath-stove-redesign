export type ProductSeries = "classic" | "scandic" | "russian" | "electric" | "premium";
export type ProductMaterial = "steel" | "cast-iron" | "soapstone" | "combined";
export type ProductFuel = "wood" | "electric" | "gas";

export interface ProductSpec {
  volume: string;
  power: string;
  weight: string;
  dimensions: string;
  material: ProductMaterial;
  fuel: ProductFuel;
  series: ProductSeries;
  maxLoad: string;
  steamTime: string;
  heatTime: string;
}

export interface ProductReview {
  id: number;
  name: string;
  city: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  series: ProductSeries;
  seriesLabel: string;
  price: number;
  oldPrice?: number;
  images: string[];
  badge?: string;
  badgeColor?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  specs: ProductSpec;
  reviews: ProductReview[];
  related: number[];
}

const IMG = {
  hero: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/cbb2c6b2-b49b-4a7f-b317-9167537e3730.jpg",
  sauna1: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/f09f06fb-f553-4e67-a1d3-3a79bb3cae64.jpg",
  sauna2: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/be61cc5f-dd27-46f7-974e-f0f7dae1a551.jpg",
  prod1: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/da6c858e-0607-44fe-8abc-43ffd2cd9914.jpg",
  prod2: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/c60ab4dd-6f03-408f-981c-2fe1a75395c8.jpg",
  prod3: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/66eafa69-512f-4134-b0da-7e8b025c213f.jpg",
  prod4: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/27de4341-0c53-4a4c-9d00-7449d87f5dfb.jpg",
  prod5: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/96babb13-9dfe-4eba-a50d-9df8b3d8c1cf.jpg",
  prod6: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/36f09f8a-809f-48e7-936e-1bb64c7485ce.jpg",
  cat1: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/4bbc48ea-8f11-4f1c-ab14-9082bd70f74c.jpg",
  cat2: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/1f51ea85-9d76-4fda-8a11-b20008c7e355.jpg",
  cat3: "https://cdn.poehali.dev/projects/819484c5-dd34-4899-85e8-3712a2f4e74e/files/47923b95-e366-414f-b520-635ce01306e9.jpg",
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "kharizma-pro-18",
    name: "Харизма Pro 18",
    subtitle: "Классическая банная печь с конвекцией",
    series: "classic",
    seriesLabel: "Классическая серия",
    price: 48900,
    oldPrice: 56000,
    images: [IMG.prod1, IMG.cat1, IMG.sauna1, IMG.hero],
    badge: "Хит продаж",
    badgeColor: "#D97706",
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
    stockCount: 12,
    description: "Харизма Pro 18 — флагманская модель классической серии с двойной конвекцией и панорамной дверцей. Равномерно прогревает парную до 100°C за 40 минут. Идеально подходит для семейных бань площадью 12–22 м³.",
    features: [
      "Двойная конвекция для равномерного прогрева",
      "Панорамная жаростойкая стекло-дверца",
      "Встроенный бак для нагрева воды 12 л",
      "Выносной топочный канал (+ 0,5 м трубы)",
      "Каменка открытая на 60 кг камней",
      "Защита от перегрева — автоотключение",
    ],
    specs: {
      volume: "12–22 м³",
      power: "18 кВт",
      weight: "68 кг",
      dimensions: "430×640×820 мм",
      material: "steel",
      fuel: "wood",
      series: "classic",
      maxLoad: "60 кг камней",
      steamTime: "до 4 часов",
      heatTime: "40 мин",
    },
    reviews: [
      { id: 1, name: "Алексей В.", city: "Москва", rating: 5, date: "Март 2025", text: "Топлю уже полгода — полный восторг. Баня прогревается быстро, пар мягкий и густой. Дверца почти не коптится.", verified: true },
      { id: 2, name: "Игорь С.", city: "Краснодар", rating: 5, date: "Февраль 2025", text: "Качество сборки на высоте. Доставили аккуратно, монтажники знают своё дело. Рекомендую!", verified: true },
      { id: 3, name: "Татьяна М.", city: "Казань", rating: 4, date: "Январь 2025", text: "Хорошая печь, но инструкция могла бы быть подробнее. В целом довольна.", verified: false },
    ],
    related: [2, 3, 5],
  },
  {
    id: 2,
    slug: "skandik-elite-36",
    name: "Скандик Elite 36",
    subtitle: "Скандинавская печь с облицовкой талькохлоритом",
    series: "scandic",
    seriesLabel: "Скандинавская серия",
    price: 67500,
    images: [IMG.prod2, IMG.cat2, IMG.sauna2, IMG.prod5],
    badge: "Новинка",
    badgeColor: "#059669",
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    stockCount: 5,
    description: "Скандик Elite 36 — воплощение северной эстетики. Облицовка из натурального талькохлорита создаёт мягкое тепловое излучение, как в настоящей финской сауне. Подходит для больших парных и коммерческих объектов.",
    features: [
      "Облицовка натуральным талькохлоритом",
      "Мягкое инфракрасное тепловое излучение",
      "Закрытая каменка на 100 кг",
      "Парогенератор в комплекте",
      "Корпус из нержавеющей стали AISI 304",
      "Экономичный расход дров — 4 кг/час",
    ],
    specs: {
      volume: "18–36 м³",
      power: "28 кВт",
      weight: "145 кг",
      dimensions: "600×780×1050 мм",
      material: "soapstone",
      fuel: "wood",
      series: "scandic",
      maxLoad: "100 кг камней",
      steamTime: "до 6 часов",
      heatTime: "55 мин",
    },
    reviews: [
      { id: 1, name: "Марина К.", city: "СПб", rating: 5, date: "Апрель 2025", text: "Стоит в коммерческой сауне три месяца. Клиенты в восторге от мягкого пара. Очень доволен покупкой.", verified: true },
      { id: 2, name: "Дмитрий Н.", city: "Новосибирск", rating: 5, date: "Март 2025", text: "Талькохлорит — совершенно другое ощущение жара. Мягко, обволакивающе. Советую всем.", verified: true },
    ],
    related: [1, 4, 5],
  },
  {
    id: 3,
    slug: "russkaya-dusha-classic",
    name: "Русская Душа Classic",
    subtitle: "Традиционная чугунная печь-каменка",
    series: "russian",
    seriesLabel: "Традиционная серия",
    price: 39200,
    oldPrice: 44000,
    images: [IMG.prod3, IMG.cat3, IMG.hero, IMG.sauna1],
    rating: 4.7,
    reviewCount: 62,
    inStock: true,
    stockCount: 20,
    description: "Русская Душа Classic — это аутентичная банная печь из высококачественного чугуна. Чугун аккумулирует тепло и отдаёт его медленно и равномерно, создавая правильный «банный» микроклимат. Традиции, проверенные веками.",
    features: [
      "Корпус из чугуна марки СЧ-20",
      "Медленный равномерный прогрев",
      "Открытая каменка на 50 кг",
      "Чугунная колосниковая решётка",
      "Длительное горение — 6–8 часов",
      "Совместима с кирпичным экраном",
    ],
    specs: {
      volume: "8–18 м³",
      power: "14 кВт",
      weight: "95 кг",
      dimensions: "390×580×720 мм",
      material: "cast-iron",
      fuel: "wood",
      series: "russian",
      maxLoad: "50 кг камней",
      steamTime: "до 8 часов",
      heatTime: "60 мин",
    },
    reviews: [
      { id: 1, name: "Ольга Н.", city: "Казань", rating: 5, date: "Апрель 2025", text: "Настоящий пар — лёгкий, горячий. Дрова горят долго, перекладывать не надо. Баня — просто рай.", verified: true },
      { id: 2, name: "Василий П.", city: "Омск", rating: 4, date: "Март 2025", text: "Хорошая традиционная печь. Немного тяжеловата для монтажа, но зато — на века.", verified: false },
    ],
    related: [1, 6, 4],
  },
  {
    id: 4,
    slug: "kompakt-mini-10",
    name: "Компакт Mini 10",
    subtitle: "Компактная печь для небольших парных",
    series: "classic",
    seriesLabel: "Классическая серия",
    price: 28500,
    images: [IMG.prod4, IMG.sauna2, IMG.cat1, IMG.prod1],
    rating: 4.6,
    reviewCount: 41,
    inStock: true,
    stockCount: 18,
    description: "Компакт Mini 10 — оптимальное решение для небольших домашних бань площадью 6–12 м³. Небольшие габариты, лёгкий монтаж и высокая эффективность делают её идеальным выбором для дачной бани.",
    features: [
      "Компактные размеры — 350×500×640 мм",
      "Лёгкий вес — 38 кг, монтаж в одиночку",
      "Быстрый прогрев — 25 минут",
      "Нержавеющая сталь 4 мм",
      "Каменка на 30 кг",
      "Экономичный расход дров",
    ],
    specs: {
      volume: "6–12 м³",
      power: "10 кВт",
      weight: "38 кг",
      dimensions: "350×500×640 мм",
      material: "steel",
      fuel: "wood",
      series: "classic",
      maxLoad: "30 кг камней",
      steamTime: "до 3 часов",
      heatTime: "25 мин",
    },
    reviews: [
      { id: 1, name: "Евгений Л.", city: "Тула", rating: 5, date: "Май 2025", text: "Взял на дачу. Лёгкая, быстрая, греет отлично. Цена более чем адекватная.", verified: true },
    ],
    related: [1, 3, 6],
  },
  {
    id: 5,
    slug: "panorama-grand-40",
    name: "Панорама Grand 40",
    subtitle: "Премиальная печь с большой панорамой огня",
    series: "premium",
    seriesLabel: "Премиум серия",
    price: 89900,
    oldPrice: 102000,
    images: [IMG.prod5, IMG.hero, IMG.prod2, IMG.sauna1],
    badge: "Премиум",
    badgeColor: "#7C3AED",
    rating: 5.0,
    reviewCount: 19,
    inStock: true,
    stockCount: 3,
    description: "Панорама Grand 40 — вершина нашей продуктовой линейки. Монументальная печь с широкой панорамной дверцей 400×300 мм для наблюдения за игрой огня. Для владельцев VIP-бань и спа-комплексов.",
    features: [
      "Панорамная дверца 400×300 мм",
      "Двойная жаропрочная стекловолоконная изоляция",
      "Каменка закрытая на 120 кг",
      "Встроенный парогенератор 5 л",
      "Корпус из нержавеющей стали 6 мм",
      "Система самоочистки стекла дверцы",
    ],
    specs: {
      volume: "20–40 м³",
      power: "35 кВт",
      weight: "185 кг",
      dimensions: "680×900×1200 мм",
      material: "combined",
      fuel: "wood",
      series: "premium",
      maxLoad: "120 кг камней",
      steamTime: "до 10 часов",
      heatTime: "65 мин",
    },
    reviews: [
      { id: 1, name: "Андрей В.", city: "Москва", rating: 5, date: "Апрель 2025", text: "Шедевр! Поставил в VIP-баню при загородном доме. Гости не верят, что это отечественное производство. Качество — на уровне лучших финских марок.", verified: true },
    ],
    related: [2, 1, 6],
  },
  {
    id: 6,
    slug: "elektra-pro-9",
    name: "Электра Pro 9",
    subtitle: "Электрическая печь для сауны",
    series: "electric",
    seriesLabel: "Электро серия",
    price: 34800,
    images: [IMG.prod6, IMG.cat2, IMG.prod4, IMG.sauna2],
    rating: 4.5,
    reviewCount: 53,
    inStock: true,
    stockCount: 25,
    description: "Электра Pro 9 — современная электрическая печь для городских саун и небольших парных. Не требует дымохода, легко устанавливается в любом помещении. Точный контроль температуры от 40 до 110°C.",
    features: [
      "Не требует дымохода",
      "Цифровой термостат с таймером",
      "Нагрев до рабочей температуры за 15 мин",
      "Встроенная защита от перегрева",
      "Каменка на 20 кг",
      "Мощность 9 кВт (220/380 В)",
    ],
    specs: {
      volume: "6–14 м³",
      power: "9 кВт",
      weight: "22 кг",
      dimensions: "310×480×580 мм",
      material: "steel",
      fuel: "electric",
      series: "electric",
      maxLoad: "20 кг камней",
      steamTime: "до 4 часов",
      heatTime: "15 мин",
    },
    reviews: [
      { id: 1, name: "Наталья С.", city: "Екатеринбург", rating: 5, date: "Май 2025", text: "Поставила в городскую квартиру в совмещённую сауну. Легко управлять, нагрев быстрый, счёт за свет вырос незначительно.", verified: true },
      { id: 2, name: "Роман Г.", city: "Уфа", rating: 4, date: "Март 2025", text: "Хорошая электрическая модель. Единственный минус — пар всё-таки не такой живой, как от дровяной.", verified: false },
    ],
    related: [4, 1, 3],
  },
  {
    id: 7,
    slug: "skandik-compact-20",
    name: "Скандик Compact 20",
    subtitle: "Скандинавский стиль для средних парных",
    series: "scandic",
    seriesLabel: "Скандинавская серия",
    price: 52300,
    images: [IMG.cat2, IMG.prod2, IMG.sauna1, IMG.prod5],
    rating: 4.7,
    reviewCount: 28,
    inStock: true,
    stockCount: 8,
    description: "Скандик Compact 20 — доступная модель скандинавской серии для парных 14–20 м³. Сохраняет все преимущества линейки: мягкий жар, долгое удержание тепла и безупречную финскую эстетику.",
    features: [
      "Частичная облицовка талькохлоритом",
      "Каменка закрытая на 70 кг",
      "Нержавеющая сталь AISI 304",
      "Встроенная конвекция",
      "Дровяная топка, совместима с газом",
      "Возможность выноса топки",
    ],
    specs: {
      volume: "14–20 м³",
      power: "20 кВт",
      weight: "98 кг",
      dimensions: "520×700×920 мм",
      material: "combined",
      fuel: "wood",
      series: "scandic",
      maxLoad: "70 кг камней",
      steamTime: "до 5 часов",
      heatTime: "45 мин",
    },
    reviews: [
      { id: 1, name: "Сергей Ф.", city: "Нижний Новгород", rating: 5, date: "Апрель 2025", text: "Отличная альтернатива дорогим финским брендам. Выглядит дорого, работает надёжно.", verified: true },
    ],
    related: [2, 1, 5],
  },
  {
    id: 8,
    slug: "russkaya-dusha-pro",
    name: "Русская Душа Pro",
    subtitle: "Усиленная чугунная печь с баком",
    series: "russian",
    seriesLabel: "Традиционная серия",
    price: 45600,
    oldPrice: 51000,
    images: [IMG.prod3, IMG.cat3, IMG.sauna2, IMG.hero],
    rating: 4.8,
    reviewCount: 45,
    inStock: false,
    stockCount: 0,
    description: "Русская Душа Pro — профессиональная версия легендарной чугунной печи. Дополнена встроенным баком для горячей воды на 25 литров и усиленной колосниковой решёткой. Для тех, кто ценит настоящую баню.",
    features: [
      "Встроенный бак для воды 25 л",
      "Усиленный чугунный корпус 12 мм",
      "Открытая каменка на 65 кг",
      "Поддувало с регулятором тяги",
      "Срок службы — 25+ лет",
      "Кирпичный экран в комплекте",
    ],
    specs: {
      volume: "12–22 м³",
      power: "18 кВт",
      weight: "138 кг",
      dimensions: "430×640×880 мм",
      material: "cast-iron",
      fuel: "wood",
      series: "russian",
      maxLoad: "65 кг камней",
      steamTime: "до 10 часов",
      heatTime: "70 мин",
    },
    reviews: [
      { id: 1, name: "Владимир К.", city: "Самара", rating: 5, date: "Февраль 2025", text: "Вот это настоящая печь! Топлю раз в неделю, стоит уже 4 года без единой проблемы. Ждём не дождёмся пополнения на складе.", verified: true },
    ],
    related: [3, 1, 5],
  },
];

export const SERIES_OPTIONS = [
  { value: "classic", label: "Классическая" },
  { value: "scandic", label: "Скандинавская" },
  { value: "russian", label: "Традиционная" },
  { value: "electric", label: "Электро" },
  { value: "premium", label: "Премиум" },
];

export const MATERIAL_OPTIONS = [
  { value: "steel", label: "Нержавеющая сталь" },
  { value: "cast-iron", label: "Чугун" },
  { value: "soapstone", label: "Талькохлорит" },
  { value: "combined", label: "Комбинированные" },
];

export const FUEL_OPTIONS = [
  { value: "wood", label: "Дровяные" },
  { value: "electric", label: "Электрические" },
  { value: "gas", label: "Газовые" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
