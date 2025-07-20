'use client'

import React from 'react';
import { useFirestoreContent } from '@/hooks/useFirestoreContent';

const Specialization = () => {
  const { specializationData, loading } = useFirestoreContent();

  // Default values for loading state
  const defaultData = {
    title: "СПЕЦИАЛИЗАЦИЯ",
    description: "ООО «АэроСпецСтрой» специализируется на промышленном строительстве.\n            Компания выполняет подрядные работы по созданию объектов железнодорожной и\n            авиационной инфраструктуры, водоотводных сооружений и гражданского строительства.",
    subtitle1: "Виды услуг",
    description1: "Строительство и реконструкция капитальных и некапитальных объектов;\nЗемляные работы и устройство свайных оснований;\nМонтаж железобетонных и металлических конструкций;\nУстройство инженерных коммуникаций;\nПусконаладочные работы и ввод объектов в эксплуатацию.",
    subtitle2: "Приоритеты компании",
    description2: "Оптимизация проектных решений;\n            Соблюдение сроков выполнения работ; Высокий уровень качества и безопасности строительства.\n            Такой подход позволяет минимизировать риски и гарантировать надежную эксплуатацию построенных объектов."
  };

  // Use data from Firestore or defaults
  const data = loading ? defaultData : specializationData;

  // Don't render if not visible
  if (!data?.visible) {
    return null;
  }

  return(
    <div
      id="Specialization"
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] text-[#FFFFFFCC] bg-[url('/specializationBackground.svg')] bg-cover bg-center w-full lg:bg-[url('/specializationBackgroundFullScreen.svg')] lg:flex-row lg:pt-[100px] lg:pl-[60px] 2xl:px-[100px] lg:justify-between">
      <div className="">
        <h2 className="text-[30px] font-semibold mb-[40px] xl:text-[64px] xl:leading-none">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-[30px] xl:h-[64px] bg-gray-300 rounded w-3/4"></div>
            </div>
          ) : (
            data.title
          )}
        </h2>
      </div>
      <div className="xl:text-[20px] lg:w-[560px]">
        <div className="mb-[36px] lg:pt-[10px] xl:mb-[60px]">
          <p>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-[20px] bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-[20px] bg-gray-300 rounded w-3/4"></div>
              </div>
            ) : (
              data.description
            )}
          </p>
        </div>

        <div className="mb-[36px]">
          <span>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-[20px] bg-gray-300 rounded w-1/3"></div>
              </div>
            ) : (
              data.subtitle1
            )}
          </span>
          <p className="mt-[24px]">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-[20px] bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-[20px] bg-gray-300 rounded w-5/6"></div>
              </div>
            ) : (
              data.description1
            )}
          </p>
        </div>

        <div>
          <span>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-[20px] bg-gray-300 rounded w-1/2"></div>
              </div>
            ) : (
              data.subtitle2
            )}
          </span>
          <p className="mt-[24px]">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-[20px] bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-[20px] bg-gray-300 rounded w-4/5"></div>
              </div>
            ) : (
              data.description2
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Specialization;