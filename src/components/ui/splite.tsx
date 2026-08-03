'use client';

import { lazy, Suspense } from 'react';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (app: Application) => void;
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={(app) => {
          app.setGlobalEvents(true);
          onLoad?.(app);
        }}
      />
    </Suspense>
  );
}
