"use client";

import { useState, useRef } from 'react';
import { cloudinaryUploadUrl, cloudinaryConfig } from '@/config/cloudinary';

interface PdfUploadProps {
  onUploadComplete: (url: string) => void;
  currentPdf?: string;
  folder?: string;
  maxSize?: number; // in MB
  className?: string;
  label?: string;
}

export default function PdfUpload({ 
  onUploadComplete, 
  currentPdf = '',
  folder = 'aerospetsstroy/certificates',
  maxSize = 10,
  className = '',
  label = 'Загрузить PDF файл'
}: PdfUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Файл должен быть в формате PDF');
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Файл слишком большой. Максимальный размер: ${maxSize}MB`);
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Create FormData for Cloudinary upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      formData.append('folder', folder);

      // Upload to Cloudinary
      console.log('Uploading PDF to Cloudinary:', {
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

      if (result.secure_url) {
        onUploadComplete(result.secure_url);
        setUploadProgress(100);
      } else {
        throw new Error('No URL returned from upload');
      }

    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onUploadComplete('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
            uploading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {uploading ? 'Загрузка...' : label}
        </button>

        {currentPdf && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Текущий PDF:</span>
            <a 
              href={currentPdf} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Просмотреть PDF
            </a>
            <button
              onClick={handleRemove}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Удалить
            </button>
          </div>
        )}

        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
} 