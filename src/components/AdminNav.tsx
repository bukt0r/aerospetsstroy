"use client";

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  // Check if we're on admin pages
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isAdminPage ? (
        <Link
          href="/"
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
        >
          На сайт
        </Link>
      ) : (
        <Link
          href="/admin"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Админ панель
        </Link>
      )}
    </div>
  );
} 