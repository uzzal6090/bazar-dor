"use client";

import { useSyncExternalStore } from "react";
import { getBanglaDate } from "@/lib/format";

const subscribe = () => () => {};

export default function BanglaDate({ className }: { className?: string }) {
  const text = useSyncExternalStore(
    subscribe,
    () => getBanglaDate(),
    () => "",
  );

  return (
    <p className={className} suppressHydrationWarning>
      {text || "\u00a0"}
    </p>
  );
}