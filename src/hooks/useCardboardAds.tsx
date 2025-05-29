
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CardboardAd } from '@/types/cardboard';

interface UseCardboardAdsReturn {
  ads: CardboardAd[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCardboardAds = (): UseCardboardAdsReturn => {
  const [ads, setAds] = useState<CardboardAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAds = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('cardboard_ads')
        .select(`
          *,
          cardboard_ad_images(image_url, image_order)
        `)
        .eq('status', 'active')
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Transform data to match CardboardAd interface
      const transformedAds: CardboardAd[] = data.map(ad => ({
        id: ad.id,
        userId: ad.user_id,
        weight: ad.weight,
        cardboardType: ad.cardboard_type,
        description: ad.description,
        location: {
          lat: ad.location_lat,
          lng: ad.location_lng,
          address: ad.location_address,
        },
        contactInfo: {
          phone: ad.contact_phone,
          preferredTime: ad.contact_preferred_time,
        },
        status: ad.status as 'active' | 'inactive' | 'sold',
        createdAt: new Date(ad.created_at),
        expiresAt: new Date(ad.expires_at),
        images: ad.cardboard_ad_images
          ?.sort((a, b) => a.image_order - b.image_order)
          .map(img => img.image_url) || [],
      }));

      setAds(transformedAds);
    } catch (err) {
      console.error('Error fetching ads:', err);
      setError('Gagal memuat iklan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return {
    ads,
    loading,
    error,
    refetch: fetchAds,
  };
};
