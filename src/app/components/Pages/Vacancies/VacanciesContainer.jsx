'use client'

import React from "react";
import ImageCarusel from "../../ImageCarusel/ImageCarusel";
import Vacancies from "@/app/components/Pages/Vacancies/Vacancies";
import chunkArray from "@/app/components/Helper/chunkArray";
import {useMediaQuery} from "@mantine/hooks";
import {vacanciesData} from "@/data/vacanciesData";

function getVacancyWord(count) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return "вакансия";
  } else if (
    [2, 3, 4].includes(count % 10) &&
    ![12, 13, 14].includes(count % 100)
  ) {
    return "вакансии";
  } else {
    return "вакансий";
  }
}


const VacanciesContainer =()=>{

  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const count = isLargeScreen ? 3 : 1;

  const vacancies = chunkArray(vacanciesData, count);

  const vacanciesBlocks = vacancies.map((vacancy, index) => (
    <Vacancies key={index} vacancies={vacancy}/>
  ));

  return (
    <div
      className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#F2F5F9] text-[#111111CC] bg-no-repeat bg-contain lg:bg-[url('/vacanciesFullScreen.svg')] lg:px-[60px] xl:px-[100px] xl:py-[100px]"
      id="VacanciesContainer"
    >
      <div>
        <h2 className="text-[30px] font-semibold mb-[8px] xl:text-[64px] xl:leading-none">ВАКАНСИИ</h2>
      </div>
      <div className="mb-[24px] xl:mb-[57px]">
        {vacanciesData.length < 1 ? (
            <p className="text-[#4A4A4ACC] xl:text-[32px]">Открытых вакансий нет</p>
        ) : (<p className="text-[#4A4A4ACC] xl:text-[32px]">
              {vacanciesData.length} {getVacancyWord(vacanciesData.length)}
            </p>
        )}
      </div>
      <div>
        {vacancies.length < 1 ? (
          <div></div>
        ) : (<div><ImageCarusel blocks={vacanciesBlocks}/></div>)}
      </div>
    </div>
  );
};
export default VacanciesContainer;