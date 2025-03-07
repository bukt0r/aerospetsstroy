import React from "react";
import { vacanciesData } from "@/data/vacanciesData";
import VacancyDetails from "@/app/components/VacancyDetails"; // Client component

export async function generateStaticParams() {
  if (vacanciesData.length === 0) {
    return [{ id: "placeholder" }]; // Fallback path
  }
  return vacanciesData.map((vacancy) => ({
    id: String(vacancy.id), // Ensure id is a string for URL params
  }));
}

export default function Vacancies({ params }) {
  const { id } = params;
  const vacancy = vacanciesData[+id] || { // Convert string id to number for array index
    mainTitle: "No Vacancy Found",
    shortInfo: "This is a placeholder page",
    title1: "Status",
    description1: "No data available yet",
    title2: "",
    description2: "",
    title3: "",
    description3: "",
  };
  return (
    <div className="flex flex-col pl-[15px] pr-[19px] pt-[60px] pb-[60px] bg-[#F2F5F9] text-[#111111CC] bg-no-repeat bg-contain lg:bg-[url('/vacanciesFullScreen.svg')] lg:px-[60px] xl:px-[100px] xl:py-[100px]">
      <div className="mb-[40px]">
        <h2 className="text-[30px] font-[500] xl:text-[64px] xl:leading-none">ВАКАНСИИ</h2>
      </div>
      <div className="relative px-[30px] py-[60px] bg-[#FFFFFF]">
        <VacancyDetails vacancy={vacancy} />
      </div>
    </div>
  );
}
