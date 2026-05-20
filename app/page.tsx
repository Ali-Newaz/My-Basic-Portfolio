"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Sparkles,
  University
} from "lucide-react";
import Lenis from "lenis";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { useCallback, useLayoutEffect, useRef } from "react";

const heroWords = ["ALI", "NEWAZ"];

const blobPaths = {
  hero:
    "M 468 73 C 548 114 601 193 589 280 C 576 373 501 442 396 462 C 288 482 175 437 109 355 C 43 273 46 166 114 96 C 181 27 363 21 468 73 Z",
  about:
    "M 443 47 C 559 62 620 169 600 277 C 580 386 506 456 381 477 C 258 497 133 444 83 345 C 33 247 84 129 170 75 C 257 20 326 31 443 47 Z",
  projects:
    "M 512 92 C 590 151 625 236 577 329 C 529 423 401 474 281 452 C 160 430 80 344 89 238 C 97 133 184 55 296 45 C 408 35 434 33 512 92 Z",
  contact:
    "M 498 35 C 607 89 639 229 579 336 C 519 444 370 499 239 456 C 108 413 51 292 91 178 C 132 65 265 20 365 38 C 466 55 389 -19 498 35 Z"
};

const credentials = [
  {
    icon: <BriefcaseBusiness className="h-4 w-4" />,
    label: "Professional Branding",
    value: "Property Preservation Specialist & CSE Student"
  },
  {
    icon: <University className="h-4 w-4" />,
    label: "Institution",
    value: "World University of Bangladesh (WUB)"
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    label: "Operating Mode",
    value: "Field precision, digital systems, client-ready delivery"
  }
];

const projects = [
  {
    eyebrow: "Preservation",
    title: "Field Readiness Suite",
    summary:
      "A glass-panel operations concept for inspection queues, scope notes, dispatch status, and quality control across preservation workflows.",
    stats: ["QC Matrix", "Vendor Notes", "Asset Logs"]
  },
  {
    eyebrow: "Academic Systems",
    title: "CSE Learning Atlas",
    summary:
      "A disciplined study environment connecting lab references, project checkpoints, algorithm notes, and WUB coursework rhythm.",
    stats: ["Course Map", "Lab Timeline", "Review Deck"]
  },
  {
    eyebrow: "Client Experience",
    title: "Claim Evidence Portal",
    summary:
      "A polished intake and presentation layer for before-after evidence, annotated media, and progress summaries.",
    stats: ["Media Grid", "Status Logic", "PDF Export"]
  },
  {
    eyebrow: "Personal Brand",
    title: "Ali Newaz Identity OS",
    summary:
      "A premium portfolio system balancing professional preservation credibility with a rigorous computer science trajectory.",
    stats: ["Motion UI", "Resume Path", "Luxury Web"]
  }
];

const notNull = <T,>(value: T | null): value is T => value !== null;

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  download?: boolean;
  target?: "_self" | "_blank";
  ariaLabel?: string;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
};

function MagneticButton({
  href,
  children,
  icon,
  download,
  target = "_self",
  ariaLabel,
  onClick
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.42 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.42 });
  const rotateX = useTransform(springY, [-24, 24], [8, -8]);
  const rotateY = useTransform(springX, [-24, 24], [-8, 8]);

  const handleMouseMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) * 0.28);
    y.set((event.clientY - centerY) * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      aria-label={ariaLabel}
      className="gpu-layer group inline-flex min-h-12 items-center justify-center gap-3 rounded-[8px] border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium uppercase tracking-normal text-ink shadow-button backdrop-blur-3xl outline-none transition-colors duration-300 ease-luxury hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-ink/40"
      download={download}
      href={href}
      onClick={onClick}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      rel={target === "_blank" ? "noreferrer" : undefined}
      style={{ x: springX, y: springY, rotateX, rotateY }}
      target={target}
      whileTap={{ scale: 0.97 }}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-ink/10 bg-ink text-canvas transition-transform duration-300 ease-luxury group-hover:rotate-6">
        {icon}
      </span>
      <span>{children}</span>
    </motion.a>
  );
}

