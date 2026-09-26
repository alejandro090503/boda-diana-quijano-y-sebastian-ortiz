"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";

// Los tres hoteles que recomendo el cliente, todos sobre Paseo de Montejo.
const hotels = [
  {
    name: "NH Collection Mérida Paseo Montejo",
    zona: "Calle 60 346 · Zona Paseo Montejo",
    mapUrl: "https://maps.app.goo.gl/Y3ByGxws2EZy8ui68",
    webUrl: "https://www.nh-hotels.com/es/hotel/nh-collection-merida-paseo-montejo",
  },
  {
    name: "City Express Plus by Marriott Mérida",
    zona: "Calle 60 346 · Centro",
    mapUrl: "https://maps.app.goo.gl/LwM1bf6svGFJzbW37",
    webUrl: "https://www.marriott.com/es/hotels/midcy-city-express-plus-by-marriott-merida/overview/",
  },
  {
    name: "Holiday Inn Mérida by IHG",
    zona: "Av. Colón 498 · entre Paseo de Montejo y Calle 60",
    mapUrl: "https://maps.app.goo.gl/LjfbBMsxLEXASiua7",
    webUrl: "https://www.ihg.com/holidayinn/hotels/us/es/merida/midmx/hoteldetail",
  },
];

export default function HotelsCard() {
  return (
    <AnimatedCard className="tex-emboss text-center py-9" anim="blurRise">
      <Stagger>
        <p className="font-script mb-1" style={{ color: "var(--olive-primary)", fontSize: "3rem", lineHeight: 1 }}>
          Hospedaje
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center mb-2">
          <img
            src="/assets/sobre-motivo-chico.png"
            alt=""
            className="pointer-events-none"
            style={{ width: 90, height: "auto", opacity: 0.95 }}
          />
        </div>
      </Stagger>

      <Stagger>
        <p className="font-serif italic text-lg mb-5 px-2" style={{ color: "var(--ink-dark)", lineHeight: 1.6 }}>
          Si vienes de fuera, estas son nuestras
          <br />recomendaciones cerca de la recepción
        </p>
      </Stagger>

      {hotels.map((hotel, i) => (
        <Stagger key={hotel.name}>
          <div
            className={i > 0 ? "mt-5 pt-5" : ""}
            style={i > 0 ? { borderTop: "1px solid var(--beige)" } : {}}
          >
            <p className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "1.5rem", lineHeight: 1.3 }}>
              {hotel.name}
            </p>
            <p className="font-serif" style={{ color: "var(--terracotta)", fontSize: "1.08rem", lineHeight: 1.5, marginTop: "0.15rem" }}>
              {hotel.zona}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <a href={hotel.webUrl} target="_blank" rel="noopener noreferrer" className="btn-map">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
                </svg>
                RESERVAR
              </a>
              <a href={hotel.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-map btn-olive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                VER MAPA
              </a>
            </div>
          </div>
        </Stagger>
      ))}
    </AnimatedCard>
  );
}
