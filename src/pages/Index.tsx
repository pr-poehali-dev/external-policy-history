import { useState } from "react";

const IMGS = {
  yeltsinClinton: "https://cdn.poehali.dev/projects/55e1ab5f-0f25-4ae7-a930-562a18f003fe/files/1e5adca6-344a-4273-9e76-20de898e01ef.jpg",
  nato: "https://cdn.poehali.dev/projects/55e1ab5f-0f25-4ae7-a930-562a18f003fe/files/8d6a54c9-922c-41b9-bfb7-e06030364346.jpg",
  putinBush: "https://cdn.poehali.dev/projects/55e1ab5f-0f25-4ae7-a930-562a18f003fe/files/b7976750-9236-4204-8f6d-3cdfc6ca45c7.jpg",
  georgia: "https://cdn.poehali.dev/projects/55e1ab5f-0f25-4ae7-a930-562a18f003fe/files/2728e334-d002-4a8d-8a70-6c225a52e7ac.jpg",
  crimea: "https://cdn.poehali.dev/projects/55e1ab5f-0f25-4ae7-a930-562a18f003fe/files/35aff303-bd20-4ef2-8f0e-fd7c9b9aff86.jpg",
  un: "https://cdn.poehali.dev/projects/55e1ab5f-0f25-4ae7-a930-562a18f003fe/files/a55ba387-f679-4f6b-aced-fafe88ea7d43.jpg",
  g8: "https://cdn.poehali.dev/projects/55e1ab5f-0f25-4ae7-a930-562a18f003fe/files/3c8d02ac-552f-41ab-a6a1-7ca882a8b3c7.jpg",
};

function BarChart({ data, title }: { data: { label: string; value: number; color?: string }[]; title: string }) {
  const max = Math.max(...data.map(d => d.value));
  const h = 150;
  const gap = Math.floor(520 / data.length);
  const barW = Math.min(46, gap - 12);
  return (
    <div style={{ margin: "1em 0", background: "#f8f9fa", border: "1px solid #a2a9b1", padding: "12px 16px" }}>
      <div style={{ fontFamily: "Georgia, serif", fontWeight: "bold", fontSize: 13, marginBottom: 8, textAlign: "center", color: "#202122" }}>{title}</div>
      <svg viewBox={`0 0 ${data.length * gap + 40} ${h + 68}`} style={{ width: "100%", maxWidth: 560, display: "block", margin: "0 auto" }}>
        {[0, 25, 50, 75, 100].map(pct => {
          const y = h - (pct / 100) * h;
          return <g key={pct}>
            <line x1={34} y1={y} x2={data.length * gap + 20} y2={y} stroke="#e0e0e0" strokeWidth={1} />
            <text x={30} y={y + 4} textAnchor="end" fontSize={9.5} fill="#757575">{Math.round(max * pct / 100)}</text>
          </g>;
        })}
        {data.map((d, i) => {
          const barH = (d.value / max) * h;
          const x = 40 + i * gap;
          const y = h - barH;
          const words = d.label.split(" ");
          return <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill={d.color || "#3366aa"} opacity={0.85} rx={2} />
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize={9.5} fontWeight="bold" fill="#202122">{d.value}</text>
            {words.map((w, wi) => <text key={wi} x={x + barW / 2} y={h + 14 + wi * 11} textAnchor="middle" fontSize={9} fill="#54595d">{w}</text>)}
          </g>;
        })}
        <line x1={34} y1={0} x2={34} y2={h} stroke="#a2a9b1" strokeWidth={1} />
        <line x1={34} y1={h} x2={data.length * gap + 20} y2={h} stroke="#a2a9b1" strokeWidth={1} />
      </svg>
    </div>
  );
}

function Timeline({ events }: { events: { year: string; text: string; color?: string }[] }) {
  return (
    <div style={{ margin: "1em 0 1.5em", borderLeft: "3px solid #a2a9b1", paddingLeft: 20 }}>
      {events.map((e, i) => (
        <div key={i} style={{ marginBottom: 13, position: "relative" }}>
          <div style={{ position: "absolute", left: -27, top: 4, width: 10, height: 10, borderRadius: "50%", background: e.color || "#3366aa", border: "2px solid #fff", boxShadow: "0 0 0 1px #a2a9b1" }} />
          <span style={{ fontWeight: "bold", fontFamily: "Georgia, serif", color: "#202122", marginRight: 6, fontSize: 13 }}>{e.year}</span>
          <span style={{ fontSize: 13, color: "#202122" }}>{e.text}</span>
        </div>
      ))}
    </div>
  );
}

