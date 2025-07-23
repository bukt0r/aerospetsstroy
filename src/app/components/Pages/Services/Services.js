'use client'

import React from 'react';
import { useFirestoreContent } from '@/hooks/useFirestoreContent';

const Services = () => {
  const { servicesData, loading } = useFirestoreContent();

  // Default values for loading state
  const defaultData = {
    title: "УСЛУГИ",
    subtitle1: "Строительство",
    description1: "Строим высокотехнологичные производственные комплексы в разных отраслях. ",
    subtitle2: "Проектирование",
    description2: "Нами реализовано большое количество посадочных площадок всех типов и сложности на территории РФ и СНГ. Наша компания выполняет работы с соблюдением всех норм, применяя самые современные технологии, материалы и оборудование."
  };

  // Use data from Firestore or defaults
  const data = loading ? defaultData : servicesData;

  // Don't render if not visible
  if (!data?.visible) {
    return null;
  }

  return(
    <div
      id="Services"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] text-[#111111CC] bg-[#D3DFEA4D] lg:bg-[#E6ECF4] lg:px-[60px] lg:py-[100px] xl:px-[100px]">
      <div className="mb-[36px]">
        <h2 className="text-[30px] font-semibold xl:text-[64px]">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-[30px] xl:h-[64px] bg-gray-300 rounded w-1/2"></div>
            </div>
          ) : (
            data.title
          )}
        </h2>
      </div>
      
      {/* First Service Section */}
      {data.visible1 && (
        <div className="lg:flex lg:items-center lg:bg-[url('/services/servicesFullScreenImg2.png')] bg-cover bg-center lg:shadow-[0px_30px_20px_#DFE7F2,0px_-30px_20px_#DFE7F2,20px_0px_20px_#DFE7F2] lg:min-h-[300px] xl:min-h-[470px]">
          <div className="flex lg:w-[50%]"></div>
          <div className="lg:w-[50%]">
            <div className="lg:w-[80%] lg:pl-[30px]">
              <span className="text-[20px] font-[600] xl:text-[24px]">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-[20px] xl:h-[24px] bg-gray-300 rounded w-1/3"></div>
                  </div>
                ) : (
                  data.subtitle1
                )}
              </span>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-[20px] xl:h-[20px] bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-[20px] xl:h-[20px] bg-gray-300 rounded w-5/6"></div>
                </div>
              ) : (
                <div 
                  className="mt-[12px] xl:text-[20px] prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: data.description1 || '' }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {data.visible1 && (
        <div className="lg:hidden mt-[40px]">
          <img className="shadow-[0px_30px_20px_#DFE7F2,0px_-30px_20px_#DFE7F2,20px_0px_20px_#DFE7F2]" src="/services/servicesImg2.png" alt="pic"/>
        </div>
      )}

      {/* Second Service Section */}
      {data.visible2 && (
        <div className="lg:flex lg:items-center lg:bg-[url('/services/servicesFullScreenImg1.png')] bg-cover bg-center lg:shadow-[0px_40px_20px_#D6E1ED,0px_-30px_20px_#DFE7F2,20px_0px_20px_#DFE7F2] lg:min-h-[300px] xl:min-h-[470px] lg:mb-[40px]">
          <div className="flex lg:w-[50%]"></div>
          <div className="lg:w-[50%]">
            <div className="lg:w-[80%] lg:pl-[30px] mt-[40px]">
              <span className="text-[20px] font-[600] xl:text-[24px]">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-[20px] xl:h-[24px] bg-gray-300 rounded w-1/3"></div>
                  </div>
                ) : (
                  data.subtitle2
                )}
              </span>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-[20px] xl:h-[20px] bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-[20px] xl:h-[20px] bg-gray-300 rounded w-5/6"></div>
                </div>
              ) : (
                <div 
                  className="mt-[12px] xl:text-[20px] prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: data.description2 || '' }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden mt-[40px] mb-[60px]">
        <img className="shadow-[0px_30px_20px_#DFE7F2,0px_-30px_20px_#DFE7F2,20px_0px_20px_#DFE7F2]" src="/services/servicesImg1.png" alt="pic"/>
      </div>
    </div>
  );
};

export default Services
