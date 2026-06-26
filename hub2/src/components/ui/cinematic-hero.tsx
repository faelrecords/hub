"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse 60% 50% at center, black 0%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 60% 50% at center, black 0%, transparent 100%);
  }

  .lava-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.12;
      will-change: transform;
  }

  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow:
          0 10px 30px rgba(69,229,139,0.15),
          0 2px 4px rgba(0,0,0,0.3);
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", system-ui, sans-serif;
  }

  .text-accent-glow {
      background: linear-gradient(135deg, #45E58B 0%, #00BFC2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0px 0px 30px rgba(69,229,139,0.25));
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", system-ui, sans-serif;
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent))
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", system-ui, sans-serif;
  }

  .premium-depth-card {
      background: linear-gradient(160deg, #121715 0%, #0a0f0c 50%, #080B0A 100%);
      box-shadow:
          0 50px 120px -20px rgba(0, 0, 0, 0.95),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 0 rgba(69, 229, 139, 0.08),
          inset 0 -1px 0 rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(69, 229, 139, 0.06);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(69,229,139,0.03) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
      background-color: #1a1a1a;
      box-shadow:
          inset 0 0 0 1.5px #3f3f46,
          inset 0 0 0 6px #0a0a0a,
          0 50px 100px -20px rgba(0,0,0,0.95),
          0 20px 40px -10px rgba(0,0,0,0.8),
          0 0 0 1px rgba(255,255,255,0.03);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow:
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }

  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%);
  }

  .saas-card {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      border: 1px solid rgba(255,255,255,0.06);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .saas-card:hover {
      border-color: rgba(69,229,139,0.2);
      background: linear-gradient(180deg, rgba(69,229,139,0.06) 0%, rgba(69,229,139,0.01) 100%);
      transform: translateY(-1px);
  }

  .saas-stat {
      background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%);
      border: 1px solid rgba(255,255,255,0.04);
  }

  .btn-hub-primary {
      background: linear-gradient(180deg, #45E58B 0%, #38CC7A 100%);
      color: #080B0A;
      box-shadow: 0 0 0 1px rgba(69,229,139,0.3), 0 4px 12px rgba(69,229,139,0.25), inset 0 1px 1px rgba(255,255,255,0.3);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .btn-hub-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 0 1px rgba(69,229,139,0.5), 0 8px 24px rgba(69,229,139,0.35), inset 0 1px 1px rgba(255,255,255,0.3);
  }
  .btn-hub-primary:active {
      transform: translateY(0px) scale(0.98);
  }

  .btn-hub-secondary {
      background: rgba(255,255,255,0.06);
      color: #F3F7F5;
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .btn-hub-secondary:hover {
      transform: translateY(-2px);
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.15);
  }
  .btn-hub-secondary:active {
      transform: translateY(0px) scale(0.98);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 340;
      stroke-dashoffset: 340;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  tagline1 = "Ferramentas que",
  tagline2 = "aceleram seu fluxo.",
  ctaHeading = "Explorar ferramentas.",
  ctaDescription = "Ferramentas criadas para quem ama interfaces bonitas e código limpo. Tudo open source.",
  className,
  ...props
}: CinematicHeroProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 8,
            rotationX: -yVal * 8,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  },[]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".mockup-scroll-wrapper", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme", ".lava-blob"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: 2, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".card-left-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  },[]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />

      <div className="lava-blob" style={{ width: '500px', height: '500px', background: '#45E58B', top: '10%', left: '15%', animation: 'float1 12s ease-in-out infinite' }} aria-hidden="true" />
      <div className="lava-blob" style={{ width: '400px', height: '400px', background: '#00BFC2', bottom: '15%', right: '10%', animation: 'float2 15s ease-in-out infinite' }} aria-hidden="true" />
      <div className="lava-blob" style={{ width: '300px', height: '300px', background: '#45E58B', top: '50%', left: '50%', animation: 'float3 18s ease-in-out infinite' }} aria-hidden="true" />

      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <div className="mb-6 gsap-reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-semibold text-[#45E58B] bg-[#45E58B]/8 border border-[#45E58B]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#45E58B] animate-pulse" />
            Open Source
          </span>
        </div>
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-3 leading-[1.05]">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-accent-glow text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05]">
          {tagline2}
        </h1>
      </div>

      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-6 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
          {ctaHeading}
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div>
          <a href="#ferramentas" className="btn-hub-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base group focus:outline-none focus:ring-2 focus:ring-[#45E58B] focus:ring-offset-2 focus:ring-offset-background">
            <svg className="w-5 h-5 transition-transform group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            Ver ferramentas
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-center z-10 py-10 lg:py-0">

            <div className="card-left-text gsap-reveal flex flex-col justify-start lg:justify-center text-left mb-8 lg:mb-12 z-20 w-full lg:max-w-xl">
              <h3 className="text-white text-2xl md:text-3xl lg:text-[2.5rem] font-bold mb-4 tracking-tight leading-tight">
                Ecossistema de produtividade.
              </h3>
              <p className="text-[#94A29B] text-sm md:text-base font-normal leading-relaxed">
                Ferramentas independentes para designers e desenvolvedores. Design System, Context Manager e mais — tudo no browser.
              </p>
            </div>

            <div className="mockup-scroll-wrapper relative w-full flex justify-center z-10" style={{ perspective: "1000px" }}>

              <div className="relative flex items-center justify-center transform scale-[0.65] md:scale-[0.85] lg:scale-100">

                <div
                  ref={mockupRef}
                  className="relative w-[260px] h-[540px] rounded-[2.8rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  <div className="absolute top-[100px] -left-[2px] w-[3px] h-[22px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[135px] -left-[2px] w-[3px] h-[40px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[195px] -left-[2px] w-[3px] h-[40px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[155px] -right-[2px] w-[3px] h-[60px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  <div className="absolute inset-[6px] bg-[#0a0f0c] rounded-[2.3rem] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] text-white z-10 flex flex-col">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[90px] h-[25px] bg-black rounded-full z-50 flex items-center justify-end px-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#45E58B] shadow-[0_0_6px_rgba(69,229,139,0.8)]" />
                    </div>

                    <div className="relative w-full flex-1 flex flex-col pt-11 px-3 pb-4 overflow-hidden">

                      <div className="phone-widget flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#45E58B] flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-[#0a0f0c]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>
                          </div>
                          <span className="text-[11px] font-bold tracking-tight text-white">Hub</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#45E58B]/10 text-[#45E58B] flex items-center justify-center text-[9px] font-bold border border-[#45E58B]/20">FR</div>
                      </div>

                      <div className="phone-widget grid grid-cols-2 gap-2 mb-3">
                        <div className="saas-stat rounded-xl p-2.5">
                          <p className="text-[7px] text-[#94A29B] uppercase tracking-widest font-semibold mb-1">Tools</p>
                          <p className="text-lg font-bold text-white leading-none">2</p>
                          <p className="text-[7px] text-[#45E58B] mt-1">Ativas</p>
                        </div>
                        <div className="saas-stat rounded-xl p-2.5">
                          <p className="text-[7px] text-[#94A29B] uppercase tracking-widest font-semibold mb-1">Status</p>
                          <p className="text-lg font-bold text-white leading-none">100%</p>
                          <p className="text-[7px] text-[#00BFC2] mt-1">Gratuito</p>
                        </div>
                      </div>

                      <div className="phone-widget relative mb-3">
                        <div className="saas-card rounded-xl p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[9px] text-[#94A29B] uppercase tracking-widest font-semibold">Atividade</p>
                            <p className="text-[8px] text-[#45E58B]">7 dias</p>
                          </div>
                          <div className="flex items-end gap-1 h-8">
                            <div className="w-full bg-[#45E58B]/20 rounded-t" style={{height: '40%'}}></div>
                            <div className="w-full bg-[#45E58B]/30 rounded-t" style={{height: '60%'}}></div>
                            <div className="w-full bg-[#45E58B]/40 rounded-t" style={{height: '35%'}}></div>
                            <div className="w-full bg-[#45E58B]/50 rounded-t" style={{height: '80%'}}></div>
                            <div className="w-full bg-[#45E58B]/60 rounded-t" style={{height: '55%'}}></div>
                            <div className="w-full bg-[#45E58B]/80 rounded-t" style={{height: '90%'}}></div>
                            <div className="w-full bg-[#45E58B] rounded-t" style={{height: '100%'}}></div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5 phone-widget">
                        <div className="saas-card rounded-xl p-2.5 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#45E58B]/10 flex items-center justify-center border border-[#45E58B]/15 shrink-0">
                            <svg className="w-3.5 h-3.5 text-[#45E58B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" /></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-[10px] font-semibold truncate">Design System</p>
                            <p className="text-[#94A29B] text-[8px] truncate">Editor visual de tokens</p>
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#45E58B] shrink-0"></div>
                        </div>
                        <div className="saas-card rounded-xl p-2.5 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#00BFC2]/10 flex items-center justify-center border border-[#00BFC2]/15 shrink-0">
                            <svg className="w-3.5 h-3.5 text-[#00BFC2]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-[10px] font-semibold truncate">Context Manager</p>
                            <p className="text-[#94A29B] text-[8px] truncate">Gerencie contexto de projetos</p>
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00BFC2] shrink-0"></div>
                        </div>
                      </div>

                      <div className="phone-widget mt-auto pt-2">
                        <div className="saas-card rounded-xl p-2.5 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#45E58B]/20 flex items-center justify-center">
                            <svg className="w-3 h-3 text-[#45E58B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                          </div>
                          <span className="text-[9px] text-[#94A29B]">Em breve</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.05); } 66% { transform: translate(-20px,15px) scale(0.95); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-25px,20px) scale(1.08); } 66% { transform: translate(15px,-25px) scale(0.92); } }
        @keyframes float3 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(20px,25px) scale(0.95); } 66% { transform: translate(-30px,-15px) scale(1.05); } }
      ` }} />
    </div>
  );
}
