import React from 'react';
import { Box, Cpu, Sparkles } from 'lucide-react';

const Header = () => {
    return (
        <header className="w-full py-6 px-4 mb-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-primary/40 blur-lg rounded-full animate-pulse"></div>
                        <div className="relative p-2.5 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl text-white shadow-xl">
                            <Cpu size={28} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2 leading-none">
                            BODY<span className="text-brand-accent">INFER</span>
                        </h1>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mt-1">
                            AI Body Measurement System
                        </p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Dashboard</a>
                    <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Analytics</a>
                    <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Settings</a>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">System Online</span>
                    </div>
                    <button className="hidden sm:flex items-center gap-2 bg-white text-brand-primary px-5 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-white/5">
                        <Sparkles size={16} />
                        Get PRO
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
