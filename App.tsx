import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MarbleCard from './components/MarbleCard';
import Visualizer from './components/Visualizer';
import { MARBLE_INVENTORY, SERVICES } from './data/inventory';
import { Category, MarbleProduct } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Settings2, UserCheck, ArrowRight, ShieldCheck, Gem, X, Send, Phone, User, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MarbleProduct | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('rr_image_overrides');
    if (saved) {
      try {
        setImageOverrides(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load local image data", e);
      }
    }
  }, []);

  const handleImageUpdate = (id: string, dataUrl: string) => {
    const newOverrides = { ...imageOverrides, [id]: dataUrl };
    setImageOverrides(newOverrides);
    localStorage.setItem('rr_image_overrides', JSON.stringify(newOverrides));
  };

  const handleResetImage = (id: string) => {
    const newOverrides = { ...imageOverrides };
    delete newOverrides[id];
    setImageOverrides(newOverrides);
    localStorage.setItem('rr_image_overrides', JSON.stringify(newOverrides));
  };

  const filteredProducts = MARBLE_INVENTORY.map(p => ({
    ...p,
    imageUrl: imageOverrides[p.id] || p.imageUrl
  })).filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.description.toLowerCase().includes(search.toLowerCase()) ||
                         p.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['All', ...Object.values(Category)];

  const openQuoteModal = (product?: MarbleProduct) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-gold selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-32 pb-40 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900 text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-10 shadow-2xl">
              <ShieldCheck size={14} /> Est. 1994 • Direct Quarry Exports
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-[10rem] font-bold text-slate-900 mb-12 leading-[0.85] serif tracking-tighter"
          >
            Exquisite <br />
            <span className="text-gold italic font-light">Rajasthan</span> Stone
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg font-medium leading-relaxed mb-16"
          >
            Sourcing the world's most coveted marbles and artisanal stone crafts directly from the heart of Kishangarh and Makrana.
          </motion.p>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.7 }}
             className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <button 
              onClick={() => { document.getElementById('marketplace')?.scrollIntoView({behavior: 'smooth'}); }}
              className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gold hover:shadow-2xl transition-all flex items-center justify-center gap-3 group"
            >
              Explore Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => openQuoteModal()}
              className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Request Price List
            </button>
          </motion.div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[600px] bg-gradient-to-b from-gold/5 to-transparent blur-[120px] pointer-events-none -z-10"></div>
      </header>

      {/* Services Grid */}
      <section className="py-32 bg-slate-950 text-white rounded-[4rem] mx-4 mb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Exclusive Advantage</span>
              <h2 className="text-5xl font-bold serif mb-8 leading-tight">Digital Transparency, <br />Traditional Trust.</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-12">We bridge the gap between Rajasthan's raw quarries and your architectural vision with professional grade inspection services.</p>
              
              <div className="space-y-6">
                {SERVICES[0].features.map((f, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={f} 
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                      <UserCheck size={18} />
                    </div>
                    <span className="text-slate-200 font-bold tracking-wide">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 text-[15rem] opacity-[0.03] font-serif italic text-white pointer-events-none">RR</div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold serif mb-4 text-gold">{SERVICES[0].title}</h3>
                <p className="text-slate-400 mb-10 leading-relaxed">{SERVICES[0].description}</p>
                <div className="flex items-center justify-between pt-8 border-t border-white/10">
                  <span className="text-4xl font-bold serif">{SERVICES[0].price}</span>
                  <button 
                    onClick={() => openQuoteModal()}
                    className="bg-gold text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:shadow-xl hover:shadow-gold/20 transition-all"
                  >
                    Book On-Site Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Filters & Search */}
      <section id="marketplace" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-6xl font-bold serif text-slate-900 mb-6">The Master Collection</h2>
            <div className="flex items-center gap-6">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search designs (e.g. C101, Fan, White)..." 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-6 w-full xl:w-auto">
             <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 pl-3 text-slate-400">
                  <Settings2 size={12} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Editor Mode</span>
                </div>
                <button 
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className={`px-5 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${isAdminMode ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-400 border border-slate-100'}`}
                >
                  {isAdminMode ? 'Active' : 'Locked'}
                </button>
             </div>
             <div className="flex flex-wrap gap-2 justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all flex items-center gap-2 ${filter === cat ? 'bg-gold text-white shadow-2xl shadow-gold/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
                >
                  {filter === cat && <Filter size={12} />}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <MarbleCard 
                key={product.id} 
                product={product} 
                onSelect={openQuoteModal} 
                isAdmin={isAdminMode}
                onUpdateImage={handleImageUpdate}
                onResetImage={handleResetImage}
                hasOverride={!!imageOverrides[product.id]}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <div id="visualizer">
        <Visualizer />
      </div>

      {/* Quote Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="flex h-full flex-col md:flex-row">
                <div className="md:w-5/12 bg-slate-900 p-12 text-white flex flex-col justify-between">
                  <div>
                    <Gem className="text-gold mb-6" size={32} />
                    <h3 className="text-3xl font-bold serif mb-4">Request a Premium Quote</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {selectedProduct 
                        ? `Inquiring about Design Code: ${selectedProduct.id}. Our experts will provide the best market rates directly from Kishangarh.`
                        : "Our consultants will help you navigate the complex Rajasthan stone markets with zero hassle."}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gold">
                      <ShieldCheck size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Guaranteed Best Rates</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-7/12 p-12 relative">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"
                  >
                    <X size={24} />
                  </button>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all" placeholder="Enter your name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">WhatsApp Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input type="tel" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all" placeholder="+91" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Project Requirements</label>
                      <textarea className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-4 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all h-32 resize-none" placeholder="Quantity, application (e.g. Flooring), and delivery location..."></textarea>
                    </div>
                    <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-gold transition-all shadow-xl shadow-slate-900/10">
                      Submit Request <Send size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="bg-white text-slate-900 py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-24">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-gold">
                <Gem size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight uppercase serif">Royal Rajasthan</h1>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Direct quarry access to premium Makrana white, Statuario, and custom CNC stone art carvings. Serving global architects and luxury home builders.</p>
          </div>
          <div>
            <h5 className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-8">Exclusive Collections</h5>
            <ul className="space-y-4 text-sm font-bold text-slate-600">
              <li className="hover:text-gold cursor-pointer transition-colors">Makrana Heritage White</li>
              <li className="hover:text-gold cursor-pointer transition-colors">CNC Feature Art Walls</li>
              <li className="hover:text-gold cursor-pointer transition-colors">Temple Architectural Pillars</li>
              <li className="hover:text-gold cursor-pointer transition-colors">Commercial Granite Slabs</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-gold mb-2">Direct Contact</p>
              <h5 className="text-2xl font-bold serif mb-1">Bajrang Singh Rathore</h5>
              <p className="text-slate-900 font-bold text-lg mb-6">+91 80152 73247</p>
              <p className="text-slate-400 text-xs italic">Email: bajrangsingh1005@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-20 mt-20 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2025 Royal Rajasthan Premium Marble & Stones. All Rights Reserved.</p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="hover:text-gold cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold cursor-pointer">Trade Inquiry</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;