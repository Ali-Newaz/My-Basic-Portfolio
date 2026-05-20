'use client';

import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, FileText, Mail, Shield, Wrench, GraduationCap, Compass, Laptop, Layout } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollBufferRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Section Tracking Targets
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;
    
    gsap.registerPlugin(ScrollTrigger);

    // 1. Idle Floating Core Fluid Animations (Wondermakers Floating Feel)
    gsap.to('.float-card', {
      y: '+=15',
      rotation: '+=1',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.float-img', {
      y: '-=12',
      rotation: '-=1',
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.3
    });

    // 2. Master Multidirectional Scroll-Assembly Timeline
    const ctx = gsap.context(() => {
      
      // Page Fade-in Entrance
      gsap.fromTo('.hero-assemble', 
        { scale: 0.9, opacity: 0, y: 40 }, 
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.1 }
      );

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollBufferRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        }
      });

      // SCENE 1: Hero Explosive Break apart
      masterTl.to('.hero-title-left', { x: '-50vw', opacity: 0, ease: 'none' }, 0)
              .to('.hero-title-right', { x: '50vw', opacity: 0, ease: 'none' }, 0)
              .to('.hero-profile-box', { y: '-100vh', scale: 0.8, opacity: 0, ease: 'none' }, 0)
              .to('.hero-tag-badge', { y: 60, opacity: 0, ease: 'none' }, 0);

      // SCENE 2: About Panel Assembly From Left & Right Directions
      masterTl.fromTo('#section-about', { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.1)
              .fromTo('.about-panel-left', { x: '-100vw', opacity: 0 }, { x: '0vw', opacity: 1, ease: 'power2.out' }, 0.15)
              .fromTo('.about-panel-right', { x: '100vw', scale: 0.9, opacity: 0 }, { x: '0vw', scale: 1, opacity: 1, ease: 'power2.out' }, 0.15);

      // SCENE 3: About Shifts Out, Horizontal Projects Slides In
      masterTl.to('#section-about', { y: '-100vh', opacity: 0, ease: 'none' }, 0.4)
              .fromTo('#section-projects', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, ease: 'none' }, 0.4);

      // Mechanical Project Track Slide (Calculating track length dynamically)
      const totalShift = projectsTrackRef.current ? projectsTrackRef.current.scrollWidth - window.innerWidth : 0;
      masterTl.to(projectsTrackRef.current, {
        x: -totalShift - 150,
        ease: 'none'
      }, 0.45);

      // SCENE 4: Projects Fly Away, Contact Rises from Background Depth
      masterTl.to('#section-projects', { scale: 1.05, opacity: 0, ease: 'none' }, 0.8)
              .fromTo('#section-contact', 
                { opacity: 0, scale: 0.85, y: 100 }, 
                { opacity: 1, scale: 1, y: 0, ease: 'power4.out' }, 0.85
              );

    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Operational Menu Anchor Map System
  const scrollToView = (targetPercentage: number) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: totalHeight * targetPercentage,
      behavior: 'smooth'
    });
  };

  if (!isMounted) return <div className="bg-[#f3eee7] min-h-screen" />;

  return (
    <div ref={containerRef} className="bg-[#f3eee7] text-[#1a1a15] min-h-screen font-sans overflow-x-hidden selection:bg-[#cc5a37] selection:text-white antialiased">
      
      {/* GLOBAL UI BOUNDS */}
      <div className="fixed inset-0 h-screen w-screen overflow-hidden z-10 p-6 md:p-12 flex flex-col justify-between pointer-events-none">
        
        {/* POLISHED NAVIGATION BAR */}
        <header className="w-full flex justify-between items-center z-50 pointer-events-auto">
          <div onClick={() => scrollToView(0)} className="flex items-center gap-4 cursor-pointer group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#1a1a15]/20 flex items-center justify-center bg-white/40 backdrop-blur-md group-hover:scale-105 transition-transform">
              <Image src="/assets/logo.png" alt="Ali Newaz Logo" width={38} height={38} className="object-contain" priority />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black uppercase tracking-wider text-sm leading-none">Ali Newaz</span>
              <span className="text-[10px] font-mono tracking-widest opacity-60 mt-0.5">CSE // SPECIALIST</span>
            </div>
          </div>
          
          {/* OPERATIONAL NAVIGATION ACTIONS */}
          <nav className="hidden md:flex items-center gap-8 bg-white/50 backdrop-blur-md border border-[#1a1a15]/10 px-8 py-3 rounded-full shadow-sm">
            <button onClick={() => scrollToView(0.25)} className="text-xs uppercase tracking-widest font-bold hover:text-[#cc5a37] transition-colors">About</button>
            <button onClick={() => scrollToView(0.55)} className="text-xs uppercase tracking-widest font-bold hover:text-[#cc5a37] transition-colors">Projects</button>
            <button onClick={() => scrollToView(0.95)} className="text-xs uppercase tracking-widest font-bold hover:text-[#cc5a37] transition-colors">Contact</button>
          </nav>

          {/* FIX: TAB OVERRIDE ONLINE CV VIEWING */}
          <a 
            href="/assets/Ali_Newaz_CV.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold bg-[#1a1a15] text-[#f3eee7] px-6 py-3 rounded-xl hover:bg-[#cc5a37] transition-all"
          >
            <FileText size={14} /> View CV <ArrowUpRight size={14} />
          </a>
        </header>

        {/* COMPONENT SCENE 1: HERO ASSEMBLY */}
        <section className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20 pointer-events-auto">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-4">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="hero-tag-badge hero-assemble flex items-center gap-2 bg-white/60 backdrop-blur-md border border-[#1a1a15]/10 w-max px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#cc5a37]">
                <GraduationCap size={14} /> CSE STUDENT & PROPERTY PRESERVATION
              </div>
              <h1 className="text-6xl md:text-[95px] font-black tracking-tighter uppercase leading-[0.85] flex flex-col select-none">
                <span className="hero-title-left block will-change-transform">ALI</span>
                <span className="hero-title-right block text-[#cc5a37] will-change-transform">NEWAZ</span>
              </h1>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end hero-profile-box will-change-transform hero-assemble">
              <div className="float-card w-full max-w-[340px] bg-white/60 backdrop-blur-xl border border-[#1a1a15]/10 p-4 rounded-2xl shadow-sm">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-[#1a1a15]/10 mb-4 bg-black/5">
                  <Image src="/assets/headshot.jpg" alt="Ali Newaz Professional Headshot" fill className="object-cover" priority sizes="340px" />
                </div>
                <div className="flex justify-between items-center text-left">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide">Identity Framework</h4>
                    <p className="text-[11px] font-mono opacity-60">WUB // Core Engineering</p>
                  </div>
                  <button onClick={() => scrollToView(0.55)} className="w-9 h-9 bg-[#1a1a15] text-white rounded-xl flex items-center justify-center hover:bg-[#cc5a37] transition-colors">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENT SCENE 2: DIRECTIONAL ABOUT ASSEMBLY */}
        <section ref={aboutRef} id="section-about" className="absolute inset-0 bg-[#1a1a15] text-[#f3eee7] flex items-center justify-center p-6 z-30 opacity-0 pointer-events-auto will-change-transform">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4">
            <div className="lg:col-span-7 space-y-4 text-left about-panel-left will-change-transform">
              <span className="text-xs font-mono tracking-widest text-[#cc5a37] font-bold uppercase">// OPERATIONS SYNC</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                SYSTEMS CODING.<br/>
                <span className="text-[#f3eee7]/40">PROPERTY PRESERVATION.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs opacity-70 leading-relaxed font-normal pt-2">
                <p>
                  Operating at the intersection of structural engineering metrics and real estate preservation. Handling bulk workflow systems, optimizing asset pipeline distributions, script data structures, and executing strict timeline audits across thousands of property vendor parameters.
                </p>
                <p>
                  Consolidating core engineering modules at the World University of Bangladesh. Mapping logical interface layouts directly into structural, low-latency, modular codebase components to maximize workflow speed and eliminate front-end friction.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end about-panel-right will-change-transform">
              <div className="float-img relative w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden border border-[#f3eee7]/10 p-2 bg-white/5 backdrop-blur-md shadow-xl">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image src="/assets/rooftop1.jpg" alt="Ali Newaz Workspace" fill className="object-cover" sizes="340px" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENT SCENE 3: SYNCHRONIZED PROJECT TRACK */}
        <section ref={projectsRef} id="section-projects" className="absolute inset-0 flex items-center z-30 opacity-0 pointer-events-auto will-change-transform pl-6 md:pl-24 pr-12">
          <div className="flex flex-col text-left gap-2 shrink-0 pr-16 max-w-xs z-40 relative">
            <div className="w-10 h-10 rounded-xl bg-[#cc5a37]/10 border border-[#cc5a37]/20 flex items-center justify-center text-[#cc5a37] mb-1">
              <Compass size={18} className="animate-spin-slow" />
            </div>
            <span className="text-xs font-mono tracking-widest text-[#cc5a37] font-bold uppercase">// SELECTED REPOS</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">CORE<br/>WORK</h2>
          </div>

          <div ref={projectsTrackRef} className="flex gap-6 h-[55vh] items-center will-change-transform">
            
            {/* BOX CARD 1 */}
            <div className="w-[400px] h-full bg-white/80 backdrop-blur-md border border-[#1a1a15]/10 rounded-2xl p-6 flex flex-col justify-between shadow-sm shrink-0">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a15]/5 flex items-center justify-center text-[#cc5a37]"><Wrench size={18} /></div>
                <span className="text-[10px] font-mono opacity-50 font-bold bg-[#1a1a15]/5 px-3 py-1 rounded-full">01 / DISPATCH</span>
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-black uppercase tracking-tight">Field Readiness Engine</h3>
                <p className="text-xs opacity-70 leading-relaxed">
                  Real-time vendor logistics deployment framework covering multi-state preservation accounts, order tracking variables, and high-performance routing analytics modules.
                </p>
                <div className="flex gap-1.5 text-[9px] font-mono font-bold opacity-50 pt-1">
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">QC METRICS</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">VENDOR STACK</span>
                </div>
              </div>
            </div>

            {/* BOX CARD 2 */}
            <div className="w-[400px] h-full bg-white/80 backdrop-blur-md border border-[#1a1a15]/10 rounded-2xl p-6 flex flex-col justify-between shadow-sm shrink-0">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a15]/5 flex items-center justify-center text-[#cc5a37]"><Laptop size={18} /></div>
                <span className="text-[10px] font-mono opacity-50 font-bold bg-[#1a1a15]/5 px-3 py-1 rounded-full">02 / ACADEMICS</span>
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-black uppercase tracking-tight">WUB Thesis Portal</h3>
                <p className="text-xs opacity-70 leading-relaxed">
                  Interactive software engineering laboratory interface archiving distributed network designs, structural code matrices, algorithms, and active computer engineering components.
                </p>
                <div className="flex gap-1.5 text-[9px] font-mono font-bold opacity-50 pt-1">
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">LAB DEPLOYMENTS</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">COMPILER TIMELINE</span>
                </div>
              </div>
            </div>

            {/* BOX CARD 3 */}
            <div className="w-[400px] h-full bg-white/80 backdrop-blur-md border border-[#1a1a15]/10 rounded-2xl p-6 flex flex-col justify-between shadow-sm shrink-0">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a15]/5 flex items-center justify-center text-[#cc5a37]"><Shield size={18} /></div>
                <span className="text-[10px] font-mono opacity-50 font-bold bg-[#1a1a15]/5 px-3 py-1 rounded-full">03 / REAL ESTATE</span>
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-black uppercase tracking-tight">Preservation Script Matrix</h3>
                <p className="text-xs opacity-70 leading-relaxed">
                  Automated verification database tracking before/after asset updates, condition metrics, bidding formulations, and image processing modules for field data validation.
                </p>
                <div className="flex gap-1.5 text-[9px] font-mono font-bold opacity-50 pt-1">
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">BID LOGIC</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">IMAGE BUFFERS</span>
                </div>
              </div>
            </div>

            {/* BOX CARD 4 */}
            <div className="w-[400px] h-full bg-white/80 backdrop-blur-md border border-[#1a1a15]/10 rounded-2xl p-6 flex flex-col justify-between shadow-sm shrink-0">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a15]/5 flex items-center justify-center text-[#cc5a37]"><Layout size={18} /></div>
                <span className="text-[10px] font-mono opacity-50 font-bold bg-[#1a1a15]/5 px-3 py-1 rounded-full">04 / ARCHITECTURE</span>
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-black uppercase tracking-tight">Identity OS Core</h3>
                <p className="text-xs opacity-70 leading-relaxed">
                  Ultra-fluid layout system built using clean hardware accelerated tracking to process infinite interactive scroll transitions smoothly on high-refresh setups.
                </p>
                <div className="flex gap-1.5 text-[9px] font-mono font-bold opacity-50 pt-1">
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">GSAP TIMELINE</span>
                  <span className="border border-[#1a1a15]/20 px-2 py-0.5 rounded">WEBGL GLIDE</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* COMPONENT SCENE 4: DEEP LAYER CONTACT CONNECTOR */}
        <section ref={contactRef} id="section-contact" className="absolute inset-0 flex flex-col items-center justify-center p-4 z-40 opacity-0 pointer-events-none text-center">
          <div className="max-w-3xl space-y-6 px-4">
            <span className="text-xs font-mono tracking-widest text-[#cc5a37] font-bold uppercase block">// CONNECT PLATFORM</span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              LET THE NEXT BRIEF ARRIVE <br/>
              <span className="text-[#1a1a15]/20">CLEAN AND PREPARED.</span>
            </h2>
            <p className="text-xs opacity-70 max-w-md mx-auto leading-relaxed">
              Available for software infrastructure development modules, structural preservation audits, or engineering evaluation tracks.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a 
                href="mailto:alinewaz5678900@gmail.com"
                className="inline-flex items-center gap-3 bg-[#1a1a15] text-[#f3eee7] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl shadow-md hover:bg-[#cc5a37] transition-all pointer-events-auto"
              >
                <Mail size={14} /> Send Email <ArrowUpRight size={14} />
              </a>
              <a 
                href="/assets/Ali_Newaz_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/80 border border-[#1a1a15]/10 text-[#1a1a15] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#1a1a15] hover:text-white transition-all pointer-events-auto"
              >
                <FileText size={14} /> Preview Document
              </a>
            </div>
          </div>
        </section>

        {/* METRIC CORNER BENCHMARKS */}
        <footer className="w-full flex justify-between items-center z-50 text-[9px] font-mono uppercase tracking-widest opacity-40 select-none">
          <span>SCROLL ENGINE ACTIVE</span>
          <span>DHAKA COMPILER GRID</span>
        </footer>

      </div>

      {/* MECHANICAL DEPTH SPACER */}
      <div ref={scrollBufferRef} className="relative z-0 h-[500vh] w-full pointer-events-none" />

    </div>
  );
}
