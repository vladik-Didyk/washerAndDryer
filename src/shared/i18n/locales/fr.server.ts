// Canadian French server-only text: the guides (../index.server.ts merges this over ./en.server.ts),
// with the same keys and {placeholders} as English. Lists replace English whole, so each
// guide's `sections` is complete here, links and { include } / { offer } blocks included.
// The policies and llms.txt stay English-only.
import type { DeepPartial } from "../index";
import type { ServerText } from "../index.server";

const frServer: DeepPartial<ServerText> = {
  articles: {
    promotionParagraph: "{title}. {text} {stillPaid}",
    referralParagraph: "{title}. {text}",
  },

  guides: {
    "measure-your-laundry-space": {
      metaTitle: "Comment mesurer votre espace pour une laveuse et une sécheuse",
      metaDescription:
        "Ce qu'il faut mesurer avant de louer une laveuse et une sécheuse : l'espace, la place pour les raccordements et les portes, et le chemin d'accès. Et quoi nous envoyer pour une soumission.",
      title: "Comment mesurer votre espace de buanderie",
      summary:
        "Dix minutes avec un ruban à mesurer peuvent éviter une livraison inutile. Voici ce qu'il faut mesurer, où un appareil a besoin d'espace supplémentaire et quoi nous envoyer avant de louer.",
      sections: [
        {
          heading: "Ce dont vous avez besoin",
          blocks: [
            "Un ruban à mesurer, votre téléphone et de quoi écrire. Une deuxième personne aide pour les mesures en hauteur et pour garder le ruban bien droit.",
            "Mesurez en pouces. Les dimensions des laveuses et des sécheuses sont généralement données en pouces, vous n'aurez donc rien à convertir plus tard.",
          ],
        },
        {
          heading: "Mesurez l'espace",
          blocks: [
            "Prenez chaque mesure à l'endroit le plus étroit. Les murs sont rarement parfaitement droits, et un cadre de porte, un tuyau ou une plinthe peut vous enlever le pouce sur lequel vous comptiez.",
            {
              list: [
                "Largeur : d'un mur à l'autre, ou jusqu'au bord de l'ouverture du placard, là où c'est le plus étroit.",
                "Profondeur : du mur du fond jusqu'au bord avant du cadre du placard, ou jusqu'à l'endroit où une porte se fermerait.",
                "Hauteur : du plancher jusqu'à l'élément le plus bas au-dessus de l'espace, comme une tablette, une armoire, un tuyau ou le haut de l'ouverture.",
              ],
            },
            "Notez les trois chiffres comme largeur, profondeur et hauteur, et indiquez celui dont vous êtes le moins sûr.",
          ],
        },
        {
          heading: "Laissez de la place pour les raccordements et les portes",
          blocks: [
            "Une laveuse ou une sécheuse ne peut pas être collée au mur du fond. Les tuyaux d'eau, le tuyau de vidange, le cordon d'alimentation et le conduit d'évacuation de la sécheuse se branchent tous à l'arrière, alors laissez quelques pouces derrière les appareils.",
            "Laissez aussi un peu d'espace sur les côtés, pour que les appareils ne frottent pas contre les murs ni l'un contre l'autre pendant qu'ils fonctionnent.",
            "Pensez ensuite aux portes. Un appareil à chargement frontal a besoin d'espace devant pour que sa porte s'ouvre, et vous avez besoin de place pour vous tenir là et le remplir. Une laveuse à chargement par le haut a besoin d'espace libre au-dessus pour le couvercle. Si le placard de buanderie a ses propres portes, vérifiez qu'elles se ferment encore devant les appareils.",
          ],
        },
        {
          heading: "Mesurez le chemin d'accès",
          blocks: [
            "L'appareil doit d'abord se rendre jusqu'à l'espace avant d'y entrer. Parcourez le trajet de la porte d'entrée jusqu'à l'espace de buanderie et trouvez l'endroit le plus étroit :",
            {
              list: [
                "La porte d'entrée et les portes intérieures, mesurées porte ouverte",
                "Les couloirs et les coins serrés",
                "Les escaliers : combien de marches, quelle largeur, et s'il y a un tournant ou un palier",
                "Dans un immeuble en copropriété ou à logements : l'ascenseur de service, et la réservation dont vous aurez besoin",
              ],
            },
            "Un ensemble superposable arrive en deux appareils séparés, donc chaque morceau est plus petit à transporter. Un centre de lavage monobloc arrive en une seule unité haute.",
          ],
        },
        {
          heading: "Dimensions courantes",
          blocks: [
            "Les dimensions varient selon la marque et le modèle, alors voyez-les comme un point de départ, pas comme une promesse :",
            {
              list: [
                "Les appareils compacts mesurent généralement environ 24 pouces de largeur.",
                "Les appareils pleine grandeur mesurent généralement environ 27 pouces de largeur chacun. Une paire côte à côte demande environ 55 pouces de largeur, plus un peu d'espace entre et autour des appareils.",
                "Les centres de lavage monoblocs font 24 ou 27 pouces de largeur. Une unité de 24 pouces mesure environ 70 pouces de hauteur.",
                "Un ensemble superposable a la largeur d'un appareil et la hauteur de deux, alors vérifiez la hauteur sous toute tablette au-dessus de l'espace.",
              ],
            },
            "Si votre espace est proche de l'une de ces dimensions, envoyez-nous les mesures exactes. Nous les comparons avec l'appareil que nous avons pour vous avant le jour de la livraison.",
          ],
        },
        {
          heading: "Vérifiez les raccordements pendant que vous y êtes",
          blocks: [
            "Tant que vous avez le ruban à mesurer en main, regardez ce qu'il y a sur le mur derrière l'espace :",
            { include: "hookups" },
            "Si vous ne savez pas ce qu'est un élément, une photo suffit. Nous vous dirons ce que nous voyons.",
            {
              link: {
                href: "/guides/3-prong-vs-4-prong-dryer-outlet/",
                label: "Comment distinguer une prise de sécheuse à 3 broches d'une prise à 4 broches",
              },
            },
          ],
        },
        {
          heading: "Quoi nous envoyer",
          blocks: [
            "Envoyez ceci par texto au {phone} quand vous demandez une soumission :",
            {
              list: [
                "La largeur, la profondeur et la hauteur de l'espace",
                "La porte ou le tournant le plus étroit du chemin d'accès, et le nombre de marches",
                "Une photo de l'espace où l'on voit les raccordements",
                "Une photo rapprochée de la prise de la sécheuse",
              ],
            },
            "Avec cela, nous pouvons vous dire quel type d'appareil convient, et vous soumettre le prix de la livraison et de l'installation avant que vous payiez quoi que ce soit.",
            { link: { href: "/machines/", label: "Comparer les types d'appareils" } },
          ],
        },
      ],
    },
    "3-prong-vs-4-prong-dryer-outlet": {
      metaTitle: "Prise de sécheuse à 3 ou 4 broches : laquelle avez-vous?",
      metaDescription:
        "Comment distinguer une prise de sécheuse à 3 broches d'une prise à 4 broches, pourquoi c'est important pour une sécheuse en location, et pourquoi changer la prise ou le cordon est un travail d'électricien.",
      title: "Prise de sécheuse à 3 ou à 4 broches",
      summary:
        "La plupart des sécheuses électriques se branchent sur une grande prise de 240 volts à trois ou à quatre fentes. Voici comment savoir laquelle vous avez, pourquoi nous le demandons et ce qu'il ne faut pas faire si la fiche et la prise ne correspondent pas.",
      sections: [
        {
          heading: "Pourquoi nous vous demandons quelle prise vous avez",
          blocks: [
            "Une sécheuse électrique n'utilise pas une prise murale ordinaire. Son élément chauffant demande beaucoup plus d'électricité qu'une lampe ou un chargeur de téléphone, alors elle se branche sur une prise plus grande de 240 volts, et la fiche du cordon d'alimentation de la sécheuse doit correspondre à cette prise.",
            "Il existe deux types courants de prise de sécheuse : une à trois fentes et une à quatre fentes. Votre logement peut avoir l'une ou l'autre. Quand vous demandez une soumission, nous vous demandons laquelle vous avez pour que la sécheuse soit bien branchée le jour de la livraison.",
          ],
        },
        {
          heading: "Comment savoir laquelle vous avez",
          blocks: [
            {
              steps: [
                "Trouvez la prise derrière ou à côté de l'endroit où va la sécheuse. Elle est nettement plus grande qu'une prise ordinaire. Si une vieille sécheuse est encore branchée, regardez sa fiche plutôt que de la débrancher.",
                "Comptez les fentes. Trois fentes, c'est une prise à 3 broches. Quatre fentes, c'est une prise à 4 broches.",
                "Sur une prise à 4 broches, l'une des fentes est généralement arrondie ou en forme de U. C'est la mise à la terre. Une prise de sécheuse à 3 broches n'a pas de fente de mise à la terre distincte.",
                "Prenez une photo de face, assez près pour voir toutes les fentes, et envoyez-la-nous par texto. C'est la façon la plus rapide d'en être sûr.",
              ],
            },
          ],
        },
        {
          heading: "La laveuse, c'est différent",
          blocks: [
            "Une laveuse se branche sur une prise domestique ordinaire. Vérifiez qu'il y en a une près des robinets d'eau, à portée de l'endroit où sera la laveuse.",
            "Un centre de lavage monobloc avec sécheuse électrique a besoin du même type de prise de sécheuse de 240 volts, alors vérifiez-la de la même façon.",
          ],
        },
        {
          heading: "Si la fiche ne correspond pas à la prise",
          blocks: [
            {
              note: "Ne forcez pas une fiche dans une prise où elle n'entre pas, et n'utilisez pas d'adaptateur ni de rallonge pour la faire entrer. Une sécheuse consomme beaucoup d'électricité, et une mauvaise connexion peut surchauffer.",
            },
            "Il y a deux bonnes solutions : remplacer le cordon d'alimentation de la sécheuse par un cordon qui correspond à la prise, ou remplacer la prise pour qu'elle corresponde au cordon.",
            {
              list: [
                "Remplacer la prise veut dire travailler sur le câblage électrique de votre logement. Ce travail doit être fait par un électricien agréé.",
                "Le remplacement du cordon de la sécheuse doit être fait par un électricien agréé ou une autre personne qualifiée, en suivant les instructions du fabricant de la sécheuse.",
              ],
            },
            "Parlez-nous de votre prise quand vous demandez une soumission, pour que toute différence soit connue bien avant le jour de la livraison.",
          ],
        },
        {
          heading: "Aucune prise de 240 volts?",
          blocks: [
            "Certains espaces de buanderie ont l'eau et une vidange, mais pas de prise de sécheuse. En ajouter une demande un nouveau circuit à partir du panneau électrique, ce qui est aussi un travail d'électricien agréé. Si vous êtes locataire, c'est d'abord une question pour votre propriétaire, et dans un condo, aussi pour la gestion de l'immeuble.",
            "En attendant, vous pouvez quand même louer seulement une laveuse, pour {singlePrice} par semaine.",
            { link: { href: "/machines/single-machine/", label: "Laveuse seule ou sécheuse seule" } },
          ],
        },
        {
          heading: "Liste rapide",
          blocks: [
            {
              list: [
                "Comptez les fentes de la prise de la sécheuse : 3 ou 4",
                "Trouvez la prise ordinaire pour la laveuse",
                "Prenez une photo claire des deux",
                "Envoyez les photos par texto au {phone} avec votre demande de soumission",
              ],
            },
            "Avec ces photos, nous pouvons planifier la partie électrique de l'installation.",
            { link: { href: "/guides/measure-your-laundry-space/", label: "Comment mesurer votre espace de buanderie" } },
          ],
        },
      ],
    },
    "stackable-vs-laundry-centre": {
      metaTitle: "Laveuse et sécheuse superposables ou centre de lavage : lequel entre?",
      metaDescription:
        "Ensemble superposable ou centre de lavage monobloc? Comment ils se comparent pour l'espace, le chargement, les commandes et la livraison, et comment savoir lequel convient à votre placard.",
      title: "Ensemble superposable ou centre de lavage : lequel entre dans votre placard?",
      summary:
        "Les deux placent une laveuse et une sécheuse dans l'espace au sol d'un seul appareil. Mais ils sont construits différemment, et la différence compte pour votre placard, votre lessive et votre livraison.",
      sections: [
        {
          heading: "En bref",
          blocks: [
            {
              list: [
                "Un ensemble superposable, c'est une laveuse à chargement frontal avec une sécheuse distincte installée par-dessus. Deux appareils, deux jeux de commandes.",
                "Un centre de lavage est un seul appareil : une laveuse à chargement par le haut en bas et une sécheuse au-dessus, dans un seul boîtier avec un seul panneau de commande.",
                "Chez nous, les deux coûtent la même chose : {setPrice} par semaine pour l'ensemble.",
              ],
            },
          ],
        },
        {
          heading: "Le chargement de la laveuse",
          blocks: [
            "Un ensemble superposable a une laveuse à chargement frontal, donc vous vous penchez pour la remplir et pour sortir le linge mouillé. Les laveuses à chargement frontal brassent le linge dans peu d'eau, ce qui convient aux articles volumineux comme les serviettes et la literie.",
            "La laveuse d'un centre de lavage se charge par le haut, par un couvercle sous la sécheuse, donc on se penche moins qu'avec une laveuse à chargement frontal. Ses commandes sont simples, et la large ouverture facilite la sortie du linge mouillé et lourd.",
          ],
        },
        {
          heading: "Les commandes et la sécheuse",
          blocks: [
            "Sur un ensemble superposable, la laveuse et la sécheuse ont chacune leurs propres commandes. Sur un centre de lavage, les commandes des deux sont sur un seul panneau en haut.",
            "Dans les deux cas, la sécheuse est l'appareil du haut. Vérifiez que la personne qui fait la lessive peut l'atteindre confortablement.",
          ],
        },
        {
          heading: "Largeur et hauteur",
          blocks: [
            "Les centres de lavage font 24 ou 27 pouces de largeur. Une unité de 24 pouces mesure environ 70 pouces de hauteur.",
            "Un ensemble superposable a la largeur d'un appareil : généralement environ 24 pouces pour les appareils compacts et environ 27 pouces pour les appareils pleine grandeur. Sa hauteur dépend des deux appareils et de la trousse de superposition, alors mesurez la hauteur sous toute tablette au-dessus de l'espace et envoyez-la-nous avec la largeur.",
            "Les deux ont besoin de quelques pouces derrière pour les tuyaux, le cordon d'alimentation et le conduit d'évacuation de la sécheuse.",
          ],
        },
        {
          heading: "Le faire entrer",
          blocks: [
            "Un centre de lavage est une seule unité haute, donc il doit passer d'un seul morceau par chaque porte, chaque coin et chaque ascenseur sur le chemin.",
            "Un ensemble superposable arrive en deux appareils et une trousse de superposition. Chaque morceau est plus petit, ce qui peut aider dans les couloirs et les escaliers étroits. Les deux appareils sont superposés et branchés une fois en place.",
          ],
        },
        {
          heading: "Quand il faut réparer quelque chose",
          blocks: [
            "Dans un ensemble superposable, la laveuse et la sécheuse sont des appareils distincts. Dans un centre de lavage, elles partagent un seul boîtier.",
            "Dans les deux cas, les réparations sont incluses pendant que vous louez chez nous : nous réparons l'appareil ou le remplaçons sans frais.",
          ],
        },
        {
          heading: "Lequel entre dans votre placard?",
          blocks: [
            {
              list: [
                "Regardez ce qu'il y a maintenant. Beaucoup de placards de condo ont été conçus pour un centre de lavage monobloc. Si le vôtre en a un, un autre centre de lavage de la même largeur est généralement le remplacement le plus simple.",
                "Choisissez un ensemble superposable si vous préférez une laveuse à chargement frontal, si le placard est assez haut pour deux appareils, ou si le chemin d'accès est étroit.",
                "Choisissez un centre de lavage si vous préférez charger la laveuse par le haut, ou si votre placard a été conçu pour en recevoir un.",
              ],
            },
            "Vous n'êtes pas sûr? Mesurez la largeur, la profondeur et la hauteur, prenez une photo de l'espace et des raccordements, et envoyez-la par texto au {phone}. Nous vous dirons quel type convient.",
          ],
        },
        {
          heading: "Les deux demandent les mêmes raccordements",
          blocks: [
            "De l'eau chaude et froide, une vidange et les bonnes prises. Une sécheuse électrique, seule ou dans un centre de lavage, a besoin d'une prise de 240 volts, à 3 ou 4 broches. Une sécheuse à évacuation a aussi besoin d'un conduit vers l'extérieur.",
            { link: { href: "/machines/stackable/", label: "Location d'un ensemble superposable" } },
            { link: { href: "/machines/laundry-centre/", label: "Location d'un centre de lavage" } },
          ],
        },
      ],
    },
    "condo-laundry-checklist": {
      metaTitle: "Liste pour condo : avant de louer une laveuse et une sécheuse",
      metaDescription:
        "Avant d'installer une laveuse et une sécheuse dans votre condo : règlements de l'immeuble, ascenseur de service, taille du placard, raccordements et jour de livraison, sous forme de liste.",
      title: "Liste de vérification pour la buanderie d'un condo",
      summary:
        "La livraison d'une laveuse et d'une sécheuse dans un condo comporte quelques étapes de plus : les règlements de l'immeuble, l'ascenseur de service et un placard étroit. Passez cette liste en revue avant le jour de la livraison.",
      sections: [
        {
          heading: "1. Vérifiez les règlements de votre immeuble",
          blocks: [
            "Les règlements varient d'un immeuble à l'autre, alors ne supposez pas que les vôtres sont les mêmes que ceux d'un ami. Avant de réserver, demandez à la gestion ou au concierge :",
            {
              list: [
                "S'il y a des règlements sur les laveuses et sécheuses dans les logements",
                "Quels jours et à quelles heures les livraisons sont permises",
                "Ce qu'il faut pour une livraison, comme un formulaire, une réservation ou un dépôt pour l'ascenseur",
                "Où une livraison peut se stationner et décharger : un quai de chargement, une entrée ou la rue",
                "S'il y a des règlements sur la protection contre les fuites, comme un bac d'égouttement sous la laveuse",
              ],
            },
            "Si vous louez votre condo, vérifiez aussi auprès du propriétaire. Il voudra peut-être approuver les appareils.",
          ],
        },
        {
          heading: "2. Réservez l'ascenseur de service",
          blocks: [
            "La plupart des immeubles en copropriété demandent de réserver l'ascenseur de service pour une livraison. Réservez une plage horaire auprès de votre immeuble, puis donnez-nous la date et l'heure.",
            "Demandez combien de temps dure la plage horaire, pour que la livraison et l'installation y entrent toutes les deux.",
            "Si votre immeuble n'a pas d'ascenseur de service, indiquez-nous l'étage et décrivez les escaliers, pour que nous puissions planifier comment monter les appareils.",
          ],
        },
        {
          heading: "3. Mesurez le placard",
          blocks: [
            "Les placards de buanderie des condos sont généralement étroits, alors mesurez avec soin :",
            {
              list: [
                "La largeur à l'endroit le plus étroit",
                "La profondeur, avec la porte du placard fermée s'il en a une",
                "La hauteur jusqu'à la tablette la plus basse ou jusqu'au haut de l'ouverture",
                "La largeur de l'ouverture du placard et de la porte d'entrée de votre logement",
              ],
            },
            "Laissez quelques pouces derrière les appareils pour les tuyaux, le cordon d'alimentation et le conduit d'évacuation de la sécheuse.",
            { link: { href: "/guides/measure-your-laundry-space/", label: "Comment mesurer votre espace de buanderie" } },
          ],
        },
        {
          heading: "4. Regardez les raccordements",
          blocks: [
            "Ouvrez le placard et regardez le mur du fond. Vous devriez voir :",
            {
              list: [
                "Des robinets d'eau chaude et d'eau froide",
                "Une vidange : un tuyau de renvoi vertical ou une boîte de vidange dans le mur",
                "La prise de la sécheuse, à 3 ou à 4 broches",
                "Une prise ordinaire pour la laveuse",
                "Un raccord pour le conduit d'évacuation de la sécheuse, si le placard en a un",
              ],
            },
            "Prenez une photo de tout le mur du fond et envoyez-la-nous. S'il manque quelque chose ou si quelque chose semble endommagé, informez-vous auprès de la gestion avant le jour de la livraison.",
            "Repérez l'emplacement des robinets d'eau. Ils coupent l'eau de la laveuse, alors ils doivent être faciles d'accès.",
            "Si le placard a un conduit d'évacuation pour la sécheuse, nous le vérifions à l'installation : un conduit écrasé ou bouché est un risque d'incendie.",
            {
              link: {
                href: "/guides/3-prong-vs-4-prong-dryer-outlet/",
                label: "Prise de sécheuse à 3 ou à 4 broches?",
              },
            },
          ],
        },
        {
          heading: "5. Choisissez le type d'appareil",
          blocks: [
            "Dans la plupart des placards de condo, le choix se fait entre deux types :",
            {
              list: [
                "Un ensemble superposable : une laveuse à chargement frontal avec la sécheuse par-dessus",
                "Un centre de lavage monobloc : la laveuse et la sécheuse dans un seul boîtier, de 24 ou 27 pouces de largeur",
              ],
            },
            "Si le placard a déjà un centre de lavage, un autre de la même largeur entre généralement à nouveau.",
            { link: { href: "/guides/stackable-vs-laundry-centre/", label: "Ensemble superposable ou centre de lavage?" } },
          ],
        },
        {
          heading: "6. Préparez le jour de la livraison",
          blocks: [
            {
              list: [
                "Quelqu'un à la maison pendant toute la livraison",
                "L'ascenseur réservé, et le concierge qui nous attend",
                "Un passage dégagé de la porte du logement jusqu'au placard",
                "Le placard vidé, avec de la place pour travailler",
                "L'ancien appareil vide, si nous l'emportons (l'enlèvement est sans frais)",
              ],
            },
            "Ce jour-là, nous raccordons l'eau, la vidange, l'électricité et l'évacuation, et nous faisons un cycle d'essai avant de partir.",
            "Des questions sur votre immeuble? Appelez-nous ou écrivez-nous par texto au {phone}.",
          ],
        },
      ],
    },
    "whats-included-when-you-rent": {
      metaTitle: "Ce qui est inclus quand vous louez une laveuse et une sécheuse chez nous",
      metaDescription:
        "Ce que couvre le loyer hebdomadaire, ce que vous payez à part et comment se déroule une location : réparations, enlèvement, dépôt, livraison, durée minimale et fin de la location.",
      title: "Ce qui est inclus quand vous louez chez nous",
      summary:
        "Une liste simple de ce que couvre le prix hebdomadaire, de ce que vous payez à part et de la façon dont se déroule une location, de la première semaine jusqu'à la reprise de l'appareil.",
      sections: [
        {
          heading: "Le prix hebdomadaire",
          blocks: [
            {
              list: [
                "{setPrice} par semaine pour un ensemble laveuse et sécheuse",
                "{singlePrice} par semaine pour un seul appareil : seulement une laveuse ou seulement une sécheuse",
              ],
            },
            "Le loyer est prélevé chaque semaine, le même jour de la semaine. Tous nos prix sont hebdomadaires, en dollars canadiens.",
            "Aucune TVH facturée. Le prix hebdomadaire est ce que vous payez.",
          ],
        },
        {
          heading: "Inclus dans le prix",
          blocks: [
            {
              list: [
                "Les réparations. Si l'appareil brise pendant que vous le louez, nous le réparons ou vous donnons un appareil de remplacement, sans frais.",
                "L'enlèvement. Nous emportons votre ancien appareil quand nous livrons le nôtre, sans frais.",
                "Un appareil vérifié. Nos appareils sont usagés. Chacun est vérifié avant de partir et est en bon état de fonctionnement. La marque et le modèle dépendent de ce qui est disponible.",
                "Du service dans votre langue. Nous parlons anglais, espagnol et russe.",
              ],
            },
          ],
        },
        {
          heading: "Payé à part",
          blocks: [
            {
              list: [
                "La livraison et l'installation. Nous en soumettons le prix pour chaque travail, avant que vous payiez. Il dépend de la distance, de l'étage, des escaliers ou de l'ascenseur, et des raccordements.",
                "Un dépôt remboursable de {deposit}. Il vous est rendu quand l'appareil revient en état de fonctionnement.",
                "Les dommages au-delà de l'usure normale. Les réparations dues à l'usage normal sont à nos frais; les dommages au-delà de l'usure normale sont la responsabilité du locataire.",
              ],
            },
          ],
        },
        {
          heading: "Pour commencer",
          blocks: [
            "Indiquez-nous votre secteur, si vous avez besoin d'un ensemble ou d'un seul appareil, et la taille de votre espace de buanderie. Une photo de l'espace aide. Nous vous répondons avec l'appareil, le total et la date de début.",
            "La livraison se fait généralement la même semaine. Nous confirmons la date quand nous envoyons la soumission.",
          ],
        },
        {
          heading: "L'installation",
          blocks: [
            "Nous livrons l'appareil, raccordons l'eau, la vidange, l'électricité et l'évacuation, et faisons un cycle d'essai avant de partir.",
            "Votre espace a besoin des bons raccordements : de l'eau chaude et froide, une vidange, la bonne prise et, pour une sécheuse à évacuation, un conduit vers l'extérieur. Si vous habitez dans un condo, réservez l'ascenseur de service pour la livraison.",
            { link: { href: "/guides/measure-your-laundry-space/", label: "Comment mesurer votre espace de buanderie" } },
          ],
        },
        {
          heading: "Si quelque chose ne va pas",
          blocks: [
            "Appelez ou écrivez par texto au {phone}, ou envoyez le formulaire de réparation avec votre adresse et ce que fait l'appareil. Nous le réparons ou apportons un appareil de remplacement, sans frais.",
            "S'il y a une fuite d'eau, fermez les robinets d'eau derrière la laveuse si vous pouvez les atteindre sans danger, puis appelez-nous.",
            { link: { href: "/repair/", label: "Demander une réparation" } },
          ],
        },
        {
          heading: "Combien de temps vous louez",
          blocks: [
            "Le minimum est de {minWeeks} semaines. Ensuite, la location continue de semaine en semaine.",
            "Une fois le minimum atteint, chaque partie peut mettre fin à la location avec un préavis de {noticeDays} jours. Pour y mettre fin, écrivez-nous par texto au {phone}, et nous venons chercher l'appareil.",
          ],
        },
        {
          heading: "Le paiement",
          blocks: [
            "Payez par virement Interac ou par carte de crédit. Pour un paiement par carte, nous vous envoyons un lien de paiement avec votre soumission. Il n'y a pas de vérification de crédit.",
          ],
        },
        {
          heading: "Offres en cours",
          blocks: [{ offer: "promotions" }, { offer: "referral" }],
        },
        {
          heading: "Ce que nous ne faisons pas",
          blocks: [
            "Nous louons seulement des laveuses et des sécheuses. Nous ne vendons pas d'appareils et nous ne louons pas d'autres électroménagers.",
          ],
        },
        {
          heading: "Avant de signer",
          blocks: [
            "Vous recevez le contrat de location complet par écrit pour le lire avant de le signer. Si quelque chose sur cette page n'est pas clair, demandez-nous d'abord.",
            { link: { href: "/faq/", label: "Plus de questions et réponses" } },
          ],
        },
      ],
    },
  },
};

export default frServer;
