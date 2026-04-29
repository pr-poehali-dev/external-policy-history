import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/55e1ab5f-0f25-4ae7-a930-562a18f003fe/files/56fddd53-63ba-4658-b3f7-0428dc7741f7.jpg";
const TEACHER_MALE = "https://cdn.poehali.dev/projects/55e1ab5f-0f25-4ae7-a930-562a18f003fe/files/d49b1bdd-abf7-4845-84d6-731f7daab2f1.jpg";
const TEACHER_FEMALE = "https://cdn.poehali.dev/projects/55e1ab5f-0f25-4ae7-a930-562a18f003fe/files/766723fc-2575-4fb9-b3c0-b0098168b9b9.jpg";

const nav = ["Главная", "Преподаватели"];

const stats = [
  { value: "12+", label: "Лет на рынке" },
  { value: "4 800", label: "Выпускников" },
  { value: "96%", label: "Трудоустройство" },
  { value: "38", label: "Авторских курсов" },
];

const courses = [
  { tag: "Управление", title: "Стратегическое управление компанией", duration: "6 месяцев", level: "Продвинутый", icon: "TrendingUp" },
  { tag: "Финансы", title: "Финансовый анализ и планирование", duration: "4 месяца", level: "Средний", icon: "BarChart3" },
  { tag: "Маркетинг", title: "B2B-маркетинг и продажи", duration: "3 месяца", level: "Базовый", icon: "Target" },
  { tag: "HR", title: "Управление персоналом и найм", duration: "3 месяца", level: "Средний", icon: "Users" },
  { tag: "Право", title: "Корпоративное право для руководителей", duration: "2 месяца", level: "Базовый", icon: "Scale" },
  { tag: "Переговоры", title: "Деловые переговоры и коммуникации", duration: "5 недель", level: "Базовый", icon: "MessageSquare" },
];

const teachers = [
  {
    name: "Александр Витальевич Громов",
    title: "Стратегическое управление",
    degree: "Доктор экономических наук, MBA",
    experience: "22 года в топ-менеджменте",
    bio: "Бывший генеральный директор трёх крупных холдингов. Консультант по реструктуризации бизнеса в 40+ компаниях.",
    courses: ["Стратегическое управление", "Кризис-менеджмент"],
    photo: TEACHER_MALE,
    gender: "male",
  },
  {
    name: "Елена Сергеевна Белова",
    title: "Финансы и инвестиции",
    degree: "Кандидат экономических наук, CFA",
    experience: "18 лет в инвестиционном банкинге",
    bio: "Партнёр инвестиционного фонда. Автор учебника по корпоративным финансам, изданного в 11 странах.",
    courses: ["Финансовый анализ", "Управление инвестициями"],
    photo: TEACHER_FEMALE,
    gender: "female",
  },
  {
    name: "Игорь Николаевич Северов",
    title: "Маркетинг и продажи",
    degree: "МВА, Высшая школа экономики",
    experience: "15 лет в B2B-маркетинге",
    bio: "Основатель маркетингового агентства с оборотом 500 млн руб/год. Спикер форумов РБК и Forbes Russia.",
    courses: ["B2B-маркетинг", "Деловые переговоры"],
    photo: TEACHER_MALE,
    gender: "male",
  },
  {
    name: "Марина Дмитриевна Орлова",
    title: "HR и организационное развитие",
    degree: "Магистр психологии, HRCI-сертификат",
    experience: "16 лет в управлении персоналом",
    bio: "HR-директор федеральной розничной сети (12 000 сотрудников). Разработчик корпоративных систем обучения.",
    courses: ["Управление персоналом", "Корпоративная культура"],
    photo: TEACHER_FEMALE,
    gender: "female",
  },
];

type Page = "Главная" | "Преподаватели";

