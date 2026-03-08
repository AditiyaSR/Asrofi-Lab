'use client';

import { useSyncExternalStore, useCallback } from 'react';

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  const subscribe = useCallback((callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', callback);
    
    return () => mediaQuery.removeEventListener('change', callback);
  }, []);

  return useSyncExternalStore(
    subscribe,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}
