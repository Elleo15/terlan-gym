/* =============================================
   TƏRLAN ƏLİYEV — FITNESS TRAINER
   script.js
   ============================================= */

/* ── LOADER ── */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }, 1600);
});

/* ── CURSOR ── */
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");
let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

if (window.innerWidth > 900) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    }
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    if (follower) {
      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";
    }
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document
    .querySelectorAll("a, button, .service-card, .achievement-card")
    .forEach((el) => {
      el.addEventListener(
        "mouseenter",
        () => follower && follower.classList.add("expanded"),
      );
      el.addEventListener(
        "mouseleave",
        () => follower && follower.classList.remove("expanded"),
      );
    });
}

/* ── NAVBAR ── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  }
});

/* ── HAMBURGER ── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });
}

/* ── PARALLAX HERO ── */
const heroBg = document.getElementById("heroBg");
window.addEventListener("scroll", () => {
  if (heroBg) {
    const scrolled = window.scrollY;
    heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
  }
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 75;
      window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
    }
  });
});

/* ── REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ── COUNTER ANIMATION ── */
function animateCount(el) {
  const target = parseInt(el.getAttribute("data-target"));
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".count").forEach(animateCount);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

document
  .querySelectorAll(".hero-stats, .stats-bar")
  .forEach((el) => counterObserver.observe(el));

/* ── FAQ ── */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains("open");
  document.querySelectorAll(".faq-question.open").forEach((q) => {
    q.classList.remove("open");
    q.nextElementSibling.classList.remove("open");
  });
  if (!isOpen) {
    btn.classList.add("open");
    answer.classList.add("open");
  }
}

/* ── BOOKING FORM ── */
function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const city = document.getElementById("city").value;

  if (!name || !phone) return;

  const msg = `Salam Tərlan! Rezervasiya etmək istəyirəm.%0A%0AAd: ${encodeURIComponent(name)}%0ANömrə: ${encodeURIComponent(phone)}%0AXidmət: ${encodeURIComponent(service)}%0AŞəhər: ${encodeURIComponent(city)}`;
  window.open(`https://wa.me/994702960002?text=${msg}`, "_blank");
}

