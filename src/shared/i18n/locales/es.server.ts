// Spanish server-only text: the guides (../index.server.ts merges this over ./en.server.ts),
// with the same keys and {placeholders} as English. Lists replace English whole, so each
// guide's `sections` is complete here, links and { include } / { offer } blocks included.
// The policies and llms.txt stay English-only.
import type { DeepPartial } from "../index";
import type { ServerText } from "../index.server";

const esServer: DeepPartial<ServerText> = {
  articles: {
    promotionParagraph: "{title}. {text} {stillPaid}",
    referralParagraph: "{title}. {text}",
  },

  guides: {
    "measure-your-laundry-space": {
      metaTitle: "Cómo medir su espacio para lavadora y secadora",
      metaDescription:
        "Qué medir antes de alquilar lavadora y secadora: el espacio, el lugar para conexiones y puertas, y el camino de entrada. Y qué enviarnos para cotizar.",
      title: "Cómo medir su espacio de lavandería",
      summary:
        "Diez minutos con una cinta métrica pueden evitar una entrega perdida. Aquí está qué medir, dónde una máquina necesita espacio extra y qué enviarnos antes de alquilar.",
      sections: [
        {
          heading: "Lo que necesita",
          blocks: [
            "Una cinta métrica, su teléfono y algo para anotar. Una segunda persona ayuda con las medidas altas y a mantener la cinta derecha.",
            "Mida en pulgadas. Las medidas de lavadoras y secadoras suelen darse en pulgadas, así no tendrá que convertir nada después.",
          ],
        },
        {
          heading: "Mida el espacio",
          blocks: [
            "Tome cada medida en el punto más angosto. Las paredes casi nunca son perfectamente rectas, y un marco de puerta, un tubo o un zócalo pueden quitarle la pulgada con la que contaba.",
            {
              list: [
                "Ancho: de pared a pared, o hasta el borde de la abertura del clóset, donde sea más angosto.",
                "Profundidad: desde la pared del fondo hasta el borde delantero del marco del clóset, o hasta donde cerraría una puerta.",
                "Altura: desde el piso hasta lo más bajo que haya encima del espacio, como una repisa, un gabinete, un tubo o la parte de arriba de la abertura.",
              ],
            },
            "Anote los tres números como ancho, profundidad y altura, y marque de cuál está menos seguro.",
          ],
        },
        {
          heading: "Deje espacio para las conexiones y las puertas",
          blocks: [
            "Una lavadora o una secadora no puede quedar pegada a la pared del fondo. Las mangueras de agua, la manguera de desagüe, el cable de corriente y el ducto de la secadora se conectan atrás, así que deje unas pulgadas detrás de las máquinas.",
            "Deje también un poco de espacio a los lados, para que las máquinas no rocen las paredes ni entre sí mientras funcionan.",
            "Luego piense en las puertas. Una máquina de carga frontal necesita espacio al frente para que su puerta abra, y usted necesita lugar para pararse ahí y cargarla. Una lavadora de carga superior necesita espacio libre arriba para la tapa. Si el clóset de lavandería tiene sus propias puertas, verifique que todavía cierren delante de las máquinas.",
          ],
        },
        {
          heading: "Mida el camino de entrada",
          blocks: [
            "La máquina tiene que llegar al espacio antes de caber en él. Recorra el camino desde la puerta principal hasta el espacio de lavandería y busque el punto más angosto:",
            {
              list: [
                "La puerta principal y las puertas interiores, medidas con la puerta abierta",
                "Pasillos y esquinas cerradas",
                "Escaleras: cuántos escalones, qué tan anchas, y si hay una vuelta o un descanso",
                "En un edificio de condominios o apartamentos: el ascensor de servicio y la reserva que necesitará",
              ],
            },
            "Un par apilable llega como dos máquinas separadas, así que cada pieza es más pequeña de cargar. Un centro de lavado de una pieza llega como una sola unidad alta.",
          ],
        },
        {
          heading: "Medidas típicas",
          blocks: [
            "Las medidas cambian según la marca y el modelo, así que tómelas como punto de partida, no como una promesa:",
            {
              list: [
                "Las máquinas compactas suelen medir unas 24 pulgadas de ancho.",
                "Las máquinas de tamaño completo suelen medir unas 27 pulgadas de ancho cada una. Un par lado a lado necesita unas 55 pulgadas de ancho, más un poco de espacio entre ellas y alrededor.",
                "Los centros de lavado de una pieza miden 24 o 27 pulgadas de ancho. Una unidad de 24 pulgadas mide unas 70 pulgadas de alto.",
                "Un par apilable tiene el ancho de una máquina y la altura de dos, así que revise la altura bajo cualquier repisa que haya encima del espacio.",
              ],
            },
            "Si su espacio está cerca de una de estas medidas, envíenos los números exactos. Los comparamos con la máquina que tengamos para usted antes del día de la entrega.",
          ],
        },
        {
          heading: "Revise las conexiones de una vez",
          blocks: [
            "Ya que tiene la cinta en la mano, mire lo que hay en la pared detrás del espacio:",
            { include: "hookups" },
            "Si no sabe qué es algo, basta con una foto. Le decimos lo que vemos.",
            {
              link: {
                href: "/guides/3-prong-vs-4-prong-dryer-outlet/",
                label: "Cómo distinguir un tomacorriente de secadora de 3 clavijas de uno de 4",
              },
            },
          ],
        },
        {
          heading: "Qué enviarnos",
          blocks: [
            "Envíe esto por mensaje al {phone} cuando pida una cotización:",
            {
              list: [
                "El ancho, la profundidad y la altura del espacio",
                "La puerta o la vuelta más angosta del camino de entrada, y el número de escalones",
                "Una foto del espacio donde se vean las conexiones",
                "Una foto de cerca del tomacorriente de la secadora",
              ],
            },
            "Con eso podemos decirle qué tipo de máquina cabe, y cotizarle la entrega y la instalación antes de que pague nada.",
            { link: { href: "/machines/", label: "Comparar los tipos de máquinas" } },
          ],
        },
      ],
    },
    "3-prong-vs-4-prong-dryer-outlet": {
      metaTitle: "Tomacorriente de secadora de 3 o 4 clavijas: cuál tiene",
      metaDescription:
        "Cómo distinguir un tomacorriente de secadora de 3 clavijas de uno de 4, por qué importa al alquilar, y por qué cambiarlo es trabajo de un electricista.",
      title: "Tomacorriente de secadora de 3 o de 4 clavijas",
      summary:
        "La mayoría de las secadoras eléctricas se conectan a un tomacorriente grande de 240 voltios con tres o cuatro ranuras. Aquí está cómo saber cuál tiene, por qué le preguntamos y qué no hacer si el enchufe y el tomacorriente no coinciden.",
      sections: [
        {
          heading: "Por qué le preguntamos por su tomacorriente",
          blocks: [
            "Una secadora eléctrica no usa un tomacorriente común de pared. Su resistencia necesita mucha más electricidad que una lámpara o un cargador de teléfono, así que se conecta a un tomacorriente más grande de 240 voltios, y el enchufe del cable de la secadora tiene que coincidir con ese tomacorriente.",
            "Hay dos tipos comunes de tomacorriente para secadora: uno con tres ranuras y otro con cuatro. Su casa puede tener cualquiera de los dos. Cuando pide una cotización, le preguntamos cuál tiene para que la secadora quede bien conectada el día de la entrega.",
          ],
        },
        {
          heading: "Cómo saber cuál tiene",
          blocks: [
            {
              steps: [
                "Busque el tomacorriente detrás o al lado del lugar donde va la secadora. Es claramente más grande que un tomacorriente común. Si todavía hay una secadora vieja conectada, mire su enchufe en vez de desconectarla.",
                "Cuente las ranuras. Tres ranuras es un tomacorriente de 3 clavijas. Cuatro ranuras es uno de 4 clavijas.",
                "En un tomacorriente de 4 clavijas, una de las ranuras suele ser redonda o en forma de U. Esa es la tierra. Un tomacorriente de secadora de 3 clavijas no tiene una ranura de tierra separada.",
                "Tome una foto de frente y lo bastante cerca para ver todas las ranuras, y envíenosla por mensaje. Es la forma más rápida de estar seguros.",
              ],
            },
          ],
        },
        {
          heading: "La lavadora es diferente",
          blocks: [
            "Una lavadora se conecta a un tomacorriente doméstico común. Verifique que haya uno cerca de las llaves de agua, al alcance del lugar donde irá la lavadora.",
            "Un centro de lavado de una pieza con secadora eléctrica necesita el mismo tipo de tomacorriente de secadora de 240 voltios, así que revíselo de la misma manera.",
          ],
        },
        {
          heading: "Si el enchufe no coincide con el tomacorriente",
          blocks: [
            {
              note: "No fuerce un enchufe en un tomacorriente donde no entra, y no use un adaptador ni una extensión para hacerlo entrar. Una secadora consume mucha electricidad, y una mala conexión puede sobrecalentarse.",
            },
            "Hay dos soluciones correctas: cambiar el cable de la secadora por uno que coincida con el tomacorriente, o cambiar el tomacorriente para que coincida con el cable.",
            {
              list: [
                "Cambiar el tomacorriente significa trabajar en la instalación eléctrica de su casa. Eso debe hacerlo un electricista con licencia.",
                "Cambiar el cable de la secadora debe hacerlo un electricista con licencia u otra persona calificada, siguiendo las instrucciones del fabricante de la secadora.",
              ],
            },
            "Cuéntenos cómo es su tomacorriente cuando pida una cotización, para conocer cualquier diferencia mucho antes del día de la entrega.",
          ],
        },
        {
          heading: "¿No tiene ningún tomacorriente de 240 voltios?",
          blocks: [
            "Algunos espacios de lavandería tienen agua y desagüe pero no tomacorriente para secadora. Agregar uno significa un circuito nuevo desde el panel eléctrico, que también es trabajo de un electricista con licencia. Si alquila su vivienda, primero hay que preguntarle a su propietario, y en un condominio, también a la administración del edificio.",
            "Mientras tanto, puede alquilar solo una lavadora, por {singlePrice} por semana.",
            { link: { href: "/machines/single-machine/", label: "Solo lavadora o solo secadora" } },
          ],
        },
        {
          heading: "Lista rápida",
          blocks: [
            {
              list: [
                "Cuente las ranuras del tomacorriente de la secadora: 3 o 4",
                "Busque el tomacorriente común para la lavadora",
                "Tome una foto clara de los dos",
                "Envíe las fotos al {phone} con su solicitud de cotización",
              ],
            },
            "Con esas fotos podemos planear la parte eléctrica de la instalación.",
            { link: { href: "/guides/measure-your-laundry-space/", label: "Cómo medir su espacio de lavandería" } },
          ],
        },
      ],
    },
    "stackable-vs-laundry-centre": {
      metaTitle: "Lavadora y secadora apilables o centro de lavado: cuál cabe",
      metaDescription:
        "¿Par apilable o centro de lavado de una pieza? Cómo se comparan en espacio, carga, controles y entrega, y cómo saber cuál le conviene a su clóset.",
      title: "Par apilable o centro de lavado: ¿cuál cabe en su clóset?",
      summary:
        "Los dos ponen una lavadora y una secadora en el espacio de una sola máquina. Pero están hechos de forma distinta, y la diferencia importa para su clóset, su ropa y su entrega.",
      sections: [
        {
          heading: "En resumen",
          blocks: [
            {
              list: [
                "Un par apilable es una lavadora de carga frontal con una secadora separada montada encima. Dos máquinas, dos juegos de controles.",
                "Un centro de lavado es un solo aparato: una lavadora de carga superior abajo y una secadora arriba, en un solo gabinete con un solo panel de control.",
                "Con nosotros, los dos cuestan lo mismo: {setPrice} por semana como juego.",
              ],
            },
          ],
        },
        {
          heading: "Cómo se carga la lavadora",
          blocks: [
            "Un par apilable tiene una lavadora de carga frontal, así que hay que agacharse para cargarla y para sacar la ropa mojada. Las lavadoras de carga frontal mueven la ropa en poca agua, lo que va bien con cosas voluminosas como toallas y ropa de cama.",
            "La lavadora de un centro de lavado se carga por arriba, por una tapa debajo de la secadora, así que hay que agacharse menos que con una de carga frontal. Sus controles son sencillos, y la abertura amplia facilita sacar la ropa mojada y pesada.",
          ],
        },
        {
          heading: "Los controles y la secadora",
          blocks: [
            "En un par apilable, la lavadora y la secadora tienen cada una sus propios controles. En un centro de lavado, los controles de ambas están en un solo panel arriba.",
            "En los dos casos, la secadora es la máquina de arriba. Verifique que quien lava la ropa pueda alcanzarla con comodidad.",
          ],
        },
        {
          heading: "Ancho y altura",
          blocks: [
            "Los centros de lavado miden 24 o 27 pulgadas de ancho. Una unidad de 24 pulgadas mide unas 70 pulgadas de alto.",
            "Un par apilable tiene el ancho de una máquina: normalmente unas 24 pulgadas las compactas y unas 27 pulgadas las de tamaño completo. Su altura depende de las dos máquinas y del kit de apilamiento, así que mida la altura bajo cualquier repisa que haya encima del espacio y envíenosla junto con el ancho.",
            "Los dos necesitan unas pulgadas detrás para las mangueras, el cable de corriente y el ducto de la secadora.",
          ],
        },
        {
          heading: "Cómo se entra",
          blocks: [
            "Un centro de lavado es una sola unidad alta, así que tiene que pasar entera por cada puerta, esquina y ascensor del camino.",
            "Un par apilable llega como dos máquinas y un kit de apilamiento. Cada pieza es más pequeña, lo que puede ayudar en pasillos y escaleras estrechos. Las dos se apilan y se conectan una vez que están en su lugar.",
          ],
        },
        {
          heading: "Cuando algo necesita reparación",
          blocks: [
            "En un par apilable, la lavadora y la secadora son máquinas separadas. En un centro de lavado comparten un solo gabinete.",
            "En cualquier caso, las reparaciones están incluidas mientras nos alquila: reparamos la máquina o la cambiamos sin costo.",
          ],
        },
        {
          heading: "¿Cuál cabe en su clóset?",
          blocks: [
            {
              list: [
                "Mire lo que hay ahora. Muchos clósets de condominio se construyeron para un centro de lavado de una pieza. Si el suyo tiene uno, otro centro de lavado del mismo ancho suele ser el cambio más sencillo.",
                "Elija un par apilable si prefiere una lavadora de carga frontal, si el clóset es lo bastante alto para dos máquinas, o si el camino de entrada es estrecho.",
                "Elija un centro de lavado si prefiere cargar la lavadora por arriba, o si su clóset se hizo para uno.",
              ],
            },
            "¿No está seguro? Mida el ancho, la profundidad y la altura, tome una foto del espacio y de las conexiones, y envíela al {phone}. Le decimos qué tipo cabe.",
          ],
        },
        {
          heading: "Los dos necesitan las mismas conexiones",
          blocks: [
            "Agua caliente y fría, un desagüe y los tomacorrientes adecuados. Una secadora eléctrica, sola o en un centro de lavado, necesita un tomacorriente de 240 voltios, de 3 o 4 clavijas. Una secadora con ventilación también necesita un ducto de salida al exterior.",
            { link: { href: "/machines/stackable/", label: "Alquiler de lavadora y secadora apilables" } },
            { link: { href: "/machines/laundry-centre/", label: "Alquiler de centro de lavado" } },
          ],
        },
      ],
    },
    "condo-laundry-checklist": {
      metaTitle: "Lista para condominio: antes de alquilar lavadora y secadora",
      metaDescription:
        "Antes de instalar lavadora y secadora en su condominio: reglas del edificio, ascensor de servicio, tamaño del clóset, conexiones y día de entrega.",
      title: "Lista para la lavandería de un condominio",
      summary:
        "Entregar una lavadora y una secadora en un condominio tiene algunos pasos extra: las reglas del edificio, el ascensor de servicio y un clóset angosto. Revise esta lista antes del día de la entrega.",
      sections: [
        {
          heading: "1. Revise las reglas de su edificio",
          blocks: [
            "Las reglas cambian de un edificio a otro, así que no suponga que las suyas son iguales a las de un amigo. Antes de reservar, pregunte a la administración o al conserje:",
            {
              list: [
                "Si hay reglas sobre lavadoras y secadoras dentro de las unidades",
                "Qué días y en qué horario se permiten entregas",
                "Qué necesitan para una entrega, como un formulario, una reserva o un depósito por el ascensor",
                "Dónde puede estacionarse y descargar una entrega: un muelle de carga, una entrada o la calle",
                "Si hay reglas sobre protección contra fugas, como una bandeja bajo la lavadora",
              ],
            },
            "Si alquila su condominio, consulte también con el dueño. Puede que quiera aprobar las máquinas.",
          ],
        },
        {
          heading: "2. Reserve el ascensor de servicio",
          blocks: [
            "La mayoría de los edificios de condominios piden reservar el ascensor de servicio para una entrega. Reserve un horario con su edificio y luego díganos la fecha y la hora.",
            "Pregunte cuánto dura el horario reservado, para que la entrega y la instalación quepan en él.",
            "Si su edificio no tiene ascensor de servicio, díganos el piso y cómo son las escaleras, para planear cómo subimos las máquinas.",
          ],
        },
        {
          heading: "3. Mida el clóset",
          blocks: [
            "Los clósets de lavandería de los condominios suelen ser angostos, así que mida con cuidado:",
            {
              list: [
                "El ancho en el punto más angosto",
                "La profundidad, con la puerta del clóset cerrada si tiene una",
                "La altura hasta la repisa más baja o la parte de arriba de la abertura",
                "El ancho de la abertura del clóset y de la puerta de entrada de su unidad",
              ],
            },
            "Deje unas pulgadas detrás de las máquinas para las mangueras, el cable de corriente y el ducto de la secadora.",
            { link: { href: "/guides/measure-your-laundry-space/", label: "Cómo medir su espacio de lavandería" } },
          ],
        },
        {
          heading: "4. Mire las conexiones",
          blocks: [
            "Abra el clóset y mire la pared del fondo. Debería ver:",
            {
              list: [
                "Llaves de agua caliente y fría",
                "Un desagüe: un tubo de desagüe vertical o una caja de desagüe en la pared",
                "El tomacorriente de la secadora, de 3 o 4 clavijas",
                "Un tomacorriente común para la lavadora",
                "Una conexión para el ducto de la secadora, si el clóset tiene una",
              ],
            },
            "Tome una foto de toda la pared del fondo y envíenosla. Si falta algo o algo se ve dañado, pregunte a la administración antes del día de la entrega.",
            "Fíjese dónde están las llaves de agua. Cortan el agua de la lavadora, así que deben estar fáciles de alcanzar.",
            "Si el clóset tiene ducto para la secadora, lo revisamos al instalar: un ducto aplastado o tapado es un riesgo de incendio.",
            {
              link: {
                href: "/guides/3-prong-vs-4-prong-dryer-outlet/",
                label: "¿Tomacorriente de secadora de 3 o de 4 clavijas?",
              },
            },
          ],
        },
        {
          heading: "5. Elija el tipo de máquina",
          blocks: [
            "En la mayoría de los clósets de condominio, se elige entre dos tipos:",
            {
              list: [
                "Un par apilable: una lavadora de carga frontal con la secadora encima",
                "Un centro de lavado de una pieza: la lavadora y la secadora en un solo gabinete, de 24 o 27 pulgadas de ancho",
              ],
            },
            "Si el clóset ya tiene un centro de lavado, normalmente vuelve a caber uno del mismo ancho.",
            { link: { href: "/guides/stackable-vs-laundry-centre/", label: "¿Par apilable o centro de lavado?" } },
          ],
        },
        {
          heading: "6. Prepárese para el día de la entrega",
          blocks: [
            {
              list: [
                "Alguien en casa durante toda la entrega",
                "El ascensor reservado y el conserje esperándonos",
                "Un camino despejado desde la puerta de la unidad hasta el clóset",
                "El clóset vacío, con espacio para trabajar",
                "La máquina vieja vacía, si nos la vamos a llevar (el retiro es sin costo)",
              ],
            },
            "Ese día conectamos el agua, el desagüe, la electricidad y la ventilación, y hacemos un ciclo de prueba antes de irnos.",
            "¿Preguntas sobre su edificio? Llame o escriba al {phone}.",
          ],
        },
      ],
    },
    "whats-included-when-you-rent": {
      metaTitle: "Qué incluye alquilar lavadora y secadora con nosotros",
      metaDescription:
        "Qué cubre la renta semanal, qué se paga aparte y cómo funciona el alquiler: reparaciones, retiro, depósito, entrega, plazo mínimo y cómo terminarlo.",
      title: "Qué incluye alquilar con nosotros",
      summary:
        "Una lista clara de lo que cubre el precio semanal, lo que se paga aparte y cómo funciona el alquiler, desde la primera semana hasta que recogemos la máquina.",
      sections: [
        {
          heading: "El precio semanal",
          blocks: [
            {
              list: [
                "{setPrice} por semana un juego de lavadora y secadora",
                "{singlePrice} por semana una sola máquina: solo una lavadora o solo una secadora",
              ],
            },
            "La renta se cobra cada semana el mismo día. Todos nuestros precios son semanales, en dólares canadienses.",
            "No cobramos HST. El precio semanal es lo que usted paga.",
          ],
        },
        {
          heading: "Incluido en el precio",
          blocks: [
            {
              list: [
                "Reparaciones. Si la máquina se daña mientras la alquila, la reparamos o le damos una máquina de reemplazo, sin costo.",
                "Retiro. Nos llevamos su máquina vieja cuando entregamos la nuestra, sin costo.",
                "Una máquina revisada. Nuestras máquinas son usadas. Revisamos cada una antes de que salga y está en buen estado de funcionamiento. La marca y el modelo dependen de lo que haya disponible.",
                "Atención en su idioma. Hablamos inglés, español y ruso.",
              ],
            },
          ],
        },
        {
          heading: "Se paga aparte",
          blocks: [
            {
              list: [
                "Entrega e instalación. Las cotizamos por trabajo, antes de que pague. Dependen de la distancia, el piso, las escaleras o el ascensor, y las conexiones.",
                "Un depósito reembolsable de {deposit}. Se le devuelve cuando la máquina regresa funcionando.",
                "Daños más allá del desgaste normal. Las reparaciones por uso normal corren por nuestra cuenta; los daños más allá del desgaste normal son responsabilidad de quien alquila.",
              ],
            },
          ],
        },
        {
          heading: "Para empezar",
          blocks: [
            "Díganos su zona, si necesita un juego o una sola máquina, y el tamaño de su espacio de lavandería. Una foto del espacio ayuda. Le respondemos con la máquina, el total y la fecha de inicio.",
            "La entrega suele ser la misma semana. Confirmamos la fecha cuando enviamos la cotización.",
          ],
        },
        {
          heading: "Instalación",
          blocks: [
            "Entregamos la máquina, conectamos el agua, el desagüe, la electricidad y la ventilación, y hacemos un ciclo de prueba antes de irnos.",
            "Su espacio necesita las conexiones adecuadas: agua caliente y fría, un desagüe, el tomacorriente adecuado y, para una secadora con ventilación, un ducto de salida al exterior. Si vive en un condominio, reserve el ascensor de servicio para la entrega.",
            { link: { href: "/guides/measure-your-laundry-space/", label: "Cómo medir su espacio de lavandería" } },
          ],
        },
        {
          heading: "Si algo sale mal",
          blocks: [
            "Llame o escriba al {phone}, o envíe el formulario de reparación con su dirección y lo que hace la máquina. La reparamos o le llevamos una máquina de reemplazo, sin costo.",
            "Si hay una fuga de agua, cierre las llaves de agua detrás de la lavadora si puede alcanzarlas sin peligro, y después llámenos.",
            { link: { href: "/repair/", label: "Pedir una reparación" } },
          ],
        },
        {
          heading: "Cuánto tiempo alquila",
          blocks: [
            "El mínimo es de {minWeeks} semanas. Después, el alquiler continúa semana a semana.",
            "Una vez cumplido el mínimo, cualquiera de las partes puede terminar el alquiler con {noticeDays} días de aviso. Para terminarlo, envíenos un mensaje al {phone} y pasamos a recoger la máquina.",
          ],
        },
        {
          heading: "El pago",
          blocks: [
            "Pague por Interac e-Transfer o con tarjeta de crédito. Para pagar con tarjeta, le enviamos un enlace de pago con su cotización. No hay verificación de crédito.",
          ],
        },
        {
          heading: "Ofertas actuales",
          blocks: [{ offer: "promotions" }, { offer: "referral" }],
        },
        {
          heading: "Lo que no hacemos",
          blocks: ["Solo alquilamos lavadoras y secadoras. No vendemos máquinas ni alquilamos otros electrodomésticos."],
        },
        {
          heading: "Antes de firmar",
          blocks: [
            "Recibe el contrato de alquiler completo por escrito para leerlo antes de firmar. Si algo de esta página no está claro, pregúntenos primero.",
            { link: { href: "/faq/", label: "Más preguntas y respuestas" } },
          ],
        },
      ],
    },
  },
};

export default esServer;
