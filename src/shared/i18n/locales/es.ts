// Spanish. Only what is translated: anything missing shows the English text (shared/i18n
// merges this over ./en.ts). Today that is the /es/ page, the skip link and the phone bar;
// the header, footer and offer bar stay in English (marked lang="en").
import type { DeepPartial, Dictionary } from "../index";

const es: DeepPartial<Dictionary> = {
  formats: {
    dateLong: "{day} de {month} de {year}",
  },
  chrome: {
    skipLink: "Ir al contenido",
    mobileBar: {
      label: "Llamar o escribir",
      call: "Llamar",
      callAria: "Llamar {phone}",
      text: "Mensaje",
    },
  },
  language: {
    metaTitle: "Alquiler de lavadora y secadora, Toronto | {setPrice}/semana",
    metaDescription:
      "Alquiler de lavadora y secadora en Toronto y el GTA: {setPrice} a la semana el juego, {singlePrice} una sola máquina. Reparaciones incluidas. Hablamos español.",
    eyebrow: "Hablamos español",
    h1: "Alquiler de lavadora y secadora en Toronto y el GTA",
    priceSet: "{price} a la semana por una lavadora y una secadora",
    priceSingle: "o {price} a la semana por una sola máquina",
    priceNote: "Precios en dólares canadienses. No cobramos HST.",
    firstWeekFree:
      "Primera semana gratis para clientes nuevos que empiecen su alquiler hasta el {firstWeekFreeEnd}. El depósito y la entrega se pagan normalmente.",
    includedTitle: "Incluido",
    included: [
      "Reparaciones: si la máquina falla, la reparamos o la cambiamos sin costo.",
      "Nos llevamos su máquina vieja sin costo.",
      "Sin verificación de crédito.",
      "Entrega normalmente en la misma semana.",
    ],
    termsTitle: "Condiciones",
    terms: [
      "Depósito reembolsable de {deposit}: se devuelve cuando la máquina regresa funcionando.",
      "Mínimo {minWeeks} semanas. Después, semana a semana; cualquiera de las partes puede terminar el alquiler con {noticeDays} días de aviso y nosotros recogemos la máquina.",
      "La entrega y la instalación se cotizan antes de que usted pague.",
      "Máquinas usadas, revisadas y en buen estado. La marca y el modelo dependen de la disponibilidad.",
      "Pago por Interac e-Transfer o con tarjeta de crédito.",
      "Recomiende a un amigo: usted recibe {referralAmount} cuando él firma por {referralMonths} meses o más.",
    ],
    machinesTitle: "Tipos de máquinas",
    machines: {
      stackable: "Lavadora y secadora apilables",
      "laundry-centre": "Centro de lavado de una pieza (lavadora y secadora en una unidad)",
      "side-by-side-front-load": "Lavadora y secadora lado a lado, carga frontal",
      "side-by-side-top-load": "Lavadora y secadora lado a lado, carga superior",
      "single-machine": "Solo lavadora o solo secadora",
    },
    perWeek: "a la semana",
    needsTitle: "Lo que necesita en su espacio",
    needs:
      "Tomas de agua fría y caliente, un desagüe y el enchufe correcto: la mayoría de las secadoras eléctricas usan 240 V, de 3 o 4 clavijas. Una secadora con ventilación necesita una salida al exterior. Envíenos una foto por mensaje de texto y lo revisamos.",
    areaTitle: "Zona de servicio",
    area: [
      "Toronto (North York, Etobicoke, Scarborough, East York, York)",
      "Mississauga",
      "Brampton",
      "Vaughan",
      "Markham",
      "Richmond Hill",
    ],
    areaFar: "¿Vive más lejos? Pregúntenos.",
    contactTitle: "Llame o envíe un mensaje de texto",
    call: "Llamar",
    text: "Mensaje",
    hours: "Lunes a sábado, {opens} – {closes}. Domingo cerrado.",
    languagesLine: "Hablamos inglés, español y ruso.",
    englishLink: "Ver el sitio en inglés",
  },
};

export default es;