function CompareTable({ rows, cols, data, caption }: { rows: string[]; cols: string[]; data: string[][]; caption: string }) {
  return (
    <div style={{ overflowX: "auto", margin: "1em 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12.5, background: "#f8f9fa" }}>
        <caption style={{ fontFamily: "Georgia, serif", fontWeight: "bold", fontSize: 13, marginBottom: 4, captionSide: "top", textAlign: "left", color: "#202122" }}>{caption}</caption>
        <thead>
          <tr style={{ background: "#cee0f2" }}>
            <th style={{ border: "1px solid #a2a9b1", padding: "5px 9px", textAlign: "left" }}>Параметр</th>
            {cols.map((c, i) => <th key={i} style={{ border: "1px solid #a2a9b1", padding: "5px 9px", textAlign: "center" }}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#eaecf0" }}>
              <td style={{ border: "1px solid #a2a9b1", padding: "4px 9px", fontWeight: "bold", color: "#54595d" }}>{r}</td>
              {data[i].map((cell, j) => <td key={j} style={{ border: "1px solid #a2a9b1", padding: "4px 9px" }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Infobox() {
  return (
    <div className="wiki-infobox">
      <div className="wiki-infobox-title">Внешняя политика России<br />(конец XX — начало XXI в.)</div>
      <table><tbody>
        <tr><td>Период</td><td>1991 — по наст. вр.</td></tr>
        <tr><td>Президенты</td><td>Ельцин (1991–99), Путин (1999–08, 2012–н.в.), Медведев (2008–12)</td></tr>
        <tr><td>Ключевые МО</td><td>ООН, НАТО (диалог), СНГ, ШОС, БРИКС, G8/G20</td></tr>
        <tr><td>Доктрины</td><td>«Прозападный курс», «Прагматизм», «Суверенная цивилизация»</td></tr>
        <tr><td>Переломы</td><td>1999 — Косово, 2007 — Мюнхен, 2008 — Грузия, 2014 — Крым, 2022 — СВО</td></tr>
        <tr><td>Статус в ООН</td><td>Постоянный член СБ ООН (право вето)</td></tr>
      </tbody></table>
    </div>
  );
}

function Quote({ text, author }: { text: string; author: string }) {
  return (
    <blockquote style={{ borderLeft: "4px solid #3366aa", margin: "1.2em 0", padding: "8px 16px", background: "#eaf3fb", fontStyle: "italic", fontSize: 13.5, color: "#202122", lineHeight: 1.6 }}>
      <span style={{ fontSize: 20, color: "#3366aa", verticalAlign: "bottom", marginRight: 3, lineHeight: 0.5 }}>"</span>
      {text}
      <span style={{ fontSize: 20, color: "#3366aa", verticalAlign: "bottom", marginLeft: 2, lineHeight: 0.5 }}>"</span>
      <div style={{ fontStyle: "normal", fontWeight: "bold", fontSize: 12, color: "#54595d", marginTop: 6 }}>— {author}</div>
    </blockquote>
  );
}

function Thumb({ src, caption, side = "right" }: { src: string; caption: string; side?: "right" | "left" }) {
  return (
    <div className="wiki-thumb" style={{ float: side, marginLeft: side === "right" ? "1.5em" : 0, marginRight: side === "left" ? "1.5em" : 0 }}>
      <img src={src} alt={caption} style={{ width: "100%", display: "block" }} />
      <div className="wiki-thumb-caption">{caption}</div>
    </div>
  );
}

function PieChart({ slices, title }: { slices: { label: string; value: number; color: string }[]; title: string }) {
  const total = slices.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  const cx = 90, cy = 90, r = 72;
  const paths = slices.map(s => {
    const sweep = (s.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle + sweep), y2 = cy + r * Math.sin(angle + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`;
    angle += sweep;
    return { d, color: s.color, label: s.label, value: s.value };
  });
  return (
    <div style={{ margin: "1em 0", background: "#f8f9fa", border: "1px solid #a2a9b1", padding: "12px", display: "inline-block", maxWidth: 320, width: "100%", verticalAlign: "top" }}>
      <div style={{ fontFamily: "Georgia, serif", fontWeight: "bold", fontSize: 12.5, textAlign: "center", marginBottom: 6, color: "#202122" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <svg viewBox="0 0 180 180" style={{ width: 150, height: 150, flexShrink: 0 }}>
          {paths.map((p, i) => <path key={i} d={p.d} fill={p.color} stroke="#fff" strokeWidth={1.5} />)}
        </svg>
        <div style={{ fontSize: 11 }}>
          {slices.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
              <div style={{ width: 11, height: 11, background: s.color, flexShrink: 0 }} />
              <span style={{ color: "#202122" }}>{s.label}: <b>{s.value}%</b></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tocItems: [string, string][] = [
    ["ведение", "Введение"],
    ["part1", "1. Эпоха Ельцина"],
    ["part2", "2. Путин: прагматизм"],
    ["part3", "3. Кризис 2008"],
    ["part4", "4. Украина 2014"],
    ["part5", "5. Роль в МО"],
    ["compare", "6. Сравнение эпох"],
    ["diagrams", "7. Статистика"],
    ["conclusion", "Заключение"],
    ["refs", "Источники"],
    ["authors", "Авторы"],
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {/* TOP BAR */}
      <div style={{ background: "#f8f9fa", borderBottom: "1px solid #a2a9b1", padding: "7px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: 14, color: "#202122" }}>📚 Историческая энциклопедия</div>
          <div style={{ fontSize: 12, color: "#54595d", fontFamily: "sans-serif", marginLeft: "auto" }}>МОАУ СОШ №56 им. Хана В.Д. · Оренбург · 2026</div>
        </div>
      </div>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

          {/* SIDEBAR */}
          <div style={{ width: 195, flexShrink: 0, position: "sticky", top: 16, paddingTop: 20 }} className="hidden md:block">
            <div className="wiki-toc" style={{ width: "100%" }}>
              <div className="wiki-toc-title">Содержание</div>
              <ol style={{ paddingLeft: 16, margin: 0 }}>
                {tocItems.map(([id, label]) => (
                  <li key={id} style={{ marginBottom: 3 }}>
                    <a className="wiki-link" style={{ fontSize: 11.5, fontFamily: "sans-serif", cursor: "pointer" }} onClick={() => scrollTo(id)}>{label}</a>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* ARTICLE BODY */}
          <div style={{ flex: 1, paddingTop: 20, paddingBottom: 50, minWidth: 0 }}>

            {/* ЗАГОЛОВОК */}
            <h1 style={{ fontFamily: "Georgia, serif", fontWeight: "normal", fontSize: 26, borderBottom: "1px solid #a2a9b1", paddingBottom: 5, marginBottom: 8, color: "#000", lineHeight: 1.35 }}>
              Внешняя политика России конца XX — начала XXI века:<br />
              <span style={{ fontSize: 18, color: "#54595d" }}>от сближения с Западом к противостоянию</span>
            </h1>
            <div style={{ fontFamily: "sans-serif", fontSize: 11.5, color: "#54595d", marginBottom: 14 }}>
              Историко-аналитическая статья · МОАУ СОШ №56 им. Хана В.Д., г. Оренбург, 2026
            </div>

            <div className="wiki-hatnote">
              Статья охватывает период 1991–2022 гг. и рассматривает ключевые этапы трансформации внешнеполитического курса Российской Федерации.
            </div>

            <Infobox />

            {/* 0. ВВЕДЕНИЕ */}
            <div id="ведение" />
            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              <b>Внешняя политика России</b> в конце XX — начале XXI века прошла через несколько принципиально различных этапов: от «романтического» прозападного курса первого президента РФ <b>Б.Н. Ельцина</b> до жёсткого противостояния с «коллективным Западом» при <b>В.В. Путине</b>. Эта трансформация стала одним из ключевых факторов мирового порядка в XXI веке.<span className="wiki-ref">[1]</span>
            </p>
            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              Распад <b>СССР</b> в декабре 1991 года поставил Россию перед необходимостью заново выстраивать свою роль в мире. Страна унаследовала ядерный арсенал, постоянное место в Совете Безопасности ООН, но лишилась союзников, буферных территорий и половины промышленного потенциала. На протяжении 30 лет российская дипломатия прошла путь от тесного сотрудничества с Западом до открытого конфликта с ним.<span className="wiki-ref">[2]</span>
            </p>

            {/* 1. ЕЛЬЦИН */}
            <div id="part1" />
            <h2 className="wiki-section-title">1. Эпоха Бориса Ельцина (1991–1999): курс на сближение с Западом</h2>

            <Thumb src={IMGS.yeltsinClinton} caption="Встреча Б.Н. Ельцина и Б. Клинтона — символ российско-американского сближения 1990-х гг." />

            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              Первый период постсоветской внешней политики России принято характеризовать как <b>«романтический прозападный курс»</b>. Министр иностранных дел <b>А.В. Козырев</b> активно продвигал идею вхождения России в «цивилизованный мир» и тесного партнёрства с США и Европой. Москва рассматривала себя как правопреемника СССР и стремилась к интеграции в западные институты.<span className="wiki-ref">[3]</span>
            </p>

            <Quote
              text="Россия — это нормальная страна, которая хочет быть частью нормального мирового сообщества. Мы готовы к партнёрству, а не к конфронтации."
              author="Андрей Козырев, министр иностранных дел РФ, 1992"
            />

            <h3 className="wiki-subsection-title">1.1. Хронология ключевых событий 1991–1999</h3>
            <Timeline events={[
              { year: "1991", text: "Распад СССР. Россия — правопреемник в ООН, признана ядерной державой.", color: "#3366aa" },
              { year: "1992", text: "Декларация об окончании холодной войны — совместное заявление России и США.", color: "#3366aa" },
              { year: "1993", text: "Подписан договор СНВ-2 об ограничении стратегических вооружений.", color: "#5b8f3f" },
              { year: "1994", text: "«Партнёрство во имя мира» с НАТО. Начало Первой чеченской войны.", color: "#e67e22" },
              { year: "1996", text: "Евгений Примаков становится МИД — поворот к многополярности.", color: "#e67e22" },
              { year: "1997", text: "Основополагающий акт Россия–НАТО. Создан Совет Россия–НАТО.", color: "#5b8f3f" },
              { year: "1999", text: "Бомбардировки Югославии НАТО без санкции ООН. «Разворот Примакова над Атлантикой» — глубокий кризис доверия.", color: "#c0392b" },
            ]} />

            <Quote
              text="Разворот над Атлантикой — это был сигнал: Россия не потерпит, когда её интересами пренебрегают."
              author="Евгений Примаков, премьер-министр РФ, 1999"
            />

            <CompareTable
              caption="Внешняя политика России в 1990-е годы: достижения и потери"
              cols={["Достижения", "Потери и уступки"]}
              rows={["Безопасность", "Экономика", "Геополитика", "Институты", "Символический статус"]}
              data={[
                ["Договор СНВ-2, снижение ядерной угрозы", "НАТО расширилось вопреки устным заверениям"],
                ["Западные кредиты МВФ, реструктуризация долга", "«Шоковая терапия» — потеря промышленного потенциала"],
                ["Членство в «Большой восьмёрке» (G8)", "Потеря влияния на постсоветском пространстве"],
                ["Совет Россия–НАТО, ОБСЕ, ПРМ", "Бомбардировки Югославии без согласия России"],
                ["Признание как демократии", "Унижение «младшего партнёра» Запада"],
              ]}
            />

            <div style={{ clear: "both" }} />

            {/* 2. ПУТИН */}
            <div id="part2" />
            <h2 className="wiki-section-title">2. Владимир Путин: прагматизм и «вставание с колен» (1999–2008)</h2>

            <Thumb src={IMGS.putinBush} caption="Встреча В.В. Путина и Дж. Буша-мл. в 2001 г. Кратковременный период «антитеррористического партнёрства»." />

            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              С приходом <b>В.В. Путина</b> в 1999–2000 годах во внешней политике России наметился прагматичный курс. Страна перестала следовать в фарватере западной политики и начала активнее отстаивать собственные интересы. Тем не менее первые годы Путина ознаменовались неожиданным сближением на антитеррористической почве.<span className="wiki-ref">[4]</span>
            </p>

            <Quote
              text="Россия является частью европейской культуры. Я с трудом себе представляю НАТО без России... Но я также не вижу России, которая с кем-то борется."
              author="В.В. Путин, интервью BBC, 2000"
            />

            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              После терактов <b>11 сентября 2001 года</b> Путин первым из мировых лидеров позвонил Джорджу Бушу. Россия открыла воздушный коридор для американской операции в Афганистане — беспрецедентный жест. Однако уже в 2002–2003 годах разногласия нарастают: США выходят из договора по ПРО, вторгаются в Ирак без санкции ООН.<span className="wiki-ref">[5]</span>
            </p>

            <Thumb src={IMGS.nato} caption="Расширение НАТО на восток: страны, вступившие в альянс после 1991 года." side="left" />

            <h3 className="wiki-subsection-title">2.1. Мюнхенская речь 2007 года — декларация новой политики</h3>

            <Quote
              text="Что такое однополярный мир? Как бы ни украшали этот термин, он в конечном счёте означает на практике только одно: это один центр власти, один центр силы, один центр принятия решения. Это мир одного хозяина, одного суверена."
              author="В.В. Путин, Мюнхенская конференция по безопасности, 10 февраля 2007"
            />

            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              Мюнхенская речь стала дипломатической бомбой. Путин открыто заявил о неприемлемости однополярного мира под руководством США, критиковал расширение НАТО и выдвинул тезис о праве России на «сферу особых интересов». Западные эксперты восприняли речь как объявление новой холодной войны.<span className="wiki-ref">[7]</span>
            </p>

            <CompareTable
              caption="Расширение НАТО после 1991 года: этапы и реакция России"
              cols={["Год", "Новые члены", "Реакция России"]}
              rows={["1999", "2004", "2009", "2017", "2023–2024"]}
              data={[
                ["1999", "Польша, Венгрия, Чехия", "Официальный протест, угроза пересмотра отношений"],
                ["2004", "Болгария, Румыния, страны Балтии, Словакия, Словения", "Крайне негативная реакция — впервые НАТО у границ России"],
                ["2009", "Хорватия, Албания", "Умеренный протест"],
                ["2017", "Черногория", "Обвинения в «провокации», поддержка пророссийских сил"],
                ["2023–2024", "Финляндия, Швеция", "Угрозы «военного ответа», заявления об угрозе безопасности"],
              ]}
            />

            <div style={{ clear: "both" }} />

            {/* 3. ГРУЗИЯ */}
            <div id="part3" />
            <h2 className="wiki-section-title">3. Война в Грузии 2008 года: первое применение силы</h2>

            <Thumb src={IMGS.georgia} caption="Южная Осетия, август 2008 г. Российские военные колонны в зоне конфликта." />

            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              В августе 2008 года Россия впервые за постсоветский период применила военную силу за пределами своих границ. После наступления грузинских войск на Цхинвали российская армия за 5 дней разгромила вооружённые силы Грузии. По итогам войны Россия признала независимость <b>Южной Осетии</b> и <b>Абхазии</b>, что вызвало волну западной критики.<span className="wiki-ref">[8]</span>
            </p>

            <Quote
              text="Мы не хотели этой войны. Но нас вынудили защищать жизни российских граждан."
              author="Дмитрий Медведев, Президент РФ, август 2008"
            />

            <CompareTable
              caption="Война в Грузии 2008 года: позиции сторон"
              cols={["Россия", "Грузия", "Запад (США/ЕС)"]}
              rows={["Официальная позиция", "Ключевой аргумент", "Последствия для страны", "Международное признание"]}
              data={[
                ["Защита мирного населения Ю. Осетии", "Восстановление конституционного порядка", "Осуждение действий России"],
                ["Право народов на самоопределение (прецедент Косово)", "Территориальная целостность страны", "НАТО не вмешалось в конфликт"],
                ["Признание 2 республик, укрепление позиций", "Потеря 20% территории страны", "Переосмысление политики «перезагрузки»"],
                ["Признала Ю. Осетию и Абхазию", "Считает территории оккупированными", "Признание только 5 стран мира"],
              ]}
            />

            <div style={{ clear: "both" }} />

            {/* 4. УКРАИНА */}
            <div id="part4" />
            <h2 className="wiki-section-title">4. Украинский кризис 2014 года: глобальный геополитический перелом</h2>

            <Thumb src={IMGS.crimea} caption="Крымский полуостров. Ситуация после событий февраля–марта 2014 года." />

            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              События 2014 года стали самым масштабным геополитическим кризисом со времён холодной войны. После смены власти в Киеве в феврале 2014 года Россия провела <b>референдум в Крыму</b> и включила полуостров в состав РФ, а также поддержала вооружённые формирования на востоке Украины. Запад ответил первыми масштабными санкциями.<span className="wiki-ref">[9]</span>
            </p>

            <Quote
              text="Крым — это особая ситуация, уникальная... Люди пришли на референдум. Подавляющее большинство высказалось за воссоединение с Россией."
              author="В.В. Путин, обращение к Федеральному собранию РФ, 18 марта 2014"
            />

            <h3 className="wiki-subsection-title">4.1. Хронология санкционного давления 2014–2022</h3>
            <div style={{ overflowX: "auto", margin: "1em 0" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12.5, background: "#f8f9fa" }}>
                <caption style={{ fontFamily: "Georgia, serif", fontWeight: "bold", fontSize: 13, textAlign: "left", marginBottom: 4, captionSide: "top", color: "#202122" }}>Хронология западных санкций против России (2014–2022)</caption>
                <thead>
                  <tr style={{ background: "#cee0f2" }}>
                    {["Год", "Инициатор", "Содержание санкций", "Повод"].map((h, i) => (
                      <th key={i} style={{ border: "1px solid #a2a9b1", padding: "5px 8px", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["2014", "США, ЕС", "Заморозка активов физлиц, визовые ограничения, запрет на кредиты госбанкам", "Крым, восток Украины"],
                    ["2016", "США", "Высылка 35 дипломатов, закрытие дипломатических объектов", "Вмешательство в выборы"],
                    ["2018", "США, ЕС, Великобритания", "Санкции против олигархов, ограничения на госдолг", "Дело Скрипалей (Солсбери)"],
                    ["2019–2021", "ЕС, США", "Расширение санкционных списков физ- и юрлиц", "Нарушения прав человека, дело Навального"],
                    ["2022", "США, ЕС, G7, Япония", "Отключение от SWIFT, заморозка $300 млрд резервов ЦБ, нефтяное эмбарго", "Начало специальной военной операции"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#eaecf0" }}>
                      {row.map((cell, j) => <td key={j} style={{ border: "1px solid #a2a9b1", padding: "4px 8px" }}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ clear: "both" }} />

            {/* 5. МЕЖДУНАРОДНЫЕ ОРГАНИЗАЦИИ */}
            <div id="part5" />
            <h2 className="wiki-section-title">5. Россия и международные организации: роль и трансформация</h2>

            <Thumb src={IMGS.un} caption="Россия в Совете Безопасности ООН. Постоянное членство обеспечивает право вето." />

            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              На протяжении всего рассматриваемого периода Россия активно использовала площадки международных организаций. Ключевым инструментом оставалось <b>постоянное членство в Совете Безопасности ООН</b> с правом вето. После 2014 года Россия применяла вето по украинскому вопросу более 20 раз.<span className="wiki-ref">[10]</span>
            </p>

            <Thumb src={IMGS.g8} caption="Саммит G8 в эпоху российско-западного партнёрства. В 2014 г. Россия исключена из формата." side="left" />

            <CompareTable
              caption="Участие России в ключевых международных объединениях"
              cols={["Статус", "Период активного участия", "Положение после 2014"]}
              rows={["ООН / СБ ООН", "G8 / G7", "НАТО (диалог)", "ВТО", "Совет Европы", "ШОС", "БРИКС"]}
              data={[
                ["Постоянный член с правом вето", "1991 — н.в.", "Активный участник, частые вето"],
                ["Член 1997–2014", "1997–2014", "Исключена, формат стал G7"],
                ["Партнёр по диалогу", "1997–2014", "Диалог полностью заморожен"],
                ["Член с 2012", "2012 — н.в.", "Участвует, обходит ограничения"],
                ["Член 1996–2022", "1996–2022", "Исключена в марте 2022"],
                ["Сооснователь, с 2001", "2001 — н.в.", "Ключевой участник, стратегический приоритет"],
                ["Член с 2006", "2006 — н.в.", "Стратегический приоритет после изоляции от G7"],
              ]}
            />

            <Quote
              text="Россия не просит места за западным столом. Она строит собственный стол."
              author="Сергей Лавров, министр иностранных дел РФ, 2015"
            />

            <div style={{ clear: "both" }} />

            {/* 6. СРАВНЕНИЕ */}
            <div id="compare" />
            <h2 className="wiki-section-title">6. Сравнительный анализ внешнеполитических эпох</h2>

            <CompareTable
              caption="Три эпохи российской внешней политики: сравнительный анализ"
              cols={["Ельцин (1991–1999)", "Путин-1 (2000–2012)", "Путин-2 (2012–н.в.)"]}
              rows={["Главный вектор", "Отношение к Западу", "Отношение к НАТО", "Ключевая доктрина", "Главные инструменты", "Итог для страны"]}
              data={[
                ["Интеграция с Западом", "Прагматичное партнёрство", "Противостояние, изоляция"],
                ["Союзнический / подчинённый", "Конкурентное сотрудничество", "Враждебность, санкции"],
                ["Партнёрство возможно", "Расширение неприемлемо", "Экзистенциальная угроза"],
                ["«Демократия и рынок»", "«Управляемая демократия»", "«Суверенная цивилизация»"],
                ["Дипломатия, уступки", "Энергетика, переговоры", "Военная сила, вето в ООН, ШОС/БРИКС"],
                ["Потеря влияния, внешние долги", "Экономический рост, возврат позиций", "Санкционное давление, новые союзники на Глобальном Юге"],
              ]}
            />

            {/* 7. ДИАГРАММЫ */}
            <div id="diagrams" />
            <h2 className="wiki-section-title">7. Статистика и диаграммы</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 16 }}>
              <BarChart
                title="Количество применений права вето Россией в СБ ООН (по пятилетиям)"
                data={[
                  { label: "1991–95", value: 1 },
                  { label: "1996–00", value: 2 },
                  { label: "2001–05", value: 2 },
                  { label: "2006–10", value: 5 },
                  { label: "2011–15", value: 9, color: "#e67e22" },
                  { label: "2016–20", value: 14, color: "#c0392b" },
                  { label: "2021–24", value: 18, color: "#c0392b" },
                ]}
              />
              <BarChart
                title="Объём торговли России с ЕС (млрд евро)"
                data={[
                  { label: "2000", value: 80, color: "#5b8f3f" },
                  { label: "2005", value: 170, color: "#5b8f3f" },
                  { label: "2010", value: 250, color: "#5b8f3f" },
                  { label: "2013", value: 326, color: "#5b8f3f" },
                  { label: "2015", value: 220, color: "#e67e22" },
                  { label: "2019", value: 258, color: "#e67e22" },
                  { label: "2022", value: 95, color: "#c0392b" },
                ]}
              />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
              <PieChart
                title="Голосование ГА ООН о статусе Крыма (2014, 193 страны)"
                slices={[
                  { label: "«За» (осудили аннексию)", value: 100, color: "#3366aa" },
                  { label: "«Против»", value: 11, color: "#c0392b" },
                  { label: "Воздержались", value: 58, color: "#e67e22" },
                  { label: "Не голосовали", value: 24, color: "#a2a9b1" },
                ]}
              />
              <PieChart
                title="Структура экспорта России (2020)"
                slices={[
                  { label: "Нефть и газ", value: 54, color: "#3366aa" },
                  { label: "Металлы", value: 12, color: "#c0392b" },
                  { label: "Вооружения", value: 8, color: "#5b8f3f" },
                  { label: "Химия и удобрения", value: 7, color: "#9b59b6" },
                  { label: "Прочее", value: 19, color: "#a2a9b1" },
                ]}
              />
            </div>

            <BarChart
              title="Одобрение внешней политики России внутри страны (данные Левада-Центра, %)"
              data={[
                { label: "2000", value: 52, color: "#5b8f3f" },
                { label: "2003", value: 58, color: "#5b8f3f" },
                { label: "2007", value: 63, color: "#5b8f3f" },
                { label: "2008", value: 75, color: "#5b8f3f" },
                { label: "2012", value: 60, color: "#e67e22" },
                { label: "2014", value: 88, color: "#5b8f3f" },
                { label: "2017", value: 72, color: "#e67e22" },
                { label: "2020", value: 65, color: "#e67e22" },
                { label: "2022", value: 83, color: "#c0392b" },
              ]}
            />

            {/* ЗАКЛЮЧЕНИЕ */}
            <div id="conclusion" />
            <h2 className="wiki-section-title">Заключение</h2>

            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              Путь российской внешней политики от сближения с Западом к противостоянию с ним прошёл три отчётливые фазы. В 1990-е годы Россия, ослабленная экономически и политически, стремилась интегрироваться в западные институты, нередко жертвуя геополитическими позициями. В 2000-е она постепенно восстанавливала субъектность и прагматизм. После 2014 года конфликт с Западом приобрёл системный, необратимый характер.<span className="wiki-ref">[11]</span>
            </p>
            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              Среди причин этой трансформации историки называют: расширение НАТО вопреки неформальным договорённостям, экономические разочарования 1990-х, формирование нового правящего класса из силовых структур, а также противоречие между западными декларациями об «универсальных ценностях» и реальной политикой продвижения геополитических интересов.<span className="wiki-ref">[12]</span>
            </p>

            <Quote
              text="История учит нас, что великие державы редко принимают подчинённое положение добровольно. Россия — не исключение."
              author="Джон Миршаймер, профессор политологии Чикагского университета"
            />

            <p style={{ marginBottom: "0.8em", textAlign: "justify", lineHeight: 1.7 }}>
              Независимо от оценок правоты той или иной стороны, очевидно: эпоха однополярного мира, сложившегося после 1991 года, завершилась. Россия по-прежнему остаётся ядерной державой с постоянным местом в Совете Безопасности ООН, и без её участия решение глобальных проблем — от изменения климата до ядерного нераспространения — невозможно.
            </p>

            {/* ИСТОЧНИКИ */}
            <div id="refs" />
            <h2 className="wiki-section-title">Список источников и литературы</h2>
            <ol style={{ fontSize: 12.5, lineHeight: 1.85, color: "#202122", paddingLeft: 22 }}>
              {[
                "Богатуров А.Д. Системная история международных отношений. Т. 4. — М.: Культурная революция, 2003.",
                "Концепции внешней политики Российской Федерации (2000, 2008, 2013, 2016, 2023) // МИД России. — [Электронный ресурс].",
                "Козырев А.В. Преображение. — М.: Международные отношения, 1994.",
                "Примаков Е.М. Мир без России? К чему ведёт политическая близорукость. — М.: ИИК «Российская газета», 2009.",
                "Лавров С.В. Историческая перспектива внешней политики России // Россия в глобальной политике. — 2016. — №2.",
                "Mearsheimer J.J. Why the Ukraine Crisis Is the West's Fault // Foreign Affairs. — 2014. — Sept/Oct.",
                "Trenin D. Post-Imperium: A Eurasian Story. — Washington DC: Carnegie Endowment, 2011.",
                "Путин В.В. «Быть сильными: гарантии национальной безопасности для России» // Российская газета, 20.02.2012.",
                "Стенограмма выступления В.В. Путина на Мюнхенской конференции по безопасности, 10.02.2007 // Kremlin.ru.",
                "Резолюция ГА ООН 68/262 «Территориальная целостность Украины», 27.03.2014.",
                "Статистика применения права вето в СБ ООН // UN.org. — 2024. — [Электронный ресурс].",
                "Данные по торговле Россия–ЕС // Eurostat. — 2023. — [Электронный ресурс].",
              ].map((ref, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{ref}</li>
              ))}
            </ol>

            {/* АВТОРЫ */}
            <div id="authors" />
            <div style={{ marginTop: 24, padding: "14px 18px", background: "#f8f9fa", border: "1px solid #a2a9b1", fontSize: 13, lineHeight: 1.9 }}>
              <div style={{ fontFamily: "Georgia, serif", fontWeight: "bold", marginBottom: 8, fontSize: 14, borderBottom: "1px solid #a2a9b1", paddingBottom: 6 }}>Сведения об авторах работы</div>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  {[
                    ["Автор статьи:", "Ревяшко Иван Андреевич"],
                    ["Руководитель проекта:", "Искандарова Вера Владимировна"],
                    ["Учебное заведение:", "МОАУ СОШ №56 имени Хана В.Д., г. Оренбург"],
                    ["Год публикации:", "2026"],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td style={{ padding: "2px 0", color: "#54595d", fontWeight: "bold", width: 220, verticalAlign: "top" }}>{label}</td>
                      <td style={{ padding: "2px 0" }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
