# Cloudinary Setup Instructions

## 🔧 **Step 1: Create Cloudinary Account**
1. Go to https://cloudinary.com/
2. Sign up for a free account
3. Verify your email

## 🔧 **Step 2: Get Your Cloudinary Credentials**
1. Go to your Cloudinary Dashboard
2. Copy your **Cloud Name** (found in the dashboard)
3. Go to **Settings** → **Upload** → **Upload presets**
4. Create a new upload preset or use the default one
5. Copy your **API Key** (found in Account Details)

## 🔧 **Step 3: Configure Environment Variables**
Create a `.env.local` file in your project root with:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
```

**Example:**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=mycompany
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default
NEXT_PUBLIC_CLOUDINARY_API_KEY=123456789012345
```

## 🔧 **Step 4: Update Cloudinary Config**
Edit `src/config/cloudinary.ts` and replace the placeholder values:

```typescript
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-actual-cloud-name',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your-actual-upload-preset',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 'your-actual-api-key',
};
```

## 🔧 **Step 5: Test the Upload**
1. Start your development server: `npm run dev`
2. Go to admin panel: `/admin`
3. Try uploading an image in Objects or News section
4. Check that images appear correctly

## ✅ **Benefits of Cloudinary**

### **Free Tier Features:**
- **25GB storage** per month
- **25GB bandwidth** per month
- **25GB transformations** per month
- **Automatic image optimization**
- **Global CDN**
- **Multiple image formats** (WebP, AVIF)

### **Advanced Features:**
- **Automatic image resizing**
- **Format conversion**
- **Quality optimization**
- **Responsive images**
- **Lazy loading support**

## 🔧 **Upload Preset Configuration**

### **For Secure Uploads:**
1. Go to **Settings** → **Upload** → **Upload presets**
2. Create a new preset or edit existing
3. Set **Signing Mode** to **Unsigned** (for client-side uploads)
4. Set **Folder** to organize your uploads
5. Enable **Auto-format** for optimization

### **Recommended Settings:**
- **Folder**: `aerospetsstroy`
- **Format**: `auto`
- **Quality**: `auto`
- **Transformation**: `f_auto,q_auto`

## 🚀 **Deployment**

### **For Production:**
1. Add environment variables to your hosting platform
2. Update the config with production values
3. Test uploads in production environment

### **Environment Variables for Hosting:**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
```

## 🔍 **Troubleshooting**

### **Common Issues:**
1. **Upload fails**: Check upload preset permissions
2. **Images not loading**: Verify cloud name and folder structure
3. **CORS errors**: Cloudinary handles CORS automatically
4. **Large files**: Check file size limits (default 10MB)

### **Debug Steps:**
1. Check browser console for errors
2. Verify environment variables are loaded
3. Test with smaller images first
4. Check Cloudinary dashboard for uploads

## 📁 **Folder Structure**
Your images will be organized in Cloudinary as:
```
aerospetsstroy/
├── objects/
│   ├── main/          # Main object images
│   └── gallery/       # Object gallery images
├── news/              # News article images
└── uploads/           # General uploads
```

## 💡 **Tips**
- Use descriptive folder names for organization
- Enable auto-format for better performance
- Set appropriate quality settings for your use case
- Monitor usage in Cloudinary dashboard
- Consider upgrading if you exceed free tier limits 