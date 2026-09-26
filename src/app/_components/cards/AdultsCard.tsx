"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { Flourish } from "../Ornaments";

/** Los novios confirmaron que los ninos son bienvenidos a la fiesta. */
export default function AdultsCard() {
  return (
    <AnimatedCard className="tex-fiber text-center py-9" anim="rotateIn">
      <Stagger>
        <p
          className="font-sans-label"
          style={{ color: "var(--olive-soft)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem" }}
        >
          CON TODO CARIÑO
        </p>
      </Stagger>

      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.9rem", lineHeight: 1.1 }}>
          Los niños son bienvenidos
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-3 w-full">
          <Flourish color="var(--green-line)" width={140} />
        </div>
      </Stagger>

      <Stagger>
        <p
          className="font-serif italic mx-auto px-2"
          style={{ color: "var(--ink-dark)", fontSize: "1.3rem", lineHeight: 1.65, maxWidth: "320px" }}
        >
          Queremos celebrar con toda la familia, así que los pequeños de la casa
          tienen su lugar en la fiesta. ¡Los esperamos!
        </p>
      </Stagger>
    </AnimatedCard>
  );
}
