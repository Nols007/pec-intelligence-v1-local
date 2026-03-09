import { useEffect, useState } from "react";

const STORAGE_KEY = "pec_demo_auth_v1";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === "true";
  } catch {
    return false;
  }
}

function save(value: boolean) {
  localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
}

export function useAuth() {
  const [isAuthed, setIsAuthed] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthed(load());
  }, []);

  function toggleDemo() {
    setIsAuthed((prev) => {
      const next = !prev;
      save(next);
      return next;
    });
  }

  return {
    isAuthed,
    toggleDemo,
  };
}