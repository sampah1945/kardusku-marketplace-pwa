
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseImageUploadReturn {
  uploading: boolean;
  uploadImage: (file: File, userId: string) => Promise<string>;
  deleteImage: (imageUrl: string) => Promise<void>;
  compressImage: (file: File) => Promise<File>;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [uploading, setUploading] = useState(false);

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max 800px width/height)
        const maxSize = 800;
        let { width, height } = img;

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          0.8
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const uploadImage = async (file: File, userId: string): Promise<string> => {
    setUploading(true);
    try {
      // Compress image first
      const compressedFile = await compressImage(file);
      
      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('cardboard-ads')
        .upload(fileName, compressedFile);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('cardboard-ads')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (imageUrl: string): Promise<void> => {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const userId = urlParts[urlParts.length - 2];
      const filePath = `${userId}/${fileName}`;

      const { error } = await supabase.storage
        .from('cardboard-ads')
        .remove([filePath]);

      if (error) throw error;
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    }
  };

  return {
    uploading,
    uploadImage,
    deleteImage,
    compressImage,
  };
};
