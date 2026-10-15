// Spanish. Only what is translated: anything missing shows the English text (shared/i18n
// merges this over ./en.ts). Every page has a Spanish version (/es/...), so every key of
// ./en.ts can be translated here, with the same {placeholders}.
import type { DeepPartial, Dictionary } from "../index";

const es: DeepPartial<Dictionary> = {
  formats: {
    dateLong: "{day} de {month} de {year}",
  },
  common: {
    pricesNote: "Precios en dólares canadienses. No cobramos HST.",
    call: "Llamar",
    text: "Mensaje",
    hoursSentence: "Lunes a sábado, {opens} – {closes}. Domingo cerrado.",
    fartherAwayAsk: "¿Vive más lejos? Pregúntenos.",
  },
  chrome: {
    skipLink: "Ir al contenido",
    mobileBar: {
      label: "Llamar o escribir",
      call: "Llamar",
      callAria: "Llamar {phone}",
    },
  },
  offers: {
    promotions: {
      "first-week-free": {
        note: "Primera semana gratis para clientes nuevos que empiecen su alquiler hasta el {firstWeekFreeEnd}. El depósito y la entrega se pagan normalmente.",
      },
    },
  },
  pages: {
    home: {
      title: "Alquiler de lavadora y secadora, Toronto | {setPrice}/semana",
    },
  },
  machines: {
    types: {
      stackable: { title: "Lavadora y secadora apilables" },
      "laundry-centre": { title: "Centro de lavado de una pieza (lavadora y secadora en una unidad)" },
      "side-by-side-front-load": { title: "Lavadora y secadora lado a lado, carga frontal" },
      "side-by-side-top-load": { title: "Lavadora y secadora lado a lado, carga superior" },
      "single-machine": { title: "Solo lavadora o solo secadora" },
    },
    index: {
      hookupsTitle: "Lo que necesita en su espacio",
    },
  },
  home: {
    hero: {
      eyebrow: "Hablamos español",
      title: "Alquiler de lavadora y secadora en Toronto y el GTA",
    },
    prices: {
      included: "Incluido",
      includedItems: [
        "Reparaciones: si la máquina falla, la reparamos o la cambiamos sin costo.",
        "Nos llevamos su máquina vieja sin costo.",
      ],
      terms: [
        "Depósito reembolsable de {deposit}: se devuelve cuando la máquina regresa funcionando.",
        "Mínimo {minWeeks} semanas. Después, semana a semana; cualquiera de las partes puede terminar el alquiler con {noticeDays} días de aviso y nosotros recogemos la máquina.",
        "La entrega y la instalación se cotizan antes de que usted pague.",
        "Pago por Interac e-Transfer o con tarjeta de crédito.",
      ],
    },
    serviceArea: {
      title: "Zona de servicio",
    },
  },
  about: {
    links: {
      machines: "Tipos de máquinas",
    },
  },
  contact: {
    eyebrow: "Llame o envíe un mensaje de texto",
  },
};

export default es;
