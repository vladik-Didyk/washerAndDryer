// Canadian French (fr-CA). Merged over ./en.ts (shared/i18n): anything missing shows the
// English text. Every page has a French version (/fr/...), so every key of ./en.ts can be
// translated here, with the same {placeholders}.
// Voice: Québec/Ontario French, "vous", the business speaks as "nous". Place names and the
// company name stay in English. Québec usage: laveuse, sécheuse, soumission, texto, placard,
// TVH. Sizes keep a non-breaking space before "cm", as in English; a non-breaking space also
// goes before ":" and inside « ». The business does NOT speak French: every line about
// languages says English, Spanish and Russian ("anglais, espagnol et russe"), and the home
// hero eyebrow keeps the English-default "Local Toronto business" line, translated.
// Left out on purpose: pages.*.llmsNote and legal.* (llms.txt and the policies are
// English-only), formats.am/pm (the French clock is 24-hour), and jsonLd.contact (schema.org
// contactType and availableLanguage stay machine-readable English).
import type { DeepPartial, Dictionary } from "../index";

const fr: DeepPartial<Dictionary> = {
  formats: {
    dateLong: "{day} {month} {year}",
    dateShort: "{day} {month}",
    time: "{hour24} h {minutes}",
  },

  common: {
    moreDetails: "Plus de détails",
    carousel: {
      previous: "Image précédente",
      next: "Image suivante",
      slideOf: "{index} de {count}",
    },
    examplePhotos: "Photos d'exemple, pas nos appareils ni nos immeubles.",
    sharedRooms: {
      title: "Salles de lavage communes",
      note: "Photos d'exemple de salles de lavage communes, pas d'immeubles que nous desservons.",
    },
    languages: "anglais, espagnol et russe",
    tagline: "Location de laveuse et sécheuse à Toronto et dans le GTA",
    location: "Toronto · service dans tout le GTA",
    localBusiness: "Entreprise locale de Toronto",
    torontoAndGta: "Toronto et le GTA",
    call: "Appeler",
    text: "Texto",
    callPhone: "Appeler le {phone}",
    callOrText: "Appel ou texto au {phone}",
    textPhone: "Texto au {phone}",
    startRental: "Commencer la location",
    getQuote: "Obtenir une soumission",
    pricesNote: "Prix en dollars canadiens. TVH non facturée.",
    priceTagNote: "TVH non facturée · Prix en CAD",
    perWeekSuffix: "/sem.",
    pricePerWeek: "{price}/sem.",
    aWeek: "par semaine",
    wasPrice: "avant {price}",
    hoursSentence: "Du lundi au samedi, de {opens} à {closes}. Fermé le dimanche.",
    hoursList: ["Lun.–sam. : {opens} – {closes}", "Dimanche : fermé"],
    preferCallOrText: "Vous préférez appeler ou écrire par texto?",
    closetPhotoHelps: "Une photo du placard aide. Envoyez-la par texto.",
    fartherAwayAsk: "Plus loin? Demandez-nous.",
    fartherAwayCall: "Plus loin? Appelez ou écrivez par texto au {phoneLink}.",
    allAreas: "Tous les secteurs",
    compareAllTypes: "Comparer tous les types d'appareils",
    compareTypes: "Comparer les types d'appareils",
    examplePhotosNote:
      "Photos d'exemple, pas nos appareils. La marque et le modèle dépendent de ce qui est disponible.",
    textPhotoFits:
      "Vous ne savez pas ce qui entre? Envoyez une photo de l'espace par texto au {phoneLink}. Nous vous le dirons.",
    readyToRent: "Prêt à louer?",
    readyToRentText:
      "Envoyez votre secteur et votre espace. Nous répondons avec l'appareil, le total et la date de début.",
    measureGuide: "Comment mesurer votre espace de lavage",
    howItWorks: "Comment ça fonctionne",
    opensInNewTab: "(s'ouvre dans un nouvel onglet)",
    availableInEnglish: "Disponible en anglais",
    hookups: [
      "Des robinets d'eau chaude et d'eau froide pour la laveuse",
      "Un drain : un tuyau de renvoi ou un évier de buanderie",
      "Une prise standard pour la laveuse",
      "Pour une sécheuse électrique : une prise de 240 V, à 3 ou 4 broches",
      "Pour une sécheuse à évacuation : un conduit vers l'extérieur",
    ],
    howWeWork: [
      "Nous vérifions chaque appareil avant qu'il parte.",
      "Nous branchons correctement l'eau, le drain, l'électricité et le conduit d'évacuation.",
      "Nous faisons un cycle d'essai avant de partir.",
      "Nous répondons aux appels en anglais, en espagnol et en russe.",
    ],
    logoAlt: "{company}",
  },

  photos: {
    "rooms/washer-dryer-shelving": "Exemple : une laveuse blanche à chargement frontal sous des tablettes de bois dans une buanderie lumineuse",
    "rooms/washer-shelves": "Exemple : une laveuse blanche à chargement frontal entre un panier et des tablettes ouvertes",
    "rooms/drum-empty": "Exemple : le tambour en acier vide d'une laveuse à chargement frontal, vu par la porte ouverte",
    "rooms/washer-basket-sock": "Exemple : une laveuse blanche avec un panier à linge dessus et une chaussette sur la porte",
    "rooms/washer-cabinet-plants": "Exemple : une laveuse blanche à chargement frontal sous un comptoir, à côté d'une armoire et de plantes",
    "rooms/dark-set-laundry-room": "Exemple : une laveuse et une sécheuse gris foncé à chargement frontal, côte à côte sous une tablette",
    "rooms/grey-set-laundry-room": "Exemple : une laveuse et une sécheuse grises à chargement frontal, côte à côte, avec un panier dessus",
    "rooms/drum-open-door": "Exemple : une laveuse à chargement frontal porte ouverte, montrant le tambour",
    "rooms/laundry-room-shirts": "Exemple : une laveuse blanche à chargement frontal dans une buanderie, des chemises suspendues au-dessus",
    "rooms/black-washer-basket": "Exemple : une laveuse noire à chargement frontal avec un panier à linge blanc devant",
    "rooms/stacked-small-room": "Exemple : une sécheuse blanche superposée à une laveuse à chargement frontal dans une petite pièce blanche",
    "shared/stacked-dryers-tiles": "Exemple de salle de lavage commune : laveuses et sécheuses superposées le long d'un mur carrelé",
    "shared/stacked-dryers-row": "Exemple de salle de lavage commune : une rangée de sécheuses superposées à portes rondes",
    "shared/washers-row-silver": "Exemple de salle de lavage commune : une rangée de laveuses argentées à chargement frontal",
    "shared/washers-and-dryers-rows": "Exemple de salle de lavage commune : une rangée de laveuses devant une rangée de sécheuses",
    "shared/washers-row-beige": "Exemple de salle de lavage commune : une rangée de laveuses beiges à chargement frontal, portes lettrées",
    "shared/washers-row-wood-front": "Exemple de salle de lavage commune : des laveuses à chargement frontal à façade de bois",
    "shared/washers-row-wide": "Exemple de salle de lavage commune : une longue rangée de laveuses à chargement frontal",
  },

  chrome: {
    skipLink: "Aller au contenu",
    loading: "Chargement…",
    ogImageAlt: "{company} : location de laveuse et sécheuse à Toronto et dans le GTA",
    breadcrumb: "Fil d'Ariane",
    mobileBar: {
      label: "Actions rapides",
      call: "Appeler",
      callAria: "Appeler le {phone}",
      startRental: "Louer",
      getQuote: "Soumission",
      repairForm: "Réparation",
      textUs: "Texto",
    },
    draft: {
      label: "Avis de brouillon",
      title: "Brouillon — non publié",
      text: "Version d'aperçu seulement. Le site en ligne n'affiche pas cette page tant qu'elle n'est pas approuvée.",
    },
    offerBar: {
      label: "Offres en cours",
    },
  },

  nav: {
    main: "Principal",
    more: "Plus",
    machines: "Appareils",
    prices: "Prix",
    areas: "Secteurs",
    landlords: "Propriétaires",
    faq: "FAQ",
    repair: "Demander une réparation",
    guides: "Guides",
    account: "Payer / gérer",
  },

  header: {
    utilityLine: "Lun.–sam. {opens} – {closes} · Nous parlons {languages}",
    callAria: "Appeler le {phone}",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    menuContact: "{phone}, lun.–sam. {opens} – {closes}",
    language: "Langue",
  },

  footer: {
    weSpeak: "Nous parlons {languages}.",
    facebook: "Page Facebook",
    machines: "Appareils",
    allMachineTypes: "Tous les types d'appareils",
    areas: "Secteurs",
    torontoDistricts: "Districts de Toronto",
    company: "Entreprise",
    languages: "Langues",
    about: "À propos",
    contact: "Contact",
    landlords: "Propriétaires",
    buildings: "Salles de lavage",
    repair: "Demander une réparation",
    guides: "Guides",
    account: "Payer / gérer",
    privacy: "Confidentialité",
    terms: "Conditions de location",
    copyright: "© {year} {company}",
  },

  offers: {
    promotions: {
      "first-week-free": {
        short: "Première semaine gratuite jusqu'au {firstWeekFreeEndShort}",
        title: "Première semaine gratuite",
        text: "Les nouveaux clients qui commencent une location au plus tard le {firstWeekFreeEnd} ne paient pas la location de la première semaine. Les ensembles comme les appareils seuls sont admissibles.",
        stillPaid: "Le dépôt de {deposit} et la livraison restent à payer.",
        note: "Nouveaux clients : commencez au plus tard le {firstWeekFreeEnd} et ne payez pas la location de la première semaine. Le dépôt et la livraison restent à payer.",
      },
    },
    referral: {
      short: "Recommandez un ami, recevez {referralAmount}",
      title: "Recommandez un ami",
      text: "Recevez {referralAmount} quand un ami que vous recommandez s'engage pour {referralMonths} mois ou plus.",
    },
  },

  pages: {
    home: {
      name: "Accueil",
      title: "Location laveuse et sécheuse Toronto et GTA | {setPrice}/sem.",
      description:
        "Laveuse et sécheuse à louer à Toronto et dans le GTA : {setPrice}/sem. l'ensemble, {singlePrice} un appareil. Réparations incluses. Appel ou texto : {phone}.",
    },
    areas: {
      name: "Secteurs",
      title: "Zone de service : location laveuse et sécheuse | Toronto",
      description:
        "Où nous livrons : Toronto et ses districts, Mississauga, Brampton, Vaughan, Markham et Richmond Hill. Vérifiez votre code postal.",
    },
    machines: {
      name: "Appareils",
      title: "Types de laveuses et sécheuses à louer | dès {singlePrice}/sem.",
      description:
        "Comparez les laveuses et sécheuses que nous louons à Toronto et dans le GTA : superposables, centre de lavage, côte à côte ou un seul appareil.",
    },
    landlords: {
      name: "Propriétaires",
      title: "Laveuses et sécheuses pour propriétaires | Toronto et GTA",
      description:
        "Lavage pour logements locatifs à Toronto et dans le GTA : vos locataires louent chez nous, ou vous louez les appareils. Réparations incluses.",
    },
    buildings: {
      name: "Salles de lavage",
      title: "Appareils pour salles de lavage | Toronto et GTA",
      description:
        "Laveuses et sécheuses pour les salles de lavage communes des immeubles de Toronto et du GTA : location par l'immeuble ou paiement à la brassée.",
    },
    landlordQuote: {
      name: "Obtenir une soumission",
      title: "Soumission pour propriétaires : laveuses et sécheuses",
      description:
        "Demandez une soumission pour vos logements locatifs à Toronto et dans le GTA. À partir de {quoteUnits} logements, nous visitons l'immeuble d'abord.",
    },
    faq: {
      name: "FAQ",
      title: "FAQ laveuse et sécheuse à louer | {company}",
      description:
        "Réponses sur la location de laveuse et sécheuse à Toronto et dans le GTA : prix, dépôt, paiement, livraison, installation, réparations, propriétaires.",
    },
    about: {
      name: "À propos",
      title: "À propos | {company}, Toronto",
      description:
        "{company} est une entreprise locale de Toronto : plus de {experienceYears} ans d'expérience pratique à installer et réparer des laveuses et sécheuses.",
    },
    contact: {
      name: "Contact",
      title: "Contact | {company}, {phone}",
      description:
        "Appel ou texto au {phone}, du lundi au samedi, de {opens} à {closes}, en anglais, espagnol ou russe. Ou envoyez une demande de soumission.",
    },
    repair: {
      name: "Demander une réparation",
      title: "Demander une réparation | {company}",
      description:
        "Vous louez une laveuse ou une sécheuse chez nous et elle ne fonctionne plus? Réparations incluses. Envoyez une demande ou appelez le {phone}.",
    },
    account: {
      name: "Payer ou gérer",
      title: "Payer ou gérer votre location | {company}",
      description:
        "Payez avec le lien reçu avec votre soumission, gérez votre carte et vos reçus dans le portail client Stripe, ou écrivez-nous pour terminer une location.",
    },
    start: {
      name: "Commencer la location",
      title: "Commencer votre location | {company}",
      description:
        "Louez une laveuse et sécheuse à Toronto et dans le GTA en trois courtes étapes. Nous répondons avec l'appareil, le total et la date de début.",
    },
    guides: {
      name: "Guides",
      title: "Guides de location | {company}",
      description:
        "Guides pratiques pour louer une laveuse et une sécheuse à Toronto et dans le GTA : quoi mesurer, vérifier et demander avant la livraison.",
    },
    notFound: {
      name: "Page introuvable",
      title: "Page introuvable | {company}",
      description:
        "Cette page n'existe pas. Location de laveuse et sécheuse à Toronto et dans le GTA : {setPrice} par semaine l'ensemble. Appel ou texto au {phone}.",
    },
    error: {
      title: "Une erreur s'est produite | {company}",
    },
  },

  jsonLd: {
    setOffer: {
      name: "Location d'un ensemble laveuse et sécheuse",
      description: "Un ensemble laveuse et sécheuse, par semaine. Réparations et reprise de l'ancien appareil incluses.",
    },
    singleOffer: {
      name: "Location d'une laveuse ou d'une sécheuse seule",
      description: "Une laveuse ou une sécheuse, par semaine. Réparations et reprise de l'ancien appareil incluses.",
    },
    business: {
      description:
        "Location de laveuse et sécheuse à Toronto et dans le GTA. {setPrice} par semaine pour un ensemble laveuse et sécheuse, {singlePrice} par semaine pour un appareil. Réparations et reprise de l'ancien appareil incluses. Service en anglais, en espagnol et en russe.",
      paymentAccepted: "Virement Interac, carte de crédit",
      catalog: "Location de laveuses et sécheuses",
    },
    serviceType: "Location de laveuse et sécheuse",
    serviceGta: "Location de laveuse et sécheuse à Toronto et dans le GTA",
    serviceIn: "Location de laveuse et sécheuse à {place}",
    serviceInDistrict: "Location de laveuse et sécheuse à {place}, Toronto",
    torontoPlace: "{place}, Toronto",
    machinesList: "Types de laveuses et sécheuses à louer",
    machineOffer: {
      name: "Location : {title}",
      description: "{title}, par semaine. Réparations et reprise de l'ancien appareil incluses.",
    },
    landlords: {
      name: "Location de laveuses et sécheuses pour propriétaires",
      serviceType: "Location de laveuses et sécheuses pour logements locatifs",
      audience: "Propriétaires",
      offerName: "Ensemble laveuse et sécheuse pour un logement locatif",
      offerDescription:
        "Prix courant par ensemble laveuse et sécheuse, par semaine. À partir de {quoteUnits} logements, soumission par immeuble après une visite. Réparations incluses.",
    },
    buildings: {
      name: "Laveuses et sécheuses pour salles de lavage d'immeubles",
      serviceType: "Fourniture de laveuses et sécheuses pour salles de lavage communes",
      audience: "Propriétaires et gestionnaires d'immeubles résidentiels",
    },
    guidesList: "Guides pour louer une laveuse et une sécheuse",
  },

  forms: {
    requiredNote: "Les champs marqués {star} sont obligatoires.",
    sending: "Envoi…",
    sendError: "L'envoi n'a pas fonctionné. Appelez ou écrivez par texto au {phoneLink}.",
    sentTitle: "Demande envoyée.",
    sentNote: "Nous vous appellerons ou vous écrirons par texto.",
    sendAnother: "Envoyer une autre demande",
    name: "Nom",
    phone: "Téléphone",
    email: "Courriel",
    notes: "Remarques",
    optional: "Facultatif.",
    notGiven: "Non indiqué",
    none: "Aucun",
    errors: {
      nameMissing: "Entrez votre nom.",
      nameShort: "Le nom doit compter au moins 2 caractères.",
      phoneMissing: "Entrez votre numéro de téléphone.",
      phoneInvalid: "Entrez un numéro de téléphone valide, avec l'indicatif régional.",
      emailInvalid: "Entrez une adresse courriel valide, ou laissez le champ vide.",
    },
  },

  postalCheck: {
    label: "Votre code postal",
    placeholder: "p. ex. M5V 2T6",
    check: "Vérifier",
    invalid: "Entrez un code postal canadien valide, comme M5V 2T6.",
    yes: "Oui, nous livrons à {city}.",
    outside: "{place} est hors de notre secteur habituel. Appelez ou textez le {phone} et nous vérifierons.",
    unsure:
      "Le code postal ne suffit pas pour le savoir. Envoyez-nous votre adresse par texto au {phone} et nous vous le confirmerons.",
    textUs: "Texto au {phone}",
  },

  machines: {
    types: {
      stackable: {
        title: "Ensemble superposable",
        description: "Sécheuse superposée sur une laveuse à chargement frontal. Convient aux placards étroits.",
        priceNote: "pour l'ensemble",
        alt: "Laveuse à chargement frontal avec une sécheuse superposée",
        compare: {
          width: "Environ 24″ (61 cm) ou 27″ (69 cm), la largeur d'un appareil",
          loads: "Frontal",
          goodFor: "Placards étroits et hauts de condos et d'appartements",
        },
        sizes: [
          { label: "Largeur", value: "Environ 24″ (61 cm) compact, ou environ 27″ (69 cm) pleine grandeur" },
          { label: "Surface au sol", value: "La largeur d'un appareil : la sécheuse est posée sur la laveuse" },
        ],
        photos: {
          "stackable-1":
            "Exemple de laveuse et sécheuse superposées : une sécheuse blanche sur une laveuse blanche à chargement frontal",
          stackable: "Exemple de laveuse et sécheuse superposées dans un placard de lavage, porte ouverte",
        },
        page: {
          metaTitle: "Laveuse et sécheuse superposables, Toronto | {setPrice}/sem.",
          metaDescription:
            "Louez une laveuse et sécheuse superposables à Toronto et dans le GTA pour {setPrice} par semaine. Pour placards étroits. Réparations et reprise incluses.",
          h1: "Location de laveuse et sécheuse superposables",
          intro: "Laveuse en bas, sécheuse en haut. Deux appareils complets sur la surface d'un seul.",
          whatItIs: [
            "Une laveuse à chargement frontal avec une sécheuse assortie fixée au-dessus par une trousse de superposition. Deux appareils distincts, chacun avec ses commandes, en une seule colonne.",
            "Un seul appareil touche le plancher. Il entre dans des placards où deux appareils côte à côte n'entreraient jamais.",
          ],
          fits: [
            "Placards de lavage de condos et d'appartements",
            "Espaces étroits assez hauts pour deux appareils",
            "Vous voulez le chargement frontal, mais n'avez la place que pour un appareil",
          ],
          size: "Les ensembles compacts mesurent en général environ 24 pouces (61 cm) de large; les pleine grandeur, environ 27 pouces (69 cm). Mesurez la largeur, la profondeur et la hauteur, ainsi que la porte par laquelle ils passent. Laissez quelques pouces à l'arrière pour les tuyaux et le conduit.",
        },
      },
      "laundry-centre": {
        title: "Centre de lavage monobloc",
        description: "Laveuse et sécheuse en un seul appareil. Le choix habituel des placards de condo.",
        priceNote: "pour l'ensemble",
        alt: "Centre de lavage monobloc : une sécheuse au-dessus d'une laveuse à chargement par le haut, dans un seul boîtier",
        compare: {
          width: "24″ (61 cm) ou 27″ (69 cm)",
          loads: "Par le haut",
          goodFor: "Placards conçus pour un appareil monobloc",
        },
        sizes: [
          { label: "Largeur", value: "24″ (61 cm) ou 27″ (69 cm)" },
          { label: "Hauteur", value: "Environ 70″ (178 cm) pour un appareil de 24″" },
        ],
        photos: {
          "laundry-centre":
            "Exemple de centre de lavage monobloc : une sécheuse au-dessus d'une laveuse à chargement par le haut, dans un seul boîtier",
          "laundry-centre-1": "Exemple d'un centre de lavage monobloc dans un placard, à côté de portes d'armoire beiges",
          "laundry-centre-2": "Exemple d'un centre de lavage monobloc dans un placard de couloir, porte ouverte",
        },
        page: {
          metaTitle: "Centre de lavage monobloc à louer, Toronto | {setPrice}/sem.",
          metaDescription:
            "Louez un centre de lavage monobloc (laveuse et sécheuse en un appareil) à Toronto et dans le GTA pour {setPrice} par semaine. 24″ ou 27″. Réparations incluses.",
          h1: "Location de centre de lavage : laveuse et sécheuse en un seul appareil",
          intro:
            "Laveuse à chargement par le haut en bas, sécheuse en haut, un seul boîtier. Une seule surface à prévoir.",
          whatItIs: [
            "Un seul appareil : une laveuse à chargement par le haut en bas, une sécheuse en haut. Un seul panneau commande les deux.",
            "Beaucoup de placards de condo ont été conçus pour cet appareil. C'est souvent le remplacement le plus simple pour un vieil appareil.",
          ],
          fits: [
            "Placards de condo conçus pour un appareil monobloc",
            "Petits espaces avec un seul jeu de raccordements d'eau, de drain et d'électricité",
            "Ceux qui aiment charger par le haut",
          ],
          size: "Les centres de lavage font 24 ou 27 pouces (61 ou 69 cm) de large. Un appareil de 24 pouces mesure environ 70 pouces (178 cm) de haut. Mesurez la largeur et la hauteur du placard. Vérifiez la profondeur portes fermées.",
        },
      },
      "side-by-side-front-load": {
        title: "Côte à côte, chargement frontal",
        description: "Deux appareils pleine grandeur côte à côte. Grandes brassées, accès facile.",
        priceNote: "pour l'ensemble",
        alt: "Laveuse et sécheuse à chargement frontal côte à côte",
        compare: {
          width: "Environ 55″ (140 cm) pour les deux",
          loads: "Frontal",
          goodFor: "Salles de lavage et grandes brassées comme la literie",
        },
        sizes: [
          { label: "Largeur", value: "Environ 27″ (69 cm) chacune, environ 55″ (140 cm) pour les deux" },
          { label: "Dégagement", value: "De la place devant pour ouvrir les deux portes complètement" },
        ],
        photos: {
          "side-by-side-front-load-1":
            "Exemple de laveuse et sécheuse blanches à chargement frontal côte à côte sur une plateforme surélevée avec tiroirs",
          "side-by-side-front-load-2":
            "Exemple de laveuse et sécheuse blanches à chargement frontal côte à côte sur des socles dans une salle de lavage",
          "side-by-side-front-load":
            "Exemple de laveuse et sécheuse grises à chargement frontal côte à côte sur des socles, près d'une fenêtre",
        },
        page: {
          metaTitle: "Laveuse et sécheuse à chargement frontal | {setPrice}/sem.",
          metaDescription:
            "Louez une laveuse et une sécheuse à chargement frontal côte à côte à Toronto et dans le GTA pour {setPrice} par semaine. Grands tambours. Réparations incluses.",
          h1: "Location de laveuse et sécheuse à chargement frontal côte à côte",
          intro:
            "Une laveuse à chargement frontal et une sécheuse assortie, côte à côte. Tambours pleine grandeur et dessus plat pour plier.",
          whatItIs: [
            "Deux appareils pleine grandeur à chargement frontal, côte à côte. Le dessus reste libre : vous avez un comptoir pour plier.",
            "Une laveuse à chargement frontal fait culbuter le linge dans peu d'eau. Idéal pour les grandes brassées comme la literie et les serviettes.",
          ],
          fits: [
            "Maisons avec une salle de lavage ou un coin lavage au sous-sol",
            "Familles nombreuses qui lavent souvent",
            "Espaces où les deux portes peuvent s'ouvrir",
          ],
          size: "Les appareils pleine grandeur font en général environ 27 pouces (69 cm) de large chacun. Prévoyez environ 55 pouces (140 cm), plus un peu d'espace autour. Assurez-vous que les deux portes s'ouvrent complètement.",
        },
      },
      "side-by-side-top-load": {
        title: "Côte à côte, chargement par le haut",
        description: "Laveuse à chargement par le haut et sécheuse assortie. Simple et robuste.",
        priceNote: "pour l'ensemble",
        alt: "Laveuse à chargement par le haut et sécheuse assortie",
        compare: {
          width: "Environ 55″ (140 cm) pour les deux",
          loads: "Par le haut",
          goodFor: "Salles de lavage, et moins besoin de se pencher",
        },
        sizes: [
          { label: "Largeur", value: "Environ 27″ (69 cm) chacune, environ 55″ (140 cm) pour les deux" },
          { label: "Dégagement", value: "De l'espace libre au-dessus de la laveuse pour ouvrir le couvercle" },
        ],
        photos: {
          "side-by-side-top-load-1":
            "Exemple de laveuse blanche à chargement par le haut et de sécheuse assortie dans une salle de lavage aux murs jaunes",
          "side-by-side-top-load-2":
            "Exemple de laveuse à chargement par le haut et de sécheuse dans un sous-sol non fini",
          "side-by-side-top-load":
            "Exemple de laveuse blanche à chargement par le haut et de sécheuse assortie sous des armoires murales",
        },
        page: {
          metaTitle: "Laveuse à chargement par le haut et sécheuse | {setPrice}/sem.",
          metaDescription:
            "Louez une laveuse à chargement par le haut et une sécheuse assortie à Toronto et dans le GTA pour {setPrice} par semaine. Simple, moins de flexions.",
          h1: "Location de laveuse à chargement par le haut et sécheuse côte à côte",
          intro:
            "L'ensemble classique : une laveuse à chargement par le haut et une sécheuse assortie. Commandes simples, moins besoin de se pencher.",
          whatItIs: [
            "La laveuse s'ouvre par le haut : vous la remplissez debout. La sécheuse se charge par l'avant.",
            "Commandes simples et grande ouverture. Le linge lourd et mouillé se sort facilement.",
          ],
          fits: [
            "Sous-sols et salles de lavage avec de l'espace libre au-dessus de la laveuse",
            "Ceux qui préfèrent ne pas se pencher pour charger la laveuse",
            "Les ménages qui veulent un appareil simple et familier",
          ],
          size: "Les appareils pleine grandeur font en général environ 27 pouces (69 cm) de large chacun. Prévoyez environ 55 pouces (140 cm). Le couvercle a besoin d'espace libre au-dessus; une tablette basse peut donc nuire.",
        },
      },
      "single-machine": {
        title: "Laveuse ou sécheuse seule",
        description: "Un seul appareil. Jumelez-le avec celui que vous avez.",
        priceNote: "pour un appareil",
        alt: "Une laveuse à côté du contour pointillé d'un appareil que vous avez déjà",
        compare: {
          width: "Environ 24″ (61 cm) ou 27″ (69 cm)",
          loads: "Frontal ou par le haut",
          goodFor: "Jumeler avec un appareil que vous avez déjà",
        },
        sizes: [{ label: "Largeur", value: "Environ 27″ (69 cm) pleine grandeur, ou environ 24″ (61 cm) compact" }],
        photos: {
          "single-machine-washer": "Exemple d'une laveuse blanche à chargement frontal avec des serviettes dessus",
          "single-machine-dryer": "Exemple d'une sécheuse blanche à chargement frontal",
          "single-machine": "Exemple d'une laveuse blanche à chargement frontal",
        },
        page: {
          metaTitle: "Laveuse ou sécheuse seule à louer, Toronto | {singlePrice}/sem.",
          metaDescription:
            "Louez seulement une laveuse ou seulement une sécheuse à Toronto et dans le GTA pour {singlePrice} par semaine. Jumelez-la à votre appareil. Réparations incluses.",
          h1: "Location de laveuse ou de sécheuse : un seul appareil",
          intro: "Seulement une laveuse ou seulement une sécheuse. Jumelez-la avec l'appareil que vous avez.",
          whatItIs: [
            "Un de vos appareils fonctionne encore? Pas besoin d'un ensemble complet. Louez celui qui vous manque, pour la moitié du prix d'un ensemble.",
            "Parlez-nous de votre autre appareil : chargement frontal ou par le haut, et sa largeur. Nous en trouvons un qui ira bien à côté.",
          ],
          fits: [
            "Votre laveuse est brisée mais la sécheuse fonctionne, ou l'inverse",
            "Votre nouveau logement n'a qu'un seul appareil",
            "Vous voulez une laveuse maintenant et une sécheuse plus tard",
          ],
          size: "La plupart des appareils pleine grandeur font environ 27 pouces (69 cm) de large; les compacts, environ 24 pouces (61 cm). Vous superposez une sécheuse sur votre laveuse? Envoyez-nous la marque et le modèle de la laveuse pour que nous vérifiions qu'elles se superposent.",
        },
      },
    },
    photoCaption: "Exemple de ce type. Votre appareil peut être d'une autre marque.",
    drawingAlt: "Dessin : {alt}",
    drawingTag: "Dessin",
    seeDetails: "Voir les détails",
    drawingCaption: "Un dessin de ce type, pas une photo. La marque et le modèle dépendent de ce qui est disponible.",
    galleryLabel: "Photos de ce type",
    galleryShow: "Afficher la photo {index} sur {count}",
    view: {
      label: "Afficher les appareils en",
      photos: "Photos",
      drawings: "Dessins",
    },
    showcase: {
      title: "Choisissez le type qui convient",
      lead: "Envoyez la taille de votre placard et le type de prise. Nous trouvons un appareil qui convient, le vérifions, le livrons et le raccordons.",
      photosNote: "Les photos sont des exemples de chaque type, pas nos appareils. ",
      drawingsNote: "Les dessins montrent le type, pas un appareil précis. ",
      availabilityNote: "La marque et le modèle dépendent de ce qui est disponible.",
    },
    animation: {
      label: "Types d'appareils que nous louons",
      show: "Afficher : {title}",
      pause: "Mettre en pause le diaporama des appareils",
      play: "Lancer le diaporama des appareils",
      widths: {
        "laundry-centre": "24″ ou 27″ de large",
        "side-by-side-top-load": "Environ 55″ de large pour les deux",
        "single-machine": "24″ ou 27″ de large",
        "side-by-side-front-load": "Environ 55″ de large pour les deux",
        stackable: "24″ ou 27″ de large",
      },
    },
    index: {
      eyebrow: "Cinq types, deux prix",
      title: "Les types de laveuses et sécheuses que nous louons",
      lead: "Tout ensemble coûte {setPrice} par semaine. Un appareil coûte {singlePrice} par semaine. Réparations et reprise de l'ancien appareil toujours incluses.",
      compareTitle: "Comparer les types",
      compareLead:
        "Les largeurs sont typiques; la vôtre dépend de l'appareil que nous avons. Envoyez vos mesures et nous les vérifions d'abord.",
      columns: {
        type: "Type",
        width: "Largeur",
        loads: "Chargement de la laveuse",
        goodFor: "Idéal pour",
        price: "Prix",
      },
      hookupsTitle: "Ce qu'il faut pour chaque appareil",
      guidesTitle: "Avant de choisir",
      guides: {
        measure: "Comment mesurer votre espace de lavage",
        stackableVsCentre: "Ensemble superposable ou centre de lavage?",
        outlet: "Prise de sécheuse à 3 ou à 4 broches?",
      },
      ctaTitle: "Vous ne savez pas quel type convient?",
      ctaText: "Envoyez une photo de l'espace par texto au {phoneSpan}. Nous vous dirons ce qui convient.",
    },
    page: {
      measureTip: "Mesurez la largeur, la hauteur et la profondeur de votre espace, ainsi que chaque porte sur le passage.",
      summaryTitle: "Prix et ce qui est inclus",
      forSet: "Pour l'ensemble laveuse et sécheuse.",
      forSingle: "Pour un appareil : une laveuse ou une sécheuse.",
      included: [
        "Livraison et installation chiffrées avant que vous payiez",
        "Réparations incluses",
        "Reprise de votre ancien appareil sans frais",
        "Aucune vérification de crédit",
      ],
      terms: "Dépôt remboursable de {deposit}. Minimum de {minWeeks} semaines, puis à la semaine.",
      needOne: "Un seul appareil suffit? {singlePrice} par semaine.",
      needBoth: "Besoin des deux? Prenez l'ensemble pour {setPrice} par semaine.",
      specsTitle: "Dimensions et raccordements",
      specsLead:
        "Dimensions typiques. Les vôtres dépendent de l'appareil que nous avons; nous vérifions donc vos mesures d'abord.",
      specsCaption: "Dimensions typiques et raccordements : {title}",
      loadsFrom: "Chargement de la laveuse",
      goodFor: "Idéal pour",
      hookupsNeeded: "Raccordements nécessaires",
      fitTitle: "Vous ne savez pas si ça entre?",
      fitText: "Envoyez une photo de l'espace par texto au {phoneLink}. Nous vérifierons.",
      whatItIs: "Ce que c'est",
      size: "Dimensions",
      whoItFits: "Pour qui",
      otherTypes: "Autres types d'appareils",
      whereWeDeliver: "Où nous livrons",
      ctaTitle: "{title} : {price} par semaine",
      ctaText: "Livraison et installation chiffrées avant que vous payiez. Réparations incluses pendant la location.",
    },
  },

  home: {
    heroSlides: {
      label: "En vedette",
      repairs: {
        eyebrow: "Réparations incluses",
        title: "S'il brise, nous le réparons",
        text: "Réparations ou appareil de remplacement, sans frais, pendant toute la location.",
        cta: "Voir comment fonctionnent les réparations",
      },
      buildings: {
        eyebrow: "Pour les immeubles",
        title: "Des appareils pour les salles de lavage d'immeubles",
        text: "Nous les fournissons, les installons et les réparons. Soumission par immeuble après avoir vu la salle.",
        cta: "Voir les salles de lavage",
      },
    },
    included: {
      title: "Chaque location comprend",
      items: [
        {
          title: "Livraison et installation",
          text: "Nous raccordons l'eau, le drain, l'électricité et l'évent. Puis nous faisons un cycle d'essai.",
        },
        {
          title: "Réparations incluses",
          text: "Un appareil cesse de fonctionner? Nous le réparons ou le remplaçons sans frais.",
        },
        {
          title: "Ancien appareil enlevé",
          text: "Nous enlevons votre ancien appareil sans frais.",
        },
      ],
    },
    rooms: {
      title: "Un appareil pour chaque espace",
      lead: "Placards, condos, sous-sols, buanderies. Voyez où vont nos appareils.",
      captions: {
        "rooms/stacked-small-room": "Un ensemble superposable dans une pièce étroite",
        "rooms/washer-shelves": "Une laveuse entre les tablettes",
        "rooms/dark-set-laundry-room": "Un ensemble à chargement frontal sous une tablette",
        "rooms/laundry-room-shirts": "Une laveuse dans une buanderie commune",
        "rooms/grey-set-laundry-room": "Un ensemble à chargement frontal avec comptoir de pliage",
        "rooms/washer-cabinet-plants": "Une laveuse sous le comptoir de cuisine",
        "rooms/washer-dryer-shelving": "Une laveuse avec des tablettes au-dessus",
        "rooms/black-washer-basket": "Une seule laveuse dans un coin",
        "rooms/washer-basket-sock": "Une laveuse prête pour la prochaine brassée",
      },
    },
    hero: {
      // We don't speak French: the eyebrow stays the English-default line, translated.
      eyebrow: "Entreprise locale de Toronto",
      title: "Location de laveuse et sécheuse à Toronto et dans le GTA",
      priceSummary: "{setPrice} par semaine pour l'ensemble. {singlePrice} par semaine pour un appareil.",
      aWeek: "par semaine",
      forTheSet: "pour l'ensemble",
      orSingle: "ou {price} pour un appareil",
      singlePrice: "{singlePrice} par semaine",
      photoCaption: "Photo d'exemple",
      photoAlt: "Une laveuse et une sécheuse blanches à chargement frontal côte à côte dans une salle de lavage lumineuse",
    },
    trust: {
      label: "Pourquoi louer chez nous",
      repairs: "Réparations incluses",
      noCreditCheck: "Aucune vérification de crédit",
      sameWeek: "Livraison la même semaine",
      local: "Entreprise locale de Toronto",
    },
    how: {
      steps: [
        "Dites-nous ce qui entre",
        "Recevez une soumission",
        "Nous livrons et raccordons",
        "Réparations à nos frais",
      ],
    },
    prices: {
      title: "Prix hebdomadaires",
      perWeek: "par semaine",
      forSet: "pour l'ensemble laveuse + sécheuse",
      orSingle: "ou {price} par semaine pour un appareil",
      checks: [
        "Réparations incluses",
        "Enlèvement de l'ancien appareil inclus",
        "TVH non facturée",
      ],
      details: "Dépôt, durée minimale et paiement",
    },
    landlordsTeaser: {
      title: "Propriétaire ou immeuble?",
      text: "Des appareils pour vos logements ou votre salle de lavage. Réparations incluses.",
      link: "Voir les options pour propriétaires",
      buildingsLink: "Voir les salles de lavage",
    },
    about: {
      title: "À propos de nous",
      facts: [
        "Entreprise locale de Toronto",
        "Plus de {experienceYears} ans à réparer des laveuses et sécheuses",
        "Nous parlons {languages}",
      ],
      more: "En savoir plus sur nous",
    },
    serviceArea: {
      title: "Où nous livrons",
      allAreas: "Voir tous les secteurs",
      mapLabel: "Carte des secteurs desservis",
      lake: "Lac Ontario",
    },
    faq: {
      title: "FAQ",
      another: "D'autres questions? Appelez ou écrivez par texto au {phoneLink}.",
      all: "Voir toutes les questions",
    },
    cta: {
      title: "Obtenez un ensemble pour {setPrice} par semaine",
      text: "Réparations incluses. TVH non facturée.",
    },
    startRental: {
      title: "Commencer votre location",
      stepsTitle: "Trois courtes étapes",
      steps: [
        "Type d'appareil",
        "Votre espace",
        "Comment vous joindre",
      ],
      nothingToPay: "Ne payez rien maintenant. Nous confirmons d'abord l'appareil, le total et la date de début.",
    },
  },

  areas: {
    cities: {
      toronto: {
        name: "Toronto",
        teaser: "Toute la ville : le centre-ville, le centre, l'est, l'ouest et les cinq districts.",
        metaTitle: "Location laveuse et sécheuse Toronto | {setPrice}/sem.",
        metaDescription:
          "Location de laveuse et sécheuse à Toronto, North York, Etobicoke, Scarborough, East York et York : {setPrice}/sem. l'ensemble, {singlePrice} un appareil.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout Toronto, y compris North York, Etobicoke, Scarborough, East York et York.",
        neighbourhoods: ["North York", "Etobicoke", "Scarborough", "East York", "York"],
        homes: [
          "Beaucoup de Torontois vivent en condo ou en appartement. Les placards des condos sont souvent étroits. Un ensemble superposable de 24 pouces ou un centre de lavage monobloc est le choix habituel.",
          "La plupart des condos demandent de réserver l'ascenseur de service pour la livraison. Réservez une plage horaire et envoyez-nous l'heure.",
          "Une maison avec une salle de lavage au sous-sol a en général la place pour deux appareils côte à côte.",
        ],
        checklist: [
          "La largeur, la profondeur et la hauteur du placard, et la largeur de sa porte",
          "La prise de la sécheuse : 3 ou 4 broches",
          "La réservation de l'ascenseur de service, si vous êtes en condo",
          "Une photo de l'espace, envoyée par texto",
        ],
      },
      mississauga: {
        name: "Mississauga",
        teaser: "Des condos près de City Centre et du bord du lac. Des maisons et des maisons en rangée ailleurs.",
        metaTitle: "Location laveuse et sécheuse Mississauga | {setPrice}/sem.",
        metaDescription:
          "Location de laveuse et sécheuse à Mississauga : {setPrice}/sem. l'ensemble, {singlePrice} un appareil. Réparations et reprise incluses. Sans vérification de crédit.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout Mississauga, de Port Credit à Meadowvale, de Malton à Erin Mills.",
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
          "Mississauga a des tours de condos autour de City Centre et au bord du lac. Meadowvale, Erin Mills et Churchill Meadows comptent surtout des maisons et des maisons en rangée.",
          "En condo? Pensez à un ensemble superposable ou à un centre de lavage monobloc. Maison ou maison en rangée? Deux appareils côte à côte entrent souvent.",
        ],
        checklist: [
          "L'emplacement du lavage : placard, salle de lavage ou sous-sol",
          "La largeur de l'espace et des portes à franchir",
          "La prise de la sécheuse : 3 ou 4 broches",
          "Des escaliers ou un ascenseur le jour de la livraison",
        ],
      },
      brampton: {
        name: "Brampton",
        teaser: "Surtout des maisons et des maisons en rangée. Le lavage au sous-sol ou au rez-de-chaussée.",
        metaTitle: "Location laveuse et sécheuse Brampton | {setPrice}/sem.",
        metaDescription:
          "Location de laveuse et sécheuse à Brampton : {setPrice}/sem. l'ensemble, {singlePrice} un appareil. Réparations incluses. Appelez le {phone}.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout Brampton, y compris Bramalea, Springdale, Heart Lake, Mount Pleasant et Castlemore.",
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
          "À Brampton, la plupart des logements sont des maisons individuelles, jumelées ou en rangée. Le lavage est souvent au sous-sol ou au rez-de-chaussée. Deux appareils pleine grandeur côte à côte entrent en général.",
          "Vous louez un logement au sous-sol? Demandez à votre propriétaire quels raccordements d'eau, de drain et d'électricité vous pouvez utiliser. Envoyez-nous une photo par texto et nous vous dirons ce qui convient.",
        ],
        checklist: [
          "Les raccordements que vous pouvez utiliser, si vous louez un logement au sous-sol",
          "L'escalier vers le coin lavage : combien de marches, et quelle largeur",
          "La prise de la sécheuse : 3 ou 4 broches",
          "S'il vous faut un ensemble ou un seul appareil",
        ],
      },
      vaughan: {
        name: "Vaughan",
        teaser: "Woodbridge, Maple, Concord, Kleinburg. Des condos récents près du Vaughan Metropolitan Centre.",
        metaTitle: "Location laveuse et sécheuse Vaughan | {setPrice}/sem.",
        metaDescription:
          "Location de laveuse et sécheuse à Vaughan, Woodbridge, Maple et Concord : {setPrice}/sem. l'ensemble, {singlePrice} un appareil. Réparations incluses.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout Vaughan, y compris Woodbridge, Maple, Concord, Kleinburg et la partie de Thornhill située à Vaughan.",
        neighbourhoods: [
          "Woodbridge",
          "Maple",
          "Concord",
          "Kleinburg",
          "Vellore Village",
          "Thornhill (côté Vaughan)",
          "Vaughan Metropolitan Centre",
        ],
        homes: [
          "Une grande partie de Vaughan est faite de maisons avec une vraie salle de lavage. Deux appareils côte à côte, à chargement frontal ou par le haut, y entrent bien.",
          "Vaughan a aussi des tours de condos récentes, surtout autour du Vaughan Metropolitan Centre. Leurs placards sont souvent conçus pour un ensemble superposable de 24 pouces ou un appareil monobloc.",
        ],
        checklist: [
          "Chargement frontal ou par le haut : lequel préférez-vous?",
          "La largeur de l'espace, et la place pour ouvrir les portes ou le couvercle",
          "La prise de la sécheuse : 3 ou 4 broches",
          "La réservation de l'ascenseur, si vous êtes en condo",
        ],
      },
      markham: {
        name: "Markham",
        teaser: "Des maisons en rangée et des maisons à Unionville et Cornell. Des condos le long de l'autoroute 7.",
        metaTitle: "Location laveuse et sécheuse Markham | {setPrice}/sem.",
        metaDescription:
          "Location de laveuse et sécheuse à Markham et Unionville : {setPrice}/sem. l'ensemble, {singlePrice} un appareil. Réparations et reprise incluses.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout Markham, y compris Unionville, Markham Village, Cornell, Milliken et Berczy Village.",
        neighbourhoods: [
          "Unionville",
          "Markham Village",
          "Cornell",
          "Milliken",
          "Berczy Village",
          "Cathedraltown",
          "Thornhill (côté Markham)",
        ],
        homes: [
          "Markham compte beaucoup de maisons en rangée et de maisons en rangée superposées, plus des condos autour de Downtown Markham et de l'autoroute 7.",
          "Dans une maison en rangée, le lavage est souvent dans un placard à l'étage ou au sous-sol. Les escaliers changent la livraison. Dites-nous combien d'étages, et à quel point les virages sont serrés.",
        ],
        checklist: [
          "L'étage du lavage, et le nombre d'escaliers",
          "La largeur et la hauteur du placard",
          "La prise de la sécheuse : 3 ou 4 broches",
          "Une photo de l'espace et des escaliers",
        ],
      },
      "richmond-hill": {
        name: "Richmond Hill",
        teaser: "Des maisons d'Oak Ridges à Langstaff. Des tours de condos le long de Yonge Street.",
        metaTitle: "Location laveuse et sécheuse Richmond Hill | {setPrice}/sem.",
        metaDescription:
          "Location de laveuse et sécheuse à Richmond Hill et Oak Ridges : {setPrice}/sem. l'ensemble, {singlePrice} un appareil. Réparations incluses. Appelez le {phone}.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout Richmond Hill, y compris Oak Ridges, Mill Pond, Bayview Hill, Richvale et Jefferson.",
        neighbourhoods: ["Oak Ridges", "Mill Pond", "Bayview Hill", "Richvale", "Jefferson", "Langstaff", "Elgin Mills"],
        homes: [
          "Richmond Hill va des maisons individuelles avec lavage au sous-sol aux tours de condos sur Yonge Street et près de l'autoroute 7.",
          "Maison? Deux appareils côte à côte entrent en général. Placard de condo? Pensez à un ensemble superposable ou à un centre de lavage monobloc.",
        ],
        checklist: [
          "Maison ou condo, et l'emplacement du lavage",
          "La largeur de l'espace",
          "La prise de la sécheuse : 3 ou 4 broches",
          "L'ancien appareil à reprendre, s'il y en a un",
        ],
      },
    },
    districts: {
      "north-york": {
        name: "North York",
        metaTitle: "Location laveuse et sécheuse North York | {setPrice}/sem.",
        metaDescription:
          "Louez une laveuse et une sécheuse à North York, de Willowdale et Don Mills à Downsview : {setPrice}/sem. l'ensemble, {singlePrice} un appareil.",
        teaser: "Des tours de condos sur Yonge Street. Des maisons avec lavage au sous-sol dans les rues voisines.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout North York, de Willowdale et Bayview Village à Don Mills, Downsview et Bathurst Manor.",
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
          "North York a deux sortes d'espaces de lavage. Le long de Yonge Street, surtout près de North York Centre et de Sheppard Avenue, beaucoup de gens vivent en condo, avec un placard de lavage dans le logement. À l'écart des grandes artères, beaucoup de logements sont des maisons avec lavage au sous-sol.",
          "Il y a aussi beaucoup d'immeubles d'appartements locatifs plus anciens. Certains ont une salle de lavage commune et aucun raccordement dans les logements. Vérifiez avec votre propriétaire avant de réserver.",
        ],
        fits: {
          stackable: "Placards de condo étroits et hauts près de Yonge Street et de Sheppard Avenue.",
          "laundry-centre": "Placards de condo conçus pour un appareil monobloc.",
          "side-by-side-top-load": "Coins lavage au sous-sol des maisons.",
          "single-machine": "Quand l'un de vos appareils fonctionne encore.",
        },
        checklist: [
          "Condo : la largeur, la profondeur et la hauteur du placard, et la réservation de l'ascenseur de service",
          "Maison : l'escalier du sous-sol et les portes à franchir pour descendre",
          "Appartement : si votre logement a ses propres raccordements",
          "La prise de la sécheuse : 3 ou 4 broches",
        ],
      },
      etobicoke: {
        name: "Etobicoke",
        metaTitle: "Location laveuse et sécheuse Etobicoke | {setPrice}/sem.",
        metaDescription:
          "Louez une laveuse et une sécheuse à Etobicoke, de Humber Bay Shores et Mimico à Rexdale : {setPrice}/sem. l'ensemble, {singlePrice} un appareil.",
        teaser: "Des condos au bord du lac, des maisons avec lavage au sous-sol et des immeubles d'appartements.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout Etobicoke, de Humber Bay Shores, Mimico et Long Branch jusqu'à Islington Village et Rexdale.",
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
          "Beaucoup de tours de condos d'Etobicoke se trouvent au bord du lac, à Humber Bay Shores, ou près des stations Islington et Kipling. Leur lavage est en général un placard étroit.",
          "Le reste est en grande partie fait de maisons, du bungalow à la maison à deux étages, plus des immeubles d'appartements bas et hauts. Dans une maison, le lavage est souvent au sous-sol, où deux appareils pleine grandeur côte à côte ont en général la place.",
        ],
        fits: {
          stackable: "Placards de condo au bord du lac et près du métro.",
          "side-by-side-front-load": "Salles de lavage au sous-sol avec la place pour ouvrir les deux portes.",
          "side-by-side-top-load": "Sous-sols avec de l'espace libre au-dessus de la laveuse pour le couvercle.",
          "single-machine": "Jumeler avec une laveuse ou une sécheuse que vous avez déjà.",
        },
        checklist: [
          "Condo : la largeur et la hauteur du placard, et la réservation de l'ascenseur de service",
          "Maison : l'escalier du sous-sol et le virage en bas",
          "La prise de la sécheuse : 3 ou 4 broches",
          "L'emplacement de l'ancien appareil, si vous voulez qu'on le reprenne",
        ],
      },
      scarborough: {
        name: "Scarborough",
        metaTitle: "Location laveuse et sécheuse Scarborough | {setPrice}/sem.",
        metaDescription:
          "Louez une laveuse et une sécheuse à Scarborough, d'Agincourt et Malvern à Guildwood : {setPrice}/sem. l'ensemble, {singlePrice} un appareil.",
        teaser: "Surtout des maisons et des maisons en rangée, plus des tours d'appartements et des condos récents.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout Scarborough, y compris Agincourt, Malvern, Wexford, Guildwood, Birch Cliff et West Hill.",
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
          "Scarborough est en grande partie fait de maisons individuelles, de maisons jumelées et de maisons en rangée. Le lavage est en général au sous-sol ou dans une petite pièce au rez-de-chaussée. Deux appareils pleine grandeur côte à côte entrent souvent.",
          "Scarborough compte aussi beaucoup de tours d'appartements et quelques condos récents, notamment autour du Scarborough Town Centre. Vous louez un appartement au sous-sol? Demandez à votre propriétaire quels raccordements d'eau, de drain et d'électricité vous pouvez utiliser.",
        ],
        fits: {
          "side-by-side-top-load": "Salles de lavage au sous-sol ou au rez-de-chaussée des maisons.",
          "side-by-side-front-load": "Familles nombreuses qui lavent souvent la literie et les serviettes.",
          "laundry-centre": "Appartements et condos avec un petit placard de lavage.",
          "single-machine": "Quand la maison a déjà l'un des deux appareils.",
        },
        checklist: [
          "Les raccordements que vous pouvez utiliser, si vous louez une partie d'une maison",
          "L'escalier : combien de marches, quelle largeur, et les virages serrés",
          "La prise de la sécheuse : 3 ou 4 broches",
          "S'il vous faut un ensemble ou un seul appareil",
        ],
      },
      "east-york": {
        name: "East York",
        metaTitle: "Location laveuse et sécheuse East York | {setPrice}/sem.",
        metaDescription:
          "Louez une laveuse et une sécheuse à East York, Leaside et Thorncliffe Park : {setPrice}/sem. l'ensemble, {singlePrice} un appareil. Réparations incluses.",
        teaser: "Des maisons à Leaside et Pape Village. Des tours d'appartements à Thorncliffe Park.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout East York, y compris Leaside, Thorncliffe Park, Pape Village, Woodbine Heights et Crescent Town.",
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
          "East York mêle des rues tranquilles de maisons, comme à Leaside et Pape Village, et des tours d'appartements à Thorncliffe Park et Crescent Town.",
          "Une maison ancienne peut avoir un escalier de sous-sol étroit et raide. Mesurez-le avec l'espace de lavage. En appartement, vérifiez d'abord que votre logement a des raccordements pour laveuse et sécheuse.",
        ],
        fits: {
          "side-by-side-top-load": "Coins lavage au sous-sol des maisons.",
          stackable: "Sous-sols exigus où deux appareils côte à côte n'entrent pas.",
          "laundry-centre": "Appartements avec un placard de lavage.",
          "single-machine": "Remplacer un appareil d'un vieil ensemble.",
        },
        checklist: [
          "L'escalier du sous-sol : sa largeur, et les virages",
          "L'espace de lavage : largeur, profondeur et hauteur",
          "Appartement : si votre logement a les raccordements d'eau, de drain et d'électricité",
          "La prise de la sécheuse : 3 ou 4 broches",
        ],
      },
      york: {
        name: "York",
        metaTitle: "Location laveuse et sécheuse York, Toronto | {setPrice}/sem.",
        metaDescription:
          "Louez une laveuse et une sécheuse à York, Toronto, y compris Weston et Mount Dennis : {setPrice}/sem. l'ensemble, {singlePrice} un appareil.",
        teaser: "Des maisons anciennes avec sous-sol. Des immeubles d'appartements sur les grandes artères.",
        intro:
          "Nous louons des laveuses et des sécheuses dans tout York, l'ancienne Ville de York au nord-ouest du centre-ville, y compris Weston, Mount Dennis, Fairbank et Oakwood Village.",
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
          "York est en grande partie fait de maisons individuelles et jumelées anciennes, dont beaucoup ont le lavage au sous-sol. Des immeubles d'appartements bordent de grandes artères comme Weston Road et Eglinton Avenue West.",
          "Certaines maisons y sont divisées en logements. Vous en louez un? Demandez à votre propriétaire quels raccordements vous pouvez utiliser et si une sécheuse peut évacuer vers l'extérieur.",
        ],
        fits: {
          "side-by-side-front-load": "Salles de lavage au sous-sol des maisons.",
          "side-by-side-top-load": "Ceux qui préfèrent ne pas se pencher pour charger la laveuse.",
          stackable: "Espaces étroits dans un logement qui fait partie d'une maison.",
          "single-machine": "Jumeler avec l'appareil déjà au sous-sol.",
        },
        checklist: [
          "L'escalier du sous-sol et les portes : leur largeur",
          "Les raccordements que vous pouvez utiliser, si la maison est divisée en logements",
          "La prise de la sécheuse : 3 ou 4 broches",
          "Une photo de l'espace, envoyée par texto",
        ],
      },
    },
    index: {
      eyebrow: "Toronto et le GTA",
      title: "Où nous livrons",
      checkTitle: "Livrons-nous chez vous?",
      lead: "Nous livrons dans tout Toronto et dans cinq villes autour. Vérifiez votre code postal, ou trouvez votre secteur ci-dessous.",
      samePrice: "Même prix dans tous les secteurs : {setPrice} par semaine pour un ensemble, {singlePrice} pour un appareil.",
      fartherText: "Plus loin? Envoyez-nous votre adresse par texto. Nous vous le dirons.",
      torontoTitle: "Toronto",
      torontoLead:
        "Tout Toronto. North York, Etobicoke, Scarborough, East York et York ont chacun leur page.",
      wholeCity: "Toute la ville",
      district: "District de Toronto",
      aroundTitle: "Autour de Toronto",
      aroundLead: "À l'ouest dans la région de Peel et au nord dans la région de York.",
    },
    page: {
      mapLabel: "{place} sur la carte des secteurs desservis",
      aboutHomes: "Les logements à {place}",
      cityEyebrow: "{place} · {company}",
      districtEyebrow: "{place} · Toronto",
      title: "Location de laveuse et sécheuse à {place}",
      priceLabel: "par semaine pour un ensemble laveuse et sécheuse",
      otherPrice: "ou {singlePrice} par semaine pour un appareil",
      otherAreasLabel: "Autres secteurs",
      torontoDistricts: "Districts de Toronto",
      otherAreas: "Autres secteurs desservis",
      otherToronto: "Autres parties de Toronto",
      aroundToronto: "Autour de Toronto",
      allOfToronto: "Tout Toronto",
      ctaTitle: "Prêt à louer à {place}?",
      fitsTitle: "Les appareils qui entrent habituellement à {place}",
      yorkNote: "Cette page porte sur York, à Toronto. Vous cherchez la région de York? Voir {cities}.",
      listAnd: " et ",
      listComma: ", ",
      localTitle: "Le lavage dans les logements de {place}",
      localAreas: "Les secteurs de {place} où nous livrons",
      beforeYouCall: "Avant d'appeler, vérifiez",
      notSure: "Vous hésitez? Envoyez une photo par texto au {phoneLink}. Nous vous dirons ce qui convient.",
      deliveryTitle: "Livrons-nous chez vous?",
      deliveryLead:
        "Entrez votre code postal. Pas clair? Envoyez-nous votre adresse par texto et nous confirmerons.",
    },
    districtsLabel: "Districts de Toronto",
  },

  faq: {
    groups: {
      renting: "Location",
      "prices-and-payment": "Prix et paiement",
      "delivery-and-installation": "Livraison et installation",
      repairs: "Réparations",
      "for-landlords": "Propriétaires",
      "first-week-free-offer": "Première semaine gratuite",
    },
    items: {
      "minimum-term": {
        question: "Quelle est la durée de la location?",
        answer:
          "{minWeeks} semaines minimum, puis à la semaine. Chaque partie peut y mettre fin avec un préavis de {noticeDays} jours. Nous venons reprendre l'appareil.",
      },
      ending: {
        question: "Comment mettre fin à ma location?",
        answer:
          "Écrivez-nous par texto au {phone}. Après le minimum de {minWeeks} semaines, chaque partie peut y mettre fin avec un préavis de {noticeDays} jours. Nous venons reprendre l'appareil.",
      },
      "machine-types": {
        question: "Quels appareils puis-je louer?",
        answer:
          "Un ensemble superposable, un centre de lavage monobloc, deux appareils côte à côte (à chargement frontal ou par le haut), ou un seul appareil : une laveuse ou une sécheuse.",
        link: "Comparer les types d'appareils",
      },
      "new-machines": {
        question: "Les appareils sont-ils neufs?",
        answer: "Non. Ils sont usagés et en bon état de marche. Nous vérifions chacun avant qu'il parte.",
      },
      brands: {
        question: "Quelles marques avez-vous?",
        answer:
          "Ce qui convient à votre espace et qui est disponible : GE, Whirlpool, Samsung, LG, Frigidaire, Maytag, Kenmore et d'autres.",
      },
      "credit-check": {
        question: "Vérifiez-vous le crédit?",
        answer: "Non. Il n'y a aucune vérification de crédit.",
      },
      "other-appliances": {
        question: "Louez-vous d'autres électroménagers, ou vendez-vous des appareils?",
        answer: "Non. Nous louons seulement des laveuses et des sécheuses.",
      },
      languages: {
        question: "Quelles langues parlez-vous?",
        answer: "L'anglais, l'espagnol et le russe.",
      },
      price: {
        question: "Combien ça coûte?",
        answer:
          "{setPrice} par semaine pour un ensemble, ou {singlePrice} par semaine pour un appareil, en dollars canadiens. La location est facturée chaque semaine, le même jour.",
      },
      tax: {
        question: "Les prix comprennent-ils les taxes?",
        answer: "Nous ne facturons pas de TVH. Le prix hebdomadaire est ce que vous payez.",
      },
      deposit: {
        question: "Y a-t-il un dépôt?",
        answer: "Oui, {deposit}. Il vous est rendu quand l'appareil nous revient en état de marche.",
      },
      payment: {
        question: "Comment puis-je payer?",
        answer:
          "Virement Interac ou carte de crédit. Pour la carte, utilisez le lien de paiement que nous envoyons avec votre soumission.",
      },
      referral: {
        question: "Avez-vous une offre de recommandation?",
        answer: "Oui. {referralText}",
      },
      "space-needs": {
        question: "Que me faut-il dans mon espace de lavage?",
        answer:
          "De l'eau chaude et froide, un drain et la bonne prise. La plupart des sécheuses électriques ont besoin d'une prise de 240 V, à 3 ou 4 broches. Une sécheuse à évacuation a aussi besoin d'un conduit vers l'extérieur. Envoyez une photo et nous vérifierons.",
        link: "Comment mesurer votre espace de lavage",
      },
      "delivery-cost": {
        question: "Combien coûtent la livraison et l'installation?",
        answer:
          "Nous vous donnons le prix avant que vous payiez. Il dépend de la distance, de l'étage, des escaliers ou de l'ascenseur et des raccordements.",
      },
      "delivery-time": {
        question: "En combien de temps pouvez-vous livrer?",
        answer: "En général la même semaine. Nous confirmons la date avec votre soumission.",
      },
      installation: {
        question: "Que comprend l'installation?",
        answer: "Nous vérifions l'espace. Nous branchons la sécheuse sur sa propre prise de 240 volts (3 ou 4 broches). Nous installons un conduit d'évacuation métallique de 4 pouces vers l'extérieur, fixé par un collier aux deux bouts, sans pli : un conduit écrasé est un risque d'incendie. Nous raccordons l'eau chaude et froide et le drain, mettons l'appareil de niveau et faisons un cycle d'essai avant de partir.",
      },
      condo: {
        question: "Pouvez-vous livrer dans un condo?",
        answer:
          "Oui. Indiquez-nous la taille du placard et s'il y a un ascenseur de service. Nous planifions la livraison.",
        link: "Liste de vérification pour condo",
      },
      "haul-away": {
        question: "Reprenez-vous mon ancien appareil?",
        answer: "Oui, sans frais, quand nous livrons le nôtre.",
      },
      areas: {
        question: "Où livrez-vous?",
        answer:
          "À Toronto, y compris North York, Etobicoke, Scarborough, East York et York, ainsi qu'à Mississauga, Brampton, Vaughan, Markham et Richmond Hill. Plus loin? Demandez-nous.",
        link: "Vérifier votre code postal",
      },
      breaks: {
        question: "Et si l'appareil brise?",
        answer:
          "Appelez-nous ou écrivez-nous par texto. Nous le réparons ou le remplaçons sans frais.",
      },
      "repair-request": {
        question: "Comment demander une réparation?",
        answer:
          "Appelez ou écrivez par texto au {phone}, ou envoyez le formulaire de réparation avec votre adresse et le problème. Les réparations sont incluses pendant la location.",
        link: "Demander une réparation",
      },
      damage: {
        question: "Toutes les réparations sont-elles incluses?",
        answer:
          "Les réparations dues à un usage normal sont incluses. Les dommages au-delà de l'usure normale sont la responsabilité du locataire.",
      },
      "landlord-options": {
        question: "Comment les propriétaires travaillent-ils avec vous?",
        answer:
          "De deux façons. Vos locataires louent directement chez nous : vous ne payez rien, vous autorisez seulement l'installation. Ou vous louez les appareils pour vos logements : prix courant de {setPrice} par semaine par ensemble. À partir de {quoteUnits} logements, nous faisons une soumission par immeuble après l'avoir visité. Les réparations sont incluses dans les deux cas.",
        link: "Laveuses et sécheuses pour propriétaires",
      },
      "landlord-quote": {
        question: "Comment un propriétaire obtient-il une soumission?",
        answer:
          "Envoyez le formulaire de soumission pour propriétaires avec l'adresse, le nombre de logements et ce qui s'y trouve maintenant. Ou appelez ou écrivez par texto au {phone}.",
        link: "Formulaire de soumission pour propriétaires",
      },
      "first-week-free": {
        question: "Comment fonctionne la première semaine gratuite?",
        answer: "{promotionText}",
      },
      "first-week-free-costs": {
        question: "Avec la première semaine gratuite, que dois-je payer?",
        answer:
          "Le dépôt remboursable de {deposit} et la livraison. Dès la deuxième semaine, la location hebdomadaire est facturée normalement.",
      },
    },
    page: {
      eyebrow: "FAQ",
      title: "Questions et réponses",
      lead: "Location, prix, livraison, réparations et propriétaires. D'autres questions? Appelez ou écrivez par texto au {phoneLink}.",
      topics: "Sujets",
    },
  },

  landlords: {
    eyebrow: "Pour les propriétaires",
    title: "Du lavage pour vos logements locatifs",
    lead: "Deux façons d'ajouter le lavage à vos logements. Dans les deux cas, nous installons, reprenons les anciens appareils et incluons les réparations.",
    option: "Option {number}",
    options: [
      {
        title: "Vos locataires louent chez nous",
        headline: "Vous ne payez rien",
        points: [
          "Chaque locataire loue chez nous et nous paie directement.",
          "Vous ne payez rien.",
          "Vous autorisez seulement l'installation.",
          "Réparations incluses pendant la location du locataire.",
        ],
      },
      {
        title: "Vous louez les appareils pour vos logements",
        headline: "{setPrice} par semaine par ensemble, prix courant",
        points: [
          "Vous louez les appareils et incluez le lavage dans le logement.",
          "Prix courant : {setPrice} par semaine par ensemble.",
          "À partir de {quoteUnits} logements, nous faisons une soumission par immeuble après l'avoir visité.",
          "Réparations incluses pendant la location.",
        ],
      },
    ],
    optionsTitle: "Deux façons de travailler avec nous",
    includedTitle: "Inclus dans les deux cas",
    includedLead: "La livraison et l'installation sont chiffrées pour chaque travail, avant tout paiement.",
    included: [
      "Installation : nous raccordons l'eau, le drain, l'électricité et le conduit d'évacuation, puis faisons un cycle d'essai.",
      "Reprise des anciens appareils sans frais.",
      "Réparations ou appareil de remplacement, sans frais.",
      "Des appareils usagés, chacun vérifié avant de partir.",
    ],
    stepsTitle: "Comment ça se passe pour un immeuble",
    steps: [
      {
        title: "Parlez-nous de l'immeuble",
        text: "L'adresse, le nombre de logements et ce qui s'y trouve maintenant : aucun appareil, des anciens à remplacer, ou seulement les raccordements.",
      },
      {
        title: "Nous visitons l'immeuble",
        text: "À partir de {quoteUnits} logements, nous vérifions les espaces de lavage et les raccordements avant la soumission.",
      },
      {
        title: "Vous recevez une soumission",
        text: "Les locataires qui louent directement reçoivent chacun leur soumission. Si vous louez les appareils, vous en recevez une pour l'immeuble.",
      },
      {
        title: "Nous installons",
        text: "Nous livrons, raccordons chaque appareil, faisons un cycle d'essai et reprenons les anciens.",
      },
      {
        title: "Les réparations, tant qu'ils sont là",
        text: "Un appareil a besoin d'une réparation? Appelez-nous ou écrivez-nous par texto. Nous le réparons ou le remplaçons sans frais.",
      },
    ],
    startWithQuote: "Obtenir votre soumission",
    unitNeedsTitle: "Ce qu'il faut dans chaque logement",
    unitNeedsNote: "Dites-nous ce que chaque logement a. Nous vous dirons ce qui convient.",
    faqTitle: "Questions des propriétaires",
    faqs: [
      {
        question: "Est-ce que je paie quelque chose si mes locataires louent chez vous?",
        answer: "Non. Le locataire loue et nous paie. Vous autorisez l'installation.",
      },
      {
        question: "Combien ça coûte si je loue les appareils?",
        answer:
          "Prix courant : {setPrice} par semaine par ensemble. À partir de {quoteUnits} logements, nous faisons une soumission par immeuble après l'avoir visité. La livraison et l'installation sont chiffrées avant que vous payiez.",
      },
      {
        question: "Qui s'occupe des réparations?",
        answer:
          "Appelez ou écrivez par texto au {phone}. Les réparations sont incluses dans les deux options.",
      },
      {
        question: "Et si un logement n'a pas de raccordements?",
        answer:
          "Chaque logement a besoin d'eau chaude et froide, d'un drain, de la bonne prise et, pour une sécheuse à évacuation, d'un conduit vers l'extérieur. Dites-nous ce que chaque logement a. Nous vous dirons ce qui convient.",
      },
      {
        question: "Mes locataires doivent-ils passer une vérification de crédit?",
        answer: "Non. Il n'y a aucune vérification de crédit.",
      },
      {
        question: "Pouvez-vous reprendre les anciens appareils?",
        answer: "Oui. Nous reprenons les anciens appareils sans frais quand nous installons les nôtres.",
      },
      {
        question: "Quels secteurs desservez-vous?",
        answer: "Toronto, Mississauga, Brampton, Vaughan, Markham et Richmond Hill. Plus loin? Demandez-nous.",
      },
    ],
    moreAnswers: "D'autres réponses dans la {faqLink}.",
    faqLink: "page FAQ",
    ctaTitle: "Obtenez une soumission pour votre immeuble",
    ctaText: "Envoyez l'adresse, le nombre de logements et ce qui s'y trouve maintenant.",
    buildingsNote: "Une salle de lavage commune dans l'immeuble? {buildingsLink}.",
    buildingsLink: "Voir les options de salles de lavage",
    quote: {
      eyebrow: "Pour les propriétaires",
      title: "Obtenez une soumission pour votre immeuble",
      lead: "Parlez-nous de l'immeuble et des logements. Dans les logements, les locataires louent directement chez nous ou vous louez les appareils. Dans une salle de lavage commune, l'immeuble loue les appareils ou les résidents paient à la brassée.",
      howOptionsWork: "Comment fonctionnent les deux options",
      nextTitle: "La suite",
      next: [
        "Nous lisons votre demande et vous appelons ou vous écrivons par texto.",
        "À partir de {quoteUnits} logements, nous réservons un moment pour visiter l'immeuble.",
        "Vous recevez une soumission avant toute installation.",
      ],
      formTitle: "Votre immeuble",
      address: "Adresse de l'immeuble ou ville",
      units: "Nombre de logements",
      setup: "Ce qui s'y trouve maintenant",
      // Option labels only: the form posts the English text (shared/forms).
      setupOptions: {
        none: "Aucun appareil",
        replace: "De vieux appareils à remplacer",
        hookupsOnly: "Seulement les raccordements",
      },
      machineType: "Type d'appareil",
      notSure: "Je ne sais pas",
      differentEachUnit: "Différent dans chaque logement",
      option: "Comment vous aimeriez procéder",
      optionChoices: {
        tenants: "Mes locataires louent directement",
        landlord: "Je loue les appareils pour mes logements",
        laundryRoomRent: "Salle de lavage commune : l'immeuble loue les appareils",
        laundryRoomPerLoad: "Salle de lavage commune : les résidents paient à la brassée",
        notSure: "Je ne sais pas encore",
      },
      notesHint:
        "Par exemple : l'emplacement du lavage dans chaque logement, escaliers ou ascenseur, un bon moment pour visiter l'immeuble.",
      submit: "Envoyer la demande de soumission",
      sent: "Demande de soumission envoyée.",
      subject: "Demande de soumission de propriétaire — {name}",
      errors: {
        address: "Entrez l'adresse ou la ville.",
        unitsMissing: "Entrez le nombre de logements.",
        unitsInvalid: "Entrez un nombre entier, 1 ou plus.",
        setup: "Choisissez ce qui s'y trouve maintenant.",
        option: "Choisissez comment vous aimeriez procéder.",
      },
    },
  },
  buildings: {
    eyebrow: "Pour les immeubles résidentiels",
    title: "Des appareils pour votre salle de lavage",
    lead: "Pour les immeubles d'appartements et de condos qui ont une salle de lavage commune. Nous fournissons, installons et réparons les appareils. Deux formules, avec soumission par immeuble après avoir vu la salle.",
    option: "Option {number}",
    options: [
      {
        title: "L'immeuble loue les appareils",
        headline: "Soumission par immeuble",
        points: [
          "L'immeuble loue les appareils pour sa salle de lavage.",
          "L'immeuble décide comment les résidents les utilisent.",
          "Nous faisons la soumission après avoir vu la salle.",
          "Réparations incluses pendant la location.",
        ],
      },
      {
        title: "Les résidents paient à la brassée",
        headline: "Sans frais pour l'immeuble",
        points: [
          "Nous fournissons les appareils sans frais pour l'immeuble.",
          "Les résidents paient à la brassée.",
          "L'immeuble reçoit une part de ce que rapportent les appareils. Nous convenons de cette part avant l'installation.",
          "Réparations incluses.",
        ],
      },
    ],
    optionsTitle: "Deux façons de l'organiser",
    includedTitle: "Inclus dans les deux cas",
    includedLead: "La livraison et l'installation sont dans la soumission, avant que rien ne soit installé.",
    included: [
      "Nous voyons d'abord la salle et vous disons ce qui convient.",
      "Installation : nous raccordons l'eau, le drain, l'électricité et l'évent, puis faisons un cycle d'essai.",
      "Vieux appareils enlevés sans frais.",
      "Réparations ou appareil de remplacement, sans frais.",
    ],
    stepsTitle: "Comment ça fonctionne",
    steps: [
      {
        title: "Parlez-nous de l'immeuble",
        text: "L'adresse, le nombre de logements et ce qu'il y a maintenant dans la salle de lavage.",
      },
      {
        title: "Nous voyons la salle de lavage",
        text: "Nous vérifions l'espace, les raccordements et combien d'appareils elle peut accueillir.",
      },
      {
        title: "Vous recevez une soumission",
        text: "Pour l'option de votre choix : l'immeuble loue les appareils, ou les résidents paient à la brassée.",
      },
      {
        title: "Nous installons",
        text: "Nous livrons, raccordons chaque appareil, faisons un cycle d'essai et enlevons les anciens.",
      },
      {
        title: "Réparations tant qu'ils sont là",
        text: "Un appareil a besoin d'une réparation? Appelez-nous ou textez-nous. Nous le réparons ou le remplaçons sans frais.",
      },
    ],
    startWithQuote: "Obtenir votre soumission",
    inSuiteTitle: "Plutôt des appareils dans chaque logement?",
    inSuiteText: "Les logements ont leurs propres raccordements? Les locataires peuvent louer directement chez nous, ou vous louez des appareils pour les logements.",
    inSuiteLink: "Voir les options pour propriétaires",
    faqTitle: "Questions sur les immeubles",
    faqs: [
      {
        question: "Combien ça coûte?",
        answer: "Nous faisons une soumission par immeuble après avoir vu la salle de lavage. La livraison et l'installation sont dans la soumission, avant toute installation.",
      },
      {
        question: "Comment fonctionne l'option du paiement à la brassée?",
        answer: "Nous fournissons les appareils sans frais pour l'immeuble. Les résidents paient à la brassée. L'immeuble reçoit une part de ce que rapportent les appareils, convenue avant l'installation.",
      },
      {
        question: "Quels appareils installez-vous?",
        answer: "Ça dépend de l'espace, des raccordements et du nombre de résidents qui l'utilisent. Nous vous disons ce qui convient après l'avoir vue.",
      },
      {
        question: "Qui s'occupe des réparations?",
        answer: "Appelez ou textez le {phone}. Les réparations sont incluses dans les deux options.",
      },
      {
        question: "Pouvez-vous enlever les vieux appareils?",
        answer: "Oui. Nous enlevons les vieux appareils sans frais quand nous installons les nôtres.",
      },
      {
        question: "Quels secteurs desservez-vous?",
        answer: "Toronto, Mississauga, Brampton, Vaughan, Markham et Richmond Hill. Plus loin? Demandez-nous.",
      },
    ],
    ctaTitle: "Demandez une soumission pour votre salle de lavage",
    ctaText: "Envoyez l'adresse, le nombre de logements et ce qu'il y a maintenant dans la salle de lavage.",
  },

  about: {
    eyebrow: "À propos de nous",
    title: "À propos de {company}",
    lead: "{company} est une entreprise locale de Toronto. Nous avons plus de {experienceYears} ans d'expérience pratique à installer et réparer des laveuses et des sécheuses.",
    howWeWork: "Notre façon de travailler",
    whatWeDo: "Ce que nous faisons",
    whatWeDoItems: [
      "Nous louons des laveuses et des sécheuses à Toronto et dans le GTA : ensembles superposables, centres de lavage monoblocs, appareils côte à côte, ou une laveuse ou une sécheuse seule.",
      "Nous faisons seulement de la location. Nous ne vendons pas d'appareils et ne louons pas d'autres électroménagers.",
      "Nos appareils sont usagés, vérifiés et en bon état de marche. La marque et le modèle dépendent de ce qui est disponible.",
      "La location coûte {setPrice} par semaine pour un ensemble, {singlePrice} par semaine pour un appareil. Réparations et reprise de l'ancien appareil incluses.",
    ],
    readMore: "En savoir plus",
    links: {
      machines: "Types d'appareils",
      prices: "Prix",
      areas: "Où nous livrons",
      landlords: "Pour les propriétaires",
      faq: "FAQ",
    },
    talkTitle: "Parlez-nous",
    talkText: "{phone}. Du lundi au samedi, de {opens} à {closes}. Fermé le dimanche.",
    contactPage: "Page de contact",
  },

  contact: {
    eyebrow: "Appel ou texto",
    title: "Nous joindre",
    lead: "Un appel ou un texto, c'est le plus rapide. Ou envoyez le formulaire ci-dessous. Nous répondons avec l'appareil, le total et la date de début.",
    reachLabel: "Comment nous joindre",
    phoneTitle: "Téléphone et texto",
    hours: "Heures d'ouverture",
    languages: "Langues",
    weSpeak: "Nous parlons {languages}.",
    whereTitle: "Où nous livrons",
    somethingElse: "Autre chose?",
    other: [
      { title: "Votre appareil loué a besoin d'une réparation", label: "Demander une réparation" },
      { title: "Vous êtes propriétaire", label: "Soumission pour propriétaires" },
      { title: "D'abord une question", label: "Questions et réponses" },
    ],
  },

  repair: {
    eyebrow: "Pour les clients qui louent chez nous",
    title: "Demander une réparation",
    lead: "Un appareil ne fonctionne pas bien? Les réparations sont incluses pendant la location. Nous le réparons ou le remplaçons sans frais.",
    sectionLabel: "Demande de réparation",
    photoTitle: "Envoyez une photo du problème",
    photoText: "Une photo ou une courte vidéo nous aide à voir ce qui ne va pas avant de venir.",
    photoButton: "Envoyer une photo par texto",
    photoBody: "Demande de réparation – mon adresse : ",
    fastest: "Le plus rapide : appel ou texto",
    leakTitle: "Une fuite d'eau?",
    leakText: "Fermez les robinets derrière la laveuse si vous pouvez les atteindre sans danger. Puis appelez-nous.",
    helpsTitle: "Ce qui nous aide",
    helps: [
      "Ce que l'appareil fait, ou ne fait pas",
      "Un code d'erreur affiché à l'écran",
      "Depuis quand le problème dure",
      "Une photo ou une courte vidéo, envoyée par texto",
    ],
    damageNote:
      "Les réparations dues à un usage normal sont incluses. Les dommages au-delà de l'usure normale sont la responsabilité du locataire.",
    formTitle: "Quel est le problème?",
    address: "Adresse ou code postal",
    machine: "Appareil",
    // Option labels only: the form posts the English text (shared/forms).
    machineOptions: {
      washer: "Laveuse",
      dryer: "Sécheuse",
      stackable: "Ensemble superposable",
      laundryCentre: "Centre de lavage monobloc",
      notSure: "Je ne sais pas",
    },
    bestTime: "Meilleur moment pour vous joindre",
    timeOptions: { any: "N'importe quand", morning: "Matin", afternoon: "Après-midi", evening: "Soir" },
    problem: "Le problème",
    problemHint:
      "Par exemple : ne démarre pas, ne se vide pas, fuit, ne chauffe pas, un code d'erreur à l'écran.",
    submit: "Envoyer la demande de réparation",
    sent: "Demande de réparation envoyée.",
    sentNote: "Nous vous appellerons ou vous écrirons par texto pour organiser la réparation.",
    subject: "Demande de réparation — {name}",
    errors: {
      address: "Entrez votre adresse ou votre code postal.",
      problemMissing: "Dites-nous ce que fait l'appareil.",
      problemShort: "Donnez-nous un peu plus de détails sur le problème.",
    },
  },

  account: {
    eyebrow: "Pour les clients qui louent chez nous",
    title: "Payer ou gérer votre location",
    lead: "Les paiements par carte passent par Stripe. Nous ne voyons jamais votre numéro de carte complet.",
    sectionLabel: "Votre location",
    payTitle: "Payer par carte",
    payText: "Utilisez le lien de paiement Stripe de votre soumission. Vous ne le trouvez pas? Écrivez-nous par texto.",
    portalTitle: "Votre carte et vos reçus",
    portalText: "Changez de carte et consultez les reçus dans le portail client Stripe.",
    portalButton: "Ouvrir le portail client",
    endTitle: "Mettre fin à une location",
    endText:
      "Écrivez-nous par texto au {phone}. Après le minimum de {minWeeks} semaines, chaque partie peut mettre fin à la location avec un préavis de {noticeDays} jours. Nous venons reprendre l'appareil.",
    textUs: "Nous écrire par texto",
  },

  guides: {
    eyebrow: "Guides",
    title: "Guides pour louer une laveuse et une sécheuse",
    lead: "De courts guides pratiques pour louer une laveuse et une sécheuse à Toronto et dans le GTA.",
    listLabel: "Tous les guides",
    read: "Lire le guide",
    guideEyebrow: "Guide",
    byline: "Par {company} · Mis à jour le {date}",
    onThisPage: "Sur cette page",
    ctaText:
      "{setPrice} par semaine pour un ensemble laveuse et sécheuse, {singlePrice} pour un appareil. Réparations et reprise de l'ancien appareil incluses.",
    more: "Autres guides",
  },

  notFound: {
    title: "Page introuvable",
    text: "Cette page n'existe pas. Louez un ensemble laveuse et sécheuse pour {setPrice} par semaine, ou un appareil pour {singlePrice}.",
    home: "Aller à la page d'accueil",
  },

  error: {
    title: "Une erreur s'est produite",
    text: "Réessayez, ou appelez ou écrivez par texto au {phoneLink}.",
  },

  start: {
    eyebrow: "Commencer votre location",
    stepsLabel: "Étapes de la demande de location",
    stepOf: "Étape {step} sur {steps}",
    stepDone: ", terminée",
    back: "Retour à l'étape précédente",
    asideLabel: "Appeler ou écrire par texto à la place",
    steps: {
      machine: "Type d'appareil",
      details: "Votre espace",
      contact: "Comment vous joindre",
    },
    heads: {
      details: {
        title: "Votre espace : étape {step} sur {steps} | {company}",
        description:
          "Étape {step} de la demande de location : code postal, largeur du placard, prise de la sécheuse et accès.",
      },
      contact: {
        title: "Vous joindre : étape {step} sur {steps} | {company}",
        description: "Étape {step} de la demande de location : votre nom, votre numéro de téléphone et un jour préféré.",
      },
      done: {
        title: "Demande envoyée | {company}",
        description: "Votre demande de location est envoyée. Nous répondons avec l'appareil, le total et la date de début.",
      },
    },
    machine: {
      title: "De quel appareil avez-vous besoin?",
      intro:
        "Vous hésitez? Choisissez « Je ne sais pas encore ». Nous vous aidons à choisir selon la taille du placard et les raccordements. {link}",
      legend: "Type d'appareil",
      setNote: "{setPrice}/sem. pour l'ensemble",
      singleNote: "{singlePrice}/sem.",
      washerOnly: "Laveuse seulement",
      dryerOnly: "Sécheuse seulement",
      notSure: "Je ne sais pas encore",
      notSureNote: "Nous vous aiderons à choisir",
      next: "Suivant : votre espace",
      error: "Choisissez un type d'appareil, ou « Je ne sais pas encore ».",
    },
    details: {
      title: "Parlez-nous de votre espace",
      intro: "Votre choix : {machine}. Maintenant votre espace, pour que nous apportions un appareil qui entre.",
      postal: "Code postal",
      postalPlaceholder: "p. ex. M5V 2T6",
      width: "Largeur du placard ou de l'espace",
      widthPlaceholder: "p. ex. 24\" ou 61 cm",
      widthHint: "Vous ne savez pas? Écrivez « je ne sais pas ».",
      outlet: "Prise de la sécheuse",
      outlets: { "3-prong": "3 broches", "4-prong": "4 broches", "not-sure": "Je ne sais pas" },
      access: "Comment entrons-nous l'appareil?",
      accessChoices: {
        ground: { label: "Pas d'escalier", note: "Rez-de-chaussée ou une ou deux marches" },
        stairs: { label: "Escaliers", note: "Sous-sol ou étage, sans ascenseur" },
        elevator: { label: "Ascenseur", note: "Condo ou immeuble d'appartements" },
      },
      floor: "Étage ou logement",
      floorPlaceholder: "p. ex. 12e étage, sous-sol",
      floorHint: "Facultatif. Mentionnez les escaliers ou virages serrés dans les remarques à l'étape suivante.",
      next: "Suivant : comment vous joindre",
      errors: {
        postal: "Entrez votre code postal.",
        widthMissing: "Entrez la largeur de l'espace, ou écrivez « je ne sais pas ».",
        widthLong: "Restez bref, comme 24\" ou 61 cm.",
        outlet: "Choisissez la prise de la sécheuse, ou « Je ne sais pas ».",
        access: "Choisissez comment nous entrons l'appareil.",
        floorLong: "Restez bref, comme « 3e étage » ou « sous-sol ».",
      },
    },
    contact: {
      title: "Comment pouvons-nous vous joindre?",
      intro: "Nous répondons avec l'appareil, le total et la date de début.",
      summaryTitle: "Votre demande jusqu'ici",
      summary: {
        machine: "Appareil",
        postal: "Code postal",
        postalWithCity: "{postal} ({city})",
        width: "Largeur du placard",
        outlet: "Prise de la sécheuse",
        access: "Accès",
      },
      postalUnsure: "Le code postal ne suffit pas pour savoir votre secteur. Nous confirmerons par texto.",
      preferredDay: "Jour de livraison préféré",
      preferredDayHint: "Facultatif. Nous confirmons la date avec la soumission.",
      notesHint:
        "Par exemple : escaliers ou virages serrés, l'ancien appareil à reprendre, un bon moment pour appeler.",
      submit: "Envoyer la demande",
      errors: {
        date: "Choisissez une date.",
        dateEarly: "Choisissez aujourd'hui ou une date ultérieure.",
        notesLong: "Limitez les remarques à {max} caractères.",
      },
    },
    done: {
      title: "Demande envoyée.",
      thanks:
        "Merci, {name}. Nous appellerons ou écrirons par texto au {customerPhone} avec l'appareil, le total et la date de début.",
      photo: "Une photo de l'espace nous aide. Envoyez-la par texto au {phoneLink}.",
      textPhoto: "Envoyer une photo par texto",
      nextTitle: "La suite",
      next: [
        "On vous appelle ou vous texte avec l'appareil, le total et la date de début.",
        "Vous confirmez et payez par le lien sécurisé qu'on vous envoie.",
        "On livre, on branche et on fait un cycle d'essai.",
      ],
      home: "Retour à la page d'accueil",
    },
    email: {
      subject: "Nouvelle demande de location — {name}",
      areaUnsure: "Code postal incertain : confirmer par texto",
    },
  },
};

export default fr;
