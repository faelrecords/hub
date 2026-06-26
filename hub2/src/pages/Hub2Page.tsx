import { CinematicHero } from "@/components/ui/cinematic-hero";
import { Hub2Landing } from "@/pages/Hub2Landing";

export default function Hub2Page() {
  return (
    <div className="overflow-x-hidden w-full min-h-screen bg-[#080B0A]">
      <CinematicHero
        brandName="HUB"
        tagline1="Ferramentas que,"
        tagline2="aceleram seu fluxo."
        cardHeading="Ecossistema de produtividade."
        cardDescription={
          <>
            <span className="text-white font-semibold">Hub</span> reúne
            ferramentas independentes para designers e desenvolvedores — Design
            System, Context Manager e mais — tudo rodando no browser.
          </>
        }
        metricValue={2}
        metricLabel="Ferramentas"
        ctaHeading="Explorar ferramentas."
        ctaDescription="Ferramentas criadas para quem ama interfaces bonitas e código limpo. Tudo open source."
      />
      <Hub2Landing />
    </div>
  );
}
