import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type PecView = "residential" | "portfolio" | "pecInternal";

type PecViewContextValue = {
  view: PecView;
  setView: (v: PecView) => void;
};

const PecViewContext = createContext<PecViewContextValue | null>(null);

const STORAGE_KEY = "pec_view_mode";

export function PecViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<PecView>("residential");

  // Load saved view (first mount)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
     if (
  saved === "residential" ||
  saved === "portfolio" ||
  saved === "pecInternal"
) {
        setViewState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist view
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, view);
    } catch {
      // ignore
    }
  }, [view]);

  const setView = (v: PecView) => setViewState(v);

  const value = useMemo(() => ({ view, setView }), [view]);

  return <PecViewContext.Provider value={value}>{children}</PecViewContext.Provider>;
}

export function usePecView() {
  const ctx = useContext(PecViewContext);
  if (!ctx) {
    throw new Error("usePecView must be used inside PecViewProvider");
  }
  return ctx;
}