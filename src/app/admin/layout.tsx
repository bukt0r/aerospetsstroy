"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  console.log('Admin layout - user:', user, 'loading:', loading, 'pathname:', pathname);

  useEffect(() => {
    // Don't redirect if we're already on the login page
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Allow login page to render even if user is not authenticated
  if (!user && pathname === '/admin/login') {
    return <>{children}</>;
  }

  // For other admin pages, require authentication
  if (!user) {
    return null;
  }

  return <>{children}</>;
} 