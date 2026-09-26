"use client";

import { useEffect, useState } from "react";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { FECHA_BODA } from "../../_data/fecha";

export default function CountdownCard() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const fecha = FECHA_BODA;
    if (!fecha) return;
    const compute = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diffMs = fecha.getTime() - today.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      setDays(Math.max(diffDays, 0));
    };
    compute();
    const interval = setInterval(compute, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedCard className="tex-count text-center py-9" anim="zoom">
      <Stagger>
        <div className="flex justify-center mb-3">
          <OliveBranch width={100} color="var(--green-line)" />
        </div>
      </Stagger>

      {FECHA_BODA ? (
        <>
          <Stagger>
            <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "3.2rem", lineHeight: 1.1 }}>
              Faltan
            </p>
          </Stagger>

          <Stagger>
            <p
              className="font-script"
              style={{
                color: "var(--olive-primary)",
                fontSize: "5rem",
                lineHeight: 1,
                margin: "0.5rem 0",
                minHeight: "5rem",
              }}
            >
              {days === null ? " " : days}
            </p>
          </Stagger>

          <Stagger>
            <p className="font-serif italic text-center" style={{ color: "var(--ink-dark)", fontSize: "1.3rem" }}>
              {days ?? "…"} días para el gran día
            </p>
          </Stagger>
        </>
      ) : (
        /* PENDIENTE: fecha del evento. Al ponerla en src/app/_data/fecha.ts
           esta tarjeta vuelve sola al contador de días. */
        <>
          <Stagger>
            <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "3.2rem", lineHeight: 1.15 }}>
              Muy pronto
            </p>
          </Stagger>

          <Stagger>
            <div className="fleuron" style={{ margin: "0.9rem auto" }}>
              <span style={{ color: "var(--rose-deco)", fontSize: "1.6rem" }}>&#10086;</span>
            </div>
          </Stagger>

          <Stagger>
            <p
              className="font-serif italic mx-auto"
              style={{ color: "var(--ink-dark)", fontSize: "1.3rem", lineHeight: 1.6, maxWidth: "290px" }}
            >
              Estamos afinando los últimos detalles. En cuanto tengamos la fecha
              definitiva, aquí mismo verás la cuenta regresiva.
            </p>
          </Stagger>
        </>
      )}
    </AnimatedCard>
  );
}
