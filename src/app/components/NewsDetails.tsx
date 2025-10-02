'use client';

import React from "react";

interface NewsDetailsProps {
  newsItem: {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    date: string;
    image?: string;
  };
  onClose: () => void;
}

export default function NewsDetails({ newsItem, onClose }: NewsDetailsProps) {
  if (!newsItem) return <p className="text-red-500">Новость не найдена.</p>;

  // Format date to readable format
  const formattedDate = newsItem.date 
    ? new Date(newsItem.date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <>
      <div className="flex justify-between lg:items-center mb-[20px]">
        <h2 className="font-[600] text-[20px] xl:text-[32px] pr-4">{newsItem.title || 'Без названия'}</h2>
        <button
          onClick={onClose}
          className="text-[#6095AB] px-[21px] py-[4px] border-[#6095AB] border-[1px] rounded-2xl xl:text-[20px] hover:bg-[#6095AB99] hover:text-[#FFFFFF] hover:border-[#6095AB99] transition-colors flex-shrink-0"
        >
          закрыть
        </button>
      </div>

      {newsItem.subtitle && (
        <p className="text-lg text-blue-600 font-medium mb-4 xl:text-[24px]">{newsItem.subtitle}</p>
      )}

      {formattedDate && (
        <p className="text-gray-500 mb-6 xl:text-[18px]">{formattedDate}</p>
      )}

      {newsItem.image && (
        <div className="mb-6">
          <img 
            src={newsItem.image} 
            alt={newsItem.title}
            className="w-full h-auto rounded-lg shadow-md"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      <div 
        className="text-gray-700 leading-relaxed prose prose-sm max-w-none xl:text-[20px]"
        dangerouslySetInnerHTML={{ __html: newsItem.description || '' }}
      />
    </>
  );
}

