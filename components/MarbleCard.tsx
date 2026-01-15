import React, { useRef } from 'react';
import { MarbleProduct } from '../types';
import { MessageSquare, Maximize2, Camera, RefreshCcw, Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  product: MarbleProduct;
  onSelect: (p: MarbleProduct) => void;
  isAdmin?: boolean;
  onUpdateImage?: (id: string, dataUrl: string) => void;
  onResetImage?: (id: string) => void;
  hasOverride?: boolean;
}

const MarbleCard: React.FC<Props> = ({ 
  product, 
  onSelect, 
  isAdmin, 
  onUpdateImage, 
  onResetImage,
  hasOverride 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const phoneNumber = "918015273247";
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateImage(product.id, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Namaste! I am interested in the Royal Rajasthan Catalog Design: ${product.id} (${product.name}). Please provide a quote.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isBestDesign = ['c122', 'c123', 'c124', 'c125'].includes(product.id.toLowerCase());

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer border border-slate-100 flex flex-col h-full relative"
      onClick={() => onSelect(product)}
    >
      <div className="relative h-96 overflow-hidden bg-slate-50">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out ${!hasOverride ? 'mix-blend-multiply opacity-90' : ''}`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {isAdmin && (
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-[4px]">
            <button 
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-gold hover:text-white transition-all"
            >
              <Camera size={14} /> Replace Photo
            </button>
            {hasOverride && (
               <button 
               onClick={(e) => { e.stopPropagation(); onResetImage?.(product.id); }}
               className="text-white/80 text-[10px] font-bold uppercase tracking-widest hover:text-white flex items-center gap-2"
             >
               <RefreshCcw size={12} /> Reset to Default
             </button>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
        )}

        <div className="absolute top-6 left-6 flex flex-col gap-3">
          <div className="bg-white/90 backdrop-blur-md text-slate-900 px-5 py-2.5 rounded-2xl shadow-xl border border-white/20">
            <p className="text-[9px] uppercase tracking-widest opacity-50 font-black mb-0.5">RR DESIGN CODE</p>
            <p className="text-xl font-bold serif leading-none">{product.id}</p>
          </div>
          {isBestDesign && (
            <div className="bg-gold text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
              <Star size={12} fill="currentColor" /> Premium Selection
            </div>
          )}
        </div>

        <button className="absolute bottom-6 right-6 p-4 bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
          <Maximize2 size={20} />
        </button>
      </div>

      <div className="p-10 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 serif leading-tight">{product.name}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-gold">
              <MapPin size={10} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Origin: {product.origin}</span>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[9px] uppercase font-bold text-slate-400 mb-0.5">Est. Price</p>
             <span className="text-2xl font-bold text-slate-900 serif">₹{product.pricePerSqFt}<span className="text-[10px] font-normal text-slate-400 ml-1">/ft²</span></span>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
          <button 
            onClick={openWhatsApp}
            className="flex-grow bg-[#25D366] text-white px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:shadow-xl hover:shadow-green-500/20 transition-all flex items-center justify-center gap-3"
          >
            <MessageSquare size={16} />
            Inquire Price
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MarbleCard;