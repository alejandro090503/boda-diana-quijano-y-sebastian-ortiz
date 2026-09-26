"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";

/**
 * Los novios NO tienen mesa de regalos: se mudan a Atlanta despues de la boda.
 * El texto de abajo va literal, tal como lo escribio el cliente.
 */
const parrafos = [
  "Queremos contarles una noticia muy especial: después de nuestro gran día iniciaremos una nueva aventura juntos y nos mudaremos a Atlanta. Por esta razón, y considerando nuestra próxima mudanza, hemos decidido no tener mesa de regalo.",
  "Queremos que sepan que el mejor regalo para nosotros será compartir nuestra boda con las personas que queremos. Sin embargo, sabemos que algunos de ustedes querrán tener un detalle con nosotros, así que, si así lo desean, el día de la boda encontrarán sobres disponibles para quienes deseen hacernos un regalo en efectivo.",
];

export default function GiftsCard() {
  return (
    <AnimatedCard className="card-terracotta text-center py-8" anim="rotateIn">
      <Stagger>
        <p
          className="font-sans-label mb-2"
          style={{ color: "var(--olive-soft)", fontSize: "0.8rem", fontWeight: 600 }}
        >
          CON CARIÑO
        </p>
      </Stagger>

      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.9rem", lineHeight: 1.05 }}>
          Lluvia de sobres
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-3">
          <OliveBranch width={100} color="var(--green-line)" />
        </div>
      </Stagger>

      {parrafos.map((t, i) => (
        <Stagger key={i}>
          <p
            className="font-serif mx-auto px-1"
            style={{
              color: "var(--ink-dark)",
              fontSize: "1.18rem",
              lineHeight: 1.7,
              fontWeight: 500,
              maxWidth: "340px",
              marginTop: i > 0 ? "1rem" : 0,
              textAlign: "left",
            }}
          >
            {t}
          </p>
        </Stagger>
      ))}

      <Stagger>
        <div className="mt-6 flex justify-center">
          <svg width="40" height="32" viewBox="0 0 40 32" fill="none" stroke="var(--green-line)" strokeWidth="1.1" opacity="0.9">
            <rect x="1" y="1" width="38" height="30" rx="1" />
            <path d="M1 1 L20 18 L39 1" />
          </svg>
        </div>
      </Stagger>
    </AnimatedCard>
  );
}
