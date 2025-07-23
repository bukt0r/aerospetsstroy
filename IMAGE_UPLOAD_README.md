# Image Upload Functionality

## Overview
This application now supports image uploads using Firebase Storage. Images are uploaded directly from the admin panel and stored in Firebase Storage, with the download URLs automatically saved to your content.

## Features

### ✅ **Firebase Storage Integration**
- Images are stored in Firebase Storage buckets
- Automatic URL generation for uploaded images
- Secure file access with Firebase rules
- No server-side code required (works with static hosting)

### ✅ **Admin Panel Integration**
- **Objects Section**: Upload main images and gallery images for each object
- **News Section**: Upload images for news articles
- **Multiple Upload Support**: Upload multiple images at once
- **Image Preview**: See uploaded images in the admin panel
- **Delete Functionality**: Remove images with automatic Firebase cleanup

### ✅ **User Experience**
- Drag & drop or click to upload
- Progress indicators during upload
- File validation (size, type)
- Error handling and user feedback
- Image previews in admin panel

## How to Use

### 1. **Objects Image Upload**
1. Go to Admin Panel → Objects
2. Edit any object
3. **Main Image**: Use "Загрузить главное изображение" for the primary object image
4. **Gallery Images**: Use "Загрузить дополнительные изображения" for multiple gallery images
5. Images are automatically organized in Firebase Storage folders:
   - Main images: `objects/main/`
   - Gallery images: `objects/gallery/`

### 2. **News Image Upload**
1. Go to Admin Panel → News
2. Edit any news item
3. Use "Загрузить изображение новости" to upload news images
4. Images are stored in `news/` folder

### 3. **File Requirements**
- **Supported Formats**: JPG, PNG, GIF, WebP
- **Maximum Size**: 5MB per file
- **Maximum Files**: 10 files per upload (for gallery images)

## Technical Implementation

### **Firebase Storage Setup**
```typescript
// Firebase Storage is already configured in:
// src/config/firebaseClient.ts

import { getStorage } from "firebase/storage";
const storage = getStorage(app);
```

### **Upload Components**
- `ImageUpload.tsx`: Simple single image upload
- `ImageUploadAdvanced.tsx`: Advanced upload with preview, multiple files, delete

### **Storage Structure**
```
firebase-storage/
├── objects/
│   ├── main/          # Main object images
│   └── gallery/       # Object gallery images
├── news/              # News article images
└── uploads/           # General uploads
```

## Benefits for Static Hosting

### ✅ **No Server Required**
- All uploads go directly to Firebase Storage
- No backend API needed
- Works perfectly with static hosting

### ✅ **Automatic CDN**
- Firebase Storage provides global CDN
- Fast image delivery worldwide
- Automatic optimization

### ✅ **Scalable**
- No storage limits (within Firebase quotas)
- Automatic backup and redundancy
- Cost-effective for small to medium sites

## Security Considerations

### **Firebase Storage Rules**
Make sure your Firebase Storage rules allow authenticated uploads:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;  // Anyone can view images
      allow write: if request.auth != null;  // Only authenticated users can upload
    }
  }
}
```

### **File Validation**
- Client-side file type validation
- File size limits (5MB)
- Automatic filename sanitization
- Unique timestamp prefixes

## Troubleshooting

### **Common Issues**
1. **Upload Fails**: Check Firebase Storage rules and authentication
2. **Images Not Loading**: Verify Firebase Storage bucket configuration
3. **Large Files**: Reduce file size or increase limits in component props

### **Development**
- Test uploads in development mode
- Check browser console for errors
- Verify Firebase project configuration

## Future Enhancements

### **Potential Additions**
- Image compression before upload
- Multiple image formats (WebP conversion)
- Image cropping and editing
- Bulk upload for multiple objects
- Image optimization and lazy loading

---

**Note**: This implementation works perfectly with static hosting since all uploads are handled by Firebase Storage, requiring no server-side processing. 