'use client';

import React from "react";
import { useFirestoreContent } from "@/hooks/useFirestoreContent";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const News = () => {
  const { newsData, loading } = useFirestoreContent();

  // Default values for loading state
  const defaultData = {
    title: "НОВОСТИ",
    newsData: [
      {
        id: "news-1",
        title: "Наша компания успешно завершила строительство объекта «ПТО на станции Анапа»",
        subtitle: "Завершение проекта",
        description: "Выполнение СМР на строительстве объекта: «ПТО на станции Анапа», включая полный комплекс работ по вертикальной планировке и устройству свайного фундамента, вынос сетей связи и СЦБ из зоны строительства и устройство сетей ЭС, устройство наружных сетей ТС, ВиК , устройство железобетонных буронабивных свай, монтаж ворот и звукоизолирующего шумозащитного ограждения. Краснодарский край, станция Анапа",
        date: "2023-10-27",
        image: "/news/news1.jpg",
        url: "/news/news1",
      },
      {
        id: "news-2",
        title: "Строительство вертолётной площадки, дороги и рулёжные дороги",
        subtitle: "Новый проект",
        description: "Выполнение полного комплекса СМР по инженерной инфраструктуре вертолетной площадки с рулёжными дорожками и дорогами из ж/б конструкций. Краснодарский край, с. Прасковеевка",
        date: "2023-09-15",
        image: "/news/news2.jpg",
        url: "/news/news2",
      },
      {
        id: "news-3",
        title: "Строительство шумозащитных экранов",
        subtitle: "Экологический проект",
        description: "Строительство второго пути на участке Выселки (вкл.) Козырьки (искл.)» Комплекс работ по устройству монолитных ростверков и монтажу шумозащитных экранов. Краснодарский край, Северо-Кавказская ж.д . Выселки Козырьки",
        date: "2023-08-20",
        image: "/news/news3.jpg",
        url: "/news/news3",
      },
    ]
  };

  // Use data from Firestore or defaults
  const data = loading ? defaultData : newsData;

  // Don't render if not visible
  if (!data?.visible) {
    return null;
  }

  return(
    <div
      id="News"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#D3DFEA] text-[#111111CC] lg:bg-[#F2F5F9] lg:px-[60px] lg:py-[100px] xl:px-[100px]">
      <div>
        <h2 className="text-[30px] font-semibold mb-[20px] xl:text-[64px] lg:mb-[37px]">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-[30px] xl:h-[64px] bg-gray-300 rounded w-1/3"></div>
            </div>
          ) : (
            data.title
          )}
        </h2>
        
        {loading ? (
          // Loading skeleton for news slider
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // News Slider
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="news-swiper"
            >
              {(data.newsData || []).map((newsItem, index) => (
                <SwiperSlide key={newsItem.id || index}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                    {/* News Image */}
                    {newsItem.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={newsItem.image} 
                          alt={newsItem.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {newsItem.date}
                        </div>
                      </div>
                    )}
                    
                    {/* News Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {newsItem.title}
                        </h3>
                        <p className="text-lg text-blue-600 font-medium mb-2">
                          {newsItem.subtitle}
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <div 
                          className="text-gray-700 leading-relaxed prose prose-sm max-w-none line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: newsItem.description || '' }}
                        />
                      </div>
                      
                      {newsItem.url && (
                        <div className="mt-4">
                          <a 
                            href={newsItem.url}
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                          >
                            Читать далее
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev !text-blue-600 !bg-white !w-12 !h-12 !rounded-full !shadow-lg hover:!bg-blue-50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="swiper-button-next !text-blue-600 !bg-white !w-12 !h-12 !rounded-full !shadow-lg hover:!bg-blue-50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            {/* Custom Pagination */}
            <div className="swiper-pagination !bottom-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;