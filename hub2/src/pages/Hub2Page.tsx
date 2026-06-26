import { CinematicHero } from "@/components/ui/cinematic-hero";
import { Hub2Landing } from "@/pages/Hub2Landing";

export default function Hub2Page() {
  return (
    <div className="overflow-x-hidden w-full min-h-screen bg-[#080B0A]">
      <CinematicHero
        tagline1="Ferramentas que"
        tagline2="aceleram seu fluxo."
        ctaHeading="Explorar ferramentas."
        ctaDescription="Ferramentas criadas para quem ama interfaces bonitas e código limpo. Tudo open source."
      />
      <Hub2Landing />
    </div>
  );
}
