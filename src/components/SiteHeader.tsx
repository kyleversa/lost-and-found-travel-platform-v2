"use client";

import Link from "next/link";
import { useProfile } from "@/contexts/ProfileContext";
import { getModeMeta } from "@/lib/themes";
import type { TravelMode } from "@/lib/types";

type SiteHeaderProps = {
  mode?: TravelMode;
};

export function SiteHeader({ mode }: SiteHeaderProps) {
  const { username, profile } = useProfile();
  const modeMeta = getModeMeta(username, profile);

  return (
    <header className="site-header">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-10">
        <Link href="/" className="brand-mark">
          Lost <span>&amp;</span> Found
        </Link>

        {mode ? (
          <nav className="mode-toggle" aria-label="Collection mode">
            <span className="mode-toggle-current" aria-current="page">
              <span className="mode-toggle-dot" aria-hidden="true" />
              {modeMeta[mode].label}
            </span>
            <Link href={modeMeta[mode].opposite.href} className="mode-toggle-switch">
              {modeMeta[mode].opposite.label}
              <span className="mode-toggle-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
