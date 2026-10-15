// Russian. Only what is translated: anything missing shows the English text (shared/i18n
// merges this over ./en.ts). Today that is the /ru/ page, the skip link and the phone bar;
// the header, footer and offer bar stay in English (marked lang="en").
import type { DeepPartial, Dictionary } from "../index";

const ru: DeepPartial<Dictionary> = {
  formats: {
    dateLong: "{day} {month} {year} года",
    time: "{hour24}:{minutes}",
  },
  chrome: {
    skipLink: "Перейти к содержанию",
    mobileBar: {
      label: "Позвонить или написать",
      call: "Позвонить",
      callAria: "Позвонить {phone}",
      text: "Написать",
    },
  },
  language: {
    metaTitle: "Аренда стиральной и сушильной машины в Торонто, {setPrice}/нед",
    metaDescription:
      "Аренда стиральной и сушильной машины в Торонто и GTA: {setPrice} в неделю за комплект, {singlePrice} за одну машину. Ремонт включён. Говорим по-русски.",
    eyebrow: "Говорим по-русски",
    h1: "Аренда стиральной и сушильной машины в Торонто и GTA",
    priceSet: "{price} в неделю за стиральную и сушильную машину",
    priceSingle: "или {price} в неделю за одну машину",
    priceNote: "Цены в канадских долларах. HST не взимаем.",
    firstWeekFree:
      "Первая неделя бесплатно для новых клиентов, если аренда начнётся до {firstWeekFreeEnd}. Депозит и доставка оплачиваются как обычно.",
    includedTitle: "Входит в цену",
    included: [
      "Ремонт: если машина сломается, мы бесплатно отремонтируем её или заменим.",
      "Бесплатно вывозим вашу старую машину.",
      "Без проверки кредитной истории.",
      "Доставка обычно на той же неделе.",
    ],
    termsTitle: "Условия",
    terms: [
      "Возвратный депозит {deposit}: возвращаем, когда машину сдают в рабочем состоянии.",
      "Минимальный срок — {minWeeks} недели. Дальше — понедельно; любая сторона может завершить аренду, предупредив за {noticeDays} дней, и мы забираем машину.",
      "Стоимость доставки и установки называем до оплаты.",
      "Машины б/у, проверенные, в хорошем рабочем состоянии. Марка и модель — в зависимости от наличия.",
      "Оплата через Interac e-Transfer или кредитной картой.",
      "Порекомендуйте нас другу: вы получите {referralAmount}, когда он заключит договор на {referralMonths} месяцев или дольше.",
    ],
    machinesTitle: "Какие бывают машины",
    machines: {
      stackable: "Стиральная и сушильная машины в колонну",
      "laundry-centre": "Моноблок: стиральная и сушильная машина в одном корпусе",
      "side-by-side-front-load": "Две машины рядом, фронтальная загрузка",
      "side-by-side-top-load": "Две машины рядом, вертикальная загрузка",
      "single-machine": "Только стиральная или только сушильная машина",
    },
    perWeek: "в неделю",
    needsTitle: "Что нужно на месте",
    needs:
      "Подвод холодной и горячей воды, слив и подходящая розетка: большинству электрических сушильных машин нужна розетка 240 В на 3 или 4 контакта. Сушильной машине с вытяжкой нужен выход воздуховода наружу. Пришлите фото сообщением — подскажем, что подойдёт.",
    areaTitle: "Где работаем",
    area: [
      "Торонто (North York, Etobicoke, Scarborough, East York, York)",
      "Миссиссога (Mississauga)",
      "Брамптон (Brampton)",
      "Вон (Vaughan)",
      "Маркхэм (Markham)",
      "Ричмонд-Хилл (Richmond Hill)",
    ],
    areaFar: "Живёте дальше? Спросите нас.",
    contactTitle: "Звоните или пишите",
    call: "Позвонить",
    text: "Написать",
    hours: "Пн–Сб, {opens}–{closes}. Воскресенье — выходной.",
    languagesLine: "Говорим по-английски, по-испански и по-русски.",
    englishLink: "Английская версия сайта",
  },
};

export default ru;
