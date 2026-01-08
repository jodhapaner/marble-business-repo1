
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white font-bold text-xl serif">R</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">ROYAL RAJASTHAN</h1>
              <p className="text-[10px] uppercase tracking-widest text-gold font-semibold">Premium Marble & Stones</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-gold transition-colors">Collections</a>
            <a href="#" className="hover:text-gold transition-colors">Visualizer</a>
            <a href="#" className="hover:text-gold transition-colors">Our Legacy</a>
            <a href="#" className="hover:text-gold transition-colors">Contact</a>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
            Get a Quote
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
