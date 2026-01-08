
export enum Category {
  MARBLE = 'Marble',
  GRANITE = 'Granite',
  SANDSTONE = 'Sandstone',
  TILES = 'Tiles',
  STONE_ART = 'Stone Art'
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  rating: number;
  specialty: string;
}

export interface MarbleProduct {
  id: string;
  name: string;
  origin: string;
  category: Category;
  description: string;
  pricePerSqFt: number;
  imageUrl: string;
  finish: string[];
  color: string;
  sizes?: string[];
  vendorId: string;
}

export interface ProService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
