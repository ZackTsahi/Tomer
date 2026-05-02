import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type SavedContextValue = {
  ids: string[];
  isSaved: (productId: string) => boolean;
  toggle: (productId: string) => void;
  clear: () => void;
};

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const isSaved = useCallback(
    (productId: string) => ids.includes(productId),
    [ids],
  );

  const toggle = useCallback((productId: string) => {
    setIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo<SavedContextValue>(
    () => ({ ids, isSaved, toggle, clear }),
    [ids, isSaved, toggle, clear],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used within SavedProvider');
  return ctx;
}
