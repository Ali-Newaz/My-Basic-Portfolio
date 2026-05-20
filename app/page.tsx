'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('preservation');

  return (
    <div className="bg-[#f3eee7] text-[#1a1a15] min-h-screen font-sans selection:bg-[#cc5a37] selection:text-white antialiased">
      
      {/* GLOBAL BACKGROUND SYSTEM GRIDS */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-difference bg-[linear-gradient(90deg,#1a1a15_1px,transparent_1px),linear-gradient(180deg,#1a1a15_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col min-h-screen justify-between relative z-10">
        
        {/* HEADER BRANDING */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-[#1a1a15]/10 pb-8">
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 block mb-1">Portfolio Platform // 2026</span>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Ali Newaz</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a 
              href="mailto:alinewaz5678900@gmail.com"
              className="text-xs font-mono uppercase tracking-wider bg-[#1a1a15] text-[#f3eee7] px-5 py-3 rounded-xl hover:bg-[#cc5a37] transition-all"
            >
              Get In Touch
            </a>
            <a 
              href="/assets/Ali_Newaz_CV.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-wider bg-white border border-[#1a1a15]/10 px-5 py-3 rounded-xl hover:bg-[#1a1a15] hover:text-white transition-all flex items-center gap-1.5"
            >
              View CV <span>↗</span>
            </a>
          </div>
        </header>

        {/* HERO FRAMING */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto py-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-[#1a1a15]/10 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold text-[#cc5a37]">
              ⚡ CSE STUDENT & PROPERTY PRESERVATION SPECIALIST
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[0.9]">
              Systems Thinking.<br />
              <span className="text-[#cc5a37]">Precision Work.</span>
            </h2>
            <p className="text-sm opacity-75 max-w-xl leading-relaxed">
              Operating at the structural junction of automated engineering matrices and real estate preservation asset management. Consolidating modular software tracks at the World University of Bangladesh while processing strict multi-state vendor parameters.
            </p>

            {/* INTERACTIVE COMPONENT SWITCHER */}
            <div className="pt-4 space-y-4">
              <div className="flex border-b border-[#1a1a15]/10 max-w-md">
                <button 
                  onClick={() => setActiveTab('preservation')}
                  className={`pb-2 pr-6 text-xs font-mono uppercase tracking-widest border-b-2 transition-all ${activeTab === 'preservation' ? 'border-[#cc5a37] text-[#cc5a37] font-bold' : 'border-transparent opacity-40'}`}
                >
                  Preservation Matrix
                </button>
                <button 
                  onClick={() => setActiveTab('engineering')}
                  className={`pb-2 px-6 text-xs font-mono uppercase tracking-widest border-b-2 transition-all ${activeTab === 'engineering' ? 'border-[#cc5a37] text-[#cc5a37] font-bold' : 'border-transparent opacity-40'}`}
                >
                  Software Stack
                </button>
              </div>

              <div className="bg-white/50 border border-[#1a1a15]/5 p-6 rounded-2xl max-w-xl shadow-sm backdrop-blur-sm transition-all">
                {activeTab === 'preservation' ? (
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[#1a1a15]">Field Readiness Suite</h4>
                    <p className="text-xs opacity-70 leading-relaxed">
                      Automated validation infrastructure tracking multi-state preservation accounts, workflow logs, and image buffers for complete field data protection.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[#1a1a15]">WUB Thesis Lab</h4>
                    <p className="text-xs opacity-70 leading-relaxed">
                      Custom, reactive software architecture layers utilizing highly responsive interface modules designed to completely eliminate layout friction.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ASSET IMAGE CARD */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px] bg-white border border-[#1a1a15]/10 p-4 rounded-2xl shadow-luxury">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-[#1a1a15]/5 bg-[#1a1a15]/5 mb-4 flex items-center justify-center group">
                {/* Fallback image rendering frame using absolute file target */}
                <img 
                  src="/assets/headshot.jpg" 
                  alt="Ali Newaz Framework Photo" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback state if path asset isn't mounted inside repo yet
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if(parent) parent.innerHTML = '<span class="text-xs font-mono opacity-40">/assets/headshot.jpg</span>';
                  }}
                />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs uppercase tracking-wider">Identity Overview</h4>
                <p className="text-[11px] font-mono opacity-50">Dhaka System Grid // Uttara</p>
              </div>
            </div>
          </div>
        </main>

        {/* METRIC FOOTER */}
        <footer className="flex justify-between items-center border-t border-[#1a1a15]/10 pt-6 text-[10px] font-mono uppercase tracking-widest opacity-40">
          <span>Operational Layout Active</span>
          <span>WUB // CSE</span>
        </footer>

      </div>
    </div>
  );
}
