import { CinematicHero } from "@/components/ui/cinematic-hero";

export default function Hub2Page() {
  return (
    <div className="overflow-x-hidden w-full min-h-screen">
      <CinematicHero
        brandName="HUB2"
        tagline1="Ferramentas que,"
        tagline2="aceleram seu fluxo."
        cardHeading="Ecossistema de produtividade."
        cardDescription={
          <>
            <span className="text-white font-semibold">Hub2</span> reúne
            ferramentas independentes para designers e desenvolvedores — Design
            System, Context Manager e mais — tudo rodando no browser, sem
            servidor.
          </>
        }
        metricValue={12}
        metricLabel="Ferramentas"
        ctaHeading="Comece a construir."
        ctaDescription="Explore um ecossistema de ferramentas criadas para quem ama interfaces bonitas e código limpo."
      />
    </div>
  );
}
