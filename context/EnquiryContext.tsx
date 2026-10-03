'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ENQUIRY_STORAGE_KEY } from '@/lib/theme';
import { getProduct } from '@/lib/products';

type EnquiryMap = Record<number, number>;

export type EnquiryLine = {
  n: number;
  num: string;
  name: string;
  qty: number;
};

type EnquiryContextValue = {
  enquiry: EnquiryMap;
  count: number;
  items: EnquiryLine[];
  isAdded: (n: number) => boolean;
  toggle: (n: number) => void;
  setQty: (n: number, qty: number) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [enquiry, setEnquiry] = useState<EnquiryMap>({});
  const skipNextWrite = useRef(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ENQUIRY_STORAGE_KEY) || '{}');
      // One-time client-only hydration from localStorage (unavailable during SSR), not a render-time read.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved && typeof saved === 'object' && Object.keys(saved).length) setEnquiry(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    try {
      localStorage.setItem(ENQUIRY_STORAGE_KEY, JSON.stringify(enquiry));
    } catch {
      /* storage unavailable */
    }
  }, [enquiry]);

  const toggle = useCallback((n: number) => {
    setEnquiry((prev) => {
      const next = { ...prev };
      if (next[n]) delete next[n];
      else next[n] = 1;
      return next;
    });
  }, []);

  const setQty = useCallback((n: number, qty: number) => {
    setEnquiry((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[n];
      else next[n] = qty;
      return next;
    });
  }, []);

  const isAdded = useCallback((n: number) => !!enquiry[n], [enquiry]);

  const items: EnquiryLine[] = Object.keys(enquiry)
    .map(Number)
    .sort((a, b) => a - b)
    .map((n) => {
      const p = getProduct(n);
      return { n, num: p?.num ?? '', name: p?.name ?? '', qty: enquiry[n] };
    });

  return (
    <EnquiryContext.Provider value={{ enquiry, count: items.length, items, isAdded, toggle, setQty }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider');
  return ctx;
}
