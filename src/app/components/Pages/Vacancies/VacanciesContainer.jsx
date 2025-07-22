'use client'

import React, { useState } from "react";
import ImageCarusel from "../../ImageCarusel/ImageCarusel";
import Vacancies from "@/app/components/Pages/Vacancies/Vacancies";
import chunkArray from "@/app/components/Helper/chunkArray";
import { useMediaQuery } from "@mantine/hooks";
import VacancyDetails from "@/app/components/VacancyDetails";
import { useFirestoreContent } from "@/hooks/useFirestoreContent";

function getVacancyWord(count) {
  if (count % 10 === 1 && count % 100 !== 11) return "вакансия";
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "вакансии";
  return "вакансий";
}

const VacanciesContainer = () => {
  const { vacanciesData } = useFirestoreContent();
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const count = isLargeScreen ? 3 : 1;

  // Don't render if not visible
  if (!vacanciesData?.visible) {
    return null;
  }

  const vacancyData = vacanciesData?.vacancyData || [];
  const vacancies = chunkArray(vacancyData, count);
  const vacanciesBlocks = vacancies.map((group, index) => (
      <Vacancies key={index} vacancies={group} onDetailsClick={setSelectedVacancy} />
  ));

  return (
      <div className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#F2F5F9] text-[#111111CC] bg-no-repeat bg-contain lg:bg-[url('/vacanciesFullScreen.svg')] lg:px-[60px] xl:px-[100px] xl:py-[100px]" id="VacanciesContainer">
        <div>
          <h2 className="text-[30px] font-semibold mb-[8px] xl:text-[64px] xl:leading-none">{vacanciesData?.title}</h2>
        </div>
        <div className="mb-[24px] xl:mb-[57px]">
          {vacancyData.length < 1 ? (
              <p className="text-[#4A4A4ACC] xl:text-[32px]">Открытых вакансий нет</p>
          ) : (
              <p className="text-[#4A4A4ACC] xl:text-[32px]">
                {vacancyData.length} {getVacancyWord(vacancyData.length)}
              </p>
          )}
        </div>
        <div>{vacancies.length > 0 && <ImageCarusel blocks={vacanciesBlocks} />}</div>

        {selectedVacancy && (
            <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-30 flex justify-center items-center p-4">
              <div className="relative w-full max-w-4xl bg-white p-6 rounded-lg overflow-y-auto max-h-[90vh]">
                <VacancyDetails vacancy={selectedVacancy} onClose={() => setSelectedVacancy(null)} />
              </div>
            </div>
        )}
      </div>
  );
};

export default VacanciesContainer;
