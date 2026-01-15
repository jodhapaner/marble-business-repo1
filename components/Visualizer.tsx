import React, { useState } from 'react';
import { MARBLE_INVENTORY } from '../data/inventory';
import { MarbleProduct } from '../types';
import { Layout, MoveDown, Layers, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Visualizer: React.FC = () => {
  const [selectedMarble, setSelectedMarble] = useState<MarbleProduct>(MARBLE_INVENTORY[0]);
  const [view, setView] = useState<'floor' | 'wall'>('floor');

  return (
    <section className="py-32 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div>
              <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Visualizer Studio</span>
              <h2 className="text-6xl font-bold mb-8 leading-tight serif">Your Vision, <br /><span className="text-gold italic font-light">Stone Crafted.</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                Experience the interplay of light and texture. Select a material to see it live in a digital architectural environment.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {MARBLE_INVENTORY.slice(0, 6).map((m) => (
                <button 
                  key={m.id}
                  onClick={() => setSelectedMarble(m)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 ${selectedMarble.id === m.id ? 'border-gold scale-105 shadow-2xl shadow-gold/40' : 'border-transparent opacity-40 hover:opacity-100'}`}
                >
                  <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/20"></div>
                </button>
              ))}
            </div>

            <div className="flex gap-6">
              <button 
                onClick={() => setView('floor')}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${view === 'floor' ? 'bg-gold text-white shadow-xl shadow-gold/20' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
              >
                <MoveDown size={14} /> Flooring
              </button>
              <button 
                onClick={() => setView('wall')}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${view === 'wall' ? 'bg-gold text-white shadow-xl shadow-gold/20' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
              >
                <Layers size={14} /> Wall Cladding
              </button>
            </div>
          </div>

          <motion.div 
            key={selectedMarble.id + view}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[4/5] bg-slate-800 rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
              alt="Luxury Room"
            />
            <div className="absolute inset-0 flex items-end">
              <div 
                className="w-full h-full transition-all duration-1000 ease-in-out"
                style={{
                  backgroundImage: `url(${selectedMarble.imageUrl})`,
                  backgroundSize: '400px',
                  maskImage: view === 'floor' 
                    ? 'linear-gradient(to top, black 40%, transparent 100%)' 
                    : 'linear-gradient(to right, black 50%, transparent 100%)',
                  opacity: 0.9
                }}
              ></div>
            </div>
            
            <div className="absolute bottom-10 left-10 right-10 p-10 bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-2xl serif mb-1">{selectedMarble.name}</h4>
                  <p className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Premium {selectedMarble.category} Grade</p>
                </div>
                <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-gold hover:text-white transition-all">
                  Request Sample <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Visualizer;