# Admin Panel Documentation

## Overview
This project includes a Firebase-powered admin panel for managing website content. The admin system provides authentication and content management capabilities.

## Features

### 🔐 Authentication
- Firebase Email/Password authentication
- Protected admin routes
- Automatic redirect to login for unauthenticated users

### 📝 Content Management
- Edit website content through admin dashboard
- Toggle page visibility
- Real-time content updates
- Support for multiple content sections

## Setup

### 1. Firebase Configuration
Ensure your Firebase project is properly configured in `src/config/firebaseConfig.ts`:
- Enable Email/Password authentication in Firebase Console
- Create admin user account in Firebase Console

### 2. Admin User Setup
1. Go to Firebase Console > Authentication
2. Add a new user with email/password
3. Use these credentials to log into the admin panel

## Usage

### Accessing Admin Panel
1. Navigate to `/admin/login`
2. Enter your Firebase admin credentials
3. You'll be redirected to `/admin` dashboard

### Admin Dashboard Features
- **Sidebar Navigation**: Switch between different content sections
- **Visibility Toggle**: Show/hide sections on the main website
- **Content Editing**: Edit text content for each section
- **Logout**: Secure logout functionality

### Content Sections
- Main Page (`main`)
- Specialization (`specialization`)
- Services (`services`)
- Objects (`objects`)
- News (`news`)
- Team (`team`)
- About Company (`aboutCompany`)
- Partners (`partners`)
- Certificates (`certificates`)
- Vacancies (`vacancies`)

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx      # Admin login page
│   │   ├── page.tsx            # Admin dashboard
│   │   └── layout.tsx          # Admin layout with auth protection
├── components/
│   ├── AdminNav.tsx            # Admin navigation component
│   └── ProtectedRoute.tsx      # Route protection component
├── contexts/
│   └── AuthContext.tsx         # Firebase auth context
└── config/
    └── firebaseConfig.ts       # Firebase configuration
```

## Security Notes
- All admin routes are protected
- Authentication state is managed globally
- Unauthenticated users are redirected to login
- Admin navigation only shows for authenticated users

## Troubleshooting

### Common Issues
1. **Authentication Errors**: Check Firebase configuration and user credentials
2. **Content Not Updating**: Ensure the `useAdminContent` hook is properly connected
3. **Route Protection Issues**: Verify AuthProvider is wrapping the app

### Development
- The admin panel uses client-side rendering for real-time updates
- Content changes are managed through React state
- Firebase authentication provides secure access control 