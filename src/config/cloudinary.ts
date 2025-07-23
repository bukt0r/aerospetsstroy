"use client";

// Cloudinary configuration
// You'll need to get these from your Cloudinary dashboard
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dol6rgype',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'aerospetsstroy',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '337437972447593',
};

// Cloudinary upload URL
export const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;

// Helper function to get Cloudinary URL with transformations
export const getCloudinaryUrl = (publicId: string, transformations: string = '') => {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformations}${publicId}`;
};

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (publicId: string, width: number = 800, quality: number = 80) => {
  return getCloudinaryUrl(publicId, `f_auto,q_${quality},w_${width}/`);
}; 