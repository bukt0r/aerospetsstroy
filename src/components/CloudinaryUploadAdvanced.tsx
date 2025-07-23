"use client";

import { useState, useRef } from 'react';
import { cloudinaryUploadUrl, cloudinaryConfig } from '@/config/cloudinary';

interface CloudinaryUploadAdvancedProps {
  onUploadComplete: (urls: string[]) => void;
  onRemoveImage?: (url: string) => void;
  folder?: string;
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  multiple?: boolean;
  className?: string;
  label?: string;
  currentImages?: string[];
}

export default function CloudinaryUploadAdvanced({ 
  onUploadComplete, 
  onRemoveImage,
  folder = 'aerospetsstroy',
  accept = 'image/*',
  maxSize = 5,
  maxFiles = 10,
  multiple = true,
  className = '',
  label = 'Загрузить изображения',
  currentImages = []
}: CloudinaryUploadAdvancedProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Validate number of files
    if (files.length > maxFiles) {
      setError(`Максимальное количество файлов: ${maxFiles}`);
      return;
    }

    // Validate each file
    for (const file of files) {
      if (file.size > maxSize * 1024 * 1024) {
        setError(`Файл "${file.name}" слишком большой. Максимальный размер: ${maxSize}MB`);
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError(`Файл "${file.name}" не является изображением`);
        return;
      }
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Create FormData for Cloudinary upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        formData.append('folder', folder);

        // Upload to Cloudinary
        console.log(`Uploading file ${i + 1}/${files.length} to Cloudinary:`, {
          url: cloudinaryUploadUrl,
          preset: cloudinaryConfig.uploadPreset,
          folder: folder,
          fileSize: file.size,
          fileType: file.type,
          fileName: file.name
        });

        const response = await fetch(cloudinaryUploadUrl, {
          method: 'POST',
          body: formData,
        });

        console.log(`Upload response for file ${i + 1}:`, {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Upload error response for file ${i + 1}:`, errorText);
          throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        console.log(`Upload success for file ${i + 1}:`, result);
        uploadedUrls.push(result.secure_url);
        
        // Update progress
        setUploadProgress(((i + 1) / files.length) * 100);
      }
      
      // Call the callback with all URLs
      onUploadComplete(uploadedUrls);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Ошибка загрузки файлов. Попробуйте еще раз.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    if (onRemoveImage) {
      onRemoveImage(imageUrl);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
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
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Загрузка изображений...</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Current Images Preview */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentImages.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
              />
              {onRemoveImage && (
                <button
                  onClick={() => handleRemoveImage(imageUrl)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  title="Удалить изображение"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 