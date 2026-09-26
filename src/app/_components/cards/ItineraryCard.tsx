"use client";

import Image from "next/image";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";

type Evt = { time: string; label: string; desc: string; icon: string };

// Itinerario tal cual lo entregó el cliente.
const events: Evt[] = [
  {
    time: "11:00 a.m.",
    label: "Ceremonia Religiosa",
    desc: "Parroquia de San Francisco de Asís, Umán.",
    icon: "/iconos/iglesia.png",
  },
  {
    time: "1:30 p.m.",
    label: "Cóctel de bienvenida",
    desc: "En la Quinta Montes Molina.",
    icon: "/iconos/arco.png",
  },
  {
    time: "2:00 p.m.",
    label: "La celebración",
    desc: "Da inicio la fiesta que hemos soñado compartir contigo.",
    icon: "/iconos/novios.png",
  },
  {
    time: "3:00 p.m.",
    label: "Comida",
    desc: "Compartimos la mesa en honor de nuestro nuevo capítulo.",
    icon: "/iconos/cena.png",
  },
  {
    time: "4:00 p.m.",
    label: "Abrimos la pista",
    desc: "Que nadie se quede sentado.",
    icon: "/iconos/fiesta.png",
  },
  {
    time: "9:30 p.m.",
    label: "Hasta pronto",
    desc: "Cerramos la noche con una última copa y muchos recuerdos.",
    icon: "/iconos/anillos.png",
  },
];
export default function ItineraryCard() {
  return (
    <AnimatedCard className="card-arch tex-emboss" anim="slideRight">
      <Stagger>
        <div className="flex justify-center" style={{ marginBottom: "0.25rem" }}>
          <img
            src="/assets/sobre-motivo-chico.png"
            alt=""
            className="pointer-events-none"
            style={{ width: 105, height: "auto", opacity: 0.95 }}
          />
        </div>
      </Stagger>
      <Stagger>
        <p className="font-script text-center" style={{ color: "var(--olive-primary)", fontSize: "3.4rem", lineHeight: 1.05 }}>
          Así celebraremos
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center mb-6">
          <OliveBranch width={112} color="var(--green-line)" />
        </div>
      </Stagger>

      <div className="relative">
        {/* línea vertical conectora */}
        <div
          className="absolute top-5 bottom-5"
          style={{
            left: 23,
            width: 1.5,
            background: "linear-gradient(var(--gold-antique), var(--beige))",
            opacity: 0.5,
          }}
        />

        {events.map((evt, i) => {
          const isLast = i === events.length - 1;
          return (
            <Stagger key={i}>
              <div
                className="flex gap-2.5"
                style={{ paddingBottom: isLast ? 0 : 46 }}
              >
                {/* nodo con icono a mano alzada */}
                <div
                  className="relative z-10 shrink-0 flex items-center justify-center rounded-full mt-0.5"
                  style={{
                    width: 42,
                    height: 42,
                    backgroundColor: "var(--bg-cream)",
                    border: `1px solid var(--gold-antique)`,
                    boxShadow: "0 2px 6px rgba(59,48,40,0.1)",
                  }}
                >
                  <Image
                    src={evt.icon}
                    alt={evt.label}
                    width={30}
                    height={30}
                    style={{ objectFit: "contain" }}
                  />
                </div>

                {/* contenido */}
                <div className="text-left flex-1 min-w-0 pt-1">
                  {evt.time && (
                    <p
                      className="font-serif font-semibold leading-none"
                      style={{ color: "var(--ink-dark)", fontSize: "1.72rem" }}
                    >
                      {evt.time}
                    </p>
                  )}
                  <p
                    className="font-sans-label mt-1"
                    style={{ color: "var(--ink-dark)", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.05em", whiteSpace: "pre-line", lineHeight: 1.5 }}
                  >
                    {evt.label}
                  </p>
                  {evt.desc && (
                    <p
                      className="font-serif italic mt-1.5 text-justify"
                      style={{ color: "var(--ink-dark)", fontSize: "1.23rem", lineHeight: 1.6 }}
                    >
                      {evt.desc}
                    </p>
                  )}
                </div>
              </div>
            </Stagger>
          );
        })}
      </div>
    </AnimatedCard>
  );
}
