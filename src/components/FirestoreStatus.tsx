"use client";

import { useFirestoreContent } from '@/hooks/useFirestoreContent';

export default function FirestoreStatus() {
  const { loading, error } = useFirestoreContent();

  if (loading) {
    return (
      <div className="fixed top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded text-sm">
        Загрузка данных...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm">
        Ошибка: {error}
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-3 py-1 rounded text-sm">
      Данные загружены
    </div>
  );
} 