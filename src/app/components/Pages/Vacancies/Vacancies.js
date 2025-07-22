'use client';

import React from "react";
import { useFirestoreContent } from "@/hooks/useFirestoreContent";

const Vacancies = ({ onDetailsClick }) => {
  const { vacanciesData } = useFirestoreContent();

  // Don't render if not visible
  if (!vacanciesData?.visible) {
    return null;
  }

  return (
    <div className="mb-[40px] xl:mb-[80px]">
      <div className="flex gap-[20px]">
        {vacanciesData?.vacancyData?.map((vacancy, index) => (
          <div className="flex flex-col p-[24px] bg-[#FFFFFF] max-xl:w-[80%] w-[30%]" key={index}>
            <p className="font-[600] mb-[20px] xl:text-[32px]">{vacancy.mainTitle}</p>
            <div className="mb-[20px]">{vacancy.description1}</div>
            <div className="flex justify-end mt-auto">
              <button
                onClick={() => onDetailsClick(vacancy)}
                className="mt-[40px] text-[#6095AB] px-[21px] border-[#6095AB] border-[1px] rounded-2xl"
              >
                подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vacancies;
