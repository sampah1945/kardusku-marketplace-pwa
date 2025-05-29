
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Upload, Phone, Clock, Package } from 'lucide-react';
import { useLocation } from '@/hooks/useLocation';
import { useImageUpload } from '@/hooks/useImageUpload';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CardboardAdCreate } from '@/types/cardboard';

const cardboardTypes = [
  'Kardus Kecil',
  'Kardus Sedang', 
  'Kardus Besar',
  'Kardus Elektronik',
  'Kardus Makanan',
  'Kardus Lainnya'
];

const adSchema = z.object({
  weight: z.number().min(0.1, 'Berat minimal 0.1 kg'),
  cardboardType: z.array(z.string()).min(1, 'Pilih minimal satu jenis kardus'),
  description: z.string().optional(),
  contactPhone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  preferredTime: z.string().optional(),
});

type AdFormData = z.infer<typeof adSchema>;

interface AdPostingFormProps {
  onSuccess?: () => void;
}

const AdPostingForm = ({ onSuccess }: AdPostingFormProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  
  const { location, loading: locationLoading, error: locationError, getCurrentLocation } = useLocation();
  const { uploading, uploadImage } = useImageUpload();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AdFormData>({
    resolver: zodResolver(adSchema),
  });

  const handleTypeToggle = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    
    setSelectedTypes(newTypes);
    setValue('cardboardType', newTypes);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      toast({
        title: 'Maksimal 5 gambar',
        description: 'Anda hanya dapat mengupload maksimal 5 gambar.',
        variant: 'destructive',
      });
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: AdFormData) => {
    if (!location) {
      toast({
        title: 'Lokasi diperlukan',
        description: 'Silakan aktifkan lokasi terlebih dahulu.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Upload images first
      const uploadPromises = images.map(image => uploadImage(image, user.id));
      const uploadedUrls = await Promise.all(uploadPromises);
      setImageUrls(uploadedUrls);

      // Create ad
      const { data: adData, error: adError } = await supabase
        .from('cardboard_ads')
        .insert({
          user_id: user.id,
          weight: data.weight,
          cardboard_type: data.cardboardType,
          description: data.description,
          location_lat: location.lat,
          location_lng: location.lng,
          location_address: location.address,
          contact_phone: data.contactPhone,
          contact_preferred_time: data.preferredTime,
        })
        .select()
        .single();

      if (adError) throw adError;

      // Save images
      if (uploadedUrls.length > 0) {
        const imageInserts = uploadedUrls.map((url, index) => ({
          ad_id: adData.id,
          image_url: url,
          image_order: index,
        }));

        const { error: imageError } = await supabase
          .from('cardboard_ad_images')
          .insert(imageInserts);

        if (imageError) throw imageError;
      }

      toast({
        title: 'Iklan berhasil diposting!',
        description: 'Iklan Anda akan aktif selama 24 jam.',
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error creating ad:', error);
      toast({
        title: 'Error',
        description: 'Gagal memposting iklan. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Posting Iklan Kardus Bekas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Weight Input */}
          <div className="space-y-2">
            <Label htmlFor="weight">Berat Kardus (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="Contoh: 5.5"
              {...register('weight', { valueAsNumber: true })}
            />
            {errors.weight && (
              <p className="text-sm text-red-500">{errors.weight.message}</p>
            )}
          </div>

          {/* Cardboard Types */}
          <div className="space-y-2">
            <Label>Jenis Kardus</Label>
            <div className="grid grid-cols-2 gap-2">
              {cardboardTypes.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={selectedTypes.includes(type) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTypeToggle(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
            {errors.cardboardType && (
              <p className="text-sm text-red-500">{errors.cardboardType.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi (Opsional)</Label>
            <Textarea
              id="description"
              placeholder="Kondisi kardus, asal barang, dll..."
              {...register('description')}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Lokasi</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                {locationLoading ? 'Mencari...' : 'Dapatkan Lokasi'}
              </Button>
            </div>
            {location && (
              <p className="text-sm text-green-600">
                📍 {location.address}
              </p>
            )}
            {locationError && (
              <p className="text-sm text-red-500">{locationError}</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Nomor Telepon
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                {...register('contactPhone')}
              />
              {errors.contactPhone && (
                <p className="text-sm text-red-500">{errors.contactPhone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Waktu Kontak Terbaik (Opsional)
              </Label>
              <Input
                id="preferredTime"
                placeholder="Contoh: Weekday 9-17, Weekend 10-15"
                {...register('preferredTime')}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Foto Kardus (Maksimal 5)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <Label htmlFor="image-upload" className="cursor-pointer flex items-center justify-center gap-2">
                <Upload className="h-4 w-4" />
                Pilih Gambar
              </Label>
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={submitting || uploading || !location}
          >
            {submitting ? 'Memposting...' : 'Posting Iklan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdPostingForm;
