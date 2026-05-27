'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion, useMotionValue, useSpring } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

type ProjectCard = {
  title: string;
  category: string;
  summary: string;
};

const projects: ProjectCard[] = [
  {
    title: 'Signature Estates',
    category: 'Property Transformation',
    summary: 'End-to-end preservation, staging, and aesthetic restoration workflow for premium urban residences.',
  },
  {
    title: 'VaultCare Systems',
    category: 'Operational Automation',
    summary: 'Smart audit dashboards, maintenance scheduling, and risk scoring for long-term property value retention.',
  },
  {
    title: 'Cocoa District Collection',
    category: 'Luxury Environment Design',
    summary: 'Bespoke visual identity and immersive showcase spaces inspired by architectural material studies.',
  },
  {
    title: 'WUB Nexus',
    category: 'Academic Engineering',
    summary: 'Research-led interface concepts combining CSE discipline with high-performance interaction systems.',
  },
];

function MagneticButton({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const element = ref.current;
        if (!element) {
          return;
        }
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        x.set(dx * 0.18);
        y.set(dy * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="group inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm uppercase tracking-[0.24em] text-[#1a1a15] backdrop-blur-3xl transition-colors duration-300 hover:bg-white/10"
      download={href.endsWith('.pdf')}
    >
      <span className="transition-transform duration-300 group-hover:scale-105">{label}</span>
    </motion.a>
  );
}

export default function Page() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const bufferRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const blobPathRef = useRef<SVGPathElement | null>(null);
  const blobWrapRef = useRef<HTMLDivElement | null>(null);

  const heroLetters = useMemo(() => 'Ali Newaz'.split(''), []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const master = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        scrollTrigger: {
          trigger: bufferRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      master.set([aboutRef.current, projectsRef.current, contactRef.current], {
        autoAlpha: 0,
        yPercent: 18,
      });

      master.to(
        '.hero-char',
        {
          y: () => gsap.utils.random(-160, 160),
          x: () => gsap.utils.random(-220, 220),
          rotate: () => gsap.utils.random(-35, 35),
          opacity: 0,
          filter: 'blur(12px)',
          stagger: 0.025,
          duration: 0.8,
        },
        0.05,
      );

      master.to(
        blobWrapRef.current,
        {
          scale: 8,
          duration: 2.4,
          transformOrigin: 'center center',
        },
        0,
      );

      if (blobPathRef.current) {
        const startPath = 'M60.9,-54.2C74.5,-32.1,77.6,-6.3,72.6,18.1C67.7,42.5,54.6,65.5,34.5,73.7C14.4,81.8,-12.8,75.1,-35.7,63.4C-58.6,51.7,-77.2,35.1,-81.5,14.3C-85.8,-6.5,-75.8,-31.5,-59.5,-53.8C-43.2,-76,-21.6,-95.5,1.4,-96.6C24.5,-97.8,48.9,-80.6,60.9,-54.2Z';
        const midPath = 'M54.6,-66.1C71.2,-52.8,85.4,-34.8,90.2,-13.9C95,7,90.4,30.8,78.4,49.2C66.5,67.5,47.1,80.3,24.6,88.2C2.2,96.2,-23.4,99.3,-42.8,89.8C-62.2,80.2,-75.5,58.1,-83,36.1C-90.6,14.2,-92.3,-7.7,-84.5,-26.2C-76.8,-44.7,-59.7,-59.9,-41.8,-72.4C-23.9,-84.8,-4.9,-94.5,14.7,-93.2C34.2,-91.8,68.4,-79.5,54.6,-66.1Z';
        const endPath = 'M67.4,-74.5C88.6,-60.5,107.2,-39.5,112.6,-14.8C118,9.8,110.2,38.1,94.3,61.1C78.5,84.1,54.6,101.8,27.3,112.6C0.1,123.4,-30.5,127.2,-56,117.4C-81.5,107.7,-101.8,84.5,-112.4,58.2C-123,31.8,-124,2.4,-116.2,-23.7C-108.4,-49.9,-91.8,-72.9,-70.3,-86.7C-48.8,-100.5,-24.4,-105.1,-0.2,-104.9C24,-104.7,48,-88.5,67.4,-74.5Z';

        master
          .to(blobPathRef.current, { attr: { d: midPath }, duration: 1.2 }, 0.4)
          .to(blobPathRef.current, { attr: { d: endPath }, duration: 1.2 }, 1.5)
          .set(blobPathRef.current, { attr: { d: startPath } }, 2.85);
      }

      master.to(aboutRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.9 }, 0.9);
      master.to(heroRef.current, { autoAlpha: 0, duration: 0.7 }, 1.1);

      master.to(aboutRef.current, { autoAlpha: 0, yPercent: -16, duration: 0.7 }, 1.8);
      master.to(projectsRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.8 }, 1.95);

      if (trackRef.current) {
        const xDistance = trackRef.current.scrollWidth - window.innerWidth;
        master.to(trackRef.current, { x: -Math.max(xDistance, 0), duration: 1.8, ease: 'none' }, 2.1);
      }

      master.to(projectsRef.current, { autoAlpha: 0, yPercent: -12, duration: 0.6 }, 4.1);
      master.to(contactRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.7 }, 4.15);
    }, appRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-[#f3eee7] text-[#1a1a15]">
      <div
        ref={appRef}
        className="fixed left-0 top-0 h-screen w-screen overflow-hidden [transform-style:preserve-3d]"
        style={{ willChange: 'transform' }}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
          <filter id="gooey-mercury">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -14"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </svg>

        <div
          ref={blobWrapRef}
          className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2"
          style={{ willChange: 'transform', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full" style={{ filter: 'url(#gooey-mercury)' }}>
            <path
              ref={blobPathRef}
              fill="#1a1a15"
              d="M60.9,-54.2C74.5,-32.1,77.6,-6.3,72.6,18.1C67.7,42.5,54.6,65.5,34.5,73.7C14.4,81.8,-12.8,75.1,-35.7,63.4C-58.6,51.7,-77.2,35.1,-81.5,14.3C-85.8,-6.5,-75.8,-31.5,-59.5,-53.8C-43.2,-76,-21.6,-95.5,1.4,-96.6C24.5,-97.8,48.9,-80.6,60.9,-54.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <section ref={heroRef} className="absolute inset-0 flex items-center justify-center px-6">
          <div className="w-full max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl md:p-14">
            <div className="mb-8 flex items-center justify-between gap-6">
              <Image src="/assets/Ali_Newaz_LOGO.png" alt="Ali Newaz Logo" width={160} height={48} priority />
              <MagneticButton href="/assets/Ali_Newaz_CV.pdf" label="Download Resume" />
            </div>
            <h1 className="text-5xl font-semibold leading-[0.9] tracking-[-0.04em] md:text-8xl">
              {heroLetters.map((character, index) => (
                <span key={`${character}-${index}`} className="hero-char inline-block will-change-transform">
                  {character === ' ' ? '\u00A0' : character}
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#1a1a15]/80">
              Property Preservation Specialist &amp; CSE Student crafting premium digital experiences with cinematic,
              tactile motion systems.
            </p>
          </div>
        </section>

        <section ref={aboutRef} className="absolute inset-0 flex items-center justify-center px-6">
          <div className="grid w-full max-w-6xl gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl md:grid-cols-[1fr_1.2fr] md:p-14">
            <div className="relative h-80 overflow-hidden rounded-3xl border border-white/10 bg-white/10">
              <Image src="/assets/Main.jpg" alt="Ali Newaz" fill className="object-cover" priority />
            </div>
            <div className="space-y-5">
              <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">About</h2>
              <p className="text-lg leading-relaxed text-[#1a1a15]/80">
                I am Ali Newaz, blending technical precision and aesthetic sensitivity to preserve high-value properties
                and engineer responsive digital systems.
              </p>
              <p className="text-sm uppercase tracking-[0.2em] text-[#1a1a15]/60">World University of Bangladesh (WUB)</p>
            </div>
          </div>
        </section>

        <section ref={projectsRef} className="absolute inset-0 flex items-center overflow-hidden">
          <div ref={trackRef} className="flex gap-8 px-[10vw]" style={{ willChange: 'transform' }}>
            {projects.map((project) => (
              <article
                key={project.title}
                className="h-[70vh] w-[70vw] shrink-0 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl"
              >
                <div className="mb-6 h-2/3 rounded-2xl border border-white/10 bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
                <p className="text-xs uppercase tracking-[0.22em] text-[#1a1a15]/60">{project.category}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.02em]">{project.title}</h3>
                <p className="mt-3 max-w-xl text-[#1a1a15]/80">{project.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section ref={contactRef} className="absolute inset-0 flex items-center justify-center px-6">
          <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-3xl md:p-14">
            <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">Let&apos;s Build Something Timeless</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#1a1a15]/80">
              Reach out for preservation consulting, collaborative engineering, or cinematic interaction design.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="mailto:ali.newaz@example.com" label="Email Ali Newaz" />
              <Link
                href="https://www.linkedin.com"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm uppercase tracking-[0.24em] backdrop-blur-3xl transition hover:bg-white/10"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div ref={bufferRef} className="h-[400vh]" aria-hidden="true" />
    </main>
  );
}
