
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Package, Clock, MapPin, Phone, Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Ad {
  id: string;
  weight: number;
  cardboard_type: string[];
  description: string;
  location_address: string;
  contact_phone: string;
  contact_preferred_time: string;
  status: 'active' | 'inactive' | 'sold';
  created_at: string;
  expires_at: string;
  images: { image_url: string }[];
}

const AdDashboard = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserAds();
  }, []);

  const fetchUserAds = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('cardboard_ads')
        .select(`
          *,
          cardboard_ad_images(image_url)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match Ad interface
      const transformedAds: Ad[] = data.map(ad => ({
        id: ad.id,
        weight: ad.weight,
        cardboard_type: ad.cardboard_type,
        description: ad.description || '',
        location_address: ad.location_address,
        contact_phone: ad.contact_phone,
        contact_preferred_time: ad.contact_preferred_time || '',
        status: ad.status as 'active' | 'inactive' | 'sold',
        created_at: ad.created_at,
        expires_at: ad.expires_at,
        images: ad.cardboard_ad_images || []
      }));

      setAds(transformedAds);
    } catch (error) {
      console.error('Error fetching ads:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat iklan Anda.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAdStatus = async (adId: string, status: 'active' | 'inactive' | 'sold') => {
    try {
      const { error } = await supabase
        .from('cardboard_ads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', adId);

      if (error) throw error;

      setAds(ads.map(ad => 
        ad.id === adId ? { ...ad, status } : ad
      ));

      toast({
        title: 'Status diperbarui',
        description: `Iklan berhasil di${status === 'sold' ? 'tandai sebagai terjual' : status === 'active' ? 'aktifkan' : 'nonaktifkan'}.`,
      });
    } catch (error) {
      console.error('Error updating ad status:', error);
      toast({
        title: 'Error',
        description: 'Gagal memperbarui status iklan.',
        variant: 'destructive',
      });
    }
  };

  const deleteAd = async (adId: string) => {
    if (!confirm('Yakin ingin menghapus iklan ini?')) return;

    try {
      const { error } = await supabase
        .from('cardboard_ads')
        .delete()
        .eq('id', adId);

      if (error) throw error;

      setAds(ads.filter(ad => ad.id !== adId));
      
      toast({
        title: 'Iklan dihapus',
        description: 'Iklan berhasil dihapus.',
      });
    } catch (error) {
      console.error('Error deleting ad:', error);
      toast({
        title: 'Error',
        description: 'Gagal menghapus iklan.',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'sold': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'inactive': return 'Nonaktif';
      case 'sold': return 'Terjual';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Iklan Saya</h2>
        <div className="text-sm text-gray-600">
          Total: {ads.length} iklan
        </div>
      </div>

      {ads.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Belum ada iklan
              </h3>
              <p className="text-gray-600">
                Mulai posting iklan kardus bekas Anda sekarang.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {ads.map((ad) => (
            <Card key={ad.id}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  {/* Image */}
                  {ad.images.length > 0 && (
                    <div className="flex-shrink-0">
                      <img
                        src={ad.images[0].image_url}
                        alt="Kardus"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(ad.status)}>
                            {getStatusText(ad.status)}
                          </Badge>
                          <span className="text-lg font-semibold">
                            {ad.weight} kg
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {ad.cardboard_type.map((type, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {ad.description && (
                      <p className="text-gray-600 text-sm">{ad.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate max-w-xs">{ad.location_address}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>{ad.contact_phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          Dibuat: {format(new Date(ad.created_at), 'dd MMM yyyy HH:mm', { locale: id })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          Berakhir: {format(new Date(ad.expires_at), 'dd MMM yyyy HH:mm', { locale: id })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {ad.status === 'active' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateAdStatus(ad.id, 'sold')}
                        >
                          Tandai Terjual
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateAdStatus(ad.id, 'inactive')}
                        >
                          Nonaktifkan
                        </Button>
                      </>
                    )}
                    {ad.status === 'inactive' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateAdStatus(ad.id, 'active')}
                      >
                        Aktifkan
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteAd(ad.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdDashboard;
