"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { Flourish } from "../Ornaments";

/**
 * Aviso de evento solo para adultos.
 * El texto lo escribió el cliente en sus detalles finales y va literal.
 */
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
          Solo adultos
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
          Los pequeños tienen un lugar enorme en nuestro corazón, pero ese
          día queremos celebrarlo entre adultos. Gracias por tu comprensión.
        </p>
      </Stagger>

    </AnimatedCard>
  );
}
