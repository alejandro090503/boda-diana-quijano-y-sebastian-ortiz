"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCard, { Stagger } from "../AnimatedCard";

const PANEL_API = "https://panel-invitados.vercel.app/api/confirmar";
const RSVP_URL = "https://boda-sebastian-y-diana.vercel.app";
/* Fecha límite de confirmación: 12 de octubre de 2026 (coincide con el texto del pie). */
const DEADLINE = new Date(2026, 9, 12, 23, 59, 59, 999);

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* WhatsApp y Messenger cortan la URL en el primer espacio o "&". El panel manda
   un token base64url en ?i= ("nombre|pases|menores") que llega intacto.
   Se conserva ?para= para los links ya enviados. */
function decodeInvite(tok: string): string {
  try {
    let b64 = tok.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const nombre = new TextDecoder().decode(bytes).split("|")[0] || "";
    return nombre.trim();
  } catch {
    return "";
  }
}

/* Comparación sin acentos ni mayúsculas: quien respondió antes de tener
   nombres asignados pudo escribirlos ligeramente distinto. */
const clave = (x: string) =>
  x.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

export default function RSVPCard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("i") || "";
  const urlPara = (token ? decodeInvite(token) : searchParams.get("para") || "").trim();

  const frozen = Date.now() > DEADLINE.getTime();
  /* Nombres que los novios asignaron en el panel: una tarjeta por cada uno */
  const [asignados, setAsignados] = useState<string[]>([]);
  const [choices, setChoices] = useState<Record<number, "yes" | "no">>({});
  const [enviando, setEnviando] = useState(false);
  const [gateLoading, setGateLoading] = useState(!!urlPara);
  const [cerrada, setCerrada] = useState(false);
  const [bloqueada, setBloqueada] = useState(false);
  const [sinAsignados, setSinAsignados] = useState(false);
  const [resumen, setResumen] = useState<{ estado: "yes" | "no"; nombres: string[] } | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackKind, setFeedbackKind] = useState<"info" | "success" | "warn" | "error">("info");
  const [btnLabel, setBtnLabel] = useState(frozen ? "Fecha límite alcanzada" : "Confirmar asistencia");

  useEffect(() => {
    if (!urlPara) return;
    fetch(
      `${PANEL_API}?nombre=${encodeURIComponent(urlPara)}&url_boda=${encodeURIComponent(RSVP_URL)}`
    )
      .then((r) => r.json())
      .then((resp) => {
        const d = resp.invitado;
        const lista: string[] = Array.isArray(d?.nombres_asignados)
          ? d.nombres_asignados.filter((n: string) => n && String(n).trim())
          : [];
        if (!lista.length) {
          setSinAsignados(true);
          return;
        }
        setAsignados(lista);
        if (d.bloqueado) setBloqueada(true);

        if (d.estado === "confirmado" || d.estado === "declino") {
          const conf: string[] = (d.nombres_confirmados || []).map((n: string) => clave(String(n)));
          const previas: Record<number, "yes" | "no"> = {};
          lista.forEach((nm, i) => {
            previas[i] = d.estado === "declino" ? "no" : conf.includes(clave(nm)) ? "yes" : "no";
          });
          setChoices(previas);
          setBtnLabel("Actualizar respuesta");
          const asisten = lista.filter((_, i) => previas[i] === "yes");
          // Con respuesta ya guardada, la sección arranca CERRADA.
          setResumen({ estado: asisten.length ? "yes" : "no", nombres: asisten });
          setCerrada(true);
        }
      })
      .catch(() => {
        setFeedbackKind("error");
        setFeedback("No pudimos cargar tu invitación. Recarga la página e inténtalo de nuevo.");
      })
      .finally(() => setGateLoading(false));
  }, [urlPara]);

  const elegir = (i: number, v: "yes" | "no") => {
    if (frozen || bloqueada) return;
    setChoices((prev) => ({ ...prev, [i]: v }));
    setFeedback("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (frozen || enviando || bloqueada) return;
    if (!asignados.length) {
      setFeedbackKind("warn");
      setFeedback("No encontramos lugares asignados a esta invitación. Escríbenos para ayudarte.");
      return;
    }
    const faltan = asignados.filter((_, i) => !choices[i]).length;
    if (faltan > 0) {
      setFeedbackKind("warn");
      setFeedback(
        `Por favor responde por cada invitado (${faltan} pendiente${faltan === 1 ? "" : "s"}).`
      );
      return;
    }
    const asisten = asignados.filter((_, i) => choices[i] === "yes");
    const estado = asisten.length > 0 ? "confirmado" : "declino";

    setEnviando(true);
    setBtnLabel("Enviando…");
    setFeedback("");
    try {
      const res = await fetch(PANEL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: urlPara,
          url_boda: RSVP_URL,
          estado,
          pases_confirmados: asisten.length,
          nombres_confirmados: asisten,
        }),
      });
      const data = await res.json().catch(() => null);

      // La ronda de invitaciones puede estar cerrada desde el panel.
      if (res.status === 423) {
        setBloqueada(true);
        setFeedbackKind("warn");
        setFeedback("Las confirmaciones ya están cerradas. Por favor avísanos directamente.");
        setBtnLabel("Confirmaciones cerradas");
        return;
      }
      if (res.status === 410) {
        setBloqueada(true);
        setFeedbackKind("warn");
        setFeedback("Este enlace ya no está activo. Por favor pide a los novios uno nuevo.");
        setBtnLabel("Enlace no disponible");
        return;
      }
      // Solo se da por registrada si el panel la guardó de verdad.
      if (!res.ok || !data?.ok) {
        setFeedbackKind("error");
        setFeedback(
          data?.error === "no_match"
            ? "No pudimos identificar tu invitación. Abre el enlace personalizado que te enviaron por WhatsApp."
            : "Hubo un problema al enviar. Inténtalo de nuevo."
        );
        setBtnLabel("Reintentar");
        return;
      }

      setBtnLabel("Actualizar respuesta");
      setResumen({ estado: asisten.length ? "yes" : "no", nombres: asisten });
      setCerrada(true);
      setFeedback("");
    } catch {
      setFeedbackKind("error");
      setFeedback("Sin conexión. Revisa tu internet e inténtalo de nuevo.");
      setBtnLabel("Reintentar");
    } finally {
      setEnviando(false);
    }
  };

  const feedbackColor =
    feedbackKind === "success"
      ? "var(--olive-primary)"
      : feedbackKind === "warn"
        ? "var(--terracotta)"
        : feedbackKind === "error"
          ? "#8c2f22"
          : "var(--olive-primary)";

  const togglesDisabled = frozen || gateLoading || bloqueada;
  const sinLink = !urlPara;
  /* Sin link personalizado o sin nombres asignados no hay nada que registrar */
  const puedeResponder = !sinLink && !sinAsignados && asignados.length > 0;

  const resumenTexto = (() => {
    if (!resumen) return { titulo: "", sub: "" };
    if (resumen.estado === "no") {
      return {
        titulo: "Gracias por avisarnos",
        sub: "Lamentamos que no puedan acompañarnos. Los vamos a extrañar.",
      };
    }
    if (resumen.nombres.length === 1) {
      return { titulo: "¡Gracias por confirmar!", sub: `Te esperamos, ${resumen.nombres[0]}.` };
    }
    return {
      titulo: "¡Gracias por confirmar!",
      sub: `Confirmamos ${resumen.nombres.length} lugares: ${resumen.nombres.join(", ")}.`,
    };
  })();

  return (
    <AnimatedCard className="tex-fiber text-center" anim="unfold" corners={false}>
      <Stagger>
        <img
          src="/assets/olivo-acuarela.png"
          alt=""
          style={{ width: 140, height: "auto", margin: "0.25rem auto 0.75rem", opacity: 0.9 }}
        />
      </Stagger>

      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "3rem", lineHeight: 1 }}>
          Confirmación
        </p>
      </Stagger>

      <Stagger>
        <p className="font-serif italic mb-2 mt-1" style={{ color: "var(--ink-dark)", fontSize: "1.2rem" }}>
          Nos encantaría celebrar contigo
        </p>
      </Stagger>

      <Stagger>
        <div className="flex items-center gap-3 max-w-[280px] mx-auto mb-5">
          <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--green-line))", opacity: 0.9 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/pluma.png"
            alt=""
            aria-hidden="true"
            /* Inclinada: vertical rompia la linea de los dos filetes */
            style={{ height: 32, width: "auto", display: "block", opacity: 0.95, flexShrink: 0, transform: "rotate(-24deg)" }}
          />
          <span className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, var(--green-line))", opacity: 0.9 }} />
        </div>
      </Stagger>

      {puedeResponder && (
        <Stagger>
          <div
            className="max-w-[360px] mx-auto mb-5 px-5 py-3"
            style={{ backgroundColor: "rgba(31,28,25,0.06)", border: "1px solid var(--beige)", borderRadius: 14 }}
          >
            <p className="font-serif" style={{ color: "var(--ink-dark)", fontSize: "1.2rem", lineHeight: 1.5 }}>
              Tienes{" "}
              <span className="font-semibold" style={{ color: "var(--olive-primary)" }}>
                {asignados.length} {asignados.length === 1 ? "pase" : "pases"}
              </span>
              <br />
              para{" "}
              <span className="font-script" style={{ color: "var(--olive-primary)", fontSize: "1.8rem" }}>
                {urlPara}
              </span>
            </p>
          </div>
        </Stagger>
      )}

      {sinLink && (
        <Stagger>
          <p
            className="font-serif italic mx-auto max-w-[360px] mb-2"
            style={{ color: "var(--ink-dark)", fontSize: "1.05rem", lineHeight: 1.6 }}
          >
            Para confirmar necesitas abrir el enlace personalizado que te enviaron por WhatsApp. Ese
            enlace lleva los nombres de tu invitación; si lo abres desde un reenvío o escribiendo la
            dirección a mano, no podemos identificarla.
          </p>
        </Stagger>
      )}

      {sinAsignados && (
        <Stagger>
          <p
            className="font-serif italic mx-auto max-w-[360px] mb-2"
            style={{ color: "var(--terracotta)", fontSize: "1.05rem", lineHeight: 1.6 }}
          >
            No encontramos lugares asignados a esta invitación. Escríbenos para ayudarte.
          </p>
        </Stagger>
      )}

      {puedeResponder && (
        <Stagger>
          <AnimatePresence mode="wait" initial={false}>
            {cerrada ? (
              /* ── Panel de agradecimiento (la bandeja queda colapsada) ── */
              <motion.div
                key="gracias"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="max-w-[360px] mx-auto px-5 py-6"
                style={{
                  background: "rgba(255,253,249,0.72)",
                  border: "1.5px solid var(--beige)",
                  borderRadius: 16,
                }}
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--green-deep)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ margin: "0 auto 0.6rem", display: "block" }}
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="8.5 12.5 11 15 16 9.5" />
                </svg>

                <p
                  className="font-serif font-semibold"
                  style={{ color: "var(--ink-dark)", fontSize: "1.45rem", lineHeight: 1.35, marginBottom: "0.5rem" }}
                >
                  {resumenTexto.titulo}
                </p>
                <p
                  className="font-serif italic"
                  style={{ color: "var(--ink-dark)", fontSize: "1.15rem", lineHeight: 1.6, marginBottom: "1.1rem" }}
                >
                  {resumenTexto.sub}
                </p>

                {!bloqueada && (
                  <button
                    type="button"
                    onClick={() => {
                      if (frozen || bloqueada) return;
                      setCerrada(false);
                      setFeedback("");
                    }}
                    disabled={frozen}
                    className="font-serif italic transition-all disabled:opacity-45 disabled:cursor-not-allowed"
                    style={{
                      padding: "11px 24px",
                      border: "1.5px solid var(--beige)",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "1.05rem",
                      color: "var(--olive-primary)",
                      borderRadius: 24,
                    }}
                  >
                    Modificar mi respuesta
                  </button>
                )}
              </motion.div>
            ) : (
              /* ── Bandeja: una tarjeta por invitado asignado ── */
              <motion.form
                key="bandeja"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="max-w-[360px] mx-auto space-y-5"
              >
                <div className="space-y-3">
                  {asignados.map((nm, i) => {
                    const sel = choices[i];
                    return (
                      <div
                        key={`p-${i}`}
                        className="px-4 py-3"
                        style={{
                          border: `1.5px solid ${
                            sel === "yes"
                              ? "var(--olive-primary)"
                              : sel === "no"
                                ? "var(--terracotta)"
                                : "var(--beige)"
                          }`,
                          background:
                            sel === "yes"
                              ? "rgba(31,28,25,0.07)"
                              : sel === "no"
                                ? "rgba(125,79,79,0.07)"
                                : "rgba(255,253,249,0.6)",
                          borderRadius: 14,
                        }}
                      >
                        <p
                          className="font-serif font-semibold mb-2"
                          style={{ color: "var(--ink-dark)", fontSize: "1.15rem", lineHeight: 1.3 }}
                        >
                          {nm}
                        </p>
                        <div className="flex gap-2">
                          {(["yes", "no"] as const).map((val) => {
                            const activo = sel === val;
                            const isYes = val === "yes";
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => elegir(i, val)}
                                disabled={togglesDisabled}
                                aria-pressed={activo}
                                className="flex-1 py-2 font-serif italic transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                  border: `1.5px solid ${
                                    activo ? (isYes ? "var(--olive-primary)" : "var(--terracotta)") : "var(--beige)"
                                  }`,
                                  backgroundColor: activo
                                    ? isYes
                                      ? "var(--olive-primary)"
                                      : "var(--terracotta)"
                                    : "rgba(255,253,249,0.55)",
                                  color: activo ? "var(--bg-cream)" : "var(--ink-dark)",
                                  fontSize: "1rem",
                                  borderRadius: 10,
                                }}
                              >
                                {isYes ? "Asistiré" : "No asistiré"}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  disabled={enviando || frozen || bloqueada}
                  className="w-full py-4 font-sans-label transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--olive-primary)",
                    color: "var(--bg-cream)",
                    letterSpacing: "0.25em",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    borderRadius: 50,
                    boxShadow: "0 6px 18px rgba(31,28,25,0.3)",
                  }}
                >
                  {btnLabel}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Stagger>
      )}

      {feedback && (
        <Stagger>
          <p
            className="font-serif italic mt-4 mx-auto max-w-[360px]"
            style={{ color: feedbackColor, fontSize: "1.05rem", lineHeight: 1.6, textAlign: "center" }}
          >
            {feedback}
          </p>
        </Stagger>
      )}

      <Stagger>
        <div className="flex items-center justify-center gap-2 mt-6 mx-auto text-center" style={{ color: "var(--olive-primary)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z" />
          </svg>
          <span className="font-serif" style={{ color: "var(--ink-dark)", fontSize: "1.1rem", lineHeight: 1.5 }}>
            Gracias por confirmar antes del
            <br />
            <span className="font-semibold">12 de octubre 2026</span>
          </span>
        </div>
      </Stagger>
    </AnimatedCard>
  );
}
