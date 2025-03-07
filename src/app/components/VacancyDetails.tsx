// components/VacancyDetails.jsx (Client Component)
'use client';

import React, { useState } from "react";

export default function VacancyDetails({ vacancy }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex justify-between lg:items-center mb-[20px]">
        <div>
          <p className="font-[600] text-[20px] xl:text-[32px]">{vacancy.mainTitle}</p>
        </div>
        <div>
          <button
            onClick={() => window.history.back()}
            className="text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl xl:text-[20px] hover:bg-[#6095AB99] hover:text-[#FFFFFF] hover:border-none"
          >
            закрыть
          </button>
        </div>
      </div>
      <div className="mb-[30px]">
        <p className="xl:text-[20px]">{vacancy.shortInfo}</p>
      </div>
      <div className="mb-[30px]">
        <p className="font-[600]">{vacancy.title1}</p>
        <p className="xl:text-[20px]">{vacancy.description1}</p>
      </div>
      <div className="mb-[30px]">
        <p className="font-[600]">{vacancy.title2}</p>
        <p className="xl:text-[20px]">{vacancy.description2}</p>
      </div>
      <div className="mb-[60px]">
        <p className="font-[600]">{vacancy.title3}</p>
        <p className="xl:text-[20px]">{vacancy.description3}</p>
      </div>
      <div>
        <button
          onClick={openModal}
          className="text-[#FFFFFF] px-[21px] py-[4px] xl:px-[40px] bg-[#6095AB] border-[1px] rounded-2xl xl:text-[20px] hover:bg-[#6095AB99]"
        >
          отправить резюме
        </button>
      </div>
      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FFFFFF] bg-opacity-30 z-50">
          <div className="flex h-[100%] w-[100%] text-[#6095AB] justify-center items-center bg-[#FFFFFF] bg-opacity-90 text-[24px] font-semibold rounded-lg shadow-lg">
            Резюме отправлено
          </div>
        </div>
      )}
    </>
  );
}