const Index = () => {
  const [page, setPage] = useState<Page>("Главная");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-ibm">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage("Главная")}>
            <div className="w-8 h-8 flex items-center justify-center font-golos font-bold text-white text-xs"
              style={{ backgroundColor: "var(--gold)" }}>
              АП
            </div>
            <span className="font-golos font-semibold text-white text-sm tracking-wide uppercase hidden sm:block">
              Академия Профессионального Развития
            </span>
            <span className="font-golos font-semibold text-white text-sm tracking-wide uppercase sm:hidden">
              Академия ПР
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <button
                key={item}
                onClick={() => setPage(item as Page)}
                className="nav-link font-ibm text-sm tracking-wide transition-colors"
                style={{ color: page === item ? "var(--gold-light)" : "rgba(255,255,255,0.7)" }}
              >
                {item}
              </button>
            ))}
            <button
              className="ml-4 px-5 py-2 text-white text-sm font-semibold font-golos tracking-wide hover:opacity-90 transition-all"
              style={{ backgroundColor: "var(--gold)" }}
            >
              Записаться
            </button>
          </nav>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-navy border-t border-white/10 px-6 py-4 flex flex-col gap-3">
            {nav.map((item) => (
              <button
                key={item}
                onClick={() => { setPage(item as Page); setMobileOpen(false); }}
                className="text-left text-white/80 text-sm font-ibm py-2 border-b border-white/10"
              >
                {item}
              </button>
            ))}
            <button className="mt-2 px-5 py-2 text-white text-sm font-semibold font-golos"
              style={{ backgroundColor: "var(--gold)" }}>
              Записаться
            </button>
          </div>
        )}
      </header>

      <main className="pt-16">
        {page === "Главная" && <HomePage onNavigate={setPage} />}
        {page === "Преподаватели" && <TeachersPage />}
      </main>

      <footer className="bg-navy text-white/60 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 flex items-center justify-center font-golos font-bold text-white text-xs"
                  style={{ backgroundColor: "var(--gold)" }}>
                  АП
                </div>
                <span className="font-golos text-white font-semibold text-sm uppercase tracking-wide">Академия ПР</span>
              </div>
              <p className="text-sm leading-relaxed">
                Профессиональное образование для руководителей и специалистов бизнеса.
              </p>
            </div>
            <div>
              <h4 className="font-golos text-white font-semibold mb-4 text-sm uppercase tracking-wide">Навигация</h4>
              <div className="flex flex-col gap-2">
                {nav.map((item) => (
                  <button key={item} onClick={() => setPage(item as Page)}
                    className="text-left text-sm hover:text-white transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-golos text-white font-semibold mb-4 text-sm uppercase tracking-wide">Контакты</h4>
              <div className="flex flex-col gap-2 text-sm">
                <span>+7 (495) 000-00-00</span>
                <span>info@academy.ru</span>
                <span>Москва, ул. Деловая, 1</span>
              </div>
            </div>
          </div>
          <div className="pt-6 text-xs text-center">
            © 2024 Академия Профессионального Развития. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,31,61,0.83)" }} />
        <div className="absolute top-0 right-0 w-[40vw] h-full"
          style={{ background: "linear-gradient(135deg, transparent 50%, rgba(200,148,42,0.08) 100%)" }} />
        <div className="absolute bottom-0 left-0 w-96 h-0.5 opacity-60"
          style={{ backgroundColor: "var(--gold)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 border mb-8 animate-fade-in"
              style={{ borderColor: "rgba(200,148,42,0.5)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--gold)" }} />
              <span className="text-xs font-ibm tracking-widest uppercase" style={{ color: "var(--gold)" }}>
                Деловое образование
              </span>
            </div>
            <h1 className="font-golos font-black text-white text-5xl md:text-7xl leading-tight mb-6 animate-fade-in-delay-1">
              Знания,<br />которые<br />
              <span style={{ color: "var(--gold)" }}>работают</span>
            </h1>
            <p className="font-ibm font-light text-white/70 text-lg leading-relaxed mb-10 animate-fade-in-delay-2">
              Образовательная платформа для руководителей и предпринимателей.
              Практические курсы от действующих топ-менеджеров и экспертов рынка.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-delay-3">
              <button
                className="px-8 py-4 text-white font-golos font-semibold tracking-wide hover:opacity-90 transition-all text-sm uppercase"
                style={{ backgroundColor: "var(--gold)" }}
              >
                Выбрать курс
              </button>
              <button
                onClick={() => onNavigate("Преподаватели")}
                className="px-8 py-4 border text-white font-golos font-semibold tracking-wide hover:border-white/60 transition-all text-sm uppercase"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                Наши преподаватели
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className="py-10 px-6 text-center">
                <div className="font-golos font-black text-4xl md:text-5xl" style={{ color: "var(--gold)" }}>
                  {s.value}
                </div>
                <div className="font-ibm text-white/60 text-sm mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-ibm text-muted-foreground text-xs uppercase tracking-widest mb-3">Программы обучения</p>
          <h2 className="font-golos font-bold text-foreground text-4xl gold-line">Популярные курсы</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <div key={i} className="card-hover bg-white border border-border p-7 flex flex-col gap-4 cursor-pointer group">
              <div className="flex items-start justify-between">
                <span className="inline-block px-2 py-0.5 border text-xs font-ibm tracking-wide uppercase"
                  style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
                  {c.tag}
                </span>
                <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: "rgba(15,31,61,0.05)" }}>
                  <Icon name={c.icon} size={18} fallback="BookOpen" style={{ color: "var(--navy)" }} />
                </div>
              </div>
              <h3 className="font-golos font-bold text-foreground text-lg leading-snug">{c.title}</h3>
              <div className="mt-auto flex items-center gap-4 pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Icon name="Clock" size={13} />{c.duration}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Icon name="GraduationCap" size={13} />{c.level}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button className="px-10 py-3.5 border-2 font-golos font-semibold text-sm uppercase tracking-wide hover:text-white transition-all"
            style={{ borderColor: "var(--navy)", color: "var(--navy)" }}
            onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = "var(--navy)"; (e.target as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = ""; (e.target as HTMLElement).style.color = "var(--navy)"; }}>
            Все курсы
          </button>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="font-ibm text-white/40 text-xs uppercase tracking-widest mb-3">Наши преимущества</p>
            <h2 className="font-golos font-bold text-white text-4xl gold-line-center">Почему выбирают нас</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "Award", title: "Практикующие эксперты", text: "Все преподаватели — действующие руководители и собственники бизнеса с опытом 15+ лет." },
              { icon: "Briefcase", title: "Прикладные программы", text: "Каждый курс содержит реальные кейсы и задания из российской бизнес-практики." },
              { icon: "Network", title: "Деловое сообщество", text: "Доступ к закрытой сети выпускников: 4800 топ-менеджеров и предпринимателей." },
            ].map((f, i) => (
              <div key={i} className="p-8 border border-white/10 hover:border-gold/40 transition-colors" style={{ '--tw-border-opacity': '1' } as React.CSSProperties}>
                <div className="w-12 h-12 flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(200,148,42,0.15)" }}>
                  <Icon name={f.icon} size={22} style={{ color: "var(--gold)" }} fallback="Star" />
                </div>
                <h3 className="font-golos font-bold text-white text-lg mb-3">{f.title}</h3>
                <p className="font-ibm text-white/55 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden p-12 md:p-16" style={{ backgroundColor: "var(--navy)" }}>
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)" }} />
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10"
            style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
          <div className="relative z-10 text-center max-w-xl mx-auto">
            <h2 className="font-golos font-black text-white text-4xl mb-4">Начните обучение сегодня</h2>
            <p className="font-ibm text-white/60 text-base leading-relaxed mb-8">
              Оставьте заявку — наш менеджер свяжется с вами в течение часа и подберёт подходящую программу.
            </p>
            <button className="px-10 py-4 text-white font-golos font-bold tracking-wide text-sm uppercase hover:opacity-90 transition-all"
              style={{ backgroundColor: "var(--gold)" }}>
              Оставить заявку
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function TeachersPage() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="mb-14">
        <p className="font-ibm text-muted-foreground text-xs uppercase tracking-widest mb-3">Команда</p>
        <h1 className="font-golos font-black text-foreground text-5xl mb-4 gold-line">Преподаватели</h1>
        <p className="font-ibm text-muted-foreground text-base max-w-2xl mt-6 leading-relaxed">
          Наши преподаватели — это практикующие руководители, предприниматели и отраслевые эксперты
          с многолетним опытом в российском и международном бизнесе.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teachers.map((t, i) => (
          <div key={i} className="card-hover bg-white border border-border overflow-hidden group">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 flex-shrink-0 overflow-hidden">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-full h-56 sm:h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-7 flex flex-col gap-3 flex-1">
                <div>
                  <div className="inline-block px-2 py-0.5 text-xs font-ibm uppercase tracking-wide border mb-2"
                    style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
                    {t.title}
                  </div>
                  <h3 className="font-golos font-bold text-foreground text-xl leading-snug">{t.name}</h3>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-ibm">
                    <Icon name="GraduationCap" size={13} /><span>{t.degree}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-ibm">
                    <Icon name="Briefcase" size={13} /><span>{t.experience}</span>
                  </div>
                </div>
                <p className="font-ibm text-muted-foreground text-sm leading-relaxed">{t.bio}</p>
                <div className="mt-auto pt-3 border-t border-border">
                  <p className="font-ibm text-xs text-muted-foreground mb-2 uppercase tracking-wide">Ведёт курсы:</p>
                  <div className="flex flex-wrap gap-2">
                    {t.courses.map((c, j) => (
                      <span key={j} className="px-2.5 py-1 text-xs font-ibm"
                        style={{ backgroundColor: "rgba(15,31,61,0.06)", color: "var(--navy)" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-10 border-2 text-center" style={{ borderColor: "var(--navy)" }}>
        <Icon name="UserPlus" size={32} className="mx-auto mb-4" style={{ color: "var(--gold)" }} />
        <h3 className="font-golos font-bold text-foreground text-2xl mb-3">Стать преподавателем</h3>
        <p className="font-ibm text-muted-foreground text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Если вы практикующий эксперт с опытом 10+ лет и хотите делиться знаниями — мы рады рассмотреть вашу заявку.
        </p>
        <button className="px-8 py-3 text-white font-golos font-semibold text-sm uppercase tracking-wide hover:opacity-90 transition-all"
          style={{ backgroundColor: "var(--navy)" }}>
          Подать заявку
        </button>
      </div>
    </section>
  );
}

export default Index;
