"use client";

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function AdminNav() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link
        href="/admin"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        Админ панель
      </Link>
    </div>
  );
} 