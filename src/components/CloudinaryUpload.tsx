"use client";

import { useState, useRef } from 'react';
import { cloudinaryUploadUrl, cloudinaryConfig } from '@/config/cloudinary';

interface CloudinaryUploadProps {
  onUploadComplete: (url: string) => void;
  folder?: string;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  label?: string;
}

export default function CloudinaryUpload({ 
  onUploadComplete, 
  folder = 'aerospetsstroy',
  accept = 'image/*',
  maxSize = 5,
  className = '',
  label = 'Загрузить изображение'
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Файл слишком большой. Максимальный размер: ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Create FormData for Cloudinary upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      formData.append('folder', folder);

      // Upload to Cloudinary
      console.log('Uploading to Cloudinary:', {
        url: cloudinaryUploadUrl,
        preset: cloudinaryConfig.uploadPreset,
        folder: folder,
        fileSize: file.size,
        fileType: file.type
      });

      const response = await fetch(cloudinaryUploadUrl, {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload error response:', errorText);
        throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Upload success:', result);
      
      // Call the callback with the secure URL
      onUploadComplete(result.secure_url);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Ошибка загрузки файла. Попробуйте еще раз.');
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />
      
      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? 'Загрузка...' : label}
      </button>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {uploading && (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Загрузка изображения...</span>
        </div>
      )}
    </div>
  );
} 