/* ── LANGUAGE SYSTEM ── */
const translations = {
  az: {
    nav_services: "Xidmətlər",
    nav_about: "Haqqımda",
    nav_achievements: "Nailiyyətlər",
    nav_testimonials: "Rəylər",
    nav_booking: "Rezervasiya",
    nav_cta: "Rezervasiya",
    hero_eyebrow: "Professional Fitness Trainer",
    hero_motto: "Transform · Perform · Evolve",
    hero_desc:
      "10 illik təcrübə və IFBB çempionluğu ilə bədəninizi dəyişdirin. Hər proqram tamamilə sizin məqsədlərinizə uyğun hazırlanır.",
    hero_cta1: "Rezervasiya Et",
    hero_cta2: "Daha Çox",
    stat_exp: "İl Təcrübə",
    stat_clients: "Müştəri",
    stat_medals: "Beynəlxalq Medal",
    stat_euro: "IFBB Avropa 1ci Yer",
    stat_physique: "Men's Physique Çempion",
    scroll_down: "Aşağı Bax",
    services_eyebrow: "Xidmətlər",
    services_title: "Nə təklif edirəm",
    s1_title: "Personal Training",
    s1_desc:
      "Fərdi məşq proqramı ilə maksimal nəticə əldə edin. Hər seans sizin səviyyənizə uyğun hazırlanır.",
    s1_price: "100 AZN / Seans",
    s2_title: "Qidalanma Planı",
    s2_desc:
      "Məqsədlərinizə uyğun fərdi qidalanma strategiyası. Pəhriz yox, düzgün qidalanma.",
    s2_price: "100 AZN / Ay",
    s3_title: "Online Koçinq",
    s3_desc:
      "İstənilən yerdən peşəkar rəhbərlik altında məşq edin. Həftəlik proqram + video dəstək.",
    s3_price: "100 AZN / Ay",
    s4_title: "Çəki İtirmə Proqramı",
    s4_desc:
      "Elmi əsaslı yanaşma ilə dayanıqlı nəticələr. Sürətli deyil, düzgün çəki itkisi.",
    s4_price: "100 AZN / Ay",
    s5_title: "Kütlə Proqramı",
    s5_desc: "Düzgün yüklənmə, düzgün qidalanma, maksimal əzələ artımı.",
    s5_price: "100 AZN / Ay",
    s6_title: "Yarış Hazırlığı",
    s6_desc:
      "Müsabiqə səviyyəsinde fiziki formaya çatmaq üçün intensiv hazırlıq proqramı.",
    s6_price: "100 AZN / Ay",
    pain_eyebrow: "Tanıyıram Sizi",
    pain_title: "Bu sizi tanıdır?",
    p1_prob: "Aylar keçir, güzgüdə heç nə dəyişmir.",
    p1_sol: "Hər həftə ölçülə bilən nəticə verən strukturlu proqram.",
    p2_prob: "Proqram yoxdur, rastgələ məşq edirsən.",
    p2_sol: "Hər məşq planlanmış. Gyma girirsən, nə edəcəyini bilirsən.",
    p3_prob: "Motivasiya gedir, ardıcıllıq qalmır.",
    p3_sol:
      "Sistem motivasiyanı əvəz edir. Aşağı enerjili günlər belə irəliləyirsən.",
    p4_prob: "Hər şeyi sınadın, heç nə uzun müddət işləmədi.",
    p4_sol: "Bir sübut edilmiş plan. Fərdi proqressiya. Tapmaca yoxdur.",
    about_eyebrow: "Haqqımda",
    about_img_label: "Fitness Trainer",
    about_p1:
      "10 ildir fitness dünyasındayam — amma bu yol bir arzudan başladı: öz bədənini anlamaq, hiss etmək, dəyişdirmək istəyi. Əvvəlcə özüm üçün məşq etdim. Daha sonra başqalarının da bu hissi yaşamasına kömək etmək istədim.",
    about_p2:
      "Beləcə bir trainer doğuldu. Bu gün Sumqayıt və Xırdalan-da yüzlərlə insana idmanı sevdirdim, onlara məqsədlərinə çatmaqda yol göstərdim.",
    about_quote:
      '"Sağlam bədəndə sağlam can — bu sadəcə bir söz deyil, hər gün yaşadığım fəlsəfədir."',
    badge1: "IFBB Avropa Çempionu",
    badge2: "IFBB Dünya 2ci Yer",
    badge3: "10+ İl Təcrübə",
    badge4: "200+ Müştəri",
    badge5: "Azərbaycan Çempionu",
    ach_eyebrow: "Nailiyyətlər",
    ach_title: "Beynəlxalq Arenada",
    ach_desc:
      "Azərbaycanı dünya səhnəsində təmsil etmək — hər yarış yeni bir zirvədir.",
    ach1: "Avropa Çempionu — 1ci Yer",
    ach2: "Dünya Çempionatı — 2ci Yer",
    ach3: "Men's Physique — 3 Dəfə Birinci",
    train_eyebrow: "Məşq Prosesi",
    train_title: "Müştərilərimlə İş",
    tc1_title: "Texniki Dəstək",
    tc1_desc: "Hər hərəkətin düzgün icrasına nəzarət",
    tc2_title: "Fərdi Yanaşma",
    tc2_desc: "Hər müştəriyə özünəməxsus proqram",
    tc3_title: "Nəticəyə Fokus",
    tc3_desc: "Hər seans məqsədə doğru bir addım",
    test_eyebrow: "Rəylər",
    test_title: "Müştərilər nə deyir",
    t1_text:
      "3 ayda 12 kq itirdim. Tərlan sadəcə trainer deyil, hər məşqdə yanında olan bir motivasiya mənbəyidir. Həyatımı dəyişdirdi.",
    t1_result: "–12 kq / 3 ay",
    t2_text:
      "Həyatımda ilk dəfə idmanı sevdim. Fərdi yanaşması tamamilə fərqlidir. Hər dərsdən həvəslə çıxıram.",
    t2_result: "+8 kq əzələ / 4 ay",
    t3_text:
      "Müsabiqəyə 6 həftədə hazırlaşdım. Nəticə gözləntimi üstələdi. Tərlan proqramın hər detalını düşünür.",
    t3_result: "Yarış hazırlığı — 1ci yer",
    how_eyebrow: "Necə İşləyir",
    how_title: "3 Addımda Başla",
    step1_title: "Rezervasiya Et",
    step1_desc:
      "Formu doldurun, xidməti seçin. WhatsApp ilə dərhal əlaqə saxlayacağam.",
    step2_title: "Məqsəd Təyin Et",
    step2_desc:
      "İlk görüşdə səviyyənizi, məqsədlərinizi və cədvəlinizi öyrənirəm. Fərdi proqram hazırlayıram.",
    step3_title: "Nəticə Al",
    step3_desc:
      "Ardıcıl məşq, doğru qidalanma, həftəlik proqress. Nəticə qaçınılmazdır.",
    faq_title: "Tez-tez verilən suallar",
    faq1_q: "Yeni başlayan biri üçün uyğundurmu?",
    faq1_a:
      "Bəli, tamamilə. Proqram hər səviyyəyə uyğunlaşdırılır. Sıfırdan başlayan müştərilər üçün xüsusi yanaşma tətbiq olunur.",
    faq2_q: "Neçə müddətdə nəticə görünür?",
    faq2_a:
      "Ardıcıllıqla məşq edən müştərilər adətən 4-6 həftədə ilk görünən nəticəni hiss edir. Həqiqi transformasiya 3 ay ərzində başlayır.",
    faq3_q: "Online koçinq necə işləyir?",
    faq3_a:
      "WhatsApp vasitəsilə həftəlik proqram göndərilir, video dəstək verilir, proqress izlənilir. Harada olursanuz olun, yanınızdayam.",
    faq4_q:
      "Qidalanma planı ilə birlikdə məşq proqramı alınırsa endirim varmı?",
    faq4_a:
      "Bəli, kompleks paket üçün xüsusi qiymət mövcuddur. Rezervasiya zamanı bunu qeyd edin, sizinlə əlaqə saxlayacağam.",
    faq5_q: "Harada məşq etmək olar?",
    faq5_a:
      "Sumqayıt və Xırdalan-da şəxsi məşqlər aparılır. Online koçinq isə dünyanın istənilən yerindən əlçatandır.",
    book_eyebrow: "Rezervasiya",
    book_title: "İlk Addımı At",
    book_desc:
      "Formu doldurun — 24 saat ərzində WhatsApp vasitəsilə sizinlə əlaqə saxlayacağam.",
    form_name: "Ad Soyad",
    form_phone: "Mobil Nömrə",
    form_service: "Xidmət",
    form_city: "Şəhər",
    form_note:
      "Formu doldurun — WhatsApp vasitəsilə sizinlə dərhal əlaqə saxlanılacaq",
    form_submit: "WhatsApp ilə Rezervasiya Et",
    form_subnote: "Cavab müddəti: 24 saat ərzində",
    srv_opt1: "Personal Training",
    srv_opt2: "Qidalanma Planı",
    srv_opt3: "Online Koçinq",
    srv_opt4: "Çəki İtirmə Proqramı",
    srv_opt5: "Kütlə Proqramı",
    srv_opt6: "Yarış Hazırlığı",
    city_online: "Online",
    footer_tagline:
      "Sağlam bədəndə sağlam can. Hər məşq daha güclü bir sənin üçündür.",
    footer_nav: "Naviqasiya",
    footer_services: "Xidmətlər",
    footer_contact: "Əlaqə",
    footer_location: "Yer",
    footer_made: "Fitness · Strength · Results",
    form_name_placeholder: "Adınız",
  },

  ru: {
    nav_services: "Услуги",
    nav_about: "Обо мне",
    nav_achievements: "Достижения",
    nav_testimonials: "Отзывы",
    nav_booking: "Запись",
    nav_cta: "Записаться",
    hero_eyebrow: "Профессиональный Фитнес-тренер",
    hero_motto: "Трансформируй · Выступай · Развивайся",
    hero_desc:
      "10 лет опыта и титул чемпиона IFBB. Каждая программа создаётся под ваши цели.",
    hero_cta1: "Записаться",
    hero_cta2: "Узнать больше",
    stat_exp: "Лет опыта",
    stat_clients: "Клиентов",
    stat_medals: "Международных медалей",
    stat_euro: "IFBB Европа 1 место",
    stat_physique: "Чемпион Men's Physique",
    scroll_down: "Прокрутить вниз",
    services_eyebrow: "Услуги",
    services_title: "Что я предлагаю",
    s1_title: "Персональные тренировки",
    s1_desc:
      "Индивидуальная программа тренировок для максимального результата.",
    s1_price: "100 AZN / Сессия",
    s2_title: "План питания",
    s2_desc:
      "Индивидуальная стратегия питания под ваши цели. Не диета — правильное питание.",
    s2_price: "100 AZN / Месяц",
    s3_title: "Онлайн-коучинг",
    s3_desc: "Тренируйтесь под профессиональным руководством из любого места.",
    s3_price: "100 AZN / Месяц",
    s4_title: "Программа похудения",
    s4_desc: "Устойчивые результаты на научной основе. Не быстро — правильно.",
    s4_price: "100 AZN / Месяц",
    s5_title: "Программа набора массы",
    s5_desc:
      "Правильная нагрузка, правильное питание, максимальный прирост мышц.",
    s5_price: "100 AZN / Месяц",
    s6_title: "Подготовка к соревнованиям",
    s6_desc: "Интенсивная подготовка для выхода на соревновательный уровень.",
    s6_price: "100 AZN / Месяц",
    pain_eyebrow: "Я вас узнаю",
    pain_title: "Это про вас?",
    p1_prob: "Месяцы идут, в зеркале ничего не меняется.",
    p1_sol:
      "Структурированная программа с измеримыми результатами каждую неделю.",
    p2_prob: "Нет программы, тренируешься хаотично.",
    p2_sol:
      "Каждая тренировка спланирована. Заходишь в зал — знаешь что делать.",
    p3_prob: "Мотивация уходит, постоянства нет.",
    p3_sol: "Система заменяет мотивацию. Прогрессируешь даже в плохие дни.",
    p4_prob: "Пробовал всё, ничто не работало долго.",
    p4_sol:
      "Одна проверенная система. Индивидуальная прогрессия. Никаких догадок.",
    about_eyebrow: "Обо мне",
    about_img_label: "Фитнес-тренер",
    about_p1:
      "10 лет в фитнесе — всё началось с желания понять и изменить своё тело. Сначала тренировался для себя, потом захотел помогать другим.",
    about_p2:
      "Сегодня помог сотням людей в Сумгаите и Хырдалане полюбить спорт и достичь своих целей.",
    about_quote:
      '"В здоровом теле — здоровый дух. Это не просто слова, это философия, которой я живу каждый день."',
    badge1: "Чемпион Европы IFBB",
    badge2: "IFBB Мир 2 место",
    badge3: "10+ лет опыта",
    badge4: "200+ клиентов",
    badge5: "Чемпион Азербайджана",
    ach_eyebrow: "Достижения",
    ach_title: "На международной арене",
    ach_desc:
      "Представлять Азербайджан на мировой сцене — каждое соревнование это новая вершина.",
    ach1: "Чемпион Европы — 1 место",
    ach2: "Чемпионат мира — 2 место",
    ach3: "Men's Physique — 3-кратный чемпион",
    train_eyebrow: "Тренировочный процесс",
    train_title: "Работа с клиентами",
    tc1_title: "Техническая поддержка",
    tc1_desc: "Контроль правильного выполнения каждого движения",
    tc2_title: "Индивидуальный подход",
    tc2_desc: "Уникальная программа для каждого клиента",
    tc3_title: "Фокус на результат",
    tc3_desc: "Каждая сессия — шаг к цели",
    test_eyebrow: "Отзывы",
    test_title: "Что говорят клиенты",
    t1_text:
      "За 3 месяца похудел на 12 кг. Тарлан — не просто тренер, это источник мотивации на каждой тренировке.",
    t1_result: "–12 кг / 3 месяца",
    t2_text:
      "Впервые в жизни полюбил спорт. Индивидуальный подход совершенно другой. С каждого урока выхожу с энтузиазмом.",
    t2_result: "+8 кг мышц / 4 месяца",
    t3_text:
      "Подготовился к соревнованиям за 6 недель. Результат превзошёл ожидания.",
    t3_result: "Подготовка к соревнованиям — 1 место",
    how_eyebrow: "Как это работает",
    how_title: "Начни за 3 шага",
    step1_title: "Запишись",
    step1_desc: "Заполни форму, выбери услугу. Свяжусь через WhatsApp.",
    step2_title: "Поставь цель",
    step2_desc:
      "На первой встрече узнаю твой уровень, цели и расписание. Составлю индивидуальную программу.",
    step3_title: "Получи результат",
    step3_desc:
      "Регулярные тренировки, правильное питание, еженедельный прогресс. Результат неизбежен.",
    faq_title: "Часто задаваемые вопросы",
    faq1_q: "Подходит ли для новичков?",
    faq1_a: "Да, абсолютно. Программа адаптируется к любому уровню.",
    faq2_q: "Когда будут видны результаты?",
    faq2_a:
      "Клиенты, занимающиеся регулярно, обычно чувствуют первые результаты через 4-6 недель.",
    faq3_q: "Как работает онлайн-коучинг?",
    faq3_a:
      "Еженедельная программа через WhatsApp, видеоподдержка, отслеживание прогресса.",
    faq4_q: "Есть ли скидка при покупке плана питания вместе с тренировками?",
    faq4_a:
      "Да, для комплексного пакета есть специальная цена. Укажите это при записи.",
    faq5_q: "Где проходят тренировки?",
    faq5_a:
      "Личные тренировки в Сумгаите и Хырдалане. Онлайн-коучинг доступен из любой точки мира.",
    book_eyebrow: "Запись",
    book_title: "Сделай первый шаг",
    book_desc: "Заполните форму — свяжусь через WhatsApp в течение 24 часов.",
    form_name: "Имя Фамилия",
    form_phone: "Номер телефона",
    form_service: "Услуга",
    form_city: "Город",
    form_note: "Заполните форму — свяжусь через WhatsApp",
    form_submit: "Записаться через WhatsApp",
    form_subnote: "Время ответа: в течение 24 часов",
    srv_opt1: "Персональные тренировки",
    srv_opt2: "План питания",
    srv_opt3: "Онлайн-коучинг",
    srv_opt4: "Программа похудения",
    srv_opt5: "Набор массы",
    srv_opt6: "Подготовка к соревнованиям",
    city_online: "Онлайн",
    footer_tagline:
      "В здоровом теле — здоровый дух. Каждая тренировка — для более сильной версии тебя.",
    footer_nav: "Навигация",
    footer_services: "Услуги",
    footer_contact: "Контакты",
    footer_location: "Местоположение",
    footer_made: "Fitness · Strength · Results",
    form_name_placeholder: "Ваше имя",
  },

  en: {
    nav_services: "Services",
    nav_about: "About",
    nav_achievements: "Achievements",
    nav_testimonials: "Reviews",
    nav_booking: "Book Now",
    nav_cta: "Book Now",
    hero_eyebrow: "Professional Fitness Trainer",
    hero_motto: "Transform · Perform · Evolve",
    hero_desc:
      "10 years of experience and IFBB championship titles. Every program is crafted specifically for your goals.",
    hero_cta1: "Book a Session",
    hero_cta2: "Learn More",
    stat_exp: "Years Experience",
    stat_clients: "Clients",
    stat_medals: "International Medals",
    stat_euro: "IFBB Europe 1st Place",
    stat_physique: "Men's Physique Champion",
    scroll_down: "Scroll Down",
    services_eyebrow: "Services",
    services_title: "What I Offer",
    s1_title: "Personal Training",
    s1_desc:
      "Achieve maximum results with a personalized training program tailored to your level.",
    s1_price: "100 AZN / Session",
    s2_title: "Nutrition Plan",
    s2_desc:
      "A personalized nutrition strategy aligned with your goals. Not a diet — proper nutrition.",
    s2_price: "100 AZN / Month",
    s3_title: "Online Coaching",
    s3_desc:
      "Train under professional guidance from anywhere in the world. Weekly program + video support.",
    s3_price: "100 AZN / Month",
    s4_title: "Weight Loss Program",
    s4_desc:
      "Sustainable results through a science-based approach. Not fast — correct.",
    s4_price: "100 AZN / Month",
    s5_title: "Muscle Building",
    s5_desc:
      "Correct loading, proper nutrition, maximum muscle growth strategy.",
    s5_price: "100 AZN / Month",
    s6_title: "Competition Prep",
    s6_desc:
      "Intensive preparation program to reach competition-level physique.",
    s6_price: "100 AZN / Month",
    pain_eyebrow: "I Know You",
    pain_title: "Does this sound familiar?",
    p1_prob: "Months pass, nothing changes in the mirror.",
    p1_sol: "A structured program with measurable results every week.",
    p2_prob: "No program, just random workouts.",
    p2_sol:
      "Every session is planned. Walk into the gym knowing exactly what to do.",
    p3_prob: "Motivation fades, consistency disappears.",
    p3_sol:
      "The system replaces motivation. You progress even on low-energy days.",
    p4_prob: "You've tried everything, nothing stuck long-term.",
    p4_sol: "One proven plan. Individual progression. No guesswork.",
    about_eyebrow: "About Me",
    about_img_label: "Fitness Trainer",
    about_p1:
      "I've been in the fitness world for 10 years — but this journey started with a desire: to understand, feel, and transform my own body. I trained for myself first. Then I wanted to help others experience this too.",
    about_p2:
      "Today I help hundreds of people in Sumqayit and Khirdalan fall in love with fitness and reach their goals.",
    about_quote:
      '"A healthy mind in a healthy body — not just words, but a philosophy I live every single day."',
    badge1: "IFBB European Champion",
    badge2: "IFBB World 2nd Place",
    badge3: "10+ Years Experience",
    badge4: "200+ Clients",
    badge5: "Azerbaijan Champion",
    ach_eyebrow: "Achievements",
    ach_title: "On the International Stage",
    ach_desc:
      "Representing Azerbaijan on the world stage — every competition is a new summit.",
    ach1: "European Champion — 1st Place",
    ach2: "World Championship — 2nd Place",
    ach3: "Men's Physique — 3x Champion",
    train_eyebrow: "Training Process",
    train_title: "Working With Clients",
    tc1_title: "Technical Support",
    tc1_desc: "Ensuring proper form on every movement",
    tc2_title: "Individual Approach",
    tc2_desc: "A unique program for every client",
    tc3_title: "Results-Focused",
    tc3_desc: "Every session is a step toward the goal",
    test_eyebrow: "Testimonials",
    test_title: "What Clients Say",
    t1_text:
      "Lost 12kg in 3 months. Tarlan is more than a trainer — he's a source of motivation at every session. He changed my life.",
    t1_result: "–12 kg / 3 months",
    t2_text:
      "I fell in love with sports for the first time in my life. His individual approach is completely different. I leave every session motivated.",
    t2_result: "+8 kg muscle / 4 months",
    t3_text:
      "Prepared for competition in 6 weeks. Results exceeded my expectations. Tarlan thinks through every detail of the program.",
    t3_result: "Competition prep — 1st place",
    how_eyebrow: "How It Works",
    how_title: "Start in 3 Steps",
    step1_title: "Book a Session",
    step1_desc:
      "Fill in the form and choose a service. I'll reach out via WhatsApp immediately.",
    step2_title: "Set Your Goal",
    step2_desc:
      "At our first meeting, I'll assess your level, goals and schedule. Then I'll create your personal program.",
    step3_title: "Get Results",
    step3_desc:
      "Consistent training, proper nutrition, weekly progress. Results are inevitable.",
    faq_title: "Frequently Asked Questions",
    faq1_q: "Is it suitable for beginners?",
    faq1_a:
      "Yes, absolutely. The program adapts to any level. A special approach is applied for clients starting from zero.",
    faq2_q: "How soon will I see results?",
    faq2_a:
      "Clients who train consistently usually notice the first visible results within 4-6 weeks. Real transformation begins within 3 months.",
    faq3_q: "How does online coaching work?",
    faq3_a:
      "A weekly program is sent via WhatsApp, video support is provided, and progress is tracked. Wherever you are, I'm with you.",
    faq4_q: "Is there a discount for combining nutrition + training plans?",
    faq4_a:
      "Yes, a special price is available for the combined package. Mention it when booking and I'll get in touch.",
    faq5_q: "Where do in-person sessions take place?",
    faq5_a:
      "In-person sessions are held in Sumqayit and Khirdalan. Online coaching is available worldwide.",
    book_eyebrow: "Booking",
    book_title: "Take the First Step",
    book_desc:
      "Fill in the form — I'll contact you via WhatsApp within 24 hours.",
    form_name: "Full Name",
    form_phone: "Phone Number",
    form_service: "Service",
    form_city: "City",
    form_note: "Fill in the form — you'll be contacted via WhatsApp",
    form_submit: "Book via WhatsApp",
    form_subnote: "Response time: within 24 hours",
    srv_opt1: "Personal Training",
    srv_opt2: "Nutrition Plan",
    srv_opt3: "Online Coaching",
    srv_opt4: "Weight Loss Program",
    srv_opt5: "Muscle Building",
    srv_opt6: "Competition Prep",
    city_online: "Online",
    footer_tagline:
      "A healthy mind in a healthy body. Every workout is for a stronger you.",
    footer_nav: "Navigation",
    footer_services: "Services",
    footer_contact: "Contact",
    footer_location: "Location",
    footer_made: "Fitness · Strength · Results",
    form_name_placeholder: "Your name",
  },
};

let currentLang = "az";

function setLang(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.textContent.toLowerCase() === lang);
  });
  document.documentElement.lang = lang;
}

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 100;
  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll(".nav-links a").forEach((a) => {
        a.style.color =
          a.getAttribute("href") === `#${id}` ? "var(--gold)" : "";
      });
    }
  });
});

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  setLang("az");
});
