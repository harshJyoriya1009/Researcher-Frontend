'use client';

import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';
import { SplineScene } from '@/components/ui/splite';

export function SplineSceneBasic() {
  return (
    <Card className="relative h-[500px] w-full overflow-hidden border-border bg-black/[0.96]">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="flex h-full flex-col lg:flex-row">
        <div className="relative z-10 flex flex-1 flex-col justify-center p-8 lg:p-10">
          <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Researcher AI
          </h2>
          <p className="mt-4 max-w-lg text-neutral-300">
            Bring your UI to life with a polished 3D scene that feels native to the page.
          </p>
        </div>

        <div className="relative flex-1 min-h-[260px] lg:min-h-0">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      </div>
    </Card>
  );
}
