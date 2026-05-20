'use client';

import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, FileText, Mail, Shield, Wrench, GraduationCap, Compass, Laptop, Layout } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from '@studio-freight/lenis';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollBufferRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Section DOM Links
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Lenis instance holder for menu routing
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;
    
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // 1. Initialize High-Tactile Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    
    lenisRef.current = lenis;

    const renderRAF = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(renderRAF);
    };
    requestAnimationFrame(renderRAF);

    lenis.on('scroll', ScrollTrigger.update);

    // 2. Continuous Micro-Interaction Idle Floating Loop (Wondermakers style)
    const floatElements = ['.float-card', '.float-img', '.float-text'];
    floatElements.forEach((selector, idx) => {
      gsap.to(selector, {
        y: `+=${12 + idx * 4}`,
        rotation: idx % 2 === 0 ? '+=1.5' : '-=1.5',
        duration: 3.5 + idx * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: idx * 0.2
      });
    });

    // 3. Master Multi-Directional Kinetic Timeline
    const ctx = gsap.context(() => {
      
      // Initial Page Wake-up Entrance
      gsap.fromTo('.hero-assemble', 
        { scale: 0.85, opacity: 0, y: 60 }, 
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power4.out', stagger: 0.15 }
      );

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollBufferRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5, // Tightly maps animations directly to finger/wheel tracking
        }
      });

      // PHASE 1: Hero Explodes Outward
      masterTl.to('.hero-title-left', { x: '-60vw', opacity: 0, ease: 'none' }, 0)
              .to('.hero-title-right', { x: '60vw', opacity: 0, ease: 'none' }, 0)
              .to('.hero-profile-box', { y: '-100vh', scale: 0.7, opacity: 0, ease: 'none' }, 0)
              .to('.hero-tag-badge', { y: 100, opacity: 0, ease: 'none' }, 0);

      // PHASE 2: About Exploding Pieces Assemble From All Directions
      masterTl.fromTo('#section-about', { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.1)
              .fromTo('.about-panel-left', { x: '-100vw', opacity: 0 }, { x: '0vw', opacity: 1, ease: 'power2.out' }, 0.15)
              .fromTo('.about-panel-right', { x: '100vw', scale: 0.8, opacity: 0 }, { x: '0vw', scale: 1, opacity: 1, ease: 'power2.out' }, 0.15)
              .fromTo('.about-border-frame', { scaleX: 0 }, { scaleX: 1, ease: 'power3.out' }, 0.2);

      // PHASE 3: About Exits Upward & Horizontal Projects Screen Locks In
      masterTl.to('#section-about', { y: '-100vh', opacity: 0, ease: 'none' }, 0.4)
              .fromTo('#section-projects', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, ease: 'none' }, 0.4);

      // Mechanical Left-To-Right Project Track Shift
      const totalHorizontalShift = projectsTrackRef.current ? projectsTrackRef.current.scrollWidth - window.innerWidth : 0;
      masterTl.to(projectsTrackRef.current, {
        x: -totalHorizontalShift - 200,
        ease: 'none'
      }, 0.45);

      // PHASE 4: Projects Fly Outward & Contact View Emerges Deep From Background
      masterTl.to('#section-projects', { scale: 1.1, opacity: 0, ease: 'none' }, 0.8)
              .fromTo('#section-contact', 
                { opacity: 0, scale: 0.8, y: 150 }, 
                { opacity: 1, scale: 1, y: 0, ease: 'power4.out' }, 0.85
              )
              .fromTo('.contact-reveal-item',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.1, ease: 'power3.out' }, 0.9
              );

    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, [isMounted]);

  // Menu Handling System: Translates clicks into virtual layout position transitions
  const scrollToSection = (target: string) => {
    if (!lenisRef.current) return;
    const scrollPositions: { [key: string]: number } = {
      hero: 0,
      about: window.innerHeight * 1.5,
      projects: window.innerHeight * 2.8,
      contact: window.innerHeight * 5.0
    };
    lenisRef.current.scrollTo(scrollPositions[target], { duration: 1.8 });
  };

  if (!isMounted) return <div className="bg-[#f3eee7] min-h-screen" />;

  return (
    <div ref={containerRef} className="bg-[#f3eee7] text-[#1a1a15] min-h-screen font-sans overflow-x-hidden selection:bg-[#cc5a37] selection:text-white antialiased">
      
      {/* CINEMATIC FIXED CONTAINER ENGINE */}
      <div className="fixed inset-0 h-screen w-screen overflow-hidden z-10 p-6 md:p-12 flex flex-col justify-between pointer-events-none">
        
        {/* PREMIUM GLOBAL HEADER PANEL */}
        <header className="w-full flex justify-between items-center z-50 pointer-events-auto">
          <div onClick={() => scrollToSection('hero')} className="flex items-center gap-4 cursor-pointer group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#1a1a15]/20 flex items-center justify-center bg-white/40 backdrop-blur-md shadow-sm group-hover:scale-105 transition-all duration-300">
              <Image src="/assets/logo.png" alt="AN Logo" width={44} height={44} className="object-contain p-1" priority />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black uppercase tracking-wider text-sm leading-none">Ali Newaz</span>
              <span className="text-[10px] font-mono tracking-widest opacity-60 mt-0.5 uppercase">Portfolio // 2026</span>
            </div>
          </div>
          
          {/* FUNCTIONAL MENU STRIP */}
          <nav className="hidden md:flex items-center gap-8 bg-white/40 backdrop-blur-xl border border-[#1a1a15]/10 px-8 py-3 rounded-full shadow-luxury">
            <button onClick={() => scrollToSection('about')} className="text-xs uppercase tracking-widest font-bold hover:text-[#cc5a37] transition-colors">About</button>
            <button onClick={() => scrollToSection('projects')} className="text-xs uppercase tracking-widest font-bold hover:text-[#cc5a37] transition-colors">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="text-xs uppercase tracking-widest font-bold hover:text-[#cc5a37] transition-colors">Contact</button>
          </nav>

          <a 
            href="/assets/Ali_Newaz_CV.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold bg-[#1a1a15] text-[#f3eee7] px-6 py-3 rounded-xl shadow-md hover:bg-[#cc5a37] transition-all duration-300 transform hover:scale-103"
          >
            <FileText size={14} /> View CV <ArrowUpRight size={14} />
          </a>
        </header>

        {/* ========================================================= */}
        {/* SCENE BLOCK 1: EXPLODING KINETIC HERO SECTION            */}
        {/* ========================================================= */}
        <section ref={heroRef} className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20 pointer-events-auto">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-4">
            
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="hero-tag-badge flex items-center gap-2 bg-white/60 backdrop-blur-md border border-[#1a1a15]/10 w-max px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#cc5a37] tracking-wider">
                <GraduationCap size={14} /> CSE STUDENT & PROPERTY PRESERVATION
              </div>
              <h1 className="text-7xl md:text-[105px] font-black tracking-tighter uppercase leading-[0.85] flex flex-col select-none">
                <span className="hero-title-left block will-change-transform">ALI</span>
                <span className="hero-title-right block text-[#cc5a37] will-change-transform">NEWAZ</span>
              </h1>
            </div>

            {/* HIGH-END PROFILE CARD MATTING */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end hero-profile-box will-change-transform">
              <div className="float-card w-full max-w-[360px] bg-white/60 backdrop-blur-3xl border border-[#1a1a15]/10 p-5 rounded-2xl shadow-luxury transform transition-transform duration-500 hover:scale-[1.03]">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-[#1a1a15]/20 mb-4 bg-[#1a1a15]/5">
                  <Image src="/assets/headshot.jpg" alt="Ali Newaz Headshot" fill className="object-cover" priority sizes="320px" />
                </div>
                <div className="flex justify-between items-center text-left">
                  <div>
                    <h4 className="font-bold text-base uppercase tracking-wide">Identity Module</h4>
                    <p className="text-xs font-mono opacity-60 mt-0.5">WUB // Core Engineering</p>
                  </div>
                  <button onClick={() => scrollToSection('projects')} className="w-10 h-10 bg-[#1a1a15] text-white rounded-xl flex items-center justify-center hover:bg-[#cc5a37] transition-colors">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SCENE BLOCK 2: ASSEMBLED ABOUT SECTION                     */}
        {/* ========================================================= */}
        <section ref={aboutRef} id="section-about" className="absolute inset-0 bg-[#1a1a15] text-[#f3eee7] flex items-center justify-center p-6 md:p-12 z-30 opacity-0 pointer-events-auto will-change-transform">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 relative">
            
            <div className="about-border-frame absolute inset-x-0 -top-6 h-[1px] bg-[#f3eee7]/10 origin-left will-change-transform hidden lg:block" />

            {/* FULL LAYOUT COPY BLOCK */}
            <div className="lg:col-span-7 space-y-6 text-left about-panel-left will-change-transform">
              <span className="text-xs font-mono tracking-[0.3em] text-[#cc5a37] font-bold uppercase block">// DUAL CORE SYSTEMS ARCHITECTURE</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none max-w-3xl">
                SYSTEM THINKING FOR SOFTWARE.<br/>
                <span className="text-[#f3eee7]/40">PRECISION WORK FOR PROPERTIES.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm opacity-80 leading-relaxed font-normal pt-4">
                <p>
                  Operating seamlessly across two distinct industrial workflows. As a high-performance Property Preservation Processor, I engineer vendor pipeline systems, handle complex US real estate data fields, layout damage mitigation scripts, and maintain structural tracking models under high time constraints.
                </p>
                <p>
                  Simultaneously completing advanced coursework in Computer Science and Engineering at the World University of Bangladesh (WUB). I map real-world layout friction straight into interactive user software setups, maintaining high algorithmic performance and structural code layout design.
                </p>
              </div>
            </div>

            {/* FULL BODY ROOFTOP PHOTO PROPORTION CASE */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end about-panel-right will-change-transform">
              <div className="float-img relative w-full max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#f3eee7]/10 p-2 bg-white/5 backdrop-blur-md shadow-2xl group">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image src="/assets/rooftop1.jpg" alt="Ali Newaz Workspace/Rooftop Profile" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="380px" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SCENE BLOCK 3: HORIZONTAL CAROUSEL PROJECT MATRIX        */}
        {/* ========================================================= */}
        <section ref={projectsRef} id="section-projects" className="absolute inset-0 flex items-center z-30 opacity-0 pointer-events-auto will-change-transform pl-6 md:pl-24 pr-12">
          
          <div className="flex flex-col text-left gap-3 shrink-0 pr-16 max-w-xs md:max-w-md z-40 relative">
            <div className="w-10 h-10 rounded-xl bg-[#cc5a37]/10 border border-[#cc5a37]/30 flex items-center justify-center text-[#cc5a37] mb-2">
              <Compass size={20} className="animate-spin-slow" />
            </div>
            <span className="text-xs font-mono tracking-widest text-[#cc5a37] font-bold uppercase">// FIELD DEPLOYMENTS</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              SELECTED<br/>SYSTEMS
            </h2>
            <p className="text-xs opacity-60 leading-relaxed mt-2 hidden md:block">
              Vertical wheel inputs mechanical drive through this synchronized layout line tracker.
            </p>
          </div>

          {/* BALANCED, SPACE-FILLING DISPLAY CONTAINERS */}
          <div ref={projectsTrackRef} className="flex gap-8 pl-8 h-[60vh] items-center will-change-transform">
            
            {/* CAROUSEL ITEM 1 */}
            <div className="w-[450px] h-full bg-white/70 backdrop-blur-2xl border border-[#1a1a15]/10 rounded-2xl p-8 flex flex-col justify-between shadow-luxury shrink-0 group hover:border-[#cc5a37]/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a15]/5 flex items-center justify-center text-[#cc5a37]"><Wrench size={22} /></div>
                <span className="text-xs font-mono opacity-50 font-bold bg-[#1a1a15]/5 px-3 py-1 rounded-full">01 / LOGISTICS ENGINE</span>
              </div>
              <div className="space-y-3 text-left">
                <h3 className="text-2xl font-black uppercase tracking-tight">Field Readiness Suite</h3>
                <p className="text-xs opacity-70 leading-relaxed font-medium">
                  A high-end field operations dashboard built for inspection scopes, asset notes, real-time dispatch parameters, and structural control maps across multi-state residential coordinates.
                </p>
                <div className="flex gap-2 pt-2 text-[10px] font-mono font-bold opacity-60">
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">QC MATRIX</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">VENDOR NODES</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">ASSET LOGS</span>
                </div>
              </div>
            </div>

            {/* CAROUSEL ITEM 2 */}
            <div className="w-[450px] h-full bg-white/70 backdrop-blur-2xl border border-[#1a1a15]/10 rounded-2xl p-8 flex flex-col justify-between shadow-luxury shrink-0 group hover:border-[#cc5a37]/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a15]/5 flex items-center justify-center text-[#cc5a37]"><Laptop size={22} /></div>
                <span className="text-xs font-mono opacity-50 font-bold bg-[#1a1a15]/5 px-3 py-1 rounded-full">02 / CORE ACADEMICS</span>
              </div>
              <div className="space-y-3 text-left">
                <h3 className="text-2xl font-black uppercase tracking-tight">CSE Learning Atlas</h3>
                <p className="text-xs opacity-70 leading-relaxed font-medium">
                  Centralized thesis submission directory managing interactive hardware tracking simulations, data algorithms, compiler structures, and WUB core curriculum engineering repos.
                </p>
                <div className="flex gap-2 pt-2 text-[10px] font-mono font-bold opacity-60">
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">COURSE MAP</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">LAB TIMELINES</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">REVIEW DECKS</span>
                </div>
              </div>
            </div>

            {/* CAROUSEL ITEM 3 */}
            <div className="w-[450px] h-full bg-white/70 backdrop-blur-2xl border border-[#1a1a15]/10 rounded-2xl p-8 flex flex-col justify-between shadow-luxury shrink-0 group hover:border-[#cc5a37]/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a15]/5 flex items-center justify-center text-[#cc5a37]"><Shield size={22} /></div>
                <span className="text-xs font-mono opacity-50 font-bold bg-[#1a1a15]/5 px-3 py-1 rounded-full">03 / APPLICATION PROCESSOR</span>
              </div>
              <div className="space-y-3 text-left">
                <h3 className="text-2xl font-black uppercase tracking-tight">Claim Evidence Portal</h3>
                <p className="text-xs opacity-70 leading-relaxed font-medium">
                  A modern preservation interface designed to map before/after data points, process bid verification calculations, index media, and automatically output clean layout configurations.
                </p>
                <div className="flex gap-2 pt-2 text-[10px] font-mono font-bold opacity-60">
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">MEDIA GRID</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">STATUS LOGIC</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">PDF EXPORT</span>
                </div>
              </div>
            </div>

            {/* CAROUSEL ITEM 4 */}
            <div className="w-[450px] h-full bg-white/70 backdrop-blur-2xl border border-[#1a1a15]/10 rounded-2xl p-8 flex flex-col justify-between shadow-luxury shrink-0 group hover:border-[#cc5a37]/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a15]/5 flex items-center justify-center text-[#cc5a37]"><Layout size={22} /></div>
                <span className="text-xs font-mono opacity-50 font-bold bg-[#1a1a15]/5 px-3 py-1 rounded-full">04 / ARCHITECTURE</span>
              </div>
              <div className="space-y-3 text-left">
                <h3 className="text-2xl font-black uppercase tracking-tight">Ali Newaz Identity OS</h3>
                <p className="text-xs opacity-70 leading-relaxed font-medium">
                  Custom portfolio architecture leveraging decoupled hardware acceleration to completely separate mouse events from processing cycles, executing high-fidelity presentation layers.
                </p>
                <div className="flex gap-2 pt-2 text-[10px] font-mono font-bold opacity-60">
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">MOTION UI</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">RESUME MATRIX</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">LUXURY WEB</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SCENE BLOCK 4: IMMERSIVE CONTACT VIEW                    */}
        {/* ========================================================= */}
        <section ref={contactRef} id="section-contact" className="absolute inset-0 flex flex-col items-center justify-center p-4 z-40 opacity-0 pointer-events-none text-center">
          <div className="max-w-4xl space-y-8 px-4">
            <span className="contact-reveal-item text-xs font-mono tracking-[0.3em] text-[#cc5a37] font-bold uppercase block">// ACQUISITIONS & PROJECTS</span>
            <h2 className="contact-reveal-item text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] max-w-4xl">
              LET THE NEXT BRIEF ARRIVE <br/>
              <span className="text-[#1a1a15]/30">CLEAN, SHARP, AND READY.</span>
            </h2>
            <p className="contact-reveal-item text-sm opacity-70 max-w-xl mx-auto leading-relaxed font-medium">
              For preservation work, system infrastructure engineering, or corporate project review. All assets are fully mapped to native live branches for rapid layout updates.
            </p>
            
            <div className="contact-reveal-item flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a 
                href="mailto:alinewaz5678900@gmail.com"
                className="inline-flex items-center gap-3 bg-[#1a1a15] text-[#f3eee7] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl hover:bg-[#cc5a37] transition-all duration-300 transform hover:scale-105 pointer-events-auto"
              >
                <Mail size={16} /> Send Brief <ArrowUpRight size={16} />
              </a>
              <a 
                href="/assets/Ali_Newaz_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/80 border border-[#1a1a15]/20 text-[#1a1a15] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl shadow-md hover:bg-[#1a1a15] hover:text-white transition-all duration-300 transform hover:scale-105 pointer-events-auto"
              >
                <FileText size={16} /> Online CV Preview
              </a>
            </div>
          </div>
        </section>

        {/* UTILITY FOOTER TIMELINE BENCHMARK */}
        <footer className="w-full flex justify-between items-center z-50 text-[10px] font-mono uppercase tracking-widest opacity-40 select-none">
          <span>SCROLL WHEEL TIMELINE</span>
          <span>DHAKA // SYSTEM ACTIVE</span>
        </footer>

      </div>

      {/* MECHANICAL TIMELINE PHYSICAL HEIGHT BUFFER */}
      <div ref={scrollBufferRef} className="relative z-0 h-[600vh] w-full pointer-events-none" />

    </div>
  );
}
