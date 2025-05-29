
export interface CardboardAd {
  id: string;
  userId: string;
  weight: number;
  cardboardType: string[];
  description?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  contactInfo: {
    phone: string;
    preferredTime?: string;
  };
  status: 'active' | 'inactive' | 'sold';
  createdAt: Date;
  expiresAt: Date;
  images?: string[];
}

export interface CardboardAdCreate {
  weight: number;
  cardboardType: string[];
  description?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  contactInfo: {
    phone: string;
    preferredTime?: string;
  };
}

export interface CardboardAdImage {
  id: string;
  adId: string;
  imageUrl: string;
  imageOrder: number;
  createdAt: Date;
}
