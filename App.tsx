
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MarbleCard from './components/MarbleCard';
import Visualizer from './components/Visualizer';
import { MARBLE_INVENTORY, SERVICES, VENDORS } from './data/inventory';
import { Category, MarbleProduct } from './types';

const App: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});

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

  return (
    <div className="min-h-screen bg-white selection:bg-gold selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-32 pb-24 px-4 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6 animate-fade-in">
            Royal Rajasthan Premium Collection
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-8 leading-[1.1] serif">
            Rajasthan's Finest <br />
            Stone <span className="text-gold italic">Marketplace</span>
          </h1>
          <p className="max-w-3xl mx-auto text-slate-500 text-xl font-light leading-relaxed mb-12">
            Experience the luxury of Royal Rajasthan Premium Marble and Stones. Digital catalog C101-C128 now live for international shipping and local installation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => { setFilter(Category.STONE_ART); document.getElementById('marketplace')?.scrollIntoView({behavior: 'smooth'}); }}
              className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              Browse Stone Art
            </button>
            <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold border border-slate-200 hover:bg-slate-50 transition-all">
              Contact Bajrang Singh
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]"></div>
      </header>

      {/* Services */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {SERVICES.map(service => (
              <div key={service.id} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:border-gold/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 font-serif italic text-gold">{service.icon}</div>
                <div className="relative z-10">
                  <span className="text-gold text-xs font-bold uppercase tracking-widest">{service.tagline}</span>
                  <h3 className="text-3xl font-bold serif mt-2 mb-4">{service.title}</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed max-w-md">{service.description}</p>
                  <div className="flex justify-between items-end">
                    <div className="space-y-2">
                      {service.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                          <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                          {f}
                        </div>
                      ))}
                    </div>
                    <div className="text-right">
                      <span className="block text-3xl font-bold serif text-gold mb-4">{service.price}</span>
                      <button className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-gold hover:text-white transition-all">
                        Book Consultant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="marketplace" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold serif text-slate-900 mb-4">The Catalog</h2>
            <p className="text-slate-500 text-lg">Select a design to start your inquiry via WhatsApp.</p>
          </div>
          
          <div className="flex flex-col items-end gap-4">
             <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-full border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider pl-3 text-slate-500">Inventory Admin</span>
                <button 
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isAdminMode ? 'bg-gold text-white shadow-lg' : 'bg-white text-slate-400'}`}
                >
                  {isAdminMode ? 'Enabled' : 'Disabled'}
                </button>
             </div>
             <div className="flex flex-wrap gap-2 justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${filter === cat ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map(product => (
            <MarbleCard 
              key={product.id} 
              product={product} 
              onSelect={() => {}} 
              isAdmin={isAdminMode}
              onUpdateImage={handleImageUpdate}
              onResetImage={handleResetImage}
              hasOverride={!!imageOverrides[product.id]}
            />
          ))}
        </div>
      </section>

      <Visualizer />

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/918015273247?text=Namaste!%20I%20visited%20your%20website%20and%20want%20to%20know%20more%20about%20your%20stone%20collections."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 group"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm">Chat on WhatsApp</span>
      </a>

      <footer className="bg-slate-900 text-slate-400 py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white font-bold text-xl serif">R</div>
              <h1 className="text-xl font-bold tracking-tight uppercase">Royal Rajasthan</h1>
            </div>
            <p className="text-sm leading-relaxed">Direct from the heart of Rajasthan's premium marble legacy. Traditional craftsmanship meets CNC technology at Royal Rajasthan Premium Marble and Stones.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Explore</h5>
            <ul className="space-y-4 text-sm">
              <li>Makrana White Marble</li>
              <li>CNC Feature Walls</li>
              <li>Temple Architecture</li>
              <li>Bulk Quotations</li>
            </ul>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
            <h5 className="text-white font-bold mb-2">Bajrang Singh Rathore</h5>
            <p className="text-gold font-bold mb-1">+91 80152 73247</p>
            <p className="text-slate-300 text-xs mb-4">bajrangsingh1005@gmail.com</p>
            <p className="text-xs text-slate-500 italic">Expert quarry selections and premium architectural pricing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