export default function Page() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const scrollBufferRef = useRef<HTMLDivElement | null>(null);
  const blobShellRef = useRef<HTMLDivElement | null>(null);
  const blobPathRef = useRef<SVGPathElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroMetaRef = useRef<HTMLDivElement | null>(null);
  const heroActionsRef = useRef<HTMLDivElement | null>(null);
  const profileCardRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const projectTrackRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const heroCharsRef = useRef<HTMLSpanElement[]>([]);
  const lenisRef = useRef<Lenis | null>(null);

  heroCharsRef.current = [];

  const registerHeroChar = useCallback((node: HTMLSpanElement | null) => {
    if (node && !heroCharsRef.current.includes(node)) {
      heroCharsRef.current.push(node);
    }
  }, []);

  const scrollToProgress = useCallback((progress: number) => {
    return (event: ReactMouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0
      );
      const target = maxScroll * progress;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          duration: 1.08,
          easing: (t: number) => 1 - Math.pow(1 - t, 4)
        });
        return;
      }

      window.scrollTo({ top: target, behavior: "smooth" });
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    let updateLenis: ((time: number) => void) | null = null;

    const ctx = gsap.context(() => {
      const heroCharacters = heroCharsRef.current;
      const principalLayers = [
        sceneRef.current,
        blobShellRef.current,
        blobPathRef.current,
        heroRef.current,
        heroMetaRef.current,
        heroActionsRef.current,
        profileCardRef.current,
        aboutRef.current,
        projectsRef.current,
        projectTrackRef.current,
        contactRef.current
      ].filter(notNull);

      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.08
      });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      updateLenis = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      gsap.set(principalLayers, {
        force3D: true,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity, filter"
      });

      gsap.set(heroCharacters, {
        force3D: true,
        transformOrigin: "50% 50% -120px",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity, filter"
      });

      gsap.set([aboutRef.current, projectsRef.current, contactRef.current], {
        autoAlpha: 0,
        pointerEvents: "none"
      });

      gsap.set(blobShellRef.current, {
        scale: 1,
        rotate: 0,
        transformOrigin: "50% 50%"
      });

      gsap.set(progressFillRef.current, {
        scaleX: 0,
        transformOrigin: "0% 50%"
      });

      const projectStart = () => window.innerWidth * 0.3;
      const projectTravel = () => {
        const track = projectTrackRef.current;
        if (!track) {
          return 0;
        }
        const viewport = window.innerWidth;
        const endingInset = viewport > 1024 ? viewport * 0.16 : viewport * 0.08;
        return Math.min(0, viewport - track.scrollWidth - endingInset);
      };

      const master = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scrollBufferRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });

      master
        .to(
          progressFillRef.current,
          {
            scaleX: 1,
            duration: 3.6
          },
          0
        )
        .to(
          blobPathRef.current,
          {
            attr: { d: blobPaths.about },
            duration: 0.82,
            ease: "sine.inOut"
          },
          0
        )
        .to(
          blobShellRef.current,
          {
            scale: 2.2,
            rotate: 12,
            duration: 0.82,
            ease: "power3.inOut"
          },
          0
        )
        .to(
          heroCharacters,
          {
            x: (index: number) => {
              const direction = index % 2 === 0 ? -1 : 1;
              return direction * (110 + index * 9);
            },
            y: (index: number) => (index % 3 - 1) * 86,
            z: (index: number) => 220 + index * 16,
            rotateX: (index: number) => (index % 2 === 0 ? 48 : -44),
            rotateY: (index: number) => (index % 2 === 0 ? -28 : 34),
            opacity: 0,
            filter: "blur(22px)",
            duration: 0.62,
            ease: "power3.in",
            stagger: {
              amount: 0.16,
              from: "center"
            }
          },
          0.08
        )
        .to(
          [heroMetaRef.current, heroActionsRef.current, profileCardRef.current],
          {
            y: -34,
            autoAlpha: 0,
            pointerEvents: "none",
            filter: "blur(18px)",
            duration: 0.48,
            ease: "power2.in"
          },
          0.12
        )
        .set(aboutRef.current, { pointerEvents: "auto" }, 0.38)
        .fromTo(
          aboutRef.current,
          {
            autoAlpha: 0,
            scale: 0.74,
            y: 80,
            filter: "blur(28px)",
            clipPath: "circle(0% at 50% 50%)"
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            clipPath: "circle(130% at 50% 50%)",
            duration: 0.78,
            ease: "power4.out"
          },
          0.42
        )
        .to(
          blobPathRef.current,
          {
            attr: { d: blobPaths.projects },
            duration: 0.96,
            ease: "sine.inOut"
          },
          1.04
        )
        .to(
          blobShellRef.current,
          {
            scale: 4.7,
            rotate: -18,
            duration: 0.96,
            ease: "power3.inOut"
          },
          1.04
        )
        .to(
          aboutRef.current,
          {
            autoAlpha: 0,
            y: -72,
            scale: 0.92,
            filter: "blur(22px)",
            clipPath: "circle(34% at 50% 42%)",
            duration: 0.52,
            ease: "power2.in"
          },
          1.16
        )
        .set(aboutRef.current, { pointerEvents: "none" }, 1.52)
        .set(projectsRef.current, { pointerEvents: "auto" }, 1.36)
        .fromTo(
          projectsRef.current,
          {
            autoAlpha: 0,
            y: 70,
            scale: 0.9,
            filter: "blur(24px)"
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power3.out"
          },
          1.34
        )
        .fromTo(
          projectTrackRef.current,
          {
            x: projectStart
          },
          {
            x: projectTravel,
            duration: 1.22,
            ease: "none"
          },
          1.5
        )
        .to(
          blobPathRef.current,
          {
            attr: { d: blobPaths.contact },
            duration: 0.88,
            ease: "sine.inOut"
          },
          2.42
        )
        .to(
          blobShellRef.current,
          {
            scale: 8,
            rotate: 28,
            duration: 0.92,
            ease: "expo.inOut"
          },
          2.42
        )
        .to(
          projectsRef.current,
          {
            autoAlpha: 0,
            y: -54,
            scale: 0.96,
            filter: "blur(20px)",
            duration: 0.46,
            ease: "power2.in"
          },
          2.62
        )
        .set(projectsRef.current, { pointerEvents: "none" }, 2.96)
        .set(contactRef.current, { pointerEvents: "auto" }, 2.94)
        .fromTo(
          contactRef.current,
          {
            autoAlpha: 0,
            y: 90,
            scale: 0.82,
            filter: "blur(28px)",
            clipPath: "circle(0% at 50% 54%)"
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            clipPath: "circle(140% at 50% 50%)",
            duration: 0.66,
            ease: "power4.out"
          },
          2.96
        );

      ScrollTrigger.refresh();
    }, sceneRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (updateLenis) {
        gsap.ticker.remove(updateLenis);
      }
      lenis?.destroy();
      lenisRef.current = null;
      ctx.revert();
    };
  }, []);

  return (
    <main className="relative min-h-[400vh] bg-canvas text-ink">
      <div
        ref={sceneRef}
        className="fixed-cinematic-viewport isolate bg-canvas"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(90deg,rgba(26,26,21,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(26,26,21,0.055)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-x-6 top-6 z-40 flex items-center justify-between md:inset-x-10">
          <div className="glass-panel gpu-layer pointer-events-auto flex h-12 items-center gap-3 rounded-[8px] px-3">
            <Image
              alt="Ali Newaz logo"
              className="h-8 w-8 object-contain"
              height={32}
              priority
              src="/assets/logo.png"
              width={32}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div className="leading-none">
              <p className="font-display text-base uppercase tracking-normal">
                Ali Newaz
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-normal text-ink/55">
                Portfolio System
              </p>
            </div>
          </div>
          <div className="glass-panel gpu-layer hidden h-12 items-center gap-5 rounded-[8px] px-4 text-xs uppercase tracking-normal text-ink/70 md:flex">
            <a
              className="transition-colors duration-300 hover:text-ink"
              href="#about"
              onClick={scrollToProgress(0.28)}
            >
              About
            </a>
            <a
              className="transition-colors duration-300 hover:text-ink"
              href="#projects"
              onClick={scrollToProgress(0.58)}
            >
              Projects
            </a>
            <a
              className="transition-colors duration-300 hover:text-ink"
              href="#contact"
              onClick={scrollToProgress(0.92)}
            >
              Contact
            </a>
          </div>
        </div>

        <div
          ref={blobShellRef}
          className="gpu-layer pointer-events-none absolute left-1/2 top-1/2 z-0 h-[58vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 animate-breathe opacity-90 mix-blend-multiply"
        >
          <svg
            aria-hidden="true"
            className="h-full w-full overflow-visible"
            viewBox="0 0 680 520"
          >
            <defs>
              <filter id="liquid-goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  result="blur"
                  stdDeviation="10"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  result="goo"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
              <linearGradient id="blob-finish" x1="8%" x2="94%" y1="4%" y2="92%">
                <stop offset="0%" stopColor="#fff9f0" stopOpacity="0.98" />
                <stop offset="48%" stopColor="#d8c3ad" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#5b4638" stopOpacity="0.46" />
              </linearGradient>
            </defs>
            <g filter="url(#liquid-goo)">
              <path
                ref={blobPathRef}
                d={blobPaths.hero}
                fill="url(#blob-finish)"
                stroke="rgba(26,26,21,0.18)"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>

        <section
          ref={heroRef}
          className="gpu-layer absolute inset-0 z-10 flex items-center px-6 pb-10 pt-24 md:px-10"
        >
          <div className="grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_360px]">
            <div className="min-w-0">
              <div
                ref={heroMetaRef}
                className="gpu-layer mb-7 flex max-w-2xl flex-wrap items-center gap-3"
              >
                <span className="glass-panel rounded-[8px] px-3 py-2 text-xs uppercase tracking-normal text-ink/70">
                  Property Preservation Specialist
                </span>
                <span className="glass-panel rounded-[8px] px-3 py-2 text-xs uppercase tracking-normal text-ink/70">
                  CSE Student at WUB
                </span>
              </div>
              <h1 className="font-display text-7xl uppercase leading-none tracking-normal text-ink sm:text-8xl md:text-9xl lg:text-[9rem] xl:text-[11rem] 2xl:text-[12rem]">
                {heroWords.map((word) => (
                  <span className="block" key={word}>
                    {Array.from(word).map((letter, index) => (
                      <span
                        className="gpu-layer inline-block"
                        key={`${word}-${letter}-${index}`}
                        ref={registerHeroChar}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>
              <div ref={heroActionsRef} className="gpu-layer mt-8 flex flex-wrap gap-3">
                <MagneticButton
                  href="#projects"
                  icon={<Sparkles className="h-4 w-4" />}
                  onClick={scrollToProgress(0.58)}
                >
                  View Projects
                </MagneticButton>
                <MagneticButton
                  download
                  href="/assets/cv.png"
                  icon={<ArrowDownToLine className="h-4 w-4" />}
                >
                  Download CV
                </MagneticButton>
              </div>
            </div>

            <div
              ref={profileCardRef}
              className="glass-panel gpu-layer hidden rounded-[8px] p-3 lg:block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-white/10 bg-cream">
                <Image
                  alt="Ali Newaz portrait"
                  className="object-cover"
                  fill
                  priority
                  sizes="360px"
                  src="/assets/headshot.jpg"
                  onError={(event) => {
                    event.currentTarget.style.opacity = "0";
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas/92 to-transparent p-4">
                  <p className="font-display text-2xl uppercase tracking-normal">
                    Ali Newaz
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-normal text-ink/60">
                    Preservation discipline, computer science momentum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="About Ali Newaz"
          id="about"
          ref={aboutRef}
          className="gpu-layer pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 py-24 md:px-10"
        >
          <div className="glass-panel grid w-full max-w-6xl grid-cols-1 gap-8 rounded-[8px] p-5 md:p-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative hidden overflow-hidden rounded-[8px] border border-white/10 bg-cream/40 p-4 md:block">
              <div className="relative aspect-[4/5] h-full max-h-[560px] w-full overflow-hidden rounded-[8px]">
                <Image
                  alt="Ali Newaz"
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  src="/assets/rooftop1.jpg"
                  onError={(event) => {
                    event.currentTarget.style.opacity = "0";
                  }}
                />
              </div>
              <div className="absolute left-4 top-4 rounded-[8px] border border-white/10 bg-white/10 px-3 py-2 text-xs uppercase tracking-normal backdrop-blur-3xl">
                WUB CSE
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="mb-4 flex items-center gap-2 text-xs uppercase tracking-normal text-ink/60">
                  <BadgeCheck className="h-4 w-4" />
                  About Slide
                </p>
                <h2 className="font-display text-4xl uppercase leading-tight tracking-normal md:text-6xl lg:text-7xl">
                  Precision work for properties, systems thinking for software.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-ink/70 md:text-lg">
                  Ali Newaz brings field-level discipline from property
                  preservation into a computer science path at World University
                  of Bangladesh. The result is a portfolio voice built around
                  evidence, clarity, dependable execution, and sharply composed
                  digital systems.
                </p>
              </div>
              <div className="grid gap-3">
                {credentials.map((item) => (
                  <div
                    className="grid gap-2 border-t border-ink/10 py-4 md:grid-cols-[220px_1fr]"
                    key={item.label}
                  >
                    <p className="flex items-center gap-2 text-xs uppercase tracking-normal text-ink/55">
                      {item.icon}
                      {item.label}
                    </p>
                    <p className="text-sm font-medium uppercase tracking-normal text-ink md:text-base">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Ali Newaz projects"
          id="projects"
          ref={projectsRef}
          className="gpu-layer pointer-events-none absolute inset-0 z-30 flex flex-col justify-center overflow-hidden px-6 py-24 md:px-10"
        >
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-normal text-ink/60">
                <BookOpen className="h-4 w-4" />
                Horizontal Carousel
              </p>
              <h2 className="font-display text-5xl uppercase leading-none tracking-normal md:text-7xl">
                Selected systems
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-ink/62">
              Vertical wheel input drives this horizontal project track through
              the same master timeline, keeping every reveal mechanically
              synchronized.
            </p>
          </div>

          <div ref={projectTrackRef} className="gpu-layer flex w-max gap-4">
            {projects.map((project, index) => (
              <article
                className="glass-panel group w-[78vw] shrink-0 rounded-[8px] p-3 md:w-[46vw] lg:w-[34vw] xl:w-[30vw]"
                key={project.title}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] border border-white/10 bg-cream/60">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,249,240,0.95),rgba(216,195,173,0.54)_48%,rgba(91,70,56,0.2))]" />
                  <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(90deg,rgba(26,26,21,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(26,26,21,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/10 bg-white/10 font-display text-xl backdrop-blur-3xl">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 h-px overflow-hidden bg-ink/10">
                    <div className="h-full w-1/2 animate-scan bg-ink/30" />
                  </div>
                </div>
                <div className="p-2 pt-5">
                  <p className="text-xs uppercase tracking-normal text-ink/55">
                    {project.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-3xl uppercase leading-tight tracking-normal md:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-ink/66">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stats.map((stat) => (
                      <span
                        className="rounded-[8px] border border-ink/10 px-3 py-2 text-[11px] uppercase tracking-normal text-ink/60"
                        key={stat}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-label="Contact Ali Newaz"
          id="contact"
          ref={contactRef}
          className="gpu-layer pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-6 py-24 md:px-10"
        >
          <div className="grid w-full max-w-6xl grid-cols-1 items-end gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="glass-panel rounded-[8px] p-5 md:p-8">
              <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-normal text-ink/60">
                <Mail className="h-4 w-4" />
                Contact Slide
              </p>
              <h2 className="font-display text-4xl uppercase leading-tight tracking-normal md:text-7xl lg:text-8xl">
                Let the next brief arrive clean, sharp, and ready.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-ink/68 md:text-lg">
                For preservation work, student collaboration, or a polished web
                system, Ali Newaz is presented here with a contact layer that
                stays tactile while the portal completes its final reveal.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton
                  href="mailto:alinewaz5678900@gmail.com?subject=Portfolio inquiry for Ali Newaz"
                  icon={<Mail className="h-4 w-4" />}
                >
                  Send Brief
                </MagneticButton>
                <MagneticButton
                  download
                  href="/assets/cv.png"
                  icon={<ArrowDownToLine className="h-4 w-4" />}
                >
                  Resume
                </MagneticButton>
              </div>
            </div>

            <div className="glass-panel hidden rounded-[8px] p-5 md:p-6 lg:block">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                <p className="text-xs uppercase tracking-normal text-ink/55">
                  Identity Layer
                </p>
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <div className="space-y-5 pt-5">
                <div>
                  <p className="text-xs uppercase tracking-normal text-ink/45">
                    Name
                  </p>
                  <p className="mt-1 font-display text-3xl uppercase tracking-normal">
                    Ali Newaz
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-normal text-ink/45">
                    Brand
                  </p>
                  <p className="mt-1 text-sm font-medium uppercase tracking-normal leading-6">
                    Property Preservation Specialist & CSE Student
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-normal text-ink/45">
                    Institution
                  </p>
                  <p className="mt-1 text-sm font-medium uppercase tracking-normal leading-6">
                    World University of Bangladesh (WUB)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="pointer-events-none absolute inset-x-6 bottom-6 z-50 md:inset-x-10">
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-normal text-ink/50">
            <span>Scroll Wheel Timeline</span>
            <span>400vh Buffer</span>
          </div>
          <div className="h-px overflow-hidden bg-ink/10">
            <div ref={progressFillRef} className="h-full w-full bg-ink" />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative h-[400vh] w-full pointer-events-none"
        ref={scrollBufferRef}
      />
    </main>
  );
}
