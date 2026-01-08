
import React, { useRef } from 'react';
import { MarbleProduct, Category } from '../types';

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
  const phoneNumber = "918015273247"; // Bajrang Singh Rathore's number
  
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
    const message = `Namaste! I am interested in the Royal Rajasthan Catalog Design: ${product.id} (${product.name}). Please provide a quote for the available sizes.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isBestDesign = ['c122', 'c123', 'c124', 'c125'].includes(product.id.toLowerCase());

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200 flex flex-col h-full relative"
      onClick={() => onSelect(product)}
    >
      <div className="relative h-80 overflow-hidden bg-slate-100">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${!hasOverride ? 'mix-blend-multiply opacity-80' : ''}`}
        />
        
        {isAdmin && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
            <button 
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-gold hover:text-white transition-all shadow-2xl"
            >
              <span className="text-lg">📷</span> Replace Catalog Photo
            </button>
            {hasOverride && (
               <button 
               onClick={(e) => { e.stopPropagation(); onResetImage?.(product.id); }}
               className="text-white/70 text-[10px] font-bold uppercase tracking-widest hover:text-white underline"
             >
               Reset to Default
             </button>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-xl border border-white/10">
            <p className="text-[10px] uppercase tracking-tighter opacity-60 font-bold mb-0.5">RR CODE</p>
            <p className="text-lg font-bold serif leading-none uppercase">{product.id}</p>
          </div>
          {isBestDesign && (
            <span className="bg-gold text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg animate-pulse">
              ★ Best Design
            </span>
          )}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-slate-900 serif leading-tight">{product.name}</h3>
          <p className="text-gold font-bold text-xs tracking-[0.2em] mt-1 uppercase">Royal Rajasthan Premium</p>
        </div>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow italic">
          "{product.description}"
        </p>
        
        {product.sizes && (
          <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2">Available Dimensions</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s => (
                <span key={s} className="text-[10px] bg-white text-slate-900 px-3 py-1.5 rounded-full border border-slate-200 font-bold uppercase">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-auto">
          <div>
             <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Approx Price</p>
             <span className="text-2xl font-bold text-slate-900 serif">₹{product.pricePerSqFt}<span className="text-sm font-normal text-slate-400">/ft²</span></span>
          </div>
          <button 
            onClick={openWhatsApp}
            className="bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-900 transition-all shadow-lg hover:shadow-green-500/20 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarbleCard;
