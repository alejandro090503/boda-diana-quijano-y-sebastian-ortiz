"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeLoader from "./EnvelopeLoader";
import AudioPlayer, { type AudioAPI } from "./AudioPlayer";
import Petals from "./Petals";
import CoverCard from "./cards/CoverCard";
import HeroCard from "./cards/HeroCard";
import VerseCard from "./cards/VerseCard";
import CountdownCard from "./cards/CountdownCard";
import PadrinosCard from "./cards/PadrinosCard";
import CeremonyCard from "./cards/CeremonyCard";
import ReceptionCard from "./cards/ReceptionCard";
import ItineraryCard from "./cards/ItineraryCard";
import GalleryCard from "./cards/GalleryCard";
import WeatherCard from "./cards/WeatherCard";
import DressCodeCard from "./cards/DressCodeCard";
import AdultsCard from "./cards/AdultsCard";
import NotesCard from "./cards/NotesCard";
import HotelsCard from "./cards/HotelsCard";
import GiftsCard from "./cards/GiftsCard";
import GiftBoxCard from "./cards/GiftBoxCard";
import AlbumCard from "./cards/AlbumCard";
import RSVPCard from "./cards/RSVPCard";
import { FECHA_PUNTEADA } from "../_data/fecha";

export default function InvitationClient() {
  const [phase, setPhase] = useState<"envelope" | "cards">("envelope");
  const audio = useRef<AudioAPI>(null);

  return (
    <>
      <AudioPlayer ref={audio} />

      <AnimatePresence>
        {phase === "envelope" && (
          <EnvelopeLoader
            key="env"
            onOpen={() => setPhase("cards")}
            /* el play va dentro del gesto de abrir el sobre: si se llama
               despues, el navegador lo bloquea por autoplay */
            onTap={() => audio.current?.play()}
          />
        )}
      </AnimatePresence>

      {phase === "cards" && <Petals />}

      {phase === "cards" && <CoverCard />}

      {phase === "cards" && (
        <main className="relative z-10 flex flex-col items-center py-8 px-4 max-w-[500px] mx-auto">
          <HeroCard />
          <VerseCard />
          <CountdownCard />
          <PadrinosCard />
          <CeremonyCard />
          <ReceptionCard />
          <ItineraryCard />
          <GalleryCard />
          <WeatherCard />
          <DressCodeCard />
          <AdultsCard />
          <NotesCard />
          <HotelsCard />
          <GiftsCard />
          <GiftBoxCard />
          <AlbumCard />
          <RSVPCard />

          <footer className="text-center mt-4 mb-8">
            <div className="divider" />
            <p className="font-script mt-4 foil" style={{ fontSize: "2.2rem" }}>
              Sebastián &amp; Diana
            </p>
            <p className="font-sans-label mt-2" style={{ color: "var(--ink-dark)", fontSize: "0.8rem", fontWeight: 600 }}>
              {FECHA_PUNTEADA}
            </p>
            <p className="font-sans-label mt-4" style={{ color: "var(--ink-dark)", fontSize: "0.66rem", fontWeight: 500 }}>
              DISEÑADO POR{" "}
              <a
                href="https://instagram.com/elysium.invitaciones"
                target="_blank"
                rel="noopener noreferrer"
                className="credito-link"
                style={{ color: "var(--olive-soft)", textDecoration: "none" }}
              >
                @ELYSIUM
              </a>
            </p>
          </footer>
        </main>
      )}
    </>
  );
}
