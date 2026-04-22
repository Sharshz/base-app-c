'use client';

import { sdk } from '@farcaster/miniapp-sdk';
import { useEffect, useState } from 'react';

export function useFarcasterSDK() {
  const [isReady, setIsReady] = useState(false);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const ctx = await sdk.context;
        setContext(ctx);
        sdk.actions.ready();
        setIsReady(true);
      } catch (error) {
        console.error('Farcaster SDK init error:', error);
      }
    };

    if (typeof window !== 'undefined') {
      init();
    }
  }, []);

  return { isReady, context };
}
