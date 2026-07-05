"use client";

import Link from "next/link";
import { useProfile } from "@/contexts/ProfileContext";
import { getModeMeta } from "@/lib/themes";
import type { TravelMode } from "@/lib/types";

type ModeShellProps = {
  mode: TravelMode;
  children: React.ReactNode;
};

export function ModeShell({ mode, children }: ModeShellProps) {
  const { username, profile } = useProfile();
  const modeMeta = getModeMeta(username, profile);

  return (
    <div className={mode === "found" ? "mode-found min-h-screen" : "mode-lost min-h-screen"}>
      {children}
      <footer className="site-footer">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <p className="font-display text-3xl">{modeMeta[mode].label} collection</p>
            <p className="mt-2 max-w-md text-sm leading-7 opacity-75">{modeMeta[mode].description}</p>
            {profile.isDemo ? (
              <p className="mt-4 text-xs tracking-[0.16em] uppercase opacity-55">
                Demo profile · {profile.name}
              </p>
            ) : null}
          </div>
          <Link href={modeMeta[mode].opposite.href} className="mode-switch-link">
            {modeMeta[mode].opposite.label}
          </Link>
        </div>
      </footer>
    </div>
  );
}
