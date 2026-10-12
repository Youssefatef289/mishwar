"use client";
import { useEffect } from 'react';
import { initStorage } from '@/utils/storage';

export default function AppInitializer() {
  useEffect(() => {
    initStorage();
  }, []);
  
  return null;
}

