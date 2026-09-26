"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


// Los dos grupos de padrinos, tal como los entrego el cliente.
const PAREJAS = [
  [{ el: "José Baltazar Cauich Uc", ella: "María Fany Brito Quijano" }],
  [{ el: "Alejandro Castro Zacarías", ella: "Aída Edith Arévalo Domínguez" }],
];

export default function PadrinosCard() {
  const { t } = useLang();
  const grupos = [
    { titulo: t.velacion, parejas: PAREJAS[0] },
    { titulo: t.anillos, parejas: PAREJAS[1] },
  ];
  return (
    <AnimatedCard className="tex-beige text-center py-8" anim="slideLeft">
      <Stagger>
        <p
          className="font-sans-label"
          style={{ color: "var(--olive-soft)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}
        >
          {t.padrinosEyebrow}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-3">
          <OliveBranch width={96} color="var(--green-line)" />
        </div>
      </Stagger>

      {grupos.map((g, gi) => (
        <div
          key={g.titulo}
          className={gi > 0 ? "mt-7 pt-7" : ""}
          style={gi > 0 ? { borderTop: "1px solid var(--beige)" } : {}}
        >
          <Stagger>
            <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.6rem", lineHeight: 1.05 }}>
              {g.titulo}
            </p>
          </Stagger>

          {g.parejas.map((p, i) => (
            <Stagger key={i}>
              <div className="mt-3">
                <p className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "1.45rem", lineHeight: 1.5 }}>
                  {p.el}
                </p>
                <p className="font-script my-0.5" style={{ color: "var(--gold-antique)", fontSize: "1.7rem", lineHeight: 1 }}>
                  &amp;
                </p>
                <p className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "1.45rem", lineHeight: 1.5 }}>
                  {p.ella}
                </p>
              </div>
            </Stagger>
          ))}
        </div>
      ))}
    </AnimatedCard>
  );
}
