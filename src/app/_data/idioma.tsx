"use client";

/**
 * Invitacion bilingue.
 *
 * Todo el texto visible vive aqui en los dos idiomas, para que no quede ni una
 * cadena suelta a medio traducir. El idioma lo elige el invitado en la
 * pantalla de entrada y se guarda en `localStorage` para que no se la vuelva a
 * encontrar cada vez que abre el enlace.
 *
 * Lo que NO se traduce, a proposito: nombres de personas, del templo, de la
 * quinta y de los hoteles, la calle y el nombre del banco.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

const CLAVE = "sd-lang";

const MESES_EN = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

export const T = {
  es: {
    mes: (m: number, esMes: string) => esMes,
    /** dd de mes de aaaa */
    fechaLarga: "26 de diciembre de 2026",
    limite: "12 de octubre 2026",

    gateTitulo: "Elige tu idioma",
    gateEs: "Español",
    gateEn: "English",
    gateNota: "Puedes cambiarlo cuando quieras",

    sobreHint: "Toca para abrir",

    portadaEyebrow: "NUESTRA BODA",
    ciudad: "Mérida, Yucatán",
    ciudadLarga: "Mérida, Yucatán, México",

    heroAmor1: "Con todo nuestro amor",
    heroAmor2: "y el de nuestras familias",
    padresNovio: "Padres del novio",
    padresNovia: "Padres de la novia",
    heroInvita: "Tenemos el honor de invitarles a",
    heroBoda: "nuestra boda",

    frase: "Te elegiría a ti una y mil veces, en esta y en todas mis vidas.",

    faltan: "Faltan",
    dias: "Días",
    horas: "Horas",
    minutos: "Minutos",
    granDia: "para el gran día",

    padrinosEyebrow: "NUESTROS PADRINOS",
    velacion: "Velación",
    anillos: "Anillos",

    ceremonia: "Ceremonia Religiosa",
    horaCeremonia: "11:00 AM",
    zonaIglesia: "Umán, Yucatán",
    irUbicacion: "IR A UBICACIÓN",

    recepcion: "Recepción",
    horaRecepcion: "1:30 PM",
    dirRecepcion: "Paseo de Montejo 469 · Mérida",

    itinerarioTitulo: "Así celebraremos",
    itinerario: [
      { time: "11:00 a.m.", label: "Ceremonia Religiosa", desc: "Parroquia de San Francisco de Asís, Umán." },
      { time: "1:30 p.m.", label: "Cóctel de bienvenida", desc: "En la Quinta Montes Molina." },
      { time: "2:00 p.m.", label: "La celebración", desc: "Da inicio la fiesta que hemos soñado compartir con ustedes." },
      { time: "3:00 p.m.", label: "Comida", desc: "Compartimos la mesa en honor de nuestro nuevo capítulo." },
      { time: "4:00 p.m.", label: "Abrimos la pista", desc: "Que nadie se quede sentado." },
      { time: "9:30 p.m.", label: "Hasta pronto", desc: "Cerramos la noche con una última copa y muchos recuerdos." },
    ],

    galeriaTitulo: "Nuestros recuerdos",
    galeriaSub: "Toca la foto para verla en grande",
    fotoAnterior: "Foto anterior",
    fotoSiguiente: "Foto siguiente",
    cerrarFoto: "Cerrar foto",

    climaLugar: "MÉRIDA, YUCATÁN",
    climaTitulo: "El clima",
    cielo: {
      despejado: "Despejado", casiDespejado: "Mayormente despejado", nublado: "Nublado",
      neblina: "Neblina", lluvia: "Lluvia", chubascos: "Chubascos", tormenta: "Tormenta",
    },
    climaTipico: "Mañana templada, tarde cálida",
    climaDia: "DE DÍA",
    climaNoche: "DE NOCHE",
    climaMax: "MÁXIMA",
    climaMin: "MÍNIMA",
    climaLluvia: "LLUVIA",
    climaEspera: "Los días previos a la boda verás aquí el pronóstico exacto para Mérida.",
    climaNota:
      "Diciembre en Mérida amanece templado y a media tarde el sol pega fuerte. Por eso la vestimenta es guayabera de manga larga y lino: se ve elegante y se siente fresco toda la celebración.",

    vestimenta: "Vestimenta",
    etiqueta1: "FORMAL",
    etiqueta2: "YUCATECO",
    caballeros: "Caballeros:",
    caballerosTxt: " guayabera de manga larga o ropa de lino.",
    damas: "Damas:",
    damasTxt: " vestido largo o tipo cóctel.",
    coloresAviso1: "Con cariño, les pedimos ",
    coloresAviso2: "no usar",
    coloresAviso3: " estos colores: están reservados para la novia y el cortejo.",
    colores: ["Blanco", "Ivory", "Nude", "Champán", "Azul cielo"],

    notasTitulo: "Notas",
    notas: [
      "La ceremonia religiosa es en Umán y la recepción en Paseo de Montejo, en Mérida: calcula el traslado entre una y otra.",
      "Te esperamos puntuales a las 11:00 de la mañana; nos hace mucha ilusión que nos acompañen desde la misa.",
      "Los pases de tu invitación son los que aparecen en tu confirmación y son intransferibles.",
      "Confirma tu asistencia antes del 12 de octubre de 2026 para poder apartar tu lugar.",
    ],

    hospedaje: "Hospedaje",
    hospedajeSub1: "Si vienes de fuera, estas son nuestras",
    hospedajeSub2: "recomendaciones cerca de la recepción",
    reservar: "RESERVAR",
    comoLlegar: "CÓMO LLEGAR",
    hotelAnterior: "Hotel anterior",
    hotelSiguiente: "Hotel siguiente",
    zonas: [
      "Paseo Montejo · Calle 60 346",
      "By Marriott · Calle 60 346",
      "Av. Colón 498 · Centro",
    ],

    conCarino: "CON CARIÑO",
    lluviaTitulo: "Lluvia de sobres",
    lluviaHint: "Toca para abrir",
    lluviaAbrir: "Sobre: toca para abrir",
    lluvia: [
      "Queremos contarles una noticia muy especial: después de nuestro gran día iniciaremos una nueva aventura juntos y nos mudaremos a Atlanta. Por esta razón, y considerando nuestra próxima mudanza, hemos decidido no tener mesa de regalo.",
      "Queremos que sepan que el mejor regalo para nosotros será compartir nuestra boda con las personas que queremos. Sin embargo, sabemos que algunos de ustedes querrán tener un detalle con nosotros, así que, si así lo desean, el día de la boda encontrarán sobres disponibles para quienes deseen hacernos un regalo en efectivo.",
    ],

    transfEyebrow: "SI PREFIERES TRANSFERIR",
    transfTitulo: "Un detalle",
    transfSub: "Si no puedes entregarnos tu sobre ese día, aquí te dejamos nuestros datos.",
    transfCta: "Toca el detalle",
    transfAbrir: "Abrir el detalle",
    transfGraciasEyebrow: "CON TODO NUESTRO CARIÑO",
    transfGracias: "Gracias",
    cuenta: "Cuenta",
    clabe: "Cuenta CLABE",
    copiar: "COPIAR",
    copiado: "COPIADO",
    cerrar: "Cerrar",

    albumEyebrow: "COMPARTE TUS MOMENTOS",
    albumTitulo: "Álbum de fotos",
    albumSub: "Escanea el código y sube las fotos que tomes ese día: queremos verlo todo desde sus ojos.",
    albumQrAlt: "Código QR del álbum de fotos",

    rsvpTitulo: "Confirmación",
    rsvpSub: "Nos encantaría celebrar contigo",
    rsvpTienes: "Tienes",
    rsvpPase: "pase",
    rsvpPases: "pases",
    rsvpPara: "para",
    rsvpSinLink:
      "Para confirmar necesitas abrir el enlace personalizado que te enviaron por WhatsApp. Ese enlace lleva los nombres de tu invitación; si lo abres desde un reenvío o escribiendo la dirección a mano, no podemos identificarla.",
    rsvpNotaUno: "Tienes 1 pase reservado para ti.",
    rsvpNotaVarios: (n: number) =>
      `Tienes ${n} pases reservados. Aumenta el número de pases que vayas a ocupar.`,
    rsvpTodos: "Estás usando todos tus pases",
    rsvpDePases: (usa: number, total: number) => `${usa} de ${total} pases`,
    rsvpQuitarPase: "Quitar un pase",
    rsvpAgregarPase: "Agregar un pase",
    rsvpTuNombre: "Tu nombre completo",
    rsvpNombreN: (i: number) => `Nombre del invitado ${i}`,
    rsvpElige: "Por favor selecciona si asistirás o no.",
    rsvpUnNombre: "Por favor escribe al menos un nombre.",
    rsvpFaltan: (usa: number, escritos: number, faltan: number) =>
      `Elegiste ${usa} pases pero escribiste ${escritos} nombre${escritos === 1 ? "" : "s"}. ` +
      `Escribe ${faltan === 1 ? "el nombre que falta" : `los ${faltan} nombres que faltan`} ` +
      "o baja el contador a los pases que vas a utilizar.",
    rsvpSi: "Asistiré",
    rsvpNo: "No asistiré",
    rsvpEnviar: "Confirmar asistencia",
    rsvpVencido: "Fecha límite alcanzada",
    rsvpModificar: "Modificar mi respuesta",
    rsvpActualizar: "Actualizar respuesta",
    rsvpEnviando: "Enviando…",
    rsvpCerradas: "Confirmaciones cerradas",
    rsvpNoDisponible: "Enlace no disponible",
    rsvpReintentar: "Reintentar",
    rsvpGraciasNo: "Gracias por avisarnos",
    rsvpGraciasNoSub: "Lamentamos que no puedan acompañarnos. Los vamos a extrañar.",
    rsvpGraciasSi: "¡Gracias por confirmar!",
    rsvpEsperamos: (n: string) => `Te esperamos, ${n}.`,
    rsvpConfirmados: (n: number, l: string) => `Confirmamos ${n} lugares: ${l}.`,
    rsvpLimite: "Confirma tu asistencia antes del",
    rsvpLimiteNota:
      "Después de esa fecha solo podremos apartar lugar para quienes ya confirmaron.",
    errLink: "Este enlace ya no está activo. Por favor pide a los novios uno nuevo.",
    errCerradas: "Las confirmaciones ya están cerradas. Por favor avísanos directamente.",
    errEnvio: "Hubo un problema al enviar. Inténtalo de nuevo.",
    errCarga: "No pudimos cargar tu invitación. Recarga la página e inténtalo de nuevo.",
    errIdent: "No pudimos identificar tu invitación. Abre el enlace personalizado que te enviaron por WhatsApp.",
    errRed: "Sin conexión. Revisa tu internet e inténtalo de nuevo.",

    pieCredito: "DISEÑADO POR",
    musicaPlay: "Reproducir música",
    musicaPause: "Pausar música",
  },

  en: {
    mes: (m: number) => MESES_EN[m],
    fechaLarga: "December 26, 2026",
    limite: "October 12, 2026",

    gateTitulo: "Choose your language",
    gateEs: "Español",
    gateEn: "English",
    gateNota: "You can change it anytime",

    sobreHint: "Tap to open",

    portadaEyebrow: "OUR WEDDING",
    ciudad: "Mérida, Yucatán",
    ciudadLarga: "Mérida, Yucatán, Mexico",

    heroAmor1: "With all our love",
    heroAmor2: "and that of our families",
    padresNovio: "Parents of the groom",
    padresNovia: "Parents of the bride",
    heroInvita: "We are honored to invite you to",
    heroBoda: "our wedding",

    frase: "I would choose you, again and again, in this life and in every life.",

    faltan: "Only",
    dias: "Days",
    horas: "Hours",
    minutos: "Minutes",
    granDia: "to go until the big day",

    padrinosEyebrow: "OUR SPONSORS",
    velacion: "Veiling",
    anillos: "Rings",

    ceremonia: "Church Ceremony",
    horaCeremonia: "11:00 AM",
    zonaIglesia: "Umán, Yucatán",
    irUbicacion: "GET DIRECTIONS",

    recepcion: "Reception",
    horaRecepcion: "1:30 PM",
    dirRecepcion: "Paseo de Montejo 469 · Mérida",

    itinerarioTitulo: "How we'll celebrate",
    itinerario: [
      { time: "11:00 a.m.", label: "Church Ceremony", desc: "Parroquia de San Francisco de Asís, Umán." },
      { time: "1:30 p.m.", label: "Welcome cocktail", desc: "At Quinta Montes Molina." },
      { time: "2:00 p.m.", label: "The celebration", desc: "The party we've dreamed of sharing with you begins." },
      { time: "3:00 p.m.", label: "Lunch", desc: "We sit down together to honor our new chapter." },
      { time: "4:00 p.m.", label: "The dance floor opens", desc: "Nobody stays seated." },
      { time: "9:30 p.m.", label: "See you soon", desc: "We close the night with one last toast and many memories." },
    ],

    galeriaTitulo: "Our memories",
    galeriaSub: "Tap a photo to see it larger",
    fotoAnterior: "Previous photo",
    fotoSiguiente: "Next photo",
    cerrarFoto: "Close photo",

    climaLugar: "MÉRIDA, YUCATÁN",
    climaTitulo: "The weather",
    cielo: {
      despejado: "Clear", casiDespejado: "Mostly clear", nublado: "Cloudy",
      neblina: "Fog", lluvia: "Rain", chubascos: "Showers", tormenta: "Thunderstorms",
    },
    climaTipico: "Mild morning, warm afternoon",
    climaDia: "DAYTIME",
    climaNoche: "AT NIGHT",
    climaMax: "HIGH",
    climaMin: "LOW",
    climaLluvia: "RAIN",
    climaEspera: "In the days before the wedding you'll see the exact forecast for Mérida right here.",
    climaNota:
      "December mornings in Mérida are mild and by mid-afternoon the sun is strong. That's why the dress code is a long-sleeve guayabera and linen: it looks elegant and feels cool all day.",

    vestimenta: "Dress code",
    etiqueta1: "YUCATECAN",
    etiqueta2: "FORMAL",
    caballeros: "Gentlemen:",
    caballerosTxt: " long-sleeve guayabera or linen.",
    damas: "Ladies:",
    damasTxt: " long or cocktail dress.",
    coloresAviso1: "With love, we kindly ask you ",
    coloresAviso2: "not to wear",
    coloresAviso3: " these colors: they are reserved for the bride and the wedding party.",
    colores: ["White", "Ivory", "Nude", "Champagne", "Sky blue"],

    notasTitulo: "Notes",
    notas: [
      "The church ceremony is in Umán and the reception on Paseo de Montejo, in Mérida: please allow time to travel between them.",
      "We'll be waiting for you at 11:00 in the morning; it would mean a lot to have you with us from the ceremony.",
      "The seats on your invitation are the ones shown in your RSVP and cannot be transferred.",
      "Please RSVP before October 12, 2026 so we can save your seat.",
    ],

    hospedaje: "Where to stay",
    hospedajeSub1: "If you're coming from out of town, these are our",
    hospedajeSub2: "recommendations near the reception",
    reservar: "BOOK",
    comoLlegar: "DIRECTIONS",
    hotelAnterior: "Previous hotel",
    hotelSiguiente: "Next hotel",
    zonas: [
      "Paseo Montejo · Calle 60 346",
      "By Marriott · Calle 60 346",
      "Av. Colón 498 · Downtown",
    ],

    conCarino: "WITH LOVE",
    lluviaTitulo: "A shower of envelopes",
    lluviaHint: "Tap to open",
    lluviaAbrir: "Envelope: tap to open",
    lluvia: [
      "We have some very special news: after our big day we're starting a new adventure together and moving to Atlanta. For that reason, and with the move ahead of us, we've decided not to have a gift registry.",
      "We want you to know that the best gift for us will be sharing our wedding with the people we love. Still, we know some of you would like to give us something, so if you wish, on the wedding day there will be envelopes available for anyone who would like to give us a gift in cash.",
    ],

    transfEyebrow: "IF YOU PREFER A TRANSFER",
    transfTitulo: "A gift",
    transfSub: "If you can't hand us your envelope that day, here are our details.",
    transfCta: "Tap the gift",
    transfAbrir: "Open the gift",
    transfGraciasEyebrow: "WITH ALL OUR LOVE",
    transfGracias: "Thank you",
    cuenta: "Account",
    clabe: "CLABE account",
    copiar: "COPY",
    copiado: "COPIED",
    cerrar: "Close",

    albumEyebrow: "SHARE YOUR MOMENTS",
    albumTitulo: "Photo album",
    albumSub: "Scan the code and upload the photos you take that day: we want to see it all through your eyes.",
    albumQrAlt: "QR code for the photo album",

    rsvpTitulo: "RSVP",
    rsvpSub: "We would love to celebrate with you",
    rsvpTienes: "You have",
    rsvpPase: "seat",
    rsvpPases: "seats",
    rsvpPara: "for",
    rsvpSinLink:
      "To RSVP you need to open the personal link they sent you on WhatsApp. That link carries the names on your invitation; if you open it from a forward or by typing the address by hand, we can't identify it.",
    rsvpNotaUno: "You have 1 seat reserved for you.",
    rsvpNotaVarios: (n: number) =>
      `You have ${n} seats reserved. Increase the number of seats you will use.`,
    rsvpTodos: "You are using all your seats",
    rsvpDePases: (usa: number, total: number) => `${usa} of ${total} seats`,
    rsvpQuitarPase: "Remove a seat",
    rsvpAgregarPase: "Add a seat",
    rsvpTuNombre: "Your full name",
    rsvpNombreN: (i: number) => `Guest ${i} full name`,
    rsvpElige: "Please choose whether you will attend.",
    rsvpUnNombre: "Please write at least one name.",
    rsvpFaltan: (usa: number, escritos: number, faltan: number) =>
      `You chose ${usa} seats but wrote ${escritos} name${escritos === 1 ? "" : "s"}. ` +
      `Write the missing name${faltan === 1 ? "" : "s"} ` +
      "or lower the counter to the seats you will use.",
    rsvpSi: "I'll be there",
    rsvpNo: "I can't make it",
    rsvpEnviar: "Send my RSVP",
    rsvpVencido: "The deadline has passed",
    rsvpModificar: "Change my answer",
    rsvpActualizar: "Update my answer",
    rsvpEnviando: "Sending…",
    rsvpCerradas: "RSVPs closed",
    rsvpNoDisponible: "Link unavailable",
    rsvpReintentar: "Try again",
    rsvpGraciasNo: "Thank you for letting us know",
    rsvpGraciasNoSub: "We're sorry you can't join us. We'll miss you.",
    rsvpGraciasSi: "Thank you for your RSVP!",
    rsvpEsperamos: (n: string) => `We'll be waiting for you, ${n}.`,
    rsvpConfirmados: (n: number, l: string) => `${n} seats confirmed: ${l}.`,
    rsvpLimite: "Please RSVP before",
    rsvpLimiteNota: "After that date we can only save seats for those who replied.",
    errLink: "This link is no longer active. Please ask the couple for a new one.",
    errCerradas: "RSVPs are now closed. Please let us know directly.",
    errEnvio: "Something went wrong sending your RSVP. Please try again.",
    errCarga: "We couldn't load your invitation. Please reload the page and try again.",
    errIdent: "We couldn't identify your invitation. Open the personal link they sent you on WhatsApp.",
    errRed: "You're offline. Check your connection and try again.",

    pieCredito: "DESIGNED BY",
    musicaPlay: "Play music",
    musicaPause: "Pause music",
  },
} as const;

export type Textos = (typeof T)["es"];

const Ctx = createContext<{ lang: Lang; t: Textos; setLang: (l: Lang) => void }>({
  lang: "es",
  t: T.es,
  setLang: () => {},
});

export function LangProvider({
  lang,
  setLang,
  children,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  children: ReactNode;
}) {
  return (
    <Ctx.Provider value={{ lang, t: T[lang] as unknown as Textos, setLang }}>{children}</Ctx.Provider>
  );
}

export function useLang() {
  return useContext(Ctx);
}

/** Idioma guardado, o null si el invitado todavia no eligio. */
export function useLangGuardado() {
  const [lang, setLangState] = useState<Lang | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    let guardado: string | null = null;
    try {
      guardado = window.localStorage.getItem(CLAVE);
    } catch {
      /* navegacion privada o cookies bloqueadas: se pregunta de nuevo */
    }
    if (guardado === "es" || guardado === "en") setLangState(guardado);
    setListo(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(CLAVE, l);
    } catch {
      /* sin persistencia: el idioma dura lo que dure la visita */
    }
  };

  return { lang, setLang, listo };
}
