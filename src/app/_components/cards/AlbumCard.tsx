"use client";

import { useEffect, useState } from "react";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


/**
 * Album de fotos estandar de Elysium: el QR abre /album, que redirige al
 * panel de invitados (panel-invitados.vercel.app/subir/<slug>). La base solo
 * acepta fotos desde el dia del evento; aqui el QR se ve borroso antes.
 */
const HASHTAG = "#SebastianyDiana2026";
const FECHA_EVENTO = "2026-12-26";

export default function AlbumCard() {
  const { t } = useLang();
  // Antes del dia del evento el QR se ve borroso (la base ademas rechaza fotos antes de tiempo).
  const [bloqueado, setBloqueado] = useState(true);
  useEffect(() => {
    const [y, m, d] = FECHA_EVENTO.split("-").map(Number);
    setBloqueado(new Date() < new Date(y, m - 1, d, 0, 0, 0));
  }, []);
  return (
    <AnimatedCard className="tex-beige text-center py-9" anim="slideLeft">
      <Stagger>
        <p
          className="font-sans-label"
          style={{ color: "var(--olive-soft)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}
        >
          {t.albumEyebrow}
        </p>
      </Stagger>

      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.9rem", lineHeight: 1.05 }}>
          {t.albumTitulo}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-3">
          <OliveBranch width={100} color="var(--green-line)" />
        </div>
      </Stagger>

      <Stagger>
        <p
          className="font-serif italic mx-auto px-2"
          style={{ color: "var(--ink-dark)", fontSize: "1.25rem", lineHeight: 1.6, maxWidth: "310px" }}
        >
          {t.albumSub}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center mt-5">
          {/* Album de Elysium: el QR abre /album → panel-invitados.vercel.app/subir/boda-sebastian-y-diana */}
          <div className={`album-qr${bloqueado ? " bloqueado" : ""}`} data-fecha={FECHA_EVENTO}>
            <div
              style={{
                display: "block",
                padding: 14,
                borderRadius: 4,
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--gold-antique)",
                boxShadow: "0 8px 22px rgba(22,32,46,0.16)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/qr-album.png"
                alt={t.albumQrAlt}
                width={168}
                height={168}
                style={{ display: "block", width: 168, height: 168 }}
              />
            </div>
            <a className="album-btn font-sans-label" href="/album">
              {t.albumBtn}
            </a>
          </div>
        </div>
      </Stagger>

      <Stagger>
        <p
          className={`album-aviso font-serif italic mx-auto px-2${bloqueado ? "" : " album-aviso-oculto"}`}
          style={{ color: "var(--ink-dark)", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "300px" }}
        >
          {t.albumAviso}
        </p>
      </Stagger>

      <Stagger>
        <p className="font-script mt-4 foil" style={{ fontSize: "1.9rem", lineHeight: 1.2 }}>
          {HASHTAG}
        </p>
      </Stagger>
    </AnimatedCard>
  );
}
