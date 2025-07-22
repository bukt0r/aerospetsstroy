"use client";

import { useState, useEffect } from 'react';
import { useFirestoreContent } from '@/hooks/useFirestoreContent';
import { useAuth } from '@/contexts/AuthContext';

export default function FirestoreStatus() {
  const { loading, error } = useFirestoreContent();
  const { user } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  // Show success message for 2 seconds then hide
  useEffect(() => {
    if (!loading && !error) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, error]);

  // Only show for admin users
  if (!user) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="fixed top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded text-sm">
        Загрузка данных...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="fixed top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm">
        Ошибка: {error}
      </div>
    );
  }

  if (!showSuccess) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-3 py-1 rounded text-sm">
      Данные загружены
    </div>
  );
} 