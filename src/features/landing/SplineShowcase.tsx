import { SplineSceneBasic } from '@/components/ui/spline-scene-basic';

export function SplineShowcase() {
  return (
    <section className="border-b border-border px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            A showcase section for the Spline scene
          </h2>
          <p className="mt-3 text-muted-foreground">
            The component is now available as a reusable shadcn-style primitive and rendered on the landing page.
          </p>
        </div>

        <div className="mt-12">
          <SplineSceneBasic />
        </div>
      </div>
    </section>
  );
}
