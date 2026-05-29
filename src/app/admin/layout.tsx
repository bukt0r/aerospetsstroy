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

  // Normalize: trailingSlash:true makes pathname "/admin/login/"; strip the
  // trailing slash so comparisons work regardless of the export setting.
  const normalizedPath = pathname?.replace(/\/$/, '') || pathname;
  const isLoginPage = normalizedPath === '/admin/login';

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [user, loading, router, isLoginPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Allow login page to render even if user is not authenticated
  if (!user && isLoginPage) {
    return <>{children}</>;
  }

  // For other admin pages, require authentication
  if (!user) {
    return null;
  }

  return <>{children}</>;
} 