#!/bin/bash

# Build script for static deployment with Cloudinary
echo "🚀 Building static site with Cloudinary..."

# Set environment variables for build
export NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dol6rgype
export NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=aerospetsstroy
export NEXT_PUBLIC_CLOUDINARY_API_KEY=337437972447593

# Build the static site
echo "📦 Building Next.js static export..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Static files are in the 'out' directory"
    echo "🌐 You can now deploy the 'out' directory to your hosting"
else
    echo "❌ Build failed!"
    exit 1
fi 