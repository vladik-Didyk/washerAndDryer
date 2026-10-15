// Russian. Only what is translated: anything missing shows the English text (shared/i18n
// merges this over ./en.ts). Every page has a Russian version (/ru/...), so every key of
// ./en.ts can be translated here, with the same {placeholders}.
import type { DeepPartial, Dictionary } from "../index";

const ru: DeepPartial<Dictionary> = {
  formats: {
    dateLong: "{day} {month} {year} года",
    time: "{hour24}:{minutes}",
  },
  common: {
    pricesNote: "Цены в канадских долларах. HST не взимаем.",
    call: "Позвонить",
    text: "Написать",
    hoursSentence: "Пн–Сб, {opens}–{closes}. Воскресенье — выходной.",
    fartherAwayAsk: "Живёте дальше? Спросите нас.",
  },
  chrome: {
    skipLink: "Перейти к содержанию",
    mobileBar: {
      label: "Позвонить или написать",
      call: "Позвонить",
      callAria: "Позвонить {phone}",
    },
  },
  offers: {
    promotions: {
      "first-week-free": {
        note: "Первая неделя бесплатно для новых клиентов, если аренда начнётся до {firstWeekFreeEnd}. Депозит и доставка оплачиваются как обычно.",
      },
    },
  },
  pages: {
    home: {
      title: "Аренда стиральной и сушильной машины в Торонто, {setPrice}/нед",
    },
  },
  machines: {
    types: {
      stackable: { title: "Стиральная и сушильная машины в колонну" },
      "laundry-centre": { title: "Моноблок: стиральная и сушильная машина в одном корпусе" },
      "side-by-side-front-load": { title: "Две машины рядом, фронтальная загрузка" },
      "side-by-side-top-load": { title: "Две машины рядом, вертикальная загрузка" },
      "single-machine": { title: "Только стиральная или только сушильная машина" },
    },
    index: {
      hookupsTitle: "Что нужно на месте",
    },
  },
  home: {
    hero: {
      eyebrow: "Говорим по-русски",
      title: "Аренда стиральной и сушильной машины в Торонто и GTA",
    },
    prices: {
      included: "Входит в цену",
      includedItems: [
        "Ремонт: если машина сломается, мы бесплатно отремонтируем её или заменим.",
        "Бесплатно вывозим вашу старую машину.",
      ],
      terms: [
        "Возвратный депозит {deposit}: возвращаем, когда машину сдают в рабочем состоянии.",
        "Минимальный срок — {minWeeks} недели. Дальше — понедельно; любая сторона может завершить аренду, предупредив за {noticeDays} дней, и мы забираем машину.",
        "Стоимость доставки и установки называем до оплаты.",
        "Оплата через Interac e-Transfer или кредитной картой.",
      ],
    },
    serviceArea: {
      title: "Где работаем",
    },
  },
  about: {
    links: {
      machines: "Какие бывают машины",
    },
  },
  contact: {
    eyebrow: "Звоните или пишите",
  },
};

export default ru;
