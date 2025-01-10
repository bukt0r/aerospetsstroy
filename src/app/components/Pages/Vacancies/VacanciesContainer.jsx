'use client'

import React from "react";
import ImageCarusel from "../../ImageCarusel/ImageCarusel";
import Vacancies from "@/app/components/Pages/Vacancies/Vacancies";
import chunkArray from "@/app/components/Helper/chunkArray";
import {useMediaQuery} from "@mantine/hooks";

const VacanciesContainer =()=>{

  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const count = isLargeScreen ? 3 : 1;

  const vacanciesData = [
    {
      title: 'Инженер-проектировщик систем водоснабжения и канализации',
      description: 'Разработка проектной и рабочей документации разделов водоснабжения и канализации в соответствии с требованиями нормативной документации; Прохождение государственной экспертизы по разработанным проектам; Сопровождение проектных работ по объектам строительства и контроль качества выполняемых работ; ...'
    },
    {
      title: 'Инженер-проектировщик систем водоснабжения и канализации',
      description: 'Разработка проектной и рабочей документации разделов водоснабжения и канализации в соответствии с требованиями нормативной документации; Прохождение государственной экспертизы по разработанным проектам; Сопровождение проектных работ по объектам строительства и контроль качества выполняемых работ; ...'
    },
    {
      title: 'Инженер-проектировщик систем водоснабжения и канализации',
      description: 'Разработка проектной и рабочей документации разделов водоснабжения и канализации в соответствии с требованиями нормативной документации; Прохождение государственной экспертизы по разработанным проектам; Сопровождение проектных работ по объектам строительства и контроль качества выполняемых работ; ...'
    },
  ];

  const vacanciesData1 = [

  ];


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
        <h2 className="text-[30px] font-[500] mb-[8px] xl:text-[64px] xl:leading-none">ВАКАНСИИ</h2>
      </div>
      <div className="mb-[24px] xl:mb-[57px]">
        {vacancies.length < 1 ? (
            <p className="text-[#4A4A4ACC] xl:text-[32px]">Открытых вакансий нет</p>
        ) : (<p className="text-[#4A4A4ACC] xl:text-[32px]">{vacancies.length} вакансии </p>)}
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