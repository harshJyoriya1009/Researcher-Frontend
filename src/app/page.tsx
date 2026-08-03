import { LandingNavbar } from "@/features/landing/LandingNavbar";
import { Hero } from "@/features/landing/Hero";
import { Features } from "@/features/landing/Features";
import { TechStack } from "@/features/landing/TechStack";
import { CTA } from "@/features/landing/CTA";
import { Footer } from "@/components/shared/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-transparent">
      <LandingNavbar />
      <Hero />
      <Features />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  );
}
