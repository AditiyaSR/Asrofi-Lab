'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore, useCallback } from 'react';
import ParticleBackground from './ParticleBackground';

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function ParticleBackgroundClient() {
  const { theme } = useTheme();
  
  const subscribe = useCallback(() => {
    return () => {};
  }, []);

  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10 bg-black" />
    );
  }

  return <ParticleBackground isDark={theme === 'dark'} />;
}
