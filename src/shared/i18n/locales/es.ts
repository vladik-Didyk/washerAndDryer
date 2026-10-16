// Spanish. Only what is translated: anything missing shows the English text (shared/i18n
// merges this over ./en.ts). Every page has a Spanish version (/es/...), so every key of
// ./en.ts can be translated here, with the same {placeholders}.
// Voice: neutral Latin-American Spanish, "usted". Place names and the company name stay in
// English. Sizes keep a non-breaking space before "cm", as in English.
import type { DeepPartial, Dictionary } from "../index";

const es: DeepPartial<Dictionary> = {
  formats: {
    dateLong: "{day} de {month} de {year}",
    dateShort: "{day} de {month}",
    time: "{hour}{min} {period}",
    am: "a. m.",
    pm: "p. m.",
  },

  common: {
    moreDetails: "Más detalles",
    carousel: {
      previous: "Imagen anterior",
      next: "Imagen siguiente",
      slideOf: "{index} de {count}",
      goTo: "Ir a la imagen {index} de {count}",
      slides: "Imágenes",
      pause: "Pausar la presentación",
      play: "Reanudar la presentación",
    },
    examplePhotos: "Fotos de ejemplo, no de nuestras máquinas ni edificios.",
    sharedRooms: {
      title: "Lavanderías compartidas",
      note: "Fotos de ejemplo de lavanderías compartidas, no de edificios que atendemos.",
    },
    languages: "inglés, español y ruso",
    tagline: "Alquiler de lavadora y secadora en Toronto y el GTA",
    location: "Toronto · servicio en todo el GTA",
    localBusiness: "Negocio local de Toronto",
    torontoAndGta: "Toronto y el GTA",
    call: "Llamar",
    text: "Mensaje",
    callPhone: "Llamar al {phone}",
    callOrText: "Llame o escriba al {phone}",
    textPhone: "Escribir al {phone}",
    startRental: "Empezar el alquiler",
    getQuote: "Pedir una cotización",
    pricesNote: "Precios en dólares canadienses. No cobramos HST.",
    priceTagNote: "No cobramos HST · Precios en CAD",
    perWeekSuffix: "/semana",
    pricePerWeek: "{price}/semana",
    aWeek: "por semana",
    wasPrice: "antes {price}",
    hoursSentence: "Lunes a sábado, {opens} – {closes}; domingo cerrado.",
    hoursList: ["Lun–Sáb: {opens} – {closes}", "Domingo: cerrado"],
    preferCallOrText: "¿Prefiere llamar o escribir?",
    closetPhotoHelps: "Una foto del clóset ayuda. Puede enviárnosla por mensaje de texto.",
    fartherAwayAsk: "¿Vive más lejos? Pregúntenos.",
    fartherAwayCall: "¿Vive más lejos? Llame o escriba al {phoneLink} y pregúntenos.",
    allAreas: "Todas las zonas",
    compareAllTypes: "Comparar todos los tipos de máquinas",
    compareTypes: "Comparar los tipos de máquinas",
    examplePhotosNote:
      "Las fotos son ejemplos de cada tipo, no nuestras máquinas. La marca y el modelo dependen de lo que haya disponible.",
    textPhotoFits:
      "¿No sabe qué tiene? Envíe una foto del espacio al {phoneLink} y le decimos qué máquina cabe.",
    readyToRent: "¿Listo para alquilar?",
    readyToRentText:
      "Díganos su zona y su espacio de lavandería. Le respondemos con la máquina, el total y la fecha de inicio.",
    measureGuide: "Cómo medir su espacio de lavandería",
    howItWorks: "Cómo funciona",
    opensInNewTab: "(se abre en una pestaña nueva)",
    availableInEnglish: "Disponible en inglés",
    hookups: [
      "Llaves de agua caliente y fría para la lavadora",
      "Un desagüe: un tubo de desagüe vertical o una tina de lavado",
      "Un tomacorriente normal para la lavadora",
      "Para una secadora eléctrica: un tomacorriente de 240V, de 3 o 4 clavijas",
      "Para una secadora con ventilación: un ducto de salida al exterior",
    ],
    howWeWork: [
      "Revisamos cada máquina antes de que salga.",
      "Conectamos bien el agua, el desagüe, la electricidad y la ventilación.",
      "Hacemos un ciclo de prueba antes de irnos.",
      "Atendemos llamadas en inglés, español y ruso.",
    ],
    logoAlt: "{company}",
  },

  photos: {
    "rooms/washer-dryer-shelving": "Ejemplo: una lavadora blanca de carga frontal bajo estantes de madera en una lavandería luminosa",
    "rooms/washer-shelves": "Ejemplo: una lavadora blanca de carga frontal entre una canasta y estantes abiertos",
    "rooms/drum-empty": "Ejemplo: el tambor de acero vacío de una lavadora de carga frontal, visto por la puerta abierta",
    "rooms/washer-basket-sock": "Ejemplo: una lavadora blanca con una canasta de ropa encima y un calcetín en la puerta",
    "rooms/washer-cabinet-plants": "Ejemplo: una lavadora blanca de carga frontal bajo un mesón, junto a un mueble con plantas",
    "rooms/dark-set-laundry-room": "Ejemplo: lavadora y secadora gris oscuro de carga frontal, lado a lado bajo una repisa",
    "rooms/grey-set-laundry-room": "Ejemplo: lavadora y secadora grises de carga frontal, lado a lado con una canasta encima",
    "rooms/drum-open-door": "Ejemplo: una lavadora de carga frontal con la puerta abierta, mostrando el tambor",
    "rooms/laundry-room-shirts": "Ejemplo: una lavadora blanca de carga frontal en una lavandería con camisas colgadas arriba",
    "rooms/black-washer-basket": "Ejemplo: una lavadora negra de carga frontal con una canasta blanca delante",
    "rooms/stacked-small-room": "Ejemplo: una secadora blanca sobre una lavadora de carga frontal en un cuarto pequeño y blanco",
    "shared/stacked-dryers-tiles": "Ejemplo de lavandería compartida: lavadoras y secadoras apiladas junto a una pared de azulejos",
    "shared/stacked-dryers-row": "Ejemplo de lavandería compartida: una fila de secadoras apiladas con puertas redondas",
    "shared/washers-row-silver": "Ejemplo de lavandería compartida: una fila de lavadoras plateadas de carga frontal",
    "shared/washers-and-dryers-rows": "Ejemplo de lavandería compartida: una fila de lavadoras frente a una fila de secadoras",
    "shared/washers-row-beige": "Ejemplo de lavandería compartida: una fila de lavadoras beige de carga frontal con letras en las puertas",
    "shared/washers-row-wood-front": "Ejemplo de lavandería compartida: lavadoras de carga frontal con frentes de madera",
    "shared/washers-row-wide": "Ejemplo de lavandería compartida: una larga fila de lavadoras de carga frontal",
  },

  chrome: {
    skipLink: "Ir al contenido",
    ogImageAlt: "{company}: alquiler de lavadora y secadora en Toronto y el GTA",
    breadcrumb: "Ruta de navegación",
    mobileBar: {
      label: "Llamar o escribir",
      call: "Llamar",
      callAria: "Llamar al {phone}",
      startRental: "Alquilar",
      getQuote: "Cotizar",
      repairForm: "Reparación",
      textUs: "Escribir",
    },
    draft: {
      label: "Aviso de borrador",
      title: "Borrador: no publicado",
      text: "Solo versión de prueba. El sitio publicado no muestra esta página hasta que se apruebe.",
    },
    offerBar: {
      label: "Ofertas actuales",
    },
  },

  nav: {
    main: "Principal",
    more: "Más",
    machines: "Máquinas",
    prices: "Precios",
    areas: "Zonas",
    landlords: "Propietarios",
    faq: "Preguntas",
    repair: "Pedir una reparación",
    guides: "Guías",
    account: "Pagar / gestionar",
  },

  header: {
    utilityLine: "Lun–Sáb {opens} – {closes} · Hablamos {languages}",
    callAria: "Llamar al {phone}",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    menuContact: "{phone}, Lun–Sáb {opens} – {closes}",
    language: "Idioma",
  },

  footer: {
    weSpeak: "Hablamos {languages}.",
    facebook: "Página de Facebook",
    machines: "Máquinas",
    allMachineTypes: "Todos los tipos de máquinas",
    areas: "Zonas",
    torontoDistricts: "Distritos de Toronto",
    company: "Empresa",
    languages: "Idiomas",
    about: "Quiénes somos",
    contact: "Contacto",
    landlords: "Propietarios",
    buildings: "Lavanderías",
    repair: "Pedir una reparación",
    guides: "Guías",
    account: "Pagar / gestionar",
    privacy: "Privacidad",
    terms: "Condiciones del alquiler",
    copyright: "© {year} {company}",
  },

  offers: {
    promotions: {
      "first-week-free": {
        short: "Primera semana gratis hasta el {firstWeekFreeEndShort}",
        title: "Primera semana gratis",
        text: "Los clientes nuevos que empiecen su alquiler hasta el {firstWeekFreeEnd} no pagan la renta de la primera semana. Aplica a juegos de lavadora y secadora y a máquinas individuales.",
        stillPaid: "El depósito de {deposit} y la entrega se pagan normalmente.",
        note: "Primera semana gratis para clientes nuevos que empiecen su alquiler hasta el {firstWeekFreeEnd}. El depósito y la entrega se pagan normalmente.",
      },
    },
    referral: {
      short: "Recomiende a un amigo y reciba {referralAmount}",
      title: "Recomiende a un amigo",
      text: "Usted recibe {referralAmount} cuando un amigo que recomendó alquila con nosotros por {referralMonths} meses o más.",
    },
  },

  pages: {
    home: {
      name: "Inicio",
      llmsNote: "oferta, tipos de máquinas, precios, cómo funciona, preguntas frecuentes, solicitud de alquiler",
      title: "Alquiler de lavadora y secadora, Toronto | {setPrice}/semana",
      description:
        "Alquiler de lavadora y secadora en Toronto y el GTA: {setPrice} por semana el juego, {singlePrice} una máquina. Reparaciones incluidas. Llame al {phone}.",
    },
    areas: {
      name: "Zonas",
      llmsNote: "cada ciudad y distrito de Toronto donde entregamos, con verificación de código postal",
      title: "Zona de servicio: lavadoras y secadoras | Toronto y el GTA",
      description:
        "Dónde entregamos lavadoras y secadoras en alquiler: Toronto y sus distritos, Mississauga, Brampton, Vaughan, Markham y Richmond Hill.",
    },
    machines: {
      name: "Máquinas",
      llmsNote: "los cinco tipos de máquinas comparados, con precios",
      title: "Tipos de lavadoras y secadoras | desde {singlePrice}/semana",
      description:
        "Compare los tipos de lavadora y secadora que alquilamos en Toronto y el GTA: apilables, centro de lavado, lado a lado o una sola máquina.",
    },
    landlords: {
      name: "Propietarios",
      llmsNote: "dos opciones: los inquilinos alquilan directamente, o el propietario alquila las máquinas para las unidades",
      title: "Lavadoras y secadoras para propietarios | Toronto y el GTA",
      description:
        "Lavandería para unidades en alquiler en Toronto y el GTA: sus inquilinos nos alquilan directamente, o usted alquila las máquinas. Reparaciones incluidas.",
    },
    buildings: {
      name: "Lavanderías",
      title: "Máquinas para lavanderías de edificios | Toronto y GTA",
      description:
        "Lavadoras y secadoras para lavanderías compartidas en edificios de Toronto y el GTA: el edificio alquila las máquinas o los residentes pagan por carga.",
    },
    landlordQuote: {
      name: "Pedir una cotización",
      llmsNote: "formulario de cotización para propietarios",
      title: "Cotización para propietarios: lavadoras y secadoras",
      description:
        "Pida una cotización de lavadoras y secadoras para sus unidades en Toronto y el GTA. Con {quoteUnits} o más unidades, cotizamos tras ver el edificio.",
    },
    faq: {
      name: "Preguntas frecuentes",
      llmsNote: "alquiler, precios y pago, entrega e instalación, reparaciones, propietarios, ofertas actuales",
      title: "Preguntas frecuentes | {company}",
      description:
        "Respuestas sobre alquilar lavadora y secadora en Toronto y el GTA: precios, depósito, pago, entrega, instalación, reparaciones y propietarios.",
    },
    about: {
      name: "Quiénes somos",
      llmsNote: "quiénes somos y cómo trabajamos",
      title: "Quiénes somos | {company}, Toronto",
      description:
        "{company} es un negocio local de Toronto con más de {experienceYears} años de experiencia instalando y reparando lavadoras y secadoras.",
    },
    contact: {
      name: "Contacto",
      llmsNote: "teléfono, horario, idiomas y cómo hacer la solicitud de alquiler",
      title: "Contacto | {company}, {phone}",
      description:
        "Llame o escriba al {phone}, de lunes a sábado, de {opens} a {closes}, en inglés, español o ruso. O envíe una solicitud y le cotizamos.",
    },
    repair: {
      name: "Pedir una reparación",
      llmsNote: "formulario de reparación para clientes que nos alquilan",
      title: "Pedir una reparación | {company}",
      description:
        "¿Nos alquila una lavadora o secadora y dejó de funcionar? Las reparaciones están incluidas. Envíe una solicitud, o llame o escriba al {phone}.",
    },
    account: {
      name: "Pagar o gestionar",
      llmsNote: "pago con tarjeta, el portal de clientes de Stripe, terminar un alquiler",
      title: "Pagar o gestionar su alquiler | {company}",
      description:
        "Pague con el enlace que enviamos con su cotización, gestione su tarjeta y recibos en el portal de Stripe, o escríbanos para terminar el alquiler.",
    },
    start: {
      name: "Empezar el alquiler",
      llmsNote: "la solicitud de alquiler en tres pasos cortos: tipo de máquina, su espacio, cómo contactarle",
      title: "Empezar el alquiler | {company}",
      description:
        "Pida el alquiler de lavadora y secadora en Toronto y el GTA en tres pasos cortos. Le respondemos con la máquina, el total y la fecha de inicio.",
    },
    guides: {
      name: "Guías",
      llmsNote: "guías prácticas para alquilar lavadora y secadora",
      title: "Guías: lavadora y secadora | {company}",
      description:
        "Guías prácticas para alquilar lavadora y secadora en Toronto y el GTA: qué medir, revisar y preguntar antes del día de la entrega.",
    },
    notFound: {
      name: "Página no encontrada",
      title: "Página no encontrada | {company}",
      description:
        "Esta página no existe. Alquiler de lavadora y secadora en Toronto y el GTA: {setPrice} por semana el juego. Llame o escriba al {phone}.",
    },
    error: {
      title: "Algo salió mal | {company}",
    },
  },

  jsonLd: {
    setOffer: {
      name: "Alquiler de juego de lavadora y secadora",
      description: "Un juego de lavadora y secadora, por semana. Incluye reparaciones y retiro de la máquina vieja.",
    },
    singleOffer: {
      name: "Alquiler de una lavadora o secadora",
      description: "Una lavadora o una secadora, por semana. Incluye reparaciones y retiro de la máquina vieja.",
    },
    business: {
      description:
        "Alquiler de lavadora y secadora en Toronto y el GTA. {setPrice} por semana un juego de lavadora y secadora, {singlePrice} por semana una sola máquina. Incluye reparaciones y retiro de la máquina vieja. Hablamos inglés, español y ruso.",
      paymentAccepted: "Interac e-Transfer, tarjeta de crédito",
      catalog: "Alquiler de lavadoras y secadoras",
    },
    serviceType: "Alquiler de lavadora y secadora",
    serviceGta: "Alquiler de lavadora y secadora en Toronto y el GTA",
    serviceIn: "Alquiler de lavadora y secadora en {place}",
    serviceInDistrict: "Alquiler de lavadora y secadora en {place}, Toronto",
    torontoPlace: "{place}, Toronto",
    machinesList: "Tipos de lavadoras y secadoras en alquiler",
    machineOffer: {
      name: "Alquiler: {title}",
      description: "{title}, por semana. Incluye reparaciones y retiro de la máquina vieja.",
    },
    landlords: {
      name: "Alquiler de lavadoras y secadoras para propietarios",
      serviceType: "Alquiler de lavadoras y secadoras para unidades en alquiler",
      audience: "Propietarios",
      offerName: "Juego de lavadora y secadora para una unidad en alquiler",
      offerDescription:
        "Precio de lista por juego de lavadora y secadora, por semana. Con {quoteUnits} o más unidades, se cotiza por edificio después de verlo. Reparaciones incluidas.",
    },
    buildings: {
      name: "Lavadoras y secadoras para lavanderías de edificios",
      serviceType: "Suministro de lavadoras y secadoras para lavanderías compartidas",
      audience: "Propietarios y administradores de edificios residenciales",
    },
    contact: {
      contactType: "servicio al cliente",
      languages: ["inglés", "español", "ruso"],
    },
    guidesList: "Guías para alquilar lavadora y secadora",
  },

  forms: {
    requiredNote: "Los campos marcados con {star} son obligatorios.",
    sending: "Enviando…",
    sendError: "No se pudo enviar. Llame o escriba al {phoneLink}.",
    sentTitle: "Solicitud enviada.",
    sentNote: "Le llamaremos o le escribiremos.",
    sendAnother: "Enviar otra",
    name: "Nombre",
    phone: "Teléfono",
    email: "Correo electrónico",
    notes: "Notas",
    optional: "Opcional.",
    notGiven: "No indicado",
    none: "Ninguno",
    errors: {
      nameMissing: "Escriba su nombre.",
      nameShort: "El nombre debe tener al menos 2 caracteres.",
      phoneMissing: "Escriba su número de teléfono.",
      phoneInvalid: "Escriba un número de teléfono válido, con código de área.",
      emailInvalid: "Escriba un correo electrónico válido, o déjelo vacío.",
    },
  },

  postalCheck: {
    label: "Su código postal",
    placeholder: "p. ej. M5V 2T6",
    check: "Verificar",
    invalid: "Escriba un código postal canadiense válido, como M5V 2T6.",
    yes: "Sí, entregamos en {city}.",
    outside: "{place} está fuera de nuestra zona habitual. Llame o escriba al {phone} y lo verificamos.",
    unsure: "No podemos saberlo por el código postal. Envíenos su dirección por mensaje al {phone} y le confirmamos.",
    textUs: "Escribir al {phone}",
  },

  machines: {
    types: {
      stackable: {
        title: "Lavadora y secadora apilables",
        description: "La secadora va encima de una lavadora de carga frontal. Cabe en clósets angostos.",
        priceNote: "por el juego",
        alt: "Lavadora de carga frontal con una secadora apilada encima",
        compare: {
          width: "Unas 24″ (61 cm) o 27″ (69 cm), el ancho de una máquina",
          loads: "Frontal",
          goodFor: "Clósets angostos y altos en condominios y apartamentos",
        },
        sizes: [
          { label: "Ancho", value: "Unas 24″ (61 cm) compacta, o unas 27″ (69 cm) de tamaño completo" },
          { label: "Espacio en el piso", value: "El ancho de una máquina: la secadora va encima de la lavadora" },
        ],
        photos: {
          "stackable-1":
            "Ejemplo de lavadora y secadora apilables: una secadora blanca encima de una lavadora blanca de carga frontal",
          stackable: "Ejemplo de lavadora y secadora apilables en un clóset de lavandería con la puerta abierta",
        },
        page: {
          metaTitle: "Lavadora y secadora apilables, Toronto | {setPrice}/semana",
          metaDescription:
            "Alquile lavadora y secadora apilables en Toronto y el GTA por {setPrice} por semana. Caben en clósets angostos. Incluye reparaciones y retiro.",
          h1: "Alquiler de lavadora y secadora apilables",
          intro: "Una lavadora de carga frontal con la secadora encima: dos máquinas completas en el espacio de una.",
          whatItIs: [
            "Un par apilable es una lavadora de carga frontal con una secadora del mismo tamaño montada encima con un kit de apilamiento. Son dos máquinas separadas, cada una con sus propios controles, en una sola columna.",
            "Como solo una máquina toca el piso, un par apilable cabe en clósets donde dos máquinas lado a lado nunca cabrían.",
          ],
          fits: [
            "Clósets de lavandería en condominios y apartamentos",
            "Espacios angostos con altura suficiente para dos máquinas, una sobre otra",
            "Quien quiere una lavadora de carga frontal pero solo tiene espacio para una máquina",
          ],
          size: "Los pares apilables compactos suelen medir unas 24 pulgadas (61 cm) de ancho; los de tamaño completo, unas 27 pulgadas (69 cm). Mida el ancho, la profundidad y la altura del espacio, y la puerta por donde tienen que pasar. Deje unas pulgadas atrás para las mangueras y el ducto de la secadora.",
        },
      },
      "laundry-centre": {
        title: "Centro de lavado de una pieza (lavadora y secadora en una unidad)",
        description: "Lavadora y secadora en una sola unidad. La máquina típica de los clósets de condominio.",
        priceNote: "por el juego",
        alt: "Centro de lavado de una pieza: una secadora sobre una lavadora de carga superior en un solo gabinete",
        compare: {
          width: "24″ (61 cm) o 27″ (69 cm)",
          loads: "Superior",
          goodFor: "Clósets hechos para una unidad de una pieza",
        },
        sizes: [
          { label: "Ancho", value: "24″ (61 cm) o 27″ (69 cm)" },
          { label: "Altura", value: "Unas 70″ (178 cm) para una unidad de 24″" },
        ],
        photos: {
          "laundry-centre":
            "Ejemplo de centro de lavado de una pieza: una secadora sobre una lavadora de carga superior en un solo gabinete",
          "laundry-centre-1": "Ejemplo de un centro de lavado de una pieza en un clóset junto a puertas de gabinete beige",
          "laundry-centre-2": "Ejemplo de un centro de lavado de una pieza en un clóset del pasillo con la puerta abierta",
        },
        page: {
          metaTitle: "Centro de lavado en alquiler, Toronto | {setPrice}/semana",
          metaDescription:
            "Alquile un centro de lavado (lavadora y secadora en una unidad) en Toronto y el GTA por {setPrice} por semana. 24″ o 27″. Reparaciones incluidas.",
          h1: "Alquiler de centro de lavado: lavadora y secadora en una unidad",
          intro:
            "Una lavadora de carga superior y una secadora en un solo gabinete. Una sola máquina para entregar y un solo espacio que llenar.",
          whatItIs: [
            "Un centro de lavado es un solo aparato con una lavadora de carga superior abajo y una secadora arriba. Los controles de ambas están en un mismo panel.",
            "Muchos clósets de condominio se construyeron para esta máquina, así que suele ser el cambio más sencillo cuando hay que reemplazar una unidad vieja.",
          ],
          fits: [
            "Clósets de condominio hechos para una unidad de una pieza",
            "Espacios de lavandería pequeños con una sola toma de agua, desagüe y electricidad",
            "Quien prefiere cargar la lavadora por arriba",
          ],
          size: "Los centros de lavado miden 24 o 27 pulgadas (61 o 69 cm) de ancho. Una unidad de 24 pulgadas mide unas 70 pulgadas (178 cm) de alto. Mida el ancho y la altura del clóset, y revise la profundidad con las puertas cerradas.",
        },
      },
      "side-by-side-front-load": {
        title: "Lavadora y secadora lado a lado, carga frontal",
        description: "Dos máquinas de tamaño completo, una al lado de la otra. Cargas grandes, fácil acceso.",
        priceNote: "por el juego",
        alt: "Lavadora y secadora de carga frontal una al lado de la otra",
        compare: {
          width: "Unas 55″ (140 cm) el par",
          loads: "Frontal",
          goodFor: "Cuartos de lavado y cargas grandes como ropa de cama",
        },
        sizes: [
          { label: "Ancho", value: "Unas 27″ (69 cm) cada una, unas 55″ (140 cm) el par" },
          { label: "Espacio libre", value: "Espacio al frente para que ambas puertas abran por completo" },
        ],
        photos: {
          "side-by-side-front-load-1":
            "Ejemplo de lavadora y secadora blancas de carga frontal, lado a lado, sobre una plataforma elevada con cajones",
          "side-by-side-front-load-2":
            "Ejemplo de lavadora y secadora blancas de carga frontal, lado a lado, sobre pedestales en un cuarto de lavado",
          "side-by-side-front-load":
            "Ejemplo de lavadora y secadora grises de carga frontal, lado a lado, sobre pedestales junto a una ventana",
        },
        page: {
          metaTitle: "Lavadora y secadora de carga frontal, Toronto | {setPrice}/sem.",
          metaDescription:
            "Alquile lavadora y secadora de carga frontal, lado a lado, en Toronto y el GTA por {setPrice} por semana. Tambores grandes. Reparaciones incluidas.",
          h1: "Alquiler de lavadora y secadora lado a lado, carga frontal",
          intro:
            "Una lavadora de carga frontal y una secadora del mismo estilo, una al lado de la otra. Tambores de tamaño completo y una superficie plana para doblar ropa.",
          whatItIs: [
            "Dos máquinas separadas de tamaño completo, ambas de carga frontal, colocadas lado a lado. La parte de arriba queda libre y sirve como mesa para doblar ropa.",
            "Las lavadoras de carga frontal mueven la ropa en poca agua, lo que va bien con cargas grandes como ropa de cama y toallas.",
          ],
          fits: [
            "Casas con cuarto de lavado o zona de lavado en el sótano",
            "Hogares grandes que lavan seguido",
            "Espacios con lugar al frente para que ambas puertas abran",
          ],
          size: "Las máquinas de tamaño completo suelen medir unas 27 pulgadas (69 cm) de ancho cada una, así que calcule unas 55 pulgadas (140 cm) de ancho más un poco de espacio entre ellas y alrededor. Verifique que ambas puertas puedan abrir por completo.",
        },
      },
      "side-by-side-top-load": {
        title: "Lavadora y secadora lado a lado, carga superior",
        description: "Lavadora de carga superior con su secadora. Sencilla y resistente.",
        priceNote: "por el juego",
        alt: "Lavadora de carga superior con su secadora al lado",
        compare: {
          width: "Unas 55″ (140 cm) el par",
          loads: "Superior",
          goodFor: "Cuartos de lavado, y agacharse menos para cargar",
        },
        sizes: [
          { label: "Ancho", value: "Unas 27″ (69 cm) cada una, unas 55″ (140 cm) el par" },
          { label: "Espacio libre", value: "Espacio libre sobre la lavadora para abrir la tapa" },
        ],
        photos: {
          "side-by-side-top-load-1":
            "Ejemplo de lavadora blanca de carga superior y su secadora en un cuarto de lavado con paredes amarillas",
          "side-by-side-top-load-2": "Ejemplo de lavadora y secadora de carga superior en un sótano sin terminar",
          "side-by-side-top-load": "Ejemplo de lavadora blanca de carga superior y su secadora bajo unos gabinetes de pared",
        },
        page: {
          metaTitle: "Lavadora y secadora de carga superior, Toronto | {setPrice}/sem.",
          metaDescription:
            "Alquile lavadora de carga superior y su secadora en Toronto y el GTA por {setPrice} por semana. Fácil de usar. Incluye reparaciones y retiro.",
          h1: "Alquiler de lavadora y secadora lado a lado, carga superior",
          intro:
            "El par clásico: una lavadora de carga superior con su secadora al lado. Controles sencillos y menos necesidad de agacharse.",
          whatItIs: [
            "Una lavadora de carga superior se abre con una tapa arriba, así que se carga de pie. La secadora de al lado se carga por el frente.",
            "Las lavadoras de carga superior tienen controles sencillos y una abertura amplia, así que es fácil sacar la ropa mojada y pesada.",
          ],
          fits: [
            "Sótanos y cuartos de lavado con espacio libre sobre la lavadora",
            "Quien prefiere no agacharse para cargar la lavadora",
            "Hogares que quieren una máquina sencilla y conocida",
          ],
          size: "Las máquinas de tamaño completo suelen medir unas 27 pulgadas (69 cm) de ancho cada una, así que calcule unas 55 pulgadas (140 cm) de ancho. La tapa de la lavadora necesita espacio libre arriba para abrir, así que una repisa baja encima puede estorbar.",
        },
      },
      "single-machine": {
        title: "Solo lavadora o solo secadora",
        description: "Una máquina para combinar con la que ya tiene.",
        priceNote: "por una máquina",
        alt: "Una lavadora junto al contorno punteado de una máquina que usted ya tiene",
        compare: {
          width: "Unas 24″ (61 cm) o 27″ (69 cm)",
          loads: "Frontal o superior",
          goodFor: "Combinar con una máquina que ya tiene",
        },
        sizes: [{ label: "Ancho", value: "Unas 27″ (69 cm) de tamaño completo, o unas 24″ (61 cm) compacta" }],
        photos: {
          "single-machine-washer": "Ejemplo de una lavadora blanca de carga frontal con toallas encima",
          "single-machine-dryer": "Ejemplo de una secadora blanca de carga frontal",
          "single-machine": "Ejemplo de una lavadora blanca de carga frontal",
        },
        page: {
          metaTitle: "Alquiler de lavadora o secadora, Toronto | {singlePrice}/semana",
          metaDescription:
            "Alquile solo una lavadora o solo una secadora en Toronto y el GTA por {singlePrice} por semana. Combínela con la que ya tiene. Reparaciones incluidas.",
          h1: "Alquiler de lavadora o secadora: una máquina",
          intro: "Solo una lavadora o solo una secadora, para combinar con la máquina que ya tiene.",
          whatItIs: [
            "Si una de sus máquinas todavía funciona, no necesita un juego completo. Alquile la que le falta, por la mitad del precio de un juego.",
            "Díganos cómo es la otra máquina (carga frontal o superior, y su ancho) y buscamos una que quede bien a su lado.",
          ],
          fits: [
            "Su lavadora se dañó pero la secadora todavía funciona, o al revés",
            "Se mudó a un lugar que tiene solo una máquina",
            "Quiere una lavadora ahora y una secadora después",
          ],
          size: "La mayoría de las máquinas de tamaño completo miden unas 27 pulgadas (69 cm) de ancho; las compactas, unas 24 pulgadas (61 cm). Si alquila una secadora para apilarla sobre su lavadora, díganos la marca y el modelo de la lavadora para verificar que se puedan apilar.",
        },
      },
    },
    photoCaption: "Ejemplo de este tipo. Su máquina puede ser de otra marca.",
    drawingAlt: "Dibujo: {alt}",
    drawingTag: "Dibujo",
    seeDetails: "Ver detalles",
    drawingCaption: "Un dibujo de este tipo, no una foto. La marca y el modelo dependen de lo que haya disponible.",
    galleryLabel: "Fotos de este tipo",
    galleryShow: "Mostrar la foto {index} de {count}",
    galleryCounter: "{index} / {count}",
    view: {
      label: "Mostrar las máquinas como",
      photos: "Fotos",
      drawings: "Dibujos",
    },
    showcase: {
      title: "Encuentre el tipo que cabe en su espacio",
      lead: "Díganos el tamaño de su clóset y el tipo de tomacorriente. Buscamos una máquina que quepa, la revisamos, la entregamos y la conectamos.",
      photosNote: "Las fotos son ejemplos de cada tipo, no nuestras máquinas. ",
      drawingsNote: "Los dibujos muestran el tipo, no una máquina específica. ",
      availabilityNote: "La marca y el modelo dependen de lo que haya disponible.",
    },
    animation: {
      label: "Tipos de máquinas que alquilamos",
      show: "Mostrar: {title}",
      pause: "Pausar la presentación de máquinas",
      play: "Reproducir la presentación de máquinas",
      widths: {
        "laundry-centre": "24″ o 27″ de ancho",
        "side-by-side-top-load": "Unas 55″ de ancho el par",
        "single-machine": "24″ o 27″ de ancho",
        "side-by-side-front-load": "Unas 55″ de ancho el par",
        stackable: "24″ o 27″ de ancho",
      },
    },
    index: {
      eyebrow: "Cinco tipos, dos precios",
      title: "Tipos de lavadoras y secadoras que alquilamos",
      lead: "Cualquier juego de lavadora y secadora cuesta {setPrice} por semana. Una sola máquina cuesta {singlePrice} por semana. Todos los tipos incluyen reparaciones y el retiro de la máquina vieja.",
      compareTitle: "Compare los tipos",
      compareLead:
        "Los anchos son típicos; el tamaño exacto depende de la máquina que tengamos para usted. Díganos sus medidas y las revisamos primero.",
      columns: {
        type: "Tipo",
        width: "Ancho",
        loads: "La lavadora se carga por",
        goodFor: "Ideal para",
        price: "Precio",
      },
      hookupsTitle: "Lo que necesita en su espacio",
      guidesTitle: "Antes de elegir",
      guides: {
        measure: "Cómo medir su espacio de lavandería",
        stackableVsCentre: "¿Par apilable o centro de lavado?",
        outlet: "¿Tomacorriente de secadora de 3 o de 4 clavijas?",
      },
      ctaTitle: "¿No sabe qué tipo le cabe?",
      ctaText: "Envíe una foto del espacio al {phoneSpan} y le decimos qué máquina cabe.",
    },
    page: {
      measureTip: "Mida el ancho, la altura y la profundidad de su espacio, y las puertas por donde pasará la máquina.",
      summaryTitle: "Precio y qué incluye",
      forSet: "Por el juego de lavadora y secadora.",
      forSingle: "Por una máquina: una lavadora o una secadora.",
      included: [
        "Entrega e instalación cotizadas antes de que usted pague",
        "Reparaciones incluidas",
        "Nos llevamos su máquina vieja sin costo",
        "Sin verificación de crédito",
      ],
      terms: "Depósito reembolsable de {deposit}. Mínimo {minWeeks} semanas, después semana a semana.",
      needOne: "¿Necesita solo una máquina? {singlePrice} por semana.",
      needBoth: "¿Necesita las dos? Un juego de lavadora y secadora cuesta {setPrice} por semana.",
      specsTitle: "Medidas y conexiones",
      specsLead:
        "Medidas típicas. El tamaño exacto depende de la máquina que tengamos para usted, así que primero revisamos sus medidas.",
      specsCaption: "Medidas y conexiones típicas: {title}",
      loadsFrom: "La lavadora se carga por",
      goodFor: "Ideal para",
      hookupsNeeded: "Conexiones necesarias",
      fitTitle: "¿No sabe si cabe?",
      fitText: "Envíe una foto del espacio al {phoneLink} y lo revisamos.",
      whatItIs: "Qué es",
      size: "Tamaño",
      whoItFits: "Para quién es",
      otherTypes: "Otros tipos de máquinas",
      whereWeDeliver: "Dónde entregamos",
      ctaTitle: "{title}: {price} por semana",
      ctaText: "Entrega e instalación cotizadas antes de que usted pague. Reparaciones incluidas mientras alquila.",
    },
  },

  home: {
    heroSlides: {
      label: "Destacados",
      repairs: {
        eyebrow: "Reparaciones incluidas",
        title: "Si se daña, la reparamos",
        text: "Reparaciones, o una máquina de reemplazo, sin costo mientras dure el alquiler.",
        cta: "Cómo funcionan las reparaciones",
      },
      buildings: {
        eyebrow: "Para edificios",
        title: "Máquinas para la lavandería de su edificio",
        text: "Ponemos, instalamos y reparamos las máquinas. Cotización por edificio después de ver la lavandería.",
        cta: "Lavanderías",
      },
    },
    included: {
      title: "Qué incluye",
      items: [
        {
          title: "Entrega e instalación",
          text: "Conectamos el agua, el desagüe, la electricidad y la ventilación, y hacemos un ciclo de prueba antes de irnos.",
        },
        {
          title: "Reparaciones incluidas",
          text: "Si una máquina deja de funcionar, la reparamos o la reemplazamos sin costo.",
        },
        {
          title: "Retiro de la máquina vieja",
          text: "Nos llevamos su máquina vieja sin costo.",
        },
      ],
    },
    rooms: {
      title: "Una máquina para cada tipo de espacio",
      lead: "Clósets, condominios, sótanos y lavanderías: fotos de ejemplo de los espacios donde caben nuestros tipos de máquina.",
      captions: {
        "rooms/stacked-small-room": "Un juego apilable en un cuarto angosto",
        "rooms/washer-shelves": "Una lavadora entre los estantes",
        "rooms/dark-set-laundry-room": "Un juego de carga frontal bajo una repisa",
        "rooms/laundry-room-shirts": "Una lavadora en un cuarto de lavado compartido",
        "rooms/grey-set-laundry-room": "Un juego de carga frontal con mesa para doblar",
        "rooms/washer-cabinet-plants": "Una lavadora bajo el mesón de la cocina",
        "rooms/washer-dryer-shelving": "Una lavadora con estantes arriba",
        "rooms/black-washer-basket": "Una sola lavadora en un rincón",
        "rooms/washer-basket-sock": "Una lavadora lista para la próxima carga",
      },
    },
    hero: {
      eyebrow: "Hablamos español",
      title: "Alquiler de lavadora y secadora en Toronto y el GTA",
      priceSummary: "{setPrice} por semana el juego, o {singlePrice} por semana una sola máquina.",
      aWeek: "por semana",
      forTheSet: "por el juego",
      orSingle: "o {price} por una máquina",
      singlePrice: "{singlePrice} por semana",
      photoCaption: "Foto de ejemplo",
      photoAlt: "Una lavadora y una secadora blancas de carga frontal, lado a lado, en un cuarto de lavado luminoso",
    },
    trust: {
      label: "Por qué alquilar con nosotros",
      repairs: "Reparaciones incluidas",
      noCreditCheck: "Sin verificación de crédito",
      sameWeek: "Entrega la misma semana",
      local: "Negocio local de Toronto",
    },
    how: {
      steps: [
        "Díganos qué cabe",
        "Reciba una cotización",
        "Entregamos y conectamos",
        "Reparaciones por nuestra cuenta",
      ],
    },
    prices: {
      title: "Precios",
      perWeek: "por semana",
      forSet: "juego de lavadora y secadora",
      orSingle: "o {price} por semana por una máquina",
      checks: [
        "Reparaciones incluidas",
        "Retiro de la máquina vieja incluido",
        "No se cobra HST",
      ],
      details: "Depósito, plazo mínimo y pago",
    },
    landlordsTeaser: {
      title: "¿Propietario o edificio?",
      text: "Máquinas para sus unidades o para la lavandería de su edificio. Reparaciones incluidas.",
      link: "Lavandería para propietarios",
      buildingsLink: "Lavanderías",
    },
    about: {
      title: "Quiénes somos",
      facts: [
        "Negocio local de Toronto",
        "Más de {experienceYears} años reparando lavadoras y secadoras",
        "Hablamos {languages}",
      ],
      more: "Más sobre nosotros",
    },
    serviceArea: {
      title: "Zona de servicio",
      allAreas: "Todas las zonas donde entregamos",
      mapLabel: "Mapa de las zonas donde entregamos",
      lake: "Lago Ontario",
    },
    faq: {
      title: "Preguntas frecuentes",
      another: "¿Otra pregunta? Llame o escriba al {phoneLink}.",
      all: "Todas las preguntas y respuestas",
    },
    cta: {
      title: "Una lavadora y una secadora por {setPrice} por semana",
      text: "Reparaciones incluidas. No se cobra HST.",
    },
    startRental: {
      title: "Empezar el alquiler",
      stepsTitle: "Tres pasos cortos",
      steps: [
        "Tipo de máquina",
        "Su espacio",
        "Cómo contactarle",
      ],
      nothingToPay: "No paga nada ahora. Primero le confirmamos la máquina, el total y la fecha de inicio.",
    },
  },

  areas: {
    cities: {
      toronto: {
        name: "Toronto",
        teaser: "Toda la ciudad: el centro, midtown, el este y el oeste, y los cinco distritos.",
        metaTitle: "Lavadora y secadora en alquiler, Toronto | {setPrice}/semana",
        metaDescription:
          "Alquiler de lavadora y secadora en Toronto, North York, Etobicoke, Scarborough, East York y York: {setPrice} por semana el juego, {singlePrice} una máquina.",
        intro:
          "Alquilamos lavadoras y secadoras en toda la ciudad de Toronto, incluidos North York, Etobicoke, Scarborough, East York y York.",
        neighbourhoods: ["North York", "Etobicoke", "Scarborough", "East York", "York"],
        homes: [
          "Mucha gente en Toronto vive en condominios y apartamentos. Los clósets de lavandería de los condominios suelen ser angostos, así que lo común es un par apilable de 24 pulgadas o un centro de lavado de una pieza.",
          "La mayoría de los edificios de condominios piden reservar el ascensor de servicio para una entrega. Reserve un horario con su edificio y díganos la hora.",
          "Las casas con cuarto de lavado en el sótano suelen tener espacio para un par lado a lado.",
        ],
        checklist: [
          "Ancho, profundidad y altura del clóset, y el ancho de su puerta",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
          "Reserva del ascensor de servicio, si vive en un condominio",
          "Una foto del espacio, enviada por mensaje de texto",
        ],
      },
      mississauga: {
        name: "Mississauga",
        teaser: "Condominios cerca de City Centre y del lago; casas y townhouses en el resto.",
        metaTitle: "Lavadora y secadora en alquiler, Mississauga | {setPrice}/sem.",
        metaDescription:
          "Alquiler de lavadora y secadora en Mississauga: {setPrice} por semana el juego, {singlePrice} una máquina. Incluye reparaciones y retiro. Sin crédito.",
        intro:
          "Alquilamos lavadoras y secadoras en todo Mississauga, de Port Credit a Meadowvale y de Malton a Erin Mills.",
        neighbourhoods: [
          "City Centre",
          "Port Credit",
          "Cooksville",
          "Streetsville",
          "Meadowvale",
          "Erin Mills",
          "Churchill Meadows",
          "Malton",
        ],
        homes: [
          "Mississauga combina torres de condominios, alrededor de City Centre y junto al lago, con casas y townhouses en barrios como Meadowvale, Erin Mills y Churchill Meadows.",
          "En un condominio, considere un par apilable o un centro de lavado de una pieza. En el cuarto de lavado de una casa o townhouse, muchas veces cabe un par lado a lado.",
        ],
        checklist: [
          "Dónde está la lavandería: clóset, cuarto de lavado o sótano",
          "El ancho del espacio y de las puertas por donde se entra",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
          "Escaleras o ascensor el día de la entrega",
        ],
      },
      brampton: {
        name: "Brampton",
        teaser: "Sobre todo casas y townhouses, con la lavandería en el sótano o en la planta baja.",
        metaTitle: "Lavadora y secadora en alquiler, Brampton | {setPrice}/semana",
        metaDescription:
          "Alquiler de lavadora y secadora en Brampton: {setPrice} por semana el juego, {singlePrice} una máquina. Reparaciones incluidas. Llame al {phone}.",
        intro:
          "Alquilamos lavadoras y secadoras en todo Brampton, incluidos Bramalea, Springdale, Heart Lake, Mount Pleasant y Castlemore.",
        neighbourhoods: [
          "Bramalea",
          "Springdale",
          "Heart Lake",
          "Mount Pleasant",
          "Fletcher's Meadow",
          "Sandalwood",
          "Castlemore",
        ],
        homes: [
          "La mayoría de las viviendas en Brampton son casas independientes, casas pareadas y townhouses. La lavandería suele estar en el sótano o en la planta baja, donde normalmente cabe un par lado a lado de tamaño completo.",
          "¿Alquila un apartamento en un sótano? Pregunte a su propietario qué tomas de agua, desagüe y electricidad puede usar. Envíenos una foto y le decimos qué cabe.",
        ],
        checklist: [
          "Qué conexiones puede usar, si alquila un apartamento en un sótano",
          "Las escaleras hacia la lavandería: cuántas y qué tan anchas",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
          "Si necesita un juego o solo una máquina",
        ],
      },
      vaughan: {
        name: "Vaughan",
        teaser: "Woodbridge, Maple, Concord y Kleinburg, más condominios nuevos cerca de Vaughan Metropolitan Centre.",
        metaTitle: "Lavadora y secadora en alquiler, Vaughan | {setPrice}/semana",
        metaDescription:
          "Alquiler de lavadora y secadora en Vaughan, Woodbridge, Maple y Concord: {setPrice} por semana el juego, {singlePrice} una máquina. Reparaciones incluidas.",
        intro:
          "Alquilamos lavadoras y secadoras en todo Vaughan, incluidos Woodbridge, Maple, Concord, Kleinburg y el lado de Thornhill que pertenece a Vaughan.",
        neighbourhoods: [
          "Woodbridge",
          "Maple",
          "Concord",
          "Kleinburg",
          "Vellore Village",
          "Thornhill (lado de Vaughan)",
          "Vaughan Metropolitan Centre",
        ],
        homes: [
          "Gran parte de Vaughan son casas con cuarto de lavado completo, donde cabe bien un par lado a lado, de carga frontal o superior.",
          "También hay torres de condominios nuevas, sobre todo cerca de Vaughan Metropolitan Centre. Los clósets de los condominios nuevos suelen estar hechos para un par apilable de 24 pulgadas o una unidad de una pieza.",
        ],
        checklist: [
          "Carga frontal o superior: ¿cuál prefiere?",
          "El ancho del espacio y lugar para abrir las puertas o la tapa",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
          "Reserva del ascensor, si vive en un condominio",
        ],
      },
      markham: {
        name: "Markham",
        teaser: "Townhouses y casas en Unionville y Cornell, condominios a lo largo de Highway 7.",
        metaTitle: "Lavadora y secadora en alquiler, Markham | {setPrice}/semana",
        metaDescription:
          "Alquiler de lavadora y secadora en Markham y Unionville: {setPrice} por semana el juego, {singlePrice} una máquina. Incluye reparaciones y retiro.",
        intro:
          "Alquilamos lavadoras y secadoras en todo Markham, incluidos Unionville, Markham Village, Cornell, Milliken y Berczy Village.",
        neighbourhoods: [
          "Unionville",
          "Markham Village",
          "Cornell",
          "Milliken",
          "Berczy Village",
          "Cathedraltown",
          "Thornhill (lado de Markham)",
        ],
        homes: [
          "Markham tiene muchos townhouses y stacked townhouses, además de condominios cerca de Downtown Markham y Highway 7.",
          "En un townhouse, la lavandería suele estar en un clóset del piso de arriba o en el sótano. Las escaleras cambian la entrega, así que díganos cuántos tramos hay y qué tan cerradas son las vueltas.",
        ],
        checklist: [
          "En qué piso está la lavandería y cuántos tramos de escalera hay",
          "Ancho y altura del clóset",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
          "Una foto del espacio y de las escaleras",
        ],
      },
      "richmond-hill": {
        name: "Richmond Hill",
        teaser: "Casas de Oak Ridges a Langstaff, torres de condominios sobre Yonge Street.",
        metaTitle: "Lavadora y secadora, Richmond Hill | {setPrice}/semana",
        metaDescription:
          "Alquiler de lavadora y secadora en Richmond Hill y Oak Ridges: {setPrice}/semana el juego, {singlePrice} una máquina. Reparaciones incluidas. Llame al {phone}.",
        intro:
          "Alquilamos lavadoras y secadoras en todo Richmond Hill, incluidos Oak Ridges, Mill Pond, Bayview Hill, Richvale y Jefferson.",
        neighbourhoods: ["Oak Ridges", "Mill Pond", "Bayview Hill", "Richvale", "Jefferson", "Langstaff", "Elgin Mills"],
        homes: [
          "En Richmond Hill hay desde casas independientes con cuarto de lavado en el sótano hasta torres de condominios sobre Yonge Street y cerca de Highway 7.",
          "En una casa, normalmente cabe un par lado a lado. En el clóset de un condominio, considere un par apilable o un centro de lavado de una pieza.",
        ],
        checklist: [
          "Casa o condominio, y dónde está la lavandería",
          "El ancho del espacio",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
          "La máquina vieja que quiere que nos llevemos, si hay una",
        ],
      },
    },
    districts: {
      "north-york": {
        name: "North York",
        metaTitle: "Lavadora y secadora en alquiler, North York | {setPrice}/sem.",
        metaDescription:
          "Alquile lavadora y secadora en North York, de Willowdale y Don Mills a Downsview: {setPrice} por semana el juego, {singlePrice} una máquina.",
        teaser: "Torres de condominios sobre Yonge Street, casas con lavandería en el sótano en las calles laterales.",
        intro:
          "Alquilamos lavadoras y secadoras en todo North York, de Willowdale y Bayview Village a Don Mills, Downsview y Bathurst Manor.",
        neighbourhoods: [
          "Willowdale",
          "Bayview Village",
          "York Mills",
          "Don Mills",
          "Parkwoods",
          "Flemingdon Park",
          "Downsview",
          "Lawrence Heights",
          "Bathurst Manor",
          "Newtonbrook",
        ],
        homes: [
          "North York tiene dos tipos de espacio de lavandería. Sobre Yonge Street, sobre todo cerca de North York Centre y Sheppard Avenue, mucha gente vive en torres de condominios, donde la lavandería es un clóset dentro de la unidad. Lejos de las calles principales, muchas viviendas son casas con la lavandería en el sótano.",
          "También hay muchos edificios de apartamentos en alquiler más antiguos. Algunos tienen una lavandería compartida y no tienen conexiones para lavadora ni secadora en las unidades, así que consulte con su propietario antes de reservar.",
        ],
        fits: {
          stackable: "Clósets de condominio angostos y altos cerca de Yonge Street y Sheppard Avenue.",
          "laundry-centre": "Clósets de condominio hechos para una unidad de una pieza.",
          "side-by-side-top-load": "Zonas de lavado en el sótano de las casas.",
          "single-machine": "Cuando una de sus máquinas todavía funciona.",
        },
        checklist: [
          "Condominio: ancho, profundidad y altura del clóset, y la reserva del ascensor de servicio",
          "Casa: las escaleras del sótano y las puertas en el camino",
          "Apartamento: si su unidad tiene sus propias conexiones",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
        ],
      },
      etobicoke: {
        name: "Etobicoke",
        metaTitle: "Lavadora y secadora en alquiler, Etobicoke | {setPrice}/semana",
        metaDescription:
          "Alquile lavadora y secadora en Etobicoke, de Humber Bay Shores y Mimico a Rexdale: {setPrice} por semana el juego, {singlePrice} una máquina.",
        teaser: "Condominios junto al lago, casas con cuarto de lavado en el sótano y edificios de apartamentos.",
        intro:
          "Alquilamos lavadoras y secadoras en todo Etobicoke, desde el lago en Humber Bay Shores, Mimico y Long Branch hasta Islington Village y Rexdale.",
        neighbourhoods: [
          "Humber Bay Shores",
          "Mimico",
          "New Toronto",
          "Long Branch",
          "Alderwood",
          "The Kingsway",
          "Islington Village",
          "Markland Wood",
          "Rexdale",
          "Thistletown",
        ],
        homes: [
          "Muchas de las torres de condominios de Etobicoke están junto al lago en Humber Bay Shores o cerca de las estaciones de metro Islington y Kipling. En esas unidades, la lavandería suele ser un clóset angosto.",
          "Gran parte del resto de Etobicoke son casas, desde bungalows hasta casas de dos pisos, junto con edificios de apartamentos bajos y altos. En una casa, la lavandería suele estar en el sótano, donde normalmente cabe un par lado a lado de tamaño completo.",
        ],
        fits: {
          stackable: "Clósets de condominio junto al lago y cerca del metro.",
          "side-by-side-front-load": "Cuartos de lavado en el sótano con espacio para abrir ambas puertas.",
          "side-by-side-top-load": "Sótanos con espacio libre sobre la lavadora para la tapa.",
          "single-machine": "Combinar con una lavadora o secadora que ya tiene.",
        },
        checklist: [
          "Condominio: ancho y altura del clóset, y la reserva del ascensor de servicio",
          "Casa: las escaleras del sótano y la vuelta al final",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
          "Dónde está la máquina vieja, si quiere que nos la llevemos",
        ],
      },
      scarborough: {
        name: "Scarborough",
        metaTitle: "Lavadora y secadora, Scarborough, Toronto | {setPrice}/semana",
        metaDescription:
          "Alquile lavadora y secadora en Scarborough, de Agincourt y Malvern a Guildwood: {setPrice} por semana el juego, {singlePrice} una máquina. Sin crédito.",
        teaser: "Sobre todo casas y townhouses, además de torres de apartamentos y condominios nuevos.",
        intro:
          "Alquilamos lavadoras y secadoras en todo Scarborough, incluidos Agincourt, Malvern, Wexford, Guildwood, Birch Cliff y West Hill.",
        neighbourhoods: [
          "Agincourt",
          "L'Amoreaux",
          "Malvern",
          "Wexford",
          "Bendale",
          "Birch Cliff",
          "Cliffside",
          "Guildwood",
          "West Hill",
          "Highland Creek",
        ],
        homes: [
          "Gran parte de Scarborough son casas independientes, casas pareadas y townhouses. La lavandería suele estar en el sótano o en un cuarto pequeño de la planta baja, y muchas veces cabe un par lado a lado de tamaño completo.",
          "Scarborough también tiene muchas torres de apartamentos y algunos condominios nuevos, incluso cerca de Scarborough Town Centre. Algunas casas tienen un apartamento en el sótano: si alquila uno, pregunte a su propietario qué tomas de agua, desagüe y electricidad puede usar.",
        ],
        fits: {
          "side-by-side-top-load": "Cuartos de lavado en el sótano o en la planta baja de las casas.",
          "side-by-side-front-load": "Hogares grandes que lavan ropa de cama y toallas seguido.",
          "laundry-centre": "Apartamentos y condominios con un clóset de lavandería pequeño.",
          "single-machine": "Cuando la casa ya tiene una de las dos máquinas.",
        },
        checklist: [
          "Qué conexiones puede usar, si alquila parte de una casa",
          "Las escaleras: cuántas, qué tan anchas y si hay vueltas cerradas",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
          "Si necesita un juego o solo una máquina",
        ],
      },
      "east-york": {
        name: "East York",
        metaTitle: "Lavadora y secadora en alquiler, East York | {setPrice}/semana",
        metaDescription:
          "Alquile lavadora y secadora en East York, Leaside y Thorncliffe Park: {setPrice} por semana el juego, {singlePrice} una máquina. Incluye reparaciones.",
        teaser: "Calles de casas en Leaside y Pape Village, torres de apartamentos en Thorncliffe Park.",
        intro:
          "Alquilamos lavadoras y secadoras en todo East York, incluidos Leaside, Thorncliffe Park, Pape Village, Woodbine Heights y Crescent Town.",
        neighbourhoods: [
          "Leaside",
          "Thorncliffe Park",
          "Broadview North",
          "Pape Village",
          "Woodbine Heights",
          "O'Connor–Parkview",
          "Topham Park",
          "Crescent Town",
        ],
        homes: [
          "East York combina calles tranquilas de casas independientes y pareadas, en zonas como Leaside y Pape Village, con torres de apartamentos en Thorncliffe Park y Crescent Town.",
          "En una casa antigua, las escaleras del sótano pueden ser angostas y empinadas, así que mídalas junto con el espacio de lavandería. En un apartamento, verifique primero que su unidad tenga conexiones para lavadora y secadora.",
        ],
        fits: {
          "side-by-side-top-load": "Zonas de lavado en el sótano de las casas.",
          stackable: "Sótanos estrechos donde no caben dos máquinas lado a lado.",
          "laundry-centre": "Apartamentos con clóset de lavandería.",
          "single-machine": "Reemplazar una máquina de un par viejo.",
        },
        checklist: [
          "Las escaleras del sótano: su ancho y si hay vueltas",
          "El espacio de lavandería: ancho, profundidad y altura",
          "Apartamento: si su unidad tiene tomas de agua, desagüe y electricidad",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
        ],
      },
      york: {
        name: "York",
        metaTitle: "Lavadora y secadora en alquiler, York, Toronto | {setPrice}/sem.",
        metaDescription:
          "Alquile lavadora y secadora en York, Toronto, incluidos Weston y Mount Dennis: {setPrice} por semana el juego, {singlePrice} una máquina.",
        teaser: "Casas antiguas con sótano y edificios de apartamentos sobre las calles principales.",
        intro:
          "Alquilamos lavadoras y secadoras en todo York, la antigua ciudad de York al noroeste del centro de Toronto, incluidos Weston, Mount Dennis, Fairbank y Oakwood Village.",
        neighbourhoods: [
          "Weston",
          "Mount Dennis",
          "Silverthorn",
          "Keelesdale",
          "Rockcliffe–Smythe",
          "Fairbank",
          "Oakwood Village",
          "Humewood–Cedarvale",
        ],
        homes: [
          "Gran parte de York son casas independientes y pareadas antiguas, muchas con zona de lavado en el sótano, además de edificios de apartamentos sobre calles principales como Weston Road y Eglinton Avenue West.",
          "Algunas casas aquí están divididas en unidades separadas. Si alquila una, pregunte a su propietario qué conexiones puede usar y si la secadora puede ventilar hacia afuera.",
        ],
        fits: {
          "side-by-side-front-load": "Cuartos de lavado en el sótano de las casas.",
          "side-by-side-top-load": "Quien prefiere no agacharse para cargar la lavadora.",
          stackable: "Espacios angostos en una unidad que es parte de una casa.",
          "single-machine": "Combinar con la máquina que ya está en el sótano.",
        },
        checklist: [
          "Las escaleras y puertas del sótano: qué tan anchas son",
          "Qué conexiones puede usar, si la casa está dividida en unidades",
          "Tomacorriente de la secadora: 3 o 4 clavijas",
          "Una foto del espacio, enviada por mensaje de texto",
        ],
      },
    },
    index: {
      eyebrow: "Toronto y el GTA",
      title: "Dónde entregamos",
      checkTitle: "¿Entregamos en su zona?",
      lead: "Entregamos lavadoras y secadoras en alquiler en todo Toronto y en cinco ciudades a su alrededor. Escriba su código postal para verificar, o busque su zona abajo.",
      samePrice: "El mismo precio en todas las zonas: {setPrice} por semana el juego, {singlePrice} una máquina.",
      fartherText: "¿Vive más lejos? Envíenos su dirección por mensaje y le decimos.",
      torontoTitle: "Toronto",
      torontoLead:
        "Toda la ciudad de Toronto. North York, Etobicoke, Scarborough, East York y York tienen cada uno su propia página.",
      wholeCity: "Toda la ciudad",
      district: "Distrito de Toronto",
      aroundTitle: "Alrededor de Toronto",
      aroundLead: "Al oeste, la región de Peel; al norte, la región de York.",
    },
    page: {
      mapLabel: "{place} en el mapa de las zonas donde entregamos",
      aboutHomes: "Las viviendas en {place}",
      cityEyebrow: "{place} · {company}",
      districtEyebrow: "{place} · Toronto",
      title: "Alquiler de lavadora y secadora en {place}",
      priceLabel: "por semana un juego de lavadora y secadora",
      otherPrice: "o {singlePrice} por semana una sola máquina",
      otherAreasLabel: "Otras zonas",
      torontoDistricts: "Distritos de Toronto",
      otherAreas: "Otras zonas donde damos servicio",
      otherToronto: "Otras partes de Toronto",
      aroundToronto: "Alrededor de Toronto",
      allOfToronto: "Todo Toronto",
      ctaTitle: "¿Listo para alquilar en {place}?",
      fitsTitle: "Máquinas que suelen caber en {place}",
      yorkNote: "Esta página es sobre York en Toronto. ¿Busca la región de York? Vea {cities}.",
      listAnd: " y ",
      listComma: ", ",
      localTitle: "La lavandería en las viviendas de {place}",
      localAreas: "Zonas de {place} donde entregamos",
      beforeYouCall: "Antes de llamar, revise",
      notSure: "¿No está seguro? Envíe una foto al {phoneLink} y le decimos qué cabe.",
      deliveryTitle: "¿Entregamos en su zona?",
      deliveryLead:
        "Escriba su código postal. Si con el código no podemos saberlo, envíenos su dirección por mensaje y le confirmamos.",
    },
    districtsLabel: "Distritos de Toronto",
  },

  faq: {
    groups: {
      renting: "El alquiler",
      "prices-and-payment": "Precios y pago",
      "delivery-and-installation": "Entrega e instalación",
      repairs: "Reparaciones",
      "for-landlords": "Propietarios",
      "first-week-free-offer": "Primera semana gratis",
    },
    items: {
      "minimum-term": {
        question: "¿Cuánto dura el alquiler?",
        answer:
          "Mínimo {minWeeks} semanas. Después continúa semana a semana, y cualquiera de las partes puede terminarlo con {noticeDays} días de aviso. Nosotros recogemos la máquina.",
      },
      ending: {
        question: "¿Cómo termino mi alquiler?",
        answer:
          "Envíenos un mensaje al {phone}. Después del mínimo de {minWeeks} semanas, cualquiera de las partes puede terminar el alquiler con {noticeDays} días de aviso, y nosotros pasamos a recoger la máquina.",
      },
      "machine-types": {
        question: "¿Qué máquinas puedo alquilar?",
        answer:
          "Un par apilable, un centro de lavado de una pieza, un par lado a lado (carga frontal o superior), o una sola máquina: una lavadora o una secadora.",
        link: "Comparar los tipos de máquinas",
      },
      "new-machines": {
        question: "¿Las máquinas son nuevas?",
        answer: "No. Son máquinas usadas en buen estado de funcionamiento. Revisamos cada una antes de que salga.",
      },
      brands: {
        question: "¿Qué marcas tienen?",
        answer:
          "La que quepa en su espacio y esté disponible: GE, Whirlpool, Samsung, LG, Frigidaire, Maytag, Kenmore y otras.",
      },
      "credit-check": {
        question: "¿Verifican el crédito?",
        answer: "No. No hay verificación de crédito.",
      },
      "other-appliances": {
        question: "¿Alquilan otros electrodomésticos o venden máquinas?",
        answer: "No. Solo alquilamos lavadoras y secadoras.",
      },
      languages: {
        question: "¿Qué idiomas hablan?",
        answer: "Inglés, español y ruso.",
      },
      price: {
        question: "¿Cuánto cuesta?",
        answer:
          "{setPrice} por semana un juego de lavadora y secadora, o {singlePrice} por semana una sola máquina, en dólares canadienses. La renta se cobra cada semana el mismo día.",
      },
      tax: {
        question: "¿Los precios incluyen impuestos?",
        answer: "No cobramos HST. El precio semanal es lo que usted paga.",
      },
      deposit: {
        question: "¿Hay que dejar un depósito?",
        answer: "Sí, {deposit}. Se le devuelve cuando la máquina regresa funcionando.",
      },
      payment: {
        question: "¿Cómo pago?",
        answer:
          "Por Interac e-Transfer o con tarjeta de crédito. Para pagar con tarjeta, use el enlace de pago que enviamos con su cotización.",
      },
      referral: {
        question: "¿Tienen alguna oferta por recomendar?",
        answer: "Sí. {referralText}",
      },
      "space-needs": {
        question: "¿Qué necesito en mi espacio de lavandería?",
        answer:
          "Tomas de agua (caliente y fría), un desagüe y el tomacorriente adecuado. La mayoría de las secadoras eléctricas necesitan un tomacorriente de 240V, de 3 o 4 clavijas. Una secadora con ventilación también necesita un ducto de salida al exterior. Envíenos una foto y lo revisamos.",
        link: "Cómo medir su espacio de lavandería",
      },
      "delivery-cost": {
        question: "¿Cuánto cuestan la entrega y la instalación?",
        answer:
          "Se lo cotizamos antes de que pague. Depende de la distancia, el piso, las escaleras o el ascensor, y las conexiones.",
      },
      "delivery-time": {
        question: "¿Qué tan pronto pueden entregar?",
        answer: "Normalmente la misma semana. Confirmamos la fecha cuando enviamos la cotización.",
      },
      installation: {
        question: "¿Qué incluye la instalación?",
        answer: "Revisamos el espacio y conectamos la secadora a su propio tomacorriente de 240 voltios (de 3 o 4 clavijas). Instalamos un ducto de ventilación metálico de 4 pulgadas hacia afuera, con abrazaderas en ambos extremos y sin dobleces: un ducto aplastado es un riesgo de incendio. Conectamos el agua caliente y fría y el desagüe, nivelamos la máquina y hacemos un ciclo de prueba antes de irnos.",
      },
      condo: {
        question: "¿Pueden entregar en un condominio?",
        answer:
          "Sí. Díganos el tamaño del clóset y si el edificio tiene ascensor de servicio, y planeamos la entrega.",
        link: "Lista para la lavandería de un condominio",
      },
      "haul-away": {
        question: "¿Se llevan mi máquina vieja?",
        answer: "Sí, sin costo, cuando entregamos la nuestra.",
      },
      areas: {
        question: "¿Dónde entregan?",
        answer:
          "En Toronto, incluidos North York, Etobicoke, Scarborough, East York y York, además de Mississauga, Brampton, Vaughan, Markham y Richmond Hill. ¿Vive más lejos? Pregúntenos.",
        link: "Verifique su código postal",
      },
      breaks: {
        question: "¿Y si la máquina se daña?",
        answer: "Llámenos o escríbanos. Organizamos la reparación o una máquina de reemplazo sin costo.",
      },
      "repair-request": {
        question: "¿Cómo pido una reparación?",
        answer:
          "Llame o escriba al {phone}, o envíe el formulario de reparación con su dirección y lo que pasa. Las reparaciones están incluidas mientras alquila.",
        link: "Pedir una reparación",
      },
      damage: {
        question: "¿Todas las reparaciones están incluidas?",
        answer:
          "Las reparaciones por uso normal están incluidas. Los daños más allá del desgaste normal son responsabilidad de quien alquila.",
      },
      "landlord-options": {
        question: "¿Cómo trabajan con los propietarios?",
        answer:
          "De dos formas. Sus inquilinos nos alquilan directamente: usted no paga nada, solo permite la instalación. O usted alquila las máquinas para sus unidades: el precio de lista es {setPrice} por semana por juego, y con {quoteUnits} o más unidades cotizamos por edificio después de verlo. En ambos casos, las reparaciones están incluidas.",
        link: "Lavadoras y secadoras para propietarios",
      },
      "landlord-quote": {
        question: "¿Cómo pide una cotización un propietario?",
        answer:
          "Envíe el formulario de cotización para propietarios con la dirección, el número de unidades y lo que hay ahora, o llame o escriba al {phone}.",
        link: "Formulario de cotización para propietarios",
      },
      "first-week-free": {
        question: "¿Cómo funciona la primera semana gratis?",
        answer: "{promotionText}",
      },
      "first-week-free-costs": {
        question: "Con la primera semana gratis, ¿qué pago igual?",
        answer:
          "El depósito reembolsable de {deposit} y la entrega. Desde la segunda semana, la renta semanal se cobra normalmente.",
      },
    },
    page: {
      eyebrow: "Preguntas frecuentes",
      title: "Preguntas y respuestas",
      lead: "Alquiler, precios, entrega, reparaciones y propietarios. ¿Otra pregunta? Llame o escriba al {phoneLink}.",
      topics: "Temas",
    },
  },

  landlords: {
    eyebrow: "Para propietarios",
    title: "Lavadoras y secadoras para sus unidades en alquiler",
    lead: "Dos formas de tener lavandería en sus unidades. En ambos casos, instalamos las máquinas, nos llevamos las viejas y las reparaciones están incluidas.",
    option: "Opción {number}",
    options: [
      {
        title: "Sus inquilinos nos alquilan",
        headline: "Usted no paga nada",
        points: [
          "Cada inquilino nos alquila una lavadora y una secadora y nos paga directamente.",
          "Usted no paga nada.",
          "Solo permite la instalación.",
          "Las reparaciones están incluidas mientras el inquilino alquila.",
        ],
      },
      {
        title: "Usted alquila las máquinas para sus unidades",
        headline: "{setPrice} por semana por juego, precio de lista",
        points: [
          "Usted alquila las máquinas e incluye la lavandería con la unidad.",
          "Precio de lista: {setPrice} por semana por juego de lavadora y secadora.",
          "Con {quoteUnits} o más unidades, cotizamos por edificio después de verlo.",
          "Las reparaciones están incluidas mientras alquila.",
        ],
      },
    ],
    optionsTitle: "Dos formas de trabajar con nosotros",
    includedTitle: "Incluido en ambos casos",
    includedLead: "La entrega y la instalación se cotizan por trabajo, antes de que nadie pague.",
    included: [
      "Instalación: conectamos el agua, el desagüe, la electricidad y la ventilación, y hacemos un ciclo de prueba antes de irnos.",
      "Nos llevamos las máquinas viejas sin costo.",
      "Reparaciones, o una máquina de reemplazo, sin costo.",
      "Máquinas usadas, cada una revisada antes de salir.",
    ],
    stepsTitle: "Cómo funciona para un edificio",
    steps: [
      {
        title: "Cuéntenos sobre el edificio",
        text: "La dirección, cuántas unidades y qué hay ahora: sin máquinas, máquinas viejas para reemplazar o solo las conexiones.",
      },
      {
        title: "Vemos el edificio",
        text: "Con {quoteUnits} o más unidades, vemos el edificio antes de cotizar: los espacios de lavandería y las conexiones.",
      },
      {
        title: "Recibe una cotización",
        text: "Si sus inquilinos alquilan directamente, cada uno recibe su propia cotización. Si usted alquila las máquinas, recibe una cotización para el edificio.",
      },
      {
        title: "Instalamos",
        text: "Entregamos, conectamos cada máquina, hacemos un ciclo de prueba y nos llevamos las máquinas viejas.",
      },
      {
        title: "Reparaciones mientras tenga las máquinas",
        text: "Llámenos o escríbanos cuando una máquina necesite reparación. La reparamos o la cambiamos sin costo.",
      },
    ],
    startWithQuote: "Empiece con una cotización",
    unitNeedsTitle: "Lo que necesita cada unidad",
    unitNeedsNote: "Díganos qué tiene cada unidad y le decimos qué cabe.",
    faqTitle: "Preguntas de propietarios",
    faqs: [
      {
        question: "¿Pago algo si mis inquilinos les alquilan a ustedes?",
        answer: "No. El inquilino alquila las máquinas y nos paga. Usted permite la instalación.",
      },
      {
        question: "¿Cuánto cuesta si yo alquilo las máquinas?",
        answer:
          "El precio de lista es {setPrice} por semana por juego de lavadora y secadora. Con {quoteUnits} o más unidades, cotizamos por edificio después de verlo. La entrega y la instalación se cotizan antes de que pague.",
      },
      {
        question: "¿Quién organiza las reparaciones?",
        answer:
          "Llame o escriba al {phone} cuando una máquina necesite reparación. Las reparaciones están incluidas en las dos opciones.",
      },
      {
        question: "¿Y si una unidad no tiene conexiones?",
        answer:
          "Una unidad necesita agua caliente y fría, un desagüe, el tomacorriente adecuado y, para una secadora con ventilación, un ducto de salida al exterior. Díganos qué tiene cada unidad y le decimos qué cabe.",
      },
      {
        question: "¿Mis inquilinos necesitan una verificación de crédito?",
        answer: "No. No hay verificación de crédito.",
      },
      {
        question: "¿Pueden llevarse las máquinas viejas?",
        answer: "Sí. Nos llevamos las máquinas viejas sin costo cuando instalamos las nuestras.",
      },
      {
        question: "¿Qué zonas cubren?",
        answer: "Toronto, Mississauga, Brampton, Vaughan, Markham y Richmond Hill. ¿Más lejos? Pregúntenos.",
      },
    ],
    moreAnswers: "Más respuestas en la {faqLink}.",
    faqLink: "página de preguntas frecuentes",
    ctaTitle: "Pida una cotización para su edificio",
    ctaText: "Díganos la dirección, el número de unidades y lo que hay ahora.",
    buildingsNote: "¿Una lavandería compartida en el edificio? {buildingsLink}.",
    buildingsLink: "Vea las opciones para lavanderías",
    quote: {
      eyebrow: "Para propietarios",
      title: "Pida una cotización para su edificio",
      lead: "Cuéntenos sobre el edificio y las unidades. En las unidades, sus inquilinos pueden alquilarnos directamente o usted puede alquilar las máquinas. Para una lavandería compartida, el edificio alquila las máquinas o los residentes pagan por carga.",
      howOptionsWork: "Cómo funcionan las dos opciones",
      nextTitle: "Qué pasa después",
      next: [
        "Leemos su solicitud y le llamamos o le escribimos.",
        "Con {quoteUnits} o más unidades, acordamos una hora para ver el edificio.",
        "Recibe una cotización antes de que se instale nada.",
      ],
      formTitle: "Su edificio",
      address: "Dirección del edificio o ciudad",
      units: "Número de unidades",
      setup: "Qué hay ahora",
      setupOptions: {
        none: "Sin máquinas",
        replace: "Máquinas viejas para reemplazar",
        hookupsOnly: "Solo las conexiones",
      },
      machineType: "Tipo de máquina",
      notSure: "No estoy seguro",
      differentEachUnit: "Distinto en cada unidad",
      option: "Cómo le gustaría hacerlo",
      optionChoices: {
        tenants: "Mis inquilinos alquilan directamente",
        landlord: "Yo alquilo las máquinas para mis unidades",
        laundryRoomRent: "Lavandería compartida: el edificio alquila las máquinas",
        laundryRoomPerLoad: "Lavandería compartida: los residentes pagan por carga",
        notSure: "Todavía no lo sé",
      },
      notesHint:
        "Por ejemplo: dónde está la lavandería en cada unidad, escaleras o ascensor, un buen momento para ver el edificio.",
      submit: "Enviar solicitud de cotización",
      sent: "Solicitud de cotización enviada.",
      subject: "Solicitud de cotización de propietario — {name}",
      errors: {
        address: "Escriba la dirección o la ciudad.",
        unitsMissing: "Escriba el número de unidades.",
        unitsInvalid: "Escriba un número entero, 1 o más.",
        setup: "Elija qué hay ahora.",
        option: "Elija cómo le gustaría hacerlo.",
      },
    },
  },
  buildings: {
    eyebrow: "Para edificios residenciales",
    title: "Lavadoras y secadoras para la lavandería de su edificio",
    lead: "Para edificios de apartamentos y condominios con una lavandería compartida. Nosotros ponemos las máquinas, las instalamos y las reparamos. Hay dos formas de hacerlo, y cotizamos por edificio después de ver la lavandería.",
    option: "Opción {number}",
    options: [
      {
        title: "El edificio alquila las máquinas",
        headline: "Cotización por edificio",
        points: [
          "El edificio alquila las máquinas para su lavandería.",
          "El edificio decide cómo las usan los residentes.",
          "Cotizamos después de ver la lavandería.",
          "Reparaciones incluidas mientras alquila.",
        ],
      },
      {
        title: "Los residentes pagan por carga",
        headline: "Sin costo para el edificio",
        points: [
          "Ponemos las máquinas sin costo para el edificio.",
          "Los residentes pagan por carga.",
          "El edificio recibe una parte de lo que recaudan las máquinas. Acordamos esa parte antes de instalar.",
          "Reparaciones incluidas.",
        ],
      },
    ],
    optionsTitle: "Dos formas de equipar la lavandería",
    includedTitle: "Incluido en ambos casos",
    includedLead: "La entrega y la instalación van en la cotización, antes de instalar nada.",
    included: [
      "Primero vemos la lavandería y le decimos qué máquinas caben.",
      "Instalación: conectamos el agua, el desagüe, la electricidad y la ventilación, y hacemos un ciclo de prueba antes de irnos.",
      "Retiramos las máquinas viejas sin costo.",
      "Reparaciones, o una máquina de reemplazo, sin costo.",
    ],
    stepsTitle: "Cómo funciona",
    steps: [
      {
        title: "Cuéntenos sobre el edificio",
        text: "La dirección, el número de unidades y lo que hay ahora en la lavandería.",
      },
      {
        title: "Vemos la lavandería",
        text: "Revisamos el espacio, las conexiones y cuántas máquinas caben.",
      },
      {
        title: "Recibe una cotización",
        text: "Para la opción que elija: el edificio alquila las máquinas, o los residentes pagan por carga.",
      },
      {
        title: "Instalamos",
        text: "Entregamos, conectamos cada máquina, hacemos un ciclo de prueba y retiramos las máquinas viejas.",
      },
      {
        title: "Reparaciones mientras las máquinas estén",
        text: "Llámenos o escríbanos cuando una máquina necesite reparación. La reparamos o la reemplazamos sin costo.",
      },
    ],
    startWithQuote: "Empiece con una cotización",
    inSuiteTitle: "¿Prefiere máquinas en cada unidad?",
    inSuiteText: "Si las unidades tienen sus propias conexiones, los inquilinos pueden alquilarnos directamente, o usted puede alquilar máquinas para las unidades.",
    inSuiteLink: "Opciones para propietarios",
    faqTitle: "Preguntas sobre edificios",
    faqs: [
      {
        question: "¿Cuánto cuesta?",
        answer: "Cotizamos por edificio después de ver la lavandería. La entrega y la instalación van en la cotización, antes de instalar nada.",
      },
      {
        question: "¿Cómo funciona la opción de pago por carga?",
        answer: "Ponemos las máquinas sin costo para el edificio, y los residentes pagan por carga. El edificio recibe una parte de lo que recaudan las máquinas. Acordamos esa parte antes de instalar.",
      },
      {
        question: "¿Qué máquinas instalan?",
        answer: "Depende de la lavandería: el espacio, las conexiones y cuántos residentes la usan. Le decimos qué cabe después de verla.",
      },
      {
        question: "¿Quién se encarga de las reparaciones?",
        answer: "Llame o escriba al {phone} cuando una máquina necesite reparación. Las reparaciones están incluidas en ambas opciones.",
      },
      {
        question: "¿Pueden retirar las máquinas viejas?",
        answer: "Sí. Retiramos las máquinas viejas sin costo cuando instalamos las nuestras.",
      },
      {
        question: "¿Qué zonas cubren?",
        answer: "Toronto, Mississauga, Brampton, Vaughan, Markham y Richmond Hill. ¿Más lejos? Pregúntenos.",
      },
    ],
    ctaTitle: "Pida una cotización para su lavandería",
    ctaText: "Díganos la dirección, el número de unidades y lo que hay ahora en la lavandería.",
  },

  about: {
    eyebrow: "Quiénes somos",
    title: "Sobre {company}",
    lead: "{company} es un negocio local de Toronto. Tenemos más de {experienceYears} años de experiencia instalando y reparando lavadoras y secadoras.",
    howWeWork: "Cómo trabajamos",
    whatWeDo: "Qué hacemos",
    whatWeDoItems: [
      "Alquilamos lavadoras y secadoras en Toronto y el GTA: pares apilables, centros de lavado de una pieza, pares lado a lado, o una sola lavadora o secadora.",
      "Solo alquilamos. No vendemos máquinas ni alquilamos otros electrodomésticos.",
      "Las máquinas son usadas, revisadas y en buen estado de funcionamiento. La marca y el modelo dependen de lo que haya disponible.",
      "La renta es {setPrice} por semana por un juego o {singlePrice} por semana por una máquina, con reparaciones y retiro de la máquina vieja incluidos.",
    ],
    readMore: "Más información",
    links: {
      machines: "Tipos de máquinas",
      prices: "Precios",
      areas: "Dónde entregamos",
      landlords: "Para propietarios",
      faq: "Preguntas frecuentes",
    },
    talkTitle: "Hable con nosotros",
    talkText: "{phone}. Lun–Sáb {opens} – {closes}; domingo cerrado.",
    contactPage: "Página de contacto",
  },

  contact: {
    eyebrow: "Llame o envíe un mensaje de texto",
    title: "Contáctenos",
    lead: "Lo más rápido es una llamada o un mensaje de texto. O envíe el formulario de abajo y le respondemos con la máquina, el total y la fecha de inicio.",
    reachLabel: "Cómo contactarnos",
    phoneTitle: "Teléfono y mensajes",
    hours: "Horario",
    languages: "Idiomas",
    weSpeak: "Hablamos {languages}.",
    whereTitle: "Dónde entregamos",
    somethingElse: "¿Otra cosa?",
    other: [
      { title: "Una máquina que alquila necesita reparación", label: "Pedir una reparación" },
      { title: "Es propietario", label: "Cotización para propietarios" },
      { title: "Primero tiene una pregunta", label: "Preguntas y respuestas" },
    ],
  },

  repair: {
    eyebrow: "Para clientes que nos alquilan",
    title: "Pedir una reparación",
    lead: "¿Una máquina que nos alquila no funciona bien? Las reparaciones están incluidas mientras alquila: la reparamos o la cambiamos sin costo.",
    sectionLabel: "Solicitud de reparación",
    fastest: "Lo más rápido: llamar o escribir",
    leakTitle: "¿Hay una fuga de agua?",
    leakText: "Cierre las llaves de agua detrás de la lavadora si puede alcanzarlas sin peligro, y después llámenos.",
    helpsTitle: "Lo que nos ayuda",
    helps: [
      "Qué hace la máquina, o qué no hace",
      "Cualquier código de error en la pantalla",
      "Cuándo empezó",
      "Una foto o un video corto, enviado por mensaje de texto",
    ],
    damageNote:
      "Las reparaciones por uso normal están incluidas. Los daños más allá del desgaste normal son responsabilidad de quien alquila.",
    formTitle: "¿Qué pasa?",
    address: "Dirección o código postal",
    machine: "Máquina",
    machineOptions: {
      washer: "Lavadora",
      dryer: "Secadora",
      stackable: "Par apilable",
      laundryCentre: "Centro de lavado de una pieza",
      notSure: "No estoy seguro",
    },
    bestTime: "Mejor momento para contactarle",
    timeOptions: { any: "Cualquier hora", morning: "Mañana", afternoon: "Tarde", evening: "Noche" },
    problem: "Qué pasa",
    problemHint:
      "Por ejemplo: no enciende, no desagua, tiene fugas, no calienta, un código de error en la pantalla.",
    submit: "Enviar solicitud de reparación",
    sent: "Solicitud de reparación enviada.",
    sentNote: "Le llamaremos o le escribiremos para organizar la reparación.",
    subject: "Solicitud de reparación — {name}",
    errors: {
      address: "Escriba su dirección o código postal.",
      problemMissing: "Cuéntenos qué está haciendo la máquina.",
      problemShort: "Cuéntenos un poco más sobre el problema.",
    },
  },

  account: {
    eyebrow: "Para clientes que nos alquilan",
    title: "Pagar o gestionar su alquiler",
    lead: "Los pagos con tarjeta se hacen a través de Stripe. Nunca vemos el número completo de su tarjeta.",
    sectionLabel: "Su alquiler",
    payTitle: "Pagar con tarjeta",
    payText: "Use el enlace de pago de Stripe que le enviamos con su cotización. ¿No lo encuentra? Escríbanos.",
    portalTitle: "Su tarjeta y sus recibos",
    portalText: "Cambie su tarjeta y vea sus recibos en el portal de clientes de Stripe.",
    portalButton: "Abrir el portal de clientes",
    endTitle: "Terminar un alquiler",
    endText:
      "Envíenos un mensaje al {phone}. Después del mínimo de {minWeeks} semanas, cualquiera de las partes puede terminar el alquiler con {noticeDays} días de aviso, y nosotros recogemos la máquina.",
    textUs: "Escríbanos",
  },

  guides: {
    eyebrow: "Guías",
    title: "Guías para alquilar lavadora y secadora",
    lead: "Guías cortas y prácticas para alquilar lavadora y secadora en Toronto y el GTA.",
    listLabel: "Todas las guías",
    read: "Leer la guía",
    guideEyebrow: "Guía",
    byline: "Por {company} · Actualizado el {date}",
    onThisPage: "En esta página",
    ctaText:
      "{setPrice} por semana un juego de lavadora y secadora, {singlePrice} una sola máquina. Incluye reparaciones y retiro de la máquina vieja.",
    more: "Más guías",
  },

  legal: {
    termsEyebrow: "Alquilar con nosotros",
    privacyEyebrow: "Su información",
    updated: "Última actualización: {date}",
    questions: "¿Preguntas sobre esta página? Llame o escriba al {phoneLink}.",
  },

  notFound: {
    title: "Página no encontrada",
    text: "Esta página no existe. El alquiler de lavadora y secadora en Toronto y el GTA cuesta {setPrice} por semana el juego, {singlePrice} una máquina.",
    home: "Ir a la página de inicio",
  },

  error: {
    title: "Algo salió mal",
    text: "Intente de nuevo, o llame o escriba al {phoneLink}.",
  },

  start: {
    eyebrow: "Empezar el alquiler",
    stepsLabel: "Pasos de la solicitud de alquiler",
    stepOf: "Paso {step} de {steps}",
    stepDone: ", completado",
    back: "Volver al paso anterior",
    asideLabel: "O llame o escriba",
    steps: {
      machine: "Tipo de máquina",
      details: "Su espacio",
      contact: "Cómo contactarle",
    },
    heads: {
      details: {
        title: "Su espacio: paso {step} de {steps} | {company}",
        description:
          "Paso {step} de la solicitud de alquiler: código postal, ancho del clóset, tomacorriente de la secadora y por dónde se entra.",
      },
      contact: {
        title: "Cómo contactarle: paso {step} de {steps} | {company}",
        description: "Paso {step} de la solicitud de alquiler: su nombre, número de teléfono y un día preferido.",
      },
      done: {
        title: "Solicitud enviada | {company}",
        description:
          "Su solicitud de alquiler fue enviada. Le respondemos con la máquina, el total y la fecha de inicio.",
      },
    },
    machine: {
      title: "¿Qué máquina necesita?",
      intro:
        "¿No está seguro? Elija \"Todavía no lo sé\": le ayudamos a elegir según el tamaño de su clóset y sus conexiones. {link}",
      legend: "Tipo de máquina",
      setNote: "{setPrice}/semana por el juego",
      singleNote: "{singlePrice}/semana",
      washerOnly: "Solo lavadora",
      dryerOnly: "Solo secadora",
      notSure: "Todavía no lo sé",
      notSureNote: "Le ayudamos a elegir",
      next: "Siguiente: su espacio",
      error: "Elija un tipo de máquina, o \"Todavía no lo sé\".",
    },
    details: {
      title: "Cuéntenos sobre su espacio",
      intro: "Eligió: {machine}. Ahora el espacio, para llevarle una máquina que quepa.",
      postal: "Código postal",
      postalPlaceholder: "p. ej. M5V 2T6",
      width: "Ancho del clóset o del espacio",
      widthPlaceholder: "p. ej. 24\" o 61 cm",
      widthHint: "¿No está seguro? Escriba \"no sé\".",
      outlet: "Tomacorriente de la secadora",
      outlets: { "3-prong": "3 clavijas", "4-prong": "4 clavijas", "not-sure": "No estoy seguro" },
      access: "¿Cómo entramos la máquina?",
      accessChoices: {
        ground: { label: "Sin escaleras", note: "Planta baja o uno o dos escalones" },
        stairs: { label: "Escaleras", note: "Sótano o piso de arriba, sin ascensor" },
        elevator: { label: "Ascensor", note: "Edificio de condominios o apartamentos" },
      },
      floor: "Piso o unidad",
      floorPlaceholder: "p. ej. piso 12, sótano",
      floorHint: "Opcional. Cuéntenos de escaleras o vueltas estrechas en las notas del siguiente paso.",
      next: "Siguiente: cómo contactarle",
      errors: {
        postal: "Escriba su código postal.",
        widthMissing: "Escriba el ancho del espacio, o escriba \"no sé\".",
        widthLong: "Escríbalo corto, como 24\" o 61 cm.",
        outlet: "Elija el tomacorriente de la secadora, o \"No estoy seguro\".",
        access: "Elija cómo entramos la máquina.",
        floorLong: "Escríbalo corto, como \"piso 3\" o \"sótano\".",
      },
    },
    contact: {
      title: "¿Cómo podemos contactarle?",
      intro: "Le respondemos con la máquina, el total y la fecha de inicio.",
      summaryTitle: "Su solicitud hasta ahora",
      summary: {
        machine: "Máquina",
        postal: "Código postal",
        postalWithCity: "{postal} ({city})",
        width: "Ancho del clóset",
        outlet: "Tomacorriente de la secadora",
        access: "Acceso",
      },
      postalUnsure: "No podemos saber su zona solo por el código postal. Se lo confirmamos por mensaje de texto.",
      preferredDay: "Día de entrega preferido",
      preferredDayHint: "Opcional. Confirmamos la fecha con la cotización.",
      notesHint:
        "Por ejemplo: escaleras o vueltas estrechas, la máquina vieja que hay que llevarse, un buen momento para llamar.",
      submit: "Enviar solicitud",
      errors: {
        date: "Elija una fecha.",
        dateEarly: "Elija hoy o una fecha posterior.",
        notesLong: "Escriba las notas en menos de {max} caracteres.",
      },
    },
    done: {
      title: "Solicitud enviada.",
      thanks:
        "Gracias, {name}. Le llamaremos o le escribiremos al {customerPhone} con la máquina, el total y la fecha de inicio.",
      photo: "Una foto del espacio ayuda. Envíela al {phoneLink}.",
      textPhoto: "Enviar una foto",
      home: "Volver a la página de inicio",
    },
    email: {
      subject: "Nueva solicitud de alquiler — {name}",
      areaUnsure: "No se sabe por el código postal: confirmar por mensaje",
    },
  },
};

export default es;
