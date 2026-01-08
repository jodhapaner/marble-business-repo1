
import React, { useState } from 'react';
import { MARBLE_INVENTORY } from '../data/inventory';
import { MarbleProduct } from '../types';

const Visualizer: React.FC = () => {
  const [selectedMarble, setSelectedMarble] = useState<MarbleProduct>(MARBLE_INVENTORY[0]);
  const [view, setView] = useState<'floor' | 'wall'>('floor');

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-gold font-bold uppercase tracking-widest text-sm">Interactive Studio</span>
              <h2 className="text-5xl font-bold mt-4 leading-tight serif">See your space transformed</h2>
              <p className="text-slate-400 text-lg mt-6">
                Choose a stone from our curated Rajasthan collection and visualize it in a high-end living space.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {MARBLE_INVENTORY.slice(0, 6).map((m) => (
                <button 
                  key={m.id}
                  onClick={() => setSelectedMarble(m)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedMarble.id === m.id ? 'border-gold scale-105 shadow-lg shadow-gold/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20"></div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setView('floor')}
                className={`px-8 py-3 rounded-full font-bold transition-all ${view === 'floor' ? 'bg-gold text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                Flooring
              </button>
              <button 
                onClick={() => setView('wall')}
                className={`px-8 py-3 rounded-full font-bold transition-all ${view === 'wall' ? 'bg-gold text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                Wall Cladding
              </button>
            </div>
          </div>

          <div className="relative aspect-[4/5] bg-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Visualizer Simulation */}
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
              alt="Room view"
            />
            <div className="absolute inset-0 flex items-end">
                {/* Simulated texture overlay */}
              <div 
                className="w-full h-full transition-all duration-700"
                style={{
                  backgroundImage: `url(${selectedMarble.imageUrl})`,
                  backgroundSize: '300px',
                  maskImage: view === 'floor' 
                    ? 'linear-gradient(to top, black 40%, transparent 100%)' 
                    : 'linear-gradient(to right, black 50%, transparent 100%)',
                  opacity: 0.8
                }}
              ></div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xl">{selectedMarble.name}</h4>
                  <p className="text-slate-300 text-sm">Finest quality from {selectedMarble.origin}</p>
                </div>
                <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm">Request Sample</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visualizer;
