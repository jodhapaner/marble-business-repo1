import React from 'react';
import { Gem, Menu, PhoneCall } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-gold shadow-xl">
              <Gem size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none serif">ROYAL RAJASTHAN</h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Premium Stone Legacy</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-widest font-bold text-slate-500">
            <a href="#marketplace" className="hover:text-gold transition-colors">Collections</a>
            <a href="#visualizer" className="hover:text-gold transition-colors">Visualizer</a>
            <a href="#" className="hover:text-gold transition-colors">Our Legacy</a>
            <a href="#" className="hover:text-gold transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all shadow-lg hover:shadow-gold/20">
              <PhoneCall size={14} />
              Get a Quote
            </button>
            <button className="md:hidden p-2 text-slate-900">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;