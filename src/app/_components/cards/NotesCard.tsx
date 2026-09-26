"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";

/**
 * Apartado de NOTAS que pidió el cliente en sus detalles finales.
 * Los cuatro textos van literales, tal como los escribió.
 */
const notas = [
  "La ceremonia religiosa es en Umán y la recepción en Paseo de Montejo, en Mérida: calcula el traslado entre una y otra.",
  "Te esperamos puntuales a las 11:00 de la mañana; nos hace mucha ilusión que nos acompañen desde la misa.",
  "Los pases de tu invitación son los que aparecen en tu confirmación y son intransferibles.",
  "Confirma tu asistencia antes del 12 de octubre de 2026 para poder apartar tu lugar.",
];
export default function NotesCard() {
  return (
    <AnimatedCard className="tex-beige text-center py-8" anim="slideRight">
      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "3rem", lineHeight: 1 }}>
          Notas
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-3">
          <OliveBranch width={100} color="var(--green-line)" />
        </div>
      </Stagger>

      <div className="mt-2">
        {notas.map((n, i) => (
          <Stagger key={i}>
            <div className="note-item">
              <span className="note-bullet" aria-hidden="true" />
              <p
                className="font-serif"
                style={{ color: "var(--ink-dark)", fontSize: "1.18rem", lineHeight: 1.6, fontWeight: 500 }}
              >
                {n}
              </p>
            </div>
          </Stagger>
        ))}
      </div>
    </AnimatedCard>
  );
}
