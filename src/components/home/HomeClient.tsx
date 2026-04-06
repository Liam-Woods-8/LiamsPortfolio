"use client";

import { useState } from "react";
import { LandingScreen } from "@/components/landing/LandingScreen";
import { MainPortfolioLayout } from "@/components/portfolio/MainPortfolioLayout";
import { ArchiveTransition } from "@/components/transition/ArchiveTransition";

export function HomeClient() {
  const [entered, setEntered] = useState(false);

  return (
    <ArchiveTransition
      showLanding={!entered}
      landing={<LandingScreen onEnter={() => setEntered(true)} />}
      portfolio={<MainPortfolioLayout />}
    />
  );
}
