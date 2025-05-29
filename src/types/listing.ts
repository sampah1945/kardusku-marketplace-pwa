
export interface Listing {
  id: string;
  title: string;
  location: string;
  distance: string;
  weight: number;
  category: string;
  date: string;
  imageUrl: string;
  description?: string;
  contactInfo?: {
    phone: string;
    preferredTime?: string;
  };
  cardboardType?: string[];
}